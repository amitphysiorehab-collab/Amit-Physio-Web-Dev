import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations/appointment";
import { supabaseAdmin, isSupabaseConfigured, appointmentStore } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // 1. Server-side validation using Zod
    const validationResult = appointmentSchema.safeParse(json);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 2. Persist to Supabase if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("appointments")
        .insert([
          {
            name: validData.name,
            phone: validData.phone,
            email: validData.email || null,
            service: validData.service,
            session_type: validData.session_type,
            preferred_date: validData.preferred_date,
            preferred_time: validData.preferred_time,
            message: validData.message || null,
            status: "Pending",
            source: "Website",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        // If Supabase fails, save to fallback store rather than failing patient enquiry
        const fallbackRecord = await appointmentStore.insert({
          ...validData,
          source: "Website (Fallback)",
        });
        return NextResponse.json(
          {
            success: true,
            message: "Enquiry submitted successfully (fallback store)",
            data: fallbackRecord,
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Enquiry submitted successfully",
          data,
        },
        { status: 201 }
      );
    }

    // 3. Fallback store (Local development / initial deployment before DB credentials)
    const record = await appointmentStore.insert({
      ...validData,
      source: "Website",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        data: record,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Unexpected error in /api/appointments:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // If Supabase is configured
    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        const fallback = await appointmentStore.getAll();
        return NextResponse.json({ success: true, data: fallback });
      }

      return NextResponse.json({ success: true, data });
    }

    const localData = await appointmentStore.getAll();
    return NextResponse.json({ success: true, data: localData });
  } catch (err: unknown) {
    console.error("Error in GET /api/appointments:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

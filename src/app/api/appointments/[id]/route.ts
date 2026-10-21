import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured, appointmentStore } from "@/lib/supabase";
import { AppointmentEnquiry } from "@/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: AppointmentEnquiry["status"][] = [
      "Pending",
      "Contacted",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status provided" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("appointments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase update error:", error);
        const updated = await appointmentStore.updateStatus(id, status);
        return NextResponse.json({ success: true, data: updated });
      }

      return NextResponse.json({ success: true, data });
    }

    const updated = await appointmentStore.updateStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    console.error("Error updating appointment status:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

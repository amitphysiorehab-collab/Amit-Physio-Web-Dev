import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "amitphysiorehab@gmail.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "Amitrehab@1234";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (
      email.toLowerCase().trim() === expectedEmail.toLowerCase().trim() &&
      password === expectedPassword
    ) {
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: { email: expectedEmail, role: "admin" },
      });

      // Set session cookie
      response.cookies.set("arc_admin_session", "authenticated_session_token_2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password credentials" },
      { status: 401 }
    );
  } catch (err: unknown) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  response.cookies.delete("arc_admin_session");
  return response;
}

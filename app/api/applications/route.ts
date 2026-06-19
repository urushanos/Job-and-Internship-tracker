import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";

// GET all 
export async function GET() {
  try {
    
    const session = await auth();

      if (!session?.user) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

    await connectDB();
    const applications = await Application.find({userId: session.user.id,}).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error: unknown) {
    console.error("[GET /api/applications] ERROR:", error);
    const message = error instanceof Error ? error.message : "Error fetching applications";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// POST new application
export async function POST(request: Request) {
  try {
     const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();

    //server-side field validation 
    const fields: Record<string, string> = {};
    if (!body.companyName?.trim()) fields.companyName = "Company name is required.";
    if (!body.roleTitle?.trim())   fields.roleTitle   = "Role title is required.";
    if (Object.keys(fields).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", fields },
        { status: 400 }
      );
    }

    const application = await Application.create({...body, userId: session.user.id});
    return NextResponse.json(application, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error saving application";
    return NextResponse.json({ message }, { status: 500 });
  }
}

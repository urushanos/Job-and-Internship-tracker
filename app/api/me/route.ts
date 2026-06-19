import { auth } from "@/auth";
import { NextResponse } from "next/server";

//testing if userId getting created
export async function GET() {
  const session = await auth();

  return NextResponse.json(session);
}
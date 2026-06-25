import { auth } from "../../../auth";
import { buildDashboard } from "../../../lib/dashboard";
import { connectDB } from "../../../lib/db";
import { NextResponse } from "next/server.js";
import { getUserApplications } from "@/lib/dashboardUser";

export async function GET(){
    try{
        await connectDB();
        const session = await auth();

        if (!session?.user?.id) {
          return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );
        }

        const applications = await getUserApplications(session!.user!.id);

        return NextResponse.json(
          buildDashboard(applications)
        );

    }catch (error){
        return NextResponse.json(
            {error : "Failed to Load Dashboard Data"},
            {status : 500}
        )
    }
}
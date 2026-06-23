import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const applications = await Application.find();
        const total = applications.length;

        const statuses = [ "Applied", "Interviewing", "Offered", "Rejected", "Withdrawn" ];

        const statusCount = statuses.map((status) => ({
            status,
            count : applications.filter((app) => app.status === status).length
        }));

        const last7Days = Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
            
              const count = applications.filter((app) => {
                const applied = new Date(app.dateApplied);
                return (
                  applied.toDateString() === date.toDateString()
                );
              }).length;
            
              return {
                day: date.toLocaleDateString("en-US", {
                  weekday: "short",
                }),
                count,
              };
            });
        
            const appliedCount = statusCount.find((s) => s.status === "Applied")?.count ?? 0;
            const responseRate = total === 0 ? 0 : (total - appliedCount)/total;

            return NextResponse.json({
                total,
                statusCount,
                last7Days,
                responseRate,
            });

    }catch (error){
        return NextResponse.json(
            {error : "Failed to Load Dashboard Data"},
            {status : 500}
        )
    }
}
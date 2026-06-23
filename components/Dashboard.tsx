'use client';
import { signOut } from "next-auth/react";
import StatusCard from "@/components/StatusCard";
import ResponseRate from "@/components/ResposeRate";
import WeeklyActivity from "@/components/WeeklyActivity";
import { Application } from "@/lib/types";
import { useEffect, useState } from "react";

type dashboardProps = {
    applications : Application[];
};

export default function Dashboard({applications} : dashboardProps){
    const [user, setUser] = useState<any>(null);
    const statuses = [ "Applied", "Interviewing", "Offered", "Rejected", "Withdrawn" ];
    const statusCount = statuses.map((status) => ({
    name : status,
    count : applications.filter((app) => app.status === status).length
    }));

    useEffect(() => {
      fetch("/api/me")
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }, []);

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

    const appliedCount = statusCount.find((status) => status.name === "Applied")?.count ?? 0;
    const responseRate = applications.length === 0 ? 0 : (applications.length - appliedCount)/applications.length;

    return(
            <aside className="w-72 p-4 pt-20 fixed top-0 bottom-0 left-0 bg-gray-100">

            <div className="flex gap-3 items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full"></div> 
                <div >{user?.name}</div> 
            </div>

            <div className="flex justify-between gap-2 mb-4 w-full">
                <button className="flex-1 border px-2 py-1 rounded">
                Edit
                </button>

                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => signOut({callbackUrl: "/login"})}>
                Logout
                </button>
            </div>

                <StatusCard
                statusName="Total"
                statusCount={applications.length}
                />
                
                { statusCount.map((status) => (
                <StatusCard
                key={status.name}
                statusName={status.name}
                statusCount={status.count}
                />
                ))}


                <WeeklyActivity data={last7Days} />

                <ResponseRate
                responseCount={responseRate}/>

            </aside>
    );
}
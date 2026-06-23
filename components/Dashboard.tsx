'use client';
import { signOut } from "next-auth/react";
import StatusCard from "@/components/StatusCard";
import ResponseRate from "@/components/ResposeRate";
import WeeklyActivity from "@/components/WeeklyActivity";
import { useEffect, useState } from "react";

type DashboardData = {
  total: number;
  statusCount: {
    status: string;
    count: number;
  }[];
  last7Days: {
    day: string;
    count: number;
  }[];
  responseRate: number;
};

export default function Dashboard(){
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
      fetch("/api/me")
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }, []);

    useEffect(() => {
    const fetchDashboard = async () => {
        try {
        setLoading(true);
        const res = await fetch("/api/dashboard");

        if (!res.ok) {
            throw new Error(
            `Server responded with ${res.status}`
            );
        }

        const data = await res.json();

        setDashboardData(data);
        } catch (err) {
        setError(
            err instanceof Error ? err.message : "Unknown error" );
        } finally {
        setLoading(false);
        }
    };

    fetchDashboard();
    }, []);

    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return (
        <aside className="w-72 p-4 pt-20">
        <div className="bg-white text-red-600 p-4 rounded">
            Failed to load dashboard.
        </div>
        </aside>
    );
    }

    if (!dashboardData) {
        return <p>Loading...</p>;
    }

    if (dashboardData && dashboardData.total === 0) {
    return (
        <aside className="w-72 p-4 pt-20">
        <div className="bg-white p-4 rounded">
            <p className="text-gray-500">
            No applications yet.
            </p>
        </div>
        </aside>
    );
    }

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
                statusCount={dashboardData.total}
                />
                
                {dashboardData.statusCount.map((s) => (
                <StatusCard
                key={s.status}
                statusName={s.status}
                statusCount={s.count}
                />
                ))}

                <WeeklyActivity data={dashboardData.last7Days} />

                <ResponseRate responseCount={dashboardData.responseRate}/>

            </aside>
    );
}
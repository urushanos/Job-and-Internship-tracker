'use client'
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/Modal";
import type { Application } from "@/lib/types";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Application | null>(null);

  const[showAll, setShowAll] = useState(false);
  const [timeFilter, setTimeFilter] = useState("Recent");

  const fetchApplications = async() =>{
      try {
        const res = await fetch("/api/applications");
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data: Application[] = await res.json();
        setApplications(data);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Could not load applications — ${msg}. Is the application running?`);
      } finally {
        setLoading(false);
      }
    }

  useEffect(()=>{
    fetchApplications();
  },[]);
   
  const sortedApplications = [...applications].sort((a,b) =>new Date(b.dateApplied).getTime()-new Date(a.dateApplied).getTime());
  const filteredApplications = statusFilter === "All" 
    ? sortedApplications 
      : sortedApplications.filter((app) => app.status === statusFilter);

  const timeFilteredApplication = filteredApplications.filter((app) => {
  const appliedDate = new Date(app.dateApplied);
  const now = new Date();

  if (timeFilter === "Recent") {
    return true;
  }

  if (timeFilter === "Last Week") {
    // show applications older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    return appliedDate <= sevenDaysAgo;
  }

  if (timeFilter === "Last Month") {
    //show applications older than 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return appliedDate <= oneMonthAgo;
  }

  return true;
});

  const displayedApplications = showAll ? timeFilteredApplication: timeFilteredApplication.slice(0,5);

  const handleDelete = async (id: string) => {
    await fetch(`/api/applications/${id}`, {method: "DELETE"});

    setApplications(
      applications.filter((app) => app._id !== id)
    );

    setSelectedJob(null);
};

  return (
    <div>
      <main>
        <div className="min-h-screen bg-gray-100 pt-8">

          <Navbar 
            statusFilter = {statusFilter}
            setStatusFilter = {setStatusFilter}
          />

          <div className="flex">

          <Dashboard refresh={applications.length} />

          <div className="ml-72 flex-1 p-8">
            <select
              value={timeFilter}
              onChange = {(e)=>setTimeFilter(e.target.value)}  className="border rounded px-3 py-2 mt-4 bg-black text-white">
              
              <option value={"Recent"}>Recent</option>
              <option value={"Last Week"}>Last Week</option>
              <option value={"Last Month"}>Last Month</option>
            </select>

            <div className="max-w-4xl mx-auto">
            {/*loading applications */}
            {loading && (
              <p className="text-center text-gray-500 mt-16">
                Loading applications…
              </p>
            )}

            {/*error */}
            {!loading && error && (
              <div className="mt-16 text-center">
                <p className="text-red-500 font-medium">{error}</p>
                <p className="text-sm text-gray-400 mt-1">
                  All data is served by Next.js API routes — make sure the dev server is running with{" "}
                  <code className="bg-gray-100 px-1 rounded">npm run dev</code> and that your{" "}
                  <code className="bg-gray-100 px-1 rounded">.env.local</code> contains a valid{" "}
                  <code className="bg-gray-100 px-1 rounded">MONGO_URI</code>.
                </p>
              </div>
            )}

            {/*empty */}
            {!loading && !error && applications.length === 0 && (
              <p className="text-center text-gray-400 mt-16">
                No applications yet — click <strong>Add</strong> to get started!
              </p>
            )}

            {/*No applications in set status filter*/}
            {!loading && !error && applications.length > 0 && filteredApplications.length === 0 && (
                <p className="text-center text-gray-400 mt-16">
                No applications in <strong>{statusFilter}</strong>... Check <strong>All</strong>.
                </p>
            )}

            {/*list view*/}
            {!loading && !error && displayedApplications.map((app) => (
              <JobCard
                key={app._id}
                company={app.companyName}
                role={app.roleTitle}
                date={app.dateApplied}
                status={app.status}
                onClick={()=> setSelectedJob(app)}
              />
            ))}

            {/*Show All and Show Less buttons*/}
            { timeFilteredApplication.length >5 && (
              <div className="flex justify-center mt-6"> 
                <button onClick={()=>setShowAll(!showAll)} className="bg-black text-white rounded px-4 py-2">
                  {showAll ? "Show Less" : "Show More"}</button>
              </div>
            )}

            </div>
          </div>
        </div>

          {selectedJob && (
            <JobModal
              job={selectedJob}
              onClose={() => {
                setSelectedJob(null);
                fetchApplications();
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

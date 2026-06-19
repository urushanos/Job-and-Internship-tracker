'use client'
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/Modal";
import type { Application } from "@/lib/types";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Application | null>(null);
  const [user, setUser] = useState<any>(null);

    useEffect(() => {
      fetch("/api/me")
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }, []);

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
   

  const filteredApplications = 
    statusFilter === "All" ? applications : applications.filter((app) => app.status === statusFilter);

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
        <div className="min-h-screen">

          <Navbar 
            statusFilter = {statusFilter}
            setStatusFilter = {setStatusFilter}
          />

          <div className="flex justify-end p-4 gap-2 items-center">
            <div>{user?.name}</div>
              <button className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => signOut({callbackUrl: "/login"})}
              >
                Logout
              </button>
          </div>

          <div className="mt-4 p-8 max-w-4xl mx-auto">
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
                  <code className="bg-gray-100 px-1 rounded">MONGODB_URI</code>.
                </p>
              </div>
            )}

            {/*empty */}
            {!loading && !error && applications.length === 0 && (
              <p className="text-center text-gray-400 mt-16">
                No applications yet — click <strong>add</strong> to get started!
              </p>
            )}

            {/*list view*/}
            {!loading && !error && filteredApplications.map((app) => (
              <JobCard
                key={app._id}
                company={app.companyName}
                role={app.roleTitle}
                date={app.dateApplied}
                status={app.status}
                onClick={()=> setSelectedJob(app)}
              />
            ))}
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

'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/Modal";

interface Application {
  _id: string;
  companyName: string;
  roleTitle: string;
  dateApplied: string;
  source: string;
  status: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setShowFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications");
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data: Application[] = await res.json();
        setApplications(data);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Could not load applications — ${msg}. Is the backend running?`);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const filteredApplications = 
    statusFilter === "All" ? applications : applications.filter( (app : any) => app.status === statusFilter);

  const handleDelete = async (id: string) => {
    await fetch(`/api/applications/${id}`, {method: "DELETE"});

    setApplications(
      applications.filter((app) => app._id !== id)
    );

    setSelectedJob(null);
};

const fetchApplications = async () => {
  const res = await fetch("/api/applications");
  const data = await res.json();
  setApplications(data);
};

  return (
    <div>
      <main>
        <div className="min-h-screen">

          <Navbar 
            statusFilter = {statusFilter}
            setStatusFilter = {setShowFilter}
          />

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
                  Run <code className="bg-gray-100 px-1 rounded">npm run dev</code> inside the{" "}
                  <code className="bg-gray-100 px-1 rounded">backend/</code> folder.
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
            {!loading && !error && filteredApplications.map((app: any) => (
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

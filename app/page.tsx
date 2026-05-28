import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";

export default function Home() {
  return (
    <div>
      <main>
        <div className="min-h-screen">

          <Navbar />

          <div className="mt-4 p-8 max-w-350 h-[80vh] mx-auto">

            <JobCard 
              company="Imagine Works"
              role="Full Stack Intern"
              date="20 May 26"
              status="bg-green-500"
            />

            <JobCard 
              company="Microsoft"
              role="Software Engineer"
              date="23 May 26"
              status="bg-green-500"
            />

          </div>
        </div>

      </main>
    </div>
  );
}

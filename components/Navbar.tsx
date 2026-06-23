import Link from "next/link";

type FilterProps = {
statusFilter : string;
setStatusFilter: React.Dispatch< React.SetStateAction<string> >;
};

export default function Navbar({statusFilter, setStatusFilter}: FilterProps){

    return(
        <div className="flex justify-between items-center h-16 px-4 py-2 mb-4 bg-white fixed top-0 left-0 w-full z-50">

            <h1 className="font-semibold">
                Job and Internship Application Tracker
            </h1>

            <div className="flex gap-2 text-white">

                <div className="relative">
                  <select className="h-10 bg-black text-white px-3 py-2 rounded cursor-pointer"
                    value={statusFilter}
                    onChange= {(e) => {setStatusFilter(e.target.value)} }
                   >
                    {/* Applied, Withdrawn, Interviewing, Rejected, or Offered */}
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>

                  </select>
                </div>


            <Link href="/add-application">
              <button className="h-10 bg-black px-3 py-2 rounded">
                Add
              </button>            
            </Link>
            </div>

        </div>
    );
}
import Link from "next/link";

type FilterProps = {
statusFilter : string;
setStatusFilter: React.Dispatch< React.SetStateAction<string> >;
};

export default function Navbar({statusFilter, setStatusFilter}: FilterProps){

    return(
        <div className="flex justify-between items-center h-15 px-4 py-2 mb-4 bg-gray-200">

            <h1 className="font-semibold">
                Job and Internship Application Tracker
            </h1>

            <div className="flex gap-2 text-white">

                <div className="relative">
                  <select className="bg-black text-white px-3 py-2 rounded cursor-pointer"
                    value={statusFilter}
                    onChange= {(e) => {setStatusFilter(e.target.value)} }
                   >
                    {/* Applied, In Review, Interviewing, Rejected, or Offered */}
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="In Review">In Review</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offered">Offered</option>

                  </select>
                </div>


            <Link href="/add-application">
              <button className="bg-black px-3 py-2 rounded">
                add
              </button>            
            </Link>
            </div>

        </div>
    );
}
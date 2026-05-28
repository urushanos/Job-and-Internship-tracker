type JobCardProps = {
  company: string;
  role: string;
  date: string;
  status: string;
};

export default function JobCard({company, role, date, status} : JobCardProps){

    return(
    <div className="flex justify-between items-center bg-gray-100 shadow-sm h-30 my-4 rounded-md overflow-hidden">
        <div className="p-2">
            <h1 className="text-lg font-semibold">
                {company}
            </h1>

            <div className="flex gap-10">
                <p>{role}</p>
                <p>{date}</p>
            </div>
        </div>
         <div className="w-25 h-30 bg-red-600">

        </div>
    </div>
    );
}
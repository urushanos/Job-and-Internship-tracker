type JobCardProps = {
  company: string;
  role: string;
  date: string;
  status: string;
  onClick: ()=> void;
};

//mapping colour
const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  "Applied":      { bg: "bg-blue-500",   text: "text-white" },
  "In Review":    { bg: "bg-amber-400",  text: "text-white" },
  "Interviewing": { bg: "bg-purple-500", text: "text-white" },
  "Rejected":     { bg: "bg-red-500",    text: "text-white" },
  "Offered":      { bg: "bg-green-500",  text: "text-white" },
};

export default function JobCard({ company, role, date, status, onClick }: JobCardProps) {
  const style = STATUS_STYLES[status] ?? { bg: "bg-gray-400", text: "text-white" };

  const displayDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      })
    : "—";

  return (
    <div onClick={onClick}
      className="flex justify-between items-center bg-gray-100 shadow-sm my-4 rounded-md overflow-hidden">
      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold">{company}</h2>
        <div className="flex gap-6 text-sm text-gray-500 mt-1">
          <p>{role}</p>
          <p>{displayDate}</p>
        </div>
      </div>

      <div
        className={`flex items-center justify-center w-28 self-stretch ${style.bg}`}
      >
        <span className={`text-sm font-medium text-center px-2 ${style.text}`}>
          {status || "—"}
        </span>
      </div>
    </div>
  );
}
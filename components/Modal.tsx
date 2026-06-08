import { useState } from "react";

type ModalProps = {
  job: any;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export default function JobModal({job, onClose, onDelete,}: ModalProps) {
  const[companyName, setCompanyName] = useState(job.companyName);
  const[roleTitle, setRoleTitle] = useState(job.roleTitle);
  const[dateApplied, setDateApplied] = useState(job.dateApplied);
  const[status, setStatus] = useState(job.status);

{/* const handleDelete = async () => {
    await fetch(`/api/applications/${job._id}`, {method: "DELETE"});
    onClose();
    }; 
*/}
    
  const handleUpdate = async() => {
    const response = await fetch(`/api/applications/${job._id}`, 
      { 
        method:"PUT", 
        headers : {"Content-Type": "application/json"}, 
        body: JSON.stringify({
          companyName,
          roleTitle,
          dateApplied,
          status
        })
      });

      if (response.ok){
        onClose();
      }
  }  


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          <input value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border rounded p-2 w-full" />
        </h2>

        <div>
          <strong>Role:</strong> 
          <input
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="border rounded p-2 w-full" />
        </div>

        <div>
          <strong>Date Applied:</strong>
          <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="border rounded p-2 w-full" />
        </div>

        <div>
          <strong>Status:</strong>{job.status}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 w-full">
              <option value="Applied">Applied</option>
              <option value="In Review">In Review</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offered">Offered</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6">

          <button onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>

          <button onClick={() => onDelete(job._id)}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>

          <button onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded" >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
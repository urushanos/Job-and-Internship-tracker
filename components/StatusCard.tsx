type FilterProps ={
    statusName : String;
    statusCount : number;
}

export default function StatusCard({statusName, statusCount}:FilterProps){
    
    return(
        <div className="bg-white p-2 px-6 mb-2 shadow-sm rounded-md">
            <div className="flex justify-between text-sm text-gray-500 mt-1">
                <label>{statusName}</label> <label>{statusCount}</label>
            </div>
        </div>
    );
}
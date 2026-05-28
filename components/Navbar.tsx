export default function Navbar(){
    return(
        <div className="flex justify-between items-center h-15 px-4 py-2 mb-4 bg-gray-200">

            <h1 className="font-semibold">
                Job and Internship Application Tracker
            </h1>

            <div className="flex gap-2 text-white">
              <button className="bg-black px-3 py-1 rounded">
                filter
              </button>

              <button className="bg-black px-3 py-1 rounded">
                add
              </button>
            </div>

        </div>
    );
}
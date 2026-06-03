'use client'
import ApplicationForm from "@/components/NewApplicForm";

export default function AddApplicatio(){
    return(
        <div>
            <main className="min-h-screen">
                <div className="flex flex-col items-center p-2">

                    <h1 className="font-semibold p-4">
                        Add New Application
                    </h1>

                    <div className="p-10 pt-4">
                        <ApplicationForm />
                    </div>

                </div>
            </main>
            
        </div>
    );
}
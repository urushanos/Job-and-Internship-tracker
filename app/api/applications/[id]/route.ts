import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server"
import Application from "@/models/Application";

export async function GET( request: Request, {params}:{params: Promise<{id:string}>}){
    try{
        const session = await auth();
    
            if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
            }
        await connectDB();
        const {id} = await params;
        const application = await Application.findById({
            _id : id,
            userId: session.user.id
        });

        if(!application){
            return NextResponse.json(
                {message: "Application not found"},
                {status: 404}
            );
        }

        return NextResponse.json(application);

    }catch(error){
        return NextResponse.json(
            {message: "error fetching application"},
            {status: 500});
    }
}

export async function DELETE( request: Request, {params}:{params: Promise<{ id: string }>} ) {
    try{
        const session = await auth();
    
            if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
            }
        await connectDB();
        const {id} = await params;

        const deleteApplic = await Application.findOneAndDelete({
            _id : id,
            userId: session.user.id
        });

        if(!deleteApplic){
            return NextResponse.json(
                {message: "Application not found"},
                {status: 404}
            );
        }

        return NextResponse.json({ message: "Application deleted successfully" });
    }
    catch(error){
        return NextResponse.json(
      { message: "Error deleting application" },
      { status: 500 }
    );
    }
}

export async function PUT( request: Request, {params}:{params: Promise<{ id: string }>} ) {
    try{
        const session = await auth();
    
            if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        await connectDB();
        const {id} = await params;
        const body = await request.json();

        const updateApplic = await Application.findOneAndUpdate({
            _id: id, 
            userId: session.user.id
        },
            body, 
        {    new: true, 
            runValidators: true, 
        });

        console.log(session.user.id);
        console.log("ID:", id);
        
        if(!updateApplic){
            return NextResponse.json(
                {message : "Application not found"},
                {status: 404}
            );
        }
        return NextResponse.json(updateApplic);
    }
    catch(error){
        return NextResponse.json(
      { message: "Error updating application" },
      { status: 500 }
    );
    }
}

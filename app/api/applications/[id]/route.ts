import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server"
import Application from "@/models/Application";

export async function GET( request: Request, {params}:{params: Promise<{id:string}>}){
    try{
        await connectDB();
        const {id} = await params;
        const application = await Application.findById(id);

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
        await connectDB();
        const {id} = await params;

        const deleteApplic = await Application.findByIdAndDelete(id);

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
        await connectDB();
        const {id} = await params;
        const body = await request.json();

        const updateApplic = await Application.findByIdAndUpdate(
            id, body, {new: true, runValidators: true}
        );

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

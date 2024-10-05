import {connect} from "@/dbConfig/dbConfig";
import Source from "../../../../models/sourcemodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { source, amount } = reqBody;
        const userId = await getDataFromToken(request);
        const newSource = new Source({ source, amount, user: userId });
        const savedSource = await newSource.save();
        console.log(savedSource);
        
        return NextResponse.json({
            message:"Source created successfully",
            success:true,
            savedSource
        })
    }
    catch(error){
        const err = error as Error
        return NextResponse.json({
            error:err.message
        },{
            status:500
        })
    }
}
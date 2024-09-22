import {connect} from "@/dbConfig/dbConfig";
import Source from "../../../../models/sourcemodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
        const response = await Source.find({user:userId})
        
        console.log(response);
        
        return NextResponse.json({
            message:"Source fetched successfully",
            success:true,
            response
        })
    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
    }
}

import {connect} from "@/dbConfig/dbConfig";
import Category from "../../../../models/categorymodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request:NextRequest){
    try{
        console.log("finding categories")
        const userId = await getDataFromToken(request);
        const response = await Category.find({user:userId})
        
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

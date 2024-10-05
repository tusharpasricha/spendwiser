import {connect} from "@/dbConfig/dbConfig"
import Source from "@/models/sourcemodel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function DELETE(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { id } = reqBody;
        console.log("rooute"+id)
        const userId = await getDataFromToken(request);
        const deletedSource = await Source.findOneAndDelete({ _id: id, user: userId });
        console.log(deletedSource);

        return NextResponse.json({
            message:"Source deleted successfully",
            success:true,
            deletedSource
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
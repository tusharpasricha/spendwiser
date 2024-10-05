import {connect} from "@/dbConfig/dbConfig"
import Category from "@/models/categorymodel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function DELETE(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { id } = reqBody;
        console.log("rooute"+id)
        const userId = await getDataFromToken(request);
        const deletedCategory = await Category.findOneAndDelete({ _id: id, user: userId });
        console.log(deletedCategory);

        return NextResponse.json({
            message:"Source deleted successfully",
            success:true,
            deletedCategory
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
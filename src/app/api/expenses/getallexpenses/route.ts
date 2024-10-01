import {connect} from "@/dbConfig/dbConfig";
import Expense from "../../../../models/expensemodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request:NextRequest){
    try{
        console.log("finding incomes")
        const userId = await getDataFromToken(request);
        const response = await Expense.find({user:userId})
        
        console.log(response);
        
        return NextResponse.json({
            message:"Expense fetched successfully",
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

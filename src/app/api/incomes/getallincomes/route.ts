import { connect } from "@/dbConfig/dbConfig";
import Income from "@/models/incomemodel"; // Assume you have an income model
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    let query = { user: userId };
    
    if (year) {
      query = {
        ...query,
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      };
    }

    if (month) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);

      query = {
        ...query,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const response = await Income.find(query).sort({ date: -1 });

    return NextResponse.json({
      message: "Incomes fetched successfully",
      success: true,
      response,
    });
  } catch (error) {
    const err= error as Error
    return NextResponse.json({
      error: err.message,
    }, {
      status: 500,
    });
  }
}

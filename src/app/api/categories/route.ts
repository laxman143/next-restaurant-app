

import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server"


// FETCH ALL CATEGORIES
export const GET = async () => {
    try {
         const categories = await prisma.category.findMany();
         return new NextResponse( JSON.stringify(categories) , {status : 200})
    } catch (error) {
          console.error('Prisma error:', error); // 👈 add this
        return new NextResponse(
            JSON.stringify({message: "Something went wrong!"}) , {status : 500})
    }
}
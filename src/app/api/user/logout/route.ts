

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST () {
    try{
        const cookieStore= await cookies();
cookieStore.delete("token");
return NextResponse.json({
            message: "Logout successful",
            success: true
        });
    }
   catch (err: any) {
        // 4. Error handling
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}

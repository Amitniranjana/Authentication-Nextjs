import { NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';

export async function getDataFromToken(request:NextRequest){
    try{
    const token = await request.cookies.get("token")?.value || "";
const decodedToken:any=jwt.verify(token , process.env.TOKEN_SECRET_KEY!);

     return decodedToken.id;
    }catch(err:any){
        throw new Error(err.message);
    }
}
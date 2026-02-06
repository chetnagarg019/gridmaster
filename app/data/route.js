import { usersData } from "./usersData";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(usersData);
}

//NextResponse ki jagah Response.json ka use bhi kr skte the 
//Response java ne bulit in de rkha hai isme itne feature nhi hote
//NextRes me bhutt se features hote hai or kafi advance hota hai ye esliye isko use krna chaiye 
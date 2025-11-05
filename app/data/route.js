import { usersData } from "./usersData";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(usersData);
}

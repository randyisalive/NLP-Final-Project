import { NextResponse } from "next/server";

export async function GET(req) {
  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/get`);
    const data = await response.json();

    return NextResponse.json(
      {
        data: data,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

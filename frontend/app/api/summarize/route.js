import { NextResponse } from "next/server";

export async function GET(request) {
  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/get`);
    const data = await response.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

export async function POST(request) {
  // response json
  const { input_text } = await request.json();

  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_text: input_text }),
    });
    const data = await response.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

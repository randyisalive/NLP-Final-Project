import { NextResponse } from "next/server";

// delete chat data
export async function POST(request) {
  // request json
  const { id } = await request.json();

  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/chat/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

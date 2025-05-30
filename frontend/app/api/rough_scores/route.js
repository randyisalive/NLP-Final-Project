import { NextResponse } from "next/server";

export async function POST(request) {
  // request
  const { model_id } = await request.json();
  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/rouge_scores/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model_id: model_id }),
    });
    const data = await response.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

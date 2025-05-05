import { NextResponse } from "next/server";
// get chat data
export async function GET(req) {
  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/chat/get`);
    const data = await response.json();
    const today = new Date().toDateString();
    const today_data = data.data.filter(
      (i) => new Date(i.date).toDateString() === today
    );
    const today_data_ids = today_data.map((i) => i.id);
    const other_time = data.data.filter((i) => !today_data_ids.includes(i.id));

    const group_data = {
      today: today_data,
      other_time: [],
    };
    console.log(other_time);
    return NextResponse.json(
      {
        data: {
          today: today_data,
          other_time: other_time,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

// add chat data
export async function POST(request) {
  // request json
  const { text, chat_id, model_id } = await request.json();

  // fetch
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/chat/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        chat_id: chat_id,
        model_id: model_id,
      }),
    });
    const data = await response.json();

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

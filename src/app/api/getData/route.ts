import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const API_URL = process.env.VERCEL_ENV_API_URL;
  const API_KEY = process.env.VERCEL_ENV_API_KEY;

  try {
    const { searchBox } = await req.json();

    const apiResponse = await fetch(API_URL + searchBox + `&appid=${API_KEY}`);
    const data = await apiResponse.json();

    if (apiResponse.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: data.message }, { status: apiResponse.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
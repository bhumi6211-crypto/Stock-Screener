import { NextRequest, NextResponse } from 'next/server';
export async function GET()  { return NextResponse.json({ positions: [] }); }
export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ success: true, position: data });
}

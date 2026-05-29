import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const criteria = await request.json();
  return NextResponse.json({ results: [], message: 'Screener results shown in UI directly' });
}

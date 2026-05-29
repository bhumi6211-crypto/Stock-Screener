import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { id: '1', email: 'user@example.com', name: 'User' } });
}

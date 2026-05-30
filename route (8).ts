import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  const token = `pip_${Date.now()}`;
  return NextResponse.json({ success: true, token, user: { id: '1', email, name: email.split('@')[0] } });
}

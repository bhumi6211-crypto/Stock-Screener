import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  const token = `pip_${Date.now()}`;
  return NextResponse.json({ success: true, token, user: { id: '1', email, name } });
}

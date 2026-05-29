import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const token = `pip_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return NextResponse.json({
      success: true,
      token,
      user: { id: '1', email, name },
    });
  } catch {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}

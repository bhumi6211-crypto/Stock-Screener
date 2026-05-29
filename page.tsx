import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const token = `pip_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return NextResponse.json({
      success: true,
      token,
      user: { id: '1', email, name: email.split('@')[0] },
    });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

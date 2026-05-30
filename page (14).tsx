import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ stocks: [
    { ticker:'RELIANCE', name:'Reliance Industries', sector:'Oil & Gas' },
    { ticker:'TCS', name:'Tata Consultancy Services', sector:'IT' },
    { ticker:'HDFC', name:'HDFC Bank', sector:'Banking' },
  ]});
}

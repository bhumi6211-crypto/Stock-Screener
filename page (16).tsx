import { NextRequest, NextResponse } from 'next/server';
const STOCKS = [
  { id:'1', ticker:'RELIANCE', name:'Reliance Industries', sector:'Oil & Gas' },
  { id:'2', ticker:'TCS',      name:'Tata Consultancy Services', sector:'IT' },
  { id:'3', ticker:'INFY',     name:'Infosys Limited', sector:'IT' },
  { id:'4', ticker:'HDFC',     name:'HDFC Bank', sector:'Banking' },
  { id:'5', ticker:'SBIN',     name:'State Bank of India', sector:'Banking' },
  { id:'6', ticker:'WIPRO',    name:'Wipro Limited', sector:'IT' },
  { id:'7', ticker:'MARUTI',   name:'Maruti Suzuki', sector:'Automobiles' },
  { id:'8', ticker:'LT',       name:'Larsen & Toubro', sector:'Engineering' },
];
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('search')?.toLowerCase() || '';
  const stocks = q ? STOCKS.filter(s => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)) : STOCKS;
  return NextResponse.json({ stocks, total: stocks.length });
}

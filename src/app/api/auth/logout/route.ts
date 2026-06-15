import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그아웃 되었습니다.' });

  // Clear cookie by setting maxAge: 0
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}

// Add GET handler as well for easy logout testing
export async function GET() {
  const response = NextResponse.json({ message: '로그아웃 되었습니다.' });
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}

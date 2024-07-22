import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization');

  if (!auth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [scheme, encoded] = auth.split(' ');

  if (!encoded || scheme !== 'Basic') {
    return new NextResponse('Invalid auth format', {
      status: 400,
    });
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  // Defina suas credenciais aqui
  const validUsername = env.ADMIN_NAME;
  const validPassword = env.ADMIN_PASSWORD;

  if (username !== validUsername || password !== validPassword) {
    return new NextResponse('Invalid credentials', {
      status: 403,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

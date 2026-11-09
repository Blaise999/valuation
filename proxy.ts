import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Public pages do not require a Supabase auth network request on each navigation.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = { matcher: ['/admin/:path*'] };

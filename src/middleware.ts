import { NextRequest, NextResponse } from 'next/server';

// Helper function to generate a random delay between min and max milliseconds
function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sleep function that returns a promise resolving after a specified delay
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper function to determine if request should fail (25% chance)
function shouldFail(): boolean {
  return Math.random() < 0.25;
}

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Check if this request should fail (25% chance)
    if (shouldFail()) {
      return new NextResponse(
        JSON.stringify({ error: 'Random API failure' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Generate random delay between 10-3000ms
    const delay = getRandomDelay(10, 3000);
    
    // Wait for the random delay
    await sleep(delay);
  }
  
  // Continue to the route handler
  return NextResponse.next();
}

// Configure the middleware to only run on API routes
export const config = {
  matcher: '/api/:path*',
};
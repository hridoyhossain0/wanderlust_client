// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ১. যে পেইজগুলো লগইন ছাড়াই সবাই দেখতে পারবে (Public Routes)
    const isPublicRoute = pathname === "/" ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup");

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // ২. Better-Auth এর সেশন টোকেন কুকি আছে কিনা তা সরাসরি চেক করা
    const token = request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    // ৩. টোকেন না থাকলে ব্যবহারকারীকে লগইন পেইজে রিডাইরেক্ট করা
    if (!token) {
        const loginUrl = new URL("/login", request.url);
        // লগইন করার পর যেন ব্যবহারকারী আবার আগের পেইজে ফিরে আসতে পারে, সেজন্য callbackUrl যুক্ত করা
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// ৪. কোন কোন ফাইল বা রাউটে মিডলওয়্যার কাজ করবে না তা ফিল্টার করা
export const config = {
    matcher: [
        /*
         * নিচের ফাইল ও রাউটগুলো বাদে সব পেইজে এই মিডলওয়্যার কাজ করবে:
         * - api/auth (Better-Auth এর নিজস্ব ইন্টারনাল এপিআই)
         * - _next/static এবং _next/image (Next.js এর রেন্ডারিং ফাইল)
         * - public ফোল্ডারের অ্যাসেট (images, icons, vectors)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico|images|icons).*)",
    ],
};

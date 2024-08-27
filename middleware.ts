import * as jose from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

export async function middleware(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value

        // If there's a token, and the user is trying to access auth pages, redirect them to the dashboard
        if (token) {
            const decodedToken = await jose.jwtVerify(token, jwtConfig.secret)

            if (decodedToken) {
                const authPages = ['/sign-in', '/sign-up', '/reset-password']
                if (authPages.includes(req.nextUrl.pathname)) {
                    return NextResponse.redirect(new URL('/dashboard', req.url))
                }
            }
        } else {
            // If there's no token and the user is trying to access restricted pages, redirect them to the sign-in page
            const protectedRoutes = ['/dashboard', '/dashboard/:path*']
            if (
                protectedRoutes.some((route) =>
                    req.nextUrl.pathname.startsWith(route)
                )
            ) {
                return NextResponse.redirect(new URL('/sign-in', req.url))
            }
            if (req.nextUrl.pathname === '/') {
                return NextResponse.redirect(new URL('/sign-in', req.url))
            }
        }

        // If no conditions are met, continue to the requested route
        return NextResponse.next()
    } catch (error) {
        console.log(error)
        // If token verification fails, redirect to the login page
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*', // Apply middleware to /dashboard and any subroutes
        '/', // Apply middleware to the root path
        '/sign-in', // Apply middleware to sign-in
        '/sign-up', // Apply middleware to sign-up
        '/reset-password', // Apply middleware to reset-password
    ],
}

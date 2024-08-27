// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest): Promise<NextResponse> {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'No token provided' },
            { status: 401 }
        )
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        // Return the user data
        return NextResponse.json({ user: decoded })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}

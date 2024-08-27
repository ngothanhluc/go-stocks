import { LoginParams } from '@/lib/actions/shared.type'
import { login } from '@/lib/actions/user.action'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body: LoginParams = await req.json()
        const { user, token } = await login(body)
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        })
        return NextResponse.json({ user, token }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

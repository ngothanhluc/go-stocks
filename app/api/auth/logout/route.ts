import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Clear the 'token' cookie
        cookies().delete('token')

        // Optionally, you can return a success message or redirect the user
        return NextResponse.json(
            { message: 'Logout successful' },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

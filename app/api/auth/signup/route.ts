import { CreateUserParams } from '@/lib/actions/shared.type'
import { createUser } from '@/lib/actions/user.action'
import Error from 'next/error'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: CreateUserParams = await req.json()
        const user = await createUser(body)
        return NextResponse.json(user, { status: 201 })
    } catch (error: Error | any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

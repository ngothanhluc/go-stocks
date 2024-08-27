import User from '@/database/user.model'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../mongoose'
import { CreateUserParams, LoginParams } from './shared.type'
export const createUser = async (userData: CreateUserParams) => {
    try {
        await connectToDatabase()
        const user = await User.findOne({ email: userData.email })
        if (user) {
            throw new Error('User already exists')
        }
        const newUser = await User.create(userData)
        return newUser
    } catch (error) {
        console.log('Error creating user', error)
        throw error
    }
}

export const login = async (userData: LoginParams) => {
    try {
        await connectToDatabase()
        const user = await User.findOne({ email: userData.email })
        if (!user) {
            throw new Error('User with this email does not exist')
        }
        const isMatch = await user.matchPassword(userData.password)
        if (!isMatch) {
            throw new Error('Wrong password')
        }
        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            process.env.JWT_SECRET?.toString() || 'secret',
            {
                expiresIn: '1h',
            }
        )
        return { user, token }
    } catch (error) {
        console.log('Error logging in', error)
        throw error
    }
}

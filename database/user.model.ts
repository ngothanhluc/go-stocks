import bcrypt from 'bcryptjs'
import { Document, model, models, Schema } from 'mongoose'
export interface IUser extends Document {
    firstName: string
    lastName: string
    email: string
    password: string
    matchPassword: (enteredPassword: string) => Promise<boolean>
}
const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = models.User || model<IUser>('User', UserSchema)
export default User

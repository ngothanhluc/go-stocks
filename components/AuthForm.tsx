'use client'
import { authFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { useToast } from './ui/use-toast'

interface AuthFormProps {
    type: 'sign-in' | 'sign-up'
}
const AuthForm = ({ type = 'sign-in' }: AuthFormProps) => {
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (type === 'sign-up') {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                if (res.ok) {
                    toast({
                        title: 'Account created successfully',
                    })
                    router.push('/sign-in')
                } else {
                    const body = await res.json()
                    toast({
                        variant: 'destructive',
                        title: body.error,
                    })
                    return
                }
            }
            if (type === 'sign-in') {
                const res = await fetch('/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                if (res.ok) {
                    const body = await res.json()
                    toast({
                        title: 'Logged in successfully',
                    })
                    router.push('/')
                } else {
                    const body = await res.json()
                    toast({
                        variant: 'destructive',
                        title: body.error,
                    })
                    return
                }
            }
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    className="flex cursor-pointer items-center gap-1"
                    href="/"
                >
                    <Image
                        src={
                            theme === 'dark'
                                ? '/icons/logo-dark.svg'
                                : '/icons/logo.svg'
                        }
                        width={42}
                        height={42}
                        alt="Go Stock"
                        className="size-[32px] max-xl:size-14"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold">
                        Go Stock
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-26 lg:text-36 font-semibold">
                        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </h1>
                    <p className="text-16 font-normal text-gray-600 dark:text-gray-200">
                        Please enter your details
                    </p>
                </div>
            </header>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {type === 'sign-up' && (
                        <>
                            <div className="flex gap-4">
                                <CustomInput
                                    control={form.control}
                                    name="firstName"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                />
                                <CustomInput
                                    control={form.control}
                                    name="lastName"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <CustomInput
                                control={form.control}
                                name="address"
                                label="Address"
                                placeholder="Enter your address"
                            />
                        </>
                    )}
                    <CustomInput
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <CustomInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <div className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="form-btn"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />{' '}
                                    &nbsp; Loading...
                                </>
                            ) : type === 'sign-in' ? (
                                'Sign In'
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className="flex justify-center gap-2">
                <p className="text-14 font-normal text-gray-600 dark:text-gray-200">
                    {type === 'sign-in'
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                </p>
                <Link
                    href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                    className="cursor-pointer font-semibold"
                >
                    {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                </Link>
            </footer>
        </section>
    )
}

export default AuthForm

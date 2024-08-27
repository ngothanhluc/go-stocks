'use client'
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

const ResetPasswordForm = () => {
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()
    const resetPasswordFormSchema = z.object({
        email: z.string().email(),
    })
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
        try {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast({
                title: 'Success',
                description:
                    'Message sent to your email, please check your inbox to reset your password',
            })
            router.push('/sign-in')
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
                        Reset Password
                    </h1>
                    <p className="text-16 font-normal text-gray-600 dark:text-gray-200">
                        Please enter your email to reset your password
                    </p>
                </div>
            </header>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <CustomInput
                        control={form.control as any}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
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
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className="flex justify-center gap-2">
                <p className="text-14 font-normal text-gray-600 dark:text-gray-200">
                    Back to sign in?
                </p>
                <Link
                    href={'/sign-in'}
                    className="cursor-pointer font-semibold"
                >
                    Sign in
                </Link>
            </footer>
        </section>
    )
}

export default ResetPasswordForm

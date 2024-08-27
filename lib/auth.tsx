'use client'
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

interface User {
    // Define the properties of the User object
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            // Fetch user data from an API or other source
            // Example:
            const response = await fetch('/api/auth/me')
            const userData = await response.json()
            if (userData.error) {
                setUser(null)
                return
            }
            setUser(userData)
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

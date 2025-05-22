'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/redux/store'
import { login, logout } from '@/lib/redux/slices/authSlice'

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    const handleLogin = (email: string, password: string) => {
        if (email === 'user@example.com' && password === 'pass123') {
            dispatch(login({ email }))
            return true
        }
        return false
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return { isAuthenticated, user, handleLogin, handleLogout }
}
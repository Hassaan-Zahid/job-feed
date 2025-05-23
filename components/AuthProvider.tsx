'use client'

import { Provider } from 'react-redux'
import { persistor, store } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
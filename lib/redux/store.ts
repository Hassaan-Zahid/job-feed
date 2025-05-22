import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './slices/authSlice'
import jobsReducer from './slices/jobsSlice'
import bookmarksReducer from './slices/bookmarksSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobsReducer,
    bookmarks: bookmarksReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'bookmarks'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
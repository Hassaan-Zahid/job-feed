import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Job } from './jobsSlice'

interface BookmarksState {
    bookmarkedJobs: Job[]
}

const initialState: BookmarksState = {
    bookmarkedJobs: [],
}

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmark(state, action: PayloadAction<Job>) {
            if (!state.bookmarkedJobs.some((job) => job.id === action.payload.id)) {
                state.bookmarkedJobs.push(action.payload)
            }
        },
        removeBookmark(state, action: PayloadAction<number>) {
            state.bookmarkedJobs = state.bookmarkedJobs.filter(
                (job) => job.id !== action.payload
            )
        },
        clearBookmarks(state) {
            state.bookmarkedJobs = []
        },
    },
})

export const { addBookmark, removeBookmark, clearBookmarks } =
    bookmarksSlice.actions
export default bookmarksSlice.reducer
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Job {
    id: number
    title: string
    company_name: string
    category: string
    job_type: string
    candidate_required_location: string
    description: string
    salary: string
    url: string
}

interface JobsState {
    allJobs: Job[]
    filteredJobs: Job[]
    loading: boolean
    error: string | null
    searchTerm: string
    filters: { category: string; jobType: string }
    currentPage: number
    jobsPerPage: number
    totalJobs: number
    hasMore: boolean
    categories: string[]
    jobTypes: string[]
}

const initialState: JobsState = {
    allJobs: [],
    filteredJobs: [],
    loading: false,
    error: null,
    searchTerm: '',
    filters: { category: '', jobType: '' },
    currentPage: 1,
    jobsPerPage: 12,
    totalJobs: 0,
    hasMore: true,
    categories: [],
    jobTypes: []
}

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (page: number = 1, { getState }) => {
        const { jobs } = getState() as { jobs: JobsState }
        const offset = (page - 1) * jobs.jobsPerPage
        const res = await axios.get(`https://remotive.com/api/remote-jobs?limit=${jobs.jobsPerPage}&offset=${offset}`)
        const jobList = res.data?.jobs || []

        return {
            jobs: jobList,
            totalJobs: res.data['total-job-count'] || jobList.length,
            page,
            isNewSearch: page === 1
        }
    }
)

export const fetchFilters = createAsyncThunk('jobs/fetchFilters', async () => {
    const { data } = await axios.get('https://remotive.com/api/remote-jobs')
    const jobs = data?.jobs || []

    const categories = [...new Set(jobs?.map((j: Job) => j.category))].filter(Boolean) as string[]
    const jobTypes = [...new Set(jobs?.map((j: Job) => j.job_type))].filter(Boolean) as string[]
    return { categories, jobTypes }
})

// Slice
const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
            state.currentPage = 1
            state.filteredJobs = applyFilters(state)
        },
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filters.category = action.payload
            state.currentPage = 1
            state.filteredJobs = applyFilters(state)
        },
        setJobTypeFilter: (state, action: PayloadAction<string>) => {
            state.filters.jobType = action.payload
            state.currentPage = 1
            state.filteredJobs = applyFilters(state)
        },
        clearFilters: (state) => {
            state.searchTerm = ''
            state.filters = { category: '', jobType: '' }
            state.currentPage = 1
            state.filteredJobs = state.allJobs
        },
        loadMoreJobs: (state) => {
            if (state.hasMore) state.currentPage += 1
        },
        resetJobsState: (state) => {
            return { ...initialState, categories: state.categories, jobTypes: state.jobTypes }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchJobs.fulfilled, (state, { payload }) => {
                state.loading = false
                state.error = null

                const newJobs = payload.jobs.filter((job: { id: number }) => !state.allJobs.some(j => j.id === job.id))
                state.allJobs = payload.isNewSearch ? payload.jobs : [...state.allJobs, ...newJobs]

                state.filteredJobs = applyFilters(state)
                state.totalJobs = payload.totalJobs
                state.currentPage = payload.page
                state.hasMore = state.filteredJobs.length < payload.totalJobs
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch jobs'
            })
            .addCase(fetchFilters.fulfilled, (state, { payload }) => {
                state.categories = payload.categories
                state.jobTypes = payload.jobTypes
            })
    }
})

const applyFilters = (state: JobsState): Job[] => {
    let filtered = [...state.allJobs]

    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase()
        filtered = filtered.filter(
            (j) => j.title.toLowerCase().includes(term) || j.company_name.toLowerCase().includes(term)
        )
    }

    if (state.filters.category) {
        filtered = filtered.filter(j => j.category === state.filters.category)
    }

    if (state.filters.jobType) {
        filtered = filtered.filter(j => j.job_type === state.filters.jobType)
    }

    return filtered
}

export const {
    setSearchTerm,
    setCategoryFilter,
    setJobTypeFilter,
    clearFilters,
    loadMoreJobs,
    resetJobsState
} = jobsSlice.actions

export default jobsSlice.reducer

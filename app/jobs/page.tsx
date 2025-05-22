'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchJobs } from '@/lib/redux/slices/jobsSlice'
import { JobFilters } from '@/components/JobFilters'
import { JobList } from '@/components/JobList'
import { Navbar } from '@/components/Navbar'
import { Pagination } from '@/components/Pagination'

export default function JobsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchJobs(1))
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <main className="container mx-auto px-4 md:px-6 py-6">
                <h1 className="text-3xl font-bold mb-6">Remote Jobs</h1>
                <JobFilters />
                <JobList />
                <Pagination />
            </main>
        </div>
    )
}

'use client'

import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { fetchJobs } from '@/lib/redux/slices/jobsSlice'

export function Pagination() {
    const dispatch = useDispatch()
    const { currentPage, jobsPerPage, totalJobs, loading } = useSelector(
        (state: RootState) => state.jobs
    )

    const totalPages = Math.ceil(totalJobs / jobsPerPage)
    const hasMultiplePages = totalPages > 1

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || loading) return
        dispatch(fetchJobs(page))
    }

    if (!hasMultiplePages) return null

    return (
        <div className="flex items-center justify-center gap-4 mt-10">
            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
            >
                Previous
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
            >
                Next
            </Button>
        </div>
    )
}

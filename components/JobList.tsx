'use client'

import {JobCard} from './JobCard'
import {useSelector} from 'react-redux'
import {RootState} from '@/lib/redux/store'
import {Skeleton} from './ui/skeleton'

const SKELETON_COUNT = 6

export function JobList() {
    const {filteredJobs, loading, error} = useSelector(
        (state: RootState) => state.jobs
    )

    const renderContent = () => {
        if (loading && filteredJobs?.length === 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({length: SKELETON_COUNT}).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-lg"/>
                    ))}
                </div>
            )
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <p className="text-destructive">Oops! {error}</p>
                </div>
            )
        }

        if (filteredJobs?.length === 0) {
            return (
                <div className="text-center py-8">
                    <p>No jobs matched your filters.</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                    <JobCard key={`${job.id}-${job.company_name}`} job={job}/>
                ))}
            </div>
        )
    }

    return (
        <>
            {renderContent()}
        </>
    )
}

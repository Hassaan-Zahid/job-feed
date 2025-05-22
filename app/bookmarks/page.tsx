'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { JobCard } from '@/components/JobCard'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/lib/hooks/useAuth'

export default function BookmarksPage() {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const { bookmarkedJobs } = useSelector((state: RootState) => state.bookmarks)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 md:px-6 py-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Bookmarked Jobs</h1>

                    {bookmarkedJobs?.length === 0 ? (
                        <div className="text-center py-8">
                            <p>No bookmarked jobs yet. Bookmark some jobs to see them here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookmarkedJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { addBookmark, removeBookmark } from '@/lib/redux/slices/bookmarksSlice'
import { Job } from '@/lib/redux/slices/jobsSlice'

import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'

const Pill = ({ text }: { text: string }) => (
    <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
    {text}
  </span>
)

export function JobCard({ job }: { job: Job }) {
    const dispatch = useDispatch()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const isBookmarked = useSelector((state: RootState) =>
        state.bookmarks.bookmarkedJobs.some((bJob) => bJob.id === job.id)
    )

    const toggleBookmark = () =>
        dispatch(isBookmarked ? removeBookmark(job.id) : addBookmark(job))

    return (
        <>
            <Card className="transition-all border hover:shadow-md hover:-translate-y-1 duration-200">
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <h3
                            className="text-lg font-semibold cursor-pointer hover:underline"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            {job.title}
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleBookmark}
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                        >
                            {isBookmarked ? (
                                <BookmarkCheck className="w-5 h-5 text-primary" />
                            ) : (
                                <Bookmark className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.company_name}</p>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Pill text={job.category} />
                        <Pill text={job.job_type} />
                        {job.candidate_required_location && (
                            <Pill text={job.candidate_required_location} />
                        )}
                    </div>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {job.description.replace(/<[^>]*>/g, '')}
                    </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                    {job.salary && <span className="text-sm font-medium">{job.salary}</span>}
                    <Button variant="link" size="sm" asChild>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                            View Job
                        </a>
                    </Button>
                </CardFooter>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
                    <DialogHeader>
                        <DialogTitle>{job.title}</DialogTitle>
                        <p className="text-sm text-muted-foreground">{job.company_name}</p>
                    </DialogHeader>

                    <div className="flex flex-wrap gap-2 my-4">
                        <Pill text={job.category} />
                        <Pill text={job.job_type} />
                        {job.candidate_required_location && (
                            <Pill text={job.candidate_required_location} />
                        )}
                    </div>

                    <div
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                    />

                    <div className="mt-6 flex justify-end">
                        <Button asChild>
                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                                Apply Now
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

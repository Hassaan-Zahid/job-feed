import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-8 p-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Dream Remote Job
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            Browse thousands of remote job listings from top companies worldwide.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
  )
}
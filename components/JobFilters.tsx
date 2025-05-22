'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
    setSearchTerm,
    setCategoryFilter,
    setJobTypeFilter,
    clearFilters,
    fetchFilters,
} from '@/lib/redux/slices/jobsSlice'
import {AppDispatch, RootState} from '@/lib/redux/store'

export function JobFilters() {
    const dispatch = useDispatch<AppDispatch>();
    const { filters, categories, jobTypes } = useSelector((state: RootState) => state.jobs)

    useEffect(() => {
        if (!categories.length || !jobTypes.length) {
            dispatch(fetchFilters())
        }
    }, [dispatch, categories.length, jobTypes.length])

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
                placeholder="Search by title or company..."
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="flex-1"
            />
            <div className="flex gap-2">
                <Dropdown
                    label={filters.category || 'Category'}
                    items={categories}
                    onSelect={(val) => dispatch(setCategoryFilter(val))}
                />
                <Dropdown
                    label={filters.jobType || 'Job Type'}
                    items={jobTypes}
                    onSelect={(val) => dispatch(setJobTypeFilter(val))}
                />
                <Button variant="outline" onClick={() => dispatch(clearFilters())}>
                    Clear
                </Button>
            </div>
        </div>
    )
}

function Dropdown({label, items, onSelect,}: {
    label: string
    items: string[]
    onSelect: (value: string) => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {items.map((item) => (
                    <DropdownMenuItem key={item} onSelect={() => onSelect(item)}>
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

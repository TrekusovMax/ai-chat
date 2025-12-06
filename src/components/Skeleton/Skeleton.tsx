import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export const Skeleton = ({ className }: Props) => (
  <div
    className={twMerge('animate-pulse rounded-md bg-white/20 ', className)}
  ></div>
)

import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
interface Props {
  question: string
  answer: string | null
  isLoading: boolean
}
export const ChatWindow = ({
  question,
  answer,
  isLoading,
}: Props) => {
  return (
    <div className="border border-white/80 rounded-md flex flex-col p-4 gap-4 ">
      <div
        className="bg-white/30 max-w-[100%-40px] p-4 rounded-md border border-white/50
       hover:bg-white/80 transition-all cursor-pointer text-white"
      >
        <b>Вы: </b>
        {question}
      </div>
      <div
        className="bg-white/30 max-w-[100%-40px] p-4 rounded-md self-end border border-white/50
       hover:bg-white/80 transition-all cursor-pointer text-white"
      >
        <b>AI:</b>
        {answer ? (
          answer
        ) : isLoading ? (
          <Skeleton className="w-16 h-4" />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

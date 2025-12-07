'use client'
import { ChatWindow } from '@/src/components'
import { useState } from 'react'

interface DataProps {
  id: number
  question: string
  answer: string | null
  isLoading: boolean
}

export default function Home() {
  const [text, setText] = useState('')
  const [chatHistory, setChatHistory] = useState<
    Omit<DataProps, 'id'>[]
  >([])

  const handleSendMessageToAi = async () => {
    if (!text) return

    setChatHistory((prev) => [
      ...prev,
      {
        question: text,
        answer: null,
        isLoading: true,
      },
    ])

    try {
      const response = await fetch(
        '/api/send-ai',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        },
      )

      const data = await response.json()

      setChatHistory((prev) => {
        const newHistory = [...prev]
        const lastIndex = newHistory.findIndex(
          (item) => item.isLoading,
        )
        if (lastIndex !== -1) {
          newHistory[lastIndex] = {
            question: text,
            answer: data.message,
            isLoading: false,
          }
        }

        return newHistory
      })
      setText('')
    } catch (error: unknown) {
      setChatHistory((prev) => {
        const newHistory = [...prev]
        const lastIndex = newHistory.findIndex(
          (item) => item.isLoading,
        )
        if (lastIndex !== -1) {
          newHistory[lastIndex] = {
            question: text,
            answer:
              'Произошла ошибка при получении ответа. ' +
              {
                error:
                  error instanceof Error
                    ? error.message
                    : 'An unknown error occurred',
              },
            isLoading: false,
          }
        }
        return newHistory
      })
    }
  }

  const handleClearHitory = () => {
    setChatHistory([])
  }

  return (
    <div className="max-w-[1440px] py-20 mx-auto bg-black font-sans">
      <div>
        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="border-white/50 rounded-md outline-none text-xl p-4 resize-none w-full h-40 transition-all
           focus:border-white border text-white"
        />
      </div>
      <div className="flex gap-4 items-center w-full mb-4">
        <button
          className="border border-white/50 flex-1 cursor-pointer rounded-sm bg-black text-white 
        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all p-4"
          onClick={handleSendMessageToAi}
        >
          Отправить в AI
        </button>
        <button
          className="border border-white/50 flex-1 cursor-pointer rounded-sm bg-black text-white 
        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all p-4"
          onClick={handleClearHitory}
        >
          Очистить историю
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl  font-semibold text-center text-white">
          История чата
        </h2>

        {chatHistory.map(
          (
            { answer, question, isLoading },
            idx,
          ) => (
            <ChatWindow
              answer={answer}
              question={question}
              isLoading={isLoading}
              key={idx}
            />
          ),
        )}
      </div>
    </div>
  )
}


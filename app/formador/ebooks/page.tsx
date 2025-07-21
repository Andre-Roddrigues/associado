import EbookPage from '@/components/formadorPage/ebooksFormador/EbookPage'
import React from 'react'
export default function page() {
  return (
    <div className="flex p-8">
    <main className="flex-1 bg-white rounded-lg min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="">
        <EbookPage />
        </div>
      </div>
    </main>
  </div>
  )
}

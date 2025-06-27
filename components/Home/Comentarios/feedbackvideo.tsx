import React from 'react'

function FeedbackVideo() {
  return (
    <div className='flex-1 w-full min-w-80 h-72'>
      
        <video controls className="h-full">
            <source src="/images/Feedback.mp4" type="video/mp4" />
          </video>
    </div>
  )
}

export default FeedbackVideo
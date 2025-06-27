import LoadingBounce from '@/components/ui/loadingBounce'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className=' flex justify-center items-center gap-x-5 gap-y-14 text-muted-foreground p-6 h-full'>

    <div className='h-full flex flex-col items-center justify-center gap-3 min-w-[320px] w-4/5 max-w-screen-md'>
        <LoadingBounce/>
      
    </div>


</div>
  )
}

export default loading
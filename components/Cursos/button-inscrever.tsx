import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function ButtonInscrever() {
  return (
    <Link href="/registro">
        <Button className='h-8 px-8 text-muted-foreground rounded bg-background text-xs xl:text-sm  hover:text-primary hover:bg-background'
        variant={"secondary"}>
            Inscrever-se
        </Button>
    </Link>
  )
}

export default ButtonInscrever
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='w-screen h-screen grid place-items-center'>
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
    </div>
  )
}

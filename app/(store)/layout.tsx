import Navbar from '@/components/store/navbar/Navbar';
import "@/app/globals.css"

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='max-md:overflow-x-hidden'>
      <Navbar />
      {children}
    </div>
  )
}

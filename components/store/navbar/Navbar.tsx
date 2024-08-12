import { createClient } from '@/lib/supabase/server'
import AuthBtns from './AuthBtns'
import CartIcon from './CartIcon'
import Logo from './Logo'
import MobileMenu from './mobileMenu/MobileMenu'
import NavCategories from './NavCategories'
import ProfileIcon from './ProfileIcon'
import Searchbar from './search/Searchbar'

export default async function Navbar() {
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()

  return (
    <nav className='fixed z-[999] h-[4rem] top-0 w-full border-b bg-white'>
      <div className='contain h-full mx-auto flex items-center justify-between'>
        <div className="flex items-center gap-6">
          <Logo />
          <div className='hidden md:block'>
          <NavCategories />
          </div>
        </div>
 
        <div className="flex items-center gap-3">
          <Searchbar />
          <ProfileIcon />
          <CartIcon />
          <AuthBtns user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  )
}

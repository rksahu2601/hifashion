import CartIcon from './CartIcon'
import Logo from './Logo'
import MobileMenu from './mobileMenu/MobileMenu'
import NavCategories from './NavCategories'
import ProfileIcon from './ProfileIcon'
import Searchbar from './search/Searchbar'

export default function Navbar() {
  return (
    <nav className='sticky h-[3rem] top-0 w-full'>
      <div className='max-w-[90rem] h-full mx-auto  px-2 flex items-center justify-between'>
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
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

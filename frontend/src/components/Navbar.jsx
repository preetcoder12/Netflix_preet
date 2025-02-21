import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, LogOut, Menu } from 'lucide-react';
import { userAuthstore } from '../store/AuthUser';
import { useContentStore } from '../store/Content';
const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen) }
    const { user, logout } = userAuthstore();
    const { setContentType } = useContentStore();

    return (
        <header className='relative max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 z-50'>
            <div className="flex items-center gap-10 z-50">

                <Link to='/'>
                    <img src="/netflix-logo.png" alt="netflix logo" className='w-32 sm:w-40' />
                </Link>
            </div>
            {/* desktop navbar items  */}
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to='/' className='hover:underline' onClick={() => { setContentType("movie") }}>
                    Movies
                </Link>
                <Link to='/' className='hover:underline' onClick={() => { setContentType("tv_shows") }} >
                    Tv Shows
                </Link>
                <Link to='/history' className='hover:underline'>
                    Search History
                </Link>
            </div>
            <div className='flex gap-4  item-center z-50'>
                <Link to="/search">
                    <Search className="size-6 cursor-pointer" />
                </Link>
                {/* user logo */}
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />

                <LogOut className="size-6 cursor-pointer " onClick={logout} />
                <div className='sm:hidden'>
                    <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />

                </div>
            </div>
            {/* mobile screen  */}
            {/* The logical && operator ensures that the <div> (mobile menu) is only rendered when isMobileMenuOpen is true */}
            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link to="/" className='block hover:underline p-2' onClick={toggleMobileMenu}>Movies</Link>
                    <Link to="/" className='block hover:underline p-2' onClick={toggleMobileMenu}>Tv Shows </Link>
                    <Link to="/history" className='block hover:underline p-2' onClick={toggleMobileMenu}>Search History</Link>
                </div>
            )}


        </header>
    )
}

export default Navbar

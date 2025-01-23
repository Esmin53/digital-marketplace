import Banner from '../components/Banner'
import BestRated from '../components/BestRated'
import Categories from '../components/Categories'
import Featured from '../components/Featured'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Popular from '../components/Popular'

const Home = () => {
  return (
    <div className='h-screen flex flex-col text-text'>
        <Navbar />
        <div className='flex-1 bg-primary flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12'>
            <Banner />
            <Categories />
            <Featured />
            <Popular />
            <BestRated />
        </div>
        <Footer />
    </div>
  )
}

export default Home
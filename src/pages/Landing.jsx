import Hero from './components/landing/HeroSection'
import FeatureCards from './components/landing/FeatureCards'
import Banner from './components/landing/Banner'
import License from './components/landing/LicenseCars'
import PopularCourse from './components/landing/PopularCourse'
import BestTeachers from './components/landing/BestTeachers'
import Footer from './components/landing/Footer'
import NewsBar from './components/landing/News'
import NavbarHeader from './components/landing/NavbarHeader'

const LandingPage = () => {
  return (
    <div style={{overflow:"hidden"}}>
      <NavbarHeader/>
      <Hero/>
      <FeatureCards/>
      <Banner/>
      <License/>
      <PopularCourse/>
      <BestTeachers/>
      <NewsBar/>
      <Footer/>
    </div>
  )
}

export default LandingPage
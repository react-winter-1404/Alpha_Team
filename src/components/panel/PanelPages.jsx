import Dashboard from "./Pages/Dashboard"
import FavCourses from "./Pages/FavCourses"
import FavMag from "./Pages/FavMag"
import MyCourses from "./Pages/MyCourses"
import MyReserve from "./Pages/MyReserve"
import ProfilePanel from "./Pages/Profile"

const PanelPages = ({dashboard, myCourse, myReserve, favCourses, favMag, profile}) => {

  return (
    <div>
        {dashboard && (<Dashboard/>)}
        {myCourse && (<MyCourses/>)}
        {myReserve && (<MyReserve/>)}
        {favCourses && (<FavCourses/>)}
        {favMag && (<FavMag/>)}
        {profile && (<ProfilePanel/>)}
    </div>
  )
}

export default PanelPages
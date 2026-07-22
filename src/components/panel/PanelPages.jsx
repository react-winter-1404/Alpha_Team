import Dashboard from "./Pages/Dashboard"
import FavCourses from "./Pages/FavCourses"
import FavMag from "./Pages/FavMag"
import MyCourses from "./Pages/MyCourses"
import MyReserve from "./Pages/MyReserve"
import ProfilePanel from "./Pages/Profile"
import NotificationsPage from "./Pages/NotificationsPage"
import Payments from "./Pages/Payments"
import Accounts from "./Pages/Accounts"
import MyAssignments from "./Pages/MyAssignments"

const PanelPages = ({dashboard, myCourse, myReserve, favCourses, favMag, profile, payments, notifications, accounts, assignments, profilePic, setProfilePic}) => {

  return (
    <div>
        {dashboard && (<Dashboard/>)}
        {myCourse && (<MyCourses/>)}
        {myReserve && (<MyReserve/>)}
        {favCourses && (<FavCourses/>)}
        {favMag && (<FavMag/>)}
        {profile && <ProfilePanel profilePic={profilePic} setProfilePic={setProfilePic} />}
        {payments && (<Payments/>)}
        {notifications && (<NotificationsPage/>)}
        {accounts && (<Accounts/>)}
        {assignments && (<MyAssignments/>)}
    </div>
  )
}

export default PanelPages
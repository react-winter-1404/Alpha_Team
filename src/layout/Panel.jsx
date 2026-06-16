
import { useState } from "react"
import PanelPages from "../components/panel/PanelPages"
import ProfilePanel from "../components/panel/Pages/Profile"

const Panel = () => {
    const [dashboard, setDashboard] = useState(true)
    const [myCourse, setMyCourse] = useState(false)
    const [myReserve, setMyReserve] = useState(false)
    const [favCourses, setFavCourses] = useState(false)
    const [favMag, setFavMag] = useState(false)
    const [profile, setProfile] = useState(false)

  return (
    <div className="w-full h-[1370px] p-[20px] m-auto flex justify-center items-start gap-2.5 bg-[#f0f0f0] rounded-[16px]">
        <div className="w-[276px] h-[976px] p-4 rounded-[16px] bg-[#fefdff]">
            <div className=" w-full h-[60px] flex justify-center items-center">
                <img src="/public/icons/Untitled-1 2.png" alt="" className="w-[54px] h-[52px]"/>
                <img src="/public/icons/Untitled-1 3.png" alt="" className="mt-4 w-[189.1px] h-[37.69px]"/>
            </div>

            <div className="flex flex-col  items-start mt-10">
                <div>
                    <h4 className="text-[16px] mb-2.5 text-[#787878]">عمومی</h4>
                    <ul className="w-full">
                        <li onClick={() => {
                                setDashboard(true)
                                setMyCourse(false)
                                setMyReserve(false)
                                setFavCourses(false)
                                setFavMag(false)
                                setProfile(false)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] bg-[#3772ff] text-right flex justify-start items-center cursor-pointer">
                            <img src="/public/icons/dashboard-circle-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] indent-4 text-[#fefdff]">داشبورد</span>
                        </li>

                        <li onClick={() => {
                                setDashboard(false)
                                setMyCourse(true)
                                setMyReserve(false)
                                setFavCourses(false)
                                setFavMag(false)
                                setProfile(false)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center text-[#272727] bg-[#ecebec] cursor-pointer">
                            <img src="/public/icons/book-02-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] text-[#272727] indent-4">دوره من</span>
                        </li>

                        <li onClick={() => {
                                setDashboard(false)
                                setMyCourse(false)
                                setMyReserve(true)
                                setFavCourses(false)
                                setFavMag(false)
                                setProfile(false)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-[#ecebec] cursor-pointer">
                            <img src="/public/icons/time-setting-03-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] text-[#272727]  indent-4">رزرو من</span>
                        </li>

                        <li onClick={() => {
                                setDashboard(false)
                                setMyCourse(false)
                                setMyReserve(false)
                                setFavCourses(true)
                                setFavMag(false)
                                setProfile(false)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-[#ecebec] cursor-pointer">
                            <img src="/public/icons/book-bookmark-02-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] text-[#272727] indent-4">علاقه مندی دوره</span>
                        </li>

                        <li onClick={() => {
                                setDashboard(false)
                                setMyCourse(false)
                                setMyReserve(false)
                                setFavCourses(false)
                                setFavMag(true)
                                setProfile(false)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-[#ecebec] cursor-pointer">
                            <img src="/public/icons/file-bookmark-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] text-[#272727] indent-4">علاقه مندی مقالات</span>
                        </li>

                        <li onClick={() => {
                                setDashboard(false)
                                setMyCourse(false)
                                setMyReserve(false)
                                setFavCourses(false)
                                setFavMag(false)
                                setProfile(true)
                            }} className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-[#ecebec] cursor-pointer">
                            <img src="/public/icons/user-edit-01-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                            <span className="text-[18px] text-[#272727] indent-4">پروفایل</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h4 className="text-[16px] mb-2.5 text-[#787878]">مالی</h4>

                    <div className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-[#ecebec] cursor-pointer">
                        <img src="/public/icons/money-send-02-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                        <span className="text-[18px] indent-4 text-[#272727]">پرداخت ها</span>
                    </div>
                </div>
            </div>

            <div className="mt-40">
                <ul>
                    <li className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center text-[#272727] bg-[#ecebec] cursor-pointer">
                        <img src="/public/icons/user-settings-01-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                        <span className="text-[18px] text-[#272727] indent-4">حساب های کاربری</span>
                    </li>

                    <li className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center text-[#272727] bg-[#ecebec] cursor-pointer">
                        <img src="/public/icons/logout-03-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px] mr-3"/>
                        <span className="text-[18px] text-[#ff5454] indent-4">خروج از حساب</span>
                    </li>
                </ul>
            </div>

        </div>

        <div className="w-[1096px] h-full rounded-[16px]">
            <div className="w-full h-[80px] p-2.5 rounded-[16px] bg-[#fefdff] flex justify-between items-center">
                <div className=" w-[#200px] h-full flex justify-center items-center gap-3">
                    <img src="/public/images/Hark.png" alt="" className="w-[56px] h-[56px]"/>
                    <div>
                        <span className="text-[20px] text-[#272727] block">پارسا آقایی</span>
                        <span className="text-[16px] text-[#272727] block">ادمین، دانشجو</span>
                    </div>
                </div>

                <div className="flex justify-between items-center w-[120px] h-full">
                    <button className="relative w-[56px] h-[56px] border-solid border dark:border-gray-600 rounded-full border-gray-200 text-center">
                        <img src="/public/icons/notification-02-stroke-rounded 1.png" alt="" className="m-auto"/>
                        <div className="w-[20px] h-[20px] rounded-full bg-[#ff5454] border border-[2px] absolute top-[35px] flex justify-center items-center text-[14px]">5</div>
                    </button>

                    <button className="w-[56px] h-[56px] cursor-pointer border-solid border dark:border-gray-600 rounded-full border-gray-200 text-center">
                        <img src="/public/icons/moon-02-stroke-rounded 2.png" alt="" className="m-auto"/>
                    </button>
                    
                </div>
            </div>
            
            <PanelPages dashboard={dashboard} myCourse={myCourse} myReserve={myReserve} favCourses={favCourses} favMag={favMag} profile={profile}/>
        </div>
    </div>
  )
}

export default Panel
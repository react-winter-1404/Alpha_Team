import { useEffect, useState } from "react"
import { News } from "../../../core/services/get"

const NewsBar = () => {
  const [course, setCourse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      const fetchCourses = async () => {
      setIsLoading(true)
  
      try {
        const response = await News({pageNumber:1, rowsOfPage:4})
        setCourse(response.data.news)
        console.log("دیتای دریافتی از سمت سرور", response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    }
      fetchCourses()
    }, [])

  return (
    <div className="m-auto mt-[60px] w-[95%]">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[28px] md:text-[40px]">اخبار و مقالات هفته</span>
        <span className="block text-[14px] md:text-[20px]">خبر ها و مقاله هایی که در این هفته منتشر شدند</span>
      </div>

      <div className="w-full h-full flex flex-wrap justify-center align-middle gap-4 ">
        {
          isLoading ? (<p>در حال فراخوانی...</p>):
          (
          course.map((e) => (
            <div key={e.id} className="relative text-[#272727] bg-[#ece8e8] h-[530px] w-[90%] md:w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
              
              <img src={e.currentImageAddress} alt="" className="p-0 bg-pink-500 rounded-[20px] w-full h-[35%]"/>

              <div className="p-2 flex flex-col gap-4">

                <h3 className="text-[20px] md:text-[24px]">{e.title}</h3>

                <p className="text-[14px] md:text-[16px] w-[80%] h-[45px] text-[#787878] overflow-hidden">{e.describe}</p>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/quill-write-02-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">{e.addUserFullName}</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/view-stroke-rounded (1) 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">{e.currentView}</span>
                </div>

                <div className="flex justify-between align-middle">
                  <div className="w-[120px] flex justify-between align-middle pt-2">
                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/public/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                      <span className="text-[16px]">{e.currentLikeCount}</span>
                    </div>

                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/public/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6"/>
                      <span span className="text-[16px]">{e.currentDissLikeCount}</span>
                    </div>
                  </div>

                  <button className="w-[40%] h-[40px] bg-[#3772ff] rounded-[65px] text-[14px] md:text-[16px] text-[#fefdff]">بیشتر بخوانید</button>

                </div>

              </div>

              <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]"></div>
              <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">{e.newsCatregoryName}</div>


            </div>
          
          ))
          )
        }
      </div>
    </div>
  )
}

export default NewsBar
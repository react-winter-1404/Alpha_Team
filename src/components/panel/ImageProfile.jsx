import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  postAddProfileImage,
  postSelectProfileImage,
} from "../../core/services/userPanel/post";
import { getUserProfile } from "../../core/services/userPanel/get";
import { DeleteProfileImage } from "../../core/services/userPanel/delete";

const ImageProfile = ({onProfileChange}) => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      if (response.data.userPicture && response.data.userPicture.length > 0) {
        const currentMainPic = response.data.currentPictureAddress;

        const serverImages = response.data.userPicture.map((pic) => ({
          image: pic.puctureAddress,
          id: pic.id,
          file: null,
          main: pic.puctureAddress === currentMainPic,
          option: false,
          isFromServer: true,
        }));
        setImageList(serverImages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchAddProfileImage = async (data) => {
    const formData = new FormData();
    formData.append("formFile", data);
    try {
      const response = await postAddProfileImage(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    }
  };

  const fetchSelectProfileImage = async (data) => {
    const formData = new FormData();
    formData.append("ImageId", data);
    try {
      const response = await postSelectProfileImage(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    }
  };

  const fetchDeleteProfileImage = async (id) => {
  const formData = new FormData();
  formData.append("DeleteEntityId", id);
  console.log(formData)
  try {
    const response = await DeleteProfileImage(formData);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message || "خطا در حذف عکس");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
  }
};

  const fileHandler = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const imgURL = URL.createObjectURL(image);
    fetchAddProfileImage(image);
    setImageList((i) => [
      ...i,
      {
        image: imgURL,
        file: image,
        main: false,
        option: false,
      },
    ]);
  };

  const imageOptionsHandler = (e) => {
    setImageList((prevList) =>
      prevList.map((l) => {
        if (l.image == e) {
          return { ...l, option: !l.option };
        }
        return { ...l, option: false };
      }),
    );
  };

  const mainImageHandler = (e, x) => {
    setImageList((prevList) =>
      prevList.map((l) => {
        if (l.image == e) {
          if (x) fetchSelectProfileImage(x);
          if (onProfileChange) onProfileChange(e);
          return { ...l, main: true };
        }
        return { ...l, main: false };
      }),
    );
  };

  const deleteImageHandler = (e, id) => {
  setImageList((prev) => prev.filter((item) => item.image !== e));
  if (id) fetchDeleteProfileImage(id);
};

  return (
    <div className="w-full h-[580px] p-2">
      <div className="h-full w-full flex flex-wrap justify-start items-start gap-5 p-2 overflow-y-auto">

        <div className="w-[148px] h-[148px] md:w-[225px] md:h-[225px] border rounded-[10px] flex flex-col justify-center items-center">
          <input type="file" id="choose" onChange={(event) => fileHandler(event)} className="hidden"/>
          <label htmlFor="choose" className="flex flex-col justify-center items-center cursor-pointer">
            <img src="/public/icons/Group 148.png" alt="" className="h-[32px] w-[32px] mb-[10px]"/>
            <span className="block text-[16px] text-[#000000]">اضافه کردن عکس</span>
          </label>
          <span className="block text-[14px] text-[#787878]">
            اندازه فریم ( 236*236 )
          </span>
        </div>

        {
          imageList.map((i, index) => (
            <div key={index} className="relative w-[148px] h-[148px] md:w-[225px] md:h-[225px] border p-3 rounded-[10px] bg-[#5865f2]">
              <img src={i.image} alt="" className="h-full w-full "/>

              <img onClick={() => imageOptionsHandler(i.image)} src="/public/icons/Group 152.png" alt="" className="w-[32px] h-[32px] rounded-fulll absolute top-2 right-2 cursor-pointer"/>
              <img src="/public/icons/Group 155.png" alt="" className={`${i.main ? "w-[32px] h-[32px] rounded-fulll absolute top-2 right-12 cursor-pointer" : "hidden"}`} /> 
              
              <div className={`${i.option ? `w-[200px] h-[90px] md:w-[234px] md:h-[112px] rounded-[16px] bg-[#ffffff] absolute top-12 right-0 flex flex-col` : `hidden`}`}>
                <div onClick={() => mainImageHandler(i.image)}  className="h-[50%] cursor-pointer border-b flex justify-start items-center gap-3 p-2">
                  <img src="/public/icons/checkmark-circle-02-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]"/>
                  <span className="text-[16px] text-[#272727]">انتخاب عکس اصلی</span>
                </div>
              </div>

            <div className={`${i.option ? `w-[234px] h-[112px] rounded-[16px] bg-[#ffffff] absolute top-12 right-0 flex flex-col` : `hidden`}`}>
              <div onClick={() => mainImageHandler(i.image, i.id)} className="h-[50%] cursor-pointer border-b flex justify-start items-center gap-3 p-2">
                <img src="/public/icons/checkmark-circle-02-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]"/>
                <span className="text-[16px] text-[#272727]">انتخاب عکس اصلی</span>
              </div>

              <div
                onClick={() => {
                  deleteImageHandler(i.image, i.id);
                }}
                className="h-[50%] cursor-pointer flex justify-start items-center gap-3 p-2"
              >
                <img
                  src="/public/icons/delete-02-stroke-rounded 1.png"
                  alt=""
                  className="w-[24px] h-[24px]"
                />
                <span className="text-[16px] text-[#ff5454]">حذف عکس</span>
              </div>
            </div>
          </div>
        ))
        }

      </div>
    </div>
  );
};

export default ImageProfile;

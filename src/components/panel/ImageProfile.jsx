import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  postAddProfileImage,
  postSelectProfileImage,
} from "../../core/services/userPanel/post";
import { getUserProfile } from "../../core/services/userPanel/get";
import { DeleteProfileImage } from "../../core/services/userPanel/delete";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalCircle01Icon, ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@heroui/react";

const ImageProfile = ({ onProfileChange }) => {
  const { t } = useTranslation("panel");
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      if (response?.data?.userPicture && response.data.userPicture.length > 0) {
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
      } else {
        setImageList([]);
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

  const fetchAddProfileImage = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("formFile", file);

    try {
      const response = await postAddProfileImage(formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
        await fetchUserProfile();
      } else {
        toast.error(response?.data?.message || t("profile.errorUpload"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("profile.serverError"));
    } finally {
      setIsUploading(false);
    }
  };

  const fetchSelectProfileImage = async (id) => {
    const formData = new FormData();
    formData.append("ImageId", id);

    try {
      const response = await postSelectProfileImage(formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data?.message || t("profile.errorSelect"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("profile.serverError"));
    }
  };

  const fetchDeleteProfileImage = async (id) => {
    const formData = new FormData();
    formData.append("DeleteEntityId", id);

    try {
      const response = await DeleteProfileImage(formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data?.message || t("profile.errorDelete"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("profile.serverError"));
    }
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fetchAddProfileImage(file);
    e.target.value = null;
  };

  const imageOptionsHandler = (targetImage) => {
    setImageList((prevList) =>
      prevList.map((item) => ({
        ...item,
        option: item.image === targetImage ? !item.option : false,
      }))
    );
  };

  const mainImageHandler = (targetImage, id) => {
    setImageList((prevList) =>
      prevList.map((item) => {
        if (item.image === targetImage) {
          if (id) fetchSelectProfileImage(id);
          if (onProfileChange) onProfileChange(targetImage);
          return { ...item, main: true, option: false };
        }
        return { ...item, main: false, option: false };
      })
    );
  };

  const deleteImageHandler = (targetImage, id) => {
    setImageList((prev) => prev.filter((item) => item.image !== targetImage));
    if (id) fetchDeleteProfileImage(id);
  };

  return (
    <div className="w-full h-[580px] p-2">
      <div className="h-full w-full flex flex-wrap justify-start items-start gap-5 p-2 overflow-y-auto">
        <div className="w-[180px] h-[180px] md:w-[236px] md:h-[236px] border-4 border-default rounded-[24px] flex flex-col bg-overlay justify-center items-center shadow-sm">
          <input
            type="file"
            id="choose"
            accept="image/*"
            disabled={isUploading}
            onChange={fileHandler}
            className="hidden"
          />
          <label
            htmlFor="choose"
            className={`flex flex-col justify-center items-center cursor-pointer ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <HugeiconsIcon
              icon={ImageAdd02Icon}
              className="w-[40px] h-[40px] text-accent mb-[12px]"
            />
            <span className="block text-[16px] md:text-[18px] font-medium text-foreground mb-1">
              {isUploading ? "..." : t("profile.addImage")}
            </span>
          </label>
          <span className="block text-[12px] md:text-[14px] text-muted">
            {t("profile.imageSize")}
          </span>
        </div>

        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="w-[180px] h-[180px] md:w-[236px] md:h-[236px] rounded-[24px]"
            />
          ))
        ) : (
          imageList.map((item) => (
            <div
              key={item.id || item.image}
              className="relative w-[180px] h-[180px] md:w-[236px] md:h-[236px] border border-border rounded-[24px] overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />

              <div
                onClick={() => imageOptionsHandler(item.image)}
                className="w-[32px] h-[32px] flex items-center justify-center absolute top-3 right-3 border border-border rounded-full shadow bg-overlay cursor-pointer z-10"
              >
                <HugeiconsIcon
                  icon={MoreVerticalCircle01Icon}
                  className="w-5 h-5 text-foreground"
                />
              </div>

              {item.main && (
                <img
                  src="/icons/Group 155.png"
                  alt="Main Profile"
                  className="w-[32px] h-[32px] rounded-full absolute top-3 right-14 z-10"
                />
              )}

              {item.option && (
                <div className="w-[234px] h-[112px] rounded-[16px] bg-overlay shadow-lg absolute top-14 right-3 flex flex-col z-20 border border-border">
                  <div
                    onClick={() => mainImageHandler(item.image, item.id)}
                    className="h-[50%] cursor-pointer border-b border-separator flex justify-start items-center gap-3 p-2 hover:bg-default transition-colors rounded-t-[16px]"
                  >
                    <img
                      src="/icons/checkmark-circle-02-stroke-rounded 1.png"
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                    <span className="text-[16px] text-foreground">
                      {t("profile.selectMainImage")}
                    </span>
                  </div>

                  <div
                    onClick={() => deleteImageHandler(item.image, item.id)}
                    className="h-[50%] cursor-pointer flex justify-start items-center gap-3 p-2 hover:bg-default transition-colors rounded-b-[16px]"
                  >
                    <img
                      src="/icons/delete-02-stroke-rounded 1.png"
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                    <span className="text-[16px] text-danger">
                      {t("profile.deleteImage")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageProfile;
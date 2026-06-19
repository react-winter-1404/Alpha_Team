import { useEffect, useState } from "react";
import PersonalProfie from "../PersonalProfie";
import ImageProfile from "../ImageProfile";
import AddressProfile from "../AddressProfile";
import LinksProfile from "../LinksProfile";
import { getUserProfile } from "../../../core/services/userPanel/get";

const ProfilePanel = () => {
  const [personal, setPersonal] = useState(true);
  const [image, setImage] = useState(false);
  const [addres, setAddres] = useState(false);
  const [links, setLinks] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [birthDay, setBirthDay] = useState([]);
  const [userRoles, setUserRoles] = useState("");

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      setBirthDay(response.data.birthDay);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    setUserRoles(JSON.parse(localStorage.getItem("roles")));
  }, []);

  return (
    <div>
      <div className="w-full h-[320px] bg-[#fefdff] mt-[20px] rounded-t-[16px]">
        <div className="relative w-full h-[113px] rounded-[16px] bg-[#3772ff]">
          <div className="w-[128px] h-[128px] rounded-full bg-[#427efc] border-white border-[5px] absolute top-[60px] right-[35px]">
            <img
              src={userProfile.currentPictureAddress}
              alt=""
              className="m-auto rounded-full "
            />
            <div className="w-[24px] h-[24px] bg-[#3772ff] border-[#fefdff] border[3px] rounded-full absolute top-[85px] right-1">
              <img
                src="/public/images/Group 148.png"
                alt=""
                className="m-auto"
              />
            </div>
          </div>
        </div>

        <div className="p-[30px] w-full h-[120px] flex justify-between items-center">
          <div className="w-[550px] h-[30px]">
            <div className="flex justify-start items-center gap-4 mt-10">
              <h3 className="text-[36px] text-[#272727]">
                {userProfile.fName + " " + userProfile.lName}
              </h3>
              <span className="text-[16px] text-[#787878] mt-4">
                (
                { userRoles && userRoles.map((role, index) => (
                  <span key={index}>
                    {role}
                    {index < userRoles.length - 1 && ", "}
                  </span>
                ))}
                )
              </span>
            </div>

            <div className="flex justify-start items-center gap-2 mt-4">
              <div className="flex justify-center items-center gap-2">
                <img
                  src="/public/icons/smart-phone-01-stroke-rounded 2.png"
                  alt=""
                  className="w-[20px] h-[28.53px]"
                />
                <span className="text-[16px]">{userProfile.phoneNumber}</span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <img
                  src="/public/icons/account-setting-03-stroke-rounded 2.png"
                  alt=""
                  className="w-[20px] h-[28.53px]"
                />
                <span className="text-[16px]">
                  {birthDay &&
                    new Date(birthDay).toLocaleDateString("fa-IR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <img
                  src="/public/icons/mail-02-stroke-rounded 1.png"
                  alt=""
                  className="w-[20px] h-[28.53px]"
                />
                <span className="text-[16px]">{userProfile.gmail}</span>
              </div>

              <img
                src="/public/icons/pencil-edit-01-stroke-rounded 2.png"
                alt=""
                className="w-[24px] h-[24px]"
              />
            </div>
          </div>

          <div className="w-[400px] h-[30px] mt-30">
            <span className="text-[16px] text-[#787878]">درباره من</span>
            <p className="text-[16px] text-[#272727] mt-2">
              {userProfile.userAbout}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#fefdff] border-b p-[30px] w-full h-[60px] flex justify-start items-center gap-6 text-[20px] text-[#272727] ">
        <span
          onClick={() => {
            setPersonal(true);
            setImage(false);
            setAddres(false);
            setLinks(false);
          }}
          className={`cursor-pointer opacity-[0.5] -mb-6.5   
          ${
            personal
              ? "opacity-[1] border-b-[#3772ff] border-b-3"
              : "opacity-[0.5] border-none"
          }`}
        >
          اطلاعات شخصی
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(true);
            setAddres(false);
            setLinks(false);
          }}
          className={`cursor-pointer opacity-[0.5] -mb-6.5   
          ${
            image
              ? "opacity-[1] border-b-[#3772ff] border-b-3"
              : "opacity-[0.5] border-none"
          }`}
        >
          عکس پروفایل
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(false);
            setAddres(true);
            setLinks(false);
          }}
          className={`cursor-pointer opacity-[0.5] -mb-6.5   
          ${
            addres
              ? "opacity-[1] border-b-[#3772ff] border-b-3"
              : "opacity-[0.5] border-none"
          }`}
        >
          آدرس سکونت
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(false);
            setAddres(false);
            setLinks(true);
          }}
          className={`cursor-pointer opacity-[0.5] -mb-6.5   
          ${
            links
              ? "opacity-[1] border-b-[#3772ff] border-b-3"
              : "opacity-[0.5] border-none"
          }`}
        >
          لینک ها
        </span>
      </div>

      <div className="bg-[#fefdff] w-full  rounded-b-[16px]">
        <div
          className={`${personal ? "h-full w-full rounded-b-[16px]" : "hidden"}
          `}
        >
          <PersonalProfie />
        </div>

        <div
          className={`${image ? "h-full w-full" : "hidden"}
          `}
        >
          <ImageProfile />
        </div>

        <div
          className={`${addres ? "h-full w-full" : "hidden"}
          `}
        >
          <AddressProfile />
        </div>

        <div
          className={`${links ? "h-full w-full" : "hidden"}
          `}
        >
          <LinksProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;

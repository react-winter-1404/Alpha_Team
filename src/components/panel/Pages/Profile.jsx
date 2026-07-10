import { useEffect, useState } from "react";
import PersonalProfie from "../PersonalProfie";
import ImageProfile from "../ImageProfile";
import AddressProfile from "../AddressProfile";
import LinksProfile from "../LinksProfile";
import { getUserProfile } from "../../../core/services/userPanel/get";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmartPhone01Icon, AccountSetting03Icon, Mail02Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

const ProfilePanel = ({ profilePic, setProfilePic }) => {
  const { t } = useTranslation("panel");
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
      setProfilePic(response.data.currentPictureAddress || "");
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
      <div className="w-full bg-overlay mt-[20px] rounded-t-[16px]">
        <div className="relative w-full h-[113px] rounded-[16px] bg-accent">
          <div className="w-[128px] h-[128px] rounded-full bg-accent border-overlay border-[5px] absolute top-[60px] right-[35px]">
            <img
              src={profilePic || userProfile.currentPictureAddress}
              alt=""
              className="m-auto rounded-full w-full h-full object-cover"
            />
            <div className="w-[24px] h-[24px] bg-accent border-overlay border-[3px] rounded-full absolute top-[85px] right-1"></div>
          </div>
        </div>

        <div className="p-[30px] w-full flex flex-col md:flex-row justify-start items-start md:gap-80">
          <div className="flex flex-col justify-start items-start">
            <div className="w-full flex justify-start items-center gap-3 mt-10">
              <h3 className="text-[24px] md:text-[36px] text-foreground">
                {userProfile.fName + " " + userProfile.lName}
              </h3>

              <span className="text-[14px] md:text-[16px] text-muted mt-4 w-[100px]">
                (
                {userRoles &&
                  userRoles.map((role, index) => (
                    <span key={index}>
                      {role}
                      {index < userRoles.length - 1 && ", "}
                    </span>
                  ))}
                )
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2 mt-4">
              <div className="flex justify-center items-center gap-2">
                <HugeiconsIcon icon={SmartPhone01Icon} className="mr-3 w-6 h-6 text-muted" />
                <span className="text-[16px] text-foreground">{userProfile.phoneNumber}</span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <HugeiconsIcon icon={AccountSetting03Icon} className="mr-3 w-6 h-6 text-muted" />
                <span className="text-[16px] text-foreground">
                  {birthDay &&
                    new Date(birthDay).toLocaleDateString("fa-IR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <HugeiconsIcon icon={Mail02Icon} className="mr-3 w-6 h-6 text-muted" />
                <span className="text-[16px] text-foreground">{userProfile.gmail}</span>
              </div>

              <HugeiconsIcon icon={PencilEdit01Icon} className="mr-3 w-6 h-6 text-accent" />
            </div>
          </div>

          <div className="mt-10 md:mt-20">
            <span className="text-[16px] text-muted">{t("profile.aboutMe")}</span>
            <p className="text-[16px] text-foreground mt-2">
              {userProfile.userAbout}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-overlay border-b border-separator px-[30px] py-[20px] h-[65px] w-full flex justify-start items-center gap-6 text-[16px] md:text-[20px] text-foreground overflow-x-auto whitespace-nowrap overflow-y-hidden">
        <span
          onClick={() => {
            setPersonal(true);
            setImage(false);
            setAddres(false);
            setLinks(false);
          }}
          className={`cursor-pointer -mb-7.5 ${
            personal
              ? "opacity-100 border-b-accent border-b-3"
              : "opacity-50 border-none"
          }`}
        >
          {t("profile.personalInfo")}
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(true);
            setAddres(false);
            setLinks(false);
          }}
          className={`cursor-pointer -mb-7.5 ${
            image
              ? "opacity-100 border-b-accent border-b-3"
              : "opacity-50 border-none"
          }`}
        >
          {t("profile.profileImage")}
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(false);
            setAddres(true);
            setLinks(false);
          }}
          className={`cursor-pointer -mb-7.5 ${
            addres
              ? "opacity-100 border-b-accent border-b-3"
              : "opacity-50 border-none"
          }`}
        >
          {t("profile.homeAddress")}
        </span>

        <span
          onClick={() => {
            setPersonal(false);
            setImage(false);
            setAddres(false);
            setLinks(true);
          }}
          className={`cursor-pointer -mb-7.5 ${
            links
              ? "opacity-100 border-b-accent border-b-3"
              : "opacity-50 border-none"
          }`}
        >
          {t("profile.links")}
        </span>
      </div>

      <div className="bg-overlay w-full rounded-b-[16px]">
        <div className={`${personal ? "h-full w-full rounded-b-[16px]" : "hidden"}`}>
          <PersonalProfie
            progressPercent={userProfile.profileCompletionPercentage}
          />
        </div>

        <div className={`${image ? "h-full w-full" : "hidden"}`}>
          <ImageProfile onProfileChange={setProfilePic} />
        </div>

        <div className={`${addres ? "h-full w-full" : "hidden"}`}>
          <AddressProfile />
        </div>

        <div className={`${links ? "h-full w-full" : "hidden"}`}>
          <LinksProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
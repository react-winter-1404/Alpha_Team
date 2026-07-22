import { useEffect, useState } from "react";
import PersonalProfie from "../PersonalProfie";
import ImageProfile from "../ImageProfile";
import AddressProfile from "../AddressProfile";
import LinksProfile from "../LinksProfile";
import { getUserProfile } from "../../../core/services/userPanel/get";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartPhone01Icon,
  AccountSetting03Icon,
  Mail02Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

const ProfilePanel = ({ profilePic, setProfilePic }) => {
  const { t } = useTranslation("panel");

  const [activeTab, setActiveTab] = useState("personal");

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      if (response?.data) {
        setUserProfile(response.data);
        setProfilePic(response.data.currentPictureAddress || "");
      }
    } catch (error) {
      console.error("خطا در دریافت اطلاعات پروفایل:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    try {
      const savedRoles = localStorage.getItem("roles");
      if (savedRoles) setUserRoles(JSON.parse(savedRoles));
    } catch (e) {
      console.error("خطا در خواندن نقش‌ها از Storage:", e);
    }
  }, []);

  const tabs = [
    { id: "personal", label: t("profile.personalInfo") },
    { id: "image", label: t("profile.profileImage") },
    { id: "address", label: t("profile.homeAddress") },
    { id: "links", label: t("profile.links") },
  ];

  const formattedBirthDay = userProfile?.birthDay
    ? new Date(userProfile.birthDay).toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "---";

  return (
    <div className="w-full">
      <div className="w-full bg-overlay mt-5 rounded-t-2xl">
        <div className="relative w-full h-[113px] rounded-2xl bg-accent ">
          <div className="w-[128px] h-[128px] rounded-full bg-accent border-overlay border-[5px] absolute top-[60px] right-8 overflow-hidden z-10">
            <img
              src={profilePic || userProfile?.currentPictureAddress || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-8 w-full flex flex-col md:flex-row justify-between items-start gap-8 pt-16">
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center gap-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {userProfile
                  ? `${userProfile.fName || ""} ${userProfile.lName || ""}`
                  : "در حال دریافت..."}
              </h3>

              {Array.isArray(userRoles) && userRoles.length > 0 && (
                <span className="text-sm md:text-base text-muted">
                  ({userRoles.join("، ")})
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={SmartPhone01Icon} className="w-5 h-5 text-muted" />
                <span className="text-sm md:text-base text-foreground">
                  {userProfile?.phoneNumber || "---"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={AccountSetting03Icon} className="w-5 h-5 text-muted" />
                <span className="text-sm md:text-base text-foreground">
                  {formattedBirthDay}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Mail02Icon} className="w-5 h-5 text-muted" />
                <span className="text-sm md:text-base text-foreground">
                  {userProfile?.gmail || "---"}
                </span>
              </div>

              <button className="p-1 hover:bg-default rounded-lg transition-colors">
                <HugeiconsIcon icon={PencilEdit01Icon} className="w-5 h-5 text-accent" />
              </button>
            </div>
          </div>

          <div className="max-w-md">
            <span className="text-sm font-medium text-muted">{t("profile.aboutMe")}</span>
            <p className="text-sm md:text-base text-foreground mt-1 leading-relaxed">
              {userProfile?.userAbout || "توضیحاتی ثبت نشده است."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-overlay border-b border-border px-4 md:px-8 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-lg text-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-12 md:h-16 border-b-2 font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-accent opacity-100 text-accent"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-overlay w-full rounded-b-2xl p-4 md:p-6">
        {activeTab === "personal" && (
          <PersonalProfie
            progressPercent={userProfile?.profileCompletionPercentage || 0}
          />
        )}
        {activeTab === "image" && (
          <ImageProfile onProfileChange={setProfilePic} />
        )}
        {activeTab === "address" && <AddressProfile />}
        {activeTab === "links" && <LinksProfile />}
      </div>
    </div>
  );
};

export default ProfilePanel;
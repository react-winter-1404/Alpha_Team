import { useEffect, useState } from "react";
import Footer from "../components/landing/Footer";
import NavbarHeader from "../components/landing/NavbarHeader";
import { useParams } from "react-router-dom";
import NewsInfoBox from "../components/newsDetail/NewsInfoBox";
import { getNewsDetails } from "../core/services/News/get";
import NewsDetailSection from "../components/newsDetail/NewsDetailSection";
import { Skeleton } from "@heroui/react";
import { useTranslation } from "react-i18next";

const NewsDetailSkeleton = () => {
  return (
    <div className="w-[90.5%] flex flex-col lg:flex-row items-start gap-10 lg:gap-[4.75%] pt-16">
      <div className="w-full lg:w-[35%] space-y-6 p-6 rounded-2xl bg-overlay border border-border">
        <Skeleton className="h-8 w-3/4 rounded-lg bg-default" />
        <Skeleton className="h-5 w-1/2 rounded-lg bg-default" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
        </div>
        <div className="flex gap-3 items-center pt-4">
          <Skeleton className="h-10 w-10 rounded-full bg-default" />
          <Skeleton className="h-4 w-24 rounded-lg bg-default" />
        </div>
      </div>

      <div className="w-full lg:w-[60%] space-y-6 p-6 rounded-2xl bg-overlay border border-border">
        <Skeleton className="h-[300px] w-full rounded-2xl bg-default" />
        <Skeleton className="h-8 w-2/4 rounded-lg bg-default" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-5/6 rounded-lg bg-default" />
        </div>
      </div>
    </div>
  );
};

const NewsDetailPage = () => {
  const { t } = useTranslation("news");
  const Params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newsDetail, setNewsDetail] = useState(null);
  const [newsRate, setNewsRate] = useState(0);

  const fetchNewsDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getNewsDetails({ Id: Params.id });
      setNewsDetail(response.data.detailsNewsDto);
      setNewsRate(response.data.detailsNewsDto.newsRate?.avg || 0);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, [Params.id]);

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center bg-overlay">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl text-danger">{t("detail.loadError")}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-overlay">
      <NavbarHeader />

      {isLoading || !newsDetail ? (
        <NewsDetailSkeleton />
      ) : (
        <div className="w-full flex flex-col items-center dynamic-fade-in">
          <div className="flex flex-col lg:flex-row items-start w-[90.5%] gap-10 lg:gap-[4.75%] pt-16">
            <NewsInfoBox
              newsId={Params.id}
              title={newsDetail.title}
              insertDate={newsDetail.insertDate}
              newsCatregoryName={newsDetail.newsCatregoryName}
              currentView={newsDetail.currentView}
              addUserFullName={newsDetail.addUserFullName}
              addUserProfileImage={newsDetail.addUserProfileImage}
              newsRate={newsRate}
              isFavorite={false}
              userIsLiked={newsDetail.currentUserIsLike}
              currentUserDissLike={newsDetail.currentUserIsDissLike}
            />
            <NewsDetailSection
              newsId={Params.id}
              imageAddress={newsDetail.currentImageAddress}
              miniDescribe={newsDetail.miniDescribe}
              describe={newsDetail.describe}
              newsTitle={newsDetail.title}
            />
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dynamic-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default NewsDetailPage;
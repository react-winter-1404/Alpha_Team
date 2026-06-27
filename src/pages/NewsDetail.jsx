import { useEffect, useState } from "react";
import Footer from "../components/landing/Footer";
import NavbarHeader from "../components/landing/NavbarHeader";
import { useParams } from "react-router-dom";
import NewsInfoBox from "../components/newsDetail/NewsInfoBox";
import { getNewsDetails } from "../core/services/News/get";
import NewsDetailSection from "../components/newsDetail/NewsDetailSection";

const NewsDetailPage = () => {
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

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl">در حال بارگذاری...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !newsDetail) {
    return (
      <div className="w-full flex flex-col items-center">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl text-red-500">خطا در بارگذاری اطلاعات</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <NavbarHeader />
      <div className=" flex flex-col lg:flex-row items-start w-[90.5%] gap-10 lg:gap-[4.75%] pt-16">
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
      <Footer />
    </div>
  );
};

export default NewsDetailPage;

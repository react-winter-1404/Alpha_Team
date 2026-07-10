import { Button, AlertDialog } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Comment01Icon,
  Cancel01Icon,
  SentIcon,
  SmileIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import "../../index.css";
import { useResizeDetector } from "react-resize-detector";
import { getNewsDetails } from "../../core/services/News/get";
import Comment from "./Comment";
import { postAddReplyNewsComment, postNewsComment } from "../../core/services/News/post";
import { useTranslation } from "react-i18next";

const NewsComments = ({ newsId, newsTitle }) => {
  const { t } = useTranslation("news");
  const [isShowAllComments, setIsShowAllComments] = useState(false);
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const [isAddReplyComment, setIsAddReplyComment] = useState(false);
  const [commentTitleForReply, setCommentTitleForReply] = useState("");
  const [commentIdForReply, setCommentIdForReply] = useState("");
  const [NewsComments, setNewsComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [userIp, setUserIp] = useState('');
  const [userId, setUserId] = useState('');
  const [parentId, setParentId] = useState('');

  const validitionSchema = Yup.object({
    title: Yup.string().trim().required(t("comments.titleRequired")),
    describe: Yup.string().trim().required(t("comments.describeRequired")),
  });

  const getIP = async () => {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    setUserIp(data.ip)
  };

  const fetchNewsComments = async () => {
    setIsLoading(true);
    try {
      const response = await getNewsDetails({ Id: parseFloat(newsId) });
      setNewsComments(response.data.commentDtos);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsComments();
    getIP();
    setUserId(() => {
      const userID = JSON.parse(localStorage.getItem('userId'));
      return userID;
    })
  }, []);

  const fetchAddNewsComment = async (values) => {
    try {
      const response = await postNewsComment(values);
      console.log("Status:", response);
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("خطا:", error);
    }
  };

  const fetchAddReplyNewsComment = async (values) => {
    try {
      const response = await postAddReplyNewsComment(values);
      console.log("Status:", response);
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setIsAddReplyComment(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("خطا:", error);
    }
  };

  function addReplyBtnHandler(title, e, id) {
    setIsShowCommentModal(true);
    setIsAddReplyComment(true);
    setCommentTitleForReply(title);
    setCommentIdForReply(e.target.parentElement.parentElement.id);
    setParentId(id)
  }

  const [showButton, setShowButton] = useState(true);
  const { height, ref } = useResizeDetector();

  useEffect(() => {
    if (height && height >= 850) {
      console.log(height);
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [height]);

  return (
    <div className="w-full flex flex-col gap-7 lg:gap-12.5 mt-10 lg:mt-20 relative">
      <div className="text-3xl lg:text-5xl font-bold text-foreground">{t("comments.title")}</div>
      <div
        ref={ref}
        className="border-4 border-border w-full flex flex-col gap-4 lg:gap-6 p-3 lg:p-5 rounded-3xl"
      >
        <AlertDialog
          isOpen={isShowCommentModal}
          onOpenChange={setIsShowCommentModal}
        >
          <Button onClick={() => { setIsAddReplyComment(false); }} className="w-full h-10 flex gap-2.5 lg:gap-5 items-center rounded-full lg:text-xl pb-2 bg-accent text-accent-foreground">
            <HugeiconsIcon
              icon={Comment01Icon}
              className="h-5 w-5 lg:h-6 lg:w-6 mt-2 lg:mt-3"
            />
            {t("comments.yourComment")}
          </Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container size="xl" className="lg:max-w-240">
              <AlertDialog.Dialog>
                <AlertDialog.Header>
                  <AlertDialog.Heading className="flex justify-between mb-5">
                    <div className="flex items-center gap-2 font-bold">
                      <div className="text-xl lg:text-2xl text-foreground">{t("comments.title")}</div>
                      <div className="lg:text-xl text-muted">
                        ({newsTitle})
                      </div>
                    </div>
                    <Button
                      slot="close"
                      variant="outline"
                      className="h-8 w-19 lg:h-10 lg:w-22 border-danger text-danger lg:text-xl pb-2 hover:bg-danger-soft"
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        className="w-5 h-5 lg:w-6 lg:h-6 mt-2"
                      />
                      {t("comments.close")}
                    </Button>
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  {NewsComments.length >= 1 ? (
                    <>
                      <div className="flex flex-col gap-5.5 h-auto w-full text-foreground">
                        {NewsComments.map((comment) => {
                          return (
                            <Comment
                              key={comment.id}
                              pictureAddress={comment.pictureAddress}
                              author={comment.author}
                              insertDate={comment.inserDate}
                              title={comment.title}
                              describe={comment.describe}
                              likeCount={comment.likeCount}
                              disslikeCount={comment.disslikeCount}
                              commentId={comment.id}
                              newsID={newsId}
                              parentId={comment.parentId}
                              replyBtnFunc={addReplyBtnHandler}
                            />
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="h-40 w-full flex justify-center items-center text-muted text-sm md:text-[16px] text-center">
                      {t("comments.noComments")}
                    </div>
                  )}
                  <div className="h-22 lg:h-26"></div>
                </AlertDialog.Body>
                <AlertDialog.Footer className="bg-segment z-10 border-2 border-accent flex justify-between gap-3 px-2 absolute bottom-8 left-10 right-6 rounded-3xl h-18 lg:h-22 duration-300">
                  <Formik
                    initialValues={{ title: "", describe: "" }}
                    onSubmit={(values, { resetForm }) => {
                      if (isAddReplyComment) {
                        const datas = { newsId: newsId, userIpAddress: userIp, userId: userId, parentId: parentId, ...values };
                        console.log(datas);
                        fetchAddReplyNewsComment(datas);
                      } else {
                        const datas = { newsId: newsId, userIpAddress: userIp, userId: userId, ...values };
                        console.log(datas);
                        fetchAddNewsComment(datas);
                      }
                      resetForm();
                    }}
                    validationSchema={validitionSchema}
                    className="flex justify-between w-full h-full"
                  >
                    {({ setFieldValue }) => (
                      <Form className="flex justify-between w-full h-full items-center gap-3">
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            variant="primary"
                            className="w-10 h-10 lg:h-12 lg:w-12 rounded-full p-0 text-2xl"
                            type="submit"
                          >
                            <HugeiconsIcon
                              icon={SentIcon}
                              className="h-5 w-5 lg:h-6 lg:w-6"
                            />
                          </Button>
                          <Button
                            isIconOnly
                            onClick={() => {
                              setShowPicker(!showPicker);
                            }}
                            variant="outline"
                            className="w-10 h-10 lg:h-12 lg:w-12 rounded-full p-0 text-2xl text-accent"
                          >
                            <HugeiconsIcon
                              icon={SmileIcon}
                              className="h-5 w-5 lg:h-6 lg:w-6"
                            />
                          </Button>
                          {showPicker && (
                            <EmojiPicker
                              onEmojiClick={(emoji) => {
                                console.log(emoji.emoji);
                                if (focusCount == 0) {
                                  setFieldValue(
                                    "title",
                                    (prevValue) => prevValue + emoji.emoji,
                                  );
                                } else if (focusCount == 1) {
                                  setFieldValue(
                                    "describe",
                                    (prevValue) => prevValue + emoji.emoji,
                                  );
                                  setShowPicker(false);
                                }
                              }}
                              width={320}
                              height={350}
                              previewConfig={{ showPreview: false }}
                              style={{
                                position: "absolute",
                                bottom: "100%",
                                right: "0",
                                zIndex: "999",
                                boxShadow:
                                  "0 5px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
                              }}
                              theme="light"
                              className="emoji-picker-light"
                            />
                          )}
                        </div>

                        <div className="relative flex flex-col w-full mr-1 ml-2 h-full text-sm font-semibold">
                          <Field
                            type="text"
                            name="title"
                            id="title"
                            onFocus={() => {
                              setFocusCount(0);
                            }}
                            placeholder={t("comments.titlePlaceholder")}
                            className="text-xs lg:text-[16px] h-full outline-0 bg-transparent text-foreground"
                          />
                          <ErrorMessage
                            name="title"
                            id="title"
                            component={"span"}
                            className="absolute h-[40%] top-1 text-danger left-0 flex flex-row-reverse items-center text-[10px] lg:text-sm"
                          />
                          <div className="border border-separator w-full"></div>
                          <Field
                            type="text"
                            name="describe"
                            id="describe"
                            onFocus={() => {
                              setFocusCount(1);
                            }}
                            placeholder={t("comments.describePlaceholder")}
                            className="text-xs lg:text-[16px] h-full outline-0 bg-transparent text-foreground"
                          />
                          <ErrorMessage
                            name="describe"
                            id="describe"
                            component={"span"}
                            className="absolute h-[40%] bottom-1 text-danger left-0 flex flex-row-reverse items-center text-[10px] lg:text-sm"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </AlertDialog.Footer>
                <div
                  className={`absolute ${isAddReplyComment ? "bottom-18 lg:bottom-20" : "bottom-8"} left-10 right-6 rounded-3xl h-18 lg:h-22 pt-1 lg:pt-2 px-6 bg-accent z-9 duration-300`}
                >
                  <div className="flex justify-between text-[16px] lg:text-xl text-accent-foreground gap-3">
                    <div className="flex gap-3 pt-1 lg:pt-0">
                      {t("comments.replyTo")} :
                      <div className="flex-1 min-w-0 lg:w-80 w-50 truncate">
                        {commentTitleForReply}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setIsAddReplyComment(false);
                        setCommentTitleForReply("");
                      }}
                      variant="primary"
                      className="flex text-[16px] lg:text-xl text-accent-foreground items-center pb-2"
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        className="w-4 h-4 lg:w-6 lg:h-6 mt-3"
                      />
                      {t("comments.closeReply")}
                    </Button>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 left-10 right-6 ${isAddReplyComment ? "h-40 lg:h-44" : "h-28 lg:h-32"} backdrop-blur-[2px] rounded-2xl duration-300`}
                ></div>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
        {NewsComments.length >= 1 ? (
          <div
            className={`${!isShowAllComments && "max-h-200"} flex flex-col gap-5.5 h-auto w-full overflow-hidden`}
          >
            {NewsComments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  pictureAddress={comment.pictureAddress}
                  author={comment.author}
                  insertDate={comment.inserDate}
                  title={comment.title}
                  describe={comment.describe}
                  likeCount={comment.likeCount}
                  disslikeCount={comment.disslikeCount}
                  commentId={comment.id}
                  newsID={newsId}
                  parentId={comment.parentId}
                  replyBtnFunc={addReplyBtnHandler}
                />
              );
            })}
          </div>
        ) : (
          <div className="h-40 w-full flex justify-center items-center text-muted text-sm md:text-[16px] text-center">
            {t("comments.noComments")}
          </div>
        )}
        {showButton && (
          <>
            <Button
              onClick={() => {
                setIsShowAllComments(!isShowAllComments);
              }}
              variant="secondary"
              className={`${!isShowAllComments ? "absolute z-10 bottom-10 w-[93%]" : "w-full"} h-10 flex gap-5 items-center rounded-full text-foreground text-xl pb-2`}
            >
              {!isShowAllComments ? (
                <>
                  <HugeiconsIcon
                    icon={Comment01Icon}
                    className="h-6 w-6 mt-3"
                  />
                  {t("comments.showMore")}
                </>
              ) : (
                <>
                  <HugeiconsIcon
                    icon={Comment01Icon}
                    className="h-6 w-6 mt-3"
                  />
                  {t("comments.showLess")}
                </>
              )}
            </Button>
            <div
              className={`${isShowAllComments && "hidden"} absolute bottom-1 left-1 right-1 h-45 rounded-b-3xl bg-linear-to-t from-background to-transparent pointer-events-none`}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsComments;
import { Button, AlertDialog } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Comment01Icon,
  Cancel01Icon,
  SentIcon,
  SmileIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { getCourseComments } from "../../core/services/Course/get";
import Comment from "./Comment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  postAddReplyCourseComment,
  postCourseComment,
} from "../../core/services/Course/post";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import "../../index.css";
import { useResizeDetector } from "react-resize-detector";

const CourseComments = ({ courseId, courseTitle }) => {
  const [isShowAllComments, setIsShowAllComments] = useState(false);
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const [isAddReplyComment, setIsAddReplyComment] = useState(false);
  const [commentTitleForReply, setCommentTitleForReply] = useState("");
  const [commentIdForReply, setCommentIdForReply] = useState("");
  const [courseComments, setcourseComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [focusCount, setFocusCount] = useState(0);

  const validitionSchema = Yup.object({
    Title: Yup.string().trim().required("عنوان نظر نباید خالی باشه"),
    Describe: Yup.string().trim().required("متن نظر نباید خالی باشه"),
  });

  const fetchcourseComments = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseComments(courseId);
      setcourseComments(response.data);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchcourseComments();
  }, []);
  //   console.log(courseComments);

  const fetchAddCourseComment = async (values) => {
    try {
      const payload = new FormData();
      payload.append("CourseId", values.CourseId);
      payload.append("Title", values.Title);
      payload.append("Describe", values.Describe);
      const response = await postCourseComment(payload);
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
  const fetchAddReplyCourseComment = async (values) => {
    try {
      const payload = new FormData();
      payload.append("CourseId", values.CourseId);
      payload.append("CommentId", values.CommentId);
      payload.append("Title", values.Title);
      payload.append("Describe", values.Describe);
      const response = await postAddReplyCourseComment(payload);
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

  function addReplyBtnHandler(title, e) {
    setIsShowCommentModal(true);
    setIsAddReplyComment(true);
    setCommentTitleForReply(title);
    setCommentIdForReply(e.target.parentElement.parentElement.id);
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
    <div className=" w-full flex flex-col gap-7 lg:gap-12.5 mt-10 lg:mt-20 relative ">
      <div className=" text-3xl lg:text-5xl font-bold ">نظرات</div>
      <div
        ref={ref}
        className=" border-4 w-full flex flex-col gap-4 lg:gap-6 p-3 lg:p-5 rounded-3xl  "
      >
        <AlertDialog
          isOpen={isShowCommentModal}
          onOpenChange={setIsShowCommentModal}
        >
          <Button className=" w-full h-10 flex gap-2.5 lg:gap-5 items-center rounded-full  lg:text-xl pb-2 ">
            <HugeiconsIcon
              icon={Comment01Icon}
              className=" h-5 w-5 lg:h-6 lg:w-6 mt-2 lg:mt-3  "
            />
            نظر شما
          </Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container size="xl" className="lg:max-w-240">
              <AlertDialog.Dialog>
                <AlertDialog.Header>
                  <AlertDialog.Heading className=" flex justify-between mb-5 ">
                    <div className=" flex items-center gap-2 font-bold ">
                      <div className=" text-xl lg:text-2xl">نظرات</div>
                      <div className=" lg:text-xl text-muted ">
                        ({courseTitle})
                      </div>
                    </div>
                    <Button
                      slot="close"
                      variant="outline"
                      className={
                        " h-8 w-19 lg:h-10 lg:w-22 border-danger text-danger lg:text-xl pb-2 hover:bg-danger-soft "
                      }
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        className="w-5 h-5 lg:w-6 lg:h-6 mt-2 "
                      />
                      بستن
                    </Button>
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  {courseComments.length >= 1 ? (
                    <>
                      <div
                        className={` flex flex-col gap-5.5 h-auto w-full  text-foreground `}
                      >
                        {courseComments.map((comment) => {
                          return (
                            <Comment
                              key={comment.id}
                              pictureAddress={comment.pictureAddress}
                              author={comment.author}
                              insertDate={comment.insertDate}
                              title={comment.title}
                              describe={comment.describe}
                              likeCount={comment.likeCount}
                              disslikeCount={comment.disslikeCount}
                              commentId={comment.id}
                              courseId={courseId}
                              replyBtnFunc={addReplyBtnHandler}
                            />
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className=" h-40 w-full flex justify-center items-center text-muted text-sm md:text-[16px] text-center  ">
                      هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!
                    </div>
                  )}
                  <div className=" h-22 lg:h-26"></div>
                </AlertDialog.Body>
                <AlertDialog.Footer className=" bg-segment z-10 border-2 border-accent flex justify-between gap-3 px-2  absolute bottom-8 left-10 right-6 rounded-3xl h-18 lg:h-22 duration-300 ">
                  <Formik
                    initialValues={{ Title: "", Describe: "" }}
                    onSubmit={(values, { resetForm }) => {
                      if (isAddReplyComment) {
                        const datas = {
                          CourseId: courseId,
                          CommentId: commentIdForReply,
                          ...values,
                        };
                        console.log(datas);
                        fetchAddReplyCourseComment(datas);
                      } else {
                        const datas = { CourseId: courseId, ...values };
                        console.log(datas);
                        fetchAddCourseComment(datas);
                      }
                      resetForm();
                    }}
                    validationSchema={validitionSchema}
                    className=" flex justify-between w-full h-full"
                  >
                    {({ setFieldValue }) => (
                      <Form className=" flex justify-between w-full h-full items-center gap-3  ">
                        <div className=" flex gap-2  ">
                          <Button
                            isIconOnly
                            variant="primary"
                            className=" w-10 h-10 lg:h-12 lg:w-12 rounded-full p-0 text-2xl  "
                            type="submit"
                          >
                            <HugeiconsIcon
                              icon={SentIcon}
                              className=" h-5 w-5 lg:h-6 lg:w-6 "
                            />
                          </Button>
                          <Button
                            isIconOnly
                            onClick={() => {
                              setShowPicker(!showPicker);
                            }}
                            variant="outline"
                            className=" w-10 h-10 lg:h-12 lg:w-12 rounded-full p-0 text-2xl text-accent "
                          >
                            <HugeiconsIcon
                              icon={SmileIcon}
                              className=" h-5 w-5 lg:h-6 lg:w-6 "
                            />
                          </Button>
                          {showPicker && (
                            <EmojiPicker
                              onEmojiClick={(emoji) => {
                                console.log(emoji.emoji);
                                if (focusCount == 0) {
                                  setFieldValue(
                                    "Title",
                                    (prevValue) => prevValue + emoji.emoji,
                                  );
                                } else if (focusCount == 1) {
                                  (setFieldValue(
                                    "Describe",
                                    (prevValue) => prevValue + emoji.emoji,
                                  ),
                                    setShowPicker(false));
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

                        <div className=" relative flex flex-col w-full mr-1 ml-2 h-full text-sm font-semibold ">
                          <Field
                            type="text"
                            name="Title"
                            id="Title"
                            onFocus={() => {
                              setFocusCount(0);
                            }}
                            placeholder="عنوان نظر خود را بنویسید"
                            className="text-xs lg:text-[16px] h-full outline-0 "
                          />
                          <ErrorMessage
                            name="Title"
                            id="Title"
                            component={"span"}
                            className=" absolute  h-[40%] top-1 text-danger left-0 flex flex-row-reverse items-center text-[10px] lg:text-sm "
                          />
                          <div className=" border w-full "></div>
                          <Field
                            type="text"
                            name="Describe"
                            id="Describe"
                            onFocus={() => {
                              setFocusCount(1);
                            }}
                            placeholder="متن نظر خود را بنویسید"
                            className="text-xs lg:text-[16px] h-full outline-0 "
                          />
                          <ErrorMessage
                            name="Describe"
                            id="Describe"
                            component={"span"}
                            className=" absolute  h-[40%] bottom-1 text-danger left-0 flex flex-row-reverse items-center text-[10px] lg:text-sm "
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </AlertDialog.Footer>
                <div
                  className={`absolute ${isAddReplyComment ? " bottom-18 lg:bottom-20" : "bottom-8"} left-10 right-6 rounded-3xl h-18 lg:h-22 pt-1 lg:pt-2  px-6  bg-accent z-9 duration-300 `}
                >
                  <div className=" flex justify-between text-[16px] lg:text-xl text-accent-foreground gap-3  ">
                    <div className=" flex gap-3 pt-1 lg:pt-0 ">
                      جواب به نظر :
                      <div className=" flex-1 min-w-0 lg:w-80 w-50 truncate ">
                        {commentTitleForReply}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setIsAddReplyComment(false);
                        setCommentTitleForReply("");
                      }}
                      variant="primary"
                      className=" flex text-[16px] lg:text-xl text-accent-foreground items-center pb-2 "
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        className="w-4 h-4 lg:w-6 lg:h-6 mt-3 "
                      />
                      بستن
                    </Button>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 left-10 right-6 ${isAddReplyComment ? "h-40 lg:h-44" : "h-28 lg:h-32"}   backdrop-blur-[2px] rounded-2xl duration-300 `}
                ></div>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
        {courseComments.length >= 1 ? (
          <div
            className={`${!isShowAllComments && " max-h-200 "} flex flex-col gap-5.5 h-auto w-full overflow-hidden `}
          >
            {courseComments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  pictureAddress={comment.pictureAddress}
                  author={comment.author}
                  insertDate={comment.insertDate}
                  title={comment.title}
                  describe={comment.describe}
                  likeCount={comment.likeCount}
                  disslikeCount={comment.disslikeCount}
                  commentId={comment.id}
                  courseId={courseId}
                  replyBtnFunc={addReplyBtnHandler}
                />
              );
            })}
          </div>
        ) : (
          <div className=" h-40 w-full flex justify-center items-center text-muted text-sm md:text-[16px] text-center ">
            هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!
          </div>
        )}
        {showButton && (
          <>
            <Button
              onClick={() => {
                setIsShowAllComments(!isShowAllComments);
              }}
              variant="secondary"
              className={`${!isShowAllComments ? " absolute z-10 bottom-10 w-[93%] " : "w-full"}   h-10 flex gap-5 items-center rounded-full text-foreground  text-xl pb-2 `}
            >
              {!isShowAllComments ? (
                <>
                  <HugeiconsIcon
                    icon={Comment01Icon}
                    className=" h-6 w-6 mt-3  "
                  />
                  نمایش بیشتر
                </>
              ) : (
                <>
                  <HugeiconsIcon
                    icon={Comment01Icon}
                    className=" h-6 w-6 mt-3  "
                  />
                  نمایش کمتر
                </>
              )}
            </Button>
            <div
              className={`${isShowAllComments && " hidden "} absolute bottom-1 left-1 right-1 h-45 rounded-b-3xl bg-linear-to-t from-background to-transparent pointer-events-none `}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseComments;

import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { getCourseReplyComment } from "../../core/services/Course/get";
import { postAddCourseCommentLike } from "../../core/services/Course/post";

const Comment = ({
  pictureAddress,
  author,
  insertDate,
  title,
  describe,
  likeCount,
  disslikeCount,
  courseId,
  commentId,
  replyBtnFunc
}) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [courseReplysComment, setcourseReplysComment] = useState([]);

  const fetchcourseReplysComment = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseReplyComment(courseId, commentId);
      setcourseReplysComment(response.data);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    fetchcourseReplysComment()
  },[])

  const fetchAddCourseCommentLike = async () => {
    setIsLoading(true);
    try {
      const response = await postAddCourseCommentLike(commentId);
      console.log(response);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id={commentId} className="flex flex-col w-full gap-2">
      <div className="flex gap-2">
        <img
          src={pictureAddress || '/public/images/Untitled.png'}
          onError={(e)=>{e.target.src='/public/images/Untitled.png'}}
          alt=""
          className="bg-default w-11.5 h-11.5 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold text-foreground">{author}</div>
          <div className="text-xs text-muted">
            {new Date(insertDate).toLocaleDateString("fa-IR")}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold lg:text-lg text-foreground">{title}</div>
        <div className="text-sm lg:text-[16px] text-muted">{describe}</div>
      </div>
      <div className="flex gap-3.5 items-center mt-2">
        <div className="flex gap-2 text-sm lg:text-[16px] items-end text-foreground">
          <HugeiconsIcon
            onClick={()=>{fetchAddCourseCommentLike()}}
            icon={ThumbsUpIcon}
            className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:text-accent transition-colors"
          />
          <div>{likeCount}</div>
        </div>
        <div className="flex gap-2 text-sm lg:text-[16px] items-end text-foreground">
          <HugeiconsIcon
            icon={ThumbsDownIcon}
            className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:text-danger transition-colors"
          />
          <div>{disslikeCount}</div>
        </div>
        <Button
          variant="outline"
          className="w-20 h-8 lg:w-25 lg:h-10 border-accent text-accent text-sm lg:text-[16px] rounded-full font-bold pb-1 mx-2"
          onClick={(e)=>{replyBtnFunc(title,e)}}
        >
          جواب دادن
        </Button>
        <div className="cursor-pointer flex items-center lg:gap-1">
          <div
            onClick={() => {
              setIsShowReply(!isShowReply);
            }}
            className="text-xs lg:text-sm underline-offset-4 underline text-muted hover:text-foreground transition-colors"
          >
            مشاهده جواب‌ها ({courseReplysComment.length})
          </div>
          <HugeiconsIcon icon={ArrowUp01Icon} className={`${isShowReply && 'rotate-180'} h-4 lg:h-4.5 mt-1 duration-200 text-muted`} />
        </div>
      </div>
      {isShowReply && courseReplysComment.length != 0 && (
        <div className="flex flex-col gap-5">
          {courseReplysComment.map((reply) => {
            return (
              <div key={reply.id} className="flex gap-4 pr-5 relative">
                <div className="h-full border-3 rounded-full min-h-0 absolute right-0 border-accent"></div>
                <Comment
                  pictureAddress={reply.pictureAddress}
                  author={reply.author}
                  insertDate={reply.insertDate}
                  title={reply.title}
                  describe={reply.describe}
                  likeCount={reply.likeCount}
                  disslikeCount={reply.disslikeCount}
                  courseId={courseId}
                  commentId={reply.id}
                  replyBtnFunc={replyBtnFunc}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
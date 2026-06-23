
const CommentCard = ({image , author , insertDate ,title ,describe}) => {
  return (
    <div className=" relative  flex flex-col px-2 ">
        <div className=" absolute top-0 right-0 h-full border-2 border-accent rounded-full "></div>
        <div className=" flex gap-1.5 ">
            <img src={image} alt="" className=" w-10 h-10 rounded-full border " />
            <div className=" flex flex-col  ">
                <div className="text-sm">{author}</div>
                <div className="text-xs">{insertDate}</div>
            </div>
        </div>
        <div className=" w-full truncate font-bold ">{title}</div>
        <div className=" w-full truncate ">{describe}</div>
    </div>
  )
}

export default CommentCard
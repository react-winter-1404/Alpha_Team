const CommentCard = ({ image, author, insertDate, title, describe }) => {
  return (
    <div className="relative flex flex-col px-2">
      <div className="absolute top-0 right-0 h-full border-2 border-accent rounded-full"></div>
      <div className="flex gap-1.5">
        <img src={image} alt="" className="w-10 h-10 rounded-full border border-border" />
        <div className="flex flex-col">
          <div className="text-sm text-foreground">{author}</div>
          <div className="text-xs text-muted">{insertDate}</div>
        </div>
      </div>
      <div className="w-full truncate font-bold text-foreground">{title}</div>
      <div className="w-full truncate text-muted">{describe}</div>
    </div>
  );
};

export default CommentCard;
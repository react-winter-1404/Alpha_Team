import { useEffect, useState, useMemo } from "react";
import { 
  getAllTicketsMineUser, 
  getChatDetailUser, 
  getAutoComplete,
  checkExistTicket,
} from "../../../core/services/userPanel/get";
import { 
  createTicket, 
  sendUserMessage, 
  acceptTicket, 
  addTicketOverview,
} from "../../../core/services/userPanel/post";
import { 
  setSeenMessage
} from "../../../core/services/userPanel/patch";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ViewIcon, 
  Cancel01Icon, 
  Calendar01Icon, 
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PlusSignIcon,
  SentIcon,
  StarIcon,
  HelpCircleIcon
} from "@hugeicons/core-free-icons";
import { Select, ListBox } from "@heroui/react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const MyTickets = () => {
  const { t } = useTranslation("panel");
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTicketData, setNewTicketData] = useState({ problem: "", describe: "" });
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatDetail, setChatDetail] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ overview: "", rate: 5, solved: true });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTicketsMineUser({ pageNumber: 0, perPage: 100 });
      if (response?.data && Array.isArray(response.data)) {
        setTickets(response.data);
      } else if (Array.isArray(response)) {
        setTickets(response);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error(error);
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleOpenChat = async (ticket) => {
    setSelectedTicket(ticket);
    setChatDetail(null);
    setIsChatModalOpen(true);
    setIsChatLoading(true);
    try {
      const response = await getChatDetailUser(ticket.id);
      if (response?.data) {
        setChatDetail(response.data);
      } else if (response) {
        setChatDetail(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت جزئیات گفتگو.");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedTicket) return;

    setIsSendingMessage(true);
    try {
      const payload = {
        text: messageText,
        ticketId: selectedTicket.id
      };
      const response = await sendUserMessage(payload);
      if (response) {
        setMessageText("");
        handleOpenChat(selectedTicket);
      } else {
        toast.error("خطا در ارسال پیام.");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    if (!newTicketData.problem.trim() || !newTicketData.describe.trim()) return;

    setIsSubmittingTicket(true);
    try {
      const payload = {
        describe: newTicketData.describe,
        problem: newTicketData.problem,
        errorId: null,
        ticketTypeId: null
      };
      const response = await createTicket(payload);
      if (response) {
        toast.success("تیکت با موفقیت ایجاد شد.");
        setIsCreateModalOpen(false);
        setNewTicketData({ problem: "", describe: "" });
        fetchTickets();
      } else {
        toast.error("خطا در ایجاد تیکت.");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleAcceptTicket = async (ticketId) => {
    try {
      const response = await acceptTicket(ticketId);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTickets();
        if (isChatModalOpen) setIsChatModalOpen(false);
        setIsReviewModalOpen(true);
      } else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setIsSubmittingReview(true);
    try {
      const payload = {
        overview: reviewData.overview,
        rate: Number(reviewData.rate),
        solved: reviewData.solved,
        ticketId: selectedTicket.id
      };
      const response = await addTicketOverview(payload);
      if (response) {
        toast.success("نظر و امتیاز شما با موفقیت ثبت شد.");
        setIsReviewModalOpen(false);
        setReviewData({ overview: "", rate: 5, solved: true });
      } else {
        toast.error("خطا در ثبت نظر.");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const filteredTickets = useMemo(() => {
    let result = [...tickets];
    if (statusFilter === "open") {
      result = result.filter(item => item.isDone === false);
    } else if (statusFilter === "closed") {
      result = result.filter(item => item.isDone === true);
    }
    return result;
  }, [tickets, statusFilter]);

  const totalPages = Math.ceil(filteredTickets.length / pageSize) || 1;
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">{t("tickets.title")}</h1>
          <p className="text-xs text-muted mt-1">{t("tickets.description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select 
            aria-label="فیلتر وضعیت"
            selectedKey={statusFilter}
            onSelectionChange={(key) => key && setStatusFilter(String(key))}
            className="w-44"
          >
            <Select.Trigger className="bg-overlay border border-border/60 rounded-xl h-9 px-3 text-xs text-foreground flex items-center justify-between cursor-pointer">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-overlay border border-border rounded-xl shadow-lg p-1">
              <ListBox>
                <ListBox.Item id="all" textValue={t("tickets.all")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("tickets.all")}
                </ListBox.Item>
                <ListBox.Item id="open" textValue={t("tickets.open")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("tickets.open")}
                </ListBox.Item>
                <ListBox.Item id="closed" textValue={t("tickets.closed")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("tickets.closed")}
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 h-9 bg-accent text-accent-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            {t("tickets.newTicket")}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-muted text-sm">{t("tickets.loading")}</div>
      ) : filteredTickets.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm bg-overlay border border-border/50 rounded-2xl flex flex-col items-center gap-3">
          <HugeiconsIcon icon={HelpCircleIcon} size={36} className="text-muted/60" />
          <span>{t("tickets.noTickets")}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedTickets.map((ticket) => {
              const isDone = ticket.isDone;

              return (
                <div 
                  key={ticket.id} 
                  className="bg-overlay border border-border/50 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-accent/50 transition-all"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold flex items-center gap-1">
                        <HugeiconsIcon icon={Calendar01Icon} size={14} />
                        {new Date(ticket.insetDate).toLocaleDateString("fa-IR")}
                      </span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                        isDone ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      }`}>
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
                        {isDone ? t("tickets.closed") : t("tickets.open")}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mt-1">
                      <h3 className="text-xs font-bold text-foreground line-clamp-1">{ticket.problem || "بدون موضوع"}</h3>
                      <p className="text-xs text-muted line-clamp-2">{ticket.describe || "بدون توضیح"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    <button
                      onClick={() => handleOpenChat(ticket)}
                      className="flex-1 py-2 bg-default text-foreground text-xs font-semibold rounded-xl hover:bg-default/85 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HugeiconsIcon icon={ViewIcon} size={16} />
                      {t("tickets.chat")}
                    </button>

                    {!isDone && (
                      <button
                        onClick={() => handleAcceptTicket(ticket.id)}
                        className="py-2 px-3 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-xl hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title={t("tickets.closeTicketTitle")}
                      >
                        {t("tickets.closeTicket")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6">
              <div className="flex items-center bg-default/60 border border-border/60 rounded-full p-1.5 gap-1 shadow-sm">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-default transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "text-foreground hover:bg-default/80"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-default transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">{t("tickets.create")}</h2>

            <form onSubmit={handleCreateTicketSubmit} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">{t("tickets.subject")}:</label>
                <input 
                  type="text"
                  value={newTicketData.problem}
                  onChange={(e) => setNewTicketData({ ...newTicketData, problem: e.target.value })}
                  placeholder={t("tickets.placeholderSubject")}
                  className="w-full text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">{t("tickets.descriptionField")}:</label>
                <textarea 
                  value={newTicketData.describe}
                  onChange={(e) => setNewTicketData({ ...newTicketData, describe: e.target.value })}
                  placeholder={t("tickets.placeholderDescription")}
                  className="w-full text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none resize-none h-32"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-default cursor-pointer"
                >
                  {t("tickets.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingTicket ? t("tickets.submitting") : t("tickets.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChatModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-2xl p-6 flex flex-col gap-4 shadow-2xl relative h-[80vh]">
            <button 
              onClick={() => setIsChatModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <div className="border-b border-border pb-3 flex justify-between items-center pr-2">
              <div>
                <h2 className="text-base font-bold text-foreground">{selectedTicket?.problem}</h2>
                <span className="text-[10px] text-muted">{t("tickets.id")}: {selectedTicket?.id}</span>
              </div>
              {!selectedTicket?.isDone && (
                <button
                  onClick={() => handleAcceptTicket(selectedTicket.id)}
                  className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-xl hover:bg-emerald-500/20 transition-colors cursor-pointer"
                >
                  {t("tickets.closeTicket")}
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-2 bg-default/20 rounded-xl border border-border/50">
              {isChatLoading ? (
                <div className="py-20 text-center text-muted text-xs">{t("tickets.chatLoading")}</div>
              ) : (
                <>
                  <div className="bg-overlay p-3 rounded-xl border border-border/60 self-start max-w-[80%]">
                    <span className="text-[10px] font-bold text-accent block mb-1">{t("tickets.initialDescription")}:</span>
                    <p className="text-xs text-foreground">{chatDetail?.describe}</p>
                  </div>

                  {chatDetail?.ticketMessages && chatDetail.ticketMessages.length > 0 ? (
                    chatDetail.ticketMessages.map((msg, idx) => {
                      const isUser = msg.senderType === "user" || msg.userId; 
                      return (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl border max-w-[80%] ${
                            isUser 
                              ? "bg-accent/10 border-accent/30 self-start text-foreground" 
                              : "bg-overlay border-border/60 self-end text-foreground"
                          }`}
                        >
                          <p className="text-xs">{msg.text}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-muted text-xs py-10">{t("tickets.noMessages")}</div>
                  )}
                </>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-border">
              <input 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={t("tickets.sendMessage")}
                className="flex-1 text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none"
                disabled={selectedTicket?.isDone}
              />
              <button
                type="submit"
                disabled={isSendingMessage || selectedTicket?.isDone}
                className="px-4 bg-accent text-accent-foreground rounded-xl flex items-center justify-center hover:opacity-90 cursor-pointer disabled:opacity-50"
              >
                <HugeiconsIcon icon={SentIcon} size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-2xl relative">
            <button 
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
              <HugeiconsIcon icon={StarIcon} size={20} className="text-amber-500" />
              {t("tickets.reviewTitle")}
            </h2>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">{t("tickets.rate")}:</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  step="0.5"
                  value={reviewData.rate}
                  onChange={(e) => setReviewData({ ...reviewData, rate: Number(e.target.value) })}
                  className="w-full text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">{t("tickets.reviewPlaceholder")}</label>
                <textarea 
                  value={reviewData.overview}
                  onChange={(e) => setReviewData({ ...reviewData, overview: e.target.value })}
                  placeholder={t("tickets.reviewPlaceholder")}
                  className="w-full text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none resize-none h-24"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-default cursor-pointer"
                >
                  {t("tickets.skip")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingReview ? t("tickets.submittingReview") : t("tickets.submitReview")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
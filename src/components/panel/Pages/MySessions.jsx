import { useEffect, useState, useMemo } from "react";
import { getStudentScheduals, getSessionDetail } from "../../../core/services/userPanel/get";
import { postStudentAP } from "../../../core/services/userPanel/post";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ViewIcon, 
  Cancel01Icon, 
  Calendar01Icon, 
  Clock01Icon, 
  UserCheck01Icon,
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { Select, ListBox } from "@heroui/react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const MySessions = () => {
  const { t } = useTranslation("panel");
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionDetail, setSessionDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    present: true,
    studentHand: false,
    absentReason: ""
  });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentScheduals(12);
      if (response?.data && Array.isArray(response.data)) {
        setSessions(response.data);
      } else if (Array.isArray(response)) {
        setSessions(response);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error(error);
      setSessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleOpenDetail = async (item) => {
    setSelectedSession(item);
    setSessionDetail(null);
    setIsDetailModalOpen(true);
    setIsDetailLoading(true);
    try {
      const response = await getSessionDetail(item.id);
      if (response?.data) {
        setSessionDetail(response.data);
      } else if (response) {
        setSessionDetail(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleOpenAttendanceModal = (item) => {
    setSelectedSession(item);
    setAttendanceData({
      present: true,
      studentHand: false,
      absentReason: ""
    });
    setIsAttendanceModalOpen(true);
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();
    if (!selectedSession) return;

    setIsSubmittingAttendance(true);
    try {
      const payload = {
        sessionId: selectedSession.id,
        present: attendanceData.present,
        studentHand: attendanceData.studentHand,
        absentReason: attendanceData.present ? null : attendanceData.absentReason
      };

      const response = await postStudentAP(payload);

      if (response) {
        toast.success(response.data?.message || t("sessions.submitSuccess"));
        setIsAttendanceModalOpen(false);
        fetchSessions();
      } else {
        toast.error(t("sessions.submitError"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("sessions.serverError"));
    } finally {
      setIsSubmittingAttendance(false);
    }
  };

  const filteredAndSortedSessions = useMemo(() => {
    let result = [...sessions];

    if (statusFilter === "present") {
      result = result.filter(item => item.AP === true);
    } else if (statusFilter === "absent") {
      result = result.filter(item => item.AP !== true);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);

      if (sortBy === "date-asc") {
        return dateA - dateB;
      } else if (sortBy === "date-desc") {
        return dateB - dateA;
      } else if (sortBy === "time") {
        return (a.startTime || "").localeCompare(b.startTime || "");
      }
      return 0;
    });

    return result;
  }, [sessions, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedSessions.length / pageSize) || 1;
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedSessions.slice(start, start + pageSize);
  }, [filteredAndSortedSessions, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">{t("sessions.title")}</h1>
          <p className="text-xs text-muted mt-1">{t("sessions.description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select 
            aria-label="فیلتر وضعیت"
            selectedKey={statusFilter}
            onSelectionChange={(key) => key && setStatusFilter(key)}
            className="w-44"
          >
            <Select.Trigger className="bg-overlay border border-border/60 rounded-xl h-9 px-3 text-xs text-foreground flex items-center justify-between cursor-pointer">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-overlay border border-border rounded-xl shadow-lg p-1">
              <ListBox>
                <ListBox.Item id="all" textValue={t("sessions.all")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.all")}
                </ListBox.Item>
                <ListBox.Item id="present" textValue={t("sessions.present")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.present")}
                </ListBox.Item>
                <ListBox.Item id="absent" textValue={t("sessions.absent")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.absent")}
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <Select 
            aria-label="مرتب‌سازی"
            selectedKey={sortBy}
            onSelectionChange={(key) => key && setSortBy(key)}
            className="w-52"
          >
            <Select.Trigger className="bg-overlay border border-border/60 rounded-xl h-9 px-3 text-xs text-foreground flex items-center justify-between cursor-pointer">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-overlay border border-border rounded-xl shadow-lg p-1">
              <ListBox>
                <ListBox.Item id="date-asc" textValue={t("sessions.dateAsc")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.dateAsc")}
                </ListBox.Item>
                <ListBox.Item id="date-desc" textValue={t("sessions.dateDesc")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.dateDesc")}
                </ListBox.Item>
                <ListBox.Item id="time" textValue={t("sessions.timeSort")} className="text-xs text-foreground data-[hovered=true]:bg-default/40 rounded-lg p-2 cursor-pointer">
                  {t("sessions.timeSort")}
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-muted text-sm">{t("sessions.loading")}</div>
      ) : filteredAndSortedSessions.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm bg-overlay border border-border/50 rounded-2xl">
          {t("sessions.noSessions")}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedSessions.map((item) => {
              const isPresent = item.AP;

              return (
                <div 
                  key={item.id} 
                  className="bg-overlay border border-border/50 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-accent/50 transition-all"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold flex items-center gap-1">
                        <HugeiconsIcon icon={Calendar01Icon} size={14} />
                        {new Date(item.startDate).toLocaleDateString("fa-IR")}
                      </span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                        isPresent ? "bg-emerald-500/10 text-emerald-500" : "bg-default text-muted"
                      }`}>
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
                        {isPresent ? t("sessions.present") : t("sessions.absent")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted mt-1">
                      <HugeiconsIcon icon={Clock01Icon} size={16} className="text-accent" />
                      <div>
                        <span>{t("sessions.startTime")}: <strong className="text-foreground">{item.startTime}</strong></span>
                        <span className="mx-1">{t("sessions.endTime")}</span>
                        <span><strong className="text-foreground">{item.endTime}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="flex-1 py-2 bg-default text-foreground text-xs font-semibold rounded-xl hover:bg-default/85 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HugeiconsIcon icon={ViewIcon} size={16} />
                      {t("sessions.details")}
                    </button>

                    <button
                      onClick={() => handleOpenAttendanceModal(item)}
                      className="flex-1 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HugeiconsIcon icon={UserCheck01Icon} size={16} />
                      {t("sessions.attendance")}
                    </button>
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

      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">{t("sessions.details")}</h2>

            {isDetailLoading ? (
              <div className="py-12 text-center text-muted text-xs">{t("sessions.detailLoading")}</div>
            ) : (
              <div className="flex flex-col gap-4 text-right">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">{t("sessions.sessionTitle")}:</span>
                  <span className="text-sm font-semibold text-foreground">{sessionDetail?.sessionTitle || "بدون عنوان"}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">{t("sessions.courseGroupId")}:</span>
                  <span className="text-xs font-mono text-foreground bg-default/40 p-2.5 rounded-xl">{selectedSession?.courseGroupId}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">{t("sessions.sessionFiles")}:</span>
                  {sessionDetail?.sessionFileDtos && sessionDetail.sessionFileDtos.length > 0 ? (
                    <div className="flex flex-col gap-2 mt-1">
                      {sessionDetail.sessionFileDtos.map((file, idx) => (
                        <a 
                          key={idx} 
                          href={file.fileAddress} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs text-accent bg-accent/10 p-2.5 rounded-xl hover:underline flex items-center justify-between"
                        >
                          <span>{t("sessions.attachmentFile")} {idx + 1}</span>
                          <span>{t("sessions.viewDownload")}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted bg-default/40 p-3 rounded-xl">{t("sessions.noFiles")}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-2xl relative">
            <button 
              onClick={() => setIsAttendanceModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">{t("sessions.attendanceTitle")}</h2>

            <form onSubmit={handleSubmitAttendance} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">{t("sessions.attendanceStatus")}:</label>
                <select 
                  value={attendanceData.present ? "true" : "false"}
                  onChange={(e) => setAttendanceData({ ...attendanceData, present: e.target.value === "true" })}
                  className="w-full text-xs text-foreground border border-border rounded-xl p-2.5 bg-default/30 outline-none cursor-pointer"
                >
                  <option value="true">{t("sessions.presentOption")}</option>
                  <option value="false">{t("sessions.absentOption")}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="studentHand"
                  checked={attendanceData.studentHand}
                  onChange={(e) => setAttendanceData({ ...attendanceData, studentHand: e.target.checked })}
                  className="w-4 h-4 accent-accent cursor-pointer"
                />
                <label htmlFor="studentHand" className="text-xs text-foreground cursor-pointer">{t("sessions.studentHand")}</label>
              </div>

              {!attendanceData.present && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground">{t("sessions.absentReason")}:</label>
                  <textarea 
                    value={attendanceData.absentReason}
                    onChange={(e) => setAttendanceData({ ...attendanceData, absentReason: e.target.value })}
                    placeholder={t("sessions.absentReasonPlaceholder")}
                    className="w-full text-xs text-foreground border border-border rounded-xl p-3 bg-default/30 outline-none resize-none h-24"
                    required={!attendanceData.present}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-default cursor-pointer"
                >
                  {t("sessions.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAttendance}
                  className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingAttendance ? t("sessions.submitting") : t("sessions.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySessions;
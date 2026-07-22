import { useEffect, useState } from "react";
import { getStudentHomeworkList, getSessionDetail } from "../../../core/services/userPanel/get";
import { postAddCourseUserHomeWork, postAddExerciseFile } from "../../../core/services/userPanel/post";
import { deleteExerciseFile } from "../../../core/services/userPanel/delete";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ViewIcon, 
  Upload01Icon, 
  Delete01Icon,
  Cancel01Icon, 
  Calendar01Icon, 
  UserGroupIcon 
} from "@hugeicons/core-free-icons";
import toast from "react-hot-toast";

const MyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [sessionDetail, setSessionDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentHomeworkList();
      if (response?.data && Array.isArray(response.data)) {
        setAssignments(response.data);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleOpenDetail = async (item) => {
    setSelectedAssignment(item);
    setSessionDetail(null); 
    setIsDetailModalOpen(true);
    setIsDetailLoading(true);
    try {
      const response = await getSessionDetail(item.homeWorkId);
      if (response?.data) {
        setSessionDetail(response.data);
      }
    } catch (error) {
      console.error("Error fetching session detail:", error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleFirstStepAssignment = async (item) => {
    setSelectedAssignment(item);
    try {
      const stepOneValues = {
        hwid: item.homeWorkId,
        cstudentId: item.courseStudentId || "1"
      };
      const response = await postAddCourseUserHomeWork(stepOneValues);

      if (response) {
        toast.success(response.message || "تکلیف شما تایید شد نسبت به اپلود فایل تکلیف اقدام کنید");
        setIsUploadModalOpen(true);
        setUploadFile(null);
      } else {
        toast.error("خطا در تایید اولیه تکلیف.");
      }
    } catch (error) {
      console.error("Error in step one:", error);
      toast.error("خطا در ارتباط با سرور.");
    }
  };

  const handleSubmitHomework = async (e) => {
    e.preventDefault();
    if (!uploadFile || !selectedAssignment) return;

    setIsSubmitting(true);
    try {
      const stepOneValues = {
        hwid: selectedAssignment.homeWorkId,
        cstudentId: selectedAssignment.courseStudentId || "1"
      };
      const stepOneResponse = await postAddCourseUserHomeWork(stepOneValues);

      if (stepOneResponse) {
        const homeworkRecordId = stepOneResponse.data;

        const formData = new FormData();
        formData.append("CouresUserHomeWorkId", homeworkRecordId);
        formData.append("ExersiceFiles", uploadFile);

        const stepTwoResponse = await postAddExerciseFile(formData);

        if (stepTwoResponse) {
          toast.success(stepTwoResponse?.message || "تکلیف با موفقیت ارسال شد!");
          
          setUploadFile(null);
          fetchAssignments();
        } else {
          toast.error("خطا در آپلود فایل.");
        }
      } else {
        toast.error("خطا در ثبت اولیه تکلیف.");
      }
    } catch (error) {
      console.error("Error submitting homework:", error);
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setIsSubmitting(false);
      setIsUploadModalOpen(false);
    }
  };

  const handleDeleteHomework = async (item) => {
    if (!confirm("آیا از حذف پاسخ این تکلیف مطمئن هستید؟")) return;

    try {
      const deleteValues = {
        id: item.courseUserHomeWorkId || item.homeWorkId
      };
      const response = await deleteExerciseFile(deleteValues);

      if (response) {
        toast.success(response?.message || "پاسخ تکلیف با موفقیت حذف شد.");
        fetchAssignments();
      } else {
        toast.error("خطا در حذف پاسخ.");
      }
    } catch (error) {
      console.error("Error deleting homework:", error);
      toast.error("خطا در ارتباط با سرور.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">تکالیف من</h1>
          <p className="text-xs text-muted mt-1">مشاهده تسک‌ها، ارسال پاسخ‌ها و پیگیری تکالیف دوره</p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-muted text-sm">در حال بارگذاری تکالیف...</div>
      ) : assignments.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm bg-overlay border border-border/50 rounded-2xl">
          هیچ تکلیفی برای شما ثبت نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((item) => {
            const isSubmitted = item.isSend || item.courseUserHomeWorkId;

            return (
              <div 
                key={item.homeWorkId} 
                className="bg-overlay border border-border/50 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-accent/50 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold flex items-center gap-1">
                      <HugeiconsIcon icon={UserGroupIcon} className="w-3.5 h-3.5" />
                      {item.groupName}
                    </span>
                    <span className="text-[10px] text-muted flex items-center gap-1">
                      <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5" />
                      {new Date(item.homeWorkDate).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mt-2">{item.hwTitle}</h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">{item.hwDescribe}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  <button
                    onClick={() => handleOpenDetail(item)}
                    className="flex-1 py-2 bg-default text-foreground text-xs font-semibold rounded-xl hover:bg-default/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <HugeiconsIcon icon={ViewIcon} className="w-4 h-4" />
                    جزئیات
                  </button>

                  {isSubmitted ? (
                    <button
                      onClick={() => handleDeleteHomework(item)}
                      className="flex-1 py-2 bg-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                      حذف پاسخ
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFirstStepAssignment(item)}
                      className="flex-1 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HugeiconsIcon icon={Upload01Icon} className="w-4 h-4" />
                      ارسال پاسخ
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">جزئیات کامل تکلیف</h2>

            {isDetailLoading ? (
              <div className="py-12 text-center text-muted text-xs">در حال دریافت اطلاعات...</div>
            ) : (
              <div className="flex flex-col gap-4 text-right">
                {sessionDetail?.sessionFileDtos && sessionDetail.sessionFileDtos.length > 0 && (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-default">
                    <img 
                      src={sessionDetail.sessionFileDtos[0].fileAddress || "/default-banner.png"} 
                      alt="Course Asset" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">عنوان تکلیف:</span>
                  <span className="text-sm font-semibold text-foreground">{selectedAssignment?.hwTitle}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">نام گروه:</span>
                  <span className="text-sm font-medium text-foreground">{selectedAssignment?.groupName}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted">توضیحات کامل:</span>
                  <p className="text-xs text-foreground bg-default/40 p-3 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {selectedAssignment?.hwDescribe}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-2xl relative">
            <button 
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 left-4 text-muted hover:text-foreground cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">بارگذاری پاسخ تکلیف</h2>
            <p className="text-xs text-muted">تکلیف: <span className="font-semibold text-foreground">{selectedAssignment?.hwTitle}</span></p>

            <form onSubmit={handleSubmitHomework} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-foreground">انتخاب فایل پاسخ (پروژه، زیپ یا تصویر):</label>
                <input 
                  type="file" 
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:opacity-90 cursor-pointer border border-border rounded-xl p-2 bg-default/30"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-default cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ارسال..." : "بارگذاری و ثبت نهایی"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
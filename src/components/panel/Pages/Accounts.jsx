import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  UserAccountIcon, 
  UserAdd01Icon, 
  SecurityLockIcon, 
  CheckmarkCircle02Icon, 
  Delete02Icon, 
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
  LinkSquare02Icon 
} from "@hugeicons/core-free-icons";
import { 
  getMyAccounts, 
  getSecurityInfo,
  getUserProfile 
} from "../../../core/services/userPanel/get"; 
import { 
  postAddAccount 
} from "../../../core/services/userPanel/post"; 
import { 
  patchActiveAccount, 
  patchRemoveAccount 
} from "../../../core/services/userPanel/patch"; 
import { 
  putEditSecurityInfo, 
  putChangePassword 
} from "../../../core/services/userPanel/put"; 

const Accounts = () => {
  const [accountsData, setAccountsData] = useState({ accounts: [], activeId: null });
  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [securityTab, setSecurityTab] = useState("info");

  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const addFormik = useFormik({
    initialValues: { phoneOrGmail: "", password: "", rememberMe: true },
    validationSchema: Yup.object({
      phoneOrGmail: Yup.string().required("شماره موبایل یا ایمیل الزامی است"),
      password: Yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد").required("رمز عبور الزامی است"),
    }),
    onSubmit: async (values) => {
      const toastId = toast.loading("در حال افزودن حساب جدید...");
      try {
        const res = await postAddAccount(values);
        if (res) {
          toast.success("حساب جدید با موفقیت افزوده شد", { id: toastId });
          setIsAddModalOpen(false);
          addFormik.resetForm();
          fetchAccounts();
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "خطا در افزودن حساب", { id: toastId });
      }
    }
  });

  const securityInfoFormik = useFormik({
    initialValues: { twoStepAuth: false, recoveryEmail: "", telegramUsername: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      recoveryEmail: Yup.string().email("فرمت ایمیل نامعتبر است").required("ایمیل بازیابی الزامی است"),
      telegramUsername: Yup.string().required("نام کاربری تلگرام الزامی است"),
    }),
    onSubmit: async (values) => {
      const toastId = toast.loading("در حال ذخیره تغییرات امنیتی...");
      try {
        await putEditSecurityInfo(values);
        toast.success("تنظیمات امنیتی با موفقیت بروز شد", { id: toastId });
        setIsSecurityModalOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("خطا در ذخیره تغییرات", { id: toastId });
      }
    }
  });

  const passwordFormik = useFormik({
    initialValues: { password: "", newPassword: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().required("رمز عبور فعلی الزامی است"),
      newPassword: Yup.string().min(6, "رمز عبور جدید باید حداقل ۶ کاراکتر باشد").required("رمز عبور جدید الزامی است"),
    }),
    onSubmit: async (values) => {
      const toastId = toast.loading("در حال تغییر رمز عبور...");
      try {
        const res = await putChangePassword(values);
        if (res) {
          toast.success("رمز عبور با موفقیت تغییر کرد", { id: toastId });
          passwordFormik.resetForm();
          setIsSecurityModalOpen(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "خطا در تغییر رمز عبور", { id: toastId });
      }
    }
  });

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const res = await getMyAccounts();
      if (res && res.data) {
        setAccountsData({
          accounts: res.data.accounts || [],
          activeId: res.data.activeId || null
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت لیست حساب‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSwitchAccount = async (id) => {
    const toastId = toast.loading("در حال تغییر حساب فعال...");
    try {
      const res = await patchActiveAccount(id);
      if (res) {
        toast.success("حساب فعال با موفقیت تغییر کرد", { id: toastId });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در تغییر حساب فعال", { id: toastId });
    }
  };

  const handleRemoveAccount = async (id) => {
    const toastId = toast.loading("در حال حذف حساب...");
    try {
      await patchRemoveAccount(id);
      toast.success("حساب با موفقیت حذف شد", { id: toastId });
      fetchAccounts();
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف حساب", { id: toastId });
    }
  };

  const handleOpenSecurityModal = async () => {
    setIsSecurityModalOpen(true);
    const toastId = toast.loading("در حال بارگذاری اطلاعات امنیتی و پروفایل...");
    try {
      // دریافت اطلاعات امنیتی و پروفایل کاربر به صورت هم‌زمان
      const [securityRes, profileRes] = await Promise.all([
        getSecurityInfo(),
        getUserProfile()
      ]);

      if (securityRes && securityRes.data) {
        securityInfoFormik.setValues({
          twoStepAuth: securityRes.data.twoStepAuth || false,
          recoveryEmail: securityRes.data.recoveryEmail || "",
          telegramUsername: securityRes.data.userTelegrams || ""
        });
      }

      // قرار دادن رمز عبور دریافتی از متد getUserProfile داخل فرم تغییر رمز
      const profileData = profileRes?.data?.data || profileRes?.data;
      if (profileData && profileData.password) {
        passwordFormik.setFieldValue("password", profileData.password);
      }

      toast.dismiss(toastId);
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">مدیریت حساب‌ها و امنیت</h1>
          <p className="text-xs text-muted">مدیریت حساب‌های متصل، سوییچ بین اکانت‌ها و تنظیمات امنیتی</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <HugeiconsIcon icon={UserAdd01Icon} className="w-4 h-4" />
            افزودن حساب جدید
          </button>
        </div>
      </div>

      <div className="bg-overlay border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <HugeiconsIcon icon={UserAccountIcon} className="w-4 h-4 text-accent" />
          حساب‌های متصل شما
        </h2>

        {isLoading ? (
          <div className="text-center py-8 text-muted text-xs">در حال بارگذاری حساب‌ها...</div>
        ) : accountsData.accounts.length === 0 ? (
          <div className="text-center py-8 text-muted text-xs">هیچ حسابی یافت نشد.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {accountsData.accounts.map((acc) => {
              const isActive = acc.id === accountsData.activeId;
              return (
                <div 
                  key={acc.id} 
                  className={`border rounded-2xl p-4 flex items-center justify-between gap-4 transition-all ${
                    isActive ? "border-accent bg-accent/5" : "border-border bg-default/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={acc.currentPictureAddress || "https://via.placeholder.com/150"} 
                      alt={acc.fName} 
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{acc.fName} {acc.lName}</span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-medium">
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3 h-3" />
                            فعال
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted block mt-0.5">عضویت: {new Date(acc.insertDate).toLocaleDateString("fa-IR")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isActive ? (
                      <button
                        onClick={() => handleSwitchAccount(acc.id)}
                        className="px-3 py-1.5 rounded-lg bg-default border border-border text-xs font-medium text-foreground hover:bg-accent hover:text-white transition-colors"
                      >
                        سوییچ
                      </button>
                    ) : (
                      <button
                        onClick={handleOpenSecurityModal}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
                      >
                        <HugeiconsIcon icon={SecurityLockIcon} className="w-3.5 h-3.5" />
                        امنیت
                      </button>
                    )}

                    {accountsData.accounts.length > 1 && !isActive && (
                      <button
                        onClick={() => handleRemoveAccount(acc.id)}
                        className="p-1.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                        title="حذف حساب"
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground">افزودن حساب کاربری دیگر</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-foreground">
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addFormik.handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted block mb-1">شماره موبایل یا ایمیل</label>
                <input
                  type="text"
                  name="phoneOrGmail"
                  value={addFormik.values.phoneOrGmail}
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                  placeholder="09123456789"
                  className="w-full bg-default border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                />
                {addFormik.touched.phoneOrGmail && addFormik.errors.phoneOrGmail && (
                  <span className="text-[10px] text-danger mt-1 block">{addFormik.errors.phoneOrGmail}</span>
                )}
              </div>

              <div>
                <label className="text-xs text-muted block mb-1">رمز عبور</label>
                <div className="relative">
                  <input
                    type={showAddPassword ? "text" : "password"}
                    name="password"
                    value={addFormik.values.password}
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                    placeholder="••••••••"
                    className="w-full bg-default border border-border rounded-xl px-3 py-2 pl-9 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAddPassword(!showAddPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    <HugeiconsIcon icon={showAddPassword ? ViewOffIcon : ViewIcon} className="w-4 h-4" />
                  </button>
                </div>
                {addFormik.touched.password && addFormik.errors.password && (
                  <span className="text-[10px] text-danger mt-1 block">{addFormik.errors.password}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={addFormik.values.rememberMe}
                  onChange={addFormik.handleChange}
                  className="rounded border-border accent-accent"
                />
                <label htmlFor="remember" className="text-xs text-muted">مرا به خاطر بسپار</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-default text-xs font-medium text-muted hover:text-foreground"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:opacity-90"
                >
                  افزودن حساب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-overlay border border-border rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground">تنظیمات امنیتی حساب فعال</h3>
              <button onClick={() => setIsSecurityModalOpen(false)} className="text-muted hover:text-foreground">
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-border gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setSecurityTab("info")}
                className={`pb-2 border-b-2 transition-colors ${securityTab === "info" ? "border-accent text-accent" : "border-transparent text-muted"}`}
              >
                اطلاعات امنیتی و تایید دو مرحله‌ای
              </button>
              <button
                type="button"
                onClick={() => setSecurityTab("password")}
                className={`pb-2 border-b-2 transition-colors ${securityTab === "password" ? "border-accent text-accent" : "border-transparent text-muted"}`}
              >
                تغییر رمز عبور
              </button>
            </div>

            {securityTab === "info" ? (
              <form onSubmit={securityInfoFormik.handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between bg-sky-500/10 border border-sky-500/20 p-3.5 rounded-xl">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block">ربات تلگرام احراز هویت</span>
                    <p className="text-[11px] text-muted">برای مدیریت بهتر و دریافت هشدارها به ربات ما بپیوندید.</p>
                  </div>
                  <a
                    href="https://t.me/ReactRHBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 transition-colors shrink-0"
                  >
                    <span>اتصال به ربات</span>
                    <HugeiconsIcon icon={LinkSquare02Icon} className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <label className="text-xs text-muted block mb-1">ایمیل بازیابی</label>
                  <input
                    type="email"
                    name="recoveryEmail"
                    value={securityInfoFormik.values.recoveryEmail}
                    onChange={securityInfoFormik.handleChange}
                    onBlur={securityInfoFormik.handleBlur}
                    placeholder="example@gmail.com"
                    className="w-full bg-default border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                  {securityInfoFormik.touched.recoveryEmail && securityInfoFormik.errors.recoveryEmail && (
                    <span className="text-[10px] text-danger mt-1 block">{securityInfoFormik.errors.recoveryEmail}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs text-muted block mb-1">نام کاربری تلگرام</label>
                  <input
                    type="text"
                    name="telegramUsername"
                    value={securityInfoFormik.values.telegramUsername}
                    onChange={securityInfoFormik.handleChange}
                    onBlur={securityInfoFormik.handleBlur}
                    placeholder="@username"
                    className="w-full bg-default border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                  {securityInfoFormik.touched.telegramUsername && securityInfoFormik.errors.telegramUsername && (
                    <span className="text-[10px] text-danger mt-1 block">{securityInfoFormik.errors.telegramUsername}</span>
                  )}
                </div>

                <div className="flex items-center justify-between bg-default/40 p-3 rounded-xl border border-border">
                  <span className="text-xs text-foreground font-medium">تایید دو مرحله‌ای</span>
                  <input
                    type="checkbox"
                    name="twoStepAuth"
                    checked={securityInfoFormik.values.twoStepAuth}
                    onChange={securityInfoFormik.handleChange}
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSecurityModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-default text-xs font-medium text-muted hover:text-foreground"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:opacity-90"
                  >
                    ذخیره تغییرات امنیتی
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted block mb-1">رمز عبور فعلی</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="password"
                      value={passwordFormik.values.password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      placeholder="••••••••"
                      className="w-full bg-default border border-border rounded-xl px-3 py-2 pl-9 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                    >
                      <HugeiconsIcon icon={showOldPassword ? ViewOffIcon : ViewIcon} className="w-4 h-4" />
                    </button>
                  </div>
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <span className="text-[10px] text-danger mt-1 block">{passwordFormik.errors.password}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs text-muted block mb-1">رمز عبور جدید</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordFormik.values.newPassword}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      placeholder="••••••••"
                      className="w-full bg-default border border-border rounded-xl px-3 py-2 pl-9 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                    >
                      <HugeiconsIcon icon={showNewPassword ? ViewOffIcon : ViewIcon} className="w-4 h-4" />
                    </button>
                  </div>
                  {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                    <span className="text-[10px] text-danger mt-1 block">{passwordFormik.errors.newPassword}</span>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSecurityModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-default text-xs font-medium text-muted hover:text-foreground"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:opacity-90"
                  >
                    تغییر رمز عبور
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
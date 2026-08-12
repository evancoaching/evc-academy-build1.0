import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, ArrowRight, UserPlus, LogIn, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { Student, UserSession } from '../types';
import { formatJoinDate } from '../lib/studentUtils';
import { normalizeCourseIds } from '../lib/courseAccess';

interface LoginPageProps {
  students: Student[];
  onLoginSuccess: (session: UserSession) => void;
  onRegisterStudent?: (student: Student) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  students,
  onLoginSuccess,
  onRegisterStudent,
}) => {
  const [activeMode, setActiveMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [identifierInput, setIdentifierInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCourses, setRegCourses] = useState<string[]>(['ms-2026']);
  const [regSuccessMessage, setRegSuccessMessage] = useState('');

  // Helper to normalize phone numbers (remove non-digits, replace +84 with 0)
  const normalizePhone = (phoneStr: string): string => {
    let clean = phoneStr.replace(/[^0-9]/g, '');
    if (clean.startsWith('84') && clean.length >= 10) {
      clean = '0' + clean.slice(2);
    }
    return clean;
  };

  // Handle Login Submit (Email or Phone)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const rawInput = identifierInput.trim();

    if (!rawInput) {
      setErrorMessage('Vui lòng nhập Email hoặc Số điện thoại của bạn!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isEmail = rawInput.includes('@');
      const cleanEmail = rawInput.toLowerCase();
      const cleanPhone = normalizePhone(rawInput);

      // Match student by email or phone
      const matchedStudent = students.find((s) => {
        if (isEmail) {
          return s.email.toLowerCase() === cleanEmail;
        }
        // Match by phone if student has phone, or by clean phone digits in notes/email
        if (s.phone && normalizePhone(s.phone) === cleanPhone) {
          return true;
        }
        if (s.notes && normalizePhone(s.notes).includes(cleanPhone) && cleanPhone.length >= 9) {
          return true;
        }
        // Fallback exact email match if someone entered email without @ (unlikely but safe)
        return s.email.toLowerCase() === cleanEmail;
      });

      if (!matchedStudent) {
        setErrorMessage(
          `Thông tin "${rawInput}" chưa có trong hệ thống. Vui lòng chuyển sang tab "Register" để gửi thông tin cho Admin duyệt.`
        );
        return;
      }

      if (matchedStudent.status === 'pending') {
        setErrorMessage(
          `Tài khoản "${rawInput}" đang ở trạng thái chờ Admin / Coach Evan duyệt. Sau khi được duyệt, bạn sẽ đăng nhập thành công.`
        );
        return;
      }

      if (matchedStudent.status === 'blocked') {
        setErrorMessage(
          `Tài khoản này đã bị khóa (Blocked). Vui lòng liên hệ bộ phận hỗ trợ.`
        );
        return;
      }

      // Successful authentication!
      onLoginSuccess({
        email: matchedStudent.email,
        fullName: matchedStudent.fullName,
        isAdmin:
          matchedStudent.role === 'admin' ||
          matchedStudent.email === 'nguyen@evancoaching.net' ||
          matchedStudent.fullName.includes('Admin'),
        accessLevel: matchedStudent.accessLevel,
        allowedCourseIds: normalizeCourseIds(matchedStudent.allowedCourseIds || []),
      });
    }, 350);
  };

  // Handle Self-Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setRegSuccessMessage('');

    const trimmedEmail = regEmail.trim().toLowerCase();
    const trimmedName = regName.trim();
    const trimmedPhone = regPhone.trim();

    if (!trimmedEmail || !trimmedName) {
      setErrorMessage('Vui lòng điền đầy đủ Họ tên và Địa chỉ Email!');
      return;
    }

    if (regCourses.length === 0) {
      setErrorMessage('Vui lòng chọn ít nhất 1 khóa học bạn muốn đăng ký!');
      return;
    }

    // Check if already registered
    const existing = students.find((s) => s.email.toLowerCase() === trimmedEmail);
    if (existing) {
      if (existing.status === 'active') {
        setErrorMessage(`Email "${trimmedEmail}" đã được duyệt trước đó! Bạn có thể chuyển qua tab Login ngay.`);
      } else {
        setErrorMessage(`Email "${trimmedEmail}" đã gửi yêu cầu trước đó và đang ở trạng thái chờ Admin duyệt.`);
      }
      return;
    }

    const newStudent: Student = {
      id: `std-reg-${Date.now()}`,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      fullName: trimmedName,
      status: 'pending',
      role: 'user',
      accessLevel: 'full',
      allowedCourseIds: normalizeCourseIds(regCourses),
      dateApproved: formatJoinDate(),
      lastActive: 'Chưa kích hoạt',
      notes: trimmedPhone ? `SĐT: ${trimmedPhone}` : 'Học viên tự đăng ký',
    };

    if (onRegisterStudent) {
      onRegisterStudent(newStudent);
    }

    setRegSuccessMessage(
      `Cảm ơn ${trimmedName}! Yêu cầu đăng ký tài khoản (${trimmedEmail}) đã được gửi thành công. Admin sẽ phê duyệt tài khoản của bạn trong thời gian sớm nhất.`
    );
    setIdentifierInput(trimmedEmail);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
  };

  const toggleCourseReg = (courseId: string) => {
    setRegCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="min-h-screen bg-[#ffe3e9] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Centered Modal Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-pink-200/60 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Visual Brand Column (Clean Warm Light Beige #FAF7F2 without double borders) */}
        <div className="w-full md:w-5/12 bg-[#FAF7F2] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/80 relative">
          
          <div className="space-y-6">
            {/* Site Logo */}
            <div>
              <img 
                src="https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/65b87c64ad18fe059fe9ffaf_Logo.png" 
                alt="Evan Coaching" 
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            {/* Academy Portal Badge */}
            <div>
              <span className="inline-flex items-center text-[11px] font-extrabold text-[#e34e6b] tracking-widest uppercase bg-[#ffe3e9] px-3.5 py-1 rounded-full border border-[#fccad5]">
                Academy Portal
              </span>
            </div>

            {/* Headline & Description */}
            <div className="space-y-3 pt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Evan Coaching <br />
                <span className="text-[#e34e6b]">Academy</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Nền tảng đào tạo Quản Lý Tài Chính Cá Nhân &amp; Đầu Tư Bất Động Sản Mỹ.
              </p>
            </div>
          </div>

          {/* Footer on Left Card */}
          <div className="pt-8 text-xs text-slate-500 font-medium">
            © 2026 Evan Coaching Academy • academy.evancoaching.net
          </div>

        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
          
          <div className="space-y-6">
            
            {/* Top Switcher: Login vs Register */}
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('login');
                  setErrorMessage('');
                  setRegSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeMode === 'login'
                    ? 'bg-[#e34e6b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('register');
                  setErrorMessage('');
                  setRegSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeMode === 'register'
                    ? 'bg-[#e34e6b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-2 text-red-900">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Thông báo</span>
                </div>
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Success Message Box */}
            {regSuccessMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-2 text-emerald-900">
                  <Clock className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>Đã gửi yêu cầu thành công!</span>
                </div>
                <p>{regSuccessMessage}</p>
                <button
                  onClick={() => {
                    setActiveMode('login');
                    setRegSuccessMessage('');
                  }}
                  className="mt-2 px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Chuyển sang Login →
                </button>
              </div>
            )}

            {/* MODE 1: LOGIN FORM */}
            {activeMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email hoặc Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 flex items-center gap-1 text-slate-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                      <span className="text-slate-300">/</span>
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifierInput}
                      onChange={(e) => setIdentifierInput(e.target.value)}
                      placeholder="Nhập email hoặc số điện thoại..."
                      className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#e34e6b] text-slate-900 font-medium text-sm rounded-xl transition-all focus:outline-hidden"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Nhập email hoặc số điện thoại bạn đã đăng ký với Evan Coaching.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Đang kiểm tra...</span>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* MODE 2: REGISTRATION FORM */}
            {activeMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Đăng ký tài khoản học viên mới
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Thông tin sẽ được gửi đến Admin để kích hoạt quyền truy cập khóa học.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và Tên (*):
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Hùng"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Địa chỉ Email (*):
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="hung.nguyen@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại:
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0901234567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Khóa học muốn đăng ký (*):
                    </label>
                    <div className="space-y-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                        <input
                          type="checkbox"
                          checked={regCourses.includes('ms-2026')}
                          onChange={() => toggleCourseReg('ms-2026')}
                          className="w-4 h-4 text-[#e34e6b] rounded-sm focus:ring-0 cursor-pointer"
                        />
                        <span className="font-semibold">Money Skills Masterclass 2026</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                        <input
                          type="checkbox"
                          checked={regCourses.includes('re-2026')}
                          onChange={() => toggleCourseReg('re-2026')}
                          className="w-4 h-4 text-[#e34e6b] rounded-sm focus:ring-0 cursor-pointer"
                        />
                        <span className="font-semibold">Real Estate Investing 2026</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Gửi Đăng Ký Tài Khoản</span>
                </button>
              </form>
            )}

          </div>

          {/* Footer Contact */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>Liên hệ support:</span>
            <a 
              href="https://m.me/1055489317656827" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#e34e6b] hover:text-[#cf3c5a] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#0084FF]" />
              <span>Messenger</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};


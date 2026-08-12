import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Home, 
  Calculator, 
  ArrowRight, 
  Star, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  List,
  Building,
  Key,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { Course } from '../types';

interface CourseOverviewProps {
  course: Course;
  onStartCourse: () => void;
  hasClassroomAccess?: boolean;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  course,
  onStartCourse,
  hasClassroomAccess = true,
}) => {
  const isRealEstate = course.id === 're-2026';

  // Collapsible accordion state for syllabus modules
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
  });

  const toggleModule = (id: number) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAll = () => {
    setExpandedModules({ 1: false, 2: false, 3: false, 4: false });
  };

  const expandAll = () => {
    setExpandedModules({ 1: true, 2: true, 3: true, 4: true });
  };

  const allExpanded = Object.values(expandedModules).every(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Course Hero Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFFBEB]/10 text-[#FEF3C7] border border-[#FEF3C7]/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#B45309] text-[#B45309]" />
            {course.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {course.title.toUpperCase()}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {hasClassroomAccess ? (
              <button
                onClick={onStartCourse}
                className="px-6 py-3.5 bg-[#B45309] hover:bg-[#92400E] text-white font-extrabold text-base rounded-xl shadow-lg shadow-[#B45309]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                Vào Lớp Học (Classroom)
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  className="px-6 py-3.5 bg-slate-600 text-slate-300 font-extrabold text-base rounded-xl flex items-center gap-2 cursor-not-allowed opacity-80"
                >
                  Classroom đang khóa — chưa được cấp quyền
                </button>
                <p className="text-xs text-slate-400">
                  Overview vẫn xem được. Đăng ký / chờ Admin duyệt quyền lớp này để vào xem video.
                </p>
              </div>
            )}

            {course.externalUrl && (
              <a
                href={course.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <span>Trang Gốc Website</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isRealEstate ? (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B45309] flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 1: Nguồn Vốn & Vay</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nắm vững Leverage đòn bẩy, Mortgage FICO Score, chỉ số LTV & DTI tối ưu tiền down.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 2: Gói Vay & Mortgage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                So sánh Conventional, FHA, VA, ARM thả nổi & chiến lược đàm phán Rate Shopping.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 3: Dòng Tiền & Cho Thuê</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tính toán Appreciation vs Cash Flow, đăng Zillow & chọn Tenant chuẩn credit.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 4: LLC, Trust & Thuế</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bảo vệ tài sản qua Umbrella Insurance, LLC, Living Trust & khấu hao 27.5 năm.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 1: Credit Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nắm vững 5 trụ cột FICO Score, khóa tín dụng chống lừa đảo & bí quyết tăng điểm 750+.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 2: Chứng Khoán</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đầu tư Quỹ chỉ số S&P 500, Dividend, CD Ladder & thực hành giao dịch sàn Fidelity.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 3: Bất Động Sản</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Các chỉ số LTV, DTI, bảo hiểm PMI & chọn gói vay mua nhà Conventional/FHA/VA.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#c31e3e] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Module 4: Tối Ưu Thuế</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chiến lược 401k, Traditional IRA, Roth IRA, Backdoor Roth & tài khoản hưu trí cho con.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Detailed Module Syllabus List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <List className="w-5 h-5 text-[#B45309]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Chương Trình Học Chi Tiết ({course.titleVi})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={allExpanded ? collapseAll : expandAll}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {allExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{allExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}</span>
            </button>

            <button
              onClick={onStartCourse}
              className="px-4 py-2 bg-[#B45309] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#92400E] cursor-pointer flex items-center gap-1.5"
            >
              <span>Vào lớp học →</span>
            </button>
          </div>
        </div>

        {/* Accordion Modules List */}
        <div className="space-y-4">
          {course.modules.map((mod) => {
            const isExpanded = expandedModules[mod.id] ?? false;

            return (
              <div key={mod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all">
                
                {/* Module Collapsible Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-200"
                >
                  <div className="pr-4">
                    <span className="text-xs font-extrabold text-[#B45309] uppercase tracking-wide">
                      Module {mod.number} • ({mod.lessons.length} bài học)
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {mod.titleVi}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#B45309]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Collapsible Lessons List */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100 bg-white">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={onStartCourse}
                        className="p-4 hover:bg-[#FFFBEB]/50 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#FEF3C7] text-slate-700 group-hover:text-[#B45309] font-extrabold text-xs flex items-center justify-center shrink-0">
                            {mod.number}.{lesson.lessonNumber}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm group-hover:text-[#B45309] flex items-center gap-2">
                              <span>{lesson.titleVi}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {lesson.summary || lesson.title}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-[#B45309] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <Play className="w-3.5 h-3.5 fill-[#B45309]" />
                            <span>Học video</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  List,
} from 'lucide-react';
import { Course } from '../types';

interface CourseOverviewProps {
  course: Course;
  onStartCourse: () => void;
  hasClassroomAccess?: boolean;
  startLabel?: string;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  course,
  onStartCourse,
  hasClassroomAccess = true,
  startLabel = 'Vào Lớp Học (Classroom)',
}) => {
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
  const weeks = course.weeks || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#e34e6b]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFE3E9]/10 text-[#FFE3E9] border border-[#FFE3E9]/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#e34e6b] text-[#e34e6b]" />
            {course.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {course.description}
          </p>

          {course.formatNote ? (
            <p className="text-slate-400 text-sm leading-relaxed">{course.formatNote}</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {hasClassroomAccess ? (
              <button
                onClick={onStartCourse}
                className="px-6 py-3.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-extrabold text-base rounded-xl shadow-lg shadow-[#e34e6b]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                {startLabel}
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-3.5 bg-slate-600 text-slate-300 font-extrabold text-base rounded-xl flex items-center gap-2 cursor-not-allowed opacity-80"
              >
                Classroom đang khóa — chưa được cấp quyền
              </button>
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

      {weeks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Lộ trình 4 tuần</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeks.map((w) => (
              <div
                key={w.week}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE3E9] text-[#e34e6b] flex items-center justify-center font-extrabold text-sm shrink-0">
                    {w.week}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {w.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-[#e34e6b]" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Chương Trình Video Chi Tiết
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={allExpanded ? collapseAll : expandAll}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Thu gọn
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Mở rộng
                </>
              )}
            </button>
            {hasClassroomAccess && (
              <button
                onClick={onStartCourse}
                className="px-4 py-2 bg-[#e34e6b] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#cf3c5a] cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                {startLabel}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {course.modules.map((mod) => {
            const isExpanded = expandedModules[mod.id];
            return (
              <div
                key={mod.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-[#e34e6b] uppercase tracking-wide">
                        Module {mod.number}
                      </span>
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">
                        {mod.titleVi || mod.title}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#e34e6b] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 divide-y divide-slate-50">
                    {mod.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="p-4 hover:bg-[#FFE3E9]/50 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#FFE3E9] text-slate-700 group-hover:text-[#e34e6b] font-extrabold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>
                          <div className="font-bold text-slate-800 text-sm group-hover:text-[#e34e6b] truncate">
                            {lesson.titleVi || lesson.title}
                          </div>
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

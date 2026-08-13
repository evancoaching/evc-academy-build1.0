import React from 'react';
import { BookOpen, Play, CheckCircle2, Sparkles, ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { Course, UserSession } from '../types';
import { canAccessClassroom } from '../lib/courseAccess';

interface CourseCatalogProps {
  courses: Course[];
  activeCourseId: string;
  onSelectCourse: (course: Course, targetTab: 'classroom' | 'overview' | string) => void;
  session?: UserSession;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  activeCourseId,
  onSelectCourse,
  session,
}) => {
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#FFE3E9] text-[#e34e6b] border border-[#FFE3E9] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e34e6b]" />
            Evan Coaching
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Danh Sách Khóa Học
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-lg font-extrabold text-[#e34e6b]">{courses.length}</div>
            <div className="text-[11px] text-slate-500 font-bold uppercase">Khóa Học</div>
          </div>
          <div className="text-center px-3">
            <div className="text-lg font-extrabold text-slate-900">{totalLessons}</div>
            <div className="text-[11px] text-slate-500 font-bold uppercase font-sans">Videos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => {
          const isActive = course.id === activeCourseId;
          const hasAccess = canAccessClassroom(session, course.id);

          return (
            <div
              key={course.id}
              className={`bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs group rounded-none ${
                isActive
                  ? 'border-[#e34e6b] ring-2 ring-[#e34e6b]/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Cover: native aspect ratio, no border-radius */}
              <div className="relative w-full bg-slate-100 rounded-none">
                <img
                  src={course.thumbnailUrl || ''}
                  alt={course.title}
                  className="w-full h-auto block rounded-none"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {hasAccess ? (
                    <span className="px-2.5 py-1 bg-emerald-600/90 text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã Đăng Ký
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-800/85 text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-xs">
                      <Lock className="w-3.5 h-3.5" /> Chưa Đăng Ký
                    </span>
                  )}

                  {isActive && (
                    <span className="px-2.5 py-1 bg-[#e34e6b] text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-xs">
                      Đang Chọn
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium border-b border-slate-100 pb-2 gap-2">
                    <span className="font-bold text-slate-700">{course.title}</span>
                    {course.externalUrl && (
                      <a
                        href={course.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#e34e6b] hover:underline font-semibold shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        evancoaching.net <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <BookOpen className="w-3.5 h-3.5 text-[#e34e6b]" />
                    <span>{course.totalModules} Module</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <Play className="w-3.5 h-3.5 text-[#e34e6b]" />
                    <span>{course.totalLessons} Videos</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectCourse(course, 'overview')}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 bg-white border border-slate-200 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Overview
                </button>

                {hasAccess ? (
                  <button
                    onClick={() => onSelectCourse(course, 'classroom')}
                    className="px-4 py-2.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Classroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectCourse(course, 'overview')}
                    className="px-4 py-2.5 bg-slate-200 text-slate-600 font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    title="Chưa được cấp quyền xem video — xem Overview trước"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Classroom khóa</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

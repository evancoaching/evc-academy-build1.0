import React, { useState } from 'react';
import { Download, FileSpreadsheet, Lock, CheckCircle2 } from 'lucide-react';
import { Course, UserSession } from '../types';

interface ResourcesListProps {
  courses: Course[];
  session?: UserSession;
}

interface ResourceItem {
  id: string;
  title: string;
  type: 'EXCEL' | 'PDF' | 'LINK';
  desc: string;
  moduleName: string;
  lessonTitle: string;
  url: string;
}

interface CourseResourceGroup {
  courseId: string;
  courseTitle: string;
  courseBadge: string;
  items: ResourceItem[];
}

function normalizeType(type?: string, title = '', url = ''): ResourceItem['type'] {
  const s = `${type || ''} ${title} ${url}`.toLowerCase();
  if (s.includes('xls') || s.includes('excel') || s.includes('spreadsheet')) return 'EXCEL';
  if (s.includes('pdf')) return 'PDF';
  return 'LINK';
}

function buildGroupsFromCourses(courses: Course[]): CourseResourceGroup[] {
  return courses.map((course) => {
    const items: ResourceItem[] = [];

    course.modules.forEach((mod) => {
      const moduleName = `Module ${mod.number}: ${mod.titleVi || mod.title}`;
      mod.lessons.forEach((lesson) => {
        (lesson.resources || []).forEach((res, idx) => {
          items.push({
            id: `${course.id}-${lesson.id}-res-${idx}`,
            title: res.title,
            type: normalizeType(res.type, res.title, res.url),
            desc: lesson.summary || lesson.descriptionVi || `Tài liệu đính kèm bài: ${lesson.titleVi || lesson.title}`,
            moduleName,
            lessonTitle: lesson.titleVi || lesson.title,
            url: res.url || '#',
          });
        });
      });
    });

    // Deduplicate by title + url within a course
    const seen = new Set<string>();
    const unique = items.filter((item) => {
      const key = `${item.title.toLowerCase()}::${item.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return {
      courseId: course.id,
      courseTitle: course.titleVi || course.title,
      courseBadge: course.badge || course.category || 'Khóa học',
      items: unique,
    };
  });
}

export const ResourcesList: React.FC<ResourcesListProps> = ({
  courses,
  session,
}) => {
  const [selectedCourseTab, setSelectedCourseTab] = useState<string>('all');

  const resourceGroups = buildGroupsFromCourses(courses);

  const filteredGroups = resourceGroups.filter((group) => {
    if (selectedCourseTab === 'all') return true;
    return group.courseId === selectedCourseTab;
  });

  const handleDownload = (item: ResourceItem) => {
    if (!item.url || item.url === '#') {
      alert(
        `Chưa có link tải cho "${item.title}".\n\nTrên Google Sheet (tab lessons), cột Tài Liệu Đính Kèm hãy ghi:\n${item.title} | https://drive.google.com/...`
      );
      return;
    }
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#B45309]" />
            Kho Tài Liệu Theo Lớp Học
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tài Liệu & File Mẫu Thực Hành (Resources)
          </h1>
          <p className="text-sm text-slate-600">
            Đồng bộ từ bài học / Google Sheet. Chỉ tải được khi Admin đã gắn link download.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setSelectedCourseTab('all')}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedCourseTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất Cả Lớp Học
          </button>
          {resourceGroups.map((group) => (
            <button
              key={group.courseId}
              onClick={() => setSelectedCourseTab(group.courseId)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCourseTab === group.courseId
                  ? 'bg-white text-[#B45309] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {group.courseId === 'ms-2026'
                ? 'Money Skills'
                : group.courseId === 're-2026'
                ? 'Real Estate'
                : group.courseTitle}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredGroups.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
            Chưa có khóa học nào để hiển thị tài liệu.
          </div>
        ) : (
          filteredGroups.map((group) => {
            const hasAccess =
              session?.isAdmin ||
              session?.allowedCourseIds?.includes(group.courseId) ||
              false;

            return (
              <div
                key={group.courseId}
                className={`bg-white rounded-3xl border overflow-hidden shadow-xs transition-all ${
                  hasAccess ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                <div
                  className={`p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    hasAccess ? 'bg-slate-50/80 border-slate-200' : 'bg-amber-50/80 border-amber-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-[#B45309] text-white text-[11px] font-bold rounded-md uppercase">
                        {group.courseBadge}
                      </span>
                      {hasAccess ? (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đã Cấp Quyền Tải Tài Liệu
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[11px] font-bold rounded-full flex items-center gap-1 border border-amber-300">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          Chưa Được Cấp Quyền Khóa Học
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      Lớp: {group.courseTitle}
                    </h2>
                  </div>

                  <div className="text-xs text-slate-500 font-semibold">
                    Tổng số:{' '}
                    <span className="text-slate-900 font-extrabold">{group.items.length} file</span>
                  </div>
                </div>

                {!hasAccess && (
                  <div className="m-6 p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 space-y-1">
                      <div className="font-bold">
                        Tài liệu của khóa học này đang bị khóa đối với tài khoản (
                        {session?.email || 'Học viên'})
                      </div>
                      <p className="text-amber-800">
                        Khi Admin duyệt cấp quyền khóa học này, các file bên dưới sẽ mở để tải về.
                      </p>
                    </div>
                  </div>
                )}

                {group.items.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Chưa có tài liệu đính kèm. Thêm vào cột <strong>Tài Liệu Đính Kèm</strong> trên
                    tab <strong>lessons</strong> rồi Pull từ Dashboard.
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.items.map((item) => {
                      const canDownload = hasAccess && item.url && item.url !== '#';
                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                            hasAccess
                              ? 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-[#B45309] hover:shadow-xs'
                              : 'bg-slate-100/60 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                {item.moduleName}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md shrink-0 ${
                                  item.type === 'EXCEL'
                                    ? 'bg-emerald-600 text-white'
                                    : item.type === 'PDF'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-600 text-white'
                                }`}
                              >
                                {item.type}
                              </span>
                            </div>

                            <div className="font-bold text-slate-900 text-sm leading-snug">
                              {item.title}
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                              {item.desc}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium">
                              Bài: {item.lessonTitle}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-xs gap-2">
                            <span className="text-slate-500 text-[11px] font-medium truncate">
                              {canDownload
                                ? 'Sẵn sàng tải'
                                : hasAccess
                                ? 'Chưa gắn link'
                                : 'Đang khóa'}
                            </span>

                            {hasAccess ? (
                              <button
                                onClick={() => handleDownload(item)}
                                className={`px-3.5 py-1.5 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                                  canDownload
                                    ? 'bg-[#B45309] hover:bg-[#92400E] text-white'
                                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                }`}
                              >
                                <Download className="w-3.5 h-3.5" /> Tải File
                              </button>
                            ) : (
                              <button
                                disabled
                                className="px-3 py-1.5 bg-slate-200 text-slate-500 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-not-allowed shrink-0"
                              >
                                <Lock className="w-3.5 h-3.5" /> Khóa Tải
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

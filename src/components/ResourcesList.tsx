import React, { useMemo, useState } from 'react';
import { Course, UserSession } from '../types';
import { COURSE_SLIDES, CourseSlide, toEmbedUrl } from '../data/courseSlides';
import { COURSE_TOOLS, CourseToolSection } from '../data/courseTools';
import { canAccessClassroom } from '../lib/courseAccess';

interface ResourcesListProps {
  courses: Course[];
  session?: UserSession;
}

type ContentTab = 'slide' | 'resources';

function resolveSlides(courses: Course[]): CourseSlide[] {
  const byId = new Map(COURSE_SLIDES.map((s) => [s.courseId, { ...s }]));

  courses.forEach((course) => {
    if (byId.has(course.id)) return;
    byId.set(course.id, {
      courseId: course.id,
      title: `Slide — ${course.titleVi || course.title}`,
      description: '',
      embedUrl: '',
      downloadUrl: '',
      format: 'pdf',
    });
  });

  const orderedIds = [
    ...COURSE_SLIDES.map((s) => s.courseId),
    ...courses.map((c) => c.id),
  ];
  const seen = new Set<string>();
  const result: CourseSlide[] = [];
  for (const id of orderedIds) {
    if (seen.has(id) || !courses.some((c) => c.id === id)) continue;
    const slide = byId.get(id);
    if (!slide) continue;
    seen.add(id);
    result.push(slide);
  }
  return result;
}

function courseLabel(courseId: string, courses: Course[]): string {
  if (courseId === 'ms-2026') return 'Money Skills';
  if (courseId === 're-2026') return 'Real Estate';
  return courses.find((c) => c.id === courseId)?.titleVi || courseId;
}

function ToolsTable({ sections }: { sections: CourseToolSection[] }) {
  if (!sections.length) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">
        Chưa có danh sách công cụ cho lớp này.
      </p>
    );
  }

  let n = 0;

  return (
    <div className="divide-y divide-slate-100">
      {sections.map((section) => (
        <section key={section.category} className="py-4 first:pt-0 last:pb-0">
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#e34e6b]">
            {section.category}
          </h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] text-slate-400">
                <th className="pb-1.5 pr-2 font-medium w-8">#</th>
                <th className="pb-1.5 pr-3 font-medium w-[32%]">Công cụ</th>
                <th className="pb-1.5 font-medium">Mục đích</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item) => {
                n += 1;
                return (
                  <tr key={`${item.name}-${item.url}`} className="align-top border-t border-slate-50">
                    <td className="py-2 pr-2 text-xs text-slate-400">{n}</td>
                    <td className="py-2 pr-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-800 hover:text-[#e34e6b]"
                      >
                        {item.name}
                      </a>
                    </td>
                    <td className="py-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.purpose}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

export const ResourcesList: React.FC<ResourcesListProps> = ({
  courses,
  session,
}) => {
  const slides = useMemo(() => resolveSlides(courses), [courses]);
  const courseIds = useMemo(() => {
    const ids = slides.map((s) => s.courseId);
    for (const id of Object.keys(COURSE_TOOLS)) {
      if (!ids.includes(id) && courses.some((c) => c.id === id)) ids.push(id);
    }
    return ids.length ? ids : courses.map((c) => c.id);
  }, [slides, courses]);

  const [courseId, setCourseId] = useState(() => courseIds[0] || '');
  const [contentTab, setContentTab] = useState<ContentTab>('slide');

  const activeCourseId = courseIds.includes(courseId) ? courseId : courseIds[0] || '';
  const activeSlide =
    slides.find((s) => s.courseId === activeCourseId) ||
    COURSE_SLIDES.find((s) => s.courseId === activeCourseId);
  const toolSections = COURSE_TOOLS[activeCourseId] || [];

  if (!activeCourseId) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
        Chưa có khóa học nào để hiển thị tài liệu.
      </div>
    );
  }

  const hasAccess = canAccessClassroom(session, activeCourseId);
  const embedSrc = toEmbedUrl(activeSlide?.embedUrl || activeSlide?.downloadUrl || '');
  // Only mount iframe when Slide tab is open (faster page, less Canva load)
  const showSlide = hasAccess && contentTab === 'slide' && !!embedSrc;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Class folder tabs */}
      <div className="flex items-end gap-1 px-1 overflow-x-auto" role="tablist" aria-label="Lớp học">
        {courseIds.map((id) => {
          const active = id === activeCourseId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCourseId(id)}
              className={`relative shrink-0 px-5 sm:px-6 py-2.5 text-sm font-bold rounded-t-xl border border-b-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-white text-[#e34e6b] border-slate-200 z-10 -mb-px'
                  : 'bg-[#FFE3E9]/70 text-slate-500 border-transparent hover:text-[#e34e6b] hover:bg-[#FFE3E9]'
              }`}
            >
              {courseLabel(id, courses)}
              {active && (
                <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-[#e34e6b]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Folder panel */}
      <div className="rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white shadow-xs">
        {/* Nested Slide / Resources tabs */}
        <div className="flex items-center gap-1 px-3 sm:px-4 pt-3 pb-0 border-b border-slate-100">
          {([
            { id: 'slide' as const, label: 'Slide' },
            { id: 'resources' as const, label: 'Resources' },
          ]).map((tab) => {
            const active = contentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setContentTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-t-lg border border-b-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#FFE3E9] text-[#e34e6b] border-[#FFC9D4]/80'
                    : 'bg-transparent text-slate-500 border-transparent hover:text-[#e34e6b]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-3 sm:p-5">
          {!hasAccess ? (
            <p className="py-8 text-center text-sm text-slate-600">
              Chưa được cấp quyền xem tài liệu lớp này.
            </p>
          ) : contentTab === 'slide' ? (
            showSlide ? (
              <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-white border border-slate-100">
                <iframe
                  key={`${activeCourseId}-slide`}
                  src={embedSrc}
                  title={activeSlide?.title || 'Slide'}
                  allow="fullscreen"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                Chưa gắn link slide để nhúng.
              </p>
            )
          ) : (
            <ToolsTable sections={toolSections} />
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { FileSpreadsheet, Lock, Menu, Play, Video, X } from 'lucide-react';
import { Course, Recording, UserSession } from '../types';
import { canAccessRecordings } from '../lib/courseAccess';
import {
  isRecordingsCourseLocked,
  recordingsForCourse,
} from '../data/recordingsData';

const RESOURCES_FOCUS_KEY = 'evan_resources_focus';

interface RecordingsViewProps {
  courses: Course[];
  recordings: Recording[];
  courseId: string;
  session?: UserSession;
  onNavigateCourse: (courseId: string) => void;
  onNavigateToResources: (courseId: string) => void;
}

function RecordingList({
  list,
  activeId,
  onSelect,
}: {
  list: Recording[];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="p-3 space-y-1">
      {list.map((rec) => {
        const isCurrent = rec.id === activeId;
        return (
          <button
            key={rec.id}
            type="button"
            onClick={() => onSelect(rec.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
              isCurrent
                ? 'bg-white text-[#e34e6b] font-bold border border-[#FFC9D4] shadow-xs'
                : 'text-slate-700 hover:bg-white border border-transparent'
            }`}
          >
            <div className="flex items-start gap-2">
              <Play
                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  isCurrent ? 'text-[#e34e6b] fill-[#e34e6b]' : 'text-slate-400'
                }`}
              />
              <span className="leading-snug">{rec.titleVi || rec.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export const RecordingsView: React.FC<RecordingsViewProps> = ({
  courses,
  recordings,
  courseId,
  session,
  onNavigateCourse,
  onNavigateToResources,
}) => {
  const courseTabs = useMemo(
    () =>
      courses.filter(
        (c) =>
          c.id === 'ms-2026' ||
          c.id === 're-2026' ||
          recordings.some((r) => r.courseId === c.id)
      ),
    [courses, recordings]
  );

  const activeCourseId = courseTabs.some((c) => c.id === courseId)
    ? courseId
    : courseTabs[0]?.id || courseId;

  const list = useMemo(
    () => recordingsForCourse(recordings, activeCourseId),
    [recordings, activeCourseId]
  );

  const [activeId, setActiveId] = useState(list[0]?.id || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!list.some((r) => r.id === activeId)) {
      setActiveId(list[0]?.id || '');
    }
  }, [list, activeId]);

  const active = list.find((r) => r.id === activeId) || list[0];
  const hasAccess = canAccessRecordings(session, activeCourseId);
  const courseLocked = isRecordingsCourseLocked(activeCourseId);
  const course = courses.find((c) => c.id === activeCourseId);

  const selectRecording = (id: string) => {
    setActiveId(id);
    setMobileMenuOpen(false);
  };

  const goToSlides = () => {
    try {
      sessionStorage.setItem(
        RESOURCES_FOCUS_KEY,
        JSON.stringify({ courseId: activeCourseId, tab: 'slide' })
      );
    } catch (_) {}
    onNavigateToResources(activeCourseId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Video className="w-5 h-5 text-[#e34e6b]" />
          Recordings
        </h1>

        <div className="flex flex-wrap items-end gap-1" role="tablist" aria-label="Lớp recordings">
          {courseTabs.map((c) => {
            const activeTab = c.id === activeCourseId;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={activeTab}
                onClick={() => onNavigateCourse(c.id)}
                className={`relative shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border border-b-0 transition-colors cursor-pointer ${
                  activeTab
                    ? 'bg-white text-[#e34e6b] border-slate-200 z-10 -mb-px'
                    : 'bg-[#FFE3E9]/70 text-slate-500 border-transparent hover:text-[#e34e6b]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {c.id === 'ms-2026'
                    ? 'Money Skills'
                    : c.id === 're-2026'
                    ? 'Real Estate'
                    : c.badge || c.title}
                  {isRecordingsCourseLocked(c.id) ? (
                    <Lock className="w-3.5 h-3.5 opacity-70" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {!hasAccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFE3E9] text-[#e34e6b] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <p className="font-bold text-slate-900">Chưa được cấp quyền xem recordings lớp này</p>
            <p className="text-sm text-slate-600">
              Quyền xem recordings đi theo quyền lớp{' '}
              <strong>{course?.title || activeCourseId}</strong>.
            </p>
          </div>
        ) : courseLocked ? (
          <div className="p-10 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFE3E9] text-[#e34e6b] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <p className="font-bold text-slate-900">Recordings lớp này tạm khóa</p>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Danh sách recordings{' '}
              <strong>{course?.badge || course?.title || 'Money Skills'}</strong> chưa sẵn
              sàng — sẽ mở lại khi bổ sung.
            </p>
          </div>
        ) : list.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">
            Chưa có recording cho lớp này. Thêm trên Sheet tab <strong>recordings</strong> rồi Pull.
          </p>
        ) : (
          <>
            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center gap-2 p-3 border-b border-slate-100 bg-slate-50/80">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#FFE3E9] border border-[#FFC9D4] text-[#e34e6b] rounded-xl text-xs font-bold cursor-pointer"
              >
                <Menu className="w-4 h-4" />
                Danh sách recordings
              </button>
            </div>

            {/* Mobile drawer */}
            {mobileMenuOpen && (
              <div
                className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            <div
              className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-[#e34e6b]" />
                  <span className="text-xs font-bold uppercase text-slate-900">
                    Danh sách recordings
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 border-b border-slate-100">
                <button
                  type="button"
                  onClick={goToSlides}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FFE3E9] border border-[#FFC9D4] text-[#e34e6b] rounded-xl text-xs font-bold cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Xem Slide tài liệu lớp này
                </button>
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-50/60">
                <RecordingList
                  list={list}
                  activeId={active?.id}
                  onSelect={selectRecording}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[420px]">
              {/* Desktop sidebar */}
              <aside className="hidden lg:flex flex-col border-r border-slate-100 bg-slate-50/60 max-h-[640px]">
                <div className="p-3 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={goToSlides}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FFE3E9] border border-slate-200 hover:border-[#e34e6b] text-[#e34e6b] rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    Xem Slide tài liệu lớp này
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <RecordingList
                    list={list}
                    activeId={active?.id}
                    onSelect={selectRecording}
                  />
                </div>
              </aside>

              <div className="p-3 sm:p-5 space-y-3">
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {active?.titleVi || active?.title}
                  </h2>
                  {active?.summary ? (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{active.summary}</p>
                  ) : null}
                </div>

                {active?.videoUrl ? (
                  <div className="video-container shadow-xs border border-slate-200">
                    <iframe
                      key={active.id}
                      src={active.videoUrl}
                      title={active.titleVi || active.title}
                      allow="encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <p className="py-12 text-center text-sm text-slate-500">
                    Chưa có link video embed.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileSpreadsheet,
  Lock,
  Menu,
  Play,
  Video,
  X,
} from 'lucide-react';
import { Course, Recording, UserSession } from '../types';
import { canAccessRecordings } from '../lib/courseAccess';
import {
  isRecordingsCourseLocked,
  recordingsForCourse,
} from '../data/recordingsData';
import {
  chaptersForSession,
  RecordingChapter,
} from '../data/recordingChapters';

const RESOURCES_FOCUS_KEY = 'evan_resources_focus';

declare global {
  interface Window {
    VdoPlayer?: {
      getInstance: (iframe: HTMLIFrameElement) => {
        video: {
          currentTime: number;
          play: () => Promise<void> | void;
        };
      };
    };
  }
}

interface RecordingsViewProps {
  courses: Course[];
  recordings: Recording[];
  courseId: string;
  session?: UserSession;
  onNavigateCourse: (courseId: string) => void;
  onNavigateToResources: (courseId?: string) => void;
}

function loadVdoCipherApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.VdoPlayer) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-vdocipher-api]'
  );
  if (existing) {
    return new Promise((resolve) => {
      if (window.VdoPlayer) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://player.vdocipher.com/v2/api.js';
    script.async = true;
    script.dataset.vdocipherApi = '1';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('VdoCipher API load failed'));
    document.head.appendChild(script);
  });
}

async function seekVdoCipher(
  iframe: HTMLIFrameElement | null,
  seconds: number
): Promise<void> {
  if (!iframe) return;
  try {
    await loadVdoCipherApi();
    const player = window.VdoPlayer?.getInstance(iframe);
    if (!player?.video) return;
    player.video.currentTime = Math.max(0, seconds);
    try {
      await player.video.play();
    } catch {
      /* autoplay may be blocked */
    }
  } catch {
    /* ignore */
  }
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
  const [activeChapterId, setActiveChapterId] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    () => new Set(list.map((r) => r.id))
  );

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    if (!list.some((r) => r.id === activeId)) {
      setActiveId(list[0]?.id || '');
      setActiveChapterId('');
    }
  }, [list, activeId]);

  useEffect(() => {
    setExpandedSessions(new Set(list.map((r) => r.id)));
  }, [activeCourseId]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = list.find((r) => r.id === activeId) || list[0];
  const chapters = useMemo(
    () => (active ? chaptersForSession(active.sessionNumber) : []),
    [active]
  );

  const activeChapter: RecordingChapter | null =
    chapters.find((c) => c.id === activeChapterId) || chapters[0] || null;

  useEffect(() => {
    if (!chapters.length) {
      setActiveChapterId('');
      return;
    }
    if (!chapters.some((c) => c.id === activeChapterId)) {
      setActiveChapterId(chapters[0].id);
    }
  }, [chapters, activeChapterId]);

  const hasAccess = canAccessRecordings(session, activeCourseId);
  const courseLocked = isRecordingsCourseLocked(activeCourseId);
  const course = courses.find((c) => c.id === activeCourseId);

  const applySeek = useCallback(async (seconds: number) => {
    pendingSeekRef.current = seconds;
    await seekVdoCipher(iframeRef.current, seconds);
  }, []);

  const onIframeLoad = useCallback(() => {
    const pending = pendingSeekRef.current;
    if (pending != null) {
      void seekVdoCipher(iframeRef.current, pending);
    }
  }, []);

  const selectRecording = (id: string) => {
    setActiveId(id);
    setActiveChapterId('');
    pendingSeekRef.current = null;
    setMobileMenuOpen(false);
    setExpandedSessions((prev) => new Set(prev).add(id));
  };

  const selectChapter = (rec: Recording, chapter: RecordingChapter) => {
    const switching = rec.id !== activeId;
    setActiveId(rec.id);
    setActiveChapterId(chapter.id);
    setExpandedSessions((prev) => new Set(prev).add(rec.id));
    setMobileMenuOpen(false);
    pendingSeekRef.current = chapter.seconds;
    if (!switching) {
      void applySeek(chapter.seconds);
    }
  };

  const toggleSession = (id: string) => {
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goToSlides = () => {
    try {
      sessionStorage.setItem(
        RESOURCES_FOCUS_KEY,
        JSON.stringify({ courseId: activeCourseId, tab: 'slide' })
      );
    } catch {
      /* ignore */
    }
    onNavigateToResources(activeCourseId);
  };

  const sessionList = (
    <div className="p-3 space-y-2">
      <button
        type="button"
        onClick={goToSlides}
        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FFE3E9] border border-slate-200 hover:border-[#e34e6b] text-[#e34e6b] rounded-xl text-xs font-bold cursor-pointer transition-colors"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Xem Slide tài liệu lớp này
      </button>

      {list.map((rec) => {
        const sessionChapters = chaptersForSession(rec.sessionNumber);
        const expanded = expandedSessions.has(rec.id);
        const isActiveSession = rec.id === active?.id;

        return (
          <div
            key={rec.id}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs"
          >
            <div className="flex items-stretch">
              <button
                type="button"
                onClick={() => selectRecording(rec.id)}
                className={`flex-1 text-left px-3 py-2.5 text-xs font-bold cursor-pointer transition-colors ${
                  isActiveSession
                    ? 'bg-[#FFE3E9]/70 text-[#e34e6b]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Play
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActiveSession
                        ? 'text-[#e34e6b] fill-[#e34e6b]'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="leading-snug">{rec.titleVi || rec.title}</span>
                </span>
              </button>
              {sessionChapters.length > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleSession(rec.id)}
                  className="px-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 cursor-pointer border-l border-slate-100"
                  title={expanded ? 'Thu gọn chapter' : 'Mở chapter'}
                >
                  {expanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              ) : null}
            </div>

            {expanded && sessionChapters.length > 0 ? (
              <div className="border-t border-slate-100 bg-slate-50/80 py-1">
                {sessionChapters.map((ch) => {
                  const isCurrent =
                    isActiveSession && ch.id === activeChapter?.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => selectChapter(rec, ch)}
                      className={`w-full text-left px-3 py-2 text-[11px] leading-snug cursor-pointer transition-colors border-l-4 ${
                        isCurrent
                          ? 'bg-[#FFE3E9]/70 text-[#e34e6b] font-bold border-[#e34e6b]'
                          : 'text-slate-600 hover:bg-white border-transparent'
                      }`}
                    >
                      <span className="block">{ch.title}</span>
                      <span
                        className={`mt-0.5 inline-block text-[10px] font-semibold ${
                          isCurrent ? 'text-[#e34e6b]/80' : 'text-slate-400'
                        }`}
                      >
                        {ch.timestampLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Video className="w-5 h-5 text-[#e34e6b]" />
          Recordings
        </h1>

        <div
          className="flex flex-wrap items-end gap-1"
          role="tablist"
          aria-label="Lớp recordings"
        >
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
            <p className="font-bold text-slate-900">
              Chưa được cấp quyền xem recordings lớp này
            </p>
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
              <strong>{course?.badge || course?.title || 'Money Skills'}</strong>{' '}
              chưa sẵn sàng — sẽ mở lại khi bổ sung.
            </p>
          </div>
        ) : list.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">
            Chưa có recording cho lớp này. Thêm trên Sheet tab{' '}
            <strong>recordings</strong> rồi Pull.
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row min-h-[520px] bg-slate-100/40">
            <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white border-b border-slate-200 sticky top-0 z-30">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#FFE3E9] border border-[#FFC9D4] text-[#e34e6b] rounded-xl text-xs font-bold cursor-pointer"
              >
                <Menu className="w-4 h-4" />
                Danh sách recordings
              </button>
            </div>

            {mobileMenuOpen ? (
              <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            ) : null}

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
              <div className="flex-1 overflow-y-auto">{sessionList}</div>
            </div>

            <aside
              className={`hidden lg:flex flex-col bg-white border-r border-slate-200 shrink-0 transition-all duration-300 ${
                sidebarCollapsed ? 'w-16' : 'w-80 xl:w-96'
              }`}
            >
              <div className="p-3.5 border-b border-slate-200">
                <div className="flex items-center justify-between gap-2">
                  {!sidebarCollapsed ? (
                    <div>
                      <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-[#e34e6b]">
                        Recordings
                      </h2>
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">
                        Buổi học & Chapter
                      </p>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                    title={sidebarCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {!sidebarCollapsed ? (
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
                  {sessionList}
                </div>
              ) : null}
            </aside>

            <main className="flex-1 p-3 sm:p-5 lg:p-6 w-full max-w-5xl mx-auto">
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="min-w-0 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#FFE3E9] text-[#e34e6b] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#FFC9D4]">
                      {active?.titleVi || active?.title}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                    {activeChapter?.title || active?.titleVi || active?.title}
                  </h2>
                </div>

                {active?.videoUrl ? (
                  <div className="video-container shadow-xl border-4 border-white rounded-xl overflow-hidden ring-1 ring-slate-200">
                    <iframe
                      key={active.id}
                      ref={iframeRef}
                      src={active.videoUrl}
                      title={active.titleVi || active.title}
                      allow="encrypted-media; fullscreen"
                      allowFullScreen
                      onLoad={onIframeLoad}
                    />
                  </div>
                ) : (
                  <p className="py-12 text-center text-sm text-slate-500">
                    Chưa có link video embed.
                  </p>
                )}

                {chapters.length > 0 ? (
                  <div className="space-y-4 pt-1">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {chapters.map((ch) => {
                          const isCurrent = ch.id === activeChapter?.id;
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() => selectChapter(active!, ch)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-colors ${
                                isCurrent
                                  ? 'bg-[#e34e6b] text-white border-[#e34e6b]'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#e34e6b] hover:text-[#e34e6b]'
                              }`}
                            >
                              <span className="tabular-nums opacity-90">
                                {ch.timestampLabel}
                              </span>
                              <span className="max-w-[9rem] sm:max-w-[14rem] truncate">
                                {ch.code}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {activeChapter ? (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4 space-y-2">
                        <p className="text-[11px] font-bold text-[#e34e6b] tabular-nums">
                          {activeChapter.timestampLabel} · {activeChapter.code}
                        </p>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {activeChapter.suggestedTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {activeChapter.summary}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  Play, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Menu,
  X
} from 'lucide-react';
import { CourseModule, Lesson, UserProgress } from '../types';

interface SkoolClassroomProps {
  modules: CourseModule[];
  currentLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  progress: UserProgress;
  onToggleComplete: (lessonId: string) => void;
  searchQuery?: string;
}

export const SkoolClassroom: React.FC<SkoolClassroomProps> = ({
  modules,
  currentLesson,
  onSelectLesson,
  progress,
  onToggleComplete,
  searchQuery = '',
}) => {
  // Expanded modules accordion state
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'discussion'>('content');

  const toggleModuleAccordion = (modId: number) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleLessonSelectInternal = (lesson: Lesson) => {
    onSelectLesson(lesson);
    setMobileMenuOpen(false);
  };

  // Calculate total lessons and completed count
  const allLessons = modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const isCompleted = progress.completedLessonIds.includes(currentLesson.id);

  // Get previous and next lessons
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Render Module & Lessons list helper
  const renderModuleList = () => (
    <div className="p-3 space-y-2.5 overflow-y-auto">
      {modules.map((mod) => {
        const isExpanded = expandedModules[mod.id];
        const modLessons = mod.lessons.filter((l) =>
          searchQuery
            ? l.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        );

        if (searchQuery && modLessons.length === 0) return null;

        const completedInMod = mod.lessons.filter((l) =>
          progress.completedLessonIds.includes(l.id)
        ).length;

        return (
          <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            {/* Module Header Toggle */}
            <button
              onClick={() => toggleModuleAccordion(mod.id)}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left cursor-pointer"
            >
              <div className="pr-2">
                <div className="text-[10px] font-extrabold text-[#e34e6b] uppercase tracking-wider">
                  Module {mod.number}
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                  {mod.titleVi}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {completedInMod}/{mod.lessons.length} bài đã hoàn thành
                </div>
              </div>
              <div className="text-slate-400 shrink-0">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Lessons List under Module */}
            {isExpanded && (
              <div className="divide-y divide-slate-100 bg-white">
                {modLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLesson.id;
                  const isDone = progress.completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonSelectInternal(lesson)}
                      className={`flex items-start gap-2.5 p-2.5 text-left cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-[#FFE3E9]/70 text-[#e34e6b] font-bold border-l-4 border-[#e34e6b]'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {/* Checkmark Completion Status Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleComplete(lesson.id);
                        }}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        title={isDone ? 'Đánh dấu chưa học' : 'Đánh dấu đã hoàn thành'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-snug ${isCurrent ? 'font-bold text-[#e34e6b]' : 'font-medium text-slate-800'}`}>
                          {lesson.titleVi}
                        </p>
                      </div>

                      {isCurrent && (
                        <Play className="w-3.5 h-3.5 text-[#e34e6b] fill-[#e34e6b] shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-100 font-sans">
      
      {/* MOBILE TOP BAR (Prioritizes Video + Burger Menu for Mobile) */}
      <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#FFE3E9] hover:bg-[#FFE3E9] border border-[#FFC9D4] text-[#e34e6b] rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Danh sách bài học</span>
        </button>

        {/* Compact Progress Indicator for Mobile */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">Tiến độ:</span>
          <div className="w-16 sm:w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#e34e6b] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-extrabold text-[#e34e6b] text-[11px]">{progressPercent}%</span>
        </div>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE SLIDE-OVER DRAWER (BURGER MENU) */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-[#e34e6b]" />
            <span className="text-xs font-bold uppercase text-slate-900">
              Danh Sách Bài Học
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Progress in Drawer */}
        <div className="p-3 bg-[#FFE3E9]/60 border-b border-[#FFC9D4]/60">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-slate-700 text-[11px]">Tiến độ: {completedCount}/{totalLessons} bài</span>
            <span className="text-[#e34e6b] font-extrabold text-xs">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FFE3E9] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#e34e6b] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {renderModuleList()}
        </div>
      </div>

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 shrink-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80 xl:w-96'
        }`}
      >
        <div className="p-3.5 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-[#e34e6b]">
                  MONEY SKILLS & REAL ESTATE
                </h2>
                <p className="text-xs font-bold text-slate-900 line-clamp-1">
                  Danh Sách Bài Học Video
                </p>
              </div>
            )}
            
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
              title={sidebarCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Compact Progress Bar for Desktop Sidebar */}
          {!sidebarCollapsed && (
            <div className="bg-[#FFE3E9]/60 p-2.5 rounded-xl border border-[#FFC9D4]/80">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 font-bold text-[11px]">Tiến độ: {completedCount}/{totalLessons} bài</span>
                <span className="text-[#e34e6b] font-extrabold text-xs">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#FFE3E9] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#e34e6b] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Accordion Modules & Lessons List */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {renderModuleList()}
          </div>
        )}
      </aside>

      {/* Main Video & Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        
        {/* Lesson Top Header (Bento style) */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#FFE3E9] text-[#e34e6b] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#FFC9D4]">
                  Module {currentLesson.moduleNumber} • Bài {currentLesson.lessonNumber}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Evan Coaching</span>
              </div>
              <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                {currentLesson.titleVi}
              </h1>
            </div>

            {/* Mark as Completed Icon-Only Button */}
            <button
              onClick={() => onToggleComplete(currentLesson.id)}
              title={isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành bài học'}
              className={`p-2.5 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>

          {/* VdoCipher Video Player Embed */}
          <div className="video-container shadow-xl border-4 border-white rounded-xl overflow-hidden">
            <iframe
              src={currentLesson.videoUrl}
              title={currentLesson.titleVi}
              allow="encrypted-media"
              allowFullScreen
            />
          </div>

          {/* Navigation Controls: Previous / Next Lesson */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            {prevLesson ? (
              <button
                onClick={() => handleLessonSelectInternal(prevLesson)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Bài trước:</span> {prevLesson.titleVi.slice(0, 18)}...
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => handleLessonSelectInternal(nextLesson)}
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#e34e6b] hover:bg-[#cf3c5a] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Bài tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>
        </div>

        {/* Tab Selection Bar under Video */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'content'
                  ? 'border-[#e34e6b] text-[#e34e6b] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#e34e6b]" />
              <span>Nội Dung Bài Học</span>
            </button>

            <button
              onClick={() => setActiveTab('discussion')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'discussion'
                  ? 'border-[#e34e6b] text-[#e34e6b] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#e34e6b]" />
              <span>Group Chat</span>
            </button>
          </div>

          <div className="p-4 sm:p-6">
            
            {activeTab === 'content' && (
              <div className="space-y-6 text-slate-800">
                
                <div className="p-4 bg-[#FFE3E9]/50 border border-[#FFC9D4]/80 rounded-2xl space-y-1.5">
                  <h3 className="flex items-center gap-2 font-semibold text-[#e34e6b] text-xs sm:text-sm">
                    <Info className="w-4 h-4 shrink-0 text-[#e34e6b]" />
                    <span>Tóm Tắt Bài Học</span>
                  </h3>
                  <p className="leading-relaxed text-slate-700 text-xs sm:text-sm">
                    {currentLesson.descriptionVi}
                  </p>
                </div>

                {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#e34e6b]" />
                      <span>Kiến Thức Cốt Lõi Cần Ghi Nhớ (Key Takeaways)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {currentLesson.keyTakeaways.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-2xs">
                          <span className="w-5 h-5 rounded-full bg-[#FFE3E9] text-[#e34e6b] font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#FFC9D4]">
                            {idx + 1}
                          </span>
                          <span className="text-slate-700 font-normal text-xs sm:text-sm leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-4">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Cần giải đáp? Vào Group Chat với Coach Evan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Học viên đặt câu hỏi trong group chat — Coach Evan sẽ trả lời trực tiếp.
                  </p>
                  <a
                    href="https://m.me/ch/Aba4LTCCSCBCHipV/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Vào Group Chat
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Users, 
  Search, 
  LogOut, 
  ChevronDown, 
  LayoutGrid, 
  Check,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Course, UserSession } from '../types';
import { canAccessClassroom, classroomPathFor, overviewPathFor } from '../lib/courseAccess';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  courses: Course[];
  selectedCourse: Course;
  onSelectCourse: (course: Course, targetPath: string) => void;
  session: UserSession | null;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  courses,
  selectedCourse,
  onSelectCourse,
  session,
  onLogout,
  searchQuery,
  setSearchQuery,
}) => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isOverview = currentPath.startsWith('/overview');
  const isClassroom = currentPath.startsWith('/classroom');
  const canOpenSelectedClassroom = canAccessClassroom(session, selectedCourse.id);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand Image & Site Title */}
          <div 
            className="flex items-center gap-2.5 shrink-0 cursor-pointer" 
            onClick={() => onNavigate('/classes')}
            title="Evan Coaching Academy"
          >
            <img 
              src="https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/65b87c64ad18fe059fe9ffaf_Logo.png" 
              alt="Evan Coaching" 
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight hidden xs:inline">
              <span className="text-[#e34e6b]">Academy</span>
            </span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài học..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 text-xs sm:text-sm rounded-full border border-slate-300 focus:border-[#e34e6b] focus:outline-hidden transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation Tabs (Khóa học -> Lớp học -> Tài liệu -> Admin) */}
          <nav className="hidden md:flex items-center gap-1.5">
            
            {/* Courses Dropdown Menu -> /classes */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  currentPath === '/classes' || isOverview
                    ? 'bg-slate-100 text-[#e34e6b] border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-[#e34e6b]" />
                <span>Khóa học</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Submenu Popover */}
              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 space-y-1">
                  
                  {/* Option: View All Courses Catalog (/classes) */}
                  <button
                    onClick={() => {
                      onNavigate('/classes');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer border-b border-slate-100 mb-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Tất Cả Khóa Học (/classes)</div>
                        <div className="text-[10px] text-slate-500">Xem danh mục các khóa học</div>
                      </div>
                    </div>
                  </button>

                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider px-2.5 py-1">
                    Chọn khóa học:
                  </div>

                  {courses.map((course) => {
                    const isSelected =
                      selectedCourse.id === course.id && isOverview;

                    return (
                      <button
                        key={course.id}
                        onClick={() => {
                          onSelectCourse(course, overviewPathFor(course));
                          setCoursesDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFE3E9]/80 text-[#e34e6b] font-medium border border-[#FFC9D4]'
                            : 'hover:bg-slate-50 text-slate-700 font-normal'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                          />
                          <div>
                            <div className="text-xs font-medium text-slate-900 leading-snug">
                              {course.title}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {course.totalLessons} bài video • {course.totalModules} module
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-[#e34e6b] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Lớp Học -> /classroom/:slug (chỉ khi có quyền) */}
            <button
              onClick={() => {
                if (canOpenSelectedClassroom) {
                  onNavigate(classroomPathFor(selectedCourse));
                } else {
                  onNavigate(overviewPathFor(selectedCourse));
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isClassroom
                  ? 'bg-slate-100 text-[#e34e6b] border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={
                canOpenSelectedClassroom
                  ? `Vào classroom ${selectedCourse.title}`
                  : 'Chưa có quyền classroom — mở Overview'
              }
            >
              <BookOpen className="w-4 h-4" />
              <span>Lớp học</span>
            </button>

            {/* Tài Liệu -> /resources */}
            <button
              onClick={() => onNavigate('/resources')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                currentPath === '/resources'
                  ? 'bg-slate-100 text-[#e34e6b] border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Tài liệu</span>
            </button>

            {/* Admin -> /dashboard */}
            {session?.isAdmin && (
              <button
                onClick={() => onNavigate('/dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  currentPath === '/dashboard'
                    ? 'bg-slate-100 text-[#e34e6b] border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Session Info & Logout */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="hidden xl:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1">
                      <span>{session.fullName}</span>
                      {session.isAdmin && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#e34e6b]" title="Admin System" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                      {session.email}
                    </div>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#FFE3E9] text-[#e34e6b] flex items-center justify-center font-extrabold text-xs border border-[#FFE3E9] shrink-0">
                  {session.fullName.slice(0, 2).toUpperCase()}
                </div>

                <button
                  onClick={onLogout}
                  title="Đăng xuất khỏi tài khoản"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : null}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài học..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-800 text-xs rounded-xl border border-slate-300 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('/classes');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                currentPath === '/classes' ? 'bg-[#FFE3E9] text-[#e34e6b]' : 'text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Khóa học (/classes)</span>
            </button>

            <button
              onClick={() => {
                if (canOpenSelectedClassroom) {
                  onNavigate(classroomPathFor(selectedCourse));
                } else {
                  onNavigate(overviewPathFor(selectedCourse));
                }
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                isClassroom ? 'bg-[#FFE3E9] text-[#e34e6b]' : 'text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lớp học ({canOpenSelectedClassroom ? 'có quyền' : 'khóa'})</span>
            </button>

            <button
              onClick={() => {
                onNavigate('/resources');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                currentPath === '/resources' ? 'bg-[#FFE3E9] text-[#e34e6b]' : 'text-slate-700'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Tài liệu (/resources)</span>
            </button>

            {session?.isAdmin && (
              <button
                onClick={() => {
                  onNavigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                  currentPath === '/dashboard' ? 'bg-[#FFE3E9] text-[#e34e6b]' : 'text-slate-700'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Admin (/dashboard)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CourseCatalog } from './components/CourseCatalog';
import { SkoolClassroom } from './components/SkoolClassroom';
import { CourseOverview } from './components/CourseOverview';
import { ResourcesList } from './components/ResourcesList';
import { AdminSheetManager } from './components/AdminSheetManager';
import { LoginPage } from './components/LoginPage';
import { Lock } from 'lucide-react';

import { ALL_COURSES } from './data/coursesData';
import { INITIAL_STUDENTS } from './data/initialStudents';
import { Lesson, Student, UserProgress, UserSession, Course } from './types';
import { mergeLessonsIntoCourses, syncViaAppsScriptWebhook } from './lib/googleSheetsService';
import { formatJoinDate, migrateStudent, upsertStudentsRoster } from './lib/studentUtils';
import { getWebhookUrl } from './lib/syncConfig';
import {
  canAccessClassroom,
  classroomPathFor,
  normalizeCourseIds,
  overviewPathFor,
  parseAppPath,
} from './lib/courseAccess';

const STUDENTS_KEY = 'evan_coaching_students';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('evan_coaching_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('evan_coaching_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return ALL_COURSES;
  });

  const [selectedCourse, setSelectedCourse] = useState<Course>(() => {
    const saved = localStorage.getItem('evan_coaching_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      } catch (e) {}
    }
    return ALL_COURSES[0];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STUDENTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: Partial<Student>) => migrateStudent(s));
        }
      } catch (e) {}
    }
    return INITIAL_STUDENTS;
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('evan_coaching_progress');
    return saved
      ? JSON.parse(saved)
      : {
          completedLessonIds: ['ms-1-0'],
          lessonNotes: {},
        };
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseAppPath(window.location.pathname).path;
    }
    return '/login';
  });

  const navigate = useCallback((toPath: string, replace = false) => {
    const { path } = parseAppPath(toPath);
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(parseAppPath(window.location.pathname).path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep selectedCourse in sync with URL course slug
  useEffect(() => {
    const { route } = parseAppPath(currentPath);
    if (route.kind === 'overview' || route.kind === 'classroom') {
      const found = courses.find((c) => c.id === route.courseId);
      if (found && found.id !== selectedCourse.id) {
        setSelectedCourse(found);
      }
    }
  }, [currentPath, courses, selectedCourse.id]);

  const [currentLesson, setCurrentLesson] = useState<Lesson>(() => {
    return courses[0]?.modules[0]?.lessons[0] || ALL_COURSES[0].modules[0].lessons[0];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (session) {
      localStorage.setItem('evan_coaching_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('evan_coaching_session');
    }
  }, [session]);

  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }, [students]);

  // Cross-tab sync so admin dashboard sees new pending registrations
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STUDENTS_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          setStudents(parsed.map((s: Partial<Student>) => migrateStudent(s)));
        }
      } catch (err) {}
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Refresh roster when returning to admin tab
  useEffect(() => {
    const onFocus = () => {
      try {
        const saved = localStorage.getItem(STUDENTS_KEY);
        if (!saved) return;
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setStudents(parsed.map((s: Partial<Student>) => migrateStudent(s)));
        }
      } catch (err) {}
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  useEffect(() => {
    localStorage.setItem('evan_coaching_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('evan_coaching_progress', JSON.stringify(progress));
  }, [progress]);

  // Auth + classroom access guards
  useEffect(() => {
    const { route } = parseAppPath(currentPath);

    if (!session && route.kind !== 'login') {
      navigate('/login', true);
      return;
    }

    if (session && route.kind === 'login') {
      navigate(session.isAdmin ? '/dashboard' : '/classes', true);
      return;
    }

    if (session && route.kind === 'dashboard' && !session.isAdmin) {
      navigate('/classes', true);
      return;
    }

    if (session && route.kind === 'classroom') {
      if (!canAccessClassroom(session, route.courseId)) {
        navigate(overviewPathFor(route.courseId), true);
      }
    }
  }, [session, currentPath, navigate]);

  useEffect(() => {
    if (selectedCourse && selectedCourse.modules[0]?.lessons[0]) {
      const belongs = selectedCourse.modules.some((m) =>
        m.lessons.some((l) => l.id === currentLesson?.id)
      );
      if (!belongs) {
        setCurrentLesson(selectedCourse.modules[0].lessons[0]);
      }
    }
  }, [selectedCourse, currentLesson]);

  const handleToggleComplete = (lessonId: string) => {
    setProgress((prev) => {
      const isDone = prev.completedLessonIds.includes(lessonId);
      const updated = isDone
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return {
        ...prev,
        completedLessonIds: updated,
      };
    });
  };

  const handleAddStudent = (
    email: string,
    fullName: string,
    role: 'admin' | 'user',
    allowedCourseIds: string[]
  ) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      email,
      fullName,
      status: 'active',
      role,
      accessLevel: 'full',
      allowedCourseIds: normalizeCourseIds(allowedCourseIds),
      dateApproved: formatJoinDate(),
      lastActive: 'Vừa mới tạo',
    };
    setStudents((prev) => {
      const next = [newStudent, ...prev];
      void pushStudentsToWebhook(next);
      return next;
    });
  };

  const handleToggleCoursePermission = (studentId: string, courseId: string) => {
    setStudents((prev) => {
      const next = prev.map((s) => {
        if (s.id !== studentId) return s;
        const currentAllowed = normalizeCourseIds(s.allowedCourseIds || []);
        const exists = currentAllowed.includes(courseId);
        const updated = exists
          ? currentAllowed.filter((id) => id !== courseId)
          : [...currentAllowed, courseId];
        return { ...s, allowedCourseIds: updated };
      });
      void pushStudentsToWebhook(next);
      return next;
    });
  };

  const pushStudentsToWebhook = async (roster: Student[]) => {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) return;
    const allLessons = courses.flatMap((course) =>
      course.modules.flatMap((mod) =>
        mod.lessons.map((l) => ({
          ...l,
          courseId: course.id,
          courseTitle: course.title,
          moduleTitle: mod.titleVi,
        }))
      )
    );
    await syncViaAppsScriptWebhook(webhookUrl, 'push', {
      students: roster,
      lessons: allLessons,
    });
  };

  const handleUpdateStudentStatus = (id: string, status: 'active' | 'pending' | 'blocked') => {
    setStudents((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, status } : s));
      void pushStudentsToWebhook(next);
      return next;
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => {
      const next = prev.filter((s) => s.id !== id);
      void pushStudentsToWebhook(next);
      return next;
    });
  };

  /** Upsert by email — updates existing rows so Pull syncs pending/status/courses */
  const handleImportStudents = (imported: Partial<Student>[]) => {
    setStudents((prev) => upsertStudentsRoster(prev, imported));
  };

  const refreshStudentsFromSheet = async (): Promise<Student[]> => {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) return students;

    const res = await syncViaAppsScriptWebhook(webhookUrl, 'pull');
    if (!res.success || !res.data?.students || res.data.students.length === 0) {
      return students;
    }
    const next = upsertStudentsRoster(students, res.data.students);
    setStudents(next);
    return next;
  };

  const handleImportLessons = (importedLessons: any[]) => {
    if (!importedLessons || importedLessons.length === 0) return;

    setCourses((prevCourses) => {
      const merged = mergeLessonsIntoCourses(prevCourses, importedLessons);
      setSelectedCourse((prevSelected) => {
        const found = merged.find((c) => c.id === prevSelected.id);
        return found || merged[0];
      });
      return merged;
    });
  };

  const handleRegisterStudent = (newStudent: Student) => {
    const normalized = migrateStudent({
      ...newStudent,
      allowedCourseIds: normalizeCourseIds(newStudent.allowedCourseIds),
    });
    setStudents((prev) => {
      const next = [normalized, ...prev.filter((s) => s.email.toLowerCase() !== normalized.email)];
      void pushStudentsToWebhook(next);
      return next;
    });
  };

  const handleLogout = () => {
    setSession(null);
    navigate('/login');
  };

  const handleSelectCourse = (course: Course, targetPathOrTab: string) => {
    setSelectedCourse(course);
    if (targetPathOrTab === 'overview' || targetPathOrTab === '/overview') {
      navigate(overviewPathFor(course));
      return;
    }
    if (targetPathOrTab === 'classroom' || targetPathOrTab === '/classroom') {
      navigate(classroomPathFor(course));
      return;
    }
    if (targetPathOrTab.startsWith('/')) {
      navigate(targetPathOrTab);
    } else {
      navigate('/' + targetPathOrTab);
    }
  };

  const { route } = parseAppPath(currentPath);
  const routeCourse =
    route.kind === 'overview' || route.kind === 'classroom'
      ? courses.find((c) => c.id === route.courseId) || selectedCourse
      : selectedCourse;

  if (!session || route.kind === 'login') {
    return (
      <LoginPage
        students={students}
        onLoginSuccess={(newSession) => {
          const hydrated: UserSession = {
            ...newSession,
            allowedCourseIds: normalizeCourseIds(newSession.allowedCourseIds ?? []),
          };
          setSession(hydrated);
          navigate(hydrated.isAdmin ? '/dashboard' : '/classes');
        }}
        onRegisterStudent={handleRegisterStudent}
        onRefreshRoster={refreshStudentsFromSheet}
      />
    );
  }

  const hasClassroomAccess = canAccessClassroom(session, routeCourse.id);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        courses={courses}
        selectedCourse={routeCourse}
        onSelectCourse={handleSelectCourse}
        session={session}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {route.kind === 'classes' && (
          <CourseCatalog
            courses={courses}
            activeCourseId={routeCourse.id}
            onSelectCourse={handleSelectCourse}
            session={session}
          />
        )}

        {route.kind === 'overview' && (
          <CourseOverview
            course={routeCourse}
            hasClassroomAccess={hasClassroomAccess}
            onStartCourse={() => {
              if (hasClassroomAccess) {
                navigate(classroomPathFor(routeCourse));
              }
            }}
          />
        )}

        {route.kind === 'classroom' && hasClassroomAccess && (
          <SkoolClassroom
            modules={routeCourse.modules}
            currentLesson={currentLesson}
            onSelectLesson={(lesson) => setCurrentLesson(lesson)}
            progress={progress}
            onToggleComplete={handleToggleComplete}
            searchQuery={searchQuery}
          />
        )}

        {route.kind === 'classroom' && !hasClassroomAccess && (
          <div className="max-w-xl mx-auto px-4 py-16">
            <div className="bg-white border border-[#FFC9D4] rounded-3xl p-8 text-center space-y-4 shadow-xs">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFE3E9] text-[#e34e6b] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Chưa được cấp quyền lớp học</h2>
              <p className="text-sm text-slate-600">
                Tài khoản của bạn chưa được mở quyền xem video lớp{' '}
                <strong>{routeCourse.title}</strong>. Bạn vẫn có thể xem trang Overview. Liên hệ Admin /
                Coach Evan để được duyệt đăng ký lớp này.
              </p>
              <button
                onClick={() => navigate(overviewPathFor(routeCourse))}
                className="px-4 py-2.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white text-sm font-bold rounded-xl cursor-pointer"
              >
                Về trang Overview
              </button>
            </div>
          </div>
        )}

        {route.kind === 'resources' && (
          <ResourcesList courses={courses} session={session} />
        )}

        {route.kind === 'dashboard' && session?.isAdmin && (
          <AdminSheetManager
            courses={courses}
            students={students}
            onAddStudent={handleAddStudent}
            onUpdateStatus={handleUpdateStudentStatus}
            onToggleCoursePermission={handleToggleCoursePermission}
            onDeleteStudent={handleDeleteStudent}
            onImportStudents={handleImportStudents}
            onImportLessons={handleImportLessons}
          />
        )}
      </main>
    </div>
  );
}

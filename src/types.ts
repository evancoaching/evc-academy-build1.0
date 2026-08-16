export interface Lesson {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  moduleNumber: number;
  lessonNumber: number;
  videoUrl: string;
  summary: string;
  descriptionVi: string;
  keyTakeaways?: string[];
  actionSteps?: string[];
  resources?: {
    title: string;
    type: 'pdf' | 'excel' | 'link';
    url: string;
  }[];
}

export interface CourseModule {
  id: number;
  number: number;
  title: string;
  titleVi: string;
  description: string;
  lessons: Lesson[];
}

export interface Student {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  status: 'active' | 'pending' | 'blocked';
  /** Admin or User permission */
  role: 'admin' | 'user';
  /** @deprecated Prefer role; kept for sheet/module gating compat */
  accessLevel: 'full' | 'module1_only';
  allowedCourseIds?: string[]; // Array of course IDs like ['ms-2026', 're-2026']
  /** Join date — display as mm/dd/yyyy */
  dateApproved: string;
  lastActive?: string;
  notes?: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  lastVisitedLessonId?: string;
  lessonNotes: Record<string, string>; // lessonId -> note string
}

export interface CourseWeek {
  week: number;
  title: string;
  points: string[];
}

export interface Course {
  id: string;
  title: string;
  titleVi: string;
  badge: string;
  category: string;
  level: string;
  description: string;
  /** 4 buổi chính — copy từ website gốc */
  weeks?: CourseWeek[];
  /** Format học (Zoom / lịch) từ website */
  formatNote?: string;
  thumbnailUrl?: string;
  externalUrl?: string;
  totalLessons: number;
  totalModules: number;
  durationHours: string;
  modules: CourseModule[];
}

export interface UserSession {
  email: string;
  fullName: string;
  isAdmin: boolean;
  accessLevel: 'full' | 'module1_only';
  allowedCourseIds?: string[];
}

/** Zoom / live-session recordings (Sheet tab: recordings) */
export interface Recording {
  id: string;
  courseId: string;
  /** 1-based order within course */
  sessionNumber: number;
  title: string;
  titleVi: string;
  videoUrl: string;
  summary?: string;
  recordedAt?: string;
}

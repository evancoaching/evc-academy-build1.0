import { Course, UserSession } from '../types';

export const COURSE_SLUG_BY_ID: Record<string, string> = {
  'ms-2026': 'moneyskills',
  're-2026': 'realestate',
};

export const COURSE_ID_BY_SLUG: Record<string, string> = {
  moneyskills: 'ms-2026',
  'money-skills': 'ms-2026',
  ms: 'ms-2026',
  'ms-2026': 'ms-2026',
  realestate: 're-2026',
  'real-estate': 're-2026',
  re: 're-2026',
  're-2026': 're-2026',
};

/** Classroom lesson videos locked for students until after this date (admin exempt). */
export const CLASSROOM_LESSONS_UNLOCK_AT = new Date('2026-08-26T00:00:00+07:00');

export function courseSlugFromId(courseId: string): string {
  return COURSE_SLUG_BY_ID[courseId] || courseId;
}

export function courseIdFromSlug(slug: string): string | null {
  const key = slug.trim().toLowerCase();
  return COURSE_ID_BY_SLUG[key] || null;
}

/** Normalize sheet/UI course tokens into canonical ids like ms-2026 */
export function normalizeCourseIds(raw?: string[] | string | null): string[] {
  if (!raw) return [];
  const parts = Array.isArray(raw)
    ? raw
    : String(raw).split(/[;,|]/).map((s) => s.trim()).filter(Boolean);

  const ids = new Set<string>();
  for (const part of parts) {
    const lower = part.toLowerCase();
    if (COURSE_ID_BY_SLUG[lower]) {
      ids.add(COURSE_ID_BY_SLUG[lower]);
      continue;
    }
    if (lower.includes('money') || lower.includes('ms-2026') || lower.includes('tín dụng') || lower.includes('tin dung')) {
      ids.add('ms-2026');
      continue;
    }
    if (lower.includes('real') || lower.includes('estate') || lower.includes('re-2026') || lower.includes('bất động') || lower.includes('bat dong')) {
      ids.add('re-2026');
      continue;
    }
    if (part === 'ms-2026' || part === 're-2026') ids.add(part);
  }
  return Array.from(ids);
}

export function canAccessClassroom(
  session: UserSession | null | undefined,
  courseId: string
): boolean {
  if (!session) return false;
  if (session.isAdmin) return true;
  return (session.allowedCourseIds || []).includes(courseId);
}

/** Same course gate as classroom / resources */
export function canAccessRecordings(
  session: UserSession | null | undefined,
  courseId: string
): boolean {
  return canAccessClassroom(session, courseId);
}

/** Students cannot open lesson classroom until unlock date; admin always can. */
export function isClassroomLessonsLockedFor(
  session: UserSession | null | undefined
): boolean {
  if (!session) return true;
  if (session.isAdmin) return false;
  return Date.now() < CLASSROOM_LESSONS_UNLOCK_AT.getTime();
}

export function overviewPathFor(course: Course | string): string {
  const id = typeof course === 'string' ? course : course.id;
  return `/overview/${courseSlugFromId(id)}`;
}

export function classroomPathFor(course: Course | string): string {
  const id = typeof course === 'string' ? course : course.id;
  return `/classroom/${courseSlugFromId(id)}`;
}

export function recordingsPathFor(course: Course | string): string {
  const id = typeof course === 'string' ? course : course.id;
  return `/recordings/${courseSlugFromId(id)}`;
}

export type AppRoute =
  | { kind: 'login' }
  | { kind: 'classes' }
  | { kind: 'resources' }
  | { kind: 'dashboard' }
  | { kind: 'overview'; courseId: string; slug: string }
  | { kind: 'classroom'; courseId: string; slug: string }
  | { kind: 'recordings'; courseId: string; slug: string }
  | { kind: 'unknown'; path: string };

export function parseAppPath(pathname: string): { path: string; route: AppRoute } {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/login') {
    return { path: '/login', route: { kind: 'login' } };
  }
  if (clean === '/classes' || clean === '/courses') {
    return { path: '/classes', route: { kind: 'classes' } };
  }
  if (clean === '/resources') {
    return { path: '/resources', route: { kind: 'resources' } };
  }
  if (clean === '/dashboard' || clean === '/admin') {
    return { path: '/dashboard', route: { kind: 'dashboard' } };
  }

  const overviewMatch = clean.match(/^\/overview(?:\/([^/]+))?$/i);
  if (overviewMatch) {
    const slug = (overviewMatch[1] || 'moneyskills').toLowerCase();
    const courseId = courseIdFromSlug(slug) || 'ms-2026';
    const canonical = `/overview/${courseSlugFromId(courseId)}`;
    return { path: canonical, route: { kind: 'overview', courseId, slug: courseSlugFromId(courseId) } };
  }

  const classroomMatch = clean.match(/^\/classroom(?:\/([^/]+))?$/i);
  if (classroomMatch) {
    const slug = (classroomMatch[1] || 'moneyskills').toLowerCase();
    const courseId = courseIdFromSlug(slug) || 'ms-2026';
    const canonical = `/classroom/${courseSlugFromId(courseId)}`;
    return { path: canonical, route: { kind: 'classroom', courseId, slug: courseSlugFromId(courseId) } };
  }

  const recordingsMatch = clean.match(/^\/recordings(?:\/([^/]+))?$/i);
  if (recordingsMatch) {
    // Default RE while MS recordings are temporarily locked
    const slug = (recordingsMatch[1] || 'realestate').toLowerCase();
    const courseId = courseIdFromSlug(slug) || 're-2026';
    const canonical = `/recordings/${courseSlugFromId(courseId)}`;
    return { path: canonical, route: { kind: 'recordings', courseId, slug: courseSlugFromId(courseId) } };
  }

  return { path: clean, route: { kind: 'unknown', path: clean } };
}

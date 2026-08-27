import { Recording } from '../types';

/** Lớp tạm khóa recordings (chưa có danh sách). */
export const RECORDINGS_LOCKED_COURSE_IDS = new Set<string>(['ms-2026']);

function extractEmbedSrc(htmlOrUrl: string): string {
  const raw = (htmlOrUrl || '').trim();
  const m = raw.match(/src=["']([^"']+)["']/i);
  if (m?.[1]) return m[1].trim();
  return raw;
}

/** Real Estate Class July — từ rel-rec.csv (không gồm Testimonial). */
export const INITIAL_RECORDINGS: Recording[] = [
  {
    id: 're-rec-1',
    courseId: 're-2026',
    sessionNumber: 1,
    title: 'Real Estate Class July - Buổi 1',
    titleVi: 'Real Estate Class July - Buổi 1',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE32325fwbTNuORPpaTUFwI97LC8eiHXv8q1z97o4dyIWS0NTLt&playbackInfo=eyJ2aWRlb0lkIjoiM2U3YTcwNWNhOWZkNDkyOGE0ZWMxOTFiZDYxN2M2NTkifQ=='
    ),
    summary: '',
    recordedAt: '',
  },
  {
    id: 're-rec-2',
    courseId: 're-2026',
    sessionNumber: 2,
    title: 'Real Estate Class July - Buổi 2',
    titleVi: 'Real Estate Class July - Buổi 2',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232yqF3uRQUi2PXfNxQxzDB80oFw0h1v5nLeyWogehxfcSQO&playbackInfo=eyJ2aWRlb0lkIjoiYTUyYjc1NWRkNTY0NDQzZmFjMzJjOTBhOWE4OGM0ODMifQ=='
    ),
    summary: '',
    recordedAt: '',
  },
  {
    id: 're-rec-3',
    courseId: 're-2026',
    sessionNumber: 3,
    title: 'Real Estate Class July - Buổi 3',
    titleVi: 'Real Estate Class July - Buổi 3',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE323259cuBf2GogVJilsexwbtnH6YVcBDpMzPtiI5RDoBvtx90&playbackInfo=eyJ2aWRlb0lkIjoiOGJlMTJmOTY4NDY0NDY0M2IwNTE2OWQ3NjI4YTQxMmYifQ=='
    ),
    summary: '',
    recordedAt: '',
  },
  {
    id: 're-rec-4',
    courseId: 're-2026',
    sessionNumber: 4,
    title: 'Real Estate Class July - Buổi 4',
    titleVi: 'Real Estate Class July - Buổi 4',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232lf3x8T9IbKsHEM6jth2vCjLG8MRnuenWK09S6CXZLxkBA&playbackInfo=eyJ2aWRlb0lkIjoiZWNiODljMDYzNTgxNGMxNWEyYmVmNWM4ZTI2ODk1ZWYifQ=='
    ),
    summary: '',
    recordedAt: '',
  },
];

/** Drop locked courses + refresh RE seed from code (ignore stale localStorage seeds). */
export function hydrateRecordingsList(saved?: Recording[] | null): Recording[] {
  const fromCode = [...INITIAL_RECORDINGS];
  const codeCourseIds = new Set(fromCode.map((r) => r.courseId));

  const extras = (saved || []).filter(
    (r) =>
      r?.courseId &&
      !RECORDINGS_LOCKED_COURSE_IDS.has(r.courseId) &&
      !codeCourseIds.has(r.courseId) &&
      r.videoUrl
  );

  return [...fromCode, ...extras].filter(
    (r) => !RECORDINGS_LOCKED_COURSE_IDS.has(r.courseId)
  );
}

export function isRecordingsCourseLocked(courseId: string): boolean {
  return RECORDINGS_LOCKED_COURSE_IDS.has(courseId);
}

export function recordingsForCourse(
  recordings: Recording[],
  courseId: string
): Recording[] {
  return recordings
    .filter((r) => r.courseId === courseId)
    .sort((a, b) => a.sessionNumber - b.sessionNumber);
}

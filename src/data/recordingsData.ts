import { Recording } from '../types';

/** Lớp tạm khóa recordings (chưa có danh sách). */
export const RECORDINGS_LOCKED_COURSE_IDS = new Set<string>(['ms-2026']);

function extractEmbedSrc(htmlOrUrl: string): string {
  const raw = (htmlOrUrl || '').trim();
  const m = raw.match(/src=["']([^"']+)["']/i);
  if (m?.[1]) return m[1].trim();
  return raw;
}

/** Real Estate Class July — từ rel-rec.csv */
export const INITIAL_RECORDINGS: Recording[] = [
  {
    id: 're-rec-1',
    courseId: 're-2026',
    sessionNumber: 1,
    title: 'Real Estate Class July - Buổi 1',
    titleVi: 'Real Estate Class July - Buổi 1',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE32325uBXrOqR7gjQEDF9uRkMBw7cqLN8IVa0kKIqXMQGpdTgO&playbackInfo=eyJ2aWRlb0lkIjoiZDYwZjZmMjFiNDliNGEwMmJjZmMwMzFhMGViYWQzNTYifQ=='
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
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232dsxIQXZEu16qthhNqhmm83qUZDLttcKKdMlZthEHzeENz&playbackInfo=eyJ2aWRlb0lkIjoiYTkyNzlhYzg0NjVlNDE1ZjkwMzBiNzJlMGEzODhhOGUifQ=='
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
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232xBuJm9nCUVvMPXIVK57OIKkehAt0LibWJglNWH0WzSoop&playbackInfo=eyJ2aWRlb0lkIjoiM2JiM2FhZjEyY2EyNGNhYWJmMjM0ZmVjZmEyNjI2MjMifQ=='
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
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232RAHlOqdEN5I2lDKzk7Yy6Qj11mfMurakCEuF3snPLp6Xz&playbackInfo=eyJ2aWRlb0lkIjoiNGVhNDM5M2I1Zjg2NDQ5ZmFjYTM4NTVlNTIyZWFiZjIifQ=='
    ),
    summary: '',
    recordedAt: '',
  },
  {
    id: 're-rec-5',
    courseId: 're-2026',
    sessionNumber: 5,
    title: 'Real Estate Class July - Testimonial',
    titleVi: 'Real Estate Class July - Testimonial',
    videoUrl: extractEmbedSrc(
      'https://player.vdocipher.com/v2/?otp=20160313versASE3232q12VbFvkUpoB1sCEZfmstVRhzSOhOJ4vpFgRTjMTMKCjr&playbackInfo=eyJ2aWRlb0lkIjoiYjhmZTk4ZDg4OGY0NGMxOWI2YTNhMjc1ZDA4ODkwN2YifQ=='
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

/**
 * Course-level slide decks shown on the Tài liệu tab.
 * Prefer embed-friendly sources (PDF Drive preview, Google Slides, Canva embed).
 */
export interface CourseSlide {
  courseId: string;
  title: string;
  description: string;
  /** iframe src — Drive/PDF preview, Google Slides embed, or Canva embed */
  embedUrl: string;
  /** Direct download or open-in-new-tab URL */
  downloadUrl: string;
  /** Optional: pdf | slides | canva | link */
  format?: 'pdf' | 'slides' | 'canva' | 'link';
}

const MS_CANVA =
  'https://www.canva.com/design/DAHRdMUKiYs/klCzcKTdBuV0n6hFyrXCAg/view';
const RE_CANVA =
  'https://www.canva.com/design/DAHOV8ie5X0/B_5X68-_SWTOWnWKXimaAw/view';

export const COURSE_SLIDES: CourseSlide[] = [
  {
    courseId: 'ms-2026',
    title: 'Slide Tài Liệu — Money Skills',
    description: '',
    embedUrl: MS_CANVA,
    downloadUrl: MS_CANVA,
    format: 'canva',
  },
  {
    courseId: 're-2026',
    title: 'Slide Tài Liệu — Real Estate',
    description: '',
    embedUrl: RE_CANVA,
    downloadUrl: RE_CANVA,
    format: 'canva',
  },
];

/** Convert common share links into iframe-friendly preview URLs when possible. */
export function toEmbedUrl(url: string): string {
  if (!url) return '';
  // Strip page hash (#1, #2, …) — not usable as iframe src
  const trimmed = url.trim().replace(/#.*$/, '');

  // Google Drive file → preview
  const driveFile = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFile?.[1]) {
    return `https://drive.google.com/file/d/${driveFile[1]}/preview`;
  }

  // Google Docs / Slides → embed
  const slidesId = trimmed.match(/docs\.google\.com\/presentation\/d\/([^/]+)/);
  if (slidesId?.[1]) {
    return `https://docs.google.com/presentation/d/${slidesId[1]}/embed?start=false&loop=false&delayms=3000`;
  }

  // Canva design view → embed (keeps in-slide links clickable)
  const canva = trimmed.match(
    /canva\.com\/design\/([^/]+)\/([^/]+)\/view/i
  );
  if (canva) {
    const base = `https://www.canva.com/design/${canva[1]}/${canva[2]}/view`;
    if (trimmed.includes('embed')) return trimmed;
    return `${base}?embed`;
  }

  if (trimmed.includes('/preview') || trimmed.includes('/embed')) {
    return trimmed;
  }

  return trimmed;
}

import { Lesson } from '../types';

type ResourceItem = NonNullable<Lesson['resources']>[number];

/**
 * Normalize Google Drive "view" links into a direct download URL when possible.
 */
export function toDownloadUrl(rawUrl: string): string {
  const url = rawUrl.trim();
  if (!url) return '#';

  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (fileMatch?.[1]) {
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  }

  const idMatch = url.match(/drive\.google\.com\/(?:open|u\/\d+\/uc)\?[^#]*id=([^&]+)/i);
  if (idMatch?.[1]) {
    return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
  }

  return url;
}

function inferType(titleOrUrl: string): ResourceItem['type'] {
  const s = titleOrUrl.toLowerCase();
  if (s.includes('.xls') || s.includes('excel') || s.includes('spreadsheet')) return 'excel';
  if (s.includes('.pdf') || s.includes('pdf')) return 'pdf';
  return 'link';
}

function titleFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = decodeURIComponent(path.split('/').filter(Boolean).pop() || '');
    if (last && last !== 'view' && last !== 'edit') return last;
  } catch {
    // ignore
  }
  return 'Tài liệu tải về';
}

/**
 * Parse one resource entry.
 * Supported:
 * - "Tên file.pdf | https://drive.google.com/..."
 * - "Tên file.pdf || https://..."
 * - "https://..." (URL only)
 * - "Tên file.pdf (pdf)" (legacy, no URL → #)
 */
function parseOneResource(raw: string): ResourceItem | null {
  const text = raw.trim();
  if (!text || text.toLowerCase() === 'không có' || text === '-') return null;

  // Title | URL  or  Title || URL
  const pipeSplit = text.split(/\s*\|\|?\s*/);
  if (pipeSplit.length >= 2) {
    const maybeUrl = pipeSplit[pipeSplit.length - 1].trim();
    if (/^https?:\/\//i.test(maybeUrl)) {
      const title = pipeSplit.slice(0, -1).join(' | ').replace(/\s*\((pdf|excel|link)\)\s*$/i, '').trim()
        || titleFromUrl(maybeUrl);
      return {
        title,
        type: inferType(title + ' ' + maybeUrl),
        url: toDownloadUrl(maybeUrl),
      };
    }
  }

  // Title ; URL
  const semi = text.split(/\s*;\s*/);
  if (semi.length === 2 && /^https?:\/\//i.test(semi[1])) {
    const title = semi[0].replace(/\s*\((pdf|excel|link)\)\s*$/i, '').trim() || titleFromUrl(semi[1]);
    return {
      title,
      type: inferType(title + ' ' + semi[1]),
      url: toDownloadUrl(semi[1]),
    };
  }

  // URL only
  if (/^https?:\/\//i.test(text)) {
    return {
      title: titleFromUrl(text),
      type: inferType(text),
      url: toDownloadUrl(text),
    };
  }

  // Legacy title-only
  const title = text.replace(/\s*\((pdf|excel|link)\)\s*$/i, '').trim();
  const typeMatch = text.match(/\((pdf|excel|link)\)\s*$/i);
  return {
    title: title || text,
    type: (typeMatch?.[1]?.toLowerCase() as ResourceItem['type']) || inferType(text),
    url: '#',
  };
}

/**
 * Parse the Sheet cell "Tài Liệu Đính Kèm".
 * Multiple files separated by " || " or newlines (preferred),
 * also accepts " | " between items when each item already has Title|URL.
 */
export function parseResourceCell(cell: string | null | undefined): ResourceItem[] {
  if (!cell || !String(cell).trim()) return [];

  const raw = String(cell).trim();

  // Prefer multi-separator that won't clash with Title | URL
  let parts: string[] = [];
  if (raw.includes('\n')) {
    parts = raw.split(/\n+/);
  } else if (raw.includes(' || ')) {
    parts = raw.split(/\s*\|\|\s*/);
  } else if (raw.includes(';;')) {
    parts = raw.split(/\s*;;\s*/);
  } else {
    // Heuristic: split on " | " only when there are an odd number of segments
    // and every other segment after the first title looks like a URL pattern... 
    // Safer for single resource "Title | URL":
    const urlCount = (raw.match(/https?:\/\//gi) || []).length;
    if (urlCount <= 1) {
      parts = [raw];
    } else {
      // Multiple "Title | https://..." joined by " | "
      parts = raw.split(/\s*\|\s*(?=https?:\/\/)/i).reduce<string[]>((acc, chunk, i) => {
        if (i === 0) {
          acc.push(chunk);
          return acc;
        }
        // chunk starts with URL — attach to previous as "prev | url", then leftover title after next?
        // Actually split gives: ["Title1 ", "https://a.com | Title2 ", "https://b.com"]
        const last = acc[acc.length - 1];
        const rest = chunk.split(/\s*\|\s*/);
        const url = rest[0];
        acc[acc.length - 1] = `${last} | ${url}`.trim();
        if (rest.length > 1) {
          acc.push(rest.slice(1).join(' | ').trim());
        }
        return acc;
      }, []);
    }
  }

  return parts
    .map((p) => parseOneResource(p))
    .filter((r): r is ResourceItem => !!r);
}

/** Serialize resources back to Sheet-friendly cell text */
export function serializeResources(resources?: ResourceItem[] | null): string {
  if (!resources || resources.length === 0) return '';
  return resources
    .map((r) => {
      if (r.url && r.url !== '#') return `${r.title} | ${r.url}`;
      return `${r.title} (${r.type || 'link'})`;
    })
    .join(' || ');
}

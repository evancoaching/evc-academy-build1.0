import { Student } from '../types';
import { normalizeCourseIds } from './courseAccess';

/** Format join date as mm/dd/yyyy */
export function formatJoinDate(input?: string | Date | null): string {
  if (!input) {
    const d = new Date();
    return toMmDdYyyy(d);
  }
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
      const [mm, dd, yyyy] = trimmed.split('/');
      return `${mm.padStart(2, '0')}/${dd.padStart(2, '0')}/${yyyy}`;
    }
    const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[2]}/${iso[3]}/${iso[1]}`;
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) return toMmDdYyyy(parsed);
    return trimmed;
  }
  return toMmDdYyyy(input);
}

function toMmDdYyyy(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
}

export function normalizeStudentStatus(
  raw?: string | null
): Student['status'] {
  const s = (raw || 'active').toString().trim().toLowerCase();
  if (s === 'pending' || s.includes('chờ') || s.includes('pending')) return 'pending';
  if (
    s === 'blocked' ||
    s === 'revoked' ||
    s.includes('block') ||
    s.includes('khóa') ||
    s.includes('khoa')
  ) {
    return 'blocked';
  }
  if (s === 'active' || s.includes('active') || s.includes('đang')) return 'active';
  return 'active';
}

export function normalizeStudentRole(
  raw?: string | null,
  email?: string,
  fullName?: string
): Student['role'] {
  const s = (raw || '').toString().trim().toLowerCase();
  if (s === 'admin' || s.includes('admin')) return 'admin';
  if (s === 'user' || s === 'học viên' || s === 'hoc vien') return 'user';
  if (
    email?.toLowerCase() === 'nguyen@evancoaching.net' ||
    fullName?.toLowerCase().includes('admin')
  ) {
    return 'admin';
  }
  return 'user';
}

export function migrateStudent(raw: Partial<Student> & { status?: string }): Student {
  const email = (raw.email || '').toLowerCase().trim();
  const fullName = raw.fullName || 'Học Viên';
  return {
    id: raw.id || `std-${Date.now()}`,
    email,
    phone: raw.phone,
    fullName,
    status: normalizeStudentStatus(raw.status as string),
    role: normalizeStudentRole(raw.role as string, email, fullName),
    accessLevel: raw.accessLevel === 'module1_only' ? 'module1_only' : 'full',
    allowedCourseIds: normalizeCourseIds(raw.allowedCourseIds),
    dateApproved: formatJoinDate(raw.dateApproved),
    lastActive: raw.lastActive,
    notes: raw.notes,
  };
}

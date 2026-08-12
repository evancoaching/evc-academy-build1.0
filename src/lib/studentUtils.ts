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

/** Merge imported sheet rows into local roster by email (sheet wins on status/role/courses). */
export function upsertStudentsRoster(
  prev: Student[],
  imported: Partial<Student>[]
): Student[] {
  const byEmail = new Map<string, Student>(prev.map((s) => [s.email.toLowerCase(), s]));

  imported.forEach((st, idx) => {
    if (!st.email) return;
    const cleanEmail = st.email.toLowerCase().trim();
    const incomingCourses = normalizeCourseIds(st.allowedCourseIds);
    const existing = byEmail.get(cleanEmail);

    if (existing) {
      byEmail.set(
        cleanEmail,
        migrateStudent({
          ...existing,
          fullName: st.fullName || existing.fullName,
          status: st.status !== undefined && st.status !== null && String(st.status).trim() !== ''
            ? st.status
            : existing.status,
          role: st.role || existing.role,
          accessLevel: st.accessLevel || existing.accessLevel,
          allowedCourseIds:
            st.allowedCourseIds !== undefined ? incomingCourses : existing.allowedCourseIds,
          dateApproved: st.dateApproved || existing.dateApproved,
          lastActive: 'Đã đồng bộ từ Google Sheet',
          notes: st.notes || existing.notes,
          phone: st.phone || existing.phone,
        })
      );
    } else {
      byEmail.set(
        cleanEmail,
        migrateStudent({
          id: `sheet-std-${Date.now()}-${idx}`,
          email: cleanEmail,
          fullName: st.fullName || 'Học Viên Sheet',
          status: st.status || 'active',
          role: st.role,
          accessLevel: st.accessLevel || 'full',
          allowedCourseIds: incomingCourses,
          dateApproved: st.dateApproved || formatJoinDate(),
          lastActive: 'Đã nhập từ Google Sheet',
          phone: st.phone,
          notes: st.notes,
        })
      );
    }
  });

  return Array.from(byEmail.values());
}

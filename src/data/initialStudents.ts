import { Student } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    email: 'nguyen@evancoaching.net',
    phone: '0901234567',
    fullName: 'Nguyên (Evan Coaching Admin)',
    status: 'active',
    role: 'admin',
    accessLevel: 'full',
    allowedCourseIds: ['ms-2026', 're-2026'],
    dateApproved: '01/10/2026',
    lastActive: '2026-08-10 08:30',
    notes: 'Quản trị viên hệ thống / Coach'
  },
  {
    id: 'std-2',
    email: 'hocvien1@evancoaching.net',
    phone: '0912345678',
    fullName: 'Trần Văn Minh',
    status: 'active',
    role: 'user',
    accessLevel: 'full',
    allowedCourseIds: ['ms-2026', 're-2026'],
    dateApproved: '02/15/2026',
    lastActive: '2026-08-09 19:45',
    notes: 'Học viên Money Skills & Real Estate'
  },
  {
    id: 'std-3',
    email: 'hocvien2@evancoaching.net',
    phone: '0987654321',
    fullName: 'Lê Thị Thu Hương',
    status: 'active',
    role: 'user',
    accessLevel: 'full',
    allowedCourseIds: ['re-2026'],
    dateApproved: '03/01/2026',
    lastActive: '2026-08-08 14:20',
    notes: 'Học viên chuyên Bất Động Sản Mỹ'
  },
  {
    id: 'std-4',
    email: 'student.demo@gmail.com',
    phone: '0933445566',
    fullName: 'Nguyễn Hoàng Nam',
    status: 'active',
    role: 'user',
    accessLevel: 'full',
    allowedCourseIds: ['ms-2026'],
    dateApproved: '04/12/2026',
    lastActive: '2026-08-07 10:15',
    notes: 'Duyệt khóa Money Skills 2026'
  },
  {
    id: 'std-5',
    email: 'trial.user@evancoaching.net',
    phone: '0977889900',
    fullName: 'Phạm Đức Anh',
    status: 'active',
    role: 'user',
    accessLevel: 'module1_only',
    allowedCourseIds: ['ms-2026'],
    dateApproved: '05/20/2026',
    lastActive: '2026-08-01 16:00',
    notes: 'Duyệt học thử Module 1: Credit Profile'
  }
];

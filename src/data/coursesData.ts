import { Course } from '../types';
import { COURSE_MODULES } from './courseData';
import { REAL_ESTATE_MODULES } from './realEstateCourseData';

export const ALL_COURSES: Course[] = [
  {
    id: 'ms-2026',
    title: 'Money Skills Masterclass',
    titleVi: 'Money Skills Masterclass: Quản Lý Tài Chính & Điểm Tín Dụng Mỹ',
    badge: 'Money Skills',
    category: 'Tài Chính Cá Nhân Mỹ',
    level: 'Toàn Diện (All Levels)',
    description: 'Chương trình huấn luyện hàng đầu giúp kiều bào Mỹ tối ưu điểm tín dụng FICO 750+, quản lý dòng tiền, đầu tư chứng khoán tự động, vay mua nhà và tối ưu thuế hợp pháp.',
    thumbnailUrl: 'https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/6a7d99cd02015def96a416d8_MSThumb.png',
    externalUrl: 'https://www.evancoaching.net/money-skills',
    totalLessons: 29,
    totalModules: 4,
    durationHours: '12+ Hours',
    modules: COURSE_MODULES,
  },
  {
    id: 're-2026',
    title: 'Real Estate Masterclass',
    titleVi: 'Real Estate Masterclass: Bất Động Sản Mỹ & Bí Quyết Vay Mortgage',
    badge: 'Real Estate',
    category: 'Bất Động Sản Mỹ',
    level: 'Thực Chiến (All Levels)',
    description: 'Chương trình chuyên sâu về bất động sản Mỹ: từ đòn bẩy tài chính, tối ưu điểm tín dụng vay nhà, chỉ số DTI/LTV, bảo hiểm PMI, phân tích dòng tiền cho thuê đến bảo vệ tài sản qua LLC & Living Trust.',
    thumbnailUrl: 'https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/6a7d99cc97a8c64507c07862_REThumb.png',
    externalUrl: 'https://www.evancoaching.net/real-estate',
    totalLessons: 26,
    totalModules: 4,
    durationHours: '10+ Hours',
    modules: REAL_ESTATE_MODULES,
  }
];

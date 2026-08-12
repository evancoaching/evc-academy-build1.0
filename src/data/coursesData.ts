import { Course } from '../types';
import { COURSE_MODULES } from './courseData';
import { REAL_ESTATE_MODULES } from './realEstateCourseData';

export const ALL_COURSES: Course[] = [
  {
    id: 'ms-2026',
    title: 'Money Skills Masterclass',
    titleVi: 'Money Skills Masterclass: Quản Lý Tài Chính & Điểm Tín Dụng Mỹ',
    badge: 'TỪ SỐNG PAYCHECK TO PAYCHECK ĐẾN TỰ CHỦ TÀI CHÍNH',
    category: 'Tài Chính Cá Nhân Mỹ',
    level: 'Toàn Diện (All Levels)',
    description: 'Chương trình huấn luyện hàng đầu giúp kiều bào Mỹ tối ưu điểm tín dụng FICO 750+, quản lý dòng tiền, đầu tư chứng khoán tự động, vay mua nhà và tối ưu thuế hợp pháp.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
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
    badge: 'TỪ NGƯỜI MỚI ĐẾN NHÀ ĐẦU TƯ ĐỊA ỐC THÔNG THÁI',
    category: 'Bất Động Sản Mỹ',
    level: 'Thực Chiến (All Levels)',
    description: 'Chương trình chuyên sâu về bất động sản Mỹ: từ đòn bẩy tài chính, tối ưu điểm tín dụng vay nhà, chỉ số DTI/LTV, bảo hiểm PMI, phân tích dòng tiền cho thuê đến bảo vệ tài sản qua LLC & Living Trust.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    externalUrl: 'https://www.evancoaching.net/real-estate',
    totalLessons: 26,
    totalModules: 4,
    durationHours: '10+ Hours',
    modules: REAL_ESTATE_MODULES,
  }
];

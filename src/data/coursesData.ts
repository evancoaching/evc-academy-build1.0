import { Course } from '../types';
import { COURSE_MODULES } from './courseData';
import { REAL_ESTATE_MODULES } from './realEstateCourseData';

/**
 * Copy khóa học lấy đúng từ website gốc:
 * https://www.evancoaching.net/money-skills
 * https://www.evancoaching.net/real-estate
 */
export const ALL_COURSES: Course[] = [
  {
    id: 'ms-2026',
    title: 'Lớp Money Skills',
    titleVi: 'Lớp Money Skills',
    badge: 'Từ sống Paycheck to Paycheck đến Tự chủ Tài chính',
    category: 'Money Skills (Live)',
    level: 'Live · Zoom',
    description:
      'Lớp học phát triển tài chính cá nhân & xây dựng tài sản bền vững tại Mỹ dành cho người bận rộn.',
    formatNote:
      'Format: Học Online qua Zoom cùng Coach Evan. Lịch học: Mỗi tối Thứ Ba - 4 tuần liên tiếp. Chỉ 10 học viên/lớp.',
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Hiểu luật chơi tài chính Mỹ',
        points: [
          'Có lương cao chưa chắc được "Tự chủ tài chính".',
          'Chu kỳ kinh tế, nguyên tắc quản lý tài chính cá nhân bền vững.',
          'Cách quản lý tín dụng cá nhân để dễ dàng tiếp cận các khoản vay.',
        ],
      },
      {
        week: 2,
        title: 'Tuần 2: Chiến lược đầu tư an toàn cho người bận',
        points: [
          'Bonds, Mutual Fund, Index Fund, ETFs, Individual Stocks.',
          'Dollar-Cost Averaging: Đầu tư tự động, không cần timing thị trường.',
          'Phân tán rủi ro, tối ưu thuế.',
        ],
      },
      {
        week: 3,
        title: 'Tuần 3: Địa Ốc - Tài sản hữu hình dài hạn',
        points: [
          'Cách mua được nhà nhanh nhất.',
          'Các lỗi cần tránh khi mua nhà.',
          'Tối ưu thuế & househacking.',
        ],
      },
      {
        week: 4,
        title: 'Tuần 4: Nghỉ hưu như người giàu',
        points: [
          'Retirement Accounts: 401k, IRA, Roth IRA tối ưu. Chiến lược tối ưu thuê hợp pháp.',
          'Làm sao nghỉ làm vẫn có thu nhập.',
          'Chọn loại bảo hiểm phù hợp: Term Life hay Whole Life Insurance',
        ],
      },
    ],
    thumbnailUrl:
      'https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/6a7d99cd02015def96a416d8_MSThumb.png',
    externalUrl: 'https://www.evancoaching.net/money-skills',
    totalLessons: 29,
    totalModules: 4,
    durationHours: '4 buổi × 4 giờ',
    modules: COURSE_MODULES,
  },
  {
    id: 're-2026',
    title: 'Lớp Real Estate',
    titleVi: 'Lớp Real Estate',
    badge: 'TỪ NGƯỜI MỚI ĐẾN NHÀ ĐẦU TƯ ĐỊA ỐC THÔNG THÁI',
    category: 'Real Estate (Live)',
    level: 'Live · Zoom',
    description:
      'Giúp bạn tự tin ra quyết định đầu tư với kinh nghiệm từ A-Z về mua bán, cho thuê, leveraging equity để Nhà Đẻ Nhà.',
    formatNote:
      'Format: Học Online qua Zoom cùng Coach Evan. Lịch học: Mỗi tối Thứ Hai - 4 tuần liên tiếp. Chỉ 10 học viên/lớp.',
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Hiểu bản chất để tự tin quyết định',
        points: [
          'Lãi suất kép - Sức mạnh đòn bẩy',
          'Bạn được vay bao nhiêu tiền?',
          'Có nên đợi đủ down-payment mới vay?',
        ],
      },
      {
        week: 2,
        title: 'Tuần 2: Biến ngân hàng thành công cụ xây dựng tài sản',
        points: [
          'Hiểu rõ mọi loại mortgage loans trên thị trường',
          'Chiến thuật Leveraging Equity để Nhà Đẻ Nhà',
          'Lựa chọn mortgage thông minh để tối ưu chi phí',
        ],
      },
      {
        week: 3,
        title: 'Tuần 3: Tính toán lợi nhuận & Cho thuê',
        points: [
          'Rental Calculations: Yields, NOI, Cap Rate',
          'Phân tích deals chuẩn xác, quản lý nhà & tìm tenant chất lượng',
          'Rental Tax Deduction: Tối ưu thuế hợp pháp',
        ],
      },
      {
        week: 4,
        title: 'Tuần 4: Bảo vệ và phát triển tài sản',
        points: [
          'Bí quyết người giàu xây dựng tài sản qua từng thế hệ',
          'Section 121 Exclusion, 1031 Exchange, Step-Up Basis',
          'Các luật lệ, lợi ích khi bán/đổi nhà & bảo vệ tài sản',
        ],
      },
    ],
    thumbnailUrl:
      'https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/6a7d99cc97a8c64507c07862_REThumb.png',
    externalUrl: 'https://www.evancoaching.net/real-estate',
    totalLessons: 26,
    totalModules: 4,
    durationHours: '4 buổi × 4 giờ',
    modules: REAL_ESTATE_MODULES,
  },
];

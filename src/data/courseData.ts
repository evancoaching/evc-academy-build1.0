import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    number: 1,
    title: 'Module 1: Hệ Thống Kinh Tế & Tín Dụng Cá Nhân',
    titleVi: 'Module 1: Hệ Thống Kinh Tế & Quản Lý Điểm Tín Dụng (Credit Profile)',
    description: 'Nắm vững nguyên lý vận hành của nền kinh tế Mỹ, xây dựng tài chính cá nhân lành mạnh và tối ưu hóa điểm tín dụng chuẩn Mỹ.',
    lessons: [
      {
        id: 'ms-1-0',
        slug: 'introduction',
        title: 'Introduction',
        titleVi: 'Lời Giới Thiệu Khóa Học Money Skills',
        moduleNumber: 1,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232braFyy9NSkOWOKBCvWamdc9dgfdLTBGsu4381asGkbWQV&playbackInfo=eyJ2aWRlb0lkIjoiNjY3YzQwMDM0Y2JmNGExZWI5YjdlOGI4Yzc1MDk0NDQifQ==',
        summary: 'Tổng quan lộ trình học Money Skills cùng Coach Evan.',
        descriptionVi: 'Chào mừng anh chị đến với khóa học Money Skills của Evan Coaching. Trong bài học này, Coach Evan sẽ chia sẻ tư duy nền tảng về quản lý tài chính cá nhân, tầm quan trọng của việc làm chủ đồng tiền tại Mỹ và cấu trúc lộ trình 4 module chuyên sâu giúp anh chị tự chủ tài chính vững chắc.',
        keyTakeaways: [
          'Thấu hiểu bức tranh tổng thể về tư duy tài chính cá nhân tại Mỹ',
          'Định hình mục tiêu tài chính rõ ràng cho bản thân và gia đình',
          'Cách tiếp cận bài học hiệu quả và tối ưu hóa thời gian thực hành'
        ],
        actionSteps: [
          'Tải Playbook Tổng Quan Money Skills',
          'Tham gia nhóm cộng đồng học viên Evan Coaching',
          'Lên lịch học cố định 30 phút mỗi ngày'
        ],
        resources: [
          { title: 'Money Skills Playbook Overview.pdf', type: 'pdf', url: '#' },
          { title: 'Bảng Đánh Giá Hiện Trạng Tài Chính Cá Nhân.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-1-1',
        slug: 'ms-1-1-economy-system',
        title: 'MS 1.1 The Economy System',
        titleVi: 'MS 1.1 Cấu Trúc Hệ Thống Kinh Tế Mỹ',
        moduleNumber: 1,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232vcPPbvihVRdpTGQMAVQ91LaHzAo5I6sJh9FIinQSEBqJ5&playbackInfo=eyJ2aWRlb0lkIjoiYTNjYzE5ODY1YTlhNDUwNzlhODljNWQwZjM1ZDY1YWUifQ==',
        summary: 'Cách vận hành của Cục Dự Trữ Liên Bang (FED), lạm phát và chu kỳ kinh tế.',
        descriptionVi: 'Tìm hiểu cách nền kinh tế Mỹ vận hành thông qua các công cụ tiền tệ của FED (Federal Reserve), cơ chế lạm phát, lãi suất tác động đến túi tiền của người dân Mỹ như thế nào, và cách bảo vệ tài sản trong các giai đoạn biến động kinh tế.',
        keyTakeaways: [
          'Cách FED điều chỉnh lãi suất ảnh hưởng tới khoản vay nhà, xe và chứng khoán',
          'Hiểu đúng về lạm phát (Inflation) và sức mua của đồng USD theo thời gian',
          'Chiến lược phân bổ tài sản thông minh theo từng chu kỳ kinh tế'
        ],
        actionSteps: [
          'Xem chỉ số lạm phát CPI mới nhất tại Mỹ',
          'Ghi chú các tài sản có khả năng chống lạm phát tốt'
        ],
        resources: [
          { title: 'Sơ Đồ Chu Kỳ Kinh Tế & Tác Động Lãi Suất.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-1-2',
        slug: 'ms-1-2-personal-finance',
        title: 'MS 1.2 Personal Finance',
        titleVi: 'MS 1.2 Quản Lý Tài Chính Cá Nhân & Dòng Tiền',
        moduleNumber: 1,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232if9CeNRg1cIiRczbv7WniJLrLAz7b7xx0lYAdubnEMS7v&playbackInfo=eyJ2aWRlb0lkIjoiZmFhYzk0MzUxYTliNDMzNmExMzU3ZjQzNzQ1Y2E4OTAifQ==',
        summary: 'Quy tắc quản lý ngân sách, quỹ dự phòng khẩn cấp và tối ưu hóa chi tiêu.',
        descriptionVi: 'Bài học hướng dẫn phân bổ thu nhập theo quy tắc quản lý dòng tiền khoa học, xây dựng Quỹ Dự Phòng Khẩn Cấp (Emergency Fund) từ 3 - 6 tháng chi phí sinh hoạt và cách cắt giảm chi tiêu thừa mà vẫn đảm bảo chất lượng cuộc sống.',
        keyTakeaways: [
          'Công thức phân bổ thu nhập chuẩn dành cho gia đình gốc Việt tại Mỹ',
          'Cách tính chính xác số tiền cần có trong Quỹ Dự Phòng Khẩn Cấp',
          'Tự động hóa dòng tiền tiết kiệm và đầu tư hàng tháng'
        ],
        actionSteps: [
          'Điền thông tin chi tiêu vào File Excel Ngân Sách Cá Nhân',
          'Mở tài khoản High-Yield Savings Account (HYSA) để giữ quỹ dự phòng'
        ],
        resources: [
          { title: 'Excel Template - Quản Lý Ngân Sách Gia Đình.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-1-3',
        slug: 'ms-1-3-credit-profile',
        title: 'MS 1.3 Credit Profile',
        titleVi: 'MS 1.3 Hồ Sơ Tín Dụng & 5 Yếu Tố Cấu Thành Điểm Credit',
        moduleNumber: 1,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32328wKAxjILVxLa5BGxSZuOJPbHEmr4CF8NL4I3jKAAh4Snr&playbackInfo=eyJ2aWRlb0lkIjoiYmE5ZDZhNWFmMzQwNDc5YWIwZTM2M2FlZmY4Y2U4ZWYifQ==',
        summary: 'Phân tích chi tiết 5 yếu tố ảnh hưởng tới FICO Score và bí quyết tăng điểm nhanh chóng.',
        descriptionVi: 'Tại Mỹ, điểm tín dụng (Credit Score) chính là tấm danh thiếp tài chính của bạn. Bài học giải mã chi tiết 5 yếu tố: Lịch sử thanh toán (35%), Tỷ lệ sử dụng tín dụng (30%), Độ dài lịch sử (15%), Loại tín dụng (10%) và Yêu cầu mới (10%).',
        keyTakeaways: [
          'Nắm rõ 5 trụ cột cấu thành điểm FICO Score',
          'Bí quyết duy trì Credit Utilization dưới 10% để điểm tăng đột biến',
          'Sai lầm phổ biến khiến điểm Credit giảm đột ngột và cách khắc phục'
        ],
        actionSteps: [
          'Kiểm tra tỷ lệ Credit Utilization trên tất cả thẻ tín dụng hiện có',
          'Thiết lập Auto-Pay để không bao giờ trễ hạn thanh toán'
        ],
        resources: [
          { title: 'Cẩm Nang Tăng Điểm Tín Dụng FICO 750+.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-1-4',
        slug: 'ms-1-4-tutorial-register-accounts',
        title: 'MS 1.4 TUTORIAL Register Accounts with Experian, Equifax, TransUnion',
        titleVi: 'MS 1.4 HƯỚNG DẪN: Tạo Tài Khoản 3 Cục Tín Dụng Lớn Nhất Mỹ',
        moduleNumber: 1,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232c5bmsgUhPLs6g8L8iHgosdtT6gZ1m8fg7c2dJQHijn82n&playbackInfo=eyJ2aWRlb0lkIjoiZmQwYjBhZGIxODhhNGQxZWI5NjZjNTk2NGM0Nzc5ODMifQ==',
        summary: 'Cầm tay chỉ việc đăng ký tài khoản chính thức tại Experian, Equifax và TransUnion.',
        descriptionVi: 'Hướng dẫn chi tiết từng bước màn hình để tạo tài khoản theo dõi điểm tín dụng chính chủ và miễn phí tại 3 bureau lớn nhất nước Mỹ, giúp bảo vệ danh tính tài chính cá nhân.',
        keyTakeaways: [
          'Cách đăng ký miễn phí không lo bị dính các gói dịch vụ trả phí ẩn',
          'Xác minh danh tính an toàn chuẩn quy định an ninh mạng',
          'Cách kiểm tra báo cáo định kỳ không tốn phí'
        ],
        actionSteps: [
          'Đăng ký tài khoản Experian theo video',
          'Lưu lại thông tin đăng nhập an toàn'
        ],
        resources: [
          { title: 'Checklist Đăng Ký Tài Khoản 3 Bureau Tín Dụng.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-1-5',
        slug: 'ms-1-5-tutorial-credit-report-score',
        title: 'MS 1.5 TUTORIAL Credit Report & Score',
        titleVi: 'MS 1.5 HƯỚNG DẪN: Đọc & Bóc Tách Báo Cáo Tín Dụng (Credit Report)',
        moduleNumber: 1,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232wxgKyGJmXho0tnunNWFxrWxiMCZkp27NuiwAimKzO55c7&playbackInfo=eyJ2aWRlb0lkIjoiMDJmNWIzNWZjMGYyNDU3YTg4ZGJkM2M0Y2ZmOTA0ODMifQ==',
        summary: 'Cách kiểm tra lỗi sai trong báo cáo tín dụng và quy trình khiếu nại (Dispute).',
        descriptionVi: 'Phân tích từng phần trong một bản báo cáo tín dụng thực tế. Hướng dẫn phát hiện các giao dịch gian lận, tài khoản lạ và mẫu thư khiếu nại (Dispute Letter) xóa bỏ thông tin sai sự thật.',
        keyTakeaways: [
          'Phân biệt FICO Score và VantageScore',
          'Nhận diện các dấu hiệu sai sót hoặc mạo danh trong hồ sơ',
          'Quy trình Dispute 30 ngày theo luật định Mỹ'
        ],
        actionSteps: [
          'Tải báo cáo tín dụng PDF chính thức',
          'Soát lỗi từng khoản vay và thẻ credit'
        ],
        resources: [
          { title: 'Mẫu Thư Khiếu Nại Dispute Xóa Lỗi Tín Dụng.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-1-6',
        slug: 'ms-1-6-tutorial-credit-freeze',
        title: 'MS 1.6 TUTORIAL Credit Freeze',
        titleVi: 'MS 1.6 HƯỚNG DẪN: Khóa Tín Dụng (Credit Freeze) Chống Đánh Cắp Danh Tính',
        moduleNumber: 1,
        lessonNumber: 7,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32320qI5bQ6Jpx0w7R6vpMGYPIJseB6NVjlVXNZ8LoPjszHmd&playbackInfo=eyJ2aWRlb0lkIjoiNWU2NGRlMTM5ODc0NGQ4NjgwOWJhYmExY2JmYWYyOTYifQ==',
        summary: 'Thao tác Credit Freeze & Unfreeze nhanh chóng để bảo vệ SSN của bạn.',
        descriptionVi: 'Credit Freeze là lớp giáp bảo vệ mạnh nhất giúp chặn đứng kẻ gian mở thẻ tín dụng hoặc vay tiền dưới tên Social Security Number (SSN) của bạn. Bài học hướng dẫn khóa và mở khóa linh hoạt khi cần vay mua nhà, xe.',
        keyTakeaways: [
          'Tại sao người sống tại Mỹ bắt buộc phải Freeze Credit',
          'Sự khác biệt giữa Credit Freeze và Credit Lock (trả phí)',
          'Cách mở khóa tạm thời (Thaw) trong 5 phút khi nộp đơn vay'
        ],
        actionSteps: [
          'Thực hiện Credit Freeze tại Experian, Equifax và TransUnion',
          'Lưu giữ mã PIN bảo mật cẩn thận'
        ],
        resources: [
          { title: 'Hướng Dẫn Nhanh Freeze Tín Dụng Trong 3 Phút.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  },
  {
    id: 2,
    number: 2,
    title: 'Module 2: Lập Kế Hoạch Đầu Tư & Chứng Khoán Mỹ',
    titleVi: 'Module 2: Lập Kế Hoạch Đầu Tư, Cổ Phiếu & Chứng Khoán Mỹ',
    description: 'Xây dựng danh mục đầu tư an toàn, tận dụng sức mạnh lãi kép, hiểu rõ Cổ phiếu, Quỹ chỉ số (Index Fund) và thao tác sàn Fidelity.',
    lessons: [
      {
        id: 'ms-2-1',
        slug: 'ms-2-1-investment-planning',
        title: 'MS 2.1 Lập Kế Hoạch Đầu Tư & Sức Mạnh Lãi Kép',
        titleVi: 'MS 2.1 Lập Kế Hoạch Đầu Tư & Sức Mạnh Lãi Kép (Compound Interest)',
        moduleNumber: 2,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232PvAAAmql5z4oZToUG0YBSaYxfVqvyZcSXlnEKjed9TNGV&playbackInfo=eyJ2aWRlb0lkIjoiMmE3MmY4YmU0YTlkNDM3M2EyMzVkYjc1NWFlZjljODYifQ==',
        summary: 'Khám phá kỳ quan thứ 8 của thế giới và bài toán tích lũy tài sản dài hạn.',
        descriptionVi: 'Sức mạnh lãi kép là chìa khóa giúp những người bình thường đạt được tự do tài chính tại Mỹ. Bài học tính toán cụ thể con số bạn cần đầu tư hàng tháng dựa trên độ tuổi, mục tiêu hưu trí và kỳ vọng lợi nhuận.',
        keyTakeaways: [
          'Quy tắc 72 tính thời gian gấp đôi tài sản',
          'Yếu tố Thời gian quan trọng hơn Số tiền ban đầu như thế nào',
          'Mô phỏng bảng tính dòng tiền đầu tư 10, 20, 30 năm'
        ],
        actionSteps: [
          'Sử dụng công cụ tính Lãi Kép trong bài học',
          'Xác định độ tuổi mong muốn nghỉ hưu và con số tài sản mục tiêu'
        ],
        resources: [
          { title: 'Bảng Tính Dự Phóng Lãi Kép Đầu Tư Hưu Trí.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-2-2',
        slug: 'ms-2-2-cd-treasury-bonds',
        title: 'MS 2.2 Cách Mua Bán CD & Trái Phiếu Chính Phủ',
        titleVi: 'MS 2.2 Cách Mua Bán CD & Trái Phiếu Chính Phủ Mỹ (US Treasury)',
        moduleNumber: 2,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232r53c1cActEQ2APUlPyi6UjcwAVPUWbLr5NtoCfP6qAmnW&playbackInfo=eyJ2aWRlb0lkIjoiZWJhOWM4OGVmYzkzNDM4MTk1YTBiM2RmM2MwNDIxOTkifQ==',
        summary: 'Đầu tư an toàn với chứng chỉ tiền gửi CD và Trái phiếu Chính Phủ không lo rủi ro.',
        descriptionVi: 'Tìm hiểu về các công cụ đầu tư rủi ro bằng 0 (Zero Risk) được Chính phủ Mỹ bảo chứng: Chứng chỉ tiền gửi CD, T-Bills, T-Notes và cách xây dựng chiến lược CD Ladder để tối ưu hóa dòng tiền.',
        keyTakeaways: [
          'So sánh lãi suất CD ngân hàng và Trái phiếu Treasury Direct',
          'Ưu đãi miễn thuế tiểu bang đối với lãi từ Trái phiếu Chính phủ',
          'Cách dựng chiến lược CD Ladder xoay vòng dòng tiền'
        ],
        actionSteps: [
          'Mở tài khoản TreasuryDirect hoặc giao dịch CD trên sàn Brokerage',
          'So sánh lãi suất CD hiện hành'
        ],
        resources: [
          { title: 'Hướng Dẫn Xây Dựng CD Ladder Cho Dòng Tiền An Toàn.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-3',
        slug: 'ms-2-3-stocks-funds-indexes',
        title: 'MS 2.3 Nắm Rõ Về Stock, Fund, Index',
        titleVi: 'MS 2.3 Phân Biệt Cổ Phiếu (Stock), Quỹ (Fund) & Chỉ Số (Index)',
        moduleNumber: 2,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232F5mLojZti5wakGU5ChoUPZBCMJHy4YziIQbXETja6zXPD&playbackInfo=eyJ2aWRlb0lkIjoiYWIwNWZjYzFmYTg5NGJmYThiNGIyYjE1ZWQ0YzExZDAifQ==',
        summary: 'Nền tảng kiến thức thị trường: Cổ phiếu đơn lẻ, Mutual Fund, ETF và Chỉ số S&P 500.',
        descriptionVi: 'Phân biệt rõ ràng các khái niệm nền tảng trong đầu tư chứng khoán Mỹ. Tại sao chọn đầu tư vào Quỹ chỉ số (Index Fund) lại an toàn và hiệu quả vượt trội so với tự chọn cổ phiếu lẻ cho nhà đầu tư cá nhân.',
        keyTakeaways: [
          'Sự khác biệt giữa Cổ phiếu lẻ (Individual Stock) và Quỹ chỉ số (Index Fund/ETF)',
          'Chỉ số S&P 500, Nasdaq 100, Total Stock Market đại diện cho cái gì',
          'Lý do 90% nhà đầu tư chuyên nghiệp không thắng nổi S&P 500 trong dài hạn'
        ],
        actionSteps: [
          'Ghi nhớ các mã ticker phổ biến: VOO, SPY, VTI, QQQ'
        ],
        resources: [
          { title: 'Bản So Sánh Chi Tiết ETF vs Mutual Fund.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-4',
        slug: 'ms-2-4-index-fund-analysis',
        title: 'MS 2.4 Phân Tích Index Fund',
        titleVi: 'MS 2.4 Phân Tích Chỉ Số Quỹ Index Fund (VOO, VTI, QQQ, SCHD)',
        moduleNumber: 2,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232nZUhbnSgszouY1qRHcezjIOhL3Sc8oXpGVlrZGMzkr7L4&playbackInfo=eyJ2aWRlb0lkIjoiYjIwY2FjN2U5YzZhNDU2NDhmYTExMDE0YjJkYjU0MDAifQ==',
        summary: 'Đánh giá chỉ số Expense Ratio, Historical Return và danh mục nắm giữ của Quỹ.',
        descriptionVi: 'Phân tích thực tế các mã quỹ hàng đầu Mỹ như VOO (S&P 500), VTI (Toàn thị trường Mỹ), QQQ (Công nghệ) và SCHD (Cổ tức). Cách đọc Expense Ratio để tránh mất tiền phí quản lý đắt đỏ.',
        keyTakeaways: [
          'Tầm quan trọng của Expense Ratio (Tỷ lệ chi phí quản lý)',
          'Cách phối hợp VOO + VTI + QQQ tạo danh mục cân bằng',
          'Chiến lược bình quân giá Dollar-Cost Averaging (DCA)'
        ],
        actionSteps: [
          'Lựa chọn 2 - 3 quỹ phù hợp với khẩu vị rủi ro cá nhân'
        ],
        resources: [
          { title: 'Phân Tích Top 10 Quỹ Chỉ Số Uy Tín Nhất Thị Trường Mỹ.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-5',
        slug: 'ms-2-5-dividend-stocks',
        title: 'MS 2.5 Dividend Stocks',
        titleVi: 'MS 2.5 Cổ Phiếu Cổ Tức (Dividend) & Tạo Dòng Tiền Thụ Động',
        moduleNumber: 2,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232VaF7Gy0eVfIaWmkhBR5UCHubM9xsSA1XBcdcDJdBdbUfE&playbackInfo=eyJ2aWRlb0lkIjoiMzZjZmY3YjhhOTdlNDFmMGE1ODAzZjQzNWQ4MTk0MGYifQ==',
        summary: 'Cách chọn các công ty Dividend Aristocrats và tự động tái đầu tư DRIP.',
        descriptionVi: 'Xây dựng nguồn thu nhập thụ động bền vững từ cổ tức. Hiểu rõ khái niệm Dividend Yield, Dividend Growth Rate, danh sách Dividend Kings/Aristocrats và tính năng DRIP (Dividend Reinvestment Plan).',
        keyTakeaways: [
          'Khái niệm Cổ tức và lịch trả cổ tức theo quý',
          'Sự khác biệt giữa Cổ tức cao (High Yield) và Cổ tức tăng trưởng (Dividend Growth)',
          'Kích hoạt chế độ DRIP để nhận lãi kép tự động'
        ],
        actionSteps: [
          'Lập danh sách theo dõi các mã cổ phiếu/quỹ cổ tức chất lượng'
        ],
        resources: [
          { title: 'Danh Sách Dividend Aristocrats Uy Tín Trả Cổ Tức 25+ Năm.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-6',
        slug: 'ms-2-6-margin-account',
        title: 'MS 2.6 Margin Account',
        titleVi: 'MS 2.6 Tài Khoản Margin & Cảnh Báo Rủi Ro Vay Ký Quỹ',
        moduleNumber: 2,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32325kX2inoRQJyyqwo5v9ymllUXs7OB0yktse3EZEb2xr3kA&playbackInfo=eyJ2aWRlb0lkIjoiNzViODZmMTJiZGM3NDA4MWJkM2M5NGMyOTVkZjIzMDgifQ==',
        summary: 'Hiểu về vay đòn bẩy Margin Call và quy tắc quản trị rủi ro tuyệt đối.',
        descriptionVi: 'Phân tích cơ chế hoạt động của tài khoản Margin (vay tiền của broker để đầu tư). Nhận diện nguy cơ Margin Call, lãi suất margin đắt đỏ và lý do nhà đầu tư cá nhân nên ưu tiên tài khoản Cash.',
        keyTakeaways: [
          'Sự khác nhau giữa Cash Account và Margin Account',
          'Cơ chế diễn ra Margin Call và hậu quả cháy tài khoản',
          'Khi nào Margin mới thực sự có lợi (cho nhà đầu tư kinh nghiệm)'
        ],
        actionSteps: [
          'Kiểm tra loại tài khoản chứng khoán hiện tại của bạn'
        ],
        resources: [
          { title: 'Quy Tắc Quản Trị Rủi Ro Đầu Tư Chứng Khoán.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-7',
        slug: 'ms-2-7-short-selling',
        title: 'MS 2.7 Short Selling',
        titleVi: 'MS 2.7 Bán Khống (Short Selling) & Góc Nhìn Thị Trường',
        moduleNumber: 2,
        lessonNumber: 7,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232PEt3sHHneqXLQKeyJgbFwcAYPlKRnG9ZN4SwsDXPiGBUE&playbackInfo=eyJ2aWRlb0lkIjoiZWE3ODM0NjE3NWIzNGM3OWJiODFjNjdlNjA1ZTA5NjUifQ==',
        summary: 'Tìm hiểu cơ chế bán khống cổ phiếu và các đợt Short Squeeze nổi tiếng.',
        descriptionVi: 'Giải thích bản chất của hành vi bán khống khi dự đoán giá cổ phiếu giảm. Phân tích hiện tượng Short Squeeze (như vụ việc GameStop GME) và bài học về tâm lý đám đông trong đầu tư.',
        keyTakeaways: [
          'Bản chất vay cổ phiếu để bán và mua lại giá thấp hơn',
          'Rủi ro lỗ vô tận (Unlimited Loss) khi bán khống',
          'Thái độ đúng đắn: Tập trung vào đầu tư tích lũy dài hạn'
        ],
        actionSteps: [
          'Đọc trường hợp thực tế về Short Squeeze'
        ],
        resources: [
          { title: 'Phân Tích Bài Học Tâm Lý Đầu Tư Chứng Khoán.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-2-8',
        slug: 'ms-2-8-tutorial-fidelity-account',
        title: 'MS 2.8 TUTORIAL Fidelity Brokerage Account',
        titleVi: 'MS 2.8 HƯỚNG DẪN: Mở & Mua Cổ Phiếu Tự Động Trên Fidelity',
        moduleNumber: 2,
        lessonNumber: 8,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232WsNZD5giLbeXQevv6oFmczOgWNntpONnIOZ8Pg0fe9YCP&playbackInfo=eyJ2aWRlb0lkIjoiYzE3ODE4OTc3MTQzNDVmNmI4OGUzMmQxNTk1N2RkZTEifQ==',
        summary: 'Thực hành thao tác mở tài khoản Fidelity, nạp tiền và cài đặt Recurring Investment.',
        descriptionVi: 'Hướng dẫn thực tế từ A-Z cách sử dụng giao diện sàn Fidelity (một trong những sàn giao dịch chứng khoán uy tín nhất nước Mỹ): Link ngân hàng, đặt lệnh mua Fractional Shares và cài đặt mua tự động hàng tháng.',
        keyTakeaways: [
          'Cách link ngân hàng bằng Plaid hoặc micro-deposit an toàn',
          'Cách mua lẻ cổ phiếu (Fractional Shares) chỉ từ $1',
          'Cài đặt chế độ Auto-Invest định kỳ không lo quên'
        ],
        actionSteps: [
          'Mở tài khoản Fidelity Individual Brokerage',
          'Thiết lập lệnh trích tiền tự động $100 - $500/tháng vào VOO'
        ],
        resources: [
          { title: 'Hướng Dẫn Thao Tác Sàn Fidelity Chi Tiết Bằng Hình Ảnh.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  },
  {
    id: 3,
    number: 3,
    title: 'Module 3: Bất Động Sản & Khoản Vay Thế Chấp (Mortgage)',
    titleVi: 'Module 3: Bất Động Sản, Tốc Độ Tăng Giá & Mua Nhà Chuẩn Mỹ',
    description: 'Hiểu rõ các chỉ số tín dụng vay nhà, tỷ lệ LTV, DTI, bảo hiểm PMI và lựa chọn chương trình vay Mortgage tối ưu nhất.',
    lessons: [
      {
        id: 'ms-3-1',
        slug: 'ms-3-1-us-housing-appreciation',
        title: 'MS 3.1 US Housing Appreciation Rate',
        titleVi: 'MS 3.1 Tốc Độ Tăng Giá Bất Động Sản Mỹ (Housing Appreciation)',
        moduleNumber: 3,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232eTEqeuDHywzxhKw0EUQy7HBhei2NEOIXwbylPUXrZQK3w&playbackInfo=eyJ2aWRlb0lkIjoiZDEzZDQwNDQ1ZGIyNGRhOWE0ZmU3OTU2Y2U2MjY0MTIifQ==',
        summary: 'Lịch sử tăng trưởng giá nhà tại Mỹ và cách tính tỷ suất lợi nhuận ROI từ BĐS.',
        descriptionVi: 'Phân tích dữ liệu lịch sử tăng giá nhà tại Mỹ qua các thập kỷ. Cách đánh giá tiềm năng tăng giá của một khu vực (Location, School District, Job Growth) và tính toán đòn bẩy tài chính khi mua nhà.',
        keyTakeaways: [
          'Mức tăng giá nhà trung bình tại Mỹ trong 30 năm qua',
          'Sức mạnh của đòn bẩy vay ngân hàng trong việc nhân n lần vốn',
          'Các yếu tố quan trọng ảnh hưởng trực tiếp tới giá trị BĐS'
        ],
        actionSteps: [
          'Tra cứu lịch sử giá nhà tại tiểu bang/thành phố bạn sinh sống'
        ],
        resources: [
          { title: 'Báo Cáo Tăng Trưởng Bất Động Sản Theo Tiểu Bang Mỹ.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-3-2',
        slug: 'ms-3-2-credit-score-ltv',
        title: 'MS 3.2 Credit Score & LTV',
        titleVi: 'MS 3.2 Điểm Tín Dụng Vay Nhà & Tỷ Lệ LTV (Loan-to-Value)',
        moduleNumber: 3,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232BSkCWhNQehUFLZ9ZezZ9RhEbP3fyz4b7Haiu0SOTyvS4P&playbackInfo=eyJ2aWRlb0lkIjoiN2ZjNGVkMDA2OWJmNDI0NWIzZGE1N2FmNDRjNWJiYjcifQ==',
        summary: 'Điểm tín dụng cần thiết để có lãi suất tốt và công thức tính LTV.',
        descriptionVi: 'Lãi suất vay mua nhà phụ thuộc rất lớn vào điểm Mortgage Credit Score của bạn. Học cách tính Loan-to-Value (LTV) và tác động của khoản Down Payment đối với điều kiện phê duyệt hồ sơ vay.',
        keyTakeaways: [
          'Sự khác biệt giữa Credit Score thông thường và Mortgage Credit Score',
          'Mức điểm tín dụng để hưởng mức lãi suất vay nhà ưu đãi nhất',
          'Công thức tính LTV và chiến lược Down Payment hợp lý'
        ],
        actionSteps: [
          'Mô phỏng tiền lãi phải trả dựa trên các mức điểm tín dụng khác nhau'
        ],
        resources: [
          { title: 'Bảng Lãi Suất Mua Nhà Dựa Trên Điểm Tín Dụng.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-3-3',
        slug: 'ms-3-3-dti-debt-to-income',
        title: 'MS 3.3 DTI',
        titleVi: 'MS 3.3 Tỷ Lệ Nợ Trên Thu Nhập DTI (Debt-To-Income Ratio)',
        moduleNumber: 3,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232Rar0TQbweFFjUaOIq4MiPsnhprFA5qSoPu8G0NJNaQIfV&playbackInfo=eyJ2aWRlb0lkIjoiYWE0YjBkZmE0N2QyNDFlNzliYjIxYzNkMTczNmJkZWUifQ==',
        summary: 'Chi tiết cách ngân hàng tính Front-End DTI và Back-End DTI để duyệt khoản vay.',
        descriptionVi: 'DTI là chỉ số số 1 mà các Underwriter xem xét khi duyệt khoản vay mua nhà. Hướng dẫn tính Front-End DTI (tiền nhà) và Back-End DTI (tất cả các khoản nợ hàng tháng) để đảm bảo hồ sơ vay luôn mượt mà.',
        keyTakeaways: [
          'Ngưỡng DTI tiêu chuẩn của các khoản vay Conventional (36% - 45%)',
          'Cách làm đẹp chỉ số DTI trước khi nộp đơnPre-Approval 3-6 tháng',
          'Các khoản nợ ẩn (Student Loan, Car Payment, Credit Card) ảnh hưởng DTI thế nào'
        ],
        actionSteps: [
          'Tính chỉ số DTI hiện tại của bạn bằng File Excel trong bài'
        ],
        resources: [
          { title: 'File Excel Tính Chỉ Số DTI Chuẩn Ngân Hàng Mỹ.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-3-4',
        slug: 'ms-3-4-pmi-insurance',
        title: 'MS 3.4 PMI',
        titleVi: 'MS 3.4 Bảo Hiểm Mua Nhà PMI (Private Mortgage Insurance)',
        moduleNumber: 3,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232bZZqqWwRJhOSEb9PhA7AQKJjOa1jZLVApg46V3yn41olM&playbackInfo=eyJ2aWRlb0lkIjoiYmQ1YWRmNWQyMWMxNGI2YWE2ZTM0OGE3OTRkNDcwOGUifQ==',
        summary: 'PMI là gì? Khi nào phải trả PMI và mẹo hủy PMI sớm để tiết kiệm hàng ngàn đô.',
        descriptionVi: 'Khi bạn Down Payment dưới 20%, ngân hàng bắt buộc mua bảo hiểm PMI. Bài học chỉ ra cách tính chi phí PMI hàng tháng và quy trình yêu cầu gỡ bỏ PMI khi giá trị nhà tăng hoặc nợ giảm về 80% LTV.',
        keyTakeaways: [
          'Bản chất PMI bảo vệ ngân hàng chứ không phải bảo vệ người mua nhà',
          'Mức phí PMI dao động từ 0.3% - 1.5% giá trị khoản vay/năm',
          'Độ tuổi nhà & điều kiện để gửi đơn xin hủy bỏ PMI chính thức'
        ],
        actionSteps: [
          'Kiểm tra xem khoản vay nhà hiện tại của bạn có PMI hay không'
        ],
        resources: [
          { title: 'Mẫu Đơn Xin Hủy Bảo Hiểm PMI Gửi Ngân Hàng.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-3-5',
        slug: 'ms-3-5-mortgage-programs',
        title: 'MS 3.5 Mortgage Programs',
        titleVi: 'MS 3.5 Các Chương Trình Vay Mua Nhà: Conventional, FHA, VA, USDA',
        moduleNumber: 3,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232HlWZln9vcJA3v4noiEdY17kHscECervO2oEvJsZWlsBKc&playbackInfo=eyJ2aWRlb0lkIjoiYThmMWU5YjUxNTMyNDFjNjhiYzA0ZDA2OTQzZWU5MjYifQ==',
        summary: 'So sánh ưu nhược điểm các gói vay nhà phổ biến để chọn chương trình tối ưu nhất.',
        descriptionVi: 'Phân tích chi tiết các gói vay phổ biến nhất tại Mỹ: Conventional Loan (truyền thống), FHA Loan (cho người Down thấp), VA Loan (cho quân nhân/cựu chiến binh) và USDA (vùng nông thôn). Cố định 30 năm vs 15 năm.',
        keyTakeaways: [
          'So sánh điều kiện Down Payment, Credit Score giữa Conventional và FHA',
          'Đặc quyền vay 0% Down của VA Loan',
          'So sánh tổng số tiền lãi giữa gói vay 30 năm và 15 năm'
        ],
        actionSteps: [
          'Lựa chọn chương trình vay phù hợp với năng lực tài chính của gia đình'
        ],
        resources: [
          { title: 'Bảng So Sánh Chi Tiết Các Gói Vay Mua Nhà Tại Mỹ.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  },
  {
    id: 4,
    number: 4,
    title: 'Module 4: Tối Ưu Thuế & Tài Khoản Hưu Trí tại Mỹ',
    titleVi: 'Module 4: Tối Ưu Thuế Hợp Pháp & Quản Lý Tài Khoản Hưu Trí',
    description: 'Chiến lược giảm thuế hợp pháp, hiểu rõ Capital Gains, phân biệt Miễn thuế vs Hoãn thuế, và làm chủ 401(k), Roth IRA, Backdoor Roth IRA.',
    lessons: [
      {
        id: 'ms-4-1',
        slug: 'ms-4-1-don-voi-giam-thue',
        title: 'MS 4.1 Đừng Vội Giảm Thuế',
        titleVi: 'MS 4.1 Tư Duy Đúng Về Thuế: Đừng Vội Tìm Cách Giảm Thuế Mù Máng',
        moduleNumber: 4,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232KEmjlePhGG3qCCj08hVTsz9C4dQmallazhYNVnicGxWDA&playbackInfo=eyJ2aWRlb0lkIjoiYjZlOGM4MzYwZjc3NDIzYjg3ZTlmNGY0Y2VlOTljNzYifQ==',
        summary: 'Bài học đắt giá về việc giảm thuế quá đà ảnh hưởng tới việc vay mua nhà và mở rộng tài sản.',
        descriptionVi: 'Rất nhiều người Việt tại Mỹ cố gắng giảm thu nhập báo cáo trên W-2 hoặc 1099 để đóng ít thuế, nhưng hậu quả là không thể vay ngân hàng mua nhà, mua xe hoặc mở doanh nghiệp. Bài học định hình tư duy tối ưu thuế thông minh.',
        keyTakeaways: [
          'Mối quan hệ giữa Thu nhập báo cáo thuế và Khả năng vay ngân hàng (Mortgage)',
          'Sự khác biệt giữa Trốn thuế (Tax Evasion - Phạm pháp) và Tối ưu thuế (Tax Avoidance - Hợp pháp)',
          'Cân bằng giữa tiền đóng thuế hôm nay và cơ hội tài sản tương lai'
        ],
        actionSteps: [
          'Review lại bản khai thuế W-2 / 1099 năm gần nhất'
        ],
        resources: [
          { title: 'Cẩm Nang Quản Lý Thuế & Tín Dụng Dành Cho Chủ Doanh Nghiệp.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-2',
        slug: 'ms-4-2-capital-gains',
        title: 'MS 4.2 Capital Gain Là Gì?',
        titleVi: 'MS 4.2 Thuế Lợi Nhận Vốn (Capital Gains Tax): Short-Term vs Long-Term',
        moduleNumber: 4,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232nE1Ly3FYgeyXBUcgDIEaOVHeJDcd88qTeSgKO3c8EM5ni&playbackInfo=eyJ2aWRlb0lkIjoiMDlmYjdmOGQ3YmI5NDMyYmI0YjA0NTRmMmIxMDkzNjAifQ==',
        summary: 'Phân biệt thuế chênh lệch tài sản ngắn hạn và dài hạn khi bán chứng khoán, nhà cửa.',
        descriptionVi: 'Hiểu rõ cách IRS đánh thuế trên khoản lời khi bạn bán Cổ phiếu, Bất động sản. Sự khác biệt cực lớn giữa Short-Term Capital Gain (dưới 1 năm - tính theo thuế thu nhập thông thường) và Long-Term Capital Gain (trên 1 năm - thuế ưu đãi 0%, 15%, 20%).',
        keyTakeaways: [
          'Mốc thời gian 1 năm quyết định hàng ngàn đô tiền thuế',
          'Khung thuế Long-Term Capital Gain theo mức thu nhập gia đình',
          'Quy tắc miễn thuế $250k/$500k khi bán nhà ở chính (Primary Residence)'
        ],
        actionSteps: [
          'Kiểm tra thời gian nắm giữ các khoản đầu tư trước khi chốt lời'
        ],
        resources: [
          { title: 'Bảng Khung Thuế Capital Gains Mới Nhất IRS.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-3',
        slug: 'ms-4-3-tax-deferred-vs-tax-free',
        title: 'MS 4.3 Lựa Chọn Miễn Thuế hay Hoãn Thuế?',
        titleVi: 'MS 4.3 So Sánh Hoãn Thuế (Tax-Deferred) vs Miễn Thuế (Tax-Free)',
        moduleNumber: 4,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232ACHvF4vm8tTa9b09XRAJPd1hlFnplKTtE5fzdxhg38S8Q&playbackInfo=eyJ2aWRlb0lkIjoiZWM1ZTZkOWFkOTA1NGQ4ZWFiNDVhMjg3YWMyZjg3MTQifQ==',
        summary: 'Đóng thuế bây giờ hay đóng thuế khi về già? Bài toán chiến lược đỉnh cao.',
        descriptionVi: 'Phân tích bản chất của hai nhóm tài khoản hưu trí: Traditional (Được trừ thuế trước, đóng thuế sau khi rút) và Roth (Đóng thuế trước, rút ra hoàn toàn miễn thuế). Lựa chọn phương án dựa trên khung thuế hiện tại và tương lai.',
        keyTakeaways: [
          'Bản chất Traditional (Tax-Deferred) vs Roth (Tax-Free)',
          'Khi nào nên ưu tiên Traditional (khi thu nhập hiện tại ở khung thuế cao)',
          'Khi nào nên ưu tiên Roth (khi thu nhập ở khung thuế thấp hoặc còn trẻ)'
        ],
        actionSteps: [
          'Xác định khung thuế (Tax Bracket) hiện tại của bạn'
        ],
        resources: [
          { title: 'Công Cụ So Sánh Lợi Ích Tài Khoản Traditional vs Roth.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-4-4',
        slug: 'ms-4-4-retirement-accounts',
        title: 'MS 4.4 Retirement Accounts',
        titleVi: 'MS 4.4 Các Loại Tài Khoản Hưu Trí: 401(k), IRA, Roth IRA, SEP IRA',
        moduleNumber: 4,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232GDgLsrwDxZnY7ZQ5B9x5VkU0mxvvtbQoGILc07AT5b8vD&playbackInfo=eyJ2aWRlb0lkIjoiYzFhNzdmZGIwZGUxNDIwOWE5MTFmMGVmOTljNTAzYjIifQ==',
        summary: 'Giải mã toàn bộ các tài khoản hưu trí tại Mỹ và cách lấy trọn tiền Company Match.',
        descriptionVi: 'Toàn tập về các tài khoản hưu trí: 401(k) công ty, Traditional IRA, Roth IRA, SEP-IRA dành cho người làm Self-Employed/1099. Tuyệt chiêu không bao giờ bỏ lỡ "Free Money" từ 401(k) Match.',
        keyTakeaways: [
          '401(k) Company Match là khoản tiền thưởng 100% không thể bỏ qua',
          'Hạn mức bỏ tiền (Contribution Limit) hàng năm cho từng tài khoản',
          'Quy định độ tuổi rút tiền 59.5 tuổi và hình phạt rút sớm'
        ],
        actionSteps: [
          'Kiểm tra tỷ lệ 401(k) Match tại công ty bạn làm việc',
          'Đóng đủ mức tối thiểu để lấy trọn khoản Match'
        ],
        resources: [
          { title: 'Bảng Tổng Hợp Hạn Mức Đóng Tài Khoản Hưu Trí Hàng Năm.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-5',
        slug: 'ms-4-5-qa-retirement-accounts',
        title: 'MS 4.5 Q&A-Retirement Accounts',
        titleVi: 'MS 4.5 Giải Đáp Thắc Mắc (Q&A) Về Tài Khoản Hưu Trí Tại Mỹ',
        moduleNumber: 4,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232wwu3oQjRzq14iMspZhOiyHpuhwv1eFQQycFITOFFUXCJ6&playbackInfo=eyJ2aWRlb0lkIjoiOTU0NGMxYzFmNmI4NDQyN2EzNTJhYzZlZjNkZGFhYjUifQ==',
        summary: 'Tổng hợp các câu hỏi thực tế phổ biến từ học viên Evan Coaching.',
        descriptionVi: 'Coach Evan giải đáp các thắc mắc chuyên sâu: Chuyển việc thì xử lý tài khoản 401(k) cũ thế nào (Rollover), có nên rút tiền 401(k) để mua nhà không, và cách xử lý khi lỡ bỏ quá hạn mức quy định.',
        keyTakeaways: [
          'Cách Rollover 401(k) công ty cũ sang Rollover IRA không dính thuế',
          'Luật rút tiền 401(k)/IRA mua nhà lần đầu (First-Time Homebuyer Rule)',
          'Cách khắc phục khi đóng vượt hạn mức (Excess Contribution)'
        ],
        actionSteps: [
          'Gửi câu hỏi của bạn cho Coach Evan nếu có tình huống riêng'
        ],
        resources: [
          { title: 'Tài Liệu Giải Đáp 20 Câu Hỏi Hưu Trí Phổ Biến Nhất.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-6',
        slug: 'ms-4-6-tax-forms-retirement',
        title: 'MS 4.6 Tax Forms - Retirement Accounts',
        titleVi: 'MS 4.6 Đọc Hiểu Các Mẫu Thuế Hưu Trí: Form 1099-R, 5498, W-2 Box 12',
        moduleNumber: 4,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232J3t8vtqafyRmvIVqYwefOsRzrAs6KKwmwtiRL8mNsV7vx&playbackInfo=eyJ2aWRlb0lkIjoiZTMxNGNkMWJkNTI0NGYyMzhmYTFkZGM3MDYyYTQ0M2QifQ==',
        summary: 'Đọc hiểu giấy tờ khai thuế hưu trí để làm việc hiệu quả với CPA/Kế toán.',
        descriptionVi: 'Hướng dẫn nhận biết và đọc chính xác các mẫu đơn thuế liên quan đến tài khoản hưu trí do broker gửi về hàng năm: Form 1099-R (khi có rút/chuyển tiền) và Form 5498 (báo cáo tiền đóng hưu trí).',
        keyTakeaways: [
          'Ý nghĩa các ký hiệu Code trên Form 1099-R',
          'Cách kiểm tra Box 12 trên W-2 xem tiền 401(k) đã được trừ chuẩn chưa',
          'Cách cung cấp chứng từ chuẩn xác cho CPA mùa khai thuế'
        ],
        actionSteps: [
          'Lưu trữ các mẫu form thuế hưu trí trong thư mục riêng'
        ],
        resources: [
          { title: 'Hướng Dẫn Đọc Form Thuế 1099-R & 5498 Cho Khai Thuế.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-7',
        slug: 'ms-4-7-backdoor-roth-ira',
        title: 'MS 4.7 Backdoor Roth IRA',
        titleVi: 'MS 4.7 Chiến Lược Backdoor Roth IRA Dành Cho Người Thu Nhập Cao',
        moduleNumber: 4,
        lessonNumber: 7,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232gwT0cPmNWtiKtSSiT4RMUAd9SPClR06FX42cckZzwj4nl&playbackInfo=eyJ2aWRlb0lkIjoiNWViNTM0OTY2ODVkNGYzMjgzNmRmZDJlNmExYTcwN2EifQ==',
        summary: 'Cánh cửa hợp pháp bỏ tiền vào Roth IRA kể cả khi thu nhập vượt trần IRS.',
        descriptionVi: 'Khi thu nhập cá nhân/gia đình vượt mốc giới hạn của IRS, bạn không được phép đóng trực tiếp vào Roth IRA. Bài học hướng dẫn kỹ thuật "Cửa Sau" Backdoor Roth IRA hợp pháp và quy tắc Pro-Rata Rule tránh bị đánh thuế oan.',
        keyTakeaways: [
          'Trần thu nhập quy định đối với Roth IRA',
          'Quy trình 2 bước: Bỏ tiền vào Traditional IRA -> Convert sang Roth IRA',
          'Tránh bẫy thuế Pro-Rata Rule khi có sẵn tiền trong Traditional IRA'
        ],
        actionSteps: [
          'Thực hiện các bước Convert Backdoor Roth IRA trên sàn Fidelity/Vanguard'
        ],
        resources: [
          { title: 'Quy Trình 2 Bước Thực Hiện Backdoor Roth IRA Không Lỗi.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 'ms-4-8',
        slug: 'ms-4-8-roth-ira-for-kids',
        title: 'MS 4.8 Roth IRA for Kids',
        titleVi: 'MS 4.8 Mở Tài Khoản Roth IRA Cho Con (Custodial Roth IRA)',
        moduleNumber: 4,
        lessonNumber: 8,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232EwdeBH6ystx3iNgkgKh5un0PdFplZrCYc36aCA7KUuaXW&playbackInfo=eyJ2aWRlb0lkIjoiNjY2NWFhZmVmMmE2NDJkOWE2NTM0NGQyMGQyYmFiMGIifQ==',
        summary: 'Tạo tài sản triệu đô cho con từ khi còn nhỏ bằng sức mạnh thời gian.',
        descriptionVi: 'Món quà tài chính vĩ đại nhất dành cho con cái tại Mỹ. Cách tạo tài khoản Custodial Roth IRA cho con khi con có thu nhập hợp pháp (Earned Income), biến khoản đầu tư vài ngàn đô thành hàng triệu đô khi con nghỉ hưu hoàn toàn miễn thuế.',
        keyTakeaways: [
          'Điều kiện Earned Income bắt buộc của trẻ em',
          'Các công việc hợp pháp tạo thu nhập cho con (mẫu ảnh, việc nhà doanh nghiệp gia đình...)',
          'Sức mạnh lãi kép trong 50 năm dành cho con'
        ],
        actionSteps: [
          'Lập hồ sơ chứng minh Earned Income cho con',
          'Mở tài khoản Fidelity Youth / Custodial Roth IRA'
        ],
        resources: [
          { title: 'Mẫu Sổ Theo Dõi Thu Nhập Earned Income Cho Con.excel', type: 'excel', url: '#' }
        ]
      },
      {
        id: 'ms-4-9',
        slug: 'ms-4-9-tutorial-fidelity-retirement-account',
        title: 'MS 4.9 TUTORIAL Fidelity Retirement Account',
        titleVi: 'MS 4.9 HƯỚNG DẪN: Mở & Quản Lý Tài Khoản Hưu Trí Trên Fidelity',
        moduleNumber: 4,
        lessonNumber: 9,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32329E0MnLOHaA5PWOFG2Xov7nFX1UVEVSgwOktUcZ0PKuSlc&playbackInfo=eyJ2aWRlb0lkIjoiOWQwOWMzYTUwYjFiNDQzNmFiMzE0MmNiOTlmZmJkNzkifQ==',
        summary: 'Thực hành thao tác mở Roth IRA / Traditional IRA thực tế trên Fidelity.',
        descriptionVi: 'Cầm tay chỉ việc trên màn hình mở tài khoản Roth IRA, cài đặt phân bổ quỹ tự động và theo dõi báo cáo đóng góp hưu trí hàng năm trên ứng dụng và giao diện web Fidelity.',
        keyTakeaways: [
          'Thao tác chọn loại tài khoản Roth IRA chính xác',
          'Mua quỹ VOO/FZROX không tốn phí quản lý',
          'Kiểm tra số tiền đã đóng so với hạn mức IRS hằng năm'
        ],
        actionSteps: [
          'Hoàn tất mở tài khoản Roth IRA trên Fidelity',
          'Thiết lập lệnh đầu tư tự động đầu tiên'
        ],
        resources: [
          { title: 'Checklist Cấu Hình Mở Roth IRA Chuẩn Mẫu 2026.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  }
];

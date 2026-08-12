import { CourseModule } from '../types';

export const REAL_ESTATE_MODULES: CourseModule[] = [
  {
    id: 1,
    number: 1,
    title: 'Module 1: Nền Tảng Đầu Tư Bất Động Sản & Nguồn Vốn Vay',
    titleVi: 'Module 1: Cấu Trúc Địa Ốc, Đòn Bẩy Tài Chính & Điểm Tín Dụng',
    description: 'Thấu hiểu nguyên lý vận hành của thị trường bất động sản Mỹ, sức mạnh của đòn bẩy tài chính và điều kiện nền tảng để được cấp khoản vay mua nhà.',
    lessons: [
      {
        id: 're-1-0',
        slug: 're-1-0-loi-mo-dau',
        title: 'RE 1.0 Lời Mở Đầu',
        titleVi: 'RE 1.0 Lời Mở Đầu Khóa Học Real Estate Masterclass',
        moduleNumber: 1,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32320hZjMPowyfu6tZaOn5shcrOJYLasfFtqqT1jiNck4oB6T&playbackInfo=eyJ2aWRlb0lkIjoiYjc2NzJmNTcyZmIwNDhjOGIxNDVjNjZiOGMxNTJhZjcifQ==',
        summary: 'Tổng quan chương trình huấn luyện Real Estate Masterclass cùng Coach Evan.',
        descriptionVi: 'Chào mừng bạn đến với lộ trình Real Estate Masterclass. Bài học mở đầu định hướng tư duy sở hữu bất động sản tại Mỹ, lộ trình 4 module thực chiến từ vay Mortgage, phân tích dòng tiền đến bảo vệ tài sản qua LLC và Trust.',
        keyTakeaways: [
          'Định hình mục tiêu sở hữu nhà ở chính và bất động sản cho thuê tại Mỹ',
          'Nắm vững bức tranh tổng thể lộ trình 26 bài học thực chiến',
          'Cách áp dụng các công cụ tính toán DTI, LTV và ROI BĐS'
        ],
        actionSteps: [
          'Tải Playbook Bất Động Sản Mỹ 2026',
          'Lên kế hoạch học tập cố định hàng tuần'
        ]
      },
      {
        id: 're-1-1',
        slug: 're-1-1-leverage-compound-interest',
        title: 'RE 1.1 Leverage & Compound Interest',
        titleVi: 'RE 1.1 Đòn Bẩy Tài Chính (Leverage) & Lãi Kép Bất Động Sản',
        moduleNumber: 1,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232xVtGwUnL4aYfoIyEElKQ0gwClVL1oer25kGglNDGbGP6Y&playbackInfo=eyJ2aWRlb0lkIjoiZDNjYzkyNTlhZjIxNDlkMGFmY2E0YzMyZTM3NDQwYWMifQ==',
        summary: 'Cách vận dụng đòn bẩy ngân hàng để tạo nên sự tăng trưởng tài sản đột phá.',
        descriptionVi: 'Giải mã lý do Bất động sản là kênh đầu tư duy nhất ngân hàng cho phép bạn vay đến 80-95% giá trị tài sản. Sự kết hợp giữa tốc độ tăng giá nhà (Appreciation) và đòn bẩy tài chính.',
        keyTakeaways: [
          'Khái niệm Leverage (sử dụng tiền người khác - OPM)',
          'So sánh tỷ suất lợi nhuận trên vốn tự có (ROE) khi dùng đòn bẩy',
          'Cách quản trị rủi ro đòn bẩy an toàn trong môi trường biến động'
        ],
        actionSteps: [
          'Tính toán thử ROE với 20% vốn tự có mua căn nhà $500k'
        ]
      },
      {
        id: 're-1-2',
        slug: 're-1-2-nam-cach-tham-gia-vao-dia-oc',
        title: 'RE 1.2 Năm Cách Tham Gia Vào Địa Ốc',
        titleVi: 'RE 1.2 Năm Phương Thức Tham Gia Đầu Tư Bất Động Sản Tại Mỹ',
        moduleNumber: 1,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232qd9N19guvFZtxZ7nGkTUmCjyOmzFsh7eeCRK9crzG9VxY&playbackInfo=eyJ2aWRlb0lkIjoiNjRlNjNjODMzOTI3NDI3MjllODQwMjAyMDAyM2QyMTEifQ==',
        summary: 'Phân tích 5 hình thức: Buy & Hold, Fix & Flip, House Hacking, REITs và Syndication.',
        descriptionVi: 'Phân tích ưu nhược điểm của 5 hình thức tham gia thị trường địa ốc Mỹ giúp bạn chọn đúng chiến lược phù hợp với số vốn, thời gian và mức độ chấp nhận rủi ro của mình.',
        keyTakeaways: [
          'Buy & Hold: Tạo dòng tiền cho thuê bền vững',
          'House Hacking: Mở đầu lý tưởng cho người trẻ/vợ chồng mới cưới',
          'Đầu tư thụ động qua REITs và Syndication không cần quản lý'
        ],
        actionSteps: [
          'Lựa chọn 1 chiến lược trọng tâm phù hợp với nguồn lực hiện có'
        ]
      },
      {
        id: 're-1-3',
        slug: 're-1-3-credit-score-ltv',
        title: 'RE 1.3 Credit Score & LTV',
        titleVi: 'RE 1.3 Điểm Tín Dụng Vay Nhà & Chỉ Số LTV (Loan-To-Value)',
        moduleNumber: 1,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232Aya1Zwu1CPWCBNJKkJy68wZsTsT52L9ybIuS9JT3xGKO0&playbackInfo=eyJ2aWRlb0lkIjoiOTMyMTVjMGVmMTRiNGYxYmIyZjVlNGQ5YWI2OGM4NmMifQ==',
        summary: 'Mối quan hệ giữa điểm Mortgage Credit Score, mức Down Payment và tỷ lệ LTV.',
        descriptionVi: 'Phân tích tiêu chuẩn kiểm tra điểm Mortgage FICO Score của lender khi duyệt khoản vay. Ý nghĩa của LTV và cách chuẩn bị tiền Down Payment để tối ưu mức lãi suất.',
        keyTakeaways: [
          'Mortgage Score vs Credit Score thông thường',
          'Mức LTV tối đa của các gói vay phổ biến',
          'Tác động của LTV tới tiền bảo hiểm và lãi suất vay'
        ],
        actionSteps: [
          'Kiểm tra điểm FICO Score dành cho Mortgage Loan'
        ]
      },
      {
        id: 're-1-4',
        slug: 're-1-4-dti-001',
        title: 'RE 1.4 DTI-001',
        titleVi: 'RE 1.4 Làm Chủ Chỉ Số Tỷ Lệ Nợ DTI (Debt-To-Income)',
        moduleNumber: 1,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232MPT1oMRelWeSc0zSHJsTzj5YJmtxjoJMwxXnpx09MQ8RE&playbackInfo=eyJ2aWRlb0lkIjoiYTBlNDg2YjZiZWRiNDg4Mzg2ZGI5NDc3OWQ2YTdiOTMifQ==',
        summary: 'Cách tính DTI Front-End và Back-End chuẩn quy định Underwriting ngân hàng.',
        descriptionVi: 'Chi tiết bài toán DTI - yếu tố cốt lõi quyết định bạn có thể vay bao nhiêu tiền mua nhà. Tuyệt chiêu giảm DTI nhanh chóng trước khi xin Pre-Approval.',
        keyTakeaways: [
          'Front-End DTI (Housing Ratio) & Back-End DTI (Total Debt Ratio)',
          'Ngưỡng DTI an toàn: 28/36 và ngưỡng tối đa 45-50%',
          'Chiến lược tái cấu trúc nợ trước khi nộp hồ sơ vay'
        ],
        actionSteps: [
          'Sử dụng bảng tính DTI để tính toán hạn mức vay tối đa của gia đình'
        ]
      },
      {
        id: 're-1-5',
        slug: 're-1-5-pmi',
        title: 'RE 1.5 PMI',
        titleVi: 'RE 1.5 Bảo Hiểm Mua Nhà PMI (Private Mortgage Insurance)',
        moduleNumber: 1,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232sziYwfaTIGj8Z139Jtf8G72Qkc3bhkx80D8i1iWwUhgQa&playbackInfo=eyJ2aWRlb0lkIjoiODViY2E3NzVlMmFmNDQyZmE2MDI0NzZmMWVjNzhiMGEifQ==',
        summary: 'Toàn bộ sự thật về PMI, cách tính chi phí và bí quyết gỡ bỏ PMI sớm.',
        descriptionVi: 'Phân tích bản chất của bảo hiểm PMI khi bạn Down Payment dưới 20%. Cách tính phí PMI hàng tháng và hướng dẫn làm việc với lender để tháo bỏ PMI khi nhà tăng giá.',
        keyTakeaways: [
          'Tại sao PMI lại áp dụng cho người mua nhà down thấp',
          'Sự khác biệt giữa PMI của Conventional Loan và MIP của FHA Loan',
          'Các bước yêu cầu Lender gỡ PMI khi LTV đạt mốc 80%'
        ],
        actionSteps: [
          'Kiểm tra hợp đồng vay xem thuộc dạng PMI có thể tháo bỏ hay MIP trọn đời'
        ]
      }
    ]
  },
  {
    id: 2,
    number: 2,
    title: 'Module 2: Chương Trình Vay Mortgage & Chiến Lược Lãi Suất',
    titleVi: 'Module 2: So Sánh Các Gói Vay Mua Nhà & Tối Ưu Lãi Suất',
    description: 'Nắm vững các gói vay Conventional, FHA, VA, ARM, chiến lược đàm phán Mortgage Shopping và khai thác Equity nhà đất.',
    lessons: [
      {
        id: 're-2-1',
        slug: 're-2-1-mortgage-programs',
        title: 'RE 2.1 Mortgage Programs',
        titleVi: 'RE 2.1 Chi Tiết Các Chương Trình Vay: Conventional, FHA, VA Loan',
        moduleNumber: 2,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232oYQEdh8BnD6gGYuLVCHWGfuu4Srw4zWj9ddpC4fATp0Mx&playbackInfo=eyJ2aWRlb0lkIjoiYjZhZjgyNDYxNzNiNDk1OWIzNzBmZWUwNWE0Y2Y2YTEifQ==',
        summary: 'So sánh chuyên sâu các gói vay mua nhà chính thức tại Mỹ.',
        descriptionVi: 'Phân tích tiêu chí xét duyệt, mức Down Payment tối thiểu, bảo hiểm kèm theo và mức lãi suất của Conventional Loan, FHA Loan và VA Loan.',
        keyTakeaways: [
          'Conventional Loan: Tốt nhất cho người có credit 680+ và Down 5-20%',
          'FHA Loan: Giải pháp cho người credit thấp (580+) và Down 3.5%',
          'VA Loan: Đặc quyền vay 0% Down và 0% PMI cho quân nhân'
        ],
        actionSteps: [
          'Đối chiếu tiêu chuẩn bản thân với bảng so sánh gói vay'
        ]
      },
      {
        id: 're-2-2',
        slug: 're-2-2-adjustable-rate-mortgage',
        title: 'RE 2.2 Adjustable Rate Mortgage',
        titleVi: 'RE 2.2 Khoản Vay Lãi Suất Thả Nổi ARM (Adjustable Rate Mortgage)',
        moduleNumber: 2,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232LEeWtpvJeEM5dPfLa9cZIc1xGm5OzT7Y7DjdgYNs3Amxr&playbackInfo=eyJ2aWRlb0lkIjoiYmY0Mzc2YjZjZDAzNGZmMzg4YzAyZDVkZTBhZTMzZDAifQ==',
        summary: 'Phân tích gói vay ARM 5/1, 7/1, 10/1: Cơ hội tiết kiệm lãi vs Rủi ro thả nổi.',
        descriptionVi: 'Khi nào nên chọn vay ARM thay vì vay cố định 30 năm (Fixed Rate)? Giải mã các ký hiệu 5/1 ARM, 7/1 ARM, trần điều chỉnh lãi suất (Caps) và chiến lược Refinance trước khi hết hạn cố định.',
        keyTakeaways: [
          'Cơ chế hoạt động của 5/1, 7/1 ARM',
          'Trần tăng lãi suất (Initial Cap, Periodic Cap, Lifetime Cap)',
          'Kịch bản sử dụng ARM hiệu quả khi có kế hoạch bán nhà trong 5-7 năm'
        ],
        actionSteps: [
          'So sánh mức chênh lệch lãi suất giữa Fixed 30y và 7/1 ARM'
        ]
      },
      {
        id: 're-2-3',
        slug: 're-2-3-mortgage-shopping',
        title: 'RE 2.3 Mortgage Shopping',
        titleVi: 'RE 2.3 Chiến Lược Mortgage Shopping & Đàm Phán Lãi Suất',
        moduleNumber: 2,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232zH7nfafLs2dd65mLg1pnTPhmVsS4yyvkDewkH05UInlzZ&playbackInfo=eyJ2aWRlb0lkIjoiZjlmMTkxMDcwY2EyNDM5OTljMmFmZTllNjhmYzk2NjkifQ==',
        summary: 'Bí quyết so sánh Loan Estimate (LE) giữa các Broker/Lender để có giá tốt nhất.',
        descriptionVi: 'Thao tác so sánh tờ Loan Estimate 3 trang từ nhiều ngân hàng trong cửa sổ 45 ngày (không ảnh hưởng điểm tín dụng). Mẹo đàm phán Lender Credit và Points.',
        keyTakeaways: [
          'Quy tắc 45 ngày Mortgage Rate Shopping không lo rớt FICO Score',
          'Cách đọc Page 2 Loan Estimate: Origination Charges & Closing Costs',
          'Mẹo yêu cầu Lender Match lãi suất đối thủ'
        ],
        actionSteps: [
          'Yêu cầu ít nhất 3 bản Loan Estimate từ 3 đơn vị vay khác nhau'
        ]
      },
      {
        id: 're-2-4',
        slug: 're-2-4-leveraging-equity',
        title: 'RE 2.4 Leveraging Equity',
        titleVi: 'RE 2.4 Khai Thác Vốn Giá Trị Nhà (HELOC & Cash-Out Refinance)',
        moduleNumber: 2,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232SeBbnNXcMbQ2h0zr64EGJNGrBzXWIAaQseFppvBPw67Ki&playbackInfo=eyJ2aWRlb0lkIjoiNmQ0MGUzZjU3YzFkNDIyNmEzODEyZDEwOWQxYzUyMTEifQ==',
        summary: 'Rút tiền từ giá trị căn nhà tăng lên để mua tiếp bất động sản thứ 2, 3.',
        descriptionVi: 'Phân tích 2 công cụ rút vốn phổ biến: Home Equity Line of Credit (HELOC) và Cash-Out Refinance. Cách xoay vòng vốn an toàn để mở rộng danh mục BĐS.',
        keyTakeaways: [
          'So sánh HELOC (thả nổi, rút linh hoạt) vs Cash-Out Refi (cố định)',
          'Tỷ lệ LTV tối đa được cho rút (thường 80% giá trị appraisal)',
          'Nguyên tắc vàng: Chỉ dùng Equity đầu tư vào tài sản sinh lời'
        ],
        actionSteps: [
          'Tính toán số tiền Home Equity hiện có trong căn nhà bạn đang sở hữu'
        ]
      }
    ]
  },
  {
    id: 3,
    number: 3,
    title: 'Module 3: Phân Tích Bất Động Sản, Dòng Tiền & Vận Hành Cho Thuê',
    titleVi: 'Module 3: Chọn Khu Vực, Tính Cash Flow & Vận Hành Trên Zillow',
    description: 'Bí quyết chọn khu vực tăng trưởng cao, phân tích bảng tính dòng tiền cho thuê, quảng cáo và tạo hợp đồng thuê nhà chuẩn pháp lý qua Zillow.',
    lessons: [
      {
        id: 're-3-1',
        slug: 're-3-1-appreciation-vs-cash-flow',
        title: 'RE 3.1 Appreciation vs Cash Flow',
        titleVi: 'RE 3.1 Tăng Giá (Appreciation) vs Dòng Tiền (Cash Flow)',
        moduleNumber: 3,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232kzywMLbjgDz3iZ50GT0ZxxWfp1oTeaWHECTqYB34AivLc&playbackInfo=eyJ2aWRlb0lkIjoiNWRhNWE0MGJlMDJkNDE3NWJkYzFlNWI2ZDgxN2I5MjgifQ==',
        summary: 'Lựa chọn chiến lược tập trung tăng giá trị tài sản hay dòng tiền hàng tháng.',
        descriptionVi: 'Phân tích sự khác biệt giữa thị trường Primary/Secondary (giá nhà cao, cash flow thấp, tăng giá nhanh) vs thị trường Midwest/South (giá rẻ, cash flow tốt, tăng giá chậm).',
        keyTakeaways: [
          'Thế nào là một thị trường Appreciation vs Cash Flow market',
          'Cách kết hợp cả 2 yếu tố trong danh mục tài sản',
          'Quy tắc 1% Rule trong đánh giá nhanh BĐS cho thuê'
        ],
        actionSteps: [
          'Đánh giá tiểu bang bạn ở thuộc nhóm Appreciation hay Cash Flow'
        ]
      },
      {
        id: 're-3-2',
        slug: 're-3-2-tim-hieu-appreciation-rate',
        title: 'RE 3.2 Tim Hiểu Appreciation Rate',
        titleVi: 'RE 3.2 Đo Lường & Dự Phóng Tốc Độ Tăng Giá Nhà Lịch Sử',
        moduleNumber: 3,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232REFJOUbQX1cXrStG78WXqRc2Gq2OFlEWACVFX5bdwxupq&playbackInfo=eyJ2aWRlb0lkIjoiNDY0OTFjNzYwMTkzNDIwYmEzZDcxYTYxM2Y3OGE5MTAifQ==',
        summary: 'Cách dùng công cụ dữ liệu lịch sử để dự phóng giá trị nhà trong 5-10 năm.',
        descriptionVi: 'Hướng dẫn tra cứu chỉ số Case-Shiller Home Price Index, dữ liệu FHFA và Zillow Home Value Index (ZHVI) để đánh giá tốc độ tăng trưởng khu vực.',
        keyTakeaways: [
          'Chỉ số dữ liệu tin cậy để xem lịch sử giá nhà',
          'Yếu tố lạm phát và quy hoạch đô thị ảnh hưởng tới giá nhà',
          'Cách tính giá trị tài sản ròng dự phóng sau 10 năm'
        ],
        actionSteps: [
          'Tra cứu chỉ số ZHVI của Zip code target của bạn'
        ]
      },
      {
        id: 're-3-3',
        slug: 're-3-3-tim-hieu-khu-vuc-neighborhood-scout',
        title: 'RE 3.3 Tìm Hiểu Khu Vực - Neighborhood Scout',
        titleVi: 'RE 3.3 Phân Tích Khu Vực Bằng Công Cụ Neighborhood Scout',
        moduleNumber: 3,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232oUrnvpMY0A8AGbrfHZd7BJiQL44w6XnlW8iapD27QeK7h&playbackInfo=eyJ2aWRlb0lkIjoiNWNkNGE5ODNlZTZmNGFhMzk1YmYxYTRhZGM4YzFmYWQifQ==',
        summary: 'Đánh giá xếp hạng trường học, tỷ lệ tội phạm, thu nhập cư dân và việc làm.',
        descriptionVi: 'Thực hành phân tích một Zip code bằng các công cụ chuyên sâu: NeighborhoodScout, GreatSchools, CrimeMap. Đảm bảo mua đúng căn nhà ở khu vực an toàn và thanh khoản cao.',
        keyTakeaways: [
          'Tầm quan trọng của điểm trường học (School District 8-10★)',
          'Tỷ lệ tội phạm (Crime Rate) và tỷ lệ chủ sở hữu vs người thuê nhà',
          'Xu hướng tăng trưởng việc làm và dân số nhập cư'
        ],
        actionSteps: [
          'Thực hành chấm điểm 1 Zip Code dự định đầu tư'
        ]
      },
      {
        id: 're-3-4',
        slug: 're-3-4-tim-hieu-rental-income-rent-range',
        title: 'RE 3.4 Tim Hiểu Rental Income - Rent Range',
        titleVi: 'RE 3.4 Khảo Sát Giá Cho Thuê Thực Tế (Rentometer & Zillow Rent)',
        moduleNumber: 3,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232cCXHbBuTe2L5KJRQPQJGwA7LypdcnnbBkl53vcY6eMJTk&playbackInfo=eyJ2aWRlb0lkIjoiZTgzYzM2ZGUyMGU2NGVlMDkwNjBiMDQ3NjU3OTI0ZDEifQ==',
        summary: 'Ước tính khoảng giá tiền thuê thực tế dựa trên Comps khu vực xung quanh.',
        descriptionVi: 'Cách định giá tiền thuê chính xác đến từng căn phòng bằng Rentometer, Zillow Rental Manager và HUD Fair Market Rent. Tránh bẫy mua nhà xong không cho thuê được giá kỳ vọng.',
        keyTakeaways: [
          'So sánh Rental Comps cùng số phòng ngủ, phòng tắm và diện tích',
          'Ước tính tỷ lệ trống nhà (Vacancy Rate 5-8%)',
          'Các yếu tố cộng thêm điểm giá thuê (Garage, Yard, Upgraded Kitchen)'
        ],
        actionSteps: [
          'Chạy báo cáo Rentometer thử nghiệm cho 1 địa chỉ cụ thể'
        ]
      },
      {
        id: 're-3-5',
        slug: 're-3-5-your-annual-growth-rate-spread-sheet',
        title: 'RE 3.5 Your Annual Growth Rate & Spread Sheet',
        titleVi: 'RE 3.5 Thực Hành File Excel Phân Tích Dòng Tiền & ROI Bất Động Sản',
        moduleNumber: 3,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232PmjoVyVSyPDQqe601yksOWVh0yS9qcLZjhReiFGEcywxl&playbackInfo=eyJ2aWRlb0lkIjoiYTBkODgxMGY1Y2Y4NDY5YzkzNDE0ODEyMTQwODZlYWUifQ==',
        summary: 'Bảng tính tự động Cap Rate, Cash-on-Cash Return và Net Operating Income (NOI).',
        descriptionVi: 'Cầm tay chỉ việc điền dữ liệu thực tế vào File Excel phân tích BĐS của Evan Coaching. Tính toán chính xác Cash-on-Cash Return, Cap Rate, NOI sau khi trừ toàn bộ chi phí vận hành, bảo trì, hoa hồng.',
        keyTakeaways: [
          'Phân biệt Gross Rent vs Net Operating Income (NOI)',
          'Công thức tính Cash-on-Cash (CoC) Return chuẩn',
          'Tính toán chi phí CapEx, Property Management & Maintenance Reserve'
        ],
        actionSteps: [
          'Tải Bảng Tính Excel BĐS & Nhập dữ liệu 1 căn nhà thực tế trên Zillow'
        ]
      },
      {
        id: 're-3-6',
        slug: 're-3-6-cach-dang-quang-cao-nha-len-zillow',
        title: 'RE 3.6 Cách đăng quảng cáo nhà lên Zillow',
        titleVi: 'RE 3.6 HƯỚNG DẪN: Đăng Tin Cho Thuê Nhà Chuyên Nghiệp Trên Zillow',
        moduleNumber: 3,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32324ZWScvjY8ppm1eVShOnOv5B9Op5RyoJLj77ZprwpGpjzQ&playbackInfo=eyJ2aWRlb0lkIjoiYmY3YmE2NzU0ZDQ3NDdkNThlYzE4YzMwZjY4MmVkY2UifQ==',
        summary: 'Thao tác tạo tin đăng, chụp hình hấp dẫn và tối ưu từ khóa thu hút người thuê tốt.',
        descriptionVi: 'Hướng dẫn từng bước trên giao diện Zillow Rental Manager: Đặt tiêu đề, mô tả tiêu chuẩn người thuê, chụp ảnh ánh sáng chuẩn và cài đặt tính năng đặt lịch Open House / Showing tự động.',
        keyTakeaways: [
          'Bí quyết chụp ảnh thu hút lượt xem gấp 3 lần',
          'Viết mô tả tiêu chuẩn nhà đất rõ ràng đúng luật Fair Housing Act',
          'Cài đặt tự động trả lời người quan tâm'
        ],
        actionSteps: [
          'Đăng nhập Zillow Rental Manager và chuẩn bị tin đăng mẫu'
        ]
      },
      {
        id: 're-3-7',
        slug: 're-3-7-cach-tao-hop-dong-thue-nha-bang-zillow',
        title: 'RE 3.7 Cách tạo hợp đồng thuê nhà bằng Zillow',
        titleVi: 'RE 3.7 HƯỚNG DẪN: Tạo Hợp Đồng Lease Agreement Chuẩn Pháp Lý Trên Zillow',
        moduleNumber: 3,
        lessonNumber: 7,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE32320SubkhtT7lRxHzcaMZryuWFKdW1Ish3um7SAhm9c6YX9b&playbackInfo=eyJ2aWRlb0lkIjoiNTQwNjFhYWYwOGFmNDgyYWI2ZjJhZjk0MjNjYzk3NjIifQ==',
        summary: 'Tạo mẫu hợp đồng thuê nhà trực tuyến, gửi ký e-signature và thu tiền cọc.',
        descriptionVi: 'Sử dụng Zillow Rental Builder để tạo hợp đồng cho thuê tuân thủ luật nhà đất của từng tiểu bang Mỹ. Thêm các điều khoản bảo vệ chủ nhà (Pet Policy, Late Fee, Maintenance Limit) và gửi ký điện tử.',
        keyTakeaways: [
          'Thêm các clause quan trọng bảo vệ tài sản của chủ nhà',
          'Quy định về tiền Security Deposit theo luật tiểu bang',
          'Thao tác e-signature nhanh chóng và lưu trữ đám mây'
        ],
        actionSteps: [
          'Tạo một bản hợp đồng Lease nháp trên Zillow để xem các điều khoản'
        ]
      },
      {
        id: 're-3-8',
        slug: 're-3-8-background-credit-check',
        title: 'RE 3.8 Background & Credit Check',
        titleVi: 'RE 3.8 Kiểm Tra Lịch Sử Tín Dụng & Lý Lịch Người Thuê (Tenant Screening)',
        moduleNumber: 3,
        lessonNumber: 8,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232iFq9KvHtF5H79rXTPJKlp5WRon1ZuLRZVxUXVeDnXWnF1&playbackInfo=eyJ2aWRlb0lkIjoiYTcyYTE5OWVlOGQzNGY6NWI0ZTQwNzM3YTFkZmM4NDQifQ==',
        summary: 'Quy trình chọn lọc Tenant chất lượng: Credit check, Eviction history & Proof of Income.',
        descriptionVi: 'Chọn đúng người thuê quyết định 90% thành bại của đầu tư BĐS cho thuê. Hướng dẫn đọc báo cáo Credit Score, kiểm tra tiền án tiền sự (Criminal Record), lịch sử bị đuổi nhà (Eviction) và xác minh thu nhập W2/Paystubs.',
        keyTakeaways: [
          'Tiêu chuẩn Tenant chuẩn: FICO 650+, Thu nhập gấp 3 lần tiền nhà (3x Rent)',
          'Đọc hiểu Eviction Report để loại bỏ rủi ro xị nợ',
          'Liên hệ kiểm tra với chủ nhà cũ (Previous Landlord Reference)'
        ],
        actionSteps: [
          'Thiết lập tiêu chí Tenant Selection Criteria bằng văn bản'
        ]
      }
    ]
  },
  {
    id: 4,
    number: 4,
    title: 'Module 4: Bảo Vệ Tài Sản, Cấu Trúc Pháp Lý LLC & Thuế Bất Động Sản',
    titleVi: 'Module 4: Bảo Hiểm, Thành Lập LLC, Living Trust & Thuế BĐS Mỹ',
    description: 'Bảo vệ tài sản gia đình chống kiện tụng, quy trình thành lập LLC, Land Trust, Will & Living Trust và tối ưu thuế khấu hao BĐS.',
    lessons: [
      {
        id: 're-4-1',
        slug: 're-4-1-home-insurance-umbrella-insurance',
        title: 'RE 4.1 Home Insurance & Umbrella Insurance',
        titleVi: 'RE 4.1 Bảo Hiểm Nhà (Homeowners Insurance) & Bảo Hiểm Dù (Umbrella Insurance)',
        moduleNumber: 4,
        lessonNumber: 1,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232Dmjrf906stFZPZH13MDCqchbBESLtQU98864OfluEgcnN&playbackInfo=eyJ2aWRlb0lkIjoiNjA5ODE1MGYzMzJhNDFjODkwM2M0MGJlYjBmZjExODEifQ==',
        summary: 'Xây dựng lá chắn bảo vệ tài sản gia đình trước các rủi ro hư hỏng và tai nạn kiện tụng.',
        descriptionVi: 'Phân biệt Bảo hiểm nhà ở Dwelling DP-3 vs HO-3. Tại sao khi có nhiều tài sản BĐS bạn bắt buộc phải mua Umbrella Insurance gói 1 - 2 triệu đô với chi phí vô cùng rẻ.',
        keyTakeaways: [
          'Bảo vệ trách nhiệm pháp lý (Liability Coverage) khi có tai nạn xảy ra',
          'Sức mạnh của Umbrella Insurance bọc lót cho tất cả xe cộ & nhà cửa',
          'Cách chọn mức Deductible tối ưu tiền phí bảo hiểm'
        ],
        actionSteps: [
          'Hỏi quote gói Umbrella Insurance 1M từ hãng bảo hiểm hiện tại'
        ]
      },
      {
        id: 're-4-2',
        slug: 're-4-2-thanh-lap-llc',
        title: 'RE 4.2 Thành Lập LLC',
        titleVi: 'RE 4.2 HƯỚNG DẪN: Quy Trình Thành Lập Công Ty LLC Bảo Vệ Bất Động Sản',
        moduleNumber: 4,
        lessonNumber: 2,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232nWMoV8olUIBFDN95N0sLlUdeCj4V0Vam7FbVRdgLBI9LK&playbackInfo=eyJ2aWRlb0lkIjoiNjMzNjE3NmM2Nzg0NDgxMjg1MTEyNDc1YWVjNGQ0ZmEifQ==',
        summary: 'Tách biệt tài sản cá nhân và tài sản kinh doanh BĐS bằng mô hình LLC.',
        descriptionVi: 'Hướng dẫn khi nào nên lập LLC cho BĐS cho thuê. Quy trình đăng ký Articles of Organization, lấy mã EIN từ IRS, mở tài khoản ngân hàng Business và giữ vững Corporate Veil.',
        keyTakeaways: [
          'Lợi ích cách ly rủi ro kiện tụng của Limited Liability Company',
          'Nên lập LLC ở tiểu bang chứa nhà hay Wyoming/Delaware',
          'Tránh phá vỡ màn che công ty (Piercing the Corporate Veil)'
        ],
        actionSteps: [
          'Xem hướng dẫn nộp đơn LLC trên Secretary of State'
        ]
      },
      {
        id: 're-4-3',
        slug: 're-4-3-land-trust',
        title: 'RE 4.3 Land Trust',
        titleVi: 'RE 4.3 Giữ Bảo Mật Danh Tính Mua Nhà Bằng Land Trust',
        moduleNumber: 4,
        lessonNumber: 3,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232d9Nigj4Ji8GDvdMISDtzavezjLKmzU9kogHG69zTExUje&playbackInfo=eyJ2aWRlb0lkIjoiNGU5ZTI4OTc0MjM5NDU5ZDllOGVmODBjYjk3ZTY4YzUifQ==',
        summary: 'Cấu trúc ẩn tên chủ sở hữu thật trên báo cáo Public Record của thành phố.',
        descriptionVi: 'Tìm hiểu về mô hình Land Trust giúp ẩn danh tên cá nhân khỏi các trang web tra cứu nhà công cộng, tránh bị nhắm đến bởi các vụ kiện tụng vô lý.',
        keyTakeaways: [
          'Cấu trúc Grantor, Trustee, Beneficiary trong Land Trust',
          'Kết hợp Land Trust làm Owner và LLC làm Beneficiary',
          'Tránh vi phạm điều khoản Due-on-Sale Clause của ngân hàng'
        ],
        actionSteps: [
          'Đánh giá tính riêng tư tài sản nhà đất của bạn hiện tại'
        ]
      },
      {
        id: 're-4-4',
        slug: 're-4-4-equity-stripping',
        title: 'RE 4.4 Equity Stripping',
        titleVi: 'RE 4.4 Chiến Lược Equity Stripping Bảo Vệ Giá Trị Nhà',
        moduleNumber: 4,
        lessonNumber: 4,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232MJSsm7ORowudwuBQNPFoT7ilj3qiFsxES7mK407tSybO8&playbackInfo=eyJ2aWRlb0lkIjoiYTdkNzVmZTlkYmU1NDU3MmE3NWU1NzI4MDkxODAyMDMifQ==',
        summary: 'Kỹ thuật làm giảm giá trị thặng dư ảo trên giấy tờ để vô hiệu hóa các vụ kiện.',
        descriptionVi: 'Chiến lược bảo vệ tài sản nâng cao: Đặt Lien hoặc thế chấp khoản vay trên căn nhà khiến kẻ kiện tụng thấy không còn Equity để đòi bồi thường.',
        keyTakeaways: [
          'Thế nào là Equity Stripping hợp pháp',
          'Tạo khoản thế chấp giữa các entity riêng biệt',
          'Khi nào nên áp dụng chiến lược nâng cao này'
        ],
        actionSteps: [
          'Tham khảo ý kiến luật sư tài sản khi có từ 3 BĐS trở lên'
        ]
      },
      {
        id: 're-4-5',
        slug: 're-4-5-bon-cach-dung-ten-nha',
        title: 'RE 4.5 Bốn Cách Đứng Tên Nhà',
        titleVi: 'RE 4.5 Bốn Hình Thức Đứng Tên Sở Hữu Nhà (Title Ownership) Tại Mỹ',
        moduleNumber: 4,
        lessonNumber: 5,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232wuXuGvtsUaEin1oK1sACQyEpsjBLqVzpqnZ2nnKdiDQlR&playbackInfo=eyJ2aWRlb0lkIjoiNDQzNmU0MmEzMDE4NDU4Y2I1NGY2ZTliNDRmZGZhMDIifQ==',
        summary: 'Sole Ownership, Joint Tenancy, Tenancy in Common & Community Property.',
        descriptionVi: 'Phân tích kỹ 4 phương thức đứng tên trên Title/Deed. Quyền thừa kế tự động (Right of Survivorship) khi vợ/chồng qua đời và cách tránh thủ tục tòa án Probate đắt đỏ.',
        keyTakeaways: [
          'Joint Tenancy with Right of Survivorship: Tự động chuyển tên cho người sống sót',
          'Tenancy in Common: Phù hợp khi hùn vốn mua chung với bạn bè/đối tác',
          'Luật Tài sản chung vợ chồng (Community Property) tại các tiểu bang như CA, TX, WA'
        ],
        actionSteps: [
          'Kiểm tra lại tờ Deed căn nhà hiện tại xem đang đứng tên dạng nào'
        ]
      },
      {
        id: 're-4-6',
        slug: 're-4-6-will-living-trust',
        title: 'RE 4.6 Will & Living Trust',
        titleVi: 'RE 4.6 Di Chúc (Will) & Quỹ Ủy Thác Gia Đình (Living Trust)',
        moduleNumber: 4,
        lessonNumber: 6,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232lbWXBbOGJ7u5a2dSXavLEfK2j2Rao7Yc6DrIqR5NlCMrH&playbackInfo=eyJ2aWRlb0lkIjoiY2Y1NDE4OGI2NDhiNGJiODg0OGI1MTFjNWU3NDM3OGYifQ==',
        summary: 'Bảo vệ gia sản, tránh tòa án Probate và chuyển giao tài sản êm đẹp cho con cháu.',
        descriptionVi: 'Sự khác biệt sinh tử giữa Di chúc (Will - vẫn phải qua tòa Probate tốn 3-7% phí) và Living Trust (Revocable Living Trust - sang tên ngay lập tức không tốn phí tòa).',
        keyTakeaways: [
          'Tòa án Probate Court ngốn nhiều tiền và kéo dài 1-2 năm thế nào',
          'Cách Funding Trust: Chuyển tên nhà từ cá nhân sang Revocable Living Trust',
          'Ủy quyền y tế và tài chính (Power of Attorney) đi kèm trong bộ Trust'
        ],
        actionSteps: [
          'Lập kế hoạch tạo Living Trust cho gia đình nếu sở hữu nhà đất'
        ]
      },
      {
        id: 're-4-7',
        slug: 're-4-7-personal-business-tax',
        title: 'RE 4.7 Personal & Business Tax',
        titleVi: 'RE 4.7 Tối Ưu Thuế Bất Động Sản: Khấu Hao (Depreciation) & 1031 Exchange',
        moduleNumber: 4,
        lessonNumber: 7,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232pKL6DGz0mwTGJcHetQht8YRlnCALD0zA4Qx6xyDFQH8fO&playbackInfo=eyJ2aWRlb0lkIjoiMjUxYWFkZTk0ZjM0NGRhMDk1NTQwN2JiYzFmOGNlMzAifQ==',
        summary: 'Lợi ích thuế tuyệt vời của BĐS: Khấu hao nhà 27.5 năm và hoãn thuế trọn đời 1031 Exchange.',
        descriptionVi: 'Học cách tính khấu hao phần xác nhà (Depreciation over 27.5 years) để biến dòng tiền dương thành "lỗ trên giấy tờ" không phải đóng thuế. Bí quyết hoãn thuế khi bán nhà đổi nhà lớn hơn qua 1031 Exchange.',
        keyTakeaways: [
          'Công thức tính Depreciation trừ vào tiền thu nhập cho thuê hàng năm',
          'Các chi phí được trừ thuế (Mortgage Interest, Property Tax, Repair, Travel)',
          'Quy tắc 45 ngày chỉ định và 180 ngày hoàn tất của 1031 Exchange'
        ],
        actionSteps: [
          'Xem Schedule E trên bản khai thuế năm trước để kiểm tra mục Depreciation'
        ]
      },
      {
        id: 're-4-8',
        slug: 're-4-8-chao-tam-biet',
        title: 'RE 4.8 Chào Tạm Biệt',
        titleVi: 'RE 4.8 Tổng Kết & Lời Chào Tạm Biệt Từ Coach Evan',
        moduleNumber: 4,
        lessonNumber: 8,
        videoUrl: 'https://player.vdocipher.com/v2/?otp=20160313versASE3232ZQIf1HxTZlNN8iW0yhVJoEDyAAJNMbidK8uO0PUUB5vfG&playbackInfo=eyJ2aWRlb0lkIjoiOTdmNDU3MThiZDQ4NGI4OTk3MmUzZTM1NmIyMjJkYTAifQ==',
        summary: 'Tổng kết hành trình Real Estate Masterclass và định hướng bước đi tiếp theo.',
        descriptionVi: 'Coach Evan tổng kết lại toàn bộ kiến thức từ đòn bẩy, làm đẹp hồ sơ vay, săn nhà dòng tiền đến bảo vệ di sản gia đình. Lời chúc thành công trên con đường tự do tài chính qua bất động sản Mỹ.',
        keyTakeaways: [
          'Kiến thức chỉ có giá trị khi đi đôi với hành động',
          'Luôn tuân thủ quy tắc quản trị rủi ro dòng tiền',
          'Kết nối cùng cộng đồng học viên Evan Coaching'
        ],
        actionSteps: [
          'Hoàn thành bài kiểm tra tổng hợp và nhận chứng nhận hoàn thành khóa học'
        ]
      }
    ]
  }
];

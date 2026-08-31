export interface RecordingChapter {
  id: string;
  sessionNumber: number;
  sessionLabel: string;
  code: string;
  /** Seek target in seconds */
  seconds: number;
  timestampLabel: string;
  originalTitle: string;
  /** Sidebar label: Code - Original Title */
  title: string;
  suggestedTitle: string;
  summary: string;
}

/** Chapters for Real Estate live recordings — from List REL (1).csv */
export const RE_RECORDING_CHAPTERS: RecordingChapter[] = 
[
  {
    "id": "re-1-0",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.0",
    "seconds": 0,
    "timestampLabel": "0:00",
    "originalTitle": "Lời Mở Đầu",
    "title": "RE 1.0 - Lời Mở Đầu",
    "suggestedTitle": "RE 1.0 - Lời Mở Đầu: Giới Thiệu Khóa Học & 4 Kênh Tài Sản Sinh Lời Tại Mỹ",
    "summary": "Giới thiệu giảng viên Evan, mục tiêu khóa học Real Estate cho người làm công ăn lương/ngoài nghề; so sánh 4 kênh tài sản (Trái phiếu/Tiền gửi 1-4%, Vàng 8%, Cổ phiếu 8-10%, Bất động sản 4.5% + Đòn bẩy); giới thiệu hệ thống slide và nền tảng e-learning."
  },
  {
    "id": "re-1-1",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.1",
    "seconds": 1305,
    "timestampLabel": "21:45",
    "originalTitle": "Leverage & Compound Interest",
    "title": "RE 1.1 - Leverage & Compound Interest",
    "suggestedTitle": "RE 1.1 - Đòn Bẩy Tài Chính (Leverage), Lãi Kép & 3 Chiến Lược Đầu Tư (Cash Flow, Appreciation, Hybrid)",
    "summary": "Phân tích bản chất đòn bẩy tài chính (Leverage / OPM - Other People's Money) trong BĐS so với chứng khoán; tỷ suất sinh lời thực tế của Investor (8% - 12%/năm); sức mạnh lãi kép (Compound Interest); phân tích chi tiết 3 chiến lược đầu tư: Dòng tiền (Cash Flow), Tăng vốn (Appreciation), Cân bằng (Hybrid) qua các thị trường thực tế."
  },
  {
    "id": "re-1-2",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.2",
    "seconds": 6339,
    "timestampLabel": "1:45:39",
    "originalTitle": "Năm Cách Tham Gia Vào Địa Ốc",
    "title": "RE 1.2 - Năm Cách Tham Gia Vào Địa Ốc",
    "suggestedTitle": "RE 1.2 - 5 Phương Pháp & Mô Hình Kiếm Tiền Từ Thị Trường Bất Động Sản Mỹ",
    "summary": "Phân tích 5 mô hình kiếm tiền từ địa ốc: (1) Mua và cho thuê dài hạn (Buy & Hold Long-term), (2) BRRRR (Mua nhà nát sửa cho thuê - Buy, Rehab, Rent, Refinance, Repeat), (3) Đầu tư thụ động qua quỹ tín thác BĐS (Fundrise / REITs), (4) Sửa nhà bán lại (Fix & Flip), (5) Mua bán chênh lệch sỉ (Wholesaling)."
  },
  {
    "id": "re-1-3",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.3",
    "seconds": 7473,
    "timestampLabel": "2:04:33",
    "originalTitle": "Credit Score & LTV",
    "title": "RE 1.3 - Credit Score & LTV",
    "suggestedTitle": "RE 1.3 - Điểm Tín Dụng FICO & 4 Tiêu Chuẩn Thẩm Định Hồ Sơ Vay Của Ngân Hàng",
    "summary": "Phân tích 4 điều kiện cốt lõi mà Lender xét duyệt khi cho vay mua nhà: (1) Lịch sử tín dụng FICO (<620, 620-680, 700, 740+), (2) Khả năng chi trả hàng tháng, (3) Tỷ lệ vay trên giá trị tài sản LTV (Loan-To-Value), (4) Khoản vốn tự có (Down Payment)."
  },
  {
    "id": "re-1-4",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.4",
    "seconds": 7960,
    "timestampLabel": "2:12:40",
    "originalTitle": "DTI-001",
    "title": "RE 1.4 - DTI-001",
    "suggestedTitle": "RE 1.4 - Chỉ Số Nợ DTI (Debt-to-Income) & Cách Tính Thu Nhập Vay (W-2, 1099, LLC S-Corp)",
    "summary": "Phân tích chỉ số DTI (Debt-to-Income) tối đa 50% và vòng tròn thu nhập trước thuế hàng tháng (Pretax Monthly Income). Hướng dẫn cách tính thu nhập thẩm định cho 3 nhóm: W-2 Employee (Base + Overtime + Bonus 2 năm), 1099 / Sole Proprietor (Schedule C Line 31 trung bình 24 tháng), LLC S-Corp (Form 1120-S & W-2 cá nhân). Cảnh báo tác hại của nợ xe và nợ thẻ tín dụng."
  },
  {
    "id": "re-1-5",
    "sessionNumber": 1,
    "sessionLabel": "Buổi 1",
    "code": "RE 1.5",
    "seconds": 10818,
    "timestampLabel": "3:00:18",
    "originalTitle": "PMI",
    "title": "RE 1.5 - PMI",
    "suggestedTitle": "RE 1.5 - Phân Loại 3 Nhóm Mortgage (Full Doc, Non-QM, No Doc) & Cơ Chế Bảo Hiểm PMI",
    "summary": "Giới thiệu 3 nhóm Mortgage chính: Full Doc (Conventional & Government Loans FHA/VA/USDA), Alternative Doc (Non-QM), No Doc (Private/Hard Money). Cơ chế áp dụng bảo hiểm thế chấp tư nhân PMI khi Down Payment < 20% và Q&A tổng kết Buổi 1."
  },
  {
    "id": "re-2-1",
    "sessionNumber": 2,
    "sessionLabel": "Buổi 2",
    "code": "RE 2.1",
    "seconds": 9,
    "timestampLabel": "0:09",
    "originalTitle": "Mortgage Programs",
    "title": "RE 2.1 - Mortgage Programs",
    "suggestedTitle": "RE 2.1 - Toàn Diện Các Gói Vay: Conventional, FHA, VA, USDA, Non-QM & DSCR Loan",
    "summary": "So sánh toàn diện các chương trình vay: Conventional Loan (mua Primary Home Down 3%-5%, ở 12 tháng chuyển thành Rental, cảnh báo Mortgage Fraud), FHA Loan (3.5% down, đóng PMI 11 năm/suốt đời), VA Loan (0% down cựu chiến binh), USDA Loan (0% down vùng ven), Non-QM Loans (1099, P&L CPA, Bank Statement 24 tháng) và DSCR Loan (Debt Service Coverage Ratio - tự tài sản trả nợ, không xét thu nhập cá nhân)."
  },
  {
    "id": "re-2-3",
    "sessionNumber": 2,
    "sessionLabel": "Buổi 2",
    "code": "RE 2.3",
    "seconds": 9037,
    "timestampLabel": "2:30:37",
    "originalTitle": "Mortgage Shopping",
    "title": "RE 2.3 - Mortgage Shopping",
    "suggestedTitle": "RE 2.3 - Bí Quyết So Sánh Loan Estimate, Đàm Phán Lãi Suất & Phí Đóng Hồ Sơ (Closing Costs)",
    "summary": "Quy trình đấu giá hồ sơ vay qua Mortgage Broker (230 lenders), cách đọc và so sánh biểu mẫu Loan Estimate: Phân tích Section A (Origination charges, Underwriting fee, Discount points), tính điểm hòa vốn (Break-even point khi trả phí mua lãi suất thấp), phí hoa hồng Broker (Lender-paid vs Borrower-paid), và dự trù tổng chi phí đóng hồ sơ Closing Costs (3%-5% giá trị nhà)."
  },
  {
    "id": "re-2-2",
    "sessionNumber": 2,
    "sessionLabel": "Buổi 2",
    "code": "RE 2.2",
    "seconds": 11231,
    "timestampLabel": "3:07:11",
    "originalTitle": "Adjustable Rate Mortgage",
    "title": "RE 2.2 - Adjustable Rate Mortgage",
    "suggestedTitle": "RE 2.2 - Lãi Suất Thả Nổi (ARM) vs Lãi Suất Cố Định: Chiến Lược Tối Ưu Chi Phí Lãi Vay",
    "summary": "Phân tích cơ chế lãi suất cố định (Fixed Rate) vs lãi suất thả nổi (ARM - Adjustable Rate Mortgage: 5/1 ARM, 7/1 ARM). Chiến lược tận dụng ARM có lãi suất khuyến mãi thấp hơn Fixed 1%-2% để tiết kiệm hàng trăm ngàn USD chi phí lãi vay trong chu kỳ nắm giữ 5-7 năm."
  },
  {
    "id": "re-2-4",
    "sessionNumber": 2,
    "sessionLabel": "Buổi 2",
    "code": "RE 2.4",
    "seconds": 11500,
    "timestampLabel": "3:11:40",
    "originalTitle": "Leveraging Equity",
    "title": "RE 2.4 - Leveraging Equity",
    "suggestedTitle": "RE 2.4 - Chiến Lược Rút Vốn Chủ Sở Hữu (Cash-Out Refi, Home Equity Loan, HELOC) & Nhà Đẻ Nhà",
    "summary": "Kỹ thuật rút vốn chủ sở hữu (Equity) và chiến lược Nhà Đẻ Nhà (House-hack & Repeat) qua 3 công cụ: (1) Cash-Out Refinance (chỉ nên dùng khi lãi suất mới thấp hơn hoặc bằng nợ cũ), (2) Home Equity Loan (khoản vay thứ 2 cố định khi nợ cũ có lãi suất rất thấp), (3) HELOC (thẻ tín dụng bảo đảm bằng nhà, draw period 10 năm, rủi ro lãi suất thả nổi). Quy trình dùng vốn Equity mua căn nhà thứ 2 và Q&A thẩm định hồ sơ thực tế tại Nevada."
  },
  {
    "id": "re-3-1",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.1",
    "seconds": 10,
    "timestampLabel": "0:10",
    "originalTitle": "Appreciation vs Cash Flow",
    "title": "RE 3.1 - Appreciation vs Cash Flow",
    "suggestedTitle": "RE 3.1 - Chiến Lược Lựa Chọn Thị Trường: Dòng Tiền (Cash Flow) vs Tăng Vốn (Appreciation)",
    "summary": "So sánh sâu 3 chiến lược: Cash Flow, Appreciation, Hybrid. Tại sao người mới bắt đầu nên chọn Hybrid/Appreciation để tích lũy tài sản nhanh thay vì chạy theo vài trăm USD dòng tiền ban đầu. Tiêu chí đánh giá thương vụ BĐS: Phân tích bản đồ thị trường (Market) và lựa chọn căn nhà cụ thể (Property selection), quy tắc khoanh vùng bán kính 50 dặm (1-3 giờ lái xe)."
  },
  {
    "id": "re-3-2",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.2",
    "seconds": 1327,
    "timestampLabel": "22:07",
    "originalTitle": "Tim Hiểu Appreciation Rate",
    "title": "RE 3.2 - Tim Hiểu Appreciation Rate",
    "suggestedTitle": "RE 3.2 - Đo Lường Tỷ Lệ Tăng Trưởng Giá (Appreciation Rate) Qua Bản Đồ Dữ Liệu Liên Bang (FHFA)",
    "summary": "Hướng dẫn sử dụng công cụ nghiên cứu dữ liệu lịch sử tăng giá BĐS của Federal Government (FHFA Housing Data Map) từ năm 1990 (chu kỳ 36 năm). Thực hành tra cứu theo Zip Code và dùng máy tính CAGR quy đổi tổng % tăng giá 36 năm thành tỷ lệ tăng trưởng bình quân hàng năm (%/năm: <4% Cash flow, 4-5% Hybrid, >5% High Appreciation)."
  },
  {
    "id": "re-3-3",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.3",
    "seconds": 3260,
    "timestampLabel": "54:20",
    "originalTitle": "Tìm Hiểu Khu Vực - Neighborhood Scout",
    "title": "RE 3.3 - Tìm Hiểu Khu Vực - Neighborhood Scout",
    "suggestedTitle": "RE 3.3 - Phân Tích Nhân Khẩu Học & Chỉ Số An Toàn Khu Vực (NeighborhoodScout, 1% Rule, Vacancy Rate)",
    "summary": "Nghiên cứu thị trường chuyên sâu với phần mềm dữ liệu BĐS ($19/tháng / NeighborhoodScout), quy tắc 1% Rule (Rent-to-Price ratio), tỷ lệ người thuê Renters vs Homeowners (50/50 là chuẩn đẹp), thu nhập trung vị Median Household Income, tỷ lệ bỏ trống Vacancy Rate (<7% an toàn, >10% rủi ro cao) và tỷ lệ nghèo đói Poverty Rate."
  },
  {
    "id": "re-3-4",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.4",
    "seconds": 4920,
    "timestampLabel": "1:22:00",
    "originalTitle": "Tim Hiểu Rental Income - Rent Range",
    "title": "RE 3.4 - Tim Hiểu Rental Income - Rent Range",
    "suggestedTitle": "RE 3.4 - Checklist Tiêu Chuẩn Chọn Nhà Cho Thuê & Thẩm Định Giá Thuê Bằng RentRange",
    "summary": "Checklist tiêu chí chọn căn nhà cho thuê tối ưu trên Redfin/Zillow (phân khúc giá trung bình, layout 3B/2B hoặc 4B/2B, ưu tiên kết cấu móng/mái/HVAC hơn nội thất mỹ nghệ, tránh over-upgrade). Sử dụng báo cáo RentRange ($14/report) của Property Manager để thẩm định giá thuê thực tế, Days on Market, Confidence Score so sánh với Zestimate."
  },
  {
    "id": "re-3-5",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.5",
    "seconds": 6506,
    "timestampLabel": "1:48:26",
    "originalTitle": "Your Annual Growth Rate & Spread Sheet",
    "title": "RE 3.5 - Your Annual Growth Rate & Spread Sheet",
    "suggestedTitle": "RE 3.5 - Xây Dựng Bảng Tính Tài Chính BĐS 20 Năm, Tính Tỷ Suất Sinh Lời (CAGR / ROE) & Cap Rate",
    "summary": "Thực hành bảng tính BĐS toàn diện (Spreadsheet Slide 42): Nhập giá mua $268k, tiền thuê $1,800, chi phí quản lý 10%, bảo trì 10%, nợ gốc còn lại sau 20 năm ($116k), chi phí vận hành suốt 20 năm ($154k) -> Vốn ban đầu $61.6k nở thành $335k ròng (CAGR = 8.84%/năm). Mô phỏng bài toán nhà $1M tại thị trường tăng giá cao & chuyển đổi sang Multi-Family/Commercial BĐS dòng tiền (Cap Rate 5%-8.7% trên LoopNet)."
  },
  {
    "id": "re-3-6",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.6",
    "seconds": 11920,
    "timestampLabel": "3:18:40",
    "originalTitle": "Cách đăng quảng cáo nhà lên Zillow",
    "title": "RE 3.6 - Cách đăng quảng cáo nhà lên Zillow",
    "suggestedTitle": "RE 3.6 - Quy Trình Đăng Tin & Tiếp Thị Cho Thuê Trên Zillow Rental Manager",
    "summary": "Quy trình đăng tin cho thuê chuyên nghiệp trên Zillow Rental Manager: Kỹ thuật chụp ảnh, quay video, dùng AI viết mô tả thu hút và trả phí quảng cáo Zillow để tiếp cận khách thuê chất lượng cao."
  },
  {
    "id": "re-3-7",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.7",
    "seconds": 12041,
    "timestampLabel": "3:20:41",
    "originalTitle": "Cách tạo hợp đồng thuê nhà bằng Zillow",
    "title": "RE 3.7 - Cách tạo hợp đồng thuê nhà bằng Zillow",
    "suggestedTitle": "RE 3.7 - Soạn Thảo Hợp Đồng Thuê Nhà (Lease Agreement) Chuẩn Pháp Lý Trên Zillow",
    "summary": "Hướng dẫn tạo Hợp đồng thuê nhà điện tử (Lease Agreement) chuẩn pháp lý từng tiểu bang hoàn toàn miễn phí trên Zillow chỉ trong 15 phút, bổ sung các điều khoản bảo vệ chủ nhà."
  },
  {
    "id": "re-3-8",
    "sessionNumber": 3,
    "sessionLabel": "Buổi 3",
    "code": "RE 3.8",
    "seconds": 12133,
    "timestampLabel": "3:22:13",
    "originalTitle": "Background & Credit Check",
    "title": "RE 3.8 - Background & Credit Check",
    "suggestedTitle": "RE 3.8 - Quy Trình Thẩm Định & Kiểm Tra Lý Lịch (Credit, Criminal, Eviction Check) Khách Thuê",
    "summary": "Bộ tiêu chuẩn sàng lọc khách thuê an toàn: Thu nhập gấp 2-3 lần tiền thuê (Income 3x Rent Rule), nghề nghiệp ổn định, điểm tín dụng Credit Score. Sử dụng dịch vụ TenantBackgroundSearch / TransUnion ($35) kiểm tra toàn diện: Báo cáo tín dụng, Tiền án tiền sự (Criminal record), Lịch sử phá sản (Bankruptcy) và Lịch sử bị trục xuất (Eviction history)."
  },
  {
    "id": "re-4-1",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.1",
    "seconds": 8,
    "timestampLabel": "0:08",
    "originalTitle": "Ôn tập hệ thống 4 bước",
    "title": "RE 4.1 - Ôn tập hệ thống 4 bước",
    "suggestedTitle": "RE 4.1 - Ôn tập hệ thống 4 bước",
    "summary": "(Ôn tập & Phân tích Case Study): Ôn tập hệ thống 4 bước từ buổi 3 và phân tích thực tế căn nhà của học viên Vincent tại Reno, Nevada (Zip 89502, mua giá $672,000, phân tích chiến lược Hybrid và tính toán dòng tiền âm)."
  },
  {
    "id": "re-4-2",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.2",
    "seconds": 2016,
    "timestampLabel": "33:36",
    "originalTitle": "Home Insurance & Umbrella Insurance",
    "title": "RE 4.2 - Home Insurance & Umbrella Insurance",
    "suggestedTitle": "RE 4.2 - Phòng Ngừa Rủi Ro Kiện Tụng: Bảo Hiểm Nhà (Landlord Policy) & Bảo Hiểm Umbrella ($1M-$5M)",
    "summary": "Phân tích 2 nguồn rủi ro kiện tụng pháp lý lớn nhất của chủ nhà (Khách thuê kiện vs Mối quan hệ cá nhân kiện). Cấu trúc 6 phần bảo hiểm nhà (Section A-F), tối ưu Section D (Personal Liability), mua bảo hiểm trách nhiệm mở rộng Umbrella Insurance ($1M - $5M) làm lá chắn bảo vệ tài sản toàn diện với chi phí thấp."
  },
  {
    "id": "re-4-3",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.3",
    "seconds": 3350,
    "timestampLabel": "55:50",
    "originalTitle": "Thành Lập LLC",
    "title": "RE 4.3 - Thành Lập LLC",
    "suggestedTitle": "RE 4.3 - Cấu Trúc Pháp Nhân LLC: 7 Bước Chuẩn Đưa Bất Động Sản Vào Công Ty TNHH",
    "summary": "Bản chất công ty TNHH (Limited Liability Company - LLC) nhằm giới hạn trách nhiệm pháp lý, ngăn chặn rủi ro mất tài sản cá nhân. 7 Bước chuyển nhà cho thuê vào LLC: (1) Xin phép Lender, (2) Đăng ký LLC với tiểu bang, (3) Soạn Operating Agreement tùy chỉnh qua luật sư, (4) Xin mã số thuế EIN, (5) Chuyển chủ quyền qua Deed tại Recorder Office, (6) Cập nhật Lease Agreement đứng tên LLC, (7) Mở Business Checking Account riêng biệt. Quy tắc: Mỗi căn nhà cho thuê là 1 LLC riêng biệt."
  },
  {
    "id": "re-4-4",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.4",
    "seconds": 6442,
    "timestampLabel": "1:47:22",
    "originalTitle": "Land Trust",
    "title": "RE 4.4 - Land Trust",
    "suggestedTitle": "RE 4.4 - Chiến Lược Ẩn Danh Tài Sản Với Quỹ Tín Thác Đất Đai (Land Trust) & Wyoming LLC",
    "summary": "Rủi ro lộ danh tính chủ sở hữu trên hồ sơ công khai (Public Records tại Recorder Office). Cấu trúc Quỹ tín thác đất đai (Land Trust) gồm 3 nhân tố (Grantor, Trustee, Beneficiary). Chiến lược Ẩn danh (Anonymity): Kết hợp Land Trust với Anonymous LLC tại 4 tiểu bang bảo mật (Wyoming, Delaware, Nevada, New Mexico) làm Trustee và thành lập Property Management LLC tại tiểu bang sở tại để quản lý vận hành hợp pháp mà không để lộ tên chủ sở hữu."
  },
  {
    "id": "re-4-6",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.6",
    "seconds": 8086,
    "timestampLabel": "2:14:46",
    "originalTitle": "Equity Stripping",
    "title": "RE 4.6 - Equity Stripping",
    "suggestedTitle": "RE 4.5 - Chiến Thuật Equity Stripping (Tạo Nợ Ảo Hợp Pháp): Biến Tài Sản Thành Không Có Vốn Ròng Để Kiện",
    "summary": "Chiến lược \"Appear Broke\" (Xuất hiện nghèo nàn / Triệt tiêu vốn ròng trên giấy tờ): Thiết lập công ty cho vay thứ 2 tại Wyoming, ghi nợ thế chấp (Recorded Liens / Promissory Notes) lên căn nhà -> Xóa sạch vốn ròng (Zero Equity) trên hồ sơ công khai khiến các đơn kiện nhắm vào người giàu bị triệt tiêu từ đầu."
  },
  {
    "id": "re-4-5",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.5",
    "seconds": 8970,
    "timestampLabel": "2:29:30",
    "originalTitle": "Will & Living Trust",
    "title": "RE 4.5 - Will & Living Trust",
    "suggestedTitle": "RE 4.6 - Hoạch Định Thừa Kế: So Sánh Di Chúc (Will) & Quỹ Tín Thác Sinh Thời (Living Trust) Tránh Án Phí Probate",
    "summary": "Hoạch định thừa kế (Estate Planning): Rủi ro khi tài sản phải qua thủ tục tòa án thừa kế Probate (tốn 5% giá trị tài sản, kéo dài 6-24 tháng, lộ thông tin công khai). So sánh Di chúc (Will - vẫn dính Probate) vs Quỹ tín thác sinh thời (Revocable Living Trust - chuyển giao tài sản tức thì, bảo mật tuyệt đối, tránh hoàn toàn Probate)."
  },
  {
    "id": "re-4-7",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.7",
    "seconds": 9898,
    "timestampLabel": "2:44:58",
    "originalTitle": "Bốn Cách Đứng Tên Nhà",
    "title": "RE 4.7 - Bốn Cách Đứng Tên Nhà",
    "suggestedTitle": "RE 4.7 - 4 Hình Thức Đứng Tên Sở Hữu Nhà (Sole, Joint Tenancy, TIC, Community Property) & Homestead Exemption",
    "summary": "Luật Homestead Exemption bảo vệ nhà ở chính theo từng tiểu bang (Florida, Texas unlimited; California $743k, Nevada $605k). So sánh chi tiết 4 hình thức nắm giữ quyền sở hữu (Title Holding Methods): Sole Ownership, Tenancy in Common (TIC - sở hữu theo tỷ lệ không đều, di sản độc lập), Joint Tenancy with Right of Survivorship (sở hữu 50/50, tự động chuyển cho người còn sống), Community Property (Tài sản chung vợ chồng trong hôn nhân tại CA, TX)."
  },
  {
    "id": "re-4-8",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.8",
    "seconds": 10455,
    "timestampLabel": "2:54:15",
    "originalTitle": "Personal & Business Tax",
    "title": "RE 4.8 - Personal & Business Tax",
    "suggestedTitle": "RE 4.8 - Tối Ưu Thuế BĐS: Khấu Hao 27.5 Năm, Quy Tắc Section 121 ($500k Miễn Thuế), Hoãn Thuế 1031 Exchange & Step-Up in Basis",
    "summary": "Toàn diện về Thuế BĐS cá nhân & Doanh nghiệp: Khấu trừ thuế hàng năm (Itemized Deduction Schedule A cho nhà ở, Schedule E + Khấu hao 27.5 năm Depreciation cho nhà cho thuê đưa thuế về $0/Net Loss); Bán nhà ở chính (Quy tắc Section 121 miễn thuế $250k độc thân / $500k vợ chồng / $750k nếu có con trên title, chiến lược Tax Harvesting); Bán nhà cho thuê (Thuế Capital Gains Tax 0%, 15%, 20% + State tax + 3.8% NIIT); Hoãn thuế 1031 Exchange (đổi nhà trong 45/180 ngày qua Qualified Intermediary); Xóa thuế vĩnh viễn qua Step-Up in Basis theo triết lý \"Buy, Borrow, Die\"."
  },
  {
    "id": "re-4-9",
    "sessionNumber": 4,
    "sessionLabel": "Buổi 4",
    "code": "RE 4.9",
    "seconds": 15706,
    "timestampLabel": "4:21:46",
    "originalTitle": "Chào Tạm Biệt",
    "title": "RE 4.9 - Chào Tạm Biệt",
    "suggestedTitle": "RE 4.9 - Tổng Kết Khóa Học: Triết Lý Buy, Borrow, Die, Xử Lý Tranh Chấp & Lộ Trình Hành Động Thực Chiến",
    "summary": "Tổng kết triết lý tài chính \"Buy, Borrow, Die\"; xử lý các tình huống tranh chấp thực tế (đồng sở hữu, co-signer, assumption, refinance); xây dựng lộ trình hành động thực chiến và tổng kết bế mạc khóa học."
  }
] as RecordingChapter[];

export function chaptersForSession(sessionNumber: number): RecordingChapter[] {
  return RE_RECORDING_CHAPTERS.filter((c) => c.sessionNumber === sessionNumber);
}

export interface CourseTool {
  name: string;
  url: string;
  purpose: string;
}

export interface CourseToolSection {
  category: string;
  items: CourseTool[];
}

/** Tool links from MSL-Links.xlsx / REL-Links.xlsx */
export const COURSE_TOOLS: Record<string, CourseToolSection[]> = {
  'ms-2026': [
    {
      category: "Quỹ Đầu tư, Chứng khoán & Chỉ số Tài chính (Index Funds & Platforms)",
      items: [
        {
          name: "Fidelity 500 Index (FXAIX)",
          url: "https://finance.yahoo.com/quote/FXAIX",
          purpose: "Tra cứu hiệu suất quỹ chỉ số S&P 500 của Fidelity.",
        },
        {
          name: "Vanguard Total Stock (VTSAX)",
          url: "https://finance.yahoo.com/quote/VTSAX",
          purpose: "Tra cứu quỹ chỉ số toàn bộ thị trường chứng khoán Mỹ của Vanguard.",
        },
        {
          name: "Vanguard 500 Index (VFIAX)",
          url: "https://finance.yahoo.com/quote/VFIAX",
          purpose: "Tra cứu quỹ chỉ số S&P 500 hàng đầu của Vanguard.",
        },
        {
          name: "Fidelity Total Market (FSKAX)",
          url: "https://finance.yahoo.com/quote/FSKAX",
          purpose: "Tra cứu quỹ chỉ số toàn thị trường Mỹ của Fidelity.",
        },
        {
          name: "Schwab S&P 500 Index (SWPPX)",
          url: "https://finance.yahoo.com/quote/SWPPX",
          purpose: "Tra cứu quỹ chỉ số S&P 500 của Charles Schwab.",
        },
        {
          name: "Fidelity ZERO Extended (FZIPX)",
          url: "https://finance.yahoo.com/quote/FZIPX",
          purpose: "Tra cứu quỹ chỉ số mở rộng 0% phí quản lý của Fidelity.",
        },
        {
          name: "Fidelity Nasdaq Index (FNCMX)",
          url: "https://finance.yahoo.com/quote/FNCMX",
          purpose: "Tra cứu quỹ chỉ số tổng hợp công nghệ Nasdaq của Fidelity.",
        },
        {
          name: "Vanguard Russell 2000 (VTWO)",
          url: "https://finance.yahoo.com/quote/VTWO",
          purpose: "Tra cứu quỹ ETF chỉ số 2,000 công ty vừa và nhỏ của Vanguard.",
        },
        {
          name: "Schwab Small Company (SFSNX)",
          url: "https://finance.yahoo.com/quote/SFSNX",
          purpose: "Tra cứu quỹ chỉ số doanh nghiệp nhỏ của Charles Schwab.",
        },
        {
          name: "Vanguard Official Site",
          url: "https://investor.vanguard.com",
          purpose: "Nền tảng mở tài khoản & quản lý quỹ đầu tư Vanguard.",
        },
        {
          name: "Fidelity Official Site",
          url: "https://fidelity.com",
          purpose: "Nền tảng mở tài khoản đầu tư & hưu trí Fidelity.",
        },
        {
          name: "TD Ameritrade / Schwab",
          url: "https://tdameritrade.com",
          purpose: "Nền tảng giao dịch chứng khoán TD Ameritrade (Schwab).",
        },
      ],
    },
    {
      category: "Dữ liệu Kinh tế Vĩ mô & Bất động sản (Macroeconomic Data)",
      items: [
        {
          name: "FRED St. Louis Fed Data",
          url: "https://fred.stlouisfed.org",
          purpose: "Dữ liệu kinh tế vĩ mô chính thức từ Cục Dự trữ Liên bang Mỹ (FED).",
        },
        {
          name: "Visual Capitalist HPI Map",
          url: "https://visualcapitalist.com/house-prices",
          purpose: "Bản đồ trực quan hóa tốc độ tăng trưởng giá nhà theo từng tiểu bang.",
        },
      ],
    },
    {
      category: "Công cụ Tính toán Tài chính & Lãi suất Kép (Financial Calculators)",
      items: [
        {
          name: "The Calculator Site CAGR",
          url: "https://thecalculatorsite.com/cagr",
          purpose: "Máy tính tỷ lệ tăng trưởng kép hàng năm (CAGR Calculator).",
        },
        {
          name: "Evan Coaching Compound",
          url: "https://compound.evancoaching.net",
          purpose: "Công cụ tính toán sức mạnh lãi suất kép của Evan Coaching.",
        },
      ],
    },
    {
      category: "Thẻ Tín dụng & Xây dựng Điểm Tín dụng (Credit Cards & Credit Score Tools)",
      items: [
        {
          name: "Chase Sapphire Preferred",
          url: "https://creditcards.chase.com",
          purpose: "Thẻ tín dụng tích điểm du lịch & thưởng cao cấp Chase Sapphire.",
        },
        {
          name: "Chase Card Referral",
          url: "https://referyourchasecard.com",
          purpose: "Đường dẫn giới thiệu mở thẻ tín dụng thưởng của Chase.",
        },
        {
          name: "Citi Custom Cash Card",
          url: "https://nerdwallet.com/citi-custom-cash",
          purpose: "Thẻ tín dụng Cash-back 5% danh mục chi tiêu cao nhất.",
        },
        {
          name: "Citi Double Cash Card",
          url: "https://nerdwallet.com/citi-double-cash",
          purpose: "Thẻ tín dụng Cash-back 2% phẳng cho mọi giao dịch.",
        },
        {
          name: "Chase Freedom Unlimited",
          url: "https://nerdwallet.com/chase-freedom",
          purpose: "Thẻ tín dụng linh hoạt tích điểm & cash-back 1.5%+.",
        },
        {
          name: "Wells Fargo Active Cash",
          url: "https://nerdwallet.com/wells-fargo-active-cash",
          purpose: "Thẻ tín dụng Cash-back 2% phẳng của Wells Fargo.",
        },
        {
          name: "BofA Unlimited Cash Back",
          url: "https://bankofamerica.com/credit-cards",
          purpose: "Thẻ tín dụng Cash-back hoàn tiền của Bank of America.",
        },
        {
          name: "Equifax Credit Quiz & Tools",
          url: "https://equifax.com/personal",
          purpose: "Trang kiểm tra & công cụ quản lý điểm tín dụng Equifax.",
        },
        {
          name: "Amazon Help Page",
          url: "https://amazon.com/help",
          purpose: "Trang hướng dẫn điều khoản thanh toán/mua sắm trên Amazon.",
        },
      ],
    },
    {
      category: "Công cụ Vay thế chấp Bất động sản (Mortgage Tools)",
      items: [
        {
          name: "Loan Factory Rate Quote",
          url: "https://loanfactory.com/home/qm",
          purpose: "Tra cứu và báo lãi suất nợ vay thế chấp QM & Non-QM.",
        },
        {
          name: "Loan Factory Affordability",
          url: "https://loanfactory.com/mortgage-calculator",
          purpose: "Máy tính ước tính khả năng vay nợ và khoản trả hàng tháng.",
        },
        {
          name: "Loan Factory Income Calc",
          url: "https://loanfactory.com/mortgage_calculator",
          purpose: "Tính toán thu nhập qualify hồ sơ nợ vay ngân hàng.",
        },
        {
          name: "Mortgage News Daily",
          url: "https://mortgagenewsdaily.com",
          purpose: "Cập nhật diễn biến lãi suất nợ vay thế chấp hàng ngày tại Mỹ.",
        },
        {
          name: "NerdWallet PMI Calculator",
          url: "https://nerdwallet.com/pmi-calculator",
          purpose: "Tính phí bảo hiểm khoản vay (Private Mortgage Insurance).",
        },
      ],
    },
    {
      category: "Kênh Thông tin, Mạng xã hội & Học viên (Evan Coaching Official Links)",
      items: [
        {
          name: "Evan Coaching Main Site",
          url: "https://evancoaching.net",
          purpose: "Trang chủ chính thức của chương trình Masterclass Evan Coaching.",
        },
        {
          name: "Evan Coaching Disclaimer",
          url: "https://evancoaching.net/disclaimer",
          purpose: "Tuyên bố miễn trừ trách nhiệm về tư vấn tài chính & pháp lý.",
        },
        {
          name: "Group Chat Học Viên",
          url: "https://messenger.com/group-chat",
          purpose: "Kênh Messenger Group Chat riêng cho học viên lớp Masterclass REL.",
        },
        {
          name: "YouTube Nhà Để Nhà - USA",
          url: "https://youtube.com/@NhaDeNha-USA",
          purpose: "Kênh YouTube chính thức chia sẻ video kiến thức BĐS Mỹ.",
        },
        {
          name: "YouTube Short Video",
          url: "https://youtube.com/shorts/3fSw0OLjPgw",
          purpose: "Video ngắn minh họa bài học trong slide.",
        },
        {
          name: "TikTok @coachingbyevan",
          url: "https://tiktok.com/@coachingbyevan",
          purpose: "Kênh TikTok chia sẻ mẹo và kiến thức ngắn về địa ốc.",
        },
        {
          name: "LinkedIn Evan Coaching",
          url: "https://linkedin.com/in/evancoaching",
          purpose: "Trang cá nhân chuyên nghiệp của Coach Evan trên LinkedIn.",
        },
      ],
    },
  ],
  're-2026': [
    {
      category: "Công cụ Tính toán Khoản vay & Tài chính (Mortgage & Financial Calculators)",
      items: [
        {
          name: "Evan Coaching Affordability",
          url: "https://afford.evancoaching.net",
          purpose: "Công cụ tính khả năng tài chính & sức mua nhà tối đa.",
        },
        {
          name: "Evan Coaching Compound Interest",
          url: "https://compound.evancoaching.net",
          purpose: "Công cụ tính toán sức mạnh của lãi suất kép theo thời gian.",
        },
        {
          name: "Evan Coaching Mortgage Calc",
          url: "https://mortgage.evancoaching.net",
          purpose: "Tính chi tiết tiền trả hàng tháng (PITI) cho khoản vay thế chấp.",
        },
        {
          name: "MoneyChimp Compound Interest",
          url: "https://moneychimp.com/compound",
          purpose: "Máy tính lãi suất kép trực tuyến của MoneyChimp.",
        },
        {
          name: "MoneyChimp Discount Rate",
          url: "https://moneychimp.com/discount",
          purpose: "Máy tính tỷ lệ chiết khấu dòng tiền (Discount Rate).",
        },
        {
          name: "Loan Factory Rate Quote",
          url: "https://loanfactory.com/home/qm",
          purpose: "Tra cứu và báo lãi suất nợ vay thế chấp QM & Non-QM.",
        },
        {
          name: "Loan Factory Affordability",
          url: "https://loanfactory.com/mortgage-calculator",
          purpose: "Máy tính ước tính khoản vay và khả năng chi trả.",
        },
        {
          name: "Loan Factory Income Calc",
          url: "https://loanfactory.com/mortgage_calculator",
          purpose: "Tính toán thu nhập qualify hồ sơ nợ vay ngân hàng.",
        },
        {
          name: "NerdWallet PMI Calculator",
          url: "https://nerdwallet.com/pmi-calculator",
          purpose: "Tính chi phí bảo hiểm khoản vay (Private Mortgage Insurance).",
        },
        {
          name: "Dr. Calculator Mortgage",
          url: "https://drcalculator.com/mortgage",
          purpose: "Tính chi tiết lịch trình trả nợ vay (Amortization Schedule).",
        },
      ],
    },
    {
      category: "Công cụ Phân tích Thị trường & Tìm kiếm BĐS (Market Research & Property Tools)",
      items: [
        {
          name: "LoopNet",
          url: "https://loopnet.com",
          purpose: "Sàn tìm kiếm & phân tích BĐS thương mại (Commercial Real Estate).",
        },
        {
          name: "Roofstock",
          url: "https://roofstock.com",
          purpose: "Sàn giao dịch BĐS nhà ở Single-Family đã có sẵn người thuê.",
        },
        {
          name: "NeighborhoodScout",
          url: "https://neighborhoodscout.com",
          purpose: "Tra cứu dữ liệu khu vực: Tội phạm, trường học, giá nhà, dân số.",
        },
        {
          name: "FHFA House Price Index",
          url: "https://fhfa.gov/hpi-zip5-map",
          purpose: "Bản đồ chỉ số tăng giá nhà theo mã Zipcode từ cơ quan FHFA.",
        },
        {
          name: "RentRange",
          url: "https://rentrange.com",
          purpose: "Công cụ định giá và dự báo giá tiền thuê nhà (Rent Rate Estimate).",
        },
        {
          name: "Mortgage News Daily",
          url: "https://mortgagenewsdaily.com",
          purpose: "Cập nhật biến động lãi suất Mortgage theo thời gian thực hàng ngày.",
        },
        {
          name: "BiggerPockets",
          url: "https://biggerpockets.com",
          purpose: "Diễn đàn & cộng đồng đầu tư bất động sản lớn nhất tại Mỹ.",
        },
      ],
    },
    {
      category: "Quản lý Bất động sản & Người thuê (Property & Tenant Management)",
      items: [
        {
          name: "Zillow Rental Manager",
          url: "https://zillow.com/rental-manager",
          purpose: "Đăng tin cho thuê, làm hợp đồng & tự động thu tiền nhà hàng tháng.",
        },
        {
          name: "Tenant Background Search",
          url: "https://tenantbackgroundsearch.com",
          purpose: "Kiểm tra lý lịch, điểm tín dụng và lịch sử thuê của tenant.",
        },
        {
          name: "PMI Property Management",
          url: "https://propertymanagementinc.com",
          purpose: "Dịch vụ quản lý bất động sản chuyên nghiệp dành cho chủ nhà.",
        },
      ],
    },
    {
      category: "Thuế, Pháp lý & Quỹ Đầu tư (Tax, Legal & Investment Entities)",
      items: [
        {
          name: "REPIT (Real Estate Tax)",
          url: "https://repit.org",
          purpose: "Trang tra cứu & công cụ tính thuế Real Estate Professional Status (REPS).",
        },
        {
          name: "SmartAsset Income Tax",
          url: "https://smartasset.com/taxes",
          purpose: "Tính thuế thu nhập cá nhân chi tiết theo từng tiểu bang ở Mỹ.",
        },
        {
          name: "Lawyers Limited",
          url: "https://lawyerslimited.com",
          purpose: "Dịch vụ tư vấn pháp lý & thành lập công ty/entity bảo vệ tài sản.",
        },
        {
          name: "Fundrise",
          url: "https://fundrise.com",
          purpose: "Nền tảng đầu tư quỹ bất động sản trực tuyến (REITs/REIGs).",
        },
      ],
    },
    {
      category: "Kênh Thông tin, Mạng xã hội & Học viên (Evan Coaching Official Links)",
      items: [
        {
          name: "Evan Coaching Main Site",
          url: "https://evancoaching.net",
          purpose: "Trang chủ chính thức của chương trình Masterclass Evan Coaching.",
        },
        {
          name: "Evan Coaching Disclaimer",
          url: "https://evancoaching.net/disclaimer",
          purpose: "Tuyên bố miễn trừ trách nhiệm về tư vấn tài chính & pháp lý.",
        },
        {
          name: "Group Chat Học Viên",
          url: "https://messenger.com/group-chat",
          purpose: "Kênh Messenger Group Chat riêng cho học viên lớp Masterclass REL.",
        },
        {
          name: "YouTube Nhà Để Nhà - USA",
          url: "https://youtube.com/@NhaDeNha-USA",
          purpose: "Kênh YouTube chính thức chia sẻ video kiến thức BĐS Mỹ.",
        },
        {
          name: "YouTube Short Video",
          url: "https://youtube.com/shorts/3fSw0OLjPgw",
          purpose: "Video ngắn minh họa bài học trong slide.",
        },
        {
          name: "TikTok @coachingbyevan",
          url: "https://tiktok.com/@coachingbyevan",
          purpose: "Kênh TikTok chia sẻ mẹo và kiến thức ngắn về địa ốc.",
        },
        {
          name: "LinkedIn Evan Coaching",
          url: "https://linkedin.com/in/evancoaching",
          purpose: "Trang cá nhân chuyên nghiệp của Coach Evan trên LinkedIn.",
        },
      ],
    },
  ],
};

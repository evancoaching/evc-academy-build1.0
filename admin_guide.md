# Hướng Dẫn Quản Trị Hệ Thống Evan Coaching Academy

Tài liệu hướng dẫn dành cho **Admin / Coach Evan** để quản trị danh sách học viên, cấp quyền khóa học và đồng bộ dữ liệu 2 chiều (Học Viên & Bài Học Video) qua Google Sheets.

---

## 🗺️ Cấu Trúc Các Nhánh Trang (Routes)

Hệ thống được tổ chức thành các trang riêng biệt:

- **`/login`**: Trang Đăng nhập & Đăng ký tài khoản học viên.
- **`/classes`**: Danh mục toàn bộ khóa học (*Money Skills 2026*, *Real Estate 2026*,...).
- **`/classroom`**: Lớp học trực tuyến chuẩn Skool (Video bài giảng VdoCipher, tóm tắt, tài liệu đính kèm và đánh dấu hoàn thành).
- **`/resources`**: Kho tài liệu học tập, file PDF, bảng tính tài chính đính kèm.
- **`/dashboard`**: Bảng điều khiển Quản trị viên (Chỉ Admin mới có quyền truy cập):
  - Quản lý danh sách học viên (Duyệt nhanh 1-click, Cấp/Hủy quyền khóa học, Khóa/Mở khóa tài khoản).
  - Nút **Settings (Cài Đặt Đồng Bộ)** mở bảng điều khiển Webhook 2 chiều.

---

## 🚀 Hướng Dẫn Đồng Bộ Dữ Liệu 2 Chiều Bằng Google Apps Script Webhook

Giải pháp **Google Apps Script Webhook** cho phép đồng bộ **2 chiều (Đọc và Ghi)** cả 2 tab `students` (Học viên) và `lessons` (Bài học video) trực tiếp mà **không cần đăng nhập Google OAuth** và **không bao giờ bị lỗi 403 / Access Blocked**.

### 🛠️ 3 Bước Cài Đặt Trên Google Sheet:

1. **Mở Google Sheet**:
   - Mở file Google Sheet quản trị của bạn.
   - Vào menu **Tiện ích mở rộng (Extensions)** → **Apps Script**.

2. **Dán Mã Nguồn**:
   - Xóa toàn bộ nội dung cũ trong editor và dán đoạn mã bên dưới.
   - Bấm **Lưu (Save / icon 💾)**.

3. **Triển Khai (Deploy) Web App**:
   - Bấm nút **Triển khai (Deploy)** ở góc trên bên phải → Chọn **Tùy chọn triển khai mới (New deployment)**.
   - Chọn loại: **Ứng dụng web (Web app)**.
   - Mục **Mô tả (Description)**: `Evan Coaching Sync Webhook`.
   - Mục **Thực thi dưới dạng (Execute as)**: `Tôi (My account)`.
   - Mục **Ai có quyền truy cập (Who has access)**: Chọn **Bất kỳ ai (Anyone)**.
   - Bấm **Triển khai (Deploy)** → Cấp quyền truy cập nếu Google hỏi → Sao chép đường dẫn **Web App URL** (`https://script.google.com/macros/s/.../exec`).

4. **Kết Nối Trên Web**:
   - Truy cập trang Admin: `/dashboard`.
   - Bấm nút **⚙️ Cài Đặt Đồng Bộ (Settings)**.
   - Dán Web App URL vào ô cấu hình.
   - Bấm **📥 Tải Về Từ Sheet (Pull)** hoặc **📤 Đẩy Lên Sheet (Push)** để đồng bộ 2 chiều!

---

## 📜 Mã Nguồn Google Apps Script Chuẩn (2 Tab: `students` & `lessons`)

```javascript
// Google Apps Script Đồng Bộ 2 Chiều (Không cần OAuth / Không bị lỗi 403)
// Quản lý cả 2 Tab: "students" (Học Viên) & "lessons" (Bài Học Video)

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Quản lý Tab Học Viên (students)
  var studentSheet = findSheetByName(ss, ["students", "Students", "Học Viên", "HocVien", "users"]);
  if (!studentSheet) studentSheet = ss.getSheets()[0];
  var students = parseStudentsFromSheet(studentSheet);

  // 2. Quản lý Tab Bài Học Video (lessons)
  var lessonSheet = findSheetByName(ss, ["lessons", "Lessons", "LESSONS", "baihoc", "Bài Học", "BaiHoc", "Video", "Danh Sách Bài Học"]);
  if (!lessonSheet && ss.getSheets().length > 1) {
    lessonSheet = ss.getSheets()[1];
  }
  var lessons = [];
  if (lessonSheet) {
    lessons = parseLessonsFromSheet(lessonSheet);
  }

  var result = {
    success: true,
    sheetName: ss.getName(),
    studentsCount: students.length,
    lessonsCount: lessons.length,
    students: students,
    lessons: lessons
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Ghi Tab students
    if (data.students && Array.isArray(data.students)) {
      var sSheet = findSheetByName(ss, ["students", "Students"]) || ss.insertSheet("students");
      sSheet.clear();
      var sRows = [
        ['Email', 'Họ Và Tên', 'Quyền Hạn', 'Trạng Thái', 'Khóa Học Đã Đăng Ký', 'Ngày Duyệt']
      ];
      for (var i = 0; i < data.students.length; i++) {
        var s = data.students[i];
        sRows.push([
          s.email || '',
          s.fullName || '',
          s.accessLevel || 'full',
          s.status || 'active',
          (s.allowedCourseIds || []).join('; '),
          s.dateApproved || ''
        ]);
      }
      sSheet.getRange(1, 1, sRows.length, sRows[0].length).setValues(sRows);
      sSheet.getRange(1, 1, 1, sRows[0].length).setFontWeight("bold").setBackground("#ffe3e9");
      sSheet.autoResizeColumns(1, sRows[0].length);
    }
    
    // 2. Ghi Tab lessons
    if (data.lessons && Array.isArray(data.lessons)) {
      var lSheet = findSheetByName(ss, ["lessons", "Lessons"]) || ss.insertSheet("lessons");
      lSheet.clear();
      var lRows = [
        ['Course ID', 'Module #', 'Bài #', 'Tên Bài Học Tiếng Việt', 'Link Video VdoCipher Embed', 'Tóm Tắt Bài Học', 'Tài Liệu Đính Kèm']
      ];
      for (var j = 0; j < data.lessons.length; j++) {
        var l = data.lessons[j];
        var resStr = '';
        if (l.resources && l.resources.length > 0) {
          resStr = l.resources.map(function(r){ return r.title + ' (' + (r.type || 'link') + ')'; }).join(' | ');
        }
        lRows.push([
          l.courseId || 'ms-2026',
          l.moduleNumber || 1,
          l.lessonNumber || (j + 1),
          l.titleVi || l.title || '',
          l.videoUrl || '',
          l.summary || '',
          resStr
        ]);
      }
      lSheet.getRange(1, 1, lRows.length, lRows[0].length).setValues(lRows);
      lSheet.getRange(1, 1, 1, lRows[0].length).setFontWeight("bold").setBackground("#e0e7ff");
      lSheet.autoResizeColumns(1, lRows[0].length);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Đã cập nhật dữ liệu thành công lên Google Sheet!" 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper Functions
function findSheetByName(ss, names) {
  for (var i = 0; i < names.length; i++) {
    var s = ss.getSheetByName(names[i]);
    if (s) return s;
  }
  var allSheets = ss.getSheets();
  for (var k = 0; k < allSheets.length; k++) {
    var sName = allSheets[k].getName().toLowerCase().trim();
    for (var j = 0; j < names.length; j++) {
      if (sName === names[j].toLowerCase().trim() || sName.indexOf(names[j].toLowerCase().trim()) !== -1) {
        return allSheets[k];
      }
    }
  }
  return null;
}

function parseStudentsFromSheet(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var header = data[0].map(function(h){ return h.toString().toLowerCase().trim(); });
  var emailCol = -1, nameCol = -1, accessCol = -1, statusCol = -1, courseCol = -1, dateCol = -1;
  
  for (var c = 0; c < header.length; c++) {
    var h = header[c];
    if (h.indexOf('email') !== -1) emailCol = c;
    else if (h.indexOf('tên') !== -1 || h.indexOf('name') !== -1) nameCol = c;
    else if (h.indexOf('quyền') !== -1 || h.indexOf('access') !== -1 || h.indexOf('level') !== -1) accessCol = c;
    else if (h.indexOf('trạng thái') !== -1 || h.indexOf('status') !== -1) statusCol = c;
    else if (h.indexOf('khóa') !== -1 || h.indexOf('course') !== -1) courseCol = c;
    else if (h.indexOf('ngày') !== -1 || h.indexOf('date') !== -1) dateCol = c;
  }
  
  if (emailCol === -1) emailCol = 0;
  if (nameCol === -1) nameCol = 1;
  if (accessCol === -1) accessCol = 2;
  if (statusCol === -1) statusCol = 3;
  if (courseCol === -1) courseCol = 4;
  if (dateCol === -1) dateCol = 5;
  
  var students = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var email = row[emailCol] ? row[emailCol].toString().trim().toLowerCase() : '';
    if (email && email.indexOf('@') !== -1 && email !== 'email') {
      var courses = row[courseCol] ? row[courseCol].toString().split(/[;,]/).map(function(x){ return x.trim(); }) : ['ms-2026', 're-2026'];
      students.push({
        email: email,
        fullName: row[nameCol] ? row[nameCol].toString().trim() : 'Học Viên',
        accessLevel: row[accessCol] ? row[accessCol].toString().trim() : 'full',
        status: row[statusCol] ? row[statusCol].toString().trim().toLowerCase() : 'active',
        allowedCourseIds: courses,
        dateApproved: row[dateCol] ? row[dateCol].toString().trim() : ''
      });
    }
  }
  return students;
}

function parseLessonsFromSheet(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var header = data[0].map(function(h){ return h.toString().toLowerCase().trim(); });
  var courseCol = -1, modCol = -1, lesCol = -1, titleCol = -1, videoCol = -1, sumCol = -1, resCol = -1;
  
  for (var c = 0; c < header.length; c++) {
    var h = header[c];
    if (h.indexOf('course') !== -1 || h.indexOf('khóa') !== -1) courseCol = c;
    else if (h.indexOf('module') !== -1 || h.indexOf('học phần') !== -1) modCol = c;
    else if (h.indexOf('bài #') !== -1 || h.indexOf('lesson #') !== -1 || h.indexOf('bài số') !== -1 || h === 'bài' || h === 'lesson') lesCol = c;
    else if (h.indexOf('tên') !== -1 || h.indexOf('title') !== -1 || h.indexOf('tiêu đề') !== -1) titleCol = c;
    else if (h.indexOf('video') !== -1 || h.indexOf('vdocipher') !== -1 || h.indexOf('iframe') !== -1 || h.indexOf('embed') !== -1 || h.indexOf('url') !== -1 || h.indexOf('link') !== -1) videoCol = c;
    else if (h.indexOf('tóm tắt') !== -1 || h.indexOf('summary') !== -1 || h.indexOf('mô tả') !== -1 || h.indexOf('desc') !== -1) sumCol = c;
    else if (h.indexOf('tài liệu') !== -1 || h.indexOf('resource') !== -1) resCol = c;
  }
  
  if (courseCol === -1) courseCol = 0;
  if (modCol === -1) modCol = 1;
  if (lesCol === -1) lesCol = 2;
  if (titleCol === -1) titleCol = 3;
  if (videoCol === -1) videoCol = 4;
  if (sumCol === -1) sumCol = 5;
  if (resCol === -1) resCol = 6;
  
  var lessons = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var title = row[titleCol] ? row[titleCol].toString().trim() : '';
    var video = row[videoCol] ? row[videoCol].toString().trim() : '';
    
    if (!video) {
      for (var colIdx = 0; colIdx < row.length; colIdx++) {
        var cellVal = row[colIdx] ? row[colIdx].toString().trim() : '';
        if (cellVal.indexOf('http') === 0 || cellVal.indexOf('player.vdocipher.com') !== -1 || cellVal.indexOf('<iframe') !== -1) {
          video = cellVal;
          break;
        }
      }
    }
    
    if (title || video) {
      var courseId = row[courseCol] ? row[courseCol].toString().trim() : 'ms-2026';
      var modNum = parseInt(row[modCol]) || 1;
      var lesNum = parseInt(row[lesCol]) || r;
      var summary = row[sumCol] ? row[sumCol].toString().trim() : '';
      var rawRes = row[resCol] ? row[resCol].toString().trim() : '';
      
      lessons.push({
        id: 'sheet-les-' + courseId + '-' + modNum + '-' + lesNum + '-' + r,
        courseId: courseId,
        moduleNumber: modNum,
        lessonNumber: lesNum,
        titleVi: title || ('Bài học ' + lesNum),
        title: title || ('Lesson ' + lesNum),
        videoUrl: video,
        summary: summary,
        descriptionVi: summary,
        resources: rawRes ? [{ title: rawRes, type: 'pdf', url: '#' }] : []
      });
    }
  }
  return lessons;
}
```

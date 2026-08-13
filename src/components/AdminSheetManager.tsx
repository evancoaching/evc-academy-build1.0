import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  RefreshCw, 
  Copy, 
  Check, 
  Trash2, 
  Settings, 
  X, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Unlock,
  Filter
} from 'lucide-react';
import { Student, Course } from '../types';
import { ALL_COURSES } from '../data/coursesData';
import { syncViaAppsScriptWebhook } from '../lib/googleSheetsService';
import { getWebhookUrl, setWebhookUrl as persistWebhookUrl } from '../lib/syncConfig';
import { formatJoinDate } from '../lib/studentUtils';

interface AdminSheetManagerProps {
  courses?: Course[];
  students: Student[];
  onAddStudent: (email: string, fullName: string, role: 'admin' | 'user', allowedCourseIds: string[]) => void;
  onUpdateStatus: (id: string, status: 'active' | 'pending' | 'blocked') => void;
  onToggleCoursePermission?: (studentId: string, courseId: string) => void;
  onDeleteStudent: (id: string) => void;
  onImportStudents?: (importedStudents: Partial<Student>[]) => void;
  onImportLessons?: (importedLessons: any[]) => void;
}

export const AdminSheetManager: React.FC<AdminSheetManagerProps> = ({
  courses = ALL_COURSES,
  students,
  onAddStudent,
  onUpdateStatus,
  onToggleCoursePermission,
  onDeleteStudent,
  onImportStudents,
  onImportLessons
}) => {
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'blocked'>('all');
  
  // New student form modal / drawer
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'user'>('user');
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['ms-2026', 're-2026']);

  // Settings Modal state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [webhookUrl, setWebhookUrlState] = useState(() => getWebhookUrl());
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [copiedScript, setCopiedScript] = useState(false);

  // Save Webhook URL (local + shared helper used by Login pull)
  useEffect(() => {
    persistWebhookUrl(webhookUrl);
  }, [webhookUrl]);

  // Flattened all lessons for push synchronization
  const allLessons = courses.flatMap((course) =>
    course.modules.flatMap((mod) =>
      mod.lessons.map((l) => ({
        ...l,
        courseId: course.id,
        courseTitle: course.title,
        moduleTitle: mod.titleVi,
      }))
    )
  );

  // Google Apps Script source code
  const googleAppsScriptCode = `// Google Apps Script Đồng Bộ 2 Chiều (Không cần OAuth / Không bị lỗi 403)
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
        ['Email', 'Họ Và Tên', 'Quyền', 'Trạng Thái', 'Đã Đăng Ký', 'Ngày Tham Gia']
      ];
      for (var i = 0; i < data.students.length; i++) {
        var s = data.students[i];
        sRows.push([
          s.email || '',
          s.fullName || '',
          s.role === 'admin' ? 'Admin' : 'User',
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
          resStr = l.resources.map(function(r){
            if (r.url && r.url !== '#') return (r.title || 'Tài liệu') + ' | ' + r.url;
            return (r.title || 'Tài liệu') + ' (' + (r.type || 'link') + ')';
          }).join(' || ');
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
    else if (h.indexOf('quyền') !== -1 || h.indexOf('role') !== -1 || h.indexOf('access') !== -1 || h.indexOf('level') !== -1) accessCol = c;
    else if (h.indexOf('trạng thái') !== -1 || h.indexOf('status') !== -1) statusCol = c;
    else if (h.indexOf('đăng ký') !== -1 || h.indexOf('khóa') !== -1 || h.indexOf('course') !== -1) courseCol = c;
    else if (h.indexOf('tham gia') !== -1 || h.indexOf('ngày') !== -1 || h.indexOf('date') !== -1) dateCol = c;
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
      var courses = row[courseCol] ? row[courseCol].toString().split(/[;,]/).map(function(x){ return x.trim(); }) : [];
      students.push({
        email: email,
        fullName: row[nameCol] ? row[nameCol].toString().trim() : 'Học Viên',
        role: (function(v){
          var raw = v ? v.toString().trim().toLowerCase() : '';
          return raw === 'admin' || raw.indexOf('admin') !== -1 ? 'admin' : 'user';
        })(row[accessCol]),
        accessLevel: 'full',
        status: (function(v){
          var raw = v ? v.toString().trim().toLowerCase() : 'active';
          if (raw === 'pending') return 'pending';
          if (raw === 'blocked' || raw === 'revoked') return 'blocked';
          return 'active';
        })(row[statusCol]),
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
      var parsedResources = [];
      if (rawRes && rawRes.toLowerCase() !== 'không có') {
        var chunks = rawRes.indexOf('||') !== -1 ? rawRes.split(/\s*\|\|\s*/) : [rawRes];
        for (var ci = 0; ci < chunks.length; ci++) {
          var chunk = chunks[ci].toString().trim();
          if (!chunk) continue;
          var resTitle = chunk;
          var resLink = '#';
          var pipeParts = chunk.split(/\s*\|\s*/);
          if (pipeParts.length >= 2 && /^https?:\/\//i.test(pipeParts[pipeParts.length - 1].trim())) {
            resLink = pipeParts[pipeParts.length - 1].trim();
            resTitle = pipeParts.slice(0, -1).join(' | ').trim() || 'Tài liệu';
          } else if (/^https?:\/\//i.test(chunk)) {
            resLink = chunk;
            resTitle = 'Tài liệu tải về';
          }
          // Google Drive view -> download (use RegExp() so '/' in pattern is safe in Apps Script)
          var driveFile = resLink.match(new RegExp('drive\\.google\\.com/file/d/([^/]+)', 'i'));
          if (driveFile && driveFile[1]) {
            resLink = 'https://drive.google.com/uc?export=download&id=' + driveFile[1];
          }
          var rType = (resTitle + ' ' + resLink).toLowerCase().indexOf('xls') !== -1 || (resTitle + resLink).toLowerCase().indexOf('excel') !== -1 ? 'excel' : 'pdf';
          parsedResources.push({ title: resTitle, type: rType, url: resLink });
        }
      }
      
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
        resources: parsedResources
      });
    }
  }
  return lessons;
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  /**
   * PULL DATA: Tải dữ liệu từ Google Sheet Webhook về (cả học viên & bài học)
   */
  const handlePullFromWebhook = async () => {
    if (!webhookUrl.trim()) {
      setSyncStatus('error');
      setStatusMsg('Vui lòng nhập đường link Google Apps Script Webhook URL trước khi đồng bộ.');
      return;
    }

    setSyncStatus('syncing');
    setStatusMsg('Đang kết nối và tải dữ liệu từ Google Sheet (học viên & bài học)...');

    const res = await syncViaAppsScriptWebhook(webhookUrl.trim(), 'pull');
    if (res.success && res.data) {
      let stdCount = 0;
      let lesCount = 0;

      if (res.data.students && res.data.students.length > 0) {
        if (onImportStudents) {
          onImportStudents(res.data.students);
        }
        stdCount = res.data.students.length;
      }

      if (res.data.lessons && res.data.lessons.length > 0) {
        if (onImportLessons) {
          onImportLessons(res.data.lessons);
        }
        lesCount = res.data.lessons.length;
      }

      setSyncStatus('success');
      setStatusMsg(`✓ Đã đồng bộ thành công ${stdCount} học viên và ${lesCount} bài học video từ Google Sheet!`);
    } else {
      setSyncStatus('error');
      setStatusMsg(`Lỗi Webhook: ${res.error || 'Không thể kết nối tới Google Apps Script. Vui lòng kiểm tra lại URL'}`);
    }
  };

  /**
   * PUSH DATA: Đẩy dữ liệu hiện tại lên Google Sheet Webhook (cả học viên & bài học)
   */
  const handlePushToWebhook = async () => {
    if (!webhookUrl.trim()) {
      setSyncStatus('error');
      setStatusMsg('Vui lòng nhập đường link Google Apps Script Webhook URL trước khi đẩy dữ liệu.');
      return;
    }

    setSyncStatus('syncing');
    setStatusMsg('Đang gửi toàn bộ danh sách học viên và bài học lên Google Sheet...');

    const res = await syncViaAppsScriptWebhook(webhookUrl.trim(), 'push', {
      students,
      lessons: allLessons,
    });

    if (res.success) {
      setSyncStatus('success');
      setStatusMsg(`✓ Đã cập nhật thành công ${students.length} học viên và ${allLessons.length} bài học lên Google Sheet!`);
    } else {
      setSyncStatus('error');
      setStatusMsg(`Lỗi khi đẩy lên Sheet: ${res.error}`);
    }
  };

  // Handle Add Student Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    onAddStudent(newEmail.trim(), newName.trim() || 'Học Viên Mới', newRole, selectedCourses);
    setNewEmail('');
    setNewName('');
    setShowAddForm(false);
  };

  const toggleCourseSelect = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Filter students list
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = students.filter((s) => s.status === 'active').length;
  const pendingCount = students.filter((s) => s.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header Card - Light Mode, Clean & Minimal */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#e34e6b] mb-1">
            <Users className="w-4 h-4" />
            <span>Quản Trị Hệ Thống</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Học Viên
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Tổng cộng <strong className="text-slate-800 font-semibold">{students.length} học viên</strong> •{' '}
            <strong className="text-emerald-700 font-semibold">{activeCount} đang hoạt động</strong>
            {pendingCount > 0 && (
              <> • <span className="text-[#e34e6b] font-bold bg-[#FFE3E9] px-2 py-0.5 rounded-full border border-[#FFC9D4]">{pendingCount} chờ duyệt</span></>
            )}
          </p>
        </div>

        {/* Action Buttons: Add Student & Settings Modal Trigger */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Học Viên</span>
          </button>

          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-600" />
            <span>Cài Đặt Đồng Bộ</span>
            {webhookUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã kết nối Webhook" />
            )}
          </button>

          {/* Quick pull button if webhook is configured */}
          {webhookUrl && (
            <button
              onClick={handlePullFromWebhook}
              title="Đồng bộ nhanh từ Google Sheet"
              disabled={syncStatus === 'syncing'}
              className="p-2.5 bg-white hover:bg-[#FFE3E9] text-slate-700 hover:text-[#e34e6b] rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin text-[#e34e6b]' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Sync Status Banner Notification (if active) */}
      {statusMsg && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
          syncStatus === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : syncStatus === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-[#FFE3E9] border-[#FFC9D4] text-[#a8324f]'
        }`}>
          <div className="flex items-center gap-2.5 font-medium">
            {syncStatus === 'syncing' && <RefreshCw className="w-4 h-4 animate-spin text-[#e34e6b] shrink-0" />}
            {syncStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {syncStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
            <span>{statusMsg}</span>
          </div>
          <button 
            onClick={() => setStatusMsg('')}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm học viên theo tên, email..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {(['all', 'active', 'pending', 'blocked'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer capitalize ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st === 'all' ? 'Tất cả' : st === 'active' ? 'Active' : st === 'pending' ? 'Pending' : 'Blocked'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Student Roster Table (Light Mode, Clean & Spacious) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4 sm:px-6">Học Viên</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4">Quyền</th>
                <th className="p-4">Đã Đăng Ký</th>
                <th className="p-4">Ngày Tham Gia</th>
                <th className="p-4 text-right sm:pr-6">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Không tìm thấy học viên nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const allowedCourses = student.allowedCourseIds || ['ms-2026'];
                  const isPending = student.status === 'pending';
                  const isBlocked = student.status === 'blocked';
                  const isAdminRole = student.role === 'admin';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Name & Email */}
                      <td className="p-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-xs shrink-0 border border-slate-200">
                            {student.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                              <span>{student.fullName}</span>
                              {isAdminRole ? (
                                <span className="text-[10px] bg-[#FFE3E9] text-[#e34e6b] font-extrabold px-1.5 py-0.2 rounded-md">Admin</span>
                              ) : null}
                            </div>
                            <div className="text-xs font-mono text-slate-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {student.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        )}
                        {student.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFE3E9] text-[#e34e6b] border border-[#FFC9D4]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE3E9]0 animate-pulse" />
                            Pending
                          </span>
                        )}
                        {student.status === 'blocked' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Blocked
                          </span>
                        )}
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${
                          isAdminRole
                            ? 'text-[#e34e6b] bg-[#FFE3E9] border-[#FFC9D4]'
                            : 'text-slate-700 bg-slate-100 border-slate-200'
                        }`}>
                          {isAdminRole ? 'Admin' : 'User'}
                        </span>
                      </td>

                      {/* Registered courses with 1-click toggle */}
                      <td className="p-4">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                          {courses.map((c) => {
                            const isAllowed = allowedCourses.includes(c.id);
                            return (
                              <button
                                key={c.id}
                                onClick={() => onToggleCoursePermission && onToggleCoursePermission(student.id, c.id)}
                                title={isAllowed ? `Bấm để hủy đăng ký ${c.title}` : `Bấm để đăng ký ${c.title}`}
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                  isAllowed
                                    ? 'bg-[#FFE3E9] text-[#e34e6b] border-[#FFC9D4] hover:bg-[#FFE3E9]'
                                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {isAllowed ? '✓ ' : '+ '}
                                {c.id === 'ms-2026' ? 'Money Skills' : c.id === 're-2026' ? 'Real Estate' : c.title}
                              </button>
                            );
                          })}
                        </div>
                      </td>

                      {/* Join date */}
                      <td className="p-4 text-xs text-slate-500 font-medium">
                        {formatJoinDate(student.dateApproved) || '—'}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right sm:pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending && (
                            <button
                              onClick={() => onUpdateStatus(student.id, 'active')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                              title="Duyệt tài khoản ngay"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Duyệt</span>
                            </button>
                          )}

                          {!isPending && (
                            <button
                              onClick={() => onUpdateStatus(student.id, isBlocked ? 'active' : 'blocked')}
                              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isBlocked
                                  ? 'text-emerald-700 hover:bg-emerald-50'
                                  : 'text-slate-500 hover:text-[#e34e6b] hover:bg-[#FFE3E9]'
                              }`}
                              title={isBlocked ? 'Kích hoạt lại học viên' : 'Khóa tài khoản'}
                            >
                              {isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc chắn muốn xóa học viên "${student.fullName}" (${student.email})?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            title="Xóa học viên"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Thêm Học Viên Mới */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#FFE3E9] text-[#e34e6b] rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Thêm Học Viên Mới</h3>
                  <p className="text-xs text-slate-500">Cấp quyền truy cập học phần cho học viên</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Địa Chỉ Email (*):
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="hocvien@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và Tên Học Viên:
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quyền:
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'user')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đã Đăng Ký:
                </label>
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {courses.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(c.id)}
                        onChange={() => toggleCourseSelect(c.id)}
                        className="w-4 h-4 text-[#e34e6b] rounded-sm cursor-pointer"
                      />
                      <span>{c.titleVi || c.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Lưu Học Viên
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: Cài Đặt Đồng Bộ Google Sheet */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FFE3E9] text-[#e34e6b] rounded-2xl border border-[#FFC9D4]">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Đồng Bộ Google Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrlState(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 font-mono text-xs text-slate-800 rounded-xl focus:bg-white focus:border-[#e34e6b] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePullFromWebhook}
                  disabled={syncStatus === 'syncing'}
                  className="w-full py-3 px-4 bg-white hover:bg-[#FFE3E9] border border-[#FFC9D4] text-[#e34e6b] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>Pull</span>
                </button>

                <button
                  onClick={handlePushToWebhook}
                  disabled={syncStatus === 'syncing'}
                  className="w-full py-3 px-4 bg-[#e34e6b] hover:bg-[#cf3c5a] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Upload className="w-4 h-4" />
                  <span>Push</span>
                </button>
              </div>

              {statusMsg && (
                <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-center gap-2.5 ${
                  syncStatus === 'error'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : syncStatus === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-[#FFE3E9] border-[#FFC9D4] text-[#a8324f]'
                }`}>
                  {syncStatus === 'syncing' && <RefreshCw className="w-4 h-4 animate-spin text-[#e34e6b] shrink-0" />}
                  {syncStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {syncStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                  <span>{statusMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-xs font-semibold text-slate-600">Apps Script</span>
                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer border border-slate-300"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mã script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900">Cách dùng</div>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-600">
                  <li>Sửa dữ liệu trên Google Sheet (tab <strong>students</strong> / <strong>lessons</strong>).</li>
                  <li>Bấm <strong>Pull</strong> để tải Sheet → App.</li>
                  <li>Sửa trên App (duyệt học viên, cấp lớp…) rồi bấm <strong>Push</strong> để đẩy App → Sheet.</li>
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

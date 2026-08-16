import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Course, CourseModule, Lesson, Student } from '../types';
import { ALL_COURSES } from '../data/coursesData';
import { parseResourceCell, serializeResources } from './resourceUtils';

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.setCustomParameters({
  prompt: 'select_account',
});

const ACCESS_TOKEN_STORAGE_KEY = 'evan_coaching_google_access_token';

let cachedAccessToken: string | null = (() => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch (e) {
    return null;
  }
})();

let isSigningIn = false;

/**
 * Initialize auth state listener and check for redirect results
 */
export const initGoogleAuth = async (
  onSuccess?: (user: User, token: string) => void,
  onFailure?: () => void
) => {
  try {
    const redirectRes = await getRedirectResult(auth);
    if (redirectRes) {
      const credential = GoogleAuthProvider.credentialFromResult(redirectRes);
      if (credential?.accessToken) {
        cachedAccessToken = credential.accessToken;
        try {
          localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, credential.accessToken);
        } catch (e) {
          // ignore
        }
        if (onSuccess) {
          onSuccess(redirectRes.user, credential.accessToken);
          return;
        }
      }
    }
  } catch (err: any) {
    console.warn('Lỗi kiểm tra getRedirectResult:', err);
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onSuccess) onSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onFailure) onFailure();
      }
    } else {
      cachedAccessToken = null;
      try {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      } catch (e) {
        // ignore
      }
      if (onFailure) onFailure();
    }
  });
};

/**
 * Sign in with Google Sheets using Popup
 */
export const signInWithGoogleSheets = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Không thể lấy access token từ Google Sign-In.');
    }
    cachedAccessToken = credential.accessToken;
    try {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, credential.accessToken);
    } catch (e) {
      // ignore
    }
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err: any) {
    console.error('Lỗi đăng nhập Google Popup:', err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Sign in with Google Sheets using Redirect
 */
export const signInWithGoogleRedirect = async (): Promise<void> => {
  try {
    isSigningIn = true;
    await signInWithRedirect(auth, provider);
  } catch (err: any) {
    console.error('Lỗi đăng nhập Google Redirect:', err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Direct Google Identity Services (GIS) Token Client
 */
export const requestGISToken = (clientId?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const oauthClientId = clientId || firebaseConfig.oAuthClientId;
    if (!oauthClientId) {
      reject(new Error('Chưa cấu hình OAuth Client ID.'));
      return;
    }

    const loadGsiScript = () => {
      if ((window as any).google?.accounts?.oauth2) {
        initClient();
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => initClient();
        script.onerror = () => reject(new Error('Không thể tải Google Identity Services SDK'));
        document.body.appendChild(script);
      }
    };

    const initClient = () => {
      try {
        const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: oauthClientId,
          scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
          callback: (response: any) => {
            if (response.error) {
              reject(new Error(response.error_description || response.error));
              return;
            }
            if (response.access_token) {
              cachedAccessToken = response.access_token;
              try {
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, response.access_token);
              } catch (e) {
                // ignore
              }
              resolve(response.access_token);
            } else {
              reject(new Error('Không nhận được Access Token từ Google.'));
            }
          },
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
      } catch (err) {
        reject(err);
      }
    };

    loadGsiScript();
  });
};

export const getCachedAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    // ignore
  }
  cachedAccessToken = null;
  try {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
};

// Extract Spreadsheet ID from URL or string
export const extractSpreadsheetId = (urlOrId: string): string | null => {
  if (!urlOrId) return null;
  const match = urlOrId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9-_]{20,}$/.test(urlOrId.trim())) {
    return urlOrId.trim();
  }
  return null;
};

/**
 * =========================================================================
 * ZERO-AUTH METHOD: Đọc trực tiếp Google Sheet Công Khai (Không cần đăng nhập)
 * =========================================================================
 */
export const readStudentsFromPublicSheet = async (
  spreadsheetId: string
): Promise<Partial<Student>[]> => {
  const trySheets = ['students', 'Students', 'Sheet1', 'Học Viên'];
  let lastError: any = null;

  for (const sheetName of trySheets) {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
      const res = await fetch(url);
      if (!res.ok) continue;

      const text = await res.text();
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
      if (!jsonMatch || !jsonMatch[1]) continue;

      const parsed = JSON.parse(jsonMatch[1]);
      const table = parsed.table;
      if (!table || !table.rows || table.rows.length === 0) continue;

      // Detect header columns from cols
      const cols = (table.cols || []).map((c: any) => (c?.label || '').toLowerCase().trim());
      let emailIdx = cols.findIndex((l: string) => l.includes('email'));
      let nameIdx = cols.findIndex((l: string) => l.includes('tên') || l.includes('name'));
      let accessIdx = cols.findIndex((l: string) => l.includes('quyền') || l.includes('access'));
      let statusIdx = cols.findIndex((l: string) => l.includes('trạng thái') || l.includes('status'));
      let courseIdx = cols.findIndex((l: string) => l.includes('khóa') || l.includes('course'));
      let dateIdx = cols.findIndex((l: string) => l.includes('ngày') || l.includes('date'));

      if (emailIdx === -1) emailIdx = 0;
      if (nameIdx === -1) nameIdx = 1;
      if (accessIdx === -1) accessIdx = 2;
      if (statusIdx === -1) statusIdx = 3;
      if (courseIdx === -1) courseIdx = 4;
      if (dateIdx === -1) dateIdx = 5;

      const students: Partial<Student>[] = [];

      table.rows.forEach((rowObj: any, idx: number) => {
        const c = rowObj.c || [];
        const email = c[emailIdx]?.v ? String(c[emailIdx].v).trim().toLowerCase() : '';
        if (!email || !email.includes('@') || email === 'email') return;

        const fullName = c[nameIdx]?.v ? String(c[nameIdx].v).trim() : 'Học Viên';
        const roleRaw = c[accessIdx]?.v ? String(c[accessIdx].v).trim() : 'user';
        const role =
          roleRaw.toLowerCase() === 'admin' || roleRaw.toLowerCase().includes('admin')
            ? 'admin'
            : 'user';
        const accessLevel: 'full' | 'module1_only' =
          roleRaw === 'module1_only' ? 'module1_only' : 'full';
        const statusRaw = c[statusIdx]?.v ? String(c[statusIdx].v).trim().toLowerCase() : 'active';
        const status: 'active' | 'pending' | 'blocked' =
          statusRaw === 'blocked' || statusRaw === 'revoked'
            ? 'blocked'
            : statusRaw === 'pending'
            ? 'pending'
            : 'active';
        const coursesRaw = c[courseIdx]?.v
          ? String(c[courseIdx].v).split(/[;,]/).map((s: string) => s.trim())
          : [];
        const dateApproved = c[dateIdx]?.v
          ? String(c[dateIdx].v).trim()
          : new Date().toLocaleDateString('en-US');

        students.push({
          id: `public-std-${idx}-${Date.now()}`,
          email,
          fullName,
          role,
          accessLevel,
          status,
          allowedCourseIds: coursesRaw,
          dateApproved,
        });
      });

      if (students.length > 0) {
        return students;
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  if (lastError) throw lastError;
  return [];
};

/**
 * ZERO-AUTH: Đọc danh sách bài học video từ tab "lessons" trên Google Sheet công khai
 */
export const readLessonsFromPublicSheet = async (
  spreadsheetId: string
): Promise<any[]> => {
  const trySheets = ['lessons', 'Lessons', 'LESSONS', 'baihoc', 'Bài Học', 'Video', 'Sheet2'];
  let lastError: any = null;

  for (const sheetName of trySheets) {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
      const res = await fetch(url);
      if (!res.ok) continue;

      const text = await res.text();
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
      if (!jsonMatch || !jsonMatch[1]) continue;

      const parsed = JSON.parse(jsonMatch[1]);
      const table = parsed.table;
      if (!table || !table.rows || table.rows.length === 0) continue;

      const cols = (table.cols || []).map((c: any) => (c?.label || '').toLowerCase().trim());
      let courseIdx = cols.findIndex((l: string) => l.includes('course') || l.includes('khóa'));
      let modIdx = cols.findIndex((l: string) => l.includes('module') || l.includes('phần'));
      let lesIdx = cols.findIndex((l: string) => l.includes('bài') || l.includes('lesson'));
      let titleIdx = cols.findIndex((l: string) => l.includes('tên') || l.includes('title') || l.includes('tiêu đề'));
      let videoIdx = cols.findIndex((l: string) => l.includes('video') || l.includes('vdocipher') || l.includes('iframe') || l.includes('embed') || l.includes('url') || l.includes('link'));
      let sumIdx = cols.findIndex((l: string) => l.includes('tóm tắt') || l.includes('summary') || l.includes('mô tả') || l.includes('desc'));
      let resIdx = cols.findIndex((l: string) => l.includes('tài liệu') || l.includes('resource'));

      if (courseIdx === -1) courseIdx = 0;
      if (modIdx === -1) modIdx = 1;
      if (lesIdx === -1) lesIdx = 2;
      if (titleIdx === -1) titleIdx = 3;
      if (videoIdx === -1) videoIdx = 4;
      if (sumIdx === -1) sumIdx = 5;
      if (resIdx === -1) resIdx = 6;

      const lessons: any[] = [];

      table.rows.forEach((rowObj: any, idx: number) => {
        const c = rowObj.c || [];
        let title = c[titleIdx]?.v ? String(c[titleIdx].v).trim() : '';
        let video = c[videoIdx]?.v ? String(c[videoIdx].v).trim() : '';

        // Fallback: search row for video link if not at videoIdx
        if (!video) {
          for (let i = 0; i < c.length; i++) {
            const v = c[i]?.v ? String(c[i].v).trim() : '';
            if (v.startsWith('http') || v.includes('player.vdocipher.com') || v.includes('<iframe')) {
              video = v;
              break;
            }
          }
        }

        if (title || video) {
          const courseId = c[courseIdx]?.v ? String(c[courseIdx].v).trim() : 'ms-2026';
          const moduleNumber = c[modIdx]?.v ? Number(c[modIdx].v) || 1 : 1;
          const lessonNumber = c[lesIdx]?.v ? Number(c[lesIdx].v) || idx + 1 : idx + 1;
          const summary = c[sumIdx]?.v ? String(c[sumIdx].v).trim() : '';
          const resourcesStr = c[resIdx]?.v ? String(c[resIdx].v).trim() : '';

          lessons.push({
            id: `sheet-les-${courseId}-${moduleNumber}-${lessonNumber}-${idx}`,
            courseId,
            moduleNumber,
            lessonNumber,
            titleVi: title || `Bài học ${lessonNumber}`,
            title: title || `Lesson ${lessonNumber}`,
            videoUrl: video,
            summary,
            descriptionVi: summary,
            resources: parseResourceCell(resourcesStr),
          });
        }
      });

      if (lessons.length > 0) {
        return lessons;
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  if (lastError) throw lastError;
  return [];
};

/**
 * Helper to merge imported lessons from Google Sheet into existing Course[] array
 */
export const mergeLessonsIntoCourses = (
  baseCourses: Course[],
  importedLessons: any[]
): Course[] => {
  if (!importedLessons || importedLessons.length === 0) {
    return baseCourses;
  }

  // Clone courses
  const updatedCourses: Course[] = JSON.parse(JSON.stringify(baseCourses || ALL_COURSES));

  importedLessons.forEach((rawLesson) => {
    // 1. Normalize course ID
    let courseId = (rawLesson.courseId || 'ms-2026').toLowerCase().trim();
    if (courseId.includes('re') || courseId.includes('real') || courseId.includes('bất động sản')) {
      courseId = 're-2026';
    } else if (courseId.includes('ms') || courseId.includes('money') || courseId.includes('tài chính')) {
      courseId = 'ms-2026';
    }

    let targetCourse = updatedCourses.find((c) => c.id.toLowerCase() === courseId);
    if (!targetCourse) {
      // Create new course if not exist
      targetCourse = {
        id: courseId,
        title: rawLesson.courseTitle || courseId.toUpperCase(),
        titleVi: rawLesson.courseTitle || `Khóa Học ${courseId.toUpperCase()}`,
        badge: 'KHÓA HỌC CHUYÊN SÂU TỪ GOOGLE SHEETS',
        category: 'Đào Tạo Đặc Biệt',
        level: 'All Levels',
        description: 'Chương trình được đồng bộ trực tiếp từ Master Google Sheet.',
        thumbnailUrl:
          ALL_COURSES.find((c) => c.id === courseId)?.thumbnailUrl ||
          'https://cdn.prod.website-files.com/65b4f55f4b8e99cd2da141c5/6a7d99cd02015def96a416d8_MSThumb.png',
        totalLessons: 0,
        totalModules: 0,
        durationHours: '8+ Hours',
        modules: [],
      };
      updatedCourses.push(targetCourse);
    }

    const modNum = Number(rawLesson.moduleNumber) || 1;
    const lesNum = Number(rawLesson.lessonNumber) || 1;
    let videoUrl = (rawLesson.videoUrl || '').trim();

    // Extract src from <iframe> if user pasted embed HTML
    if (videoUrl.includes('<iframe') && videoUrl.includes('src=')) {
      const srcMatch = videoUrl.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        videoUrl = srcMatch[1];
      }
    }

    const titleVi = rawLesson.titleVi || rawLesson.title || `Bài học ${lesNum}`;
    const summary = rawLesson.summary || rawLesson.descriptionVi || '';

    // Find or create module
    let targetModule = targetCourse.modules.find(
      (m) => m.number === modNum || m.id === modNum
    );

    if (!targetModule) {
      targetModule = {
        id: modNum,
        number: modNum,
        title: `Module ${modNum}`,
        titleVi: `Module ${modNum}: Bài Học Bổ Sung`,
        description: `Nội dung Module ${modNum} được cập nhật từ Google Sheet.`,
        lessons: [],
      };
      targetCourse.modules.push(targetModule);
    }

    // Find or create lesson
    const existingLesson = targetModule.lessons.find(
      (l) => l.lessonNumber === lesNum || (l.titleVi && l.titleVi.toLowerCase() === titleVi.toLowerCase())
    );

    if (existingLesson) {
      existingLesson.titleVi = titleVi;
      if (rawLesson.title) existingLesson.title = rawLesson.title;
      if (videoUrl) existingLesson.videoUrl = videoUrl;
      if (summary) {
        existingLesson.summary = summary;
        if (!existingLesson.descriptionVi || existingLesson.descriptionVi.length < summary.length) {
          existingLesson.descriptionVi = summary;
        }
      }
      if (rawLesson.resources && rawLesson.resources.length > 0) {
        existingLesson.resources = rawLesson.resources;
      }
    } else {
      const newLesson: Lesson = {
        id: rawLesson.id || `${courseId}-${modNum}-${lesNum}-${Date.now()}`,
        slug: `les-${courseId}-m${modNum}-l${lesNum}`,
        title: rawLesson.title || titleVi,
        titleVi,
        moduleNumber: modNum,
        lessonNumber: lesNum,
        videoUrl,
        summary,
        descriptionVi: summary || `Nội dung chi tiết bài học ${lesNum} thuộc Module ${modNum}.`,
        keyTakeaways: rawLesson.keyTakeaways || [
          'Nắm vững kiến thức trọng tâm từ bài giảng của Coach Evan',
          'Thực hành trực tiếp trên các bảng tính tài chính',
        ],
        actionSteps: rawLesson.actionSteps || [
          'Xem hết toàn bộ video bài học',
          'Ghi chép và hoàn thành bài tập thực hành',
        ],
        resources: rawLesson.resources || [
          { title: 'Tài Liệu Bài Học.pdf', type: 'pdf', url: '#' },
        ],
      };
      targetModule.lessons.push(newLesson);
    }
  });

  // Re-sort modules and lessons
  updatedCourses.forEach((c) => {
    c.modules.sort((a, b) => a.number - b.number);
    c.modules.forEach((m) => {
      m.lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
    });
    c.totalModules = c.modules.length;
    c.totalLessons = c.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  });

  return updatedCourses;
};

/**
 * 1. Create a brand new Google Sheet in Google Drive with 2 tabs: 'students' and 'lessons'
 */
export const createAdminMasterSheet = async (
  accessToken: string,
  students: Student[],
  allLessons: any[]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const title = `Evan Coaching Academy - Master Sheet ${new Date().toLocaleDateString('vi-VN')}`;

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        { properties: { title: 'students' } },
        { properties: { title: 'lessons' } },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err.error?.message || 'Không thể tạo Google Sheet mới.');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl;

  const studentRows = [
    ['Email', 'Họ Và Tên', 'Quyền', 'Trạng Thái', 'Đã Đăng Ký', 'Ngày Tham Gia'],
    ...students.map((s) => [
      s.email,
      s.fullName,
      s.role === 'admin' ? 'Admin' : 'User',
      s.status,
      (s.allowedCourseIds || ['ms-2026']).join('; '),
      s.dateApproved,
    ]),
  ];

  const lessonRows = [
    ['Course ID', 'Module #', 'Bài #', 'Tên Bài Học Tiếng Việt', 'Link Video VdoCipher', 'Tóm Tắt Bài Học', 'Tài Liệu Đính Kèm (Resources)'],
    ...allLessons.map((l) => [
      l.courseId || 'ms-2026',
      l.moduleNumber,
      l.lessonNumber,
      l.titleVi,
      l.videoUrl,
      l.summary || '',
      l.resources && l.resources.length > 0
        ? serializeResources(l.resources)
        : ''
    ]),
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: 'students!A1',
            values: studentRows,
          },
          {
            range: 'lessons!A1',
            values: lessonRows,
          },
        ],
      }),
    }
  );

  return { spreadsheetId, spreadsheetUrl };
};

/**
 * 2. Sync / Push Students list to Google Sheet 'students' tab
 */
export const pushStudentsToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  students: Student[]
): Promise<boolean> => {
  const studentRows = [
    ['Email', 'Họ Và Tên', 'Quyền', 'Trạng Thái', 'Đã Đăng Ký', 'Ngày Tham Gia'],
    ...students.map((s) => [
      s.email,
      s.fullName,
      s.role === 'admin' ? 'Admin' : 'User',
      s.status,
      (s.allowedCourseIds || ['ms-2026']).join('; '),
      s.dateApproved,
    ]),
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/students!A1:Z1000:clear`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/students!A1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: studentRows,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Lỗi khi đồng bộ danh sách học viên lên Google Sheet.');
  }

  return true;
};

/**
 * 3. Read Students list from Google Sheet 'students' tab via OAuth
 */
export const readStudentsFromSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<Partial<Student>[]> => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/students!A1:Z1000`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Không thể đọc tab "students" từ Google Sheet.');
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];
  if (rows.length <= 1) return [];

  const headers = rows[0].map((h) => String(h || '').toLowerCase().trim());
  let emailCol = headers.findIndex((h) => h.includes('email'));
  let nameCol = headers.findIndex((h) => h.includes('tên') || h.includes('name'));
  let accessCol = headers.findIndex((h) => h.includes('quyền') || h.includes('role') || h.includes('access'));
  let statusCol = headers.findIndex((h) => h.includes('trạng thái') || h.includes('status'));
  let courseCol = headers.findIndex((h) => h.includes('đăng ký') || h.includes('khóa') || h.includes('course'));
  let dateCol = headers.findIndex((h) => h.includes('tham gia') || h.includes('ngày') || h.includes('date'));

  if (emailCol === -1) emailCol = 0;
  if (nameCol === -1) nameCol = 1;
  if (accessCol === -1) accessCol = 2;
  if (statusCol === -1) statusCol = 3;
  if (courseCol === -1) courseCol = 4;
  if (dateCol === -1) dateCol = 5;

  return rows.slice(1)
    .filter((row) => row[emailCol] && row[emailCol].includes('@') && row[emailCol].toLowerCase() !== 'email')
    .map((row, idx) => {
      const email = String(row[emailCol] || '').trim().toLowerCase();
      const fullName = row[nameCol] ? String(row[nameCol]).trim() : 'Học Viên Sheet';
      const roleRaw = row[accessCol] ? String(row[accessCol]).trim().toLowerCase() : 'user';
      const role: 'admin' | 'user' =
        roleRaw === 'admin' || roleRaw.includes('admin') ? 'admin' : 'user';
      const accessLevel: 'full' | 'module1_only' =
        roleRaw === 'module1_only' ? 'module1_only' : 'full';
      const statusRaw = row[statusCol] ? String(row[statusCol]).trim().toLowerCase() : 'active';
      const status: 'active' | 'pending' | 'blocked' =
        statusRaw === 'blocked' || statusRaw === 'revoked'
          ? 'blocked'
          : statusRaw === 'pending'
          ? 'pending'
          : 'active';
      const coursesRaw = row[courseCol] ? String(row[courseCol]).split(/[;,]/).map((c) => c.trim()) : [];
      const dateApproved = row[dateCol] || new Date().toLocaleDateString('en-US');

      return {
        id: `sheet-std-${idx}-${Date.now()}`,
        email,
        fullName,
        role,
        accessLevel,
        status,
        allowedCourseIds: coursesRaw,
        dateApproved,
      };
    });
};

/**
 * 4. Read Lessons list from Google Sheet 'lessons' tab via OAuth
 */
export const readLessonsFromSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<any[]> => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/lessons!A1:Z1000`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Không thể đọc tab "lessons" từ Google Sheet.');
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];
  if (rows.length <= 1) return [];

  const headers = rows[0].map((h) => String(h || '').toLowerCase().trim());
  let courseCol = headers.findIndex((h) => h.includes('course') || h.includes('khóa'));
  let modCol = headers.findIndex((h) => h.includes('module') || h.includes('phần'));
  let lesCol = headers.findIndex((h) => h.includes('bài') || h.includes('lesson'));
  let titleCol = headers.findIndex((h) => h.includes('tên') || h.includes('title') || h.includes('tiêu đề'));
  let videoCol = headers.findIndex((h) => h.includes('video') || h.includes('vdocipher') || h.includes('iframe') || h.includes('embed') || h.includes('url') || h.includes('link'));
  let sumCol = headers.findIndex((h) => h.includes('tóm tắt') || h.includes('summary') || h.includes('mô tả'));
  let resCol = headers.findIndex((h) => h.includes('tài liệu') || h.includes('resource'));

  if (courseCol === -1) courseCol = 0;
  if (modCol === -1) modCol = 1;
  if (lesCol === -1) lesCol = 2;
  if (titleCol === -1) titleCol = 3;
  if (videoCol === -1) videoCol = 4;
  if (sumCol === -1) sumCol = 5;
  if (resCol === -1) resCol = 6;

  const lessons: any[] = [];
  rows.slice(1).forEach((row, idx) => {
    let title = row[titleCol] ? String(row[titleCol]).trim() : '';
    let video = row[videoCol] ? String(row[videoCol]).trim() : '';

    if (!video) {
      for (let i = 0; i < row.length; i++) {
        const v = row[i] ? String(row[i]).trim() : '';
        if (v.startsWith('http') || v.includes('player.vdocipher.com') || v.includes('<iframe')) {
          video = v;
          break;
        }
      }
    }

    if (title || video) {
      const courseId = row[courseCol] ? String(row[courseCol]).trim() : 'ms-2026';
      const modNum = Number(row[modCol]) || 1;
      const lesNum = Number(row[lesCol]) || idx + 1;
      const summary = row[sumCol] ? String(row[sumCol]).trim() : '';
      const rawRes = row[resCol] ? String(row[resCol]).trim() : '';

      lessons.push({
        id: `oauth-les-${courseId}-${modNum}-${lesNum}-${idx}`,
        courseId,
        moduleNumber: modNum,
        lessonNumber: lesNum,
        titleVi: title || `Bài học ${lesNum}`,
        title: title || `Lesson ${lesNum}`,
        videoUrl: video,
        summary,
        descriptionVi: summary,
        resources: parseResourceCell(rawRes),
      });
    }
  });

  return lessons;
};

/**
 * 5. Sync / Push Lessons list to Google Sheet 'lessons' tab
 */
export const pushLessonsToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  allLessons: any[]
): Promise<boolean> => {
  const lessonRows = [
    ['Course ID', 'Module #', 'Bài #', 'Tên Bài Học Tiếng Việt', 'Link Video VdoCipher Embed', 'Tóm Tắt Bài Học', 'Tài Liệu Đính Kèm (Resources)'],
    ...allLessons.map((l) => [
      l.courseId || 'ms-2026',
      l.moduleNumber,
      l.lessonNumber,
      l.titleVi,
      l.videoUrl,
      l.summary || '',
      l.resources && l.resources.length > 0
        ? serializeResources(l.resources)
        : ''
    ]),
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/lessons!A1:Z1000:clear`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/lessons!A1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: lessonRows,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Lỗi khi đồng bộ danh sách bài học lên Google Sheet.');
  }

  return true;
};

/**
 * 6. Sync via Google Apps Script Webhook (2-way sync, no OAuth required)
 */
export const syncViaAppsScriptWebhook = async (
  webhookUrl: string,
  action: 'pull' | 'push',
  payload?: { students: Student[]; lessons: any[]; recordings?: any[] }
): Promise<{
  success: boolean;
  data?: { students: any[]; lessons: any[]; recordings?: any[]; raw?: any };
  error?: string;
}> => {
  try {
    if (action === 'pull') {
      const res = await fetch(webhookUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const raw = await res.json();

      // Normalize data response
      let students: any[] = [];
      let lessons: any[] = [];
      let recordings: any[] = [];

      if (Array.isArray(raw)) {
        // If script directly returned array of students or lessons
        if (raw.length > 0 && raw[0].email) {
          students = raw;
        } else {
          lessons = raw;
        }
      } else if (raw && typeof raw === 'object') {
        if (Array.isArray(raw.students)) students = raw.students;
        else if (raw.data && Array.isArray(raw.data.students)) students = raw.data.students;

        if (Array.isArray(raw.lessons)) lessons = raw.lessons;
        else if (raw.data && Array.isArray(raw.data.lessons)) lessons = raw.data.lessons;

        if (Array.isArray(raw.recordings)) recordings = raw.recordings;
        else if (raw.data && Array.isArray(raw.data.recordings)) recordings = raw.data.recordings;
      }

      return {
        success: true,
        data: {
          students: students.map((s: any) => ({
            ...s,
            allowedCourseIds: Array.isArray(s.allowedCourseIds)
              ? s.allowedCourseIds
              : typeof s.allowedCourseIds === 'string'
              ? s.allowedCourseIds.split(/[;,|]/).map((x: string) => x.trim()).filter(Boolean)
              : [],
          })),
          lessons,
          recordings,
          raw,
        },
      };
    } else {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const raw = await res.json();
      return { success: true, data: { students: [], lessons: [], recordings: [], raw } };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Lỗi kết nối Webhook Apps Script.' };
  }
};


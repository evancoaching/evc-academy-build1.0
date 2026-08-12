import React, { useState } from 'react';
import { Globe, CheckCircle2, Copy, Check, Server, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

export const VercelDeployGuide: React.FC = () => {
  const [copiedVercelJson, setCopiedVercelJson] = useState(false);
  const [copiedCname, setCopiedCname] = useState(false);

  const vercelJsonCode = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const handleCopyVercelJson = () => {
    navigator.clipboard.writeText(vercelJsonCode);
    setCopiedVercelJson(true);
    setTimeout(() => setCopiedVercelJson(false), 2500);
  };

  const handleCopyCname = () => {
    navigator.clipboard.writeText('cname.vercel-dns.com');
    setCopiedCname(true);
    setTimeout(() => setCopiedCname(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#e34e6b]/20 text-[#ffe3e9] border border-[#e34e6b]/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
          <Globe className="w-4 h-4" /> Vercel Hosting & Subdomain Setup
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cấu Hình Domain: <span className="text-[#ffe3e9]">academy.evancoaching.net</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Hướng dẫn chi tiết từng bước để đưa trang web Evan Coaching Academy lên Vercel và trỏ Subdomain chính thức của Evan Coaching.
        </p>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-6">
        
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#e34e6b] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Triển Khai Dự Án Trên Vercel (Deploy)
            </h2>
          </div>

          <div className="pl-11 space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              1. Đăng nhập vào bảng điều khiển <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-[#e34e6b] font-bold hover:underline">Vercel.com</a> bằng tài khoản Evan Coaching.
            </p>
            <p>
              2. Chọn <strong>"Add New..." → "Project"</strong> và import mã nguồn từ GitHub của dự án.
            </p>
            <p>
              3. Framework Preset chọn: <strong>Vite</strong>. Build Command: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">npm run build</code>.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#e34e6b] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Gắn Subdomain <code className="text-[#b41824]">academy.evancoaching.net</code> Trong Vercel
            </h2>
          </div>

          <div className="pl-11 space-y-3 text-sm text-slate-700">
            <p>
              Trong trang quản lý dự án Vercel, truy cập menu <strong>Settings → Domains</strong>. Nhập tên miền con:
            </p>

            <div className="p-3 bg-[#fff8fa] border border-[#f2e8e8] rounded-xl font-mono text-sm font-bold text-[#b41824]">
              academy.evancoaching.net
            </div>

            <p>
              Sau đó bấm nút <strong>Add</strong>.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#e34e6b] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Cấu Hình Bản Ghi DNS CNAME Tại Nhà Cung Cấp Tên Miền
            </h2>
          </div>

          <div className="pl-11 space-y-3 text-sm text-slate-700">
            <p>
              Đăng nhập vào trình quản lý DNS của miền <code className="font-bold">evancoaching.net</code> (Cloudflare / GoDaddy / Namecheap / Google Domains) và thêm 1 bản ghi CNAME như sau:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden font-mono text-xs">
                <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Loại (Type)</th>
                    <th className="p-3">Tên / Host</th>
                    <th className="p-3">Giá Trị (Target / Value)</th>
                    <th className="p-3">TTL</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-bold">
                  <tr>
                    <td className="p-3 text-purple-700">CNAME</td>
                    <td className="p-3 text-slate-900">academy</td>
                    <td className="p-3 text-emerald-700 flex items-center justify-between">
                      <span>cname.vercel-dns.com</span>
                      <button
                        onClick={handleCopyCname}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-sans font-bold"
                      >
                        {copiedCname ? 'Đã chép ✓' : 'Chép'}
                      </button>
                    </td>
                    <td className="p-3 text-slate-500">Auto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#e34e6b] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Tệp Cấu Hình SPA Rewrites (<code className="text-slate-800">vercel.json</code>)
            </h2>
          </div>

          <div className="pl-11 space-y-3 text-sm text-slate-700">
            <p>
              Đảm bảo tệp <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">vercel.json</code> ở thư mục gốc có nội dung sau để không bị lỗi 404 khi tải lại trang:
            </p>

            <div className="relative">
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
                {vercelJsonCode}
              </pre>
              <button
                onClick={handleCopyVercelJson}
                className="absolute top-2 right-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1"
              >
                {copiedVercelJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedVercelJson ? 'Đã chép!' : 'Sao chép vercel.json'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

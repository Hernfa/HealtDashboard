import React from 'react';
import { Heart, Calendar, User, ShieldCheck, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  isRefreshing,
  lastUpdated,
  totalRecords
}) => {
  return (
    <header id="main-header" className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo, Title & Description */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3.5 flex-wrap">
              {/* Vibrant Brand Logo */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
                  <div className="h-full w-full bg-white/10 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs">
                    <Heart className="w-6 h-6 fill-white text-white drop-shadow-sm" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white items-center justify-center text-[9px] text-white font-bold">✓</span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <span>Dashboard การคัดกรองสุขภาพ</span>
                  </h1>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                    Health Screening
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                    NCDs Watch
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              ระบบแสดงผลภาพรวมความเสี่ยงด้านสุขภาพ แนวโน้มสุขภาพ และพฤติกรรมสุขภาพของประชาชน เพื่อช่วยให้ผู้ใช้งานและบุคลากรทางการแพทย์ติดตามและวิเคราะห์ข้อมูลได้อย่างสะดวก รวดเร็ว และแม่นยำ
            </p>

            {/* Creator & Metadata tags */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200/80">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>ผู้จัดทำ: <strong className="text-slate-900 font-semibold">นายเหิรฟ้า อุทาหงษ์</strong> (นักศึกษาสาขาวิชาเวชระเบียนชั้นปีที่ 3)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>วันเวลาที่อัปเดตข้อมูล: <span className="text-slate-800 font-medium">{lastUpdated}</span></span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ระบบเวชระเบียนคัดกรอง NCDs: {totalRecords} ราย</span>
              </div>
            </div>
          </div>

          {/* Right Action: Refresh Button */}
          <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
            <button
              id="btn-refresh"
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm ${
                isRefreshing 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white active:scale-95 shadow-emerald-600/20'
              }`}
              title="กดเพื่อรีเฟรชและอัปเดตข้อมูลสถานะล่าสุด"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'กำลังรีเฟรชข้อมูล...' : 'Refresh ข้อมูล'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

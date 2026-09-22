import React, { useState } from 'react';
import { HealthRecord, MetricSummary } from '../types';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, CartesianGrid, AreaChart, Area
} from 'recharts';
import { Calendar, TrendingUp, AlertCircle, Droplets, HeartPulse } from 'lucide-react';

interface HealthTrendViewProps {
  records: HealthRecord[];
  metrics: MetricSummary;
}

export const HealthTrendView: React.FC<HealthTrendViewProps> = ({ records, metrics }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'chronological'>('monthly');

  // Sort records by date order
  const sortedRecords = [...records].sort((a, b) => {
    const parseD = (str: string) => {
      const parts = str.split('/');
      if (parts.length === 3) {
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
      }
      return 0;
    };
    return parseD(a.screeningDate) - parseD(b.screeningDate);
  });

  // Monthly aggregated data
  const months = ['2026-01', '2026-02', '2026-03'];
  const monthNames: Record<string, string> = {
    '2026-01': 'ม.ค. 2569 (Jan)',
    '2026-02': 'ก.พ. 2569 (Feb)',
    '2026-03': 'มี.ค. 2569 (Mar)',
  };

  const monthlyData = months.map(m => {
    const monthRecs = records.filter(r => r.month === m);
    const count = monthRecs.length;
    if (count === 0) {
      return {
        month: monthNames[m] || m,
        count: 0,
        avgSugar: 0,
        avgSbp: 0,
        avgDbp: 0,
        avgBmi: 0,
        highRisk: 0,
        medRisk: 0,
        lowRisk: 0,
      };
    }
    const avgSugar = Math.round(monthRecs.reduce((sum, r) => sum + r.bloodSugar, 0) / count);
    const avgSbp = Math.round(monthRecs.reduce((sum, r) => sum + r.sbp, 0) / count);
    const avgDbp = Math.round(monthRecs.reduce((sum, r) => sum + r.dbp, 0) / count);
    const avgBmi = Number((monthRecs.reduce((sum, r) => sum + r.bmi, 0) / count).toFixed(1));

    const highRisk = monthRecs.filter(r => r.riskLevel === 'สูง').length;
    const medRisk = monthRecs.filter(r => r.riskLevel === 'ปานกลาง').length;
    const lowRisk = monthRecs.filter(r => r.riskLevel === 'ต่ำ').length;

    return {
      month: monthNames[m] || m,
      count,
      avgSugar,
      avgSbp,
      avgDbp,
      avgBmi,
      highRisk,
      medRisk,
      lowRisk,
      highRiskPct: Math.round((highRisk / count) * 100)
    };
  });

  // Chronological timeline data (all individual screenings)
  const timelineData = sortedRecords.map(r => ({
    date: r.screeningDate,
    sugar: r.bloodSugar,
    sbp: r.sbp,
    dbp: r.dbp,
    id: r.id,
    risk: r.riskLevel
  }));

  return (
    <div id="health-trend-view" className="space-y-6">
      
      {/* Overview Metric Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-white text-teal-600 rounded-2xl border border-teal-200 shadow-xs shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100/90 px-2 py-0.5 rounded-md">
                แนวโน้มสุขภาพตามช่วงเวลา
              </span>
              <span className="text-xs text-slate-500 font-medium">มกราคม - มีนาคม พ.ศ. 2569</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              แนวโน้มระดับน้ำตาลและความดันโลหิตเฉลี่ยรายเดือนของประชาชน
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              แสดงการเปลี่ยนแปลงของระดับค่าน้ำตาลในเลือดเฉลี่ย และค่าความดันโลหิตเฉลี่ยที่ตรวจคัดกรองในแต่ละเดือน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0 bg-white p-1 rounded-xl border border-teal-200 shadow-2xs">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'monthly'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            สรุปรายเดือน (Monthly)
          </button>
          <button
            onClick={() => setViewMode('chronological')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'chronological'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ไทม์ไลน์รายบุคคล (Timeline)
          </button>
        </div>
      </div>

      {/* Monthly Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monthlyData.map((m, idx) => (
          <div key={m.month} className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">{m.month}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                คัดกรอง {m.count} ราย
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-100">
                <span className="text-[10px] text-amber-700 block font-semibold">น้ำตาลเฉลี่ย</span>
                <span className="text-base font-extrabold text-amber-800">{m.avgSugar}</span>
                <span className="text-[9px] text-slate-400 block">mg/dL</span>
              </div>
              <div className="p-2 rounded-xl bg-rose-50/80 border border-rose-100">
                <span className="text-[10px] text-rose-700 block font-semibold">ความดันเฉลี่ย</span>
                <span className="text-base font-extrabold text-rose-800">{m.avgSbp}/{m.avgDbp}</span>
                <span className="text-[9px] text-slate-400 block">mmHg</span>
              </div>
              <div className="p-2 rounded-xl bg-teal-50/80 border border-teal-100">
                <span className="text-[10px] text-teal-700 block font-semibold">เสี่ยงสูง</span>
                <span className="text-base font-extrabold text-rose-600">{m.highRisk}</span>
                <span className="text-[9px] text-slate-400 block">({m.highRiskPct}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Monthly Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Trend Chart 1: Blood Sugar Trend */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-amber-500" />
                <span>แนวโน้มระดับน้ำตาลในเลือดตามช่วงเวลา</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                Line Chart
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'monthly' ? 'ระดับน้ำตาลเฉลี่ยรายเดือน (mg/dL)' : 'ระดับน้ำตาลรายบุคคลตามลำดับวันที่คัดกรอง'}
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'monthly' ? (
                <LineChart data={monthlyData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis domain={[80, 140]} stroke="#64748b" fontSize={11} tickLine={false} unit=" mg/dL" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="avgSugar" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ fill: '#f59e0b', r: 5, stroke: '#ffffff', strokeWidth: 2 }} 
                    name="น้ำตาลเฉลี่ย (mg/dL)" 
                  />
                </LineChart>
              ) : (
                <LineChart data={timelineData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis domain={[70, 160]} stroke="#64748b" fontSize={11} tickLine={false} unit=" mg/dL" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sugar" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    dot={{ fill: '#f59e0b', r: 3 }} 
                    name="ระดับน้ำตาล (mg/dL)" 
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>เกณฑ์ปกติ: &lt;100 mg/dL | เสี่ยงสูง: &gt;125 mg/dL</span>
          </div>
        </div>

        {/* Trend Chart 2: Blood Pressure Trend (SBP / DBP) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>แนวโน้มความดันโลหิต (SBP และ DBP) ตามช่วงเวลา</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                Multi-Line Chart
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {viewMode === 'monthly' ? 'เปรียบเทียบค่าความดันตัวบน (SBP) และตัวล่าง (DBP) เฉลี่ย' : 'แนวโน้มค่าความดันรายบุคคล'}
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'monthly' ? (
                <LineChart data={monthlyData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis domain={[60, 150]} stroke="#64748b" fontSize={11} tickLine={false} unit=" mmHg" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="avgSbp" 
                    stroke="#f43f5e" 
                    strokeWidth={3} 
                    dot={{ fill: '#f43f5e', r: 5, stroke: '#ffffff', strokeWidth: 2 }} 
                    name="SBP (ความดันตัวบน)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgDbp" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3b82f6', r: 5, stroke: '#ffffff', strokeWidth: 2 }} 
                    name="DBP (ความดันตัวล่าง)" 
                  />
                </LineChart>
              ) : (
                <LineChart data={timelineData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis domain={[50, 160]} stroke="#64748b" fontSize={11} tickLine={false} unit=" mmHg" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="sbp" stroke="#f43f5e" strokeWidth={2} dot={false} name="SBP" />
                  <Line type="monotone" dataKey="dbp" stroke="#3b82f6" strokeWidth={2} dot={false} name="DBP" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>เกณฑ์เตือน SBP: ปกติ &lt;120 mmHg | เสี่ยงสูง &ge;140 mmHg</span>
          </div>
        </div>

      </div>

      {/* Row 2: Monthly Risk Composition Area Chart */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">แนวโน้มสัดส่วนประชากรกลุ่มความเสี่ยงรายเดือน (Monthly Risk Composition)</h3>
            <p className="text-xs text-slate-500 mt-0.5">การขยายตัวและหดตัวของกลุ่มความเสี่ยงในแต่ละช่วงเวลา</p>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">Stacked Area</span>
        </div>

        <div className="h-60 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="ความเสี่ยงต่ำ" />
              <Area type="monotone" dataKey="medRisk" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="ความเสี่ยงปานกลาง" />
              <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.7} name="ความเสี่ยงสูง" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { HealthRecord, MetricSummary, NavigationTab } from '../types';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, AlertOctagon, ArrowRight, HeartPulse, Sparkles } from 'lucide-react';

interface HomeViewProps {
  records: HealthRecord[];
  metrics: MetricSummary;
  onNavigate: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ records, metrics, onNavigate }) => {
  // Pie chart data for risk levels
  const riskPieData = [
    { name: 'ความเสี่ยงสูง (High)', value: metrics.highRiskCount, color: '#f43f5e' },
    { name: 'ความเสี่ยงปานกลาง (Medium)', value: metrics.mediumRiskCount, color: '#f59e0b' },
    { name: 'ความเสี่ยงต่ำ (Low)', value: metrics.lowRiskCount, color: '#10b981' },
  ].filter(d => d.value > 0);

  // High risk individuals list for quick triage
  const highRiskIndividuals = records.filter(r => r.riskLevel === 'สูง').slice(0, 5);

  return (
    <div id="home-view" className="space-y-6">
      
      {/* Executive Quick Alert */}
      <div className="bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 border border-rose-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white border border-rose-200 rounded-2xl text-rose-600 shadow-xs shrink-0">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-md">
                  สถานการณ์เร่งด่วน NCDs
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200">
                  {metrics.highRiskPct}% ของกลุ่มตัวอย่าง
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1.5">
                พบผู้มีความเสี่ยงสูงต่อโรคไม่ติดต่อเรื้อรัง (NCDs) จำนวน <span className="text-rose-600 font-extrabold">{metrics.highRiskCount}</span> จาก {metrics.count} ราย
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                กลุ่มนี้มีค่าดัชนีมวลกาย (BMI) เฉลี่ยสูงกว่า 28 kg/m² ร่วมกับระดับน้ำตาลในเลือดเกิน 125 mg/dL และความดันตัวบน (SBP) เกิน 140 mmHg ซึ่งส่วนใหญ่มีพฤติกรรมไม่ออกกำลังกาย
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2 shrink-0">
            <button
              id="btn-view-risk-details"
              onClick={() => onNavigate('risk')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white hover:from-rose-500 hover:to-red-500 transition shadow-sm shadow-rose-600/20 active:scale-95"
            >
              <span>วิเคราะห์ความเสี่ยงเชิงลึก</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-view-table-details"
              onClick={() => onNavigate('table')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition shadow-xs"
            >
              <span>เปิดตารางรายบุคคล</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Pie Chart (Risk Distribution) + Area & Age Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Donut */}
        <div id="card-risk-donut" className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">สัดส่วนระดับความเสี่ยงสุขภาพ</h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">3 ระดับ</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">การกระจายตัวของระดับความเสี่ยงสุขภาพ</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            {riskPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shadow-2xs" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {item.value} ราย ({metrics.count ? Math.round((item.value / metrics.count) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick High-Risk Individuals Preview */}
        <div id="card-high-risk-preview" className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">รายชื่อผู้มีความเสี่ยงสูงเร่งด่วน (Priority Screening)</h3>
                <p className="text-xs text-slate-500">บุคคลที่ควรได้รับการนัดหมายติดตามผลและตรวจวินิจฉัยทางคลินิกเร่งด่วน</p>
              </div>
              <button
                onClick={() => onNavigate('table')}
                className="text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 font-semibold transition bg-teal-50 px-3 py-1 rounded-lg border border-teal-100"
              >
                <span>ดูทั้งหมด {metrics.highRiskCount} ราย</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2.5">รหัส</th>
                    <th className="px-3 py-2.5">พื้นที่</th>
                    <th className="px-3 py-2.5">เพศ/อายุ</th>
                    <th className="px-3 py-2.5">BMI</th>
                    <th className="px-3 py-2.5">ความดัน SBP/DBP</th>
                    <th className="px-3 py-2.5">น้ำตาล mg/dL</th>
                    <th className="px-3 py-2.5">คะแนนเสี่ยง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {highRiskIndividuals.map((p) => (
                    <tr key={p.id} className="hover:bg-rose-50/40 transition">
                      <td className="px-3.5 py-2.5 font-mono font-bold text-slate-900">{p.id}</td>
                      <td className="px-3 py-2.5 font-medium">{p.area}</td>
                      <td className="px-3 py-2.5">{p.gender}, {p.age} ปี</td>
                      <td className="px-3 py-2.5 font-bold text-amber-600">{p.bmi}</td>
                      <td className="px-3 py-2.5 font-bold text-rose-600">{p.sbp}/{p.dbp}</td>
                      <td className="px-3 py-2.5 font-bold text-rose-600">{p.bloodSugar}</td>
                      <td className="px-3 py-2.5 font-extrabold text-rose-600">
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                          {p.riskScore} / 7
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>เกณฑ์การประเมินความเสี่ยงสูง: คะแนนเสี่ยง &ge; 4, SBP &gt; 140 mmHg หรือ น้ำตาล &gt; 125 mg/dL</span>
            <span className="text-slate-700 font-medium">รหัสบุคคลตัวอย่าง H0001 - H0030</span>
          </div>
        </div>

      </div>

      {/* Row 2: 3 Navigation Shortcut Panels with Colorful Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => onNavigate('risk')}
          className="bg-white border border-rose-200/90 hover:border-rose-300 hover:shadow-md rounded-2xl p-5 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-sm shadow-rose-500/20 group-hover:scale-105 transition">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition group-hover:translate-x-1" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mt-4 group-hover:text-rose-600 transition">Health Risk Dashboard</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            วิเคราะห์ความเสี่ยงตามกลุ่มอายุ, BMI, ความดันโลหิต, ระดับน้ำตาล และพื้นที่เสี่ยงสูง
          </p>
        </div>

        <div 
          onClick={() => onNavigate('trend')}
          className="bg-white border border-teal-200/90 hover:border-teal-300 hover:shadow-md rounded-2xl p-5 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition">
              <TrendingUp className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition group-hover:translate-x-1" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mt-4 group-hover:text-teal-600 transition">Health Trend Dashboard</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            วิเคราะห์แนวโน้มระดับน้ำตาลและความดันตามช่วงเวลารายเดือน (ม.ค. - มี.ค. 2569)
          </p>
        </div>

        <div 
          onClick={() => onNavigate('behavior')}
          className="bg-white border border-purple-200/90 hover:border-purple-300 hover:shadow-md rounded-2xl p-5 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-sm shadow-purple-500/20 group-hover:scale-105 transition">
              <Activity className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition group-hover:translate-x-1" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mt-4 group-hover:text-purple-600 transition">Health Behavior Dashboard</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            วิเคราะห์พฤติกรรมการสูบบุหรี่, ดื่มแอลกอฮอล์, การออกกำลังกาย และความสัมพันธ์กับความเสี่ยง
          </p>
        </div>

      </div>

    </div>
  );
};

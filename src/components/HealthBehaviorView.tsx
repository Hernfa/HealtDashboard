import React from 'react';
import { HealthRecord, MetricSummary } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import { Cigarette, Wine, Dumbbell, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HealthBehaviorViewProps {
  records: HealthRecord[];
  metrics: MetricSummary;
}

export const HealthBehaviorView: React.FC<HealthBehaviorViewProps> = ({ records, metrics }) => {
  const count = records.length || 1;

  // 1. Smoking vs Risk
  const smokers = records.filter(r => r.smoking === 'สูบ');
  const nonSmokers = records.filter(r => r.smoking === 'ไม่สูบ');
  const smokerHighRiskPct = smokers.length ? Math.round((smokers.filter(r => r.riskLevel === 'สูง').length / smokers.length) * 100) : 0;
  const nonSmokerHighRiskPct = nonSmokers.length ? Math.round((nonSmokers.filter(r => r.riskLevel === 'สูง').length / nonSmokers.length) * 100) : 0;
  const smokerAvgScore = smokers.length ? Number((smokers.reduce((s, r) => s + r.riskScore, 0) / smokers.length).toFixed(1)) : 0;
  const nonSmokerAvgScore = nonSmokers.length ? Number((nonSmokers.reduce((s, r) => s + r.riskScore, 0) / nonSmokers.length).toFixed(1)) : 0;

  // 2. Alcohol vs Risk
  const drinkers = records.filter(r => r.alcohol === 'ดื่ม');
  const nonDrinkers = records.filter(r => r.alcohol === 'ไม่ดื่ม');
  const drinkerHighRiskPct = drinkers.length ? Math.round((drinkers.filter(r => r.riskLevel === 'สูง').length / drinkers.length) * 100) : 0;
  const nonDrinkerHighRiskPct = nonDrinkers.length ? Math.round((nonDrinkers.filter(r => r.riskLevel === 'สูง').length / nonDrinkers.length) * 100) : 0;
  const drinkerAvgScore = drinkers.length ? Number((drinkers.reduce((s, r) => s + r.riskScore, 0) / drinkers.length).toFixed(1)) : 0;
  const nonDrinkerAvgScore = nonDrinkers.length ? Number((nonDrinkers.reduce((s, r) => s + r.riskScore, 0) / nonDrinkers.length).toFixed(1)) : 0;

  // 3. Exercise vs Risk
  const exerciseLevels = ['สม่ำเสมอ', 'บางครั้ง', 'ไม่ออกกำลังกาย'] as const;
  const exerciseRiskData = exerciseLevels.map(lvl => {
    const group = records.filter(r => r.exercise === lvl);
    const low = group.filter(r => r.riskLevel === 'ต่ำ').length;
    const med = group.filter(r => r.riskLevel === 'ปานกลาง').length;
    const high = group.filter(r => r.riskLevel === 'สูง').length;
    const avgScore = group.length ? Number((group.reduce((s, r) => s + r.riskScore, 0) / group.length).toFixed(1)) : 0;
    return {
      name: lvl,
      ต่ำ: low,
      ปานกลาง: med,
      สูง: high,
      total: group.length,
      avgScore
    };
  });

  // 4. Comparison Data for Bar Chart: Risk score by behavior
  const behaviorComparisonData = [
    {
      category: 'การออกกำลังกาย',
      กลุ่มA: 'สม่ำเสมอ',
      คะแนนกลุ่มA: exerciseRiskData[0]?.avgScore || 0,
      กลุ่มB: 'ไม่ออกกำลังกาย',
      คะแนนกลุ่มB: exerciseRiskData[2]?.avgScore || 0,
    },
    {
      category: 'การสูบบุหรี่',
      กลุ่มA: 'ไม่สูบ',
      คะแนนกลุ่มA: nonSmokerAvgScore,
      กลุ่มB: 'สูบ',
      คะแนนกลุ่มB: smokerAvgScore,
    },
    {
      category: 'แอลกอฮอล์',
      กลุ่มA: 'ไม่ดื่ม',
      คะแนนกลุ่มA: nonDrinkerAvgScore,
      กลุ่มB: 'ดื่ม',
      คะแนนกลุ่มB: drinkerAvgScore,
    },
  ];

  return (
    <div id="health-behavior-view" className="space-y-6">
      
      {/* Behavior KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Smoking Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">พฤติกรรมการสูบบุหรี่</span>
            <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
              <Cigarette className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{smokers.length}</span>
              <span className="text-xs text-slate-500">ราย ({Math.round((smokers.length / count) * 100)}%)</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>กลุ่มสูบบุหรี่เสี่ยงสูง:</span>
                <strong className="text-rose-600">{smokerHighRiskPct}%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>กลุ่มไม่สูบเสี่ยงสูง:</span>
                <strong className="text-emerald-600">{nonSmokerHighRiskPct}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Alcohol Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">การดื่มเครื่องดื่มแอลกอฮอล์</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Wine className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{drinkers.length}</span>
              <span className="text-xs text-slate-500">ราย ({Math.round((drinkers.length / count) * 100)}%)</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>กลุ่มดื่มแอลกอฮอล์เสี่ยงสูง:</span>
                <strong className="text-rose-600">{drinkerHighRiskPct}%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>กลุ่มไม่ดื่มเสี่ยงสูง:</span>
                <strong className="text-emerald-600">{nonDrinkerHighRiskPct}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">การออกกำลังกาย</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-600">
                {records.filter(r => r.exercise === 'สม่ำเสมอ').length}
              </span>
              <span className="text-xs text-slate-500">ราย ออกกำลังสม่ำเสมอ</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>ไม่ออกกำลังกาย:</span>
                <strong className="text-rose-600">{records.filter(r => r.exercise === 'ไม่ออกกำลังกาย').length} ราย</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ออกกำลังกายบางครั้ง:</span>
                <strong className="text-amber-600">{records.filter(r => r.exercise === 'บางครั้ง').length} ราย</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 1: Charts - Exercise vs Risk Stacked Bar & Behavior Score Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Exercise Level vs Risk Distribution */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">สัดส่วนระดับความเสี่ยงตามการออกกำลังกาย</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">Stacked Bar</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ความแตกต่างของระดับความเสี่ยงในแต่ละกลุ่มพฤติกรรมออกกำลังกาย
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exerciseRiskData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="ต่ำ" stackId="a" fill="#10b981" name="เสี่ยงต่ำ (Low)" />
                <Bar dataKey="ปานกลาง" stackId="a" fill="#f59e0b" name="เสี่ยงปานกลาง (Med)" />
                <Bar dataKey="สูง" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="เสี่ยงสูง (High)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>ข้อค้นพบ: กลุ่มที่ไม่ออกกำลังกายมีสัดส่วนผู้มีความเสี่ยงสูงมากที่สุดถึง {exerciseRiskData[2]?.สูง || 0} ราย</span>
          </div>
        </div>

        {/* Chart 2: Risk Score Comparison across Healthy vs Unhealthy Habits */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">คะแนนความเสี่ยงเฉลี่ยเปรียบเทียบตามพฤติกรรม</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">คะแนน 0-7</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              เปรียบเทียบพฤติกรรมเชิงบวก (Healthy) กับพฤติกรรมเสี่ยง (Risk Factor)
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behaviorComparisonData} margin={{ top: 15, right: 15, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 7]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="คะแนนกลุ่มA" fill="#10b981" radius={[4, 4, 0, 0]} name="พฤติกรรมดี (A)" />
                <Bar dataKey="คะแนนกลุ่มB" fill="#f43f5e" radius={[4, 4, 0, 0]} name="พฤติกรรมเสี่ยง (B)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>การปรับเปลี่ยนพฤติกรรม (งดบุหรี่/สุรา, ออกกำลังกาย) ช่วยลดคะแนนความเสี่ยงสะสมได้อย่างมีนัยสำคัญ</span>
          </div>
        </div>

      </div>

    </div>
  );
};

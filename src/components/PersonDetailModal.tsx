import React from 'react';
import { HealthRecord } from '../types';
import { X, User, Heart, Activity, Droplets, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, MapPin, Calendar } from 'lucide-react';

interface PersonDetailModalProps {
  record: HealthRecord | null;
  onClose: () => void;
}

export const PersonDetailModal: React.FC<PersonDetailModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'สูง':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            ความเสี่ยงสูง (High Risk)
          </span>
        );
      case 'ปานกลาง':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            ความเสี่ยงปานกลาง (Medium Risk)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ความเสี่ยงต่ำ (Low Risk)
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-teal-500/20">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">รหัสบุคคล: {record.id}</h2>
              {getRiskBadge(record.riskLevel)}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                วันที่คัดกรอง: {record.screeningDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                พื้นที่: {record.area}
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="py-4 space-y-4">
          
          {/* Section 1: Demographics & Physical */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <User className="w-4 h-4 text-teal-600" />
              ข้อมูลทั่วไปและดัชนีทางกายภาพ
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">เพศ</span>
                <span className="font-bold text-slate-900">{record.gender}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">อายุ</span>
                <span className="font-bold text-slate-900">{record.age} ปี</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">ส่วนสูง / น้ำหนัก</span>
                <span className="font-bold text-slate-900">{record.heightCm} cm / {record.weightKg} kg</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">BMI</span>
                <span className={`font-extrabold ${record.bmi >= 25 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {record.bmi} kg/m²
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Vitals */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-600" />
              ผลการตรวจทางคลินิกและสัญญาณชีพ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">ความดันโลหิต (SBP/DBP)</span>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">
                  {record.sbp} / {record.dbp} <span className="text-[10px] font-normal text-slate-500">mmHg</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  คัดกรอง: <strong className={record.hypertensionScreening.includes('เสี่ยง') ? 'text-rose-600' : 'text-emerald-600'}>{record.hypertensionScreening}</strong>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">ระดับน้ำตาลในเลือด</span>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">
                  {record.bloodSugar} <span className="text-[10px] font-normal text-slate-500">mg/dL</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  คัดกรอง: <strong className={record.diabetesScreening.includes('เสี่ยง') ? 'text-rose-600' : 'text-emerald-600'}>{record.diabetesScreening}</strong>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[11px]">อัตราการเต้นชีพจร</span>
                <div className="text-base font-extrabold text-slate-900 mt-0.5">
                  {record.pulse} <span className="text-[10px] font-normal text-slate-500">bpm</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  คะแนนเสี่ยงรวม: <strong className="text-slate-900 font-bold">{record.riskScore} / 7</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Health Behaviors */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-purple-600" />
              พฤติกรรมสุขภาพและการใช้ชีวิต
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-center">
                <span className="text-slate-500 block text-[10px]">การสูบบุหรี่</span>
                <span className={`font-bold ${record.smoking === 'สูบ' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {record.smoking}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-center">
                <span className="text-slate-500 block text-[10px]">การดื่มแอลกอฮอล์</span>
                <span className={`font-bold ${record.alcohol === 'ดื่ม' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {record.alcohol}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-center">
                <span className="text-slate-500 block text-[10px]">การออกกำลังกาย</span>
                <span className={`font-bold ${record.exercise === 'ไม่ออกกำลังกาย' ? 'text-rose-600' : record.exercise === 'สม่ำเสมอ' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {record.exercise}
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            record.riskLevel === 'สูง' ? 'bg-rose-50 border-rose-200 text-rose-900' :
            record.riskLevel === 'ปานกลาง' ? 'bg-amber-50 border-amber-200 text-amber-900' :
            'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1 text-slate-900">
              <ShieldAlert className="w-4 h-4 text-slate-700" />
              คำแนะนำทางการพยาบาลและเวชระเบียน:
            </div>
            {record.riskLevel === 'สูง' && (
              <p>
                ผู้ป่วยมีความเสี่ยงสูงต่อโรคไม่ติดต่อเรื้อรัง (NCDs) ควรส่งต่อพบแพทย์เพื่อตรวจยืนยันทางห้องปฏิบัติการ (FBS, Lipid profile), ติดตามวัดความดันโลหิตซ้ำ และจัดโปรแกรมปรับเปลี่ยนพฤติกรรม (ลดหวาน มัน เค็ม และเริ่มออกกำลังกายเบาๆ)
              </p>
            )}
            {record.riskLevel === 'ปานกลาง' && (
              <p>
                อยู่ในเกณฑ์เฝ้าระวัง ควรให้สุขศึกษาด้านโภชนาการ หลีกเลี่ยงอาหารรสจัดและการดื่มสุรา พร้อมทั้งกระตุ้นให้ออกกำลังกายอย่างน้อย 150 นาทีต่อสัปดาห์ และนัดตรวจคัดกรองซ้ำในอีก 6 เดือน
              </p>
            )}
            {record.riskLevel === 'ต่ำ' && (
              <p>
                สุขภาพร่างกายอยู่ในเกณฑ์ดี แนะนำให้รักษาพฤติกรรมสุขภาพที่ดีอย่างต่อเนื่อง (ออกกำลังกายสม่ำเสมอ ทานอาหารครบ 5 หมู่) และเข้ารับการตรวจคัดกรองสุขภาพประจำปีอย่างสม่ำเสมอ
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

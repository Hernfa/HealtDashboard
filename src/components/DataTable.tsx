import React, { useState, useMemo } from 'react';
import { HealthRecord } from '../types';
import { Download, ArrowUpDown, ChevronLeft, ChevronRight, Eye, AlertOctagon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PersonDetailModal } from './PersonDetailModal';

interface DataTableProps {
  records: HealthRecord[];
}

type SortField = 'id' | 'age' | 'bmi' | 'bloodSugar' | 'sbp' | 'riskScore' | 'screeningDate';

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [records, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = sortedRecords.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'รหัสบุคคล', 'วันที่คัดกรอง', 'พื้นที่', 'เพศ', 'อายุ', 'ส่วนสูง_cm', 'น้ำหนัก_kg',
      'BMI', 'SBP_mmHg', 'DBP_mmHg', 'ชีพจร_bpm', 'น้ำตาล_mg_dL', 'สูบบุหรี่', 'ดื่มแอลกอฮอล์',
      'การออกกำลังกาย', 'เบาหวาน_คัดกรอง', 'ความดันโลหิตสูง_คัดกรอง', 'คะแนนความเสี่ยง', 'ระดับความเสี่ยง'
    ];

    const rows = sortedRecords.map(r => [
      r.id, r.screeningDate, r.area, r.gender, r.age, r.heightCm, r.weightKg,
      r.bmi, r.sbp, r.dbp, r.pulse, r.bloodSugar, r.smoking, r.alcohol,
      r.exercise, r.diabetesScreening, r.hypertensionScreening, r.riskScore, r.riskLevel
    ]);

    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `health_screening_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="data-table-container" className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden space-y-4 p-5">
      
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>ตารางข้อมูลเชิงลึกรายบุคคล (Data Table / Detail View)</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              ทั้งหมด {records.length} ราย
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            คลิกที่แถวใดๆ เพื่อเปิดเวชระเบียนและผลการประเมินความเสี่ยงรายบุคคลฉบับเต็ม
          </p>
        </div>

        {/* Legend for Risk Colors */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
          <span className="text-slate-500 text-[11px] font-semibold mr-1">เกณฑ์สี:</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs" />
            เขียว = เสี่ยงต่ำ
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-2xs" />
            เหลือง = เสี่ยงปานกลาง
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-2xs" />
            แดง = เสี่ยงสูง
          </span>
        </div>

        {/* CSV Export Button */}
        <button
          id="btn-export-csv"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 active:scale-95 transition"
          title="ดาวน์โหลดข้อมูลเป็นไฟล์ CSV"
        >
          <Download className="w-4 h-4" />
          <span>ส่งออก CSV</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
            <tr>
              <th scope="col" className="px-3.5 py-3">
                <button 
                  onClick={() => handleSort('id')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  รหัสบุคคล <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('screeningDate')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  วันที่ <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3 font-bold">พื้นที่</th>
              <th scope="col" className="px-3 py-3 font-bold">เพศ</th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('age')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  อายุ <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('bmi')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  BMI <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('bloodSugar')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  น้ำตาล (mg/dL) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('sbp')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  ความดัน (SBP/DBP) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3 py-3 font-bold">พฤติกรรม (สูบ/ดื่ม/ออกกำลัง)</th>
              <th scope="col" className="px-3 py-3">
                <button 
                  onClick={() => handleSort('riskScore')} 
                  className="flex items-center gap-1 hover:text-slate-900 transition font-bold"
                >
                  คะแนน <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="px-3.5 py-3 text-center font-bold">ระดับความเสี่ยง</th>
              <th scope="col" className="px-2 py-3 text-center font-bold">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-center text-slate-400">
                  ไม่พบข้อมูลตามเงื่อนไขตัวกรอง
                </td>
              </tr>
            ) : (
              paginatedRecords.map((record) => {
                const isHigh = record.riskLevel === 'สูง';
                const isMedium = record.riskLevel === 'ปานกลาง';
                const isLow = record.riskLevel === 'ต่ำ';

                return (
                  <tr
                    key={record.id}
                    onClick={() => setSelectedRecord(record)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-3.5 py-3 font-mono font-bold text-slate-900">
                      {record.id}
                    </td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                      {record.screeningDate}
                    </td>
                    <td className="px-3 py-3 text-slate-700 font-medium">
                      {record.area}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {record.gender}
                    </td>
                    <td className="px-3 py-3 text-slate-900 font-semibold">
                      {record.age}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`font-bold ${record.bmi >= 25 ? 'text-amber-700' : 'text-slate-800'}`}>
                        {record.bmi}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`font-bold ${record.bloodSugar >= 126 ? 'text-rose-600' : record.bloodSugar >= 100 ? 'text-amber-700' : 'text-slate-800'}`}>
                        {record.bloodSugar}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`font-bold ${record.sbp >= 140 ? 'text-rose-600' : record.sbp >= 130 ? 'text-amber-700' : 'text-slate-800'}`}>
                        {record.sbp}/{record.dbp}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-500 text-[11px] whitespace-nowrap">
                      <span>{record.smoking}</span> • <span>{record.alcohol}</span> • <span>{record.exercise}</span>
                    </td>
                    <td className="px-3 py-3 font-extrabold text-slate-900">
                      {record.riskScore}
                    </td>
                    <td className="px-3.5 py-3 text-center">
                      {isHigh && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                          เสี่ยงสูง
                        </span>
                      )}
                      {isMedium && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          เสี่ยงปานกลาง
                        </span>
                      )}
                      {isLow && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          เสี่ยงต่ำ
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(record);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition"
                        title="ดูรายละเอียดเชิงลึก"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>แสดงแถวต่อหน้า:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-white text-slate-700 rounded-lg border border-slate-300 px-2.5 py-1 focus:outline-none font-medium cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30 (ทั้งหมด)</option>
          </select>
          <span>
            หน้า {page} จาก {totalPages} (รายการที่ {Math.min((page - 1) * pageSize + 1, sortedRecords.length)} - {Math.min(page * pageSize, sortedRecords.length)})
          </span>
        </div>

        <div className="flex items-center gap-1 self-end sm:self-auto">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition"
            aria-label="หน้าก่อนหน้า"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2.5 text-slate-900 font-bold">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition"
            aria-label="หน้าถัดไป"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <PersonDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

    </div>
  );
};

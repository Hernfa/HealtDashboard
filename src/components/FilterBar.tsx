import React from 'react';
import { Filter, Search, RotateCcw, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  totalRecords: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalRecords,
  filteredCount
}) => {
  const isFiltered =
    filters.ageGroup !== 'all' ||
    filters.gender !== 'all' ||
    filters.riskLevel !== 'all' ||
    filters.area !== 'all' ||
    filters.searchQuery.trim() !== '';

  return (
    <div id="filter-controls-card" className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Filter Title & Counter */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100">
              <Filter className="w-4 h-4" />
            </div>
            <span>ระบบตัวกรองข้อมูล (Filters)</span>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
            แสดง <strong className="text-emerald-600 font-bold">{filteredCount}</strong> จาก {totalRecords} ราย
          </span>
        </div>

        {/* Filter selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:flex items-center gap-2.5">
          
          {/* Age Group Filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-age-group" className="text-[11px] text-slate-500 font-medium">
              ช่วงอายุ
            </label>
            <select
              id="filter-age-group"
              value={filters.ageGroup}
              onChange={(e) => onFilterChange('ageGroup', e.target.value)}
              className="bg-slate-50 hover:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition font-medium cursor-pointer"
            >
              <option value="all">ช่วงอายุทั้งหมด</option>
              <option value="<30">ต่ำกว่า 30 ปี (&lt;30)</option>
              <option value="30-44">30 - 44 ปี</option>
              <option value="45-59">45 - 59 ปี</option>
              <option value="60+">60 ปีขึ้นไป (60+)</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-gender" className="text-[11px] text-slate-500 font-medium">
              เพศ
            </label>
            <select
              id="filter-gender"
              value={filters.gender}
              onChange={(e) => onFilterChange('gender', e.target.value)}
              className="bg-slate-50 hover:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition font-medium cursor-pointer"
            >
              <option value="all">เพศทั้งหมด</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-risk-level" className="text-[11px] text-slate-500 font-medium">
              ระดับความเสี่ยง
            </label>
            <select
              id="filter-risk-level"
              value={filters.riskLevel}
              onChange={(e) => onFilterChange('riskLevel', e.target.value)}
              className="bg-slate-50 hover:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition font-medium cursor-pointer"
            >
              <option value="all">ความเสี่ยงทั้งหมด</option>
              <option value="ต่ำ">🟢 เสี่ยงต่ำ (Low)</option>
              <option value="ปานกลาง">🟡 เสี่ยงปานกลาง (Med)</option>
              <option value="สูง">🔴 เสี่ยงสูง (High)</option>
            </select>
          </div>

          {/* Area Filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-area" className="text-[11px] text-slate-500 font-medium">
              พื้นที่
            </label>
            <select
              id="filter-area"
              value={filters.area}
              onChange={(e) => onFilterChange('area', e.target.value)}
              className="bg-slate-50 hover:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition font-medium cursor-pointer"
            >
              <option value="all">พื้นที่ทั้งหมด</option>
              <option value="เมือง">เมือง</option>
              <option value="เหนือ">เหนือ</option>
              <option value="ตะวันออก">ตะวันออก</option>
              <option value="ตะวันตก">ตะวันตก</option>
              <option value="ใต้">ใต้</option>
            </select>
          </div>

          {/* Search Query */}
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-search" className="text-[11px] text-slate-500 font-medium">
              ค้นหารหัสบุคคล
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                id="filter-search"
                type="text"
                placeholder="เช่น H0001, ใต้..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                className="bg-slate-50 hover:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 pl-8 pr-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition w-full sm:w-36 font-medium"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange('searchQuery', '')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Reset button */}
          {isFiltered && (
            <div className="flex flex-col gap-1 sm:self-end">
              <span className="text-[11px] text-transparent select-none hidden sm:block">ล้าง</span>
              <button
                id="btn-reset-filters"
                onClick={onResetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition shadow-2xs"
                title="ล้างการเลือกตัวกรองทั้งหมด"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตตัวกรอง</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

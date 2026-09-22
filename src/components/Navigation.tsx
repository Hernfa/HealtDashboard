import React from 'react';
import { Home, ShieldAlert, TrendingUp, Activity, Table } from 'lucide-react';
import { NavigationTab } from '../types';

interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  recordCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  recordCount
}) => {
  const tabs = [
    {
      id: 'home' as NavigationTab,
      label: 'Home',
      sublabel: 'กลับสู่หน้าหลัก',
      icon: Home,
      accent: 'from-blue-600 to-indigo-600',
      activeText: 'text-blue-700',
      activeBg: 'bg-blue-50/80 border-blue-200 text-blue-800'
    },
    {
      id: 'risk' as NavigationTab,
      label: 'Health Risk',
      sublabel: 'ข้อมูลด้านความเสี่ยงสุขภาพ',
      icon: ShieldAlert,
      accent: 'from-rose-500 to-red-600',
      activeText: 'text-rose-700',
      activeBg: 'bg-rose-50/80 border-rose-200 text-rose-800'
    },
    {
      id: 'trend' as NavigationTab,
      label: 'Health Trend',
      sublabel: 'แนวโน้มสุขภาพตามช่วงเวลา',
      icon: TrendingUp,
      accent: 'from-teal-500 to-emerald-600',
      activeText: 'text-teal-700',
      activeBg: 'bg-teal-50/80 border-teal-200 text-teal-800'
    },
    {
      id: 'behavior' as NavigationTab,
      label: 'Health Behavior',
      sublabel: 'พฤติกรรมสุขภาพ & ความเสี่ยง',
      icon: Activity,
      accent: 'from-purple-500 to-violet-600',
      activeText: 'text-purple-700',
      activeBg: 'bg-purple-50/80 border-purple-200 text-purple-800'
    },
    {
      id: 'table' as NavigationTab,
      label: 'Detail View',
      sublabel: 'ข้อมูลรายละเอียดรายบุคคล',
      icon: Table,
      badge: `${recordCount} ราย`,
      accent: 'from-amber-500 to-orange-600',
      activeText: 'text-amber-800',
      activeBg: 'bg-amber-50/80 border-amber-200 text-amber-800'
    }
  ];

  return (
    <nav id="main-navigation" className="bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-btn-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                  isActive
                    ? `${tab.activeBg} shadow-xs scale-[1.01]`
                    : 'bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? tab.activeText : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`hidden md:inline text-[11px] font-normal ${isActive ? 'opacity-80' : 'text-slate-400'}`}>
                  ({tab.sublabel})
                </span>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 ${
                    isActive ? 'bg-amber-200/60 text-amber-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

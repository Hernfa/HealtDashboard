import React, { useState, useEffect, useMemo } from 'react';
import { HealthRecord, NavigationTab, FilterState } from './types';
import { INITIAL_HEALTH_RECORDS, fetchGoogleSheetRecords, calculateMetrics, GOOGLE_SHEET_ID } from './data/healthData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FilterBar } from './components/FilterBar';
import { KPICards } from './components/KPICards';
import { HomeView } from './components/HomeView';
import { HealthRiskView } from './components/HealthRiskView';
import { HealthTrendView } from './components/HealthTrendView';
import { HealthBehaviorView } from './components/HealthBehaviorView';
import { DataTable } from './components/DataTable';

export default function App() {
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [lastUpdated, setLastUpdated] = useState<string>('22 กันยายน พ.ศ.2569');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  const [filters, setFilters] = useState<FilterState>({
    ageGroup: 'all',
    gender: 'all',
    riskLevel: 'all',
    area: 'all',
    searchQuery: '',
  });

  // Background fetch from the Google Sheet on initial mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const liveRecords = await fetchGoogleSheetRecords(GOOGLE_SHEET_ID);
        if (isMounted && liveRecords && liveRecords.length > 0) {
          setRecords(liveRecords);
        }
      } catch (err) {
        // Silently fallback to embedded dataset if blocked or network error
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Refresh handler: re-fetches latest records from Google Sheet in background
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const liveRecords = await fetchGoogleSheetRecords(GOOGLE_SHEET_ID);
      if (liveRecords && liveRecords.length > 0) {
        setRecords(liveRecords);
      }
      const now = new Date();
      const thaiTime = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setLastUpdated(`22 กันยายน พ.ศ.2569 (${thaiTime} น.)`);
    } catch (e) {
      // Fallback
    } finally {
      setTimeout(() => setIsRefreshing(false), 450);
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      ageGroup: 'all',
      gender: 'all',
      riskLevel: 'all',
      area: 'all',
      searchQuery: '',
    });
  };

  // Filter records based on active filters
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Age group
      if (filters.ageGroup !== 'all') {
        if (filters.ageGroup === '<30' && record.age >= 30) return false;
        if (filters.ageGroup === '30-44' && (record.age < 30 || record.age > 44)) return false;
        if (filters.ageGroup === '45-59' && (record.age < 45 || record.age > 59)) return false;
        if (filters.ageGroup === '60+' && record.age < 60) return false;
      }

      // Gender
      if (filters.gender !== 'all' && record.gender !== filters.gender) {
        return false;
      }

      // Risk level
      if (filters.riskLevel !== 'all' && record.riskLevel !== filters.riskLevel) {
        return false;
      }

      // Area
      if (filters.area !== 'all' && record.area !== filters.area) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesId = record.id.toLowerCase().includes(query);
        const matchesArea = record.area.toLowerCase().includes(query);
        if (!matchesId && !matchesArea) return false;
      }

      return true;
    });
  }, [records, filters]);

  // Calculate KPIs for the currently filtered set
  const metrics = useMemo(() => {
    return calculateMetrics(filteredRecords);
  }, [filteredRecords]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* 1. Header & Control System */}
      <Header
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
        totalRecords={records.length}
      />

      {/* 5. Navigation Controls */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        recordCount={filteredRecords.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Filter Controls (Available across all tabs for live cross-filtering) */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalRecords={records.length}
          filteredCount={filteredRecords.length}
        />

        {/* 2. KPI Cards / Summary Cards (Always visible as the central metric backbone) */}
        <KPICards
          metrics={metrics}
          totalDatasetCount={records.length}
        />

        {/* Tab Views */}
        <div className="pt-1">
          {activeTab === 'home' && (
            <HomeView
              records={filteredRecords}
              metrics={metrics}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'risk' && (
            <HealthRiskView
              records={filteredRecords}
              metrics={metrics}
            />
          )}

          {activeTab === 'trend' && (
            <HealthTrendView
              records={filteredRecords}
              metrics={metrics}
            />
          )}

          {activeTab === 'behavior' && (
            <HealthBehaviorView
              records={filteredRecords}
              metrics={metrics}
            />
          )}

          {activeTab === 'table' && (
            <DataTable
              records={filteredRecords}
            />
          )}
        </div>

      </main>

      {/* Footer - clean and no Google Sheet references visible */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-slate-800 font-semibold">Dashboard การคัดกรองสุขภาพ</span> — สาขาวิชาเวชระเบียน
            <span className="block sm:inline sm:ml-2 text-slate-500">
              จัดทำโดย <strong className="text-slate-700">นายเหิรฟ้า อุทาหงษ์</strong> (นักศึกษาสาขาวิชาเวชระเบียนชั้นปีที่ 3)
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>ข้อมูล ณ วันที่ 22 กันยายน พ.ศ.2569</span>
            <span>•</span>
            <span className="text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-600 border border-slate-200 font-medium">
              ฐานข้อมูลคัดกรองสุขภาพ NCDs ({records.length} ราย)
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

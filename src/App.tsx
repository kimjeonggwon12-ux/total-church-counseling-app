import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

interface SheetData {
  [key: string]: any;
}

function App() {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(getDemoData());
    setLoading(false);
  }, []);

  const getDemoData = () => {
    return Array.from({ length: 84 }, (_, i) => ({
      번호: String(i + 1),
      교회: '도마지파',
      성명: `사명자${i + 1}`,
      현재사명: '구역장',
      맡고싶은사명: '목사',
      사명유무: i % 2 === 0 ? '✓' : '',
      건강요인: i % 3 === 0 ? '건강함' : i % 3 === 1 ? '보통' : '주의',
      환경요인: i % 2 === 0 ? '가정 화목' : '직장 스트레스',
      면담내용: `면담 내용 ${i + 1}`,
      상담완료: i % 3 === 0 ? '✓' : '',
      index: i
    }));
  };

  if (loading) {
    return <div className="loading">📊 데이터 로딩 중...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📋 총글사 1:1 면담 기록 관리 시스템</h1>
        <p>도마지파 전주교회 교육부</p>
      </header>
      <Dashboard data={data} onRefresh={() => {}} />
    </div>
  );
}

export default App;

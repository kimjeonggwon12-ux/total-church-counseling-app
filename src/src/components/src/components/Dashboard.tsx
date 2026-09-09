import React, { useState } from 'react';
import Modal from './Modal';
import './Dashboard.css';

interface DashboardProps {
  data: any[];
  onRefresh: () => void;
}

function Dashboard({ data, onRefresh }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter(item =>
    (item.성명 && item.성명.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.교회 && item.교회.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = {
    total: data.length,
    completed: data.filter(item => item.상담완료 === '✓').length,
    progress: Math.round((data.filter(item => item.사명유무 === '✓').length / (data.length || 1)) * 100) || 0
  };

  const handleRowClick = (item: any) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData: any) => {
    console.log('저장됨:', updatedData);
    setIsModalOpen(false);
    onRefresh();
  };

  const handleDownloadReport = () => {
    let reportHTML = `
      <html>
      <head>
        <meta charset="UTF-8">
        <title>면담 보고서</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          .stats { margin-bottom: 20px; padding: 10px; background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>총글사 1:1 면담 기록 보고서</h1>
        <div class="stats">
          <p><strong>사명 진행율:</strong> ${stats.progress}%</p>
          <p><strong>상담 완료:</strong> ${stats.completed}명</p>
          <p><strong>미진행:</strong> ${stats.total - stats.completed}명</p>
          <p><strong>총 인원:</strong> ${stats.total}명</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>교회</th>
              <th>성명</th>
              <th>현재사명</th>
              <th>맡고싶은사명</th>
              <th>사명유무</th>
              <th>건강요인</th>
              <th>환경요인</th>
              <th>면담내용</th>
            </tr>
          </thead>
          <tbody>
    `;

    data.forEach(item => {
      reportHTML += `
        <tr>
          <td>${item.번호}</td>
          <td>${item.교회}</td>
          <td>${item.성명}</td>
          <td>${item.현재사명}</td>
          <td>${item.맡고싶은사명}</td>
          <td>${item.사명유무}</td>
          <td>${item.건강요인}</td>
          <td>${item.환경요인}</td>
          <td>${item.면담내용}</td>
        </tr>
      `;
    });

    reportHTML += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(reportHTML);
      newWindow.document.close();
    }
  };

  return (
    <div className="dashboard">
      <div className="controls">
        <input
          type="text"
          placeholder="이름, 교회로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />
        <button className="refresh-btn" onClick={onRefresh}>🔄 새로고침</button>
        <button className="download-btn" onClick={handleDownloadReport}>📥 보고서 다운로드</button>
      </div>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-label">📊 사명 진행율</div>
          <div className="stat-number">{stats.progress}%</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">✓ 상담 완료</div>
          <div className="stat-number">{stats.completed}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">○ 미진행</div>
          <div className="stat-number">{stats.total - stats.completed}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">📈 총 인원</div>
          <div className="stat-number">{stats.total}</div>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>번호</th>
              <th>교회</th>
              <th>성명</th>
              <th>맡고싶은사명</th>
              <th>건강</th>
              <th>환경</th>
              <th>상담</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                <td>{item.번호}</td>
                <td>{item.교회}</td>
                <td>{item.성명}</td>
                <td>{item.맡고싶은사명 ? item.맡고싶은사명.substring(0, 15) : '-'}</td>
                <td>{item.건강요인 ? item.건강요인.substring(0, 10) : '-'}</td>
                <td>{item.환경요인 ? item.환경요인.substring(0, 10) : '-'}</td>
                <td>
                  <span className={`badge ${item.상담완료 ? 'done' : 'pending'}`}>
                    {item.상담완료 ? '완료' : '미진행'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedRow && (
        <Modal
          data={selectedRow}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;

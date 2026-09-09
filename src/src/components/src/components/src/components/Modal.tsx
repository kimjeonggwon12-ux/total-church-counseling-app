import React, { useState } from 'react';
import './Modal.css';

interface ModalProps {
  data: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

function Modal({ data, onSave, onClose }: ModalProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleToggle = (field: string) => {
    setFormData({
      ...formData,
      [field]: formData[field] === '✓' ? '' : '✓'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData.성명}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>📋 현재의 사명</label>
            <input
              type="text"
              value={formData.현재사명}
              onChange={(e) => handleChange('현재사명', e.target.value)}
              placeholder="현재 맡고 있는 사명"
            />
          </div>

          <div className="form-group">
            <label>💭 맡고 싶은 사명</label>
            <input
              type="text"
              value={formData.맡고싶은사명}
              onChange={(e) => handleChange('맡고싶은사명', e.target.value)}
              placeholder="향후 맡고 싶은 사명"
            />
          </div>

          <div className="form-group">
            <label>
              📍 사명 유무 체크
              <input
                type="checkbox"
                checked={formData.사명유무 === '✓'}
                onChange={() => handleToggle('사명유무')}
              />
            </label>
          </div>

          <div className="form-group">
            <label>💪 건강 요인</label>
            <textarea
              value={formData.건강요인}
              onChange={(e) => handleChange('건강요인', e.target.value)}
              placeholder="건강 상태에 대해 기록"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>🌍 환경 요인</label>
            <textarea
              value={formData.환경요인}
              onChange={(e) => handleChange('환경요인', e.target.value)}
              placeholder="가정, 직장 등 환경 요인 기록"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>📝 면담 내용</label>
            <textarea
              value={formData.면담내용}
              onChange={(e) => handleChange('면담내용', e.target.value)}
              placeholder="면담 시 나눈 내용 기록"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>
              ☑️ 상담 완료
              <input
                type="checkbox"
                checked={formData.상담완료 === '✓'}
                onChange={() => handleToggle('상담완료')}
              />
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={() => onSave(formData)}>💾 저장</button>
          <button className="cancel-btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import { useState } from 'react';
import './VocaForm.css';

function VocaForm({ onAddVoca, onUpdateVoca, editingVoca, onCancelEdit }) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!word.trim() || !meaning.trim()) {
      alert('단어와 뜻을 모두 입력해주세요.');
      return;
    }

    if (editingVoca) {
      onUpdateVoca(editingVoca.id, { word, meaning });
    } else {
      onAddVoca({ word, meaning });
    }

    setWord('');
    setMeaning('');
  };

  return (
    <form className="voca-form" onSubmit={handleSubmit}>
      <h2>{editingVoca ? '단어 수정' : '새 단어 등록'}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="영어 단어"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="한글 뜻"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingVoca ? '수정' : '등록'}
        </button>
        {editingVoca && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}

export default VocaForm;

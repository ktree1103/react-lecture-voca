import { useState } from 'react';
import './TestPage.css';

function TestPage({ vocaList }) {
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAll = () => {
    setFlippedCards({});
  };

  if (vocaList.length === 0) {
    return (
      <div className="test-page">
        <div className="page-header">
          <h2>영어 단어 테스트</h2>
          <p>단어를 클릭하면 뜻이 표시됩니다</p>
        </div>
        <div className="empty-state">
          <p>등록된 단어가 없습니다.</p>
          <p>먼저 '단어 등록' 메뉴에서 단어를 추가해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="page-header">
        <h2>영어 단어 테스트</h2>
        <p>단어를 클릭하면 뜻이 표시됩니다</p>
      </div>

      <div className="test-controls">
        <button onClick={resetAll} className="reset-button">
          모두 뒤집기
        </button>
        <div className="test-count">
          총 {vocaList.length}개의 단어
        </div>
      </div>

      <div className="test-cards-grid">
        {vocaList.map((voca) => (
          <div
            key={voca.id}
            className={`test-card ${flippedCards[voca.id] ? 'flipped' : ''}`}
            onClick={() => handleCardClick(voca.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-word">{voca.word}</div>
                <div className="card-hint">클릭하여 뜻 보기</div>
              </div>
              <div className="card-back">
                <div className="card-meaning">{voca.meaning}</div>
                <div className="card-hint">클릭하여 단어 보기</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestPage;

import VocaItem from './VocaItem';
import './VocaList.css';

function VocaList({ vocaList, onEdit, onDelete }) {
  if (vocaList.length === 0) {
    return (
      <div className="voca-list empty">
        <p>등록된 단어가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="voca-list">
      <h2>단어 목록 ({vocaList.length}개)</h2>
      <div className="voca-items">
        {vocaList.map((voca) => (
          <VocaItem
            key={voca.id}
            voca={voca}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default VocaList;

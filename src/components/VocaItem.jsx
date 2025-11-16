import './VocaItem.css';

function VocaItem({ voca, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`"${voca.word}"를 삭제하시겠습니까?`)) {
      onDelete(voca.id);
    }
  };

  return (
    <div className="voca-item">
      <div className="voca-content">
        <div className="voca-word">{voca.word}</div>
        <div className="voca-meaning">{voca.meaning}</div>
      </div>
      <div className="voca-actions">
        <button className="btn-edit" onClick={() => onEdit(voca)}>
          수정
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default VocaItem;

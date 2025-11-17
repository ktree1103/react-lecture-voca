import { useState } from 'react';
import VocaList from '../components/VocaList';
import VocaForm from '../components/VocaForm';
import './ViewPage.css';

function ViewPage({ vocaList, onEdit, onDelete, onUpdateVoca }) {
  const [editingVoca, setEditingVoca] = useState(null);

  const handleEdit = (voca) => {
    setEditingVoca(voca);
    // 편집 폼이 있는 위치로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateVoca = async (id, vocaData) => {
    await onUpdateVoca(id, vocaData);
    setEditingVoca(null);
  };

  const handleCancelEdit = () => {
    setEditingVoca(null);
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    // 삭제하려는 단어가 현재 수정 중인 단어라면 수정 모드 해제
    if (editingVoca && editingVoca.id === id) {
      setEditingVoca(null);
    }
  };

  return (
    <div className="view-page">
      <div className="page-header">
        <h2>영어 단어 보기</h2>
        <p>등록된 단어를 확인하고 관리하세요</p>
      </div>

      {editingVoca && (
        <div className="edit-form-container">
          <h3>단어 수정</h3>
          <VocaForm
            onAddVoca={() => {}}
            onUpdateVoca={handleUpdateVoca}
            editingVoca={editingVoca}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      )}

      <VocaList
        vocaList={vocaList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ViewPage;

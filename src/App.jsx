import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase/config';
import VocaForm from './components/VocaForm';
import VocaList from './components/VocaList';
import './App.css';

function App() {
  const [vocaList, setVocaList] = useState([]);
  const [editingVoca, setEditingVoca] = useState(null);

  // 단어 등록
  const handleAddVoca = async (vocaData) => {
    try {
      const docRef = await addDoc(collection(db, 'vocabulary'), {
        word: vocaData.word,
        meaning: vocaData.meaning,
        createdAt: Timestamp.now()
      });

      console.log('단어가 등록되었습니다. ID:', docRef.id);
      alert('단어가 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('단어 등록 오류:', error);
      alert('단어 등록 중 오류가 발생했습니다.');
    }
  };

  // 단어 수정 (Update) - 다음 단계에서 구현
  const handleUpdateVoca = (id, vocaData) => {
    console.log('수정 기능은 다음 단계에서 구현됩니다.');
  };

  // 단어 삭제 (Delete) - 다음 단계에서 구현
  const handleDeleteVoca = (id) => {
    console.log('삭제 기능은 다음 단계에서 구현됩니다.');
  };

  // 수정 모드로 전환
  const handleEditVoca = (voca) => {
    setEditingVoca(voca);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingVoca(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>영어 단어장</h1>
          <p>영어 단어를 등록하고 관리하세요</p>
        </header>

        <VocaForm
          onAddVoca={handleAddVoca}
          onUpdateVoca={handleUpdateVoca}
          editingVoca={editingVoca}
          onCancelEdit={handleCancelEdit}
        />

        <VocaList
          vocaList={vocaList}
          onEdit={handleEditVoca}
          onDelete={handleDeleteVoca}
        />
      </div>
    </div>
  );
}

export default App;

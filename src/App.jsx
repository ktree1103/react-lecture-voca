import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase/config';
import VocaForm from './components/VocaForm';
import VocaList from './components/VocaList';
import './App.css';

function App() {
  const [vocaList, setVocaList] = useState([]);
  const [editingVoca, setEditingVoca] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firestore에서 실시간으로 단어 목록 가져오기
  useEffect(() => {
    const q = query(collection(db, 'vocabulary'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vocaData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVocaList(vocaData);
      setLoading(false);
    }, (error) => {
      console.error('단어 목록 가져오기 오류:', error);
      setLoading(false);
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => unsubscribe();
  }, []);

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

  // 단어 수정
  const handleUpdateVoca = async (id, vocaData) => {
    try {
      const docRef = doc(db, 'vocabulary', id);
      await updateDoc(docRef, {
        word: vocaData.word,
        meaning: vocaData.meaning
      });

      console.log('단어가 수정되었습니다. ID:', id);
      alert('단어가 성공적으로 수정되었습니다!');
      setEditingVoca(null); // 수정 완료 후 수정 모드 해제
    } catch (error) {
      console.error('단어 수정 오류:', error);
      alert('단어 수정 중 오류가 발생했습니다.');
    }
  };

  // 단어 삭제
  const handleDeleteVoca = async (id) => {
    try {
      const docRef = doc(db, 'vocabulary', id);
      await deleteDoc(docRef);

      console.log('단어가 삭제되었습니다. ID:', id);
      alert('단어가 성공적으로 삭제되었습니다!');

      // 삭제하려는 단어가 현재 수정 중인 단어라면 수정 모드 해제
      if (editingVoca && editingVoca.id === id) {
        setEditingVoca(null);
      }
    } catch (error) {
      console.error('단어 삭제 오류:', error);
      alert('단어 삭제 중 오류가 발생했습니다.');
    }
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

        {loading ? (
          <div className="loading">단어 목록을 불러오는 중...</div>
        ) : (
          <VocaList
            vocaList={vocaList}
            onEdit={handleEditVoca}
            onDelete={handleDeleteVoca}
          />
        )}
      </div>
    </div>
  );
}

export default App;

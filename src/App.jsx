import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase/config';
import BottomNavigation from './components/BottomNavigation';
import RegisterPage from './pages/RegisterPage';
import ViewPage from './pages/ViewPage';
import TestPage from './pages/TestPage';
import './App.css';

function App() {
  const [vocaList, setVocaList] = useState([]);
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
    } catch (error) {
      console.error('단어 삭제 오류:', error);
      alert('단어 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading">단어 목록을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route
              path="/register"
              element={<RegisterPage onAddVoca={handleAddVoca} />}
            />
            <Route
              path="/view"
              element={
                <ViewPage
                  vocaList={vocaList}
                  onEdit={() => {}}
                  onDelete={handleDeleteVoca}
                  onUpdateVoca={handleUpdateVoca}
                />
              }
            />
            <Route
              path="/test"
              element={<TestPage vocaList={vocaList} />}
            />
          </Routes>
        </div>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;

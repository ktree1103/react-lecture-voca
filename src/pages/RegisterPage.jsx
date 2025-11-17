import VocaForm from '../components/VocaForm';
import './RegisterPage.css';

function RegisterPage({ onAddVoca }) {
  return (
    <div className="register-page">
      <div className="page-header">
        <h2>영어 단어 등록</h2>
        <p>새로운 영어 단어를 등록하세요</p>
      </div>

      <VocaForm
        onAddVoca={onAddVoca}
        onUpdateVoca={() => {}}
        editingVoca={null}
        onCancelEdit={() => {}}
      />

      <div className="register-tips">
        <h3>📝 등록 팁</h3>
        <ul>
          <li>영어 단어와 한글 뜻을 정확히 입력하세요</li>
          <li>등록한 단어는 '단어 보기'에서 확인할 수 있습니다</li>
          <li>'단어 테스트'에서 학습할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}

export default RegisterPage;

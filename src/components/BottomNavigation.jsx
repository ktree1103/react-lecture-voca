import { NavLink } from 'react-router-dom';
import './BottomNavigation.css';

function BottomNavigation() {
  return (
    <nav className="bottom-navigation">
      <NavLink
        to="/register"
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <div className="nav-icon">✏️</div>
        <div className="nav-label">단어 등록</div>
      </NavLink>

      <NavLink
        to="/view"
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <div className="nav-icon">📖</div>
        <div className="nav-label">단어 보기</div>
      </NavLink>

      <NavLink
        to="/test"
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <div className="nav-icon">✅</div>
        <div className="nav-label">단어 테스트</div>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;

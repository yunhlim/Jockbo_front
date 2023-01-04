import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Root() {
  return (
    <div>
      <h1 style={{ display: 'inline' }}>안동장씨 온라인 족보</h1>
      <nav>
        <NavBar />
      </nav>
      <Outlet />
    </div>
  );
}

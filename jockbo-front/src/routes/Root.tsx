import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1 style={{ display: 'inline' }}>온라인 족보</h1>
        <nav>
          <NavBar />
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Root() {
  return (
    <div>
      {/* <h1 style={{ display: 'inline' }}>安東張氏 利川伯派 南海宗親會</h1> */}
      <h1 style={{ display: 'inline' }}>안동장씨 이천백파 남해종친회</h1>
      <nav>
        <NavBar />
      </nav>
      <Outlet />
    </div>
  );
}

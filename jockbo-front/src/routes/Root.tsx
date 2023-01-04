import { Outlet } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import NavBar from './NavBar';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1 style={{ display: 'inline' }}>안동장씨 온라인 족보</h1>
        <nav>
          <NavBar />
        </nav>
      </div>
      <SearchForm />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

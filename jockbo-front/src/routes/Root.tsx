import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1 style={{ display: 'inline' }}>온라인 족보</h1>
        <nav>
          <ul>
            <li>
              <Link to={`search/`}>검색 페이지</Link>
            </li>
            <li>
              <Link to={`total/`}>전체 페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

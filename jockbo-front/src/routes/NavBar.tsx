import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarWrapper = styled.header`
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavBarItem = styled.div`
  padding: 0 25px 0 25px;
`;

const NavLinkWrapper = styled(NavLink)`
  color: gray;
  text-decoration: none;
  &:hover {
    color: black;
    transition: 0.5s;
  }
  font-weight: 1000;
  &.active {
    color: brown;
  }
`;

export default function NavBar() {
  return (
    <NavBarWrapper>
      <NavBarItem>
        <NavLinkWrapper as="a" href="http://andongjangssi.kr/">
          홈페이지
        </NavLinkWrapper>
      </NavBarItem>
      <NavBarItem>
        <NavLinkWrapper to="/search">족보 검색</NavLinkWrapper>
      </NavBarItem>
      <NavBarItem>
        <NavLinkWrapper to="/total">전체 계보</NavLinkWrapper>
      </NavBarItem>
      <NavBarItem>
        <NavLinkWrapper to="/about">열람 방법</NavLinkWrapper>
      </NavBarItem>
      <NavBarItem>
        <NavLinkWrapper to="/apply">인터넷 족보 등재 신청</NavLinkWrapper>
      </NavBarItem>
      <NavBarItem>
        <NavLinkWrapper to="/admin">관리자</NavLinkWrapper>
      </NavBarItem>
    </NavBarWrapper>
  );
}

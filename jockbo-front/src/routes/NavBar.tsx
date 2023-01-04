import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../utils/palette';

const NavBarWrapper = styled.header`
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLinkWrapper = styled(NavLink)`
  padding: 0 25px 0 25px;
  color: gray;
  text-decoration: none;
  &:hover {
    color: black;
    transition: 0.5s;
  }
  font-weight: 1000;
  &.active {
    color: ${palette.darkBrown};
  }
`;

export default function NavBar() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <NavBarWrapper>
      <NavLinkWrapper as="a" href="http://andongjangssi.kr/">
        홈페이지
      </NavLinkWrapper>
      <NavLinkWrapper to="/search">족보 검색</NavLinkWrapper>
      <NavLinkWrapper to="/total">전체 계보</NavLinkWrapper>
      <NavLinkWrapper to="/about">열람 방법</NavLinkWrapper>
      <NavLinkWrapper to="/apply">인터넷 족보 등재 신청</NavLinkWrapper>
      <NavLinkWrapper as="a" href={`${baseUrl}/admin`}>
        관리자
      </NavLinkWrapper>
    </NavBarWrapper>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export const Layout = () => {
  return (
    <Wrapper>
      <header>
        <ul>
          <li>
            <StyledLink to="/" end>
              Home
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/movies" end>
              Movies
            </StyledLink>
          </li>
        </ul>
      </header>
      <Outlet />
    </Wrapper>
  );
};

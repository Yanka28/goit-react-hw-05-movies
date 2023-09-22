import { NavLink } from 'react-router-dom';

export const MoviesList = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map(item => (
          <NavLink to={`/movies/${item.id}`} key={item.id}>
            <li>{item.title ? item.title : item.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

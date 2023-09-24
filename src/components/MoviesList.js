import { NavLink } from 'react-router-dom';
import { List, Item } from './MoviesList.styled';
export const MoviesList = ({ items }) => {
  return (
    <div>
      <List>
        {items.map(item => (
          <NavLink to={`/movies/${item.id}`} key={item.id}>
            <Item>{item.title ? item.title : item.name}</Item>
          </NavLink>
        ))}
      </List>
    </div>
  );
};

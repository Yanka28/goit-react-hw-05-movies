import { NavLink, useLocation } from 'react-router-dom';
import { Gallery, Item, Movie, Image } from './MoviesList.styled';
export const MoviesList = ({ items }) => {
  const location = useLocation();
  return (
    <div>
      <Gallery>
        {items.map(item => (
          <Movie key={item.id}>
            <NavLink to={`/movies/${item.id}`} state={{ from: location }}>
              <Image
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                    : `https://wiki.dave.eu/images/thumb/4/47/Placeholder.png/900px-Placeholder.png`
                }
                width="200"
                height="150"
                alt=""
              />
              <Item>{item.title ? item.title : item.name}</Item>
            </NavLink>
          </Movie>
        ))}
      </Gallery>
    </div>
  );
};

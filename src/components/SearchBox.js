// import { searchMovies } from 'api';

export const SearchBox = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

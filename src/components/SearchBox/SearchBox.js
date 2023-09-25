import { Button, Input } from './SearchBox.styled';

export const SearchBox = ({ onSubmit }) => {
  return (
    <form onSubmit={e => onSubmit(e)}>
      <Input
        type="text"
        // value={value}
        // onChange={e => onChange(e.target.value)}
        placeholder="Search movies"
        name="query"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

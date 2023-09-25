import { Button, Input } from './SearchBox.styled';

export const SearchBox = ({ onSubmit }) => {
  return (
    <form onSubmit={e => onSubmit(e)}>
      <Input type="text" placeholder="Search movies" name="query" />
      <Button type="submit">Search</Button>
    </form>
  );
};

import { Button, Input } from './SearchBox.styled';
export const SearchBox = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search movies"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

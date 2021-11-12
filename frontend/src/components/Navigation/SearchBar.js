import { useState } from 'react';
import { searchNotebooks } from '../../store/search';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(searchNotebooks(term));
    setTerm('');
    history.push('/search-results');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="search-bar"
          name="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        ></input>
        <button id="search-button" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </>
  );
};

export default SearchBar;

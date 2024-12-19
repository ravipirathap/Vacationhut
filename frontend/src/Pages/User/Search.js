import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: theme.spacing(2),
  },
  input: {
    flex: 1,
    // backgroundColor: 'pink',
    borderRadius: '25px',
    marginRight: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      border: 'none', // Remove box border
      '& fieldset': {
        border: 'none', // Remove bottom border
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px', // Adjust input padding if needed
    },
    '&::placeholder': {
      fontWeight: 'bold',
    },
  },
  submitButton: {
    backgroundColor: 'rgb(78, 13, 13)', // Brown color
    color: '#ffffff', // White text color
    borderRadius: '15px',
    '&:hover': {
      backgroundColor: '#6d4c41', // Darker brown color on hover
    },
  },
  searchResults: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  searchResultItem: {
    marginBottom: theme.spacing(1),
  },
}));

function SearchComponent() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://vacation-hut-0piq.onrender.com/search', {
        params: { query: searchQuery },
      });

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={classes.searchForm}>
        <TextField
          // type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.input}
          variant="outlined"
          placeholder="You can make the google search in here"
          fullWidth
          style={{ border:'none', background:'#F0E0DA', }}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.submitButton}
        >
          Search
        </Button>
      </form>
      <ul className={classes.searchResults}>
        {searchResults.map((result) => (
          <li key={result.cacheId} className={classes.searchResultItem}>
            <a href={result.link}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;

import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState('');

  const renderCount = useRef(0);

  const { onFilter } = props;

  useEffect(() => {
    console.log('RENDER COUNT FOR SEARCH.JS', renderCount.current++);
    const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(
      'https://cors-anywhere.herokuapp.com/https://learn-react-hooks-6cb7d-default-rtdb.firebaseio.com/ingredients.json' +
        query
    )
      .then((response) => {
        //get response.body via response.json() --> returns a promise
        return response.json();
      })
      .then((responseData) => {
        console.log('GET RESPONSE FROM FIREBASE', responseData);
        if (responseData) {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              ...responseData[key],
            });
          }
          onFilter(loadedIngredients);
        } else {
          alert('INGREDIENT DB IS EMPTY!');
        }
      })
      .catch((err) => console.log(err));
  }, [enteredFilter, onFilter]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            type='text'
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

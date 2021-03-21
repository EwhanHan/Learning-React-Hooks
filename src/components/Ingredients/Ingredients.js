import React, { useState, useEffect, useRef, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const renderCount = useRef(1);
  //useEffect to do side-effects
  // side-effects is some logic that does not finish in this render cycle or affects something outside of this jsx scope
  //useEffect is called after every render cycle

  //This function will set state, but alternatively we can just pass setUserIngredients
  //useCallback will memoize this function
  const filterIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []); //dont have to set setUserIngredient as a dependency

  useEffect(() => {
    console.log('RENDER COUNT FOR INGREDIENTS.JS: ', renderCount.current++);
    console.log('2nd useEffect', userIngredients);
  }, [userIngredients]); //render everytime state - userIngredient changes

  //We're going to pass this function to a component via prop
  const addIngredientHandler = (ingredient) => {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://learn-react-hooks-6cb7d-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        //get response.body via response.json() --> returns a promise
        return response.json();
      })
      .then((responseData) => {
        //responseData will be the UUID from Firebase
        console.log(responseData);
        setUserIngredients((prevState) => [
          ...prevState,
          {
            id: responseData.name,
            ...ingredient,
          },
        ]);
        console.log('WRITE TO FIREBASE SUCCESSFUL');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onFilter={filterIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;

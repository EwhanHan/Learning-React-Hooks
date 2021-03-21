import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  //useEffect to do side-effects
  // side-effects is some logic that does not finish in this render cycle or affects something outside of this jsx scope
  //useEffect is called after every render cycle
  useEffect(() => {
    console.log('1st useEffect');
    fetch(
      'https://cors-anywhere.herokuapp.com/https://learn-react-hooks-6cb7d-default-rtdb.firebaseio.com/ingredients.json'
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
          setUserIngredients(loadedIngredients);
        } else {
          alert('INGREDIENT DB IS EMPTY!');
        }
      });
  }, []); //empty array makes this like componentDidMount, will only render onces it's mounted

  useEffect(() => {
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
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;

import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

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

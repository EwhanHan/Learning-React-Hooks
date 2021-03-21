import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setuserIngredients] = useState([]);

  //We're going to pass this function to a component via prop
  const addIngredientHandler = (ingredient) => {
    setuserIngredients((prevState) => [
      ...prevState,
      {
        id: Math.random().toString(),
        ...ingredient,
      },
    ]);
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

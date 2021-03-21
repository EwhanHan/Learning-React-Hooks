import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const INITIAL_STATE = {
    title: '',
    amount: '',
  };

  //Alternative is add multiple states
  // const [title, setTitle] = useState('')
  //const [amount, setAmount] = useState(0)
  const [input, setInput] = useState(INITIAL_STATE);

  //Use function reference from Ingredients.js to add ingredients
  //Form state is passed upwards toward parent component(ingredients.js)
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient(input);
  };

  const onChangeHandler = (event) => {
    const newInput = event.target.value;
    setInput((prevState) => ({
      ...prevState,
      [event.target.id]: newInput,
    }));
  };

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              value={input.title}
              id='title'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              value={input.amount}
              id='amount'
              onChange={onChangeHandler}
            />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

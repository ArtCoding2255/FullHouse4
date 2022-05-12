import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './้header/style.module.css';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form className={`d-flex ${style.form}`} onSubmit={submitHandler}>
      <input
        placeholder="search"
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        name="q"
        style={{ width: '20vw', height: '35px', marginTop: '1%' }}
      />
      <Button
        type="submit"
        style={{
          marginLeft: '6%',
          marginTop: '1%',
          height: '5vh',
        }}
      >
        search
      </Button>
    </form>

    /*  <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Product..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>*/
  );
};

export default SearchBox;

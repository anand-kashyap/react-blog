import { FormEvent, useState } from 'react';

type SearchboxProps = {
  onSearch: (val: string) => any;
};

export function Searchbox({ onSearch }: SearchboxProps) {
  const [inputVal, setInputVal] = useState('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal !== '') onSearch(inputVal);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder='Search by Post Title'
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        type='text'
      />
    </form>
  );
}

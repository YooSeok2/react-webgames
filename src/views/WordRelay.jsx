import React, {useState, useRef} from 'react';

const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const onRefInput = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value[0] === word[word.length-1]) {
            setWord(value);
            setValue('');
            setResult('정답!');
        } else {
            setValue('');
            setResult('땡!');
            onRefInput.current.focus();
        }
    };

    const onChangeIntput = (e) => {
        setValue(e.target.value);
    }

    return (
       <>
          <div>{word}</div>
          <form onSubmit={onSubmitForm}>
              <input ref={onRefInput} value={value} onChange={onChangeIntput} />
              <button>입력</button>
          </form>
          <span>{result}</span>
       </>
    )
}

export default WordRelay;
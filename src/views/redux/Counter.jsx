import React, {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { INCRESED, DECRESED, INCREMENTASYNC } from './Redux';

const Counter = () => {
    const value = useSelector((state)=> state.value);
    const dispatch = useDispatch();
    const IncrementTimeOut = useRef(null);

    useEffect(()=>{
        return () => {
            clearTimeout(IncrementTimeOut.current);
        }
    }, [])

    const asyncIncrement = () => {
        IncrementTimeOut.current = setTimeout(()=>{
            dispatch({type:INCRESED});
            console.log('1초뒤에 1오름');
        }, 1000);
    }

    return(
        <>
            <div>
                <p>
                    Clicked: <span id="value">{value}</span> times
                    <button id="increment" onClick={()=>dispatch({type:INCRESED})}>+</button>
                    <button id="decrement" onClick={()=>dispatch({type:DECRESED})}>-</button>
                    {/* <button id="incrementIfOdd">Increment if odd</button> */}
                    <button id="incrementAsync" onClick={()=>dispatch({type:'DELAY_INCREMENT'})}>Increment async</button>
                </p>
            </div>
        </>
    )
}

export default Counter;
import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';

const ReactionCheck = () => {
    const [result, setResult] = useState([]);
    const [message, setMessage] = useState('시작, 클릭하면 시작합니다. 초록색으로 바뀌면 클릭해주세요!');
    const [background, setBackground] = useState("#8977ad");
    
    const state = useRef(false);
    const clickNum = useRef(0);
    const startTime = useRef();
    const timeOut = useRef(null);

    useEffect(()=>{
        if(result.length > 4){
            clearTimeout(timeOut.current);
            setBackground("#8977ad");
            console.log(result);
            setMessage(`당신의 반응속도는 ${result.reduce((prev, next)=>prev+next)/5} 클릭 시 다시하기, 초록색으로 바뀌면 클릭해주세요`);
            setResult(()=>{
                    clickNum.current = 0;
                    return [];
                 });
            state.current = false;
        }
    }, [result])

    const clickReaction = _.throttle(async()=> {
        console.log('reaction Click!');
        if(state.current){
            await setBackground('#ff0000');
            await setResult((prevResult)=>{
                const endTime = new Date().getTime();
                return [...prevResult, endTime - startTime.current];
            });
            checkReactionSpeed();
            state.current = false;
        }else{
            window.alert('초록색으로 바뀌면 클릭해주세요!');
            await clearTimeout(timeOut.current);
            clickNum.current -= 1;
            await setBackground('#ff0000');
            checkReactionSpeed();
            state.current =false;
        }
    }, 500, { 'trailing': true }) 

    const checkReactionSpeed = () => {
        const randomNum = Math.floor((Math.random() * 1000)+2000);
        timeOut.current = setTimeout(()=>{
            clickNum.current += 1;
            setBackground("#00ff4d");
            startTime.current = new Date().getTime();
            state.current = true;
        },randomNum);
    }

    const startTest =  _.throttle(async() => {
        console.log('start Click!');
        await setBackground('#ff0000');
        checkReactionSpeed();
    }, 500, { 'trailing': true }) 

    return (
        clickNum.current < 1 
        ?
        <>
            <div className='container' onClick={startTest} style={{backgroundColor:background}}>{message}</div>
        </>
        :
        <>
            <div className='container' onClick={clickReaction} style={{backgroundColor:background}}>색상이 초록색으로 바뀌면 클릭해주세요!</div>
            <span>your respond {result[clickNum.current-1]}ms</span>
        </>
    )
}

export default ReactionCheck;
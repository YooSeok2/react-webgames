import React, {useState, useEffect, useRef, useCallback} from 'react';
import "../css/app.css";

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const ref = {
    바위: -1,
    가위: 0,
    보: 1
}

const RSP = () => {
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState('0');

    const interval = useRef(null);
    const timeOut = useRef(null);

    useEffect(()=>{
        interval.current = setInterval(changeHand, 100);
        return () => {
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHand = ()=>{
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else{
            setImgCoord(rspCoords.바위);
        }
    };

    const computerChoice = (rsp) => {
        const name = Object.keys(rspCoords).find((ele)=>rspCoords[ele]===rsp);
        return ref[name];
    }
    
    const onClickBtn = (hand) => {
        clearInterval(interval.current);
        clearTimeout(timeOut.current)
        const diff = ref[hand] - computerChoice(imgCoord);
        if(diff === 0){
            setResult('비겼습니다!');
        }else if([-1, 2].find(ele=>ele===diff)){
            setResult('이겼습니다!');
            setScore((prevScore)=>prevScore+1);
        }else{
            setResult('졌습니다!');
            setScore((prevScore)=>prevScore-1);
        }
        timeOut.current = setTimeout(()=>{
            interval.current = setInterval(changeHand, 500);
        }, 1000); 
    }

    return (
        <>
            <div className='computer' style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id='rock' className='btn' onClick={()=>onClickBtn('바위')}>바위</button>
                <button id='scissor' className='btn' onClick={()=>onClickBtn('가위')}>가위</button>
                <button id='paaper' className='btn' onClick={()=>onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;
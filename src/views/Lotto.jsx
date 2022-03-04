import React, {useState, useEffect, useRef, useMemo} from 'react';
import _ from 'lodash';
import LottoNum from '../components/LottoNum';

const getRandomNums = () => {
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle = [];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0]);
    }
    const winBalls = shuffle.slice(0,6).sort((a,b)=>a-b);
    const bonus = shuffle[shuffle.length-1];
    return [...winBalls, bonus];
}

const Lotto = () =>{
    //state-> lottoNums: number, winnums: number, bonus: number, reStart: blooean // ref->timeout
    const randomNums = useMemo(()=>getRandomNums(), [])
    const [lottoNums, setLottoNums] = useState(randomNums);
    const [winNums, setWinNums] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [reStart, setReStart] = useState(false);
    
    const timeOut = useRef([]);

    useEffect(()=>{
        drawLottoNums();
        return () => {
            timeOut.current.forEach(ele=>clearTimeout(ele));
        }
    }, [timeOut.current]);

    const drawLottoNums = () => {
        lottoNums.forEach((ele, index)=>{
            if(index === lottoNums.length-1){
                timeOut.current[index] = setTimeout(()=>{
                    setBonus(ele);
                    setReStart(true);
                }, 7000);
            } else {
                timeOut.current[index] = setTimeout(()=>{
                    setWinNums((prevWinNums)=>{
                        return [...prevWinNums, ele];
                    })
                }, (index+1)*1000);
            } 
        })
    }

    const redoClickListener = () => {
        setLottoNums(getRandomNums());
        setWinNums([]);
        setBonus(null);
        setReStart(false);
        timeOut.current = [];
    }

    return(
        <>
            <div>당첨 숫자</div>
            <div id='결과창'>
               { winNums.map((ele)=><LottoNum key={ele} num={ele} />) } 
            </div>
            <div>보너스!</div>
            <div className='bbonus'>
                { bonus && <LottoNum num={bonus} /> }
                { reStart && <button onClick={redoClickListener}>재추첨</button> }
            </div>
        </>
    );
}

export default Lotto;
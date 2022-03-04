import React, {useEffect} from 'react';


const test = () => {
    useEffect(()=>{
        asyncTest()
    }, []);

    const asyncTest = async()=>{
        let val = '';
        const timeout = await setTimeout(()=>{
            val ='hi';
        }, 10);
        console.log(val);
    };

    return(
        <>
        </>
    )
}

export default test;
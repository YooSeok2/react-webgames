import React from 'react';
import WordRelay from './WordRelay';
import ReactionCheck from './ReactionCheck';
import RSP from './RSP';
import Test from './test'
import Lotto from './Lotto';
import TicTacToe from './TicTacToe/TicTacToe';
import SearchMine from './SearchMine/SearchMine';
import "../css/app.css";
import { BrowserRouter, HashRouter, Link, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <ul style={{marginBottom:50}}>   
                <Link to="/WordRelay">단어끝말잇기</Link>&nbsp;
                <Link to="/ReactionCheck">반응속도체크</Link>&nbsp;
                <Link to="/RSP">가위바위보</Link>&nbsp;
                <Link to="/Lotto">로또번호생성기</Link>&nbsp;
                <Link to="/TicTacToe">빙고!</Link>&nbsp;
                <Link to="/SearchMine">지뢰찾기</Link>
            </ul>
            <div>
                <Routes>
                    <Route path="/WordRelay" element={<WordRelay />} ></Route>
                    <Route path="/ReactionCheck" element={<ReactionCheck/>}></Route>
                    <Route path="/RSP" element={<RSP/>}></Route>
                    <Route path="/Lotto" element={<Lotto/>}></Route>
                    <Route path="/TicTacToe" element={<TicTacToe/>}></Route>
                    <Route path="/SearchMine" element={<SearchMine/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
};

export default App;
// import React, { useEffect, useReducer, useRef } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import New from './New';
import Edit from './Edit';
import Diary from "./Diary"

// import Home from "./pages/Home";
// import Home from './Home/index.js';



const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/diary/:id" element={<Diary />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

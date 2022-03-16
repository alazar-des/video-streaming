import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import Home from '../Home/Home';
import Player from '../Player/Player';
import VideoUpload from '../VideoUpload/VideoUpload';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import useToken from './useToken';
import Broadcast from '../LiveStreaming/Broadcast';
import Watch from '../LiveStreaming/Watch';
import './App.css';

function App() {
    const { token, setToken } = useToken();

    return (
            <Router>
              <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route path="/video/:id" element={<Player />}></Route>
                  <Route path="/upload" element={<VideoUpload token={token} setToken={setToken} />}></Route>
                  <Route path="/login" element={<Login setToken={setToken}/>}></Route>
                  <Route exact path="/broadcast" element={<Broadcast />}></Route>
                  <Route exact path="/watch" element={<Watch />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
              </Routes>
            </Router>
    );
}

export default App;

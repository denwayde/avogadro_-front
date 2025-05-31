import './App.css';
// import Banner from './components/banner';
// import Header from './components/header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Posts from './components/posts';


function App() {

  return (
    // <>
    //   <Header/>
    //   <Banner/>
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

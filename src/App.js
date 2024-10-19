import React, { useContext, useEffect, useState } from 'react' ;
import './App.css' ;

/* context */
import QuizContextProvider, { QuizContext } from './context/QuizContext';

/* router dom */
import {
  Routes ,
  Route,
  useLocation
} from 'react-router-dom' ;

/* pages */
import Login from './pages/Login';

// react toastify
import {ToastContainer} from 'react-toastify' ;

// pages
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import DashBoard from './pages/DashBoard';
import Answers from './pages/Answers';
import Preloader from './components/PreLoader';

function App() {

  const location = useLocation() ;
  const [load , setLoad] = useState(true) ; 

  const path = location.pathname ;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false) ;
    },1200) ;

    return() => clearTimeout(timer)
  },[])
  

  return (
      <QuizContextProvider>
      <Preloader load={load}/>
      <div>
        <ToastContainer 
        position={`${path === '/' ? 'top-right' : 'bottom-right'}`}
        className={`${path ===  '/' ? '' : 'toast-notify'}`}
        />
       
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/dashboard' element={<DashBoard />}></Route>
          <Route path='/answers' element={<Answers />}></Route>
        </Routes>
      </div>
      </QuizContextProvider>
  )
}

export default App
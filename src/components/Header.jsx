import React, { useContext, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';

// react icons
import { BsPersonBoundingBox } from "react-icons/bs";

// context
import { QuizContext } from '../context/QuizContext';

// assets
import logo from '../assets/logo.png' ;

function Header() {

    const{
        displayUser ,
        setDisplayUser ,
    } = useContext(QuizContext) ;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('quiz_user')) ;
        setDisplayUser(user);
    },[])

  return (
    <>
      <Navbar className='bg-dark text-light d-flex px-3 py-3 w-100' sticky='top' style={{ justifyContent: 'space-between'  , top:'0' }}>
        <h2 className='mb-0'>
          <img style={{aspectRatio:'1' , width:'50px'}} src={logo} alt="logo" />
        </h2>

        <div className='profile-container' style={{ position: 'relative' }}>
          <BsPersonBoundingBox className='profile-btn w-100 h-100' size={40} />

          {/* Profile body as child of profile-container */}
          <div className='profile-body text-center' style={{ position: 'absolute', top: '100%', right: 0 }}>
            <h4>
                {displayUser.name}
            </h4>
            <h5>
                {displayUser.email}
            </h5>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;

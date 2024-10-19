import React, { useContext, useEffect, useState } from 'react';

// context
import { QuizContext } from '../context/QuizContext';

// react icons
import { IoEye } from "react-icons/io5";

function DashBoard() {
  const { quizScore , navigate} = useContext(QuizContext);

  const [user, setUser] = useState({}); // Initialize as an object, assuming 'user' contains properties

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('quiz_user'));
      if (storedUser) {
        setUser(storedUser);
      }
    };
    fetchUser();
  }, []);

  const clearUser = () => {
    localStorage.clear('quiz_user') ;
    navigate('/') ;
  }

  console.log(user);

  return (
    <div className='login-body text-light d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
      <div className='border quiz-wrapper login-card py-4 px-1 px-md-3' style={{position:'relative'}}>

        <button 
        onClick={() => navigate('/answers')} 
        className='btn btn-primary d-flex justify-content-center align-items-center gap-1' 
        style={{position:'absolute' , top:'3%' , right:'3%'}}
        >
          <IoEye />
          <span>
            View Answers
          </span>
        </button>

        <h4 className='text-success mt-4'>
          Hello {user.name}, Thanks For Taking The Quiz!
        </h4>

        {quizScore <= 5 && (
          <p>OOPS! Good Luck Next Time.</p>
        )}

        {quizScore > 5 && quizScore <= 15 && (
          <p>Good Try, Don't Give Up.</p>
        )}

        {quizScore > 15 && quizScore <= 25 && (
          <p>Woow, Got so Close.</p>
        )}

        {quizScore > 25 && quizScore <= 29 && (
          <p>Woooow You Beauty, An Inch Closer.</p>
        )}

        {quizScore === 30 && (
          <p>Clutch, Perfection At Its Best.</p>
        )}

        <p>
            Your Score is :  {quizScore}
        </p>

        <button onClick={clearUser} className='btn btn-warning'>Thanks for Visting</button>
      </div>
    </div>
  );
}

export default DashBoard;

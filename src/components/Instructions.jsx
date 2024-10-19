import React, { useContext, useEffect } from 'react'; 

// context
import { QuizContext } from '../context/QuizContext';

function Instructions() {

  const { navigate } = useContext(QuizContext);

  // Prevent page refresh during the quiz
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave? Your progress will be lost!';
    };

    // Add event listener before starting the quiz
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='container-fluid px-0 bg-dark text-light pb-4' style={{ height: '100vh' , overflow:'auto' }}>
      <h4 className='text-center pt-4 text-decoration-underline fs-2'>INSTRUCTIONS</h4>

      <div className='mt-5 mx-auto px-2 px-md-4 ' style={{ maxWidth: '600px', textAlign: 'left' }}>
        <h5 className='fs-2'>Quiz Guidelines:</h5>
        <ul className='fs-5'>
          <li>This quiz consists of <strong>30 multiple-choice questions</strong>.</li>
          <li>You will have <strong>10 minutes</strong> to complete the quiz.</li>
          <li>Please ensure that you have a stable internet connection.</li>
          <li>Once the quiz starts, <strong>do not refresh or leave the page</strong> until you finish the quiz.</li>
          <li>Your progress will not be saved if you leave or refresh the page during the quiz.</li>
          <li>Click the "Start Quiz" button below to begin.</li>
        </ul>
      </div>

      <div className='text-center mt-5'>
        <button 
          onClick={() => {
            window.removeEventListener('beforeunload', () => {}); // Allow navigation when quiz starts
            navigate('/quiz'); // Navigate to quiz
          }} 
          className='btn btn-primary'>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Instructions;

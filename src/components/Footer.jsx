import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';

function Footer({ currentQuestionIndex, totalQuestions, handleNext, handlePrev }) {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const {
    score , 
    setScore , 
    quizScore , 
    setQuizScore , 
    navigate ,
    selectedOptions , 
    setSelectedOptions ,
    showOptions ,
    setShowOptions
  } = useContext(QuizContext) ;

  const submitQuiz = () => {
    navigate('/dashboard') ;
    setShowOptions(selectedOptions) ;
    setSelectedOptions({}) ;
    setQuizScore(score) ;
    setScore(0) ;
  };

  return (
    <div className='container-fluid px-3 bg-dark py-3' style={{ position: 'fixed', bottom: '0' }}>
      <div className="d-flex align-items-center" style={{ justifyContent: 'space-between' }}>
        <button 
          className='btn btn-light footer-btn' 
          onClick={handlePrev} 
          disabled={currentQuestionIndex === 0}
        > 
          Prev 
        </button> 

        {/* <button 
          className='btn btn-primary footer-btn' 
          onClick={isLastQuestion ? () => alert(`Submit your quiz ${score}`) : handleNext} 
        > 
          {isLastQuestion ? 'Submit' : 'Next'}
        </button> */}

        {isLastQuestion ? (
          <button onClick={submitQuiz} className='btn btn-light footer-btn'>Submit</button>
        ) : (
          <button onClick={handleNext} className='btn btn-light footer-btn'>Next</button>
        )}
      </div>
    </div>
  );
}

export default Footer;

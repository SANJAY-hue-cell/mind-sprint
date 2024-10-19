import React, { useContext, useState } from 'react';

// context
import { QuizContext } from '../context/QuizContext';

function Answers() {

    const {navigate ,  quizQuestions, selectedOptions , showOptions} = useContext(QuizContext) ;

    const finishQuiz = () => {
        localStorage.clear('quiz_user') ;
        navigate('/') ;
    }

    console.log(showOptions);
    

    return (
        <div className='px-2 px-md-4 bg-dark text-light'>

            <button 
            onClick={finishQuiz}
            className='btn btn-warning' 
            style={{position:'fixed' , bottom:'10px' , right:'2%'}}
            >Back
            </button>

            <h4 className='mb-0 fs-1 fw-bold'>
                Answers
            </h4>
            {quizQuestions.map((question, index) => (
                <div className='py-3' key={index}>
                    <h3>Question {index + 1}</h3>
                    <h4>{question.question}</h4>
                    
                    <form>
                        {question.options.map((option, i) => {
                            // Check if the option is selected by the user
                            const isSelected = showOptions[index] === option;
                            // Check if the option is the correct answer
                            const isCorrect = option === question.answer;

                            return (
                                <div key={i} className='form-check'>
                                    <input
                                        type='radio'
                                        name={`quiz-option-${index}`} // unique name for each question
                                        value={option}
                                        checked={isSelected} // Check if this option was selected by the user
                                        disabled // Disable the radio buttons
                                        className='form-check-input'
                                    />
                                    <label className={`form-check-label ${isCorrect ? 'text-primary fw-bold' : 'text-danger'}`}>
                                        {option}
                                        {isCorrect && <span className="text-primary"> (Correct)</span>}
                                        {isSelected && !isCorrect && <span className="text-danger"> (Your Answer)</span>}
                                    </label>
                                </div>
                            );
                        })}
                    </form>
                    <p className="mt-2 text-primary">
                        <strong>Your Answer:</strong> {showOptions[index] || "No answer selected"} {/* Show the user's answer */}
                    </p>
                    <p className="mt-2 text-success">
                        <strong>Correct Answer:</strong> {question.answer} {/* Display the correct answer */}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Answers;

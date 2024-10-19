import React, { useContext, useEffect, useState } from 'react';

// context
import { QuizContext } from '../context/QuizContext';

function QuestionCard({ question, options, answer, index }) {
  const {
    score,
    setScore,
    selectedOptions,
    setSelectedOptions,
    quizOptions ,
    setQuizOptions
  } = useContext(QuizContext);

  const [selectedOption, setSelectedOption] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false); // track if this question has been answered

  // Load the previously selected option for this question (if any)
  useEffect(() => {
    setSelectedOption(selectedOptions[index] || '');
    setHasAnswered(!!selectedOptions[index]); // If the option was already selected, mark as answered
  }, [index, selectedOptions]);

  // Update the selected option both locally and in the context
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    // Check if the previous answer was correct
    const wasCorrect = selectedOptions[index] === answer;

    // If the user is changing their answer, update the score correctly
    if (hasAnswered) {
      if (wasCorrect && selectedValue !== answer) {
        // Previously correct, now incorrect
        setScore(prevScore => Math.max(prevScore - 1, 0));
      } else if (!wasCorrect && selectedValue === answer) {
        // Previously incorrect, now correct
        setScore(prevScore => prevScore + 1);
      }
    } else if (selectedValue === answer) {
      // First time answering and it's correct
      setScore(prevScore => prevScore + 1);
    }

    // Store the selected option for the current question in the context
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [index]: selectedValue,
    }));

    setSelectedOption(selectedValue);
    setHasAnswered(true); // Mark this question as answered
  };

  // shuffle options
  useEffect(() => {
    const shuffleOptions = () => {
      const shuffledArray = [...options] ;
      for(let i = shuffledArray.length - 1 ; i>0 ; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i] , shuffledArray[randomIndex]] = [shuffledArray[randomIndex] , shuffledArray[i]] ;
      }
      setQuizOptions(shuffledArray) ;
    }
    shuffleOptions() ;
  } ,[]) ;

  return (
    <div className='h-100 w-100 px-2 question-card' style={{ overflow: 'auto'  }}>

      <div className="d-flex justify-content-start gap-4">
        <h3>Question {index + 1}</h3>
      </div>

      <div className='d-flex flex-column justify-content-center align-items-start gap-3 px-3'>
        <h4>{question}</h4>

        <form>
          {quizOptions.map((option, i) => (
            <div key={i} className='form-check'>
              <input
                type='radio'
                name={`quiz-option-${index}`} // unique name for each question
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className='form-check-input'
              />
              <label className='form-check-label'>{option}</label>
            </div>
          ))}
        </form>
        <p className='mb-0'>
          Selected Option:
          <br />
          <span className='fw-bold fs-3'>{selectedOption}</span>
        </p>
        <p>
          <strong>
            Note 
          </strong>
          : Dont refresh the page , you will lose your progress !
        </p>
      </div>
    </div>
  );
}

export default QuestionCard;

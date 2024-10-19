import React, { useContext, useEffect, useState } from 'react'; 

// context
import { QuizContext } from '../context/QuizContext';  

// components
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import QuestionCard from '../components/QuestionCard';  

// react hot toast
import { toast } from 'react-toastify' ;

function Quiz() {  
  const { 
    quizQuestions, 
    setQuizQuestions,
    Questions, 
    selectedOptions, 
    setSelectedOptions, 
    navigate, 
    setScore, 
    setQuizScore, 
    score,
    setShowOptions
  } = useContext(QuizContext);  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Shuffle and set questions only if quizQuestions is empty
  useEffect(() => {  
    if (quizQuestions.length === 0) {  
      const shuffleQuestions = () => {
        const shuffledArray = [...Questions];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        const questionArray = shuffledArray.slice(0, 30);
        setQuizQuestions(questionArray);
      };  
      shuffleQuestions();
    }
  }, [Questions, quizQuestions.length, setQuizQuestions]);

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      if (!selectedOptions[currentQuestionIndex]) {
        toast.error("Select an Option!", { autoClose: 2000 });
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  // Handle previous question
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };


  return (  
    <div className='quiz-body d-flex flex-column align-items-center' style={{height:'90vh'}}>  
      <Header />  

      <div className='quiz-wrapper d-flex align-items-center gap-4 text-dark h-75 mt-1 mt-md-3 mt-lg-4' style={{justifyContent:'space-evenly'}}>  
        {quizQuestions.length > 0 && (
          <QuestionCard 
            key={currentQuestionIndex} 
            index={currentQuestionIndex}
            question={quizQuestions[currentQuestionIndex].question} 
            options={quizQuestions[currentQuestionIndex].options}  
            answer={quizQuestions[currentQuestionIndex].answer} 
          />
        )}
      </div>  

      <Footer 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={quizQuestions.length}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>  
  );  
}

export default Quiz;

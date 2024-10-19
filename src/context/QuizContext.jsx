import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Questions } from "../assets/questions";

export const QuizContext = createContext() ;

const QuizContextProvider = ({children}) => {

    const navigate = useNavigate() ;
    const location = useLocation() ;

    // user infos 
    const [data , setData] = useState({
        name : '' ,
        email : ''
    })

    const [displayUser , setDisplayUser] = useState({}) ;

    // footer buttons
    const [isNext , setIsNext] = useState(false) ;

    // quiz 
    const [quizQuestions , setQuizQuestions] = useState([]) ;
    const [score , setScore] = useState(0) ;
    const [quizScore , setQuizScore] = useState(0) ;
    const [selectedOptions, setSelectedOptions] = useState({}); 
    const [showOptions , setShowOptions] = useState({}) ;
    const [quizOptions , setQuizOptions] = useState([]) ;

    const value = {
        Questions ,
        navigate , location ,
        data , setData ,
        displayUser , setDisplayUser ,
        isNext , setIsNext ,
        quizQuestions , setQuizQuestions ,
        score , setScore ,
        quizScore , setQuizScore ,
        selectedOptions , setSelectedOptions ,
        quizOptions , setQuizOptions ,
        showOptions ,setShowOptions
    }  ;

    return (
        <QuizContext.Provider value={value} >
            {children}
        </QuizContext.Provider>
    ) ;
} ;

export default QuizContextProvider ;
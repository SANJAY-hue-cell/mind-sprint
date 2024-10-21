import React, { useContext } from 'react' ;

// react icons
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// context
import { QuizContext } from '../context/QuizContext';

// react hot toast
import {toast} from 'react-toastify';

// assets
import logo from '../assets/logo.png' ;

function Login() {

    const {
        data ,
        setData ,
        navigate
    } = useContext(QuizContext) ;

    let errorToastId = null;

    const handleUser = (e) => {
        e.preventDefault() ;
        let tempUser = data ;
        if (!tempUser.name) {
            if (errorToastId) {
                toast.dismiss(errorToastId); // Dismiss previous error toast
            }
            errorToastId = toast.error("The Username is required and should be 6 characters long", {
                autoClose: 3000, // Close after 3 seconds
            });
            return;
        }
        
        if (!tempUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempUser.email)) {
    if (errorToastId) {
        toast.dismiss(errorToastId); // Dismiss previous error toast
    }
    errorToastId = toast.error("Email is required and should be valid", {
        autoClose: 3000, // Close after 3 seconds
    });
    return;
        }
        
        localStorage.setItem('quiz_user', JSON.stringify(tempUser));
        setData({
            name: '',
            email: ''
        });
    
        if (errorToastId) {
            toast.dismiss(errorToastId); // Dismiss previous error toast on success
        }
        toast.success("Quiz Registration Successful!", {
            autoClose: 2000, // Close after 5 seconds
        });
    
        navigate('/home');
    }

  return (
    <div className="container-fluid px-0 login-body text-light d-flex justify-content-center align-items-center w-100" style={{height:'100vh'}}>
        
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 login-container border rounded py-4 login-card">

            <h4>
                <img style={{aspectRatio:'1' , width:'100px'}} src={logo} alt="logo" />
            </h4>

            <h3>
                <strong>
                    Welcome To The Quiz !
                </strong>
            </h3>

            <div className="mb-3 w-100 d-flex justify-content-center">
                <label className='login-label border border-light rounded p-1'>
                    <input
                     type="text" 
                     className='login-input w-75 px-2'
                     style={{border:'none'}}
                     value={data.name}
                     onChange={(e) => setData({...data , name : e.target.value})}
                     placeholder='name...' 
                     required
                     />
                     <button className='btn btn-dark w-25'>
                     <FaUserCircle size={25} />
                     </button>
                </label>
            </div>

            <div className="mb-3 w-100 d-flex justify-content-center">
                <label className='login-label border border-light rounded p-1'>
                    <input
                     type="email" 
                     className='login-input w-75 px-2'
                     style={{border:'none'}}
                     value={data.email}
                     onChange={(e) => setData({...data , email : e.target.value})}
                     placeholder='email...'
                     required 
                     />
                     <button className='btn btn-dark w-25'>
                     <MdEmail size={25} />
                     </button>
                </label>
            </div>

            <div className="mb-3">
                <button onClick={handleUser} className='btn btn-dark'>
                    Register
                </button>
            </div>

        </div>

    </div>
  )
}

export default Login

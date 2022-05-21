import React, { useState, useRef } from 'react';
import styles from './LoginForm.module.scss';
import Logo from '../assets/MediHelp_Logo.svg';

const LoginForm = () => {

    const [errorEmailShow, setErrorEmailShow] = useState(false);    
    const [errorPasswordShow, setErrorPasswordShow] = useState(false);

    let email = useRef();
    let password = useRef();
    
    const emailValidCheck = ( e ) => {
        let userEmail = email.current.value;
        let userPassword = password.current.value;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if( !userEmail.match( regexEmail ) ) {
            setErrorEmailShow( true );
        }

        if( userPassword.length < 6 ) {
            setErrorPasswordShow( true );
        }
    }

    return (
        <div className={ styles.formContainer }>
            <form>
                <img src={ Logo } alt="" />
                <label>Email</label>
                <input name="email" aria-label='email' type='text' ref={ email }/>
                {
                    errorEmailShow && 
                    <label className={ styles.error }>Invalid email</label>
                }

                <label>Password</label>
                <input name="password" aria-label='password' minLength={6} type='password' placeholder='Enter your password' ref={ password }/>
                {
                    errorPasswordShow && 
                    <label className={ styles.error }>Password less than 6 characters</label>
                }

                <button onClick={emailValidCheck} type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import { FaDragon } from "react-icons/fa";
import Input from '../input/input';
import "./login.css";


const Login = props => {
  const { isLoggedIn, error } = props;
  const credentials = { username: '', password: '' };

  const [formData, setFormData] = useState(credentials);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(()=> {
    if(isLoggedIn) {
      props.history.push('/list');
   }
  }, [isLoggedIn]);

  
  const changeHandler = event => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const submitHandler = event => {
    props.onLogin(formData);
    event.preventDefault();
  };

  const signUpHandler = () => {
    setIsSignUp(true);
  }

  const renderAllButtons = () => {
    return <div className="sign-buttons">
            <button type="submit">Sign in</button>
            <button type="button" onClick={signUpHandler}>Sign up</button>
          </div>
  }

  const renderSignUpButton = () => {
    return <div className="sign-buttons">
            <button type="submit">Sign up</button>
          </div>
  }

  const renderButton = () => {
      return !isSignUp ? renderAllButtons() : renderSignUpButton();
  }


  return (
    <div>
      <span className="logo">
      <FaDragon size={96} />
      </span>
      <form onSubmit={submitHandler} className="login">
        <Input
          placeholder="Username"
          id="username"
          type="text"
          onChange={changeHandler}
          value={formData.username}
        />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          onChange={changeHandler}
          value={formData.password}
        />
        {renderButton()}
      </form>
      <div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onLogin: (formData) => dispatch(actions.login(formData))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

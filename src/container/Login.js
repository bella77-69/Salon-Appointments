import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loggedIn } from '../api/authUserRequest';
import UserForm from '../components/UserForm';
import { logIn, signUp } from '../redux/actions';
import '../assets/css/LogIn.css';

const Login = ({
  logIn, signUp, history, loginUser,
}) => {
  const [message, setMessage] = useState([]);

  const handleLogin = async (userName, password) => {
    try {
      const response = await loggedIn(userName, password);
      if (response.logged_in) {
        setMessage(['SuccessFully Logged in!']);
        localStorage.setItem('token', response.token);
        signUp(response.user);
        logIn(true);
        history.push('/items');
      } else {
        setMessage(response.message);
      }
    } catch {
      setMessage(['Sorry, Logged in failed ']);
    }
  };

  const handleSubmit = (userName, password) => {
    handleLogin(userName, password);
  };

  return loginUser ? <Redirect to="/items" /> : (
    <div className="LogIn">
      {message && message.map((msg) => (<p key={msg}>{msg}</p>))}
      <h2>Login</h2>
      <UserForm handleSubmit={handleSubmit} btnName="LogIn" />
      <Link to="/signup" className="btn__signup">Sign up</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (user) => dispatch(signUp(user)),
  logIn: (status) => dispatch(logIn(status)),
});

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func,
  loginUser: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  history: null,
  signUp: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

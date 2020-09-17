import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, handleFbSignIn, handleSignOut, defaulftLoggingFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  //call login framework
  defaulftLoggingFramework();

  //states
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    isSignedIn : false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  //localize
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      console.log(res);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const handleBlur = (e) => {
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+\@\S+\.\S+/.test(e.target.value);
    }
    else if(e.target.name === 'password'){
      isFormValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    e.preventDefault(); 
  }

  const handleSubmit= (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    else if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    e.preventDefault(); 
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in with facebook</button>
      {
        user.isSignedIn && <div>
            <h3>Name: {user.name}</h3>
            <h4>Email : {user.email}</h4>
            <img src={user.photo} alt="user"/>
        </div>
      }
      <h3>Our own Authentication provider:</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser"/>
        <label htmlFor="newUser">Create New User</label>
        <br/>
        { newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Enter Name" />}
        <br/>
        <input onBlur={handleBlur} type="text" name="email"  placeholder="Enter Email" required/>
        <br/> 
        <input onBlur={handleBlur} type="password" name="password" placeholder="Enter Password" required/>
        <br/> 
        <input type="submit" value="Submit"/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>Successfully account {newUser ? 'created' : 'Logged In'}.</p>
      }
    </div>
  );
}

export default Login;

import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have styles here for your app
import firebase from './services/firebaseService'; // Firebase setup for authentication
import ChartComponent from './components/ChartComponent'; // Your chart component to display trading data

const App = () => {
  const [user, setUser] = useState(null); // Firebase user state
  const [balance, setBalance] = useState(10000); // Example balance, you can adjust this based on user data

  // Firebase authentication state listener
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser); // Listen for user state changes (login/logout)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Biswali Trading Platform</h1>
      </header>
      <div className="content">
        {/* Check if the user is logged in */}
        {user ? (
          <div>
            <h2>Welcome, {user.displayName || 'User'}!</h2>
            <p>Your Balance: ${balance}</p>
            {/* Display the trading chart component */}
            <ChartComponent />
          </div>
        ) : (
          <div>
            <p>Please log in to start trading.</p>
            <button onClick={() => firebase.auth().signInAnonymously()}>Login Anonymously</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KrazyMindsEmailForm from './App';
import reportWebVitals from './reportWebVitals';

var apiKey = document.getElementById('email-form').innerHTML;

ReactDOM.render(
  <React.StrictMode>
    <KrazyMindsEmailForm apiKey={apiKey.trim()}/>
  </React.StrictMode>,
  document.getElementById('email-form')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import YoneticiProvider from './context/YoneticiContext';
import PersonelProvider from './context/PersonelContext';
import AdminProvider from './context/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const role=parseInt(localStorage.getItem("role"));

root.render(
 <BrowserRouter>
      <AuthProvider>
      {     
            role===2 ? 
            (
            <YoneticiProvider>
                  <App/>
            </YoneticiProvider>) 
            :
            role === 1 ?
            (<PersonelProvider>
                  <App/>
            </PersonelProvider>)

            :
            role === 3 ?
            <AdminProvider>
                  <App/>
            </AdminProvider>          
            :(

                  <App/>

            )
      }
      </AuthProvider>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

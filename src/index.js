import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './index.css';
import App from './App';
import DataForm from './DataFrom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='position-relative'>
    		<div className='position-absolute top-0 end-0'>
				
			</div>
      	<div className='d-flex justify-content-center align-items-center flex-column'>
        	<div>
				<DataForm />
			</div>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

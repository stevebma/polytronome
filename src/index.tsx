import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('app');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement,
);

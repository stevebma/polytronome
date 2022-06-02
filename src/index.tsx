import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxWrappedApp } from './ReduxWrappedApp';

const rootElement = document.getElementById('app');

ReactDOM.render(<ReduxWrappedApp useDevTools={true} />, rootElement);

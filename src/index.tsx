import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { ReduxWrappedApp } from './ReduxWrappedApp';

const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(<ReduxWrappedApp useDevTools={true} />);
}

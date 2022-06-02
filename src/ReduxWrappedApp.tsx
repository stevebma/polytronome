import React from 'react';
import { Provider } from 'react-redux';

import { App } from './App';
import { createStore } from './redux/store';

export type Props = {
    useDevTools: boolean;
};

export const ReduxWrappedApp: React.FC<Props> = ({ useDevTools }) => {
    const store = createStore(useDevTools);
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default ReduxWrappedApp;

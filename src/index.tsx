import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';



// This is the ID of the div in your index.html file

const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
const root = createRoot(rootElement!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
serviceWorker.unregister();

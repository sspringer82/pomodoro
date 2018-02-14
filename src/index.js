import React from 'react';
import ReactDOM from 'react-dom';
import { Pomodoro } from './components/pomodoro.container';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
registerServiceWorker();

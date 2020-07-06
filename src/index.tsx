import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import store from './store';
import App from "./components/App/AppPL";

/**
 * Входная точка в приложение, здесь создается корневой React-компонент и помещается в реальный DOM
 */

render(
    <Provider store={store()}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
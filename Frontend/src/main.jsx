import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import "./main.css"
import store from './store'
import RoutesApp from './Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RoutesApp />
    </Provider>,
)

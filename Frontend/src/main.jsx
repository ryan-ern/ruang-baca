import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/index.css"
import RoutesApp from './Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RoutesApp />
    </React.StrictMode>,
)
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authInfo } from "../store/auth/actions";
import '../assets/styles/preloader.css'

export function Preloader() {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner-chase">
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                </div>
            </div>
        </div>
    );
}

export function Redirect({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, []);
    return null;
}

export function AuthStatus({ children }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(authInfo())
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])
    if (isLoading) {
        return <Preloader />;
    }

    if (!auth.check) return <Preloader />
    
    return children
}

export function Authenticated({ children }) {
    const auth = useSelector((state) => state.auth);
    if (!auth.isLogin) {
        return <Redirect to="/login" />;
    }
    return children;
}
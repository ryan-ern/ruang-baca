import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Redirect({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, []);
    return null;
}

export function Authenticated({ children }) {
    const auth = useSelector((state) => state.auth);
    if (!auth.isLogin) {
        return <Redirect to="/login" />;
    }
    return children;
}
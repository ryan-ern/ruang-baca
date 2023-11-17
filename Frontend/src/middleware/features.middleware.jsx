import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Preloader } from './auth.middleware';

export function UseFeature(props) {
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth);
    const features = auth.response.feature || [];
    const allowed = features.includes(props.allow);
    const [isLoading, setIsLoading] = useState(true);

    const checkAllowed = () => {
        if (!allowed) {
            setTimeout(() => {
                checkAllowed();
            }, 1000);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAllowed();
    }, [allowed]);

    if (isLoading) {
        return <Preloader />;
    }

    if (!allowed) {
        return navigate('/not-found');
    }

    return <Outlet />;
}

export default {};

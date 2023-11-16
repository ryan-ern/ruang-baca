import  useEffect from 'react';
import  useSelector  from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export function UseFeature(props) {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const features = auth.info?.rule?.features || [];
    const allowed = features.includes(props.allow);
    useEffect(() => {
        if (!allowed) navigate('/not-found');
    }, [allowed, navigate]);
    if (!allowed) return null;
    return <Outlet />;
}

export default {};

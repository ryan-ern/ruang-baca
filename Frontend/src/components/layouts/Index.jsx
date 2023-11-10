import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Header';
import Footer from './Footer';
import { Row, Col, Container } from 'react-bootstrap';

export default function Layout() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Row>
                <Col>
                    <Navigation />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container className='mb-5 mt-5 align-items-center' style={{ minHeight: '80vh' }}>
                        <Outlet />
                    </Container>    
                </Col>
            </Row>
            <Row className='m-0 p-0'>
                <Footer />
            </Row>
        </div>
    );
}


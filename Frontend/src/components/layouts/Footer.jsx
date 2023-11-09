import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <div className='md-auto py-3 bg-white'>
            <Container>
                <Row>
                    <Col className="text-center text-black">
                        <hr />
                        <span>&copy; Ruang Baca - </span>
                        <span>{new Date().getFullYear()}</span>                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
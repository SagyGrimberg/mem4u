import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 hide-sm'>
            כל הזכויות שמורות לשגיא ורונן 2022
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

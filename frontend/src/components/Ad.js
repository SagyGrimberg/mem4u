import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Footer from "./Footer";
import {useSelector} from "react-redux";

const Ad = () => {
    const [show, setShow] = useState(false);
    const ad = useSelector((state) => state.adInfo);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <Modal show={ad?.name ? true : false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ad.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><img
                src={ad.image}
                className="img-fluid" alt="place image here"/></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Ad

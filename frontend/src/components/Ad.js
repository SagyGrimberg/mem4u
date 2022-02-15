import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {DISMISS_AD} from "../constants/adConstants";
import {dismissAd} from "../actions/adActions";

const Ad = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const ad = useSelector((state) => state.adInfo);
    const handleClose = () => {
        dispatch(dismissAd());
        setShow(false);
    }
    const handleShow = () => setShow(true);

    return (

        <Modal show={!!ad?.show} onHide={handleClose}>
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

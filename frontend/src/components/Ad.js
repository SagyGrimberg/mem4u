import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {dismissAd} from "../actions/adActions";

const Ad = () => {
    const dispatch = useDispatch();
    const ad = useSelector((state) => state.adInfo);
    const handleClose = () => {
        dispatch(dismissAd());
    }

    return (

        <Modal show={!!ad?.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ad.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><img
                src={ad.image}
                className="img-fluid" alt="place image here"/></Modal.Body>
        </Modal>
    );
}

export default Ad

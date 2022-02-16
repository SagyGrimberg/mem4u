import React, {useEffect} from 'react'
import {Button, Col, Row, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Spinner from '../components/layout/Spinner'
import {createAd, listAds} from "../actions/adActions";
import {AD_CREATE_RESET} from "../constants/adConstants";

const AdManagementScreen = ({history, match}) => {
    const pageNumber = match.params.pagenumber || 1
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const adList = useSelector((state) => state.adList)
    const {loading, error, ads, message, pages, page} = adList

    const productUpdate = useSelector((state) => state.productUpdate)

    const adCreate = useSelector((state) => state.adCreate)
    const {
        ad: createdAd,
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = adCreate
    const {error: errorUpdate, success} = productUpdate
    useEffect(() => {
        dispatch({type: AD_CREATE_RESET})
        if (!userInfo || (userInfo && !userInfo.isAdmin)) {
            history.push('/')
            return
        }
        if (successCreate) {
            history.push(`/admin/ad/${createdAd._id}/edit`)
        } else {
            dispatch(listAds('', pageNumber))
        }
    }, [dispatch, userInfo, history, successCreate, createdAd])
    const createAdHandler = () => {
        dispatch(createAd())
    }
    return (
        <>
            <Helmet>
                <title>רשימת מודעות</title>
            </Helmet>
            <Row className='align-items-center'>
                <Col>
                    <h1 style={{color: '#1b3a56'}}>רשימת מודעות</h1>
                </Col>
                <Col className='text-left'>
                    <Button className='my-3 btn btn-brand' onClick={createAdHandler}>
                        <i className='fas fa-plus'></i> הוספת מודעה
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    {message && (
                        <Message
                            variant='success'
                            dismissible={false}
                            classN='alert-product-screen'
                        >
                            {message}
                        </Message>
                    )}

                    {success && (
                        <Message
                            variant='success'
                            dismissible={false}
                            classN='alert-product-screen'
                        >
                            המוצר עודכן בהצלחה
                        </Message>
                    )}

                    {/*{deleteError && (*/}
                    {/*    <Message*/}
                    {/*        variant='danger'*/}
                    {/*        dismissible={true}*/}
                    {/*        classN='alert-product-screen'*/}
                    {/*    >*/}
                    {/*        {deleteError}*/}
                    {/*    </Message>*/}
                    {/*)}*/}

                    {errorUpdate && (
                        <Message
                            variant='danger'
                            dismissible={true}
                            classN='alert-product-screen'
                        >
                            {errorUpdate}
                        </Message>
                    )}

                    {/*errorCreate && (
                        <Message
                            variant='danger'
                            dismissible={true}
                            classN='alert-product-screen'
                        >
                            {errorCreate}
                        </Message>
                    )}*/}

                    {error ? (
                        <Message variant='danger' dismissible={false}>
                            {error}
                        </Message>
                    ) : /*loadingDelete ? (
                        <Spinner/>
                    ) :*/ (
                        <>
                            <Table
                                striped
                                bordered
                                className='table-sm'
                                style={{color: '#1b3a56'}}
                            >
                                <thead>
                                <tr style={{textAlign: 'center'}}>
                                    <th>ID</th>
                                    <th>שם</th>
                                    <th>קישור לתמונה</th>
                                </tr>
                                </thead>
                                <tbody>
                                {!loading &&
                                    ads &&
                                    ads.map((ad) => (
                                        <tr key={ad._id}>
                                            <td
                                            >
                                                {ad._id}
                                            </td>
                                            <td
                                            >
                                                {ad.name}
                                            </td>
                                            <td
                                            >
                                                {ad.image}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true}/>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default AdManagementScreen

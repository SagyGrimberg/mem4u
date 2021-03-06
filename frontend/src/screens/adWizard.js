import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Form, Image, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/layout/Spinner'
import Loader from '../components/layout/Loader'
import {deleteAd, listAdDetails, updateAd} from '../actions/adActions'
import {AD_UPDATE_RESET} from '../constants/adConstants'

const AdWizard = ({match, history}) => {
    const adId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [showAd, setShowAd] = useState(true);

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const adDetails = useSelector((state) => state.adDetails)
    const {loading, error, ad} = adDetails

    const adDelete = useSelector((state) => state.adDelete)
    const {error: deleteError} = adDelete

    const adUpdate = useSelector((state) => state.adUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success} = adUpdate

    const [uploaded, setUploaded] = useState(false)
    const [uploading, setUploading] = useState(false)
    useEffect(() => {
        if (!userInfo || (userInfo && !userInfo.isAdmin)) {
            history.push('/')
            return
        }

        if (success) {
            dispatch({type: AD_UPDATE_RESET})
            history.push('/admin/ads')
        } else {
            if (!ad) {
                dispatch(listAdDetails(adId))
            } else {
                setName(ad.name)
                setImage(ad.image)
            }
        }
    }, [userInfo, dispatch, history, ad, adId, success])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(
            updateAd({
                _id: adId,
                name,
                image,
                showAd
            })
        )
    }

    const deleteHandler = () => {
        dispatch(deleteAd(adId))
        history.push('/admin/ads')
    }


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const {data} = await axios.post('/api/upload', formData, config)

            setImage(data)

            setTimeout(() => {
                setUploaded(true)
                setUploading(false)
            }, 2000)
        } catch (err) {
            console.error(err)
            setUploading(false)
        }
    }
    return (
        <>
            <Helmet>
                <title>?????????? ???????? {!ad ? '' : `"${ad.name}"`} </title>
            </Helmet>

            {errorUpdate && (
                <Message
                    variant='danger'
                    classN='alert-ad-screen'
                    dismissible={true}
                >
                    {errorUpdate}
                </Message>
            )}

            {loadingUpdate ? (
                <Spinner/>
            ) : loading ? (
                <Spinner/>
            ) : error ? (
                <Message
                    variant='danger'
                    classN='alert-ad-screen'
                    dismissible={false}
                >
                    {error}
                </Message>
            ) : (
                <>
                    <FormContainer md={8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h1 className='text-center'>?????????? ??????????</h1>
                            </ListGroup.Item>
                            <ListGroup.Item className='text-center'>
                                <Image
                                    src={image}
                                    alt={name}
                                    rounded
                                    style={{width: '100%'}}
                                />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>????</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='???? ??????????'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>???????? ????????????</Form.Label>
                                        <Form.Control
                                            dir='ltr'
                                            type='text'
                                            placeholder='URL'
                                            value={!uploaded ? image : ''}
                                            onChange={(e) => setImage(e.target.value)}
                                        ></Form.Control>
                                        {uploading ? (
                                            <>
                                                <h5 className='mt-4 text-center'>????????...</h5>
                                                <Loader/>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Label className='mt-3'>???? ?????????? ??????????</Form.Label>
                                                <Form.File
                                                    className='mb-1'
                                                    id='image-file'
                                                    label={uploaded ? image : ''}
                                                    custom
                                                    onChange={uploadFileHandler}
                                                ></Form.File>
                                            </>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId='showAd'>
                                        <Form.Check
                                            type='checkbox'
                                            label='???????? ??????????'
                                            checked={showAd}
                                            onChange={(e) => setShowAd(e.target.checked)}
                                        ></Form.Check>
                                    </Form.Group>

                                    <Button className='btn-brand btn-block mt-4_5' type='submit'>
                                        ??????????
                                    </Button>
                                </Form>
                                <Button
                                    className='btn btn-danger btn-block mt-4_5'
                                    onClick={deleteHandler}
                                >
                                    ?????????? ??????????
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </FormContainer>
                </>
            )}
        </>
    )
}

export default AdWizard

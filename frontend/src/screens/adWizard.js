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
                <title>עריכת מוצר {!ad ? '' : `"${ad.name}"`} </title>
            </Helmet>
            <Button onClick={() => history.push('/admin/ads')} className='mx-1'>
                חזרה
            </Button>

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
                                <h1 className='text-center'>עריכת מוצר</h1>
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
                                        <Form.Label>שם</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='שם המוצר'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>נתיב התמונה</Form.Label>
                                        <Form.Control
                                            dir='ltr'
                                            type='text'
                                            placeholder='URL'
                                            value={!uploaded ? image : ''}
                                            onChange={(e) => setImage(e.target.value)}
                                        ></Form.Control>
                                        {uploading ? (
                                            <>
                                                <h5 className='mt-4 text-center'>מעלה...</h5>
                                                <Loader/>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Label className='mt-3'>או העלאת תמונה</Form.Label>
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

                                    <Button className='btn-brand btn-block mt-4_5' type='submit'>
                                        עדכון
                                    </Button>
                                </Form>
                                <Button
                                    className='btn btn-danger btn-block mt-4_5'
                                    onClick={deleteHandler}
                                >
                                    מחיקת המוצר
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

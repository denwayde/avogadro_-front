import React, { useEffect, useState } from 'react'
import { convertTime, formatText } from '../func'
import { BiAtom } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import {setIsPostModalVisible} from '../features/postModal';

function PostModal({openModal, post, dsp}) {
    const isVisible = useSelector(state=>state.postModal.value)
    const dispatch = useDispatch()

    let [clsName, setClsName] = useState()
    let [stl, setStl] = useState()
    
    useEffect(()=>{
        setClsName(openModal)
        setStl(dsp)
    },
    [openModal, dsp]
    )

    const closeModal = () => {
        setClsName("modal fade")
        setStl({display: 'none'})
        dispatch(setIsPostModalVisible(isVisible === false ? true : false))
    }

    return (
        <>
        <div className="mymodal-wrapper" style={stl}>
            <div className={clsName} id="staticBackdrop" tabIndex="-1" style={stl}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 mymodal-header"><BiAtom/> АВОГАДРО</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
        
                        <img src={post?.attachments[0].photo.orig_photo['url']} className="my-card-img card-img-top  object-fit-cover" alt="..."/>
                        <div className="card-body">
                            <p className="card-text" dangerouslySetInnerHTML={{__html: formatText(post?.text)}}/>
                            <p className="card-text"><small className="text-body-secondary">{convertTime(post?.date)}</small></p>
                        </div>
                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={closeModal}>Прочитано</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PostModal

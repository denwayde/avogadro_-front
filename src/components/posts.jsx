import React, { useEffect, useState } from 'react'
import Header from './header'
import axios from 'axios';
import {getFirstNWords, convertTime} from '../func'
import { useDispatch, useSelector } from 'react-redux';
import PostModal from './postModal';

import {setIsPostModalVisible} from '../features/postModal';


function Posts() {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [isVisible, setisVisible] = useState(false)
    const [postToModal, setPostToModal] = useState()
    const [cls, setCls] = useState("modal fade")

    const isVisible = useSelector(state=>state.postModal.value)
    const dispatch = useDispatch()



    useEffect(() => {
        // Пример API, где есть список постов
            axios.get("https://4d43d7c1-af93-4739-8293-90191ef3b226-00-2f0v390m4jcr2.spock.replit.dev/api/vk/posts")
            .then(response => {
                setPosts(response.data.posts);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                setError("Ошибка загрузки данных");
                setLoading(false);
            });
        console.log(cls)    
        }, [cls]);

    
    const showPost = (e, idx)=>{
        dispatch(setIsPostModalVisible(isVisible === false ? true : false))
        setCls("modal fade show")
        setPostToModal(posts[idx])
    }
    
    return (
        <>
            <Header/>
            {(()=>{
                if (loading) {return <span className="loader"></span>}
                else if (error) {return <h3 className='text-center align-middle'>{error}</h3>}
                else {
                    return(
                        <div className="container">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                                
                                    {
                                        posts.map((post, idx)=>(
                                            <div className="col mb-3" key={idx}>
                                                <div className="card h-100">
                                                    <img src={post.attachments[0].photo.orig_photo['url']} className="card-img-top object-fit-cover" alt="..."/>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">{getFirstNWords(post.text.split("\n")[0], 7, true)}</h5>
                                                        <p className="card-text h-100 my-card-text">{getFirstNWords(post.text, 22, true).replace(/\n/g, '<br>')}</p>
                                                        <p className="card-text"><small className="text-body-secondary">Опубликовано: {convertTime(post.date)}</small></p>
                                                    </div>
                                                    <div className="card-footer d-flex justify-content-end">
                                                        <button className='btn btn-outline-primary' id={idx} onClick={(e) => showPost(e, idx)}>подробнее</button>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        )
                                    }
                            </div>
                        </div>
       
                    )
                }
            })()}
         {isVisible ? <PostModal openModal={cls} post={postToModal} dsp={cls === "modal fade show" ? {display: 'block'} : {display: 'none'}}/> : ''}    
        </>

    )
}

export default Posts

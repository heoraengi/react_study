import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Card, Button, InputGroup, Form, Row, Col} from 'react-bootstrap';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState('뉴욕여행');

    const callAPI = async() => {
        const url =`https://dapi.kakao.com/v2/search/blog?target=title&query=${query}&size=3&page=${page}`;
        const config ={
            headers : {
                "Authorization": "KakaoAK 791d012926269930c0d91e8b05e0d559"
            }
        }

        setLoading(true);
        const res = await axios.get(url,config);
        const data = res.data;
        setBlogs(data.documents);
        setEnd(data.meta.is_end);
        console.log(data);
        setLoading(false);

    }

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onSubmit = (e) =>{
        e.preventDefault();
        setPage(1);
        callAPI();
    }

    if(loading) return <h1 className='my-5 mx-5'>로딩중...</h1>

    return (
        <div>
            <Row className='my-5 mx-5'>
                <Col md={6} lg = {3}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row className='mx-5'>
                {blogs.map(blog=>
                    <Row>
                        <div dangerouslySetInnerHTML={{__html:blog.title}}></div>
                        <Col>
                        
                        <div className='ellipsis' dangerouslySetInnerHTML={{__html:blog.contents}}></div>
                        <h1> </h1>
                        <span className='span'>{blog.blogname} {blog.datetime.substr(0,10)}</span>
                        <hr></hr>
                        </Col>
                        <Col>
                        <img src={blog.thumbnail}/>
                        </Col>
                    </Row>
                )}
                <div className='button mt-5'>
                <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page}</span>
                <Button onClick={()=>setPage(page+1)} disabled = {end}>다음</Button>
                </div>
            </Row>
            
        </div>
    )
}

export default Blogs

import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {app} from '../../firebaseinit'
import { getFirestore, addDoc, collection, query, onSnapshot, orderBy, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Comments = () => {
    const db = getFirestore(app);

    const [comments, setComments] = useState([]);
    const [contents, setContents] = useState('');
    const email = sessionStorage.getItem('email');
    const {id} = useParams();

    const onClickInsert = () => {
        sessionStorage.setItem('target', `/bbs/read/${id}`);
        window.location.href = '/login';
    }

    const onInsert = async() =>{
        if(contents === ''){
            alert('댓글을 입력하세요!!');
            return;
        }

        // 댓글 등록
        const data = {
            pid : id,
            email,
            contents,
            date : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log(data);
        await addDoc(collection(db, `/comments`), data);
        alert("댓글 등록 완료!");
        setContents('');
    }
    
    const callDB = () =>{
        const q = query(collection(db, 'comments'), where('pid', '==', id), orderBy('date', 'desc'));
        onSnapshot(q, snapshot =>{
            let rows =[];
            snapshot.forEach(row=>{
                rows.push({id:row.id, ...row.data()})
            });
            // console.log(rows);
            const data = rows.map(row=> row && {...row, ellip:true, isEdit:false, text:row.contents});
            setComments(data);
        });
    }
    
    const onClickContents = (id) => {
        const data = comments.map(com => com.id === id ? {...com, ellip:!com.ellip}: com);
        setComments(data);
    }

    const onClickDelete = async(id) => {
        if(!window.confirm(`${id}번 댓글을 삭제하겠습니까?`)) return;
        //댓글 삭제
        await deleteDoc(doc(db, `/comments/${id}`));
    }

    const onClickUpdate = (id) => {
        const data = comments.map(com=> com.id === id ? {...com, isEdit:true} : com)
        setComments(data);
    }

    const onChangeContents = (e, id) => {
        const data = comments.map(com=>com.id === id ? {...com, contents:e.target.value} : com);
        setComments(data);
    }

    const onClickCancel = (comment) => {
        if(comment.contents !== comment.text){
            if(window.confirm('댓글 수정을 취소하겠습니까?')){
                const data = comments.map(com=> com.id === comment.id ? {...com, isEdit:false, contents:com.text} : com)
                setComments(data);
            }
        }else{
            const data = comments.map(com=> com.id === comment.id ? {...com, isEdit:false} : com)
            setComments(data);
        }
    }

    const onClickSave = async(com) => {
        if(com.text!==com.contents) {
            if(!window.confirm('변경된 댓글을 저장하겠습니까?')) return
            // 변경 댓글 저장
            await updateDoc(doc(db, `/comments/${com.id}`), com);
        }
        callDB();
    }

    useEffect(()=>{
        callDB();
    }, [])

    return (
        <div className='my-5'>
            {!email ? 
            <div className='text-end'>
                <Button className='px-3' onClick={onClickInsert}>댓글등록</Button>
            </div>    
            :
            <div>
                <Form.Control value={contents} onChange={(e)=>setContents(e.target.value)}
                as = 'textarea' rows={5} placeholder='댓글 내용을 입력하세요!'/>
                <div className='text-end mt-2'>
                    <Button className='px-3' onClick={onInsert}>등록</Button>
                </div>
            </div> 
            }
            <div className='my-5'>
                {comments.map(com=>
                    <div key={com.id}>
                        <Row className='mb-2'>
                            <Col className='text-muted'>
                                <span className='me-2'>{com.email}</span>
                                <span>{com.date}</span>
                            </Col>
                            <Col>
                                {email === com.email && !com.isEdit &&
                                    <Col className='text-end'>
                                    <Button onClick={()=>onClickUpdate(com.id)}
                                     size='sm' className='me-2' variant='success'>수정</Button>
                                    <Button onClick={()=>onClickDelete(com.id)}
                                     size='sm' variant='danger'>삭제</Button>
                                    </Col>
                                }
                                {email === com.email && com.isEdit &&
                                    <Col className='text-end'>
                                    <Button onClick={()=>onClickSave(com)}
                                     size='sm' className='me-2' variant='success'>저장</Button>
                                    <Button onClick={()=>onClickCancel(com)}
                                     size='sm' variant='secondary'>취소</Button>
                                    </Col>
                                }
                            </Col>
                        </Row>
                        {com.isEdit ?
                        <Form.Control onChange={(e) =>onChangeContents(e, com.id)} value={com.contents} as="textarea" rows={5}/>
                        :
                        <div onClick={()=>onClickContents(com.id)} 
                        className={com.ellip && 'ellipsis'} style={{whiteSpace:'pre-wrap' , cursor:'pointer'}}>{com.contents}</div>
                        }
                        <hr/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comments

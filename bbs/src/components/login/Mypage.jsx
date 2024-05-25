import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Button, InputGroup, Form} from 'react-bootstrap';
import { app } from '../../firebaseinit';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const Mypage = () => {
    const db = getFirestore(app);
    const uid = sessionStorage.getItem('uid');

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email : sessionStorage.getItem('email'),
        name : '아무개',
        phone : '010-1010-1010',
        address1 : '인천시 서구 땡땡동',
        address2 : '엄청난 아파트 102동 50층'
    });

    const {name, phone, address1, address2} = form; // 비구조 할당

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(name===''){
            alert("이름을 입력하세용");
            return;
        }
        // 정보저장
        if(!window.confirm('변경된 내용을 저장하겠습니까?')) return;
        console.log(form);
        setLoading(true);
        await setDoc(doc(db, `users/${uid}`), form);
        setLoading(false);
    }
    
    const callDB = async() => {
        setLoading(true);
        const res = await getDoc(doc(db, `users/${uid}`));
        if(res.data()){
            setForm(res.data());
        }
        setLoading(false);
    }

    useEffect(()=>{
        callDB();
    }, []);

    if(loading) <h1 className='text-center my-5'>로딩중...</h1>
    return (
        <div>
        <Row className='justify-content-center my-5'>
            <Col xs={12} md={10} lg ={8}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>마이페이지</h3>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>이름</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>전화</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control name="address1" value={address1} onChange={onChangeForm}/>
                                <Button>검색</Button>
                            </InputGroup>
                            <Form.Control placeholder='상세주소' name="address2" value={address2} onChange={onChangeForm}/>
                            <div className='text-center mt-3'>
                                <Button className='px-5' type='submit'>저장</Button>
                                <Button className='ms-2 px-5' variant='secondary'>취소</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default Mypage

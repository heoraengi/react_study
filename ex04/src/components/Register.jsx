import React, { useRef, useState } from 'react'
import {Button, Form} from 'react-bootstrap';

const Register = ({onRegister1}) => {
    const newCode = useRef(103);
    const refName = useRef(null);
    const [product, setProduct] = useState({
        code : newCode.current,
        name : '',
        price : '',
        qnt : ''
    });
    const {code, name, price, qnt} = product;
    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]:e.target.value
        })
    }
    const onClick = () => {
        if(name==='' || price==='' || qnt==='') {
            alert('상품정보가 입력되지 않았습니다.');
        }else{
            if(window.confirm('상품을 등록하시겠습니까?')){
                onRegister1(product);
                setProduct({
                    code : ++newCode.current,
                    name : '', 
                    price : '',
                    qnt : ''
                });
                refName.current.focus();
            }
        }
    }

    const onKeyDown = (e) => {
        if(e.key==='Enter'){
            onClick();
        }
    }

    return (
        <div className='mb-5'>
            <Form.Control value={code} name='2' placeholder='상품코드' className='mb-2' readOnly/>
            <Form.Control ref={refName} value={name} name='name' onChange={onChange}  placeholder='상품이름' className='mb-2'/>
            <Form.Control value={price} name='price' onChange={onChange}  placeholder='상품가격' className='mb-2'/>
            <Form.Control onKeyDown={onKeyDown} value={qnt} name='qnt' onChange={onChange} placeholder='상품수량' className='mb-2'/>
            <Button onClick={onClick}>상품등록</Button>
        </div>
    )
}

export default Register

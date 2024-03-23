import React, { useRef, useState } from 'react'

const Register = ({onRegister1}) => {
    const last = useRef(3);
    const [form, setForm] = useState({
        id : last.current, 
        name : '',
        juso : '',
        phone : ''
    });

    const refName = useRef(null);
    
    const {id, name, juso, phone} = form;

    const onKeyDown = (e) => {
        if(e.key === 'Enter') {
            onClickRegister();
        }
    }

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onClickRegister = () => {
        if(name==='') {
            alert('이름을 입력하세요!!!');
            refName.current.focus();
            return;
        }
        if(window.confirm(`${name}의 주소를 등록하시겠습니까?`)){
            onRegister1(form);
            last.current++;
            setForm({
                id:last.current,
                name : '',
                juso : '',
                phone : ''
            })
            refName.current.focus();
        }
    }

    return (
        <div className='register'>
            <h1>주소등록</h1>
            <input placeholder='id' value={id} name='id' onChange={onChangeForm} readOnly/>
            <input ref={refName} placeholder='이름' value={name} name='name' onChange={onChangeForm}/>
            <input placeholder='주소' value={juso} name='juso' onChange={onChangeForm}/>
            <input placeholder='전화번호' value={phone} name='phone' onChange={onChangeForm} onKeyDown={onKeyDown}/>
            <button onClick={onClickRegister}>등록</button>
        </div>
    )
}

export default Register

import React, { useState } from 'react'

const Component05 = () => {
    const [form, setForm] = useState({
        id : '1',
        name : '냉장고',
        price : 100
    });

    const {id, name, price} = form;
    
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClick = () => {
        alert(`상품아이디 : ${id} \n상품명 : ${name}\n상품가격 : ${price}`)
    }

    const onEnter = (e) => {
        if(e.key==='Enter'){
            onClick();
        }
    }
    return (
        <div className='address'>
            <h1>상품관리</h1>
            <input name='id' placeholder='상품아이디' value={id} readOnly />
            <input name ='name' onChange={onChange} placeholder='상품명' value={name}/>
            <input name = 'price' onChange={onChange} placeholder='상품가격' value={price} onKeyDown={onEnter}/>
            <button onClick={onClick}>확인</button>
        </div>
    )
}

export default Component05

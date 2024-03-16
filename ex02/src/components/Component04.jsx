    import React, { useState } from 'react'

const Component04 = () => {
    const [form, setForm] = useState({
        id : 1,
        name : '홍길동',
        address : '인천 남구 학익동 미추홀구',
        phone : '032-000-0000'
    });
    // object로 정의할때는 {} 로 넣어줌
    const {id, name, address, phone} = form;
    // 비교적 할당 방법

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClick = () => {
        alert(`아이디:${id}\n이름:${name}\n주소:${address}\n전화번호:${phone}`)
        setForm ({
            id : 2,
            name : '',
            address : '',
            phone : ''
        })
    }

    const onEnter = (e) => {
        if(e.key === 'Enter'){
            onClick();
        }
    }

    return (
        <div>
            <h1>주소록</h1>
            <div className='address'>
                <input name='id'placeholder='아이디' value={id} readOnly/>
                <input name='name' onChange={onChangeForm}
                 placeholder='이름' value={name}/>
                <input name ='address' onChange={onChangeForm}
                 placeholder='주소' value={address}/>
                <input name = 'phone' onChange={onChangeForm}
                 placeholder='전화번호' value={phone}
                 onKeyDown={onEnter}/>
                <button onClick={onClick}>확인</button>
            </div>
        </div>
    )
}

export default Component04

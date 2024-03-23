import React, { useState } from 'react'
import Register from './Register';

const Address = () => {
    const [address, setAddress] = useState([
        { id : 1, name : '홍길동', juso : '인천 서구', phone : '010-1234-1234' },
        { id : 2, name : '심청이', juso : '인천 미추홀구', phone : '010-5678-5678' }
    ]);

    const onRegister = (form) => {
        const newAddress = address.concat(form);
        setAddress(newAddress);
    }

    const onDelete = (id) => {
        if(window.confirm(`${id}번 주소를 삭제하겠습니까?`)){
            const deleteAddress = address.filter(addr=>addr.id !== id);
            setAddress(deleteAddress);
        }
    }

    return (
        <div>
            <Register onRegister1={onRegister}/>
            <h1>주소목록</h1>
            <table>
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>이름</td>
                        <td>주소</td>
                        <td>전화번호</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {address.map(addr=>
                        <tr key={addr.id}>
                            <td>{addr.id}</td>
                            <td>{addr.name}</td>
                            <td>{addr.juso}</td>
                            <td>{addr.phone}</td>
                            <td><button onClick={()=>onDelete(addr.id)}>삭제</button></td>
                        </tr>    
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Address

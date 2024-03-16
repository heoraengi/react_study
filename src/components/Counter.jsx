import React from 'react'
import { useState } from 'react'
import '../App.css'

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <div className='value'>{count}</div>
            <button onClick={increase}>증가</button>
            <button onClick={()=>setCount(count - 1)}>감소</button>
        </div>
    )

    function increase() {
        setCount(Number(count) + 1);
    }
}

export default Counter

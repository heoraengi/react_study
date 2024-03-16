import React, { useState } from "react"

const Component02 = () => {
    const [count, setCount] = useState(100);
    // 실행결과가 바로 반영되게 하려면 state 변수를 사용하면 됨 
    
    const onDecrease=()=>{
        setCount(count-1);
    }

    const onIncrease=()=>{
        setCount(count+1);
    }
    
    return (
        <div>
            <h1>컴포넌트02</h1>
            <button onClick={onDecrease}>감소</button>
            <span style={{padding:'0px 10px', color:'red', fontSize:'20px'}}>{count}</span>
            {/* style을 css 파일 말고 파일 내에서 직접 주고 싶다면 style 을 이용해서 가능 대신 {{}} 중괄호 두번 써야함 */}
            <button onClick={onIncrease}>증가</button>
        </div> 
    ) // return 내부는 jsx 문법임 
}

export default Component02;
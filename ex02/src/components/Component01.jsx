import React from "react"

const Component01 = () => {
    let name = '홍은화';
    let nickname = null;
    return (
        <div>
            <h1>컴포넌트01</h1>
            <h1>이름:{name}</h1>
            <h1>{name==='홍은화' ?'홍은화입니다.':'홍은화가 아니야!'}</h1> 
             {/* 같다 연산자는 === 이다! == 두개 아님!! */}
            <h1>{name==='홍은화' && '홍은화입니다.'}</h1>
            {/* && 조건은 True 일때만 출력 */}
            <h1>{nickname || '닉네임이 없습니다.'}</h1>
            {/* || 조건은 값이 없을 때만 출력 */}
            <hr></hr>
        </div> 
    ) // return 내부는 jsx 문법임 
}

export default Component01;
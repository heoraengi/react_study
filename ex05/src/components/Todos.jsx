import React, { useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const callAPI = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setLast((json.length % 10) === 0 ? json.length / 10 : (json.length / 10) + 1)
                const start = (page-1)*10 + 1;
                const end = (page)*10;
                const data = json.filter(j=>j.id>=start && j.id<=end);
                setTodos(data);
            });
    }

    // 처음 렌더링할 때 한번만 실행시키고 싶다 => 빈 배열 [] 을 두번째 매개변수에 할당해준다.
    // 두번째 매개변수에 page를 추가 => page 변수가 바뀔 때마다 실행시킨다.
    useEffect(()=>{
        callAPI();
    }, [page]);

    const onClickNext = () => {
        setPage(page + 1);
    }

    const onClickPrev = () => {
        setPage(page - 1);
    }

    return (
        <div className='todos'>
            <h1>할 일 목록</h1>
            <Table striped border hover>
                <thead>
                    <tr>
                        <td></td>
                        <td>ID</td>
                        <td>Title</td>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr>
                            <td><input type="checkbox" checked={todo.completed}/></td>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div>
                <Button onClick={onClickPrev} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page} / {last}</span>
                <Button onClick={onClickNext} disabled={page===last}>다음</Button>
            </div>
        </div>
    )
}

export default Todos

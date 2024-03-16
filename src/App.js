import './App.css';
import First from './components/First';
import Second from './components/Second';
import Counter from './components/Counter';


function App() {
  return (
    <div>
      {/* 주석 작성 방법 */}
      <h1 className='blue'>안녕! 리액트</h1>
      <h1 className='green'>저는 허은화입니다.</h1>
      
      <hr/>

      <First/>
      <First/>

      <hr/>

      <Second/>

      <hr/>

      <Counter/>

      <Counter/>
    </div>
  )
}

export default App;

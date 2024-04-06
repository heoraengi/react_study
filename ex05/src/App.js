import './App.css';
import Posts from './components/Posts';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';

const App=() => {
  return (
    <div className="App">
      <Posts/>
          {/* <Todos/> */}
      </div>
  );
}


export default App;

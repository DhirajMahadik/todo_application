import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import CompletedTask from './Components/CompletedTask';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/completed-tasks' element={<CompletedTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

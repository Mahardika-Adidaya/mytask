import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChangePassword from './pages/ChangePassword';
import Invoice from './pages/Invoice';
import Login from './pages/Login';
import Main from './pages/Main';
import Test from './pages/Test';
import ViewTask from './pages/ViewTask';

function App() {
  return (
    <div>
      <Routes>
        <Route name='LoginPage' path="/" element={<Login/>}/>
        <Route name='InputTask' path="/input-task" element={<Main/>}/>
        <Route name='ViewTask' path="/input-task/view-task" element={<ViewTask/>}/>
        <Route name='ChangePassword' path="/change-password" element={<ChangePassword/>}/>
        <Route name='Invoice' path="/invoice" element={<Invoice/>}/>
        <Route name='Test' path="/test" element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;

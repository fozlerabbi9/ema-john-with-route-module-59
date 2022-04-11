
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/LoginFile/Login';
import Orders from './components/Orders/Orders';
import RequireAuth from './components/RequireAuthFile/RequireAuth';
import Shipment from './components/ShipmentFile/Shipment';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUpFile/SignUp';

function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Shop></Shop>
          </RequireAuth>
        }></Route>

        <Route path='/shop' element={
          <RequireAuth>
            <Shop></Shop>
          </RequireAuth>
        }></Route>

        <Route path='/orders' element={<Orders></Orders>}></Route>

        <Route path='/inventory' element={
          <RequireAuth>
            <Inventory></Inventory>
          </RequireAuth>
        }></Route>

        <Route path='/Shipment' element={
          <RequireAuth>
            <Shipment></Shipment>
          </RequireAuth>
        }></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/signUp' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;


import './App.css';
import {BrowserRouter as Router ,Routes , Route} from "react-router-dom"
import HomePage from './components/Home/HomePage';
import Navbar from './components/Navbar/Navbar';
import MainProductContentPage from './components/MainProductContent/MainProductContentPage';
import ProductList from './components/ProductsList/ProductList';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Profile from './components/Profile/Profile';
import MyOrders from './components/Orders/MyOrders';
import MyOrderItems from './components/Orders/MyOrderItems';
import NotFound from './components/NotFoundLayout/NotFound';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
       
        <Route path='/' element={<HomePage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route path='/product/:id' element={<MainProductContentPage/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/myorders/items/:id' element={<MyOrderItems/>}/>
        <Route path='/account' element={<Profile/>}/>
        <Route exact path="*" element={<NotFound/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import OrderList from './OrderList';
import OrderAdd from './OrderAdd';
import OrderEdit from './OrderEdit';
import Summary from './Summary';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
import { OrderProvider } from './OrderContext';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path='/order/list' element={<OrderList/>}></Route>
          <Route path='/order/add/:menu_id' element={<OrderAdd/>}></Route>
          <Route path='/order/edit/:menu_sequence' element={<OrderEdit/>}></Route>
          <Route path='/order/summary' element={<Summary/>}></Route>
          <Route path='/order/payment' element={<Payment/>}></Route>
          <Route path='/order/paymentsuccess' element={<PaymentSuccess/>}></Route>

          <Route path="*" element={<Navigate to="/order/list/" replace />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

// General User
import OrderList from './OrderList';
import OrderAdd from './OrderAdd';
import OrderEdit from './OrderEdit';
import Summary from './Summary';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';

// Administrator
import AdminMenu from './AdminMenu';
import AdminMenuList from './AdminMenuList';
import AdminMenuAdd from './AdminMenuAdd';
import AdminMenuEdit from './AdminMenuEdit';
import AdminTableList from './AdminTableList';
import AdminTableAdd from './AdminTableAdd';
import AdminTableEdit from './AdminTableEdit';
import AdminEmployeeList from './AdminEmployeeList';
import AdminEmployeeAdd from './AdminEmployeeAdd';
import AdminEmployeeEdit from './AdminEmployeeEdit';
import EmployeeOrder from './EmployeeOrder';

// Employee
import EmployeeTableList from './EmployeeTableList';

import { OrderProvider } from './OrderContext';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          {/* General User */}
          <Route path='/order/list' element={<OrderList/>}></Route>
          <Route path='/order/add/:menu_id' element={<OrderAdd/>}></Route>
          <Route path='/order/edit/:menu_sequence' element={<OrderEdit/>}></Route>
          <Route path='/order/summary' element={<Summary/>}></Route>
          <Route path='/order/payment' element={<Payment/>}></Route>
          <Route path='/order/paymentsuccess' element={<PaymentSuccess/>}></Route>

          {/* Administrator */}
          <Route path='/admin/menu' element={<AdminMenu/>}></Route>
          <Route path='/admin/menu/list' element={<AdminMenuList/>}></Route>
          <Route path='/admin/menu/add' element={<AdminMenuAdd/>}></Route>
          <Route path='/admin/menu/edit/:menu_id' element={<AdminMenuEdit/>}></Route>
          <Route path='/admin/table/list' element={<AdminTableList/>}></Route>
          <Route path='/admin/table/add' element={<AdminTableAdd/>}></Route>
          <Route path='/admin/table/edit/:table_id' element={<AdminTableEdit/>}></Route>
          <Route path='/admin/employee/list' element={<AdminEmployeeList/>}></Route>
          <Route path='/admin/employee/add' element={<AdminEmployeeAdd/>}></Route>
          <Route path='/admin/employee/edit/:employee_id' element={<AdminEmployeeEdit/>}></Route>


          {/* Employee */}
          <Route path='/employee/table/list' element={<EmployeeTableList/>}></Route>
          <Route path='/employee/order/:table_id' element={<EmployeeOrder/>}></Route>

          {/* Default path */}
          <Route path="*" element={<Navigate to="/order/list/" replace />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;

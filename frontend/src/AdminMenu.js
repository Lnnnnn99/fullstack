import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminMenu() {

  const navigator = useNavigate()

  return (
    <div>
      <div className="notification">
        <div className="notification-header">จัดการระบบ</div>
        <div className="notification-body">
          <p>กรุณาเลือกรายการที่ต้องการแก้ไข</p>
          <div className="notification-buttons">
            <button className="notification-button" onClick={() => navigator('/admin/menu/list')}>รายการอาหาร</button>
            <button className="notification-button" onClick={() => navigator('/admin/employee/list')}>ผู้ใช้งาน</button>
            <button className="notification-button" onClick={() => navigator('/admin/table/list')}>จัดการโต๊ะ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu;

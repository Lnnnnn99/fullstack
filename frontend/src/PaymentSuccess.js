import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import './App.css';

function PaymentSuccess() {

  const navigator = useNavigate()
  const location = useLocation()
  const { clearOrder } = useContext(OrderContext)
  const { total_price } = location.state || {}

  function goHome(){
    clearOrder()
    navigator('/order/list')
  }

  return (
    <div class="payment-success-container">
      <h1 class="success-message">ขอบคุณที่ชำระค่าบริการ</h1>

      <div class="success-icon">
        <i class="fa-solid fa-wallet"></i>
      </div>

      <div class="success-amount">
        <p class="amount-text">ยอดที่ชำระ</p>
        <p class="amount-value">฿{total_price}</p>
      </div>

      <div class="return-button-container">
        <button class="return-button" onClick={() => goHome()}>กลับสู่หน้าหลัก</button>
      </div>
    </div>
  )
}

export default PaymentSuccess;

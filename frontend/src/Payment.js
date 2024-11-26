import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";

import Swal from "sweetalert2";

import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function Payment() {

  const navigator = useNavigate()
  const location = useLocation()
  const { order_id, total_price } = location.state || {}

  const qrValue = "https://www.example.com/payment/" + (order_id || 0);

  async function confirmOrder(){
    try{
      const paymentResponse = await fetch(API_URL + '/api/payment/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "order_id": order_id,
          "payment_method": 2,
          "payment_status": 2,
          "payment_amount": total_price,
          "payment_currency": "THB",
        })
      });
  
      if (!paymentResponse.ok) {
        throw new Error(`HTTP error! status: ${paymentResponse.status}`);
      }
    
      const orderResponse = await fetch(API_URL + '/api/order/', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "order_id": order_id,
          "order_payment_type": 'cash',
        })
      });
  
      if (!orderResponse.ok) {
        throw new Error(`HTTP error! status: ${orderResponse.status}`);
      }
  
      navigator('/order/paymentsuccess', {
        state: {
          total_price: total_price,
        }
      })
    } catch (error) {
      console.error("Error during confirmOrder:", error);
  
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message || "ไม่สามารถดำเนินการได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  }

  return (
    <div className="payment-container">
      <h1 className="payment-title">ชำระค่าบริการ</h1>

      <button className="cash-button" onClick={() => confirmOrder()}>เงินสด</button>

      <div className="qr-section">
        <QRCode value={qrValue} size={200} />
        <p className="qr-text">QR พร้อมเพย์</p>
      </div>
    </div>
  )
}

export default Payment;

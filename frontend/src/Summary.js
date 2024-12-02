import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import Swal from "sweetalert2";
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function Summary() {

  const navigator = useNavigate()
  const { orders } = useContext(OrderContext)

  const [ tables, setTables ] = useState([])
  const [ tableID, setTableID ] = useState(-1);
  
  const [ totalPrice, setTotalPrice ] = useState(
    orders.reduce((acc, item) => acc + (item.menu_price * item.menu_quantity), 0)
  )

  useEffect(() => {
    const fetchTable = async () => {
      try{
        const response = await fetch(API_URL + '/api/tables')
        
        if (!response.ok) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: `ไม่สามารถโหลดข้อมูลได้ (Error: ${response.status})`,
            icon: "error",
            confirmButtonText: "ตกลง"
          }).then(() => {
            navigator('/order/list/')
          });
          return;
        }
  
        const data = await response.json()
        setTables(data)
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
          icon: "error",
          confirmButtonText: "ตกลง"
        }).then(() => {
          navigator("/order/list");
        });
      }
    }

    fetchTable()
  }, [])
  
  

  async function confirmOrder(){
    try{
      if (orders.length === 0) {
        await Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณาสั่งรายการอาหาร",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        return;
      }
  
      if (tableID === -1) {
        await Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณาเลือกโต๊ะ",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }
  
      const orderResponse = await fetch(`${API_URL}/api/order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_id: tableID,
          order_status: 0,
          order_total_price: totalPrice,
        }),
      });
  
      if (!orderResponse.ok) {
        throw new Error(`Order API error! Status: ${orderResponse.status}`);
      }
  
      const orderResult = await orderResponse.json();
      const order_id = orderResult.insertId;
  
      for (let order of orders) {
        const orderDetailMenuSe = JSON.stringify(order.menu_se);
  
        const orderDetailResponse = await fetch(`${API_URL}/api/order_detail/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: order_id,
            menu_id: order.menu_id,
            order_detail_menu_se: orderDetailMenuSe,
            order_detail_quantity: order.menu_quantity,
            order_detail_price: order.menu_price,
            order_detail_substatus: 0,
          }),
        });
  
        if (!orderDetailResponse.ok) {
          throw new Error(
            `Order Detail API error! Status: ${orderDetailResponse.status}`
          );
        }
  
        await orderDetailResponse.json();
      }
  
      navigator('/order/payment', {
        state: {
          order_id: order_id,
          total_price: totalPrice
        }
      })
    } catch (error) {
      console.error("Error in confirmOrder:", error);
  
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message || "ไม่สามารถดำเนินการได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  }

  const handleTableChange = (event) => {
    setTableID(event.target.value);
  };

  return (
    <div class="order-summary-container">

      <div class="order-summary-header">
        <div className="operator-item" style={{position: 'absolute', bottom: '18px'}} onClick={() => navigator("/order/list")}>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        <h1 class="order-summary-title">รายการอาหาร</h1>
        <button class="add-more-button" onClick={() => navigator('/order/list')}>สั่งอาหารเพิ่มเติม</button>
      </div>
      
      {orders.length !== 0 && (
        <div class="order-summary-list">
          {
            orders.map((order) => (
              <div class="order-summary-item" key={order.menu_sequence}>

                <img class="item-image" src={"/images/" + order.menu_pic} alt={order.menu_pic} />
          
                <div class="item-details">
                  <div class="item-name">{order.menu_name} X {order.menu_quantity}</div>
                  <div class="item-description">
                    {
                      Object.entries(order.menu_se)
                      .map(([key, value]) => Array.isArray(value) ? value : [value])
                      .reduce((acc, curr) => acc.concat(curr), [])
                      .join(", ")
                    }
                  </div>
                  <button class="edit-button" onClick={() => navigator(`/order/edit/${order.menu_sequence}`)}>แก้ไข</button>
                </div>
          
                <div class="item-price">
                  <span>฿{order.menu_price * order.menu_quantity}</span>
                </div>

              </div>
            ))
          }
        </div>
      )}
    
      <div class="table-selection">
        <label for="table-number" class="table-selection-label">เลือกหมายเลขโต๊ะ:</label>
        <select id="table-number" class="table-selection-dropdown"  value={tableID} onChange={handleTableChange}>
          <option value={-1} hidden>-- กรุณาเลือกโต๊ะ --</option>
          {
            tables.map((table) => (
              <option value={table.table_id}>โต๊ะ {table.table_number}</option>
            ))
          }
        </select>
      </div>

      <div class="order-total">
        <span class="total-text">ทั้งหมด</span>
        <span class="total-price">฿{totalPrice}</span>
      </div>
    
      <div class="confirm-order">
        <button class="confirm-button" onClick={() => confirmOrder()}>ยืนยันสั่งอาหาร</button>
      </div>
    </div>
  )
}

export default Summary;

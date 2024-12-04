import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function EmployeeOrder() {
  const navigate = useNavigate();
  const { table_id } = useParams();

  const [table, setTable] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState([])

  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const orderResponse = await fetch(`${API_URL}/api/order/table/` + table_id);
        if (!orderResponse.ok) throw new Error(`Error: ${orderResponse.status}`);
        const orders = await orderResponse.json();
        
        if(orders.length == 0){
          navigate('/employee/table/list')
          return;
        }

        const order = orders.find((o) => o.order_status == 0)

        if(!order){
          navigate('/employee/table/list')
          return;
        }

        const orderDetailResponse = await fetch(`${API_URL}/api/order_detail/` + order.order_id);
        if (!orderDetailResponse.ok) throw new Error(`Error: ${orderDetailResponse.status}`);
        const orderDetail = await orderDetailResponse.json();

        setTotalPrice(
          orderDetail.reduce((a, v) => a + (v.order_detail_quantity * v.order_detail_price), 0)
        )

        setTable(order)

        setOrder(orderDetail)

        fetchPayment();

        // setTables(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch tables.", "error");
      }
    };

    const fetchPayment = async () => {
      try {
        const orderResponse = await fetch(`${API_URL}/api/order/table/` + table_id);
        if (!orderResponse.ok) throw new Error(`Error: ${orderResponse.status}`);
        const order = await orderResponse.json(); //  order[0].order_id
        
        const paymentResponse = await fetch(`${API_URL}/api/payment/order/` + order.find((o) => o.order_status == 0).order_id);
        if (!paymentResponse.ok) throw new Error(`Error: ${paymentResponse.status}`);
        const payments = await paymentResponse.json();

        setPayment(payments.filter((p) => p.payment_status != "Complete"))
        // setPayment(payments)
        
        // setTables(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch tables.", "error");
      }
    };

    fetchTables();
    
  }, []);

  const confirmPayment = async () => {
    try {
      const paymentResponse = await fetch(`${API_URL}/api/payment/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           payment_id: payment[0].payment_id,
           payment_status: 2 
        }),
      });

      const tableResponse = await fetch(`${API_URL}/api/table/status/` + table_id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           table_status: 0 
        }),
      });

      const orderResponse = await fetch(`${API_URL}/api/order/table/` + table_id);
      if (!orderResponse.ok) throw new Error(`Error: ${orderResponse.status}`);
      const order = await orderResponse.json(); //  order[0].order_id

      const updateOrderResponse = await fetch(`${API_URL}/api/order/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           order_id: order[0].order_id,
           order_status: 1 
        }),
      });

      Swal.fire({
        title: "สำเร็จ!",
        text: "ยืนยันชำระเงินสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
      navigate('/employee/table/list')
    } catch (error) {
      // Swal.fire("Error", "Failed to update table status.", "error");
    }
  }

  return (
    <div className='admin-container'>
        <div class="order-summary-container">
            <div class="order-summary-header">
                <div className="operator-item" style={{position: 'absolute', bottom: '18px'}} onClick={() => navigate("/employee/table/list")}>
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <h1 class="order-summary-title">รายการอาหาร โต๊ะ {table.table_number}</h1>
                <button class="add-more-button" onClick={() => navigate('/order/list?table_id=' + table_id)}>สั่งอาหารเพิ่มเติม</button>
            </div>

            <div class="order-summary-list">
                {
                  order.map((order) => (
                      <div class="order-summary-item" key={order.order_detail_id}>

                      <img class="item-image" src={API_URL + order.menu_pic} alt={order.menu_pic} />
                    
                        <div class="item-details">
                            <div class="item-name">{order.menu_name} X {order.order_detail_quantity}</div>
                            <div class="item-description">
                            {
                                Object.entries(order.order_detail_menu_se)
                                .filter(([key, value]) => value != "" || value?.length != 0)
                                .map(([key, value]) => Array.isArray(value) ? value : [value])
                                .reduce((acc, curr) => acc.concat(curr), [])
                                .join(", ")
                            }
                            </div>
                            <button class="edit-button" onClick={() => navigate(`/order/edit/${order.order_detail_id}?table_id=${table_id}&menu_id=${order.menu_id}`)}>แก้ไข</button>
                        </div>
                    
                        <div class="item-price">
                            <span>฿{order.order_detail_price * order.order_detail_quantity}</span>
                        </div>

                      </div>
                  ))
                }
            </div>

            <div class="order-total">
                <span class="total-text">ทั้งหมด</span>
                <span class="total-price">฿{totalPrice}</span>
            </div>

            <div class="confirm-order">
              {
                payment.length == 0 && (
                  <button class="confirm-button">รอการชำระเงิน</button>
                )
              }
              {
                payment.length > 0 && (
                  <button class="confirm-button" onClick={() => confirmPayment()}>ยืนยันการชำระเงิน</button>
                )
              }
            </div>
        </div>

    </div>
  );
}

export default EmployeeOrder;

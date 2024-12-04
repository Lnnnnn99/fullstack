import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function EmployeeOrder() {
  const navigate = useNavigate();
  const { table_id } = useParams();

  const [tables, setTables] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const orderResponse = await fetch(`${API_URL}/api/order/table/` + table_id);
        if (!orderResponse.ok) throw new Error(`Error: ${orderResponse.status}`);
        const order = await orderResponse.json();
        
        const orderDetailResponse = await fetch(`${API_URL}/api/order_detail/` + order[0].order_id);
        if (!orderDetailResponse.ok) throw new Error(`Error: ${orderDetailResponse.status}`);
        const orderDetail = await orderDetailResponse.json();

        setTotalPrice(
          orderDetail.reduce((a, v) => a + (v.order_detail_quantity * v.order_detail_price), 0)
        )

        setOrder(orderDetail)
        // setTables(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch tables.", "error");
      }
    };

    fetchTables();
  }, []);

  const updateTableStatus = async (table_id, table_number, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/table/${table_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_number:table_number, table_status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      setTables((prev) =>
        prev.map((table) =>
          table.table_id === table_id
            ? { ...table, table_status: newStatus }
            : table
        )
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update table status.", "error");
    }
  };

  return (
    <div className='admin-container'>
        <div class="order-summary-container">

            <div class="order-summary-header">
                <div className="operator-item" style={{position: 'absolute', bottom: '18px'}} onClick={() => navigate("/employee/table/list")}>
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <h1 class="order-summary-title">รายการอาหาร</h1>
                <button class="add-more-button" onClick={() => navigate('/order/list?table_id=' + table_id)}>สั่งอาหารเพิ่มเติม</button>
            </div>

            <div class="order-summary-list">
                {
                  order.map((order) => (
                      <div class="order-summary-item" key={order.order_detail_id}>

                      <img class="item-image" src={"/images/" + order.menu_pic} alt={order.menu_pic} />
                    
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
                <button class="confirm-button">ยืนยันการชำระเงิน</button>
            </div>
        </div>

    </div>
  );
}

export default EmployeeOrder;

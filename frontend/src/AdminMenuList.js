import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function AdminMenuList() {

  const navigator = useNavigate()

	const [menus, setMenus] = useState([])

	useEffect(() => {
		const fetchMenus = async () => {
      try{
        const response = await fetch(API_URL + "/api/menus")
        
        if (!response.ok) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: `ไม่สามารถโหลดข้อมูลได้ (Error: ${response.status})`,
            icon: "error",
            confirmButtonText: "ตกลง"
          }).then(() => {
            navigator('/admin/menu/')
          });
          return;
        }
  
        const data = await response.json()
        setMenus(data)
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
          icon: "error",
          confirmButtonText: "ตกลง"
        }).then(() => {
					navigator('/admin/menu/')
        });
      }
    }

		fetchMenus()
	}, [])

  // ฟังก์ชันสำหรับลบเมนู
  const deleteMenu = async (menu_id) => {
    try {
      const response = await fetch(`${API_URL}/api/menu`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menu_id }), // ส่ง menu_id ใน body
      });

      if (!response.ok) {
        throw new Error(`Failed to delete menu (Error: ${response.status})`);
      }

      const result = await response.json();
      Swal.fire({
        title: "สำเร็จ!",
        text: "ลบเมนูเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      // อัปเดตข้อมูลเมนูหลังลบ
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.menu_id !== menu_id));
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className='admin-container'>
      <header className="admin-header">
        <div className="admin-header-left">
          <button className="header-button" onClick={() => navigator('/admin/menu')}>Menu</button>
        </div>
        <h1 className="admin-header-title"> Management</h1>
        <div className="admin-header-right">
          <span className="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="content-header">Food Menu</h2>
        <div className="food-list">
          <div class="food-category">Appetizers</div>
          {
            menus.map((menu) => (
              <div className="food-item" key={menu.menu_id}>
                <img 
                  src="https://via.placeholder.com/100" 
                  alt={"Food Image" + menu.menu_id}
                  className="food-image"
                  onClick={() => navigator('/admin/menu/edit/' + menu.menu_id)}
                  />
                <div className="food-details">
                  <h3 className="food-name">{menu.menu_name}</h3>
                  <p className="food-price">฿{menu.menu_price}</p>
                </div>
                <div className="food-checkbox">
                  <input type="checkbox" id="food-1" />
                </div>
              </div>
            ))
          }

        </div>

      </main>
        
      <footer className="admin-footer">
        <button class="footer-button" onClick={() => navigator('/admin/menu/add')}>Add menu</button>
      </footer>

    </div>
  )
}

export default AdminMenuList;

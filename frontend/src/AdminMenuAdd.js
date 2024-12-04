import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function AdminMenuAdd() {

  const navigator = useNavigate()

  const [formData, setFormData] = useState({
    menuName: "",
    price: "",
    type: "",
    image: null,
    description: "",
    status: "1",
    sold: 0,
    options: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Preparing data
    const formDataBody = new FormData();
    formDataBody.append("menu_name", formData.menuName);
    formDataBody.append("menu_type", formData.type);
    formDataBody.append("menu_price", formData.price);
    formDataBody.append("menu_pic", formData.image); // Assuming it's a file input
    formDataBody.append("menu_description", formData.description);
    formDataBody.append("menu_status", formData.status);
    formDataBody.append("menu_sales", formData.sold);
    formDataBody.append("menu_se", formData.options);
  
    try {
      const response = await fetch(API_URL + "/api/menu", {
        method: "POST",
        body: formDataBody,
      });
  
      if (!response.ok) {
        throw new Error(response);
      }
  
      const result = await response.json();
      console.log("Menu inserted successfully:", result);
      alert("Menu added successfully!");
    } catch (error) {
      console.error("Error inserting menu:", error);
      alert("Error: " + error.message);
    } 

    navigator("/admin/menu/list");
  };

  return (
    <div className='admin-container'>
      <header className="admin-header">
        <div class="admin-header-left">
          <button class="header-button" onClick={() => navigator('/admin/menu/list')}>Back</button>
        </div>
        <h1 class="admin-header-title">Table Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">

        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Row 1: ชื่อเมนูอาหาร, ราคา, ชนิด */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="menuName">ชื่อเมนูอาหาร</label>
              <input type="text" id="menuName" name="menuName" placeholder="กรอกชื่อเมนู" value={formData.menuName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">ราคา</label>
              <input type="number" id="price" name="price" placeholder="กรอกราคา" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="type">ชนิด</label>
              <input type="text" id="type" name="type" placeholder="กรอกชนิด" value={formData.type} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2: รูปภาพ */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="image">รูปภาพ</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleChange}/>
            </div>
          </div>

          {/* Row 3: คำอธิบาย */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">คำอธิบาย</label>
              <textarea id="description" name="description" rows="4" placeholder="กรอกคำอธิบาย" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Row 4: สถานะเมนู, จำนวนที่ขายไป */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">สถานะเมนู</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="1">วางขาย</option>
                <option value="0">หมด</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sold">จำนวนที่ขายไปทั้งหมด</label>
              <input type="number" id="sold" name="sold" placeholder="กรอกจำนวน" value={formData.sold} onChange={handleChange}/>
            </div>
          </div>

          {/* Row 6: ตัวเลือกเสริม */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="options">ตัวเลือกเสริม</label>
              <textarea
                id="options"
                name="options"
                rows="3"
                placeholder="เช่น { 'size': 'large', 'spicy': true }"
                value={formData.options} 
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-row">
            <button type="submit" className="form-submit">บันทึกข้อมูล</button>
          </div>
        </form>

      </main>

    </div>
  );
}

export default AdminMenuAdd;

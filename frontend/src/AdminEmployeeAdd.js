import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Admin.css";

const API_URL = process.env.REACT_APP_API_URL;

function AdminEmployeeAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_username: "",
    employee_password: "",
    employee_status: 1,
    employee_role: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add employee");
      Swal.fire("Success", "Employee added successfully", "success").then(() =>
        navigate("/admin/employee/list")
      );
    } catch (error) {
      Swal.fire("Error", "Failed to add employee", "error");
    }
  };

  return (
    <div className='admin-container'>
      <header className="admin-header">
        <div class="admin-header-left">
          <button class="header-button" onClick={() => navigate('/admin/employee/list')}>Back</button>
        </div>
        <h1 class="admin-header-title">Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>


      <main className="admin-content">
        <h2 className="content-header">Add Employee</h2>
        <form className="admin-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employee_name">Name</label>
              <input type="text" id="employee_name" name="employee_name" placeholder="Name" value={formData.employee_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employee_username">Username</label>
              <input type="text" id="employee_username" name="employee_username" placeholder="Username" value={formData.employee_username} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employee_password">Password</label>
              <input type="password" id="employee_password" name="employee_password" placeholder="Password" value={formData.employee_password} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employee_status">Status</label>
              <select id="employee_status" name="employee_status" value={formData.employee_status} onChange={handleChange}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>            
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employee_role">Role</label>
              <select id="employee_role" name="employee_role" value={formData.employee_role} onChange={handleChange}>
                <option value={0}>Admin</option>
                <option value={1}>Employee</option>
                <option value={2}>Chef</option>
              </select>            
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

export default AdminEmployeeAdd;

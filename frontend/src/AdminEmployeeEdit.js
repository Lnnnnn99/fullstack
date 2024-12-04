import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Admin.css";

const API_URL = process.env.REACT_APP_API_URL;

function AdminEmployeeEdit() {
  const navigate = useNavigate();
  const { employee_id } = useParams();
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_username: "",
    employee_status: 1,
    employee_role: 1,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${API_URL}/api/employee/${employee_id}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch employee data.", "error");
      }
    };

    fetchEmployee();
  }, [employee_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/employee/${employee_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update employee");
      Swal.fire("Success", "Employee updated successfully.", "success").then(() =>
        navigate("/admin/employee/list")
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update employee.", "error");
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
      <h2 className="content-header">Edit Employee</h2>
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

      <footer class="admin-footer">
      </footer>
    </div>
  );
}

export default AdminEmployeeEdit;

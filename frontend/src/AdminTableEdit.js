import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Admin.css";

const API_URL = process.env.REACT_APP_API_URL;

function AdminTableEdit() {
  const navigate = useNavigate();
  const { table_id } = useParams();
  const [formData, setFormData] = useState({
    table_id: table_id,
    table_number: "",
    table_status: 1,
  });

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await fetch(`${API_URL}/api/table/${table_id}`);
        if (!response.ok) throw new Error("Failed to fetch table data");
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch table data.", "error");
      }
    };

    fetchTable();
  }, [table_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkTableNumber = async (table_number, table_id = null) => {
    try {
        const response = await fetch(`${API_URL}/api/tables`);
        if (!response.ok) throw new Error("Failed to fetch tables");
    
        const tables = await response.json();
        // return tables.some((table) => table.table_number === table_number && table.table_id !== table_id);
        return tables.some(
            (table) => table.table_number === table_number && table.table_id !== table_id
        );
    } catch (error) {
        console.error("Error checking table number:", error);
        return false; // ถ้ามีปัญหาในการเช็ค ให้ถือว่าไม่ซ้ำ (เพื่อไม่ให้การทำงานล้มเหลว)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const isDuplicate = await checkTableNumber(parseInt(formData.table_number), formData.table_id);
        if (isDuplicate) {
            Swal.fire("Error", "Table number already exists.", "error");
            return;
        }

        const response = await fetch(`${API_URL}/api/table/${table_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update table");
        Swal.fire("Success", "Table updated successfully.", "success").then(() =>
            navigate("/admin/table/list")
        );
    } catch (error) {
      Swal.fire("Error", "Failed to update table.", "error");
    }
  };

  return (
    <div className='admin-container'>
      <header className="admin-header">
        <div class="admin-header-left">
          <button class="header-button" onClick={() => navigate('/admin/table/list')}>Back</button>
        </div>
        <h1 class="admin-header-title">Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
      <h2 className="content-header">Edit Table</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="table_number">หมายเลขโต๊ะ</label>
              <input type="text" id="table_number" name="table_number" placeholder="หมายเลขโต๊ะ" value={formData.table_number} onChange={handleChange} required />
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

export default AdminTableEdit;

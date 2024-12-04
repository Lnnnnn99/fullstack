import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function EmployeeTableList() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tables`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setTables(data);
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
      <header className="admin-header">
        <div class="admin-header-left">
          {/* <button class="header-button" onClick={() => navigate('/admin/menu')}>Menu</button> */}
        </div>
        <h1 class="admin-header-title">Table Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
        <div className="status-legend">
          <span className="status-item">
            <span className="status-icon available"></span> โต๊ะว่าง
          </span>
          <span className="status-item">
            <span className="status-icon unavailable"></span> โต๊ะไม่ว่าง
          </span>
        </div>
        <div className="table-grid">
          {/* <div className="table-card available">โต๊ะ 1</div>
          <div className="table-card unavailable">โต๊ะ 2</div>
          <div className="table-card available">โต๊ะ 3</div>
          <div className="table-card unavailable">โต๊ะ 4</div>
          <div className="table-card available">โต๊ะ 5</div> */}
          {
            tables.map((table) => (
              <div>
                <div className="table-card available" onClick={() => navigate('/employee/order/' + table.table_id)}>โต๊ะ {table.table_number}</div>
              </div>              
            ))
          }
        </div>
      </main>
    </div>
  );
}

export default EmployeeTableList;

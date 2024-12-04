import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './Admin.css';

const API_URL = process.env.REACT_APP_API_URL;

function AdminTableList() {
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

  const updateTableStatus = async (table_id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/table/status/${table_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table_status: newStatus }),
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

  // ฟังก์ชันสำหรับลบเมนู
  const deleteMenu = async (table_id) => {
    try {
      const response = await fetch(`${API_URL}/api/table/${table_id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Failed to delete menu (Error: ${response.status})`);
      }

      Swal.fire({
        title: "สำเร็จ!",
        text: "ลบโต๊ะเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      // อัปเดตข้อมูลเมนูหลังลบ
      setTables((prevTable) => prevTable.filter((table) => table.table_id !== table_id));
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
        <div class="admin-header-left">
          <button class="header-button" onClick={() => navigate('/admin/menu')}>Menu</button>
        </div>
        <h1 class="admin-header-title">Table Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="content-header">Table</h2>

        <div className="table-grid">
          {
              tables.map((table) => (
                <div>
                  <div className="table-card available" onClick={() => navigate('/admin/table/edit/' + table.table_id)}>โต๊ะ {table.table_number}</div>

                  <div className="table-info">
                    <div className="table-message">
                      {table.status === 1 ? "สถานะ: ว่าง" : "สถานะ: ไม่ว่าง"}
                    </div>
                    <div className="table-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={table.table_status == 1}
                          onChange={() =>
                            updateTableStatus(table.table_id, table.table_status == 1 ? 0 : 1)
                          }
                        />
                        เปลี่ยนสถานะ
                      </label>
                    </div>
                  </div>
                </div>              
              ))
            }
        </div>
      </main>
      <footer class="admin-footer">
        <button class="footer-button" onClick={() => navigate('/admin/table/add')}>Add Table</button>
      </footer>
    </div>
  );
}

export default AdminTableList;

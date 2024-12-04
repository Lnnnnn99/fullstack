import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Admin.css";

const API_URL = process.env.REACT_APP_API_URL;

function AdminEmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_URL}/api/employees`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch employees", "error");
      }
    };

    fetchEmployees();
  }, []);

  const deleteEmployee = async (employee_id) => {
    try {
      const response = await fetch(`${API_URL}/api/employee/${employee_id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) =>
        prev.filter((employee) => employee.employee_id !== employee_id)
      );
      Swal.fire("Success", "Employee deleted successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete employee", "error");
    }
  };

  const updateEmployeeStatus = async (employee_id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/employee/status/${employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.employee_id === employee_id
            ? { ...employee, employee_status: newStatus }
            : employee
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
          <button class="header-button" onClick={() => navigate('/admin/menu')}>Menu</button>
        </div>
        <h1 class="admin-header-title">Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="content-header">Employee</h2>

        <div className="table-grid table-grid-row">
          {
            employees.map((employee) => (
              <div>
                <div className="table-card table-card-row available" onClick={() => navigate('/admin/employee/edit/' + employee.employee_id)}>
                  <i class="fa-regular fa-circle-user"></i>
                </div>

                <div className="table-info">
                  <div className="table-message">
                    {employee.employee_name}
                  </div>
                  <div className="table-checkbox">
                    <label>
                      <i 
                        className={`fa-solid ${employee.employee_status === 1 ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={() => updateEmployeeStatus(employee.employee_id, employee.employee_status == 1 ? 0 : 1)}
                        style={{ cursor: 'pointer' }}
                      ></i>
                        
                    </label>
                  </div>
                </div>
              </div>       
            ))
          }
        </div>

      </main>

      <footer class="admin-footer">
        <button class="footer-button" onClick={() => navigate("/admin/employee/add")}>Add Employee</button>
      </footer>
    </div>
  );
}

export default AdminEmployeeList;

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
        <h1 class="admin-header-title">Table Management</h1>
        <div class="admin-header-right">
          <span class="admin-header-user">Hello, Admin</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="content-header">Table</h2>

        <div className="table-grid">
          {
            employees.map((employee) => (
              <div>
                <div className="table-card available" onClick={() => navigate('/admin/employee/edit/' + employee.employee_id)}></div>

                <div className="table-info">
                  <div className="table-message">
                    {employee.employee_name}
                  </div>
                  <div className="table-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        
                      />
                    </label>
                  </div>
                </div>
              </div>       
            ))
          }
        </div>

        {/* <table>
          <tbody>
            {
              employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={employee.employee_status === 1}
                      onChange={() =>
                        updateEmployeeStatus(employee.employee_id, employee.employee_status === 1 ? 0 : 1)
                      }
                    />
                  </td>
                  <td>
                    {employee.employee_role === 0
                      ? "Admin"
                      : employee.employee_role === 1
                      ? "Employee"
                      : "Chef"}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/employee/edit/${employee.employee_id}`)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteEmployee(employee.employee_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table> */}

      </main>

      <footer class="admin-footer">
        <button class="footer-button" onClick={() => navigate("/admin/employee/add")}>Add Employee</button>

        <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminEmployeeList;

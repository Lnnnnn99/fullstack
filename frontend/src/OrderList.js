import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";

import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function OrderList() {
  const navigator = useNavigate()

  const [menus, setMenus] = useState(null)
  const [filterMenu, setFilterMenu] = useState([])
  const [types, setTypes] = useState([{'menu_type': 'All'}])
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')

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
            navigator('/order/list/')
          });
          return;
        }
  
        const data = await response.json()
        setMenus(data)
        setFilterMenu(data)
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
          icon: "error",
          confirmButtonText: "ตกลง"
        }).then(() => {
          navigator("/order/list");
        });
      }
    }
  
    const fetchTypes = async () => {
      try{
        const response = await fetch(API_URL + "/api/types")
      
        if (!response.ok) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: `ไม่สามารถโหลดข้อมูลได้ (Error: ${response.status})`,
            icon: "error",
            confirmButtonText: "ตกลง"
          }).then(() => {
            navigator('/order/list/')
          });
          return;
        }
  
        const data = await response.json()
        setTypes([{'menu_type': 'All'}, ...data])
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
          icon: "error",
          confirmButtonText: "ตกลง"
        }).then(() => {
          navigator("/order/list");
        });
      }
  
    }
    
    fetchMenus()
    fetchTypes()
  }, [])


  function updateFilterMenu(type){
    if(type === "All"){
      setFilterMenu(menus
        .filter((menu) => menu.menu_name.toLowerCase().includes(search.toLowerCase()))
      )
    }
    else
    {
      setFilterMenu(menus
        .filter((menu) => menu.menu_type === type)
        .filter((menu) => menu.menu_name.toLowerCase().includes(search.toLowerCase()))
      )
    }
    setSelectedType(type)
  }

  function searchMenu(search){
    if(selectedType === 'All'){
      setFilterMenu(menus
        .filter((menu) => menu.menu_name.toLowerCase().includes(search.toLowerCase()))
      )
    }else{
      setFilterMenu(menus
        .filter((menu) => menu.menu_type === selectedType)
        .filter((menu) => menu.menu_name.toLowerCase().includes(search.toLowerCase()))
      )
    }
    setSearch(search)
  }

  function clickAddOrder(menu_id){
    navigator('/order/add/' + menu_id)
  }

  return (
    <div className='container'>
      <header className='header'>
        <div className="header-left">
          <h1>ก๋วยเตี๋ยวขาหมูกรุงศรีอยุธยา</h1>
        </div>
        <div className="header-center">
          <input 
            type='text'
            className='search-box'
            placeholder="Search menu..."
            value={search}
            onChange={(e) => searchMenu(e.target.value)}
          />
        </div>
        <div className="header-right">
          <i class="fa-solid fa-cart-shopping" onClick={() => navigator('/order/summary')}></i>
        </div>
      </header>

      <div className='filter-bar'>
        {
          types.map((type) => (
            <button 
              key={type.menu_type}
              className={`filter-btn ${
                type.menu_type === selectedType ? "active" : ""
              }`} 
              onClick={() => updateFilterMenu(type.menu_type)}>
              {type.menu_type}
            </button>
          ))
        }
      </div>

      <div className='menu-grid'>
        {
          filterMenu.map((menu) => (
            <div className="menu-item" key={menu.menu_id} onClick={() => clickAddOrder(menu.menu_id)}>
              <img className='menu-item-image' src={"/images/" + menu.menu_pic} alt={menu.menu_pic}/>
              <span className='menu-item-name'>{menu.menu_name}</span>
              <span className='menu-item-price'>{menu.menu_price}</span>
            </div>
          ))
        }
      </div>
      
    </div>
  );
}

export default OrderList;

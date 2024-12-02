import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';

import Swal from "sweetalert2";

import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function OrderEdit() {
  const navigator = useNavigate()
  const { menu_sequence } = useParams()
  const { orders, updateOrder } = useContext(OrderContext)

  const [ menu, setMenu ] = useState({})
  const [ options, setOptions ] = useState([])
  const [ quantity, setQuantity ] = useState(1);
  const [formState, setFormState] = useState({});
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try{
        const _menu = orders.find((o) => o.menu_sequence = menu_sequence)
        const response = await fetch(API_URL + '/api/menu/' + _menu.menu_id)
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
        setMenu(data[0])
        
        const optionsData = data[0].menu_se
        setOptions(optionsData)
  
        const existingOrder = orders.find((order) => order.menu_sequence === menu_sequence);
    
        if (existingOrder) {
          const defaultForm = {};
          for (const [key, value] of Object.entries(existingOrder.menu_se)) {
            defaultForm[key] = value
          }
    
          setFormState(defaultForm);
          setQuantity(existingOrder.menu_quantity);
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่พบเมนูอาหาร",
            icon: "error",
            confirmButtonText: "ตกลง"
          }).then(() => {
            navigator("/order/list");
          });
        }
      } catch (err) {
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

    fetchMenu()
  }, [])

  function calculatePrice(menuPrice, formState, options) {
    let price = parseFloat(menuPrice); // แปลงราคาหลักเป็น float
  
    Object.entries(formState).forEach(([key, values]) => {
      if (values?.length > 0 && Array.isArray(values)) {
        const matchedOption = options.find((o) => o.id === key); // หาตัวเลือกที่ตรงกับ key
        if (matchedOption) {
          values.forEach((value) => {
            const matchedChoice = matchedOption.choices.find((c) => c.value === value);
            if (matchedChoice) {
              price += parseFloat(matchedChoice.price); // เพิ่มราคาของตัวเลือก
            }
          });
        }
      }
    });
  
    return price; // คืนค่าราคาที่คำนวณแล้ว
  }
  
  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleQuantityChange = (delta) => {
    const next_quantity = quantity + delta
    if(next_quantity <= 0){
      setQuantity(0)
    }else{
      setQuantity(next_quantity)
    }
  };

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    setFormState((prevState) => {
      if (type === "radio") {
        return { ...prevState, [name]: [value] };
      } else if (type === "checkbox") {
        const currentValues = prevState[name] || [];
        if (checked) {
          return { ...prevState, [name]: [...currentValues, value] };
        } else {
          return { ...prevState, [name]: currentValues.filter((v) => v !== value )};
        }
      } else if (type === "text") {
        return { ...prevState, [name]: value };
      }
      return prevState;
    });
  };

  function confirmButton(){
    Swal.fire({
      title: "ต้องการลบรายการออกจากตะกร้าใช่หรือไหม",
      showCancelButton: true,
      confirmButtonText: "ลบรายการ",
      cancelButtonText: `ยกเลิก`
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrder({
          'menu_sequence': menu_sequence,
          'menu_id': menu.menu_id,
          'menu_name': menu.menu_name,
          'menu_price': calculatePrice(menu.menu_price, formState, options),
          'menu_quantity': quantity,
          'menu_pic': menu.menu_pic,
          'menu_se': formState,
        })
        navigator('/order/list')
      }
    });
  }

  return (
    <div className='menu-detail-container'>
      <div className="menu-operator">
        <div className="operator-item" onClick={() => navigator("/order/list")}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
      </div>
      
      <div className="menu-header">
        <img className="menu-header-image" src={"/images/" + menu.menu_pic} alt={menu.menu_pic} />
        <h1 className="menu-header-name">{menu.menu_name}</h1>
      </div>

      <div className="menu-categories">
        {options.map((option) => (
          <div className="menu-category" key={option.id}>
            <div className="menu-category-header" onClick={() => toggleCategory(option.id)}>
              <div className="menu-category-header-text">{option.label}</div>
              <button className="toggle-button">{openCategories[option.id] ? "+" : "-"}</button>
            </div>

            {/* Radio */}
            <div className={`menu-category-body ${
                  openCategories[option.id] ? "hidden" : "visible"
                }`}>

                {option.type === "radio" &&
                  option.choices.map((choice) => (
                    <label className="menu-option" key={choice.value}>
                      <input
                        type="radio"
                        name={option.id}
                        value={choice.value}
                        checked={formState[option.id]?.[0] === choice.value}
                        onChange={handleOnChange}
                      />
                      {choice.label} <span className="menu-option-price">฿{choice.price}</span>
                    </label>
                  ))}


                {/* Multi selcet */}
                {option.type === "multi-select" &&
                option.choices.map((choice) => (
                  <label className="menu-option" key={choice.value}>
                    <input
                      type="checkbox"
                      name={option.id}
                      value={choice.value}
                      checked={formState[option.id]?.includes(choice.value)}
                      onChange={handleOnChange}
                    />
                    
                    <span className="menu-option-name">{choice.label} </span>
                    <span className="menu-option-price">฿{choice.price}</span>
                  </label>
                ))}


                {/* Text */}
                {option.type === "text" && (
                      <input
                        type="text"
                        className="menu-text" 
                        placeholder="เพิ่มรายละเอียดเพิ่มเติม..."
                        name={option.id}
                        value={formState[option.id] || ""}
                        onChange={handleOnChange}
                      />
                )}
              </div>
          </div>
        ))}
      </div>


      <div className="menu-quantity">
        <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
        <span className="quantity-number">{quantity}</span>
        <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
      </div>

      <div className="menu-actions">
        <button className="cancel-btn" onClick={() => navigator('/order/list')}>ยกเลิก</button>
        <button className="confirm-btn" onClick={confirmButton}>{quantity > 0 ? 'ยืนยัน' : 'ลบ' }</button>
      </div>

    </div>
  )
}

export default OrderEdit;

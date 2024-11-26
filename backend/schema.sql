CREATE DATABASE IF NOT EXISTS sample_database_3;

USE sample_database_3;

--
-- Table structure for table tab_employee
--

CREATE TABLE IF NOT EXISTS tab_employee (
  employee_id int NOT NULL AUTO_INCREMENT,
  employee_name varchar(255) NOT NULL,
  employee_status tinyint(1) DEFAULT NULL,
  employee_username varchar(100) NOT NULL,
  employee_password varchar(255) NOT NULL,
  employee_role tinyint(1) NOT NULL,
  PRIMARY KEY (employee_id,employee_username)
);

--
-- Table structure for table tab_menu
--

CREATE TABLE IF NOT EXISTS tab_menu (
  menu_id int NOT NULL AUTO_INCREMENT,
  menu_name varchar(50) NOT NULL,
  menu_type varchar(20) DEFAULT NULL,
  menu_price decimal(10,2) NOT NULL,
  menu_pic varchar(255) NOT NULL,
  menu_description longtext,
  menu_status tinyint(1) NOT NULL,
  menu_sales int NOT NULL,
  menu_se json NOT NULL,
  PRIMARY KEY (menu_id)
);

--
-- Table structure for table tab_table
--

CREATE TABLE IF NOT EXISTS tab_table (
  table_id int NOT NULL AUTO_INCREMENT,
  table_number int DEFAULT NULL,
  table_status tinyint(1) NOT NULL,
  PRIMARY KEY (table_id)
);

--
-- Table structure for table tab_order
--

CREATE TABLE IF NOT EXISTS tab_order (
  order_id int NOT NULL AUTO_INCREMENT,
  table_id int NOT NULL,
  order_status varchar(20) DEFAULT NULL,
  order_total_price decimal(10,2) NOT NULL,
  order_payment_type varchar(20) DEFAULT NULL,
  PRIMARY KEY (order_id),
  KEY table_number_idx (table_id),
  CONSTRAINT table_id FOREIGN KEY (table_id) REFERENCES tab_table (table_id)
);

--
-- Table structure for table tab_order_detail
--

CREATE TABLE IF NOT EXISTS tab_order_detail (
  order_detail_id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL,
  menu_id int NOT NULL,
  order_detail_menu_se json DEFAULT NULL,
  order_detail_quantity int NOT NULL,
  order_detail_price decimal(10,2) DEFAULT NULL,
  order_detail_substatus tinyint(1) NOT NULL,
  PRIMARY KEY (order_detail_id),
  KEY order_id (order_id),
  KEY menu_id (menu_id),
  CONSTRAINT tab_order_detail_ibfk_1 FOREIGN KEY (order_id) REFERENCES tab_order (order_id),
  CONSTRAINT tab_order_detail_ibfk_2 FOREIGN KEY (menu_id) REFERENCES tab_menu (menu_id)
);

--
-- Table structure for table tab_payment
--

CREATE TABLE IF NOT EXISTS tab_payment (
  payment_id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL,
  payment_method varchar(50) NOT NULL,
  payment_status enum('Pending','Complete') NOT NULL,
  payment_amount decimal(10,2) NOT NULL,
  payment_currency varchar(3) NOT NULL,
  PRIMARY KEY (payment_id),
  KEY order_id_idx (order_id),
  CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES tab_order (order_id)
);


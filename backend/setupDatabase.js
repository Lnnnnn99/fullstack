const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const setupDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      port: process.env.DB_PORT || 3000,
    });

    console.log('Connected to MySQL');

    // ลบฐานข้อมูลเก่า
    const dbName = process.env.DB_NAME || 'test_db';
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    console.log(`Dropped database: ${dbName}`);

    // สร้างฐานข้อมูลใหม่
    await connection.query(`CREATE DATABASE \`${dbName}\``);
    console.log(`Created database: ${dbName}`);
    await connection.query(`USE \`${dbName}\``);

    // สร้าง Schema
    const schemaSQL = `
      CREATE TABLE tab_employee (
        employee_id int NOT NULL AUTO_INCREMENT,
        employee_name varchar(255) NOT NULL,
        employee_status tinyint(1) DEFAULT NULL,
        employee_username varchar(100) NOT NULL,
        employee_password varchar(255) NOT NULL,
        employee_role tinyint(1) NOT NULL,
        PRIMARY KEY (employee_id,employee_username)
      );


      CREATE TABLE tab_menu (
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

      CREATE TABLE tab_table (
        table_id int NOT NULL AUTO_INCREMENT,
        table_number int DEFAULT NULL,
        table_status tinyint(1) NOT NULL,
        PRIMARY KEY (table_id)
      );

      CREATE TABLE tab_order (
        order_id int NOT NULL AUTO_INCREMENT,
        table_id int NOT NULL,
        order_status varchar(20) DEFAULT NULL,
        order_total_price decimal(10,2) NOT NULL,
        order_payment_type varchar(20) DEFAULT NULL,
        PRIMARY KEY (order_id),
        KEY table_number_idx (table_id),
        CONSTRAINT table_id FOREIGN KEY (table_id) REFERENCES tab_table (table_id)
      );

      CREATE TABLE tab_order_detail (
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

      CREATE TABLE tab_payment (
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
    `;
    const schemaStatements = schemaSQL.split(';').filter(stmt => stmt.trim() !== '');
    for (const statement of schemaStatements) {
      await connection.query(statement);
    }
    console.log('Schema setup complete');

    // เพิ่มข้อมูลเริ่มต้น (Seed)
    const seedSQL = `
      INSERT INTO tab_menu (menu_name, menu_type, menu_price, menu_pic, menu_description, menu_status, menu_sales, menu_se)
      VALUES
          ('ก๋วยเตี๋ยวหมูตุ๋น', 'ก๋วยเตี๋ยว', 30, '/images/1733292782398-974446936.jpg', '', 1, 0, '[{"id":"noodles","type":"radio","label":"เส้น","choices":[{"label":"เส้นใหญ่","price":0,"value":"big"},{"label":"เส้นเล็ก","price":0,"value":"small"},{"label":"เส้นบะหมี่","price":0,"value":"noodle"},{"label":"วุ้นเส้น","price":0,"value":"vermicelli"},{"label":"มาม่า","price":0,"value":"mama"}]},{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id":"more","type":"text","label":"เพิ่มเติม"}]'),
          ('ก๋วยเตี๋ยวขาหมู', 'ก๋วยเตี๋ยว', 30, '/images/1733292788077-619452911.jpg', '', 1, 0, '[{"id":"noodles","type":"radio","label":"เส้น","choices":[{"label":"เส้นใหญ่","price":0,"value":"big"},{"label":"เส้นเล็ก","price":0,"value":"small"},{"label":"เส้นบะหมี่","price":0,"value":"noodle"},{"label":"วุ้นเส้น","price":0,"value":"vermicelli"},{"label":"มาม่า","price":0,"value":"mama"}]},{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id":"more","type":"text","label":"เพิ่มเติม"}]'),
          ('ก๋วยเตี๋ยวเย็นตาโฟ', 'ก๋วยเตี๋ยว', 30, '/images/1733292795348-487111581.jpg', '', 1, 0, '[{"id":"noodles","type":"radio","label":"เส้น","choices":[{"label":"เส้นใหญ่","price":0,"value":"big"},{"label":"เส้นเล็ก","price":0,"value":"small"},{"label":"เส้นบะหมี่","price":0,"value":"noodle"},{"label":"วุ้นเส้น","price":0,"value":"vermicelli"},{"label":"มาม่า","price":0,"value":"mama"}]},{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id":"more","type":"text","label":"เพิ่มเติม"}]'),
          ('ก๋วยเตี๋ยวต้มยำ', 'ก๋วยเตี๋ยว', 30, '/images/1733292802281-385308564.jpg', '', 1, 0, '[{"id":"noodles","type":"radio","label":"เส้น","choices":[{"label":"เส้นใหญ่","price":0,"value":"big"},{"label":"เส้นเล็ก","price":0,"value":"small"},{"label":"เส้นบะหมี่","price":0,"value":"noodle"},{"label":"วุ้นเส้น","price":0,"value":"vermicelli"},{"label":"มาม่า","price":0,"value":"mama"}]},{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id":"more","type":"text","label":"เพิ่มเติม"}]'),
          ('ก๋วยเตี๋ยวไก่', 'ก๋วยเตี๋ยว', 30, '/images/1733292810697-1673951.jpg', '', 1, 0, '[{"id":"noodles","type":"radio","label":"เส้น","choices":[{"label":"เส้นใหญ่","price":0,"value":"big"},{"label":"เส้นเล็ก","price":0,"value":"small"},{"label":"เส้นบะหมี่","price":0,"value":"noodle"},{"label":"วุ้นเส้น","price":0,"value":"vermicelli"},{"label":"มาม่า","price":0,"value":"mama"}]},{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id":"more","type":"text","label":"เพิ่มเติม"}]'),
          ('ข้าวขาหมู', 'ข้าว', 40, '/images/1733292817143-893864456.jpg', '', 1, 0, '[{"id":"size","type":"multi-select","label":"ขนาด","choices":[{"label":"พิเศษ","price":5,"value":"special"}]},{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('ข้าวเปล่า', 'ข้าว', 10, '/images/1733292837029-623493014.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('เกี๊ยวทอด', 'ของทานเล่น', 20, '/images/1733292854792-835798226.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('แคบหมู', 'ของทานเล่น', 15, '/images/1733292861087-862900923.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('น้ำเปล่า', 'เครื่องดื่ม', 10, '/images/1733292867112-976583475.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('โค้ก', 'เครื่องดื่ม', 15, '/images/1733292872975-620000329.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('แฟนต้า น้ำเขียว', 'เครื่องดื่ม', 15, '/images/1733292882501-247906966.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('แฟนต้า น้ำแดง', 'เครื่องดื่ม', 15, '/images/1733292889367-849798497.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('แฟนต้า น้ำส้ม', 'เครื่องดื่ม', 15, '/images/1733292896805-431313817.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('สไปร์ท', 'เครื่องดื่ม', 15, '/images/1733292905744-180066776.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('น้ำเก๊กฮวย', 'เครื่องดื่ม', 20, '/images/1733292912800-394563096.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('น้ำกระเจี๊ยบ', 'เครื่องดื่ม', 20, '/images/1733292918668-297624115.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]'),
          ('น้ำโอเลี้ยง', 'เครื่องดื่ม', 20, '/images/1733292924497-331817805.jpg', '', 1, 0, '[{"id": "more", "type": "text", "label": "เพิ่มเติม"}]');

      INSERT INTO tab_table (table_number, table_status)
      VALUES
          (1, 0),
          (2, 0),
          (3, 0),
          (4, 0),
          (5, 0),
          (6, 0),
          (99, 0);

      INSERT INTO tab_employee (employee_name, employee_status, employee_username, employee_password, employee_role)
      VALUES
          ('Admin', 1,  'admin@gmail.com', 'admin', 0),
          ('Employee 1', 1,  'employee01@gmail.com', 'employee01', 1),
          ('Employee 2', 1,  'employee02@gmail.com', 'employee02', 1),
          ('Chef 1', 1,  'chef01@gmail.com', 'chef01', 2),
          ('Chef 2', 1,  'chef02@gmail.com', 'chef02', 2);
          
    `;
    const seedStatements = seedSQL.split(';').filter(stmt => stmt.trim() !== '');
    for (const statement of seedStatements) {
      await connection.query(statement);
    }
    console.log('Seed data inserted');

    await connection.end();
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
};

setupDatabase();

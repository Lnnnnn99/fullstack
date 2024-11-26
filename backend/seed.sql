-- ใช้ฐานข้อมูล
USE sample_database_3;

-- เพิ่มข้อมูลตัวอย่างในตาราง `menu`
INSERT INTO tab_menu (menu_name, menu_type, menu_price, menu_pic, menu_description, menu_status, menu_sales, menu_se)
VALUES
    ("ก๋วยเตี๋ยวหมูตุ๋น", "ก๋วยเตี๋ยว", 30, "ก๋วยเตี๋ยวหมูตุ๋น.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ก๋วยเตี๋ยวขาหมู", "ก๋วยเตี๋ยว", 30, "ก๋วยเตี๋ยวขาหมู.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ก๋วยเตี๋ยวเย็นตาโฟ", "ก๋วยเตี๋ยว", 30, "ก๋วยเตี๋ยวเย็นตาโฟ.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ก๋วยเตี๋ยวต้มยำ", "ก๋วยเตี๋ยว", 30, "ก๋วยเตี๋ยวต้มยำ.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ก๋วยเตี๋ยวไก่", "ก๋วยเตี๋ยว", 30, "ก๋วยเตี๋ยวไก่.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ข้าวขาหมู", "ข้าว", 40, "ข้าวขาหมู.jpg", "", 1, 0, '[{"id":"noodles","label":"เส้น","type":"radio","choices":[{"value":"big","label":"เส้นใหญ่","price":0},{"value":"small","label":"เส้นเล็ก","price":0},{"value":"noodle","label":"เส้นบะหมี่","price":0},{"value":"vermicelli","label":"วุ้นเส้น","price":0},{"value":"mama","label":"มาม่า","price":0}]},{"id":"size","label":"ขนาด","type":"multi-select","choices":[{"value":"special","label":"พิเศษ","price":5}]},{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("ข้าวเปล่า", "ข้าว", 10, "ข้าวเปล่า.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("เกี๊ยวทอด", "ของทานเล่น", 20, "เกี๊ยวทอด.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("แคบหมู", "ของทานเล่น", 15, "แคบหมู.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("น้ำเปล่า", "เครื่องดื่ม", 10, "น้ำเปล่า.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("โค้ก", "เครื่องดื่ม", 15, "โค้ก.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("แฟนต้า น้ำเขียว", "เครื่องดื่ม", 15, "น้ำเขียว.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("แฟนต้า น้ำแดง", "เครื่องดื่ม", 15, "น้ำแดง.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("แฟนต้า น้ำส้ม", "เครื่องดื่ม", 15, "น้ำส้ม.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("สไปร์ท", "เครื่องดื่ม", 15, "สไปร์ท.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("น้ำเก๊กฮวย", "เครื่องดื่ม", 20, "น้ำเก๊กฮวย.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("น้ำกระเจี๊ยบ", "เครื่องดื่ม", 20, "น้ำกระเจี๊ยบ.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]'),
    ("น้ำโอเลี้ยง", "เครื่องดื่ม", 20, "น้ำโอเลี้ยง.jpg", "", 1, 0, '[{"id":"more","label":"เพิ่มเติม","type":"text"}]');


-- เพิ่มข้อมูลตัวอย่างในตาราง `table`
INSERT INTO tab_table (table_number, table_status)
VALUES
    (1, 0),
    (2, 0),
    (3, 0),
    (4, 0),
    (5, 0),
    (6, 0),
    (99, 0);

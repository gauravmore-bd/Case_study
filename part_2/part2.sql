-- Companies
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Warehouses
CREATE TABLE warehouses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  company_id INT,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  sku VARCHAR(50) UNIQUE NOT NULL,
  price DECIMAL(10, 2)
);

-- Inventory (Product in Warehouse)
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  warehouse_id INT,
  quantity INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

-- Inventory History
CREATE TABLE inventory_changes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT,
  `change` INT,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- Suppliers
CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  contact_email VARCHAR(100)
);

-- Product Suppliers (many-to-many)
CREATE TABLE product_suppliers (
  product_id INT,
  supplier_id INT,
  PRIMARY KEY (product_id, supplier_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Product Bundles
CREATE TABLE product_bundles (
  bundle_id INT,
  component_id INT,
  quantity INT DEFAULT 1,
  PRIMARY KEY (bundle_id, component_id),
  FOREIGN KEY (bundle_id) REFERENCES products(id),
  FOREIGN KEY (component_id) REFERENCES products(id)
);

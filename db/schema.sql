DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT,
	department_name VARCHAR(30) NOT NULL
);

CREATE TABLE ee_role (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL,
	department_id INT NOT NULL,
	FOREIGN KEY (department_id)
	REFERENCES department(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT,
	FOREIGN KEY (role_id)
	REFERENCES ee_role(id),
	manager_id INT,
	FOREIGN KEY (manager_id)
	REFERENCES employee(id)
	ON DELETE SET NULL
);

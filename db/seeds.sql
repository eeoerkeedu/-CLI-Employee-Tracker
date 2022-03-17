INSERT INTO department (id, department_name)
VALUES  (1, "Sales & Support"),
		(2, "Engineering & QA"),
		(3, "Legal");

INSERT INTO ee_role (id, title, salary, department_id)
VALUES  (1, "Sales Manager", 150000.00, 1),
		(2, "Salesperson", 80000.00, 1),
		(3, "Engineer", 100000.00, 2),
		(4, "QA Manager", 150000.00, 2),
		(5, "Junior Legal Team", 90000.00, 3),
		(6, "Legal Team Manager", 180000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 	(01, "Steve", "Rogers", 1, NULL),
		(02, "Tony", "Stark", 4, NULL),
		(03, "Natasha", "Romanov", 6, NULL),
		(04, "Bruce", "Banner", 5, 03),
		(05, "Thor", "Odinson", 2, 01),
		(06, "Peter", "Parker", 3, 02),
		(07, "Wanda", "Maximoff", 2, 01),
		(08, "Carol", "Danvers", 3, 02);
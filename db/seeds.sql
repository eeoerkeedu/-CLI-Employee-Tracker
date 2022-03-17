INSERT INTO department (id, department_name)
VALUES  (1, "Sales & Support"),
		(2, "Engineering & QA"),
		(3, "Legal"),

INSERT INTO ee_role (id, title, salary, department_id)
VALUES  (1, "Sales Manager", 150000.00, 1),
		(2, "Salesperson", 80000.00, 1),
		(3, "Engineer", 100000.00, 2),
		(4, "QA Manager", 150000.00, 2),
		(5, "Junior Legal Team", 90000.00, 3),
		(6, "Legal Team Manager", 180000.00, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES 	(Steve, Rogers, 1, NULL),
		(Tony, Stark, 4, NULL),
		(Natasha, Romanov, 6, NULL),
		(Bruce, Banner, 5, Natasha Romanov),
		(Thor, Odinson, 2, Steve Rogers),
		(Peter, Parker, 3, Tony Stark),
		(Wanda, Maximoff, 2, Steve Rogers),
		(Carol, Danvers, 3, Tony Stark)
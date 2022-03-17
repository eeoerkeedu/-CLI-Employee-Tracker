// establish dependancies
const logo = require("asciiart-logo");
const express = require("express");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const ct = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connecting to the database
const db = mysql2.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "loki",
		database: "employee_db",
	},
	console.log(`Connected to the employee database.`)
);

// application initiation questions
function menuPrompt() {
	// initial prompts for user to chose on app run
	inquirer
		.prompt({
			type: "list",
			message: "What would you like to do?",
			name: "choice",
			choices: [
				"VIEW All Employees",
				"VIEW All Roles",
				"VIEW All Departments",
				"ADD Department",
				"ADD Role",
				"ADD Employee",
				"UPDATE Employee Role",
			],
		})
		.then(function (val) {
			switch (val.choice) {
				case "VIEW All Employees":
					viewEEs();
					break;

				case "VIEW All Roles":
					viewRoles();
					break;

				case "VIEW All Departments":
					viewDepts();
					break;

				case "ADD Employee":
					addEE();
					break;

				case "ADD Department":
					addDept();
					break;

				case "ADD Role":
					addRole();
					break;

				case "UPDATE Employee Role":
					updateEE();
					break;
			}
		});
}

// funtion to display all EEs in a table format and print menu again
function viewEEs() {
	db.query(
		"SELECT employee.id, employee.first_name, employee.last_name, ee_role.title, ee_role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN ee_role on ee_role.id = employee.role_id INNER JOIN department on department.id = ee_role.department_id left join employee e on employee.manager_id = e.id;",
		function (err, res) {
			if (err) throw err;
			console.table(res);
			menuPrompt();
		}
	);
}

// funtion to display all organization Roles in a table format and print menu again
function viewRoles() {
	db.query(
		"SELECT ee_role.title, ee_role.id, department.department_name, ee_role.salary FROM ee_role INNER JOIN department on department.id = ee_role.department_id",
		function (err, res) {
			if (err) throw err;
			console.table(res);
			menuPrompt();
		}
	);
}

// funtion to display all organization Departments in a table format and print menu again
function viewDepts() {
	db.query(
		"SELECT department.department_name, department.id FROM department",
		function (err, res) {
			if (err) throw err;
			console.table(res);
			menuPrompt();
		}
	);
}

// insets a new value into the employee table based on user input
function addEE() {
	inquirer
		.prompt([
			{
				name: "firstName",
				type: "input",
				message: "Enter employee's first name ",
			},
			{
				name: "lastName",
				type: "input",
				message: "Enter employee's last name ",
			},
			{
				name: "role",
				type: "input",
				message: "What is the employee's role? ",
				default: 2,
			},
			{
				name: "manager",
				type: "input",
				message: "What is the employee's manager ID?",
				default: 1,
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO employee VALUES (default,
				"${answer.firstName}",
				"${answer.lastName}",
				"${answer.role}",
				"${answer.manager}")`
			);
			console.log(`Employee ${answer.firstName} ${answer.lastName} added`);
			menuPrompt();
		});
}

// insets a new value into the ee_role table based on user input
function addRole() {
	inquirer
		.prompt([
			{
				name: "newRole",
				type: "input",
				message: "Enter the role title you'd like to add",
			},
			{
				name: "roleSalary",
				type: "input",
				message: "Enter the salary for this role",
			},
			{
				name: "roleDept",
				type: "input",
				message: "Enter the department ID for this role.",
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO ee_role VALUES (default,
				"${answer.newRole}",
				"${answer.roleSalary}",
				"${answer.roleDept}")`,
				(err, res) => {
					console.log(`${answer.newRole} role added`);
					console.log(err);
					menuPrompt();
				}
			);
		});
}

// insets a new value into the department table based on user input
function addDept() {
	inquirer
		.prompt([
			{
				name: "newDept",
				type: "input",
				message: "Enter the name of the new department?",
			},
		])
		.then((answer) => {
			db.query(
				`INSERT INTO department VALUES (default, "${answer.newDept}");`,
				(err, res) => {
					console.log(`${answer.newDept} department added`);
					console.log(err);
					menuPrompt();
				}
			);
		});
}

// updates the employee role after user selects the ee name they want to cahnge
function updateEE() {
	let employeeList = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, ee_role.title FROM employee, ee_role WHERE ee_role.id = employee.role_id`;

	db.query(employeeList, (err, data) => {
		inquirer
			.prompt([
				{
					name: "eeName",
					type: "list",
					message: "Choose an employee to update",
					choices: data.map((ee) => ({ name: ee.first_name, value: ee.id })),
				},
				{
					name: "newRole",
					type: "input",
					message: "Enter the employee's new role",
				},
			])
			.then((answer) => {
				db.query(
					`UPDATE employee SET role_id = "${answer.newRole}" WHERE id = "${answer.eeName}"`,
					(err, result) => {
						console.log(err);
						menuPrompt();
					}
				);
			});
	});
}

// logo writer
function renderProjectLogo() {
	const config = require("./package.json");
	console.log(logo(config).render());
}

// makes logo and calls menu
function init() {
	renderProjectLogo();
	menuPrompt();
}

// runs init funtion on app start
init();

// creating port listen
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

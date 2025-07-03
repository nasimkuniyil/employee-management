type Role = "Manager" | "Developer" | "Designer";

class Employee{
    emp_name: string;
    emp_salary: number;
    emp_role: Role;

    constructor(emp_name: string, emp_salary: number, emp_role: Role){
        this.emp_name = emp_name;
        this.emp_salary = emp_salary;
        this.emp_role = emp_role;
    }

    getDetails(): string{
        return ` 👤 ${this.emp_name} ₹${this.emp_salary} | ${this.emp_role}`
    }

}

function isValidateRole(value: string): value is Role{
    return ["Manager", "Designer", "Developer"].includes(value);
}

const form = document.querySelector('#employeeForm') as HTMLFormElement || null;
let employees: Employee[] = [];

form.addEventListener('submit', (event:SubmitEvent):void=> {
    event.preventDefault();
    const nameInput = document.querySelector("#employeeName") as HTMLInputElement || null;
    const salaryInput = document.querySelector("#employeeSalary") as HTMLInputElement || null;
    const roleInput = document.querySelector("#employeeRole") as HTMLInputElement || null;

    //validate input values
    if(!nameInput.value || !salaryInput.value || !roleInput.value){
        console.log('fill all field');
        return
    }

    let name = nameInput.value.trim();
    let salary = parseInt(salaryInput.value);
    let role = roleInput.value;

    if(!name){
        console.log('enter name.');
        return;
    }

    if(isNaN(salary) || salary < 0){
        console.log('enter valid amount');
        return;
    }

    if(!isValidateRole(role)){
        console.log('enter valid role.');
        return
    }

    const employee = new Employee(name, salary, role);
    employees.push(employee);

    nameInput.value = "";
    salaryInput.value = "";
    roleInput.value = "";

    display(employee)
    
})


function display(employee: Employee):void{
    const empList = document.querySelector("#employeesList") as HTMLElement;
    
    const list:HTMLElement = document.createElement('li')
    list.classList.add('employee-card')
    list.textContent = employee.getDetails();
    empList.append(list);
}

import { useState } from "react";
import Employee from "../components/Employee.js";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/AddEmployee.js";
import EditEmployee from "../components/EditEmployee.js";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
    {
      id: 2,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
    {
      id: 3,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
    {
      id: 4,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
    {
      id: 5,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
    {
      id: 6,
      name: "john",
      role: "dev",
      img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    },
  ]);

  function updateEmployees(id, newName, newRole) {
    let updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function addEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }
  let showEmployees = true;
  return (
    <>
      {showEmployees ? (
        <div>
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  name={employee.name}
                  role={employee.role}
                  id={employee.id}
                  updateEmployee={updateEmployees}
                />
              );
              return (
                <Employee
                  id={employee.id}
                  key={uuidv4()}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee addEmployee={addEmployee} />
        </div>
      ) : (
        <p>no employees</p>
      )}
    </>
  );
}

export default Employees;

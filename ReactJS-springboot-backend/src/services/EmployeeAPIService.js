import axios from "axios";

const urlAPI = "http://localhost:8080/api/v1/employees";

class EmployeeAPIService {
  getEmployees() {
    return axios.get(urlAPI);
  }

  createEmployee(employee) {
    return axios.post(urlAPI, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(urlAPI + "/" + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(urlAPI + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(urlAPI + "/" + employeeId);
  }
}

export default new EmployeeAPIService();

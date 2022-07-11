package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
    
    @Autowired
    private EmployeeRepository employeeRepository;

      //get todos os employees

      @GetMapping("/employees")
      public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();       
    }

         //Método criar funcionários        
         @PostMapping("/employees")
         public Employee createEmployee(@RequestBody Employee employee){
             return employeeRepository.save(employee);
         }
    
         //Método para recuperar funcionário por Id

         @GetMapping("/employees/{id}")
         public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
            Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe!ID: " + id));

            return ResponseEntity.ok().body(employee);
         }

        //  Método update RestAPI
         
        @PutMapping("/employees/{id}")
        public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        
          Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe!ID: " + id));

          employee.setFirstName(employeeDetails.getFirstName());
          employee.setLastName(employeeDetails.getLastName());
          employee.setEmailId(employeeDetails.getEmailId());

          Employee updatedEmployee = employeeRepository.save(employee);

          return ResponseEntity.ok(updatedEmployee);
        }

        //Método para deletar fucnionários
        @DeleteMapping("/employees/{id}")
       public ResponseEntity<Void> delete(@PathVariable Long id){
        employeeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
       }

          
        }



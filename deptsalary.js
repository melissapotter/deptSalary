var fs = require('fs'); //installs file system module

//Step 1. Create all single-d and multi-d arrays AS empty arrays (initially)
// push single string data/elements into an array as a single element
//push array data into an array to form multi-d arrays

//single-d arrays
var departmentId =[]; //done
var departments =[]; //done

// multi-d arrays
var employeeId = [];
var employeeName = [];
var salaries = [];

//Process 'load_dept_name.txt' file
fs.readFile('load_dept_names.txt', 'utf8', function(err, data){
    if (err) throw err; 

    var deptDataClean = data.replace(/INSERT INTO `departments` VALUES \n/g, "");
    var deptDataArray = deptDataClean.split('\n');
    
    for (var i = 0; i < deptDataArray.length; i++){
        departmentId.push(deptDataArray[i].slice(2,6));
    }
    for (var j = 0; j < deptDataArray.length; j++){
        departments.push(deptDataArray[j].slice(9, -3));
        
        //populate multi arrays with empty sub arrays (no data)
        employeeId.push([]);
        employeeName.push([]);
        salaries.push([]);
    }
        // console.log(departmentId);
        // console.log(departments);
        // console.log(employeeId);
        // console.log(employeeName);
        // console.log(salaries);
});

//Process 'load_dept_emp.txt' file
fs.readFile('load_dept_emp.txt', 'utf8', function(err, data){
    if (err) throw err;
    
    var employeeDataClean = data.replace(/INSERT INTO `dept_emp` VALUES /g, "");
    var employeeDataArray = employeeDataClean.split('\n');
    
    for (var i = 0; i < employeeDataArray.length; i++) {
        if (employeeDataArray[i].slice(28, 32) == '9999') {
            
            // console.log(employeeDataArray[i].slice(8, 12));
            // console.log(employeeDataArray[i].slice(1,6));
            employeeId[departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
        }
    }
    
    // console.log(employeeDataArray);
    console.log(employeeId);
    
});

//Process 'load_salaries1.txt' file
fs.readFile('load_salaries1.txt', 'utf8', function(err, data){
    if (err) throw err;
    
    var salaryDataClean = data.replace(/INSERT INTO `salaries` VALUES /g, "");
    var salaryDataArray = salaryDataClean.split('\n');
    
    
    for (var i = 0; i < salaryDataArray.length; i++) {
        if (salaryDataArray[i].slice(27, 31) == '9999') {
            // console.log("Salary emp ID: ", salaryDataArray[i].slice(1, 6));
            for (var j = 0; j < employeeId.length; j++) {
                for (var k = 0; k < employeeId[j].length; k++) {
                           
                            // console.log(employeeId[j][k]); // iterates thru emp ID to find all current employees
                  if (employeeId[j][k] == salaryDataArray[i].slice(1, 6)) { // if employee matches a current employee 
                  // -- slice salary 7-12 and push it to salaries array
                    salaries[j].push(salaryDataArray[i].slice(7, 12));
                  }
                        
                }
                
            }

        }

    }
    console.log(salaries);
    });
    
    //Process 'load_employee.txt' file
    // need to match salaries with emp names
fs.readFile('load_employee.txt', 'utf8', function(err, data){
    if (err) throw err;
    
    var employeeNameDataClean = data.replace(/INSERT INTO `employees` VALUES /g, "");
    var employeeNameDataArray = employeeNameDataClean.split('\n');
    
    for (var i = 0; i < employeeNameDataArray.length; i++) {
        if (employeeId == employeeNameDataArray[i].slice(1, 6)) {
            employeeName[i].push(employeeNameDataArray[i].slice(21, -19));
            }
 
    }
              console.log(employeeName);    

});

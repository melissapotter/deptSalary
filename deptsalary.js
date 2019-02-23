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
            employeeId[departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1,6));
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
    
    // console.log(salaryDataArray[0].slice(27, 31));
    
    for (var i = 0; i < salaryDataArray.length; i++) {
        if (salaryDataArray[i].slice(27, 31) == '9999') {
            
            console.log(salaryDataArray[i].slice(1, 6));
            
        }
        else {
            console.log(salaryDataArray[i].slice(28,32));
        }
            // salaries[departmentId.indexOf(salaryDataArray[i].slice(8, 12))].push(salaryDataArray[i].slice(1,6));
        }
    });
    
    console.log(salaries);
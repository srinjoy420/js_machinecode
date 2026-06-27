(async function () {
    const data=await fetch('./src/data.json')
    const res=await data.json()
    // console.log(res);

    let employees=res
    let seletectedEmployeeId=employees[0].id
    let seletectedEmployee=employees[0]

    const employeeList=document.querySelector(".employees__name--list")
    const employeeInfo=document.querySelector(".employees__name--info")

    // Add employee logic

    //select a employee logic

    const renderEmployees=()=>{
        employeeList.innerHTML=""
        employees.forEach((emp)=>{
            const employee=document.createElement("span")
            employee.classList.add("employee__names--item")

            if(parseInt(seletectedEmployeeId,10)===emp.id){
                employee.classList.add("selected")
                seletectedEmployee=emp
            }
            employee.setAttribute("id",emp.id)
            employee.innerHTML=`${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌ </i>`
            employeeList.append(employee)
        })
    }
    // render sinle employee
    renderEmployees()
    
    
})();

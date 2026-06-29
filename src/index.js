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
    const createEmployee=document.querySelector('.creteemployee')
    const addEmployeeModel=document.querySelector(".addEmployee")
    const addEmployeeForm=document.querySelector(".addEmployee_create")

    createEmployee.addEventListener('click',()=>{
        addEmployeeModel.style.display="flex"
    })
    addEmployeeModel.addEventListener("click",(e)=>{
        if(e.target.className==="addEmployee"){
            addEmployeeModel.style.display="none"
        }
    })
    const dobInput=document.querySelector('.addEmployee_create--dob')
    dobInput.max=`${new Date().getFullYear()-18}-${new Date().toISOString().slice(5,10)}`
    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        const formData=new FormData(addEmployeeForm)
        const values=[...formData.entries()]
        // console.log(values);
        let empData={}
        values.forEach((val)=>{
            empData[val[0]]=val[1]
        })
        empData.id=employees[employees.length-1].id+1
        empData.age= new Date().getFullYear()-parseInt(empData.dob.slice(0,4),10)
        empData.imageUrl=empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"
        employees.push(empData)

        renderEmployees()
        addEmployeeForm.reset()
         addEmployeeModel.style.display="none"
    })
   


    //select a employee logic
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName==="SPAN" && seletectedEmployeeId!==e.target.id){
            seletectedEmployeeId=e.target.id
            renderEmployees()
            rendersingleEmployee()
        }
         if(e.target.tagName==="I"){
            employees=employees.filter(emp>String(emp.id)!==e.target.parentNode.id)
        }
        if(String(seletectedEmployeeId)===e.target.parentNode.id){
            seletectedEmployeeId=employees[0]?.id || -1;
            seletectedEmployee=employees[0]|| {}
            renderEmployees()
        }
    })

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
    const rendersingleEmployee=()=>{
        //deleting employee
       
        employeeInfo.innerHTML=
                         `<img src="${seletectedEmployee.imageUrl}"/>
                            <span class="employee__single--heading">${seletectedEmployee.firstName} ${seletectedEmployee.lastName} ${seletectedEmployee.age}</span>
                            <span>${seletectedEmployee.address}<span/>
                            <span>${seletectedEmployee.contactNumber}<span/>
                            <span>${seletectedEmployee.dob}<span/>`
    }
    if(seletectedEmployee) renderEmployees()
    renderEmployees()
    
    
})();

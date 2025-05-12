const BASE_URL = 'http://localhost:8000'

let mode = 'create' //default mode
let selectedId = ''

window.onload = async () => {
  //เป็นท่าของ browser ที่รับค่า query string มาใน url
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if(id){
      mode = 'edit'
      selectedId = id
        
      try{
        //1.ดึงข้อมูล user เก่าออกมาก่อน
        const response = await axios.get(`${BASE_URL}/users/${id}`)
        const user = response.data

        //2.นำข้อมูล user กลับใส่เข้าไปใน input html
        let firstNameDOM = document.querySelector('input[name=firstname]')
        let lastNameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let descriptionDOM = document.querySelector('textarea[name=description]')

        firstNameDOM.value = user.firstname
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        descriptionDOM.value = user.description
      
        let genderDOMs = document.querySelectorAll('input[name=gender]')  
        let interestDOMs = document.querySelectorAll('input[name=interest]') 

        for(let i = 0; i < genderDOMs.length; i++){
          if(genderDOMs[i].value === user.gender){
            genderDOMs[i].checked = true
          }
        }
      
        for(let i = 0; i < interestDOMs.length; i++){
          //.includes เช็คว่าค่าใน user ที่ดึงมา มีค่าเท่ากับใน Dom หน้าเว็บไหม 
          // คือมีค่าเหมือนกันไหม ถ้าใช่จะเป็น true ถ้าไม่ใช่จะเป็น false เช่น มีหนังสืออยู่เหมือนกันจะเป็น true  
          if(user.interests.includes(interestDOMs[i].value)){
            interestDOMs[i].checked = true
          }
        }



      }catch(error){
        console.log('error', error)
      }
    }
}





let messageDOM = document.querySelector('#message')

const validateData = (userData) => {
     let errors = []

     //ใน js ถ้าส่งค่าว่างเปล่ามาจะเป็น undefined แล้วใส่ ! ก็จะเป็น true เป็นการเช็คค่าว่างได้
     if(!userData.firstname){
        errors.push('กรุณากรอกชื่อจริง')
     }

     if(!userData.lastname){
        errors.push('กรุณากรอกนามสกุล')
     }

     if(!userData.age){
        errors.push('กรุณากรอกอายุ')
     }  

     if(!userData.gender){
        errors.push('กรุณาเลือกเพศของคุณ')
     }

     if(!userData.interests){
        errors.push('กรุณาเลือกสิ่งที่สนใจ')
     }

     if(!userData.description){
        errors.push('กรุณาใส่ลายละเอียดของคุณ')
     }

        return errors
}


const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
  
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}
  
    let descriptionDOM = document.querySelector('textarea[name=description]')
  
try {
    let interest = ''
  
    for (let i = 0; i < interestDOMs.length; i++) {
      interest += interestDOMs[i].value
      if (i != interestDOMs.length - 1) {
        interest += ', '
      }
    }
  
    let userData = {
      firstname: firstNameDOM.value,
      lastname: lastNameDOM.value,
      age: ageDOM.value,
      gender: genderDOM.value,
      description: descriptionDOM.value,
      interests: interest
    }
  
    console.log('submit data', userData)

    //validate ฝั่งหน้าบ้าน
    const errors = validateData(userData)
    if(errors.length > 0){
        //มี error เกิดขึ้น
        throw {
            message: 'กรอกข้อมูลไม่ครบ',
            errors: errors
        }
    }

        let message = 'บันทึกข้อมูลเรียบร้อย'
        
        if(mode === 'create'){
          await axios.post(`${BASE_URL}/users`, userData)
        } else {
          await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
          message = 'แก้ไขข้อมูลเรียบร้อย'
        }

        messageDOM.innerHTML = message
        messageDOM.className = "message success"

} catch (error) {
    console.log('error message', error.message)
    console.log('error', error.errors)
        if(error.response){
        console.log(error.response)
         //โชว์ message validate จากฝั่งหลังบ้านโดยที่เป็นการบอก error จาก axios (error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
    }
     
    let htmlData = '<div>'
    htmlData += `<div>${error.message}</div>`
    htmlData += '<ul>'
    for(let i = 0; i < error.errors.length; i++){
      htmlData += `<li>${error.errors[i]}</li>`
    }
    htmlData += '</ul>'
    htmlData += '</div>'


        messageDOM.innerHTML = htmlData
        messageDOM.className = "message danger"
    }

  }
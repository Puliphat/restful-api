const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`)
    
    console.log('response', response.data)

    const userDom = document.getElementById('user-list')
    const noContentDom = document.getElementById('no-content')

    // กรณีไม่มีข้อมูลData
    if (!response.data || response.data.length === 0) {
       
        noContentDom.style.display = 'block'
        // ล้างข้อมูลเก่า (ถ้ามี)
        userDom.innerHTML = ''
        userDom.appendChild(noContentDom)
        return
    }

    // ถ้ามีข้อมูล Data ให้ตรงนี้เป็น none
    noContentDom.style.display = 'none'

    let htmlData = '<div>'

    for(let i = 0; i < response.data.length; i++){
        let user = response.data[i]
        htmlData += `<div>
         <div class="user-info">${user.id} - ${user.firstname} ${user.lastname}</div>
         <div class="button-group">
           <a href="index.html?id=${user.id}"><button>Edit</button></a>
           <button class="delete" data-id="${user.id}">Delete</button>
         </div>
        </div>`
    }
 
    htmlData += '</div>'

    // เพิ่ม noContentDom กลับไปใน userDom เพื่อให้มันอยู่ในที่เดิม
    // เราต้องทำอย่างนี้เพราะการกำหนด innerHTML จะลบทุกอย่างในนั้น
    userDom.innerHTML = htmlData
    userDom.appendChild(noContentDom)

    const deleteDoms = document.getElementsByClassName('delete')

    for(let i = 0; i < deleteDoms.length; i++){
        deleteDoms[i].addEventListener('click', async (event) => {
         //ดึง id ออกมา
         const id = event.target.dataset.id
         try{
            await axios.delete(`${BASE_URL}/users/${id}`)
            loadData() // recursive function = เรียก function ตัวเองซ้ำอีกรอบ
         }catch(error){
            console.log('error', error)
         }
        })
    }
}
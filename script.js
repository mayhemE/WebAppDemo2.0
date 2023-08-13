// DOM 
    // selection
    // creation
    // modification
        //inneHTML 
        // textcontent
        // innertext
// eventlisteners
    // document.addEventListener
// fetch // server comms.

// CRUD 
// Create => POST => URL && object 
        // method
        // headers na body
// Retrieve => GET => 1 (URL) 
// update => PUT => 2 parameters. {URL/id}, object. 
// Delete => DELETE => 2 parameters. {URL/id}, object. expect for the body.

// BREAKDOWN
// SERVER COMM.
        // fetching data.
        // Browser data 
            // DOM - where I want the data to be placed.
             //      - placing
    // id, classname, tagname, queryselector, queryselectors                   
let listy = document.getElementById('listy')
let dataUrl = 'http://localhost:3000/websites'
let addComp = document.getElementById('addCompany')
// asynchronous js 

// GET
fetch(dataUrl)
.then(res => res.json())
.then(data => placeData(data))


let placeData = (data) =>{
    data.map(i =>{
        let companies = document.createElement('div')
        companies.innerHTML = `
            <h2>Name: ${i.name}</h2>
            <img src=${i.logo}/>
            <a href=${i.url}><button>Visit</button></a>
            <p>${i.description}</p>
            <button class="editBtn" >Edit</button>
            <button class="CdeleteBtn">Delete</button>
        `
        companies.style.border = '1px solid black'
        companies.style.padding='20px'
        companies.style.margin='20px'

        listy.appendChild(companies)

        companies.querySelector('.CdeleteBtn').addEventListener('click', function(){
            let deleteUrl = `${dataUrl}/${i.id}`
            fetch(deleteUrl,{
                method:'DELETE',
                headers:{'Content-Type': 'application/json'}
            })
            .then(res =>{
                if(res.ok){
                    alert(`${i.name} deleted successfully`)
                }else{
                    alert("Item not found")
                }
            })
        })

        companies.querySelector(".editBtn").addEventListener('click', (e) => {
            e.preventDefault()    
            let editUrl = `${dataUrl}/${i.id}`

            let editFormDiv = document.createElement('div')
            editFormDiv.innerHTML = `
                    <br>
                    <form class="editCompany">
                        <label>Name: </label>
                        <input class="editName">
                        <br>
                        <label>Logo: </label>
                        <input class="editLogo">
                        <br>
                        <label>URL: </label>
                        <input class="editUrl">
                        <br>
                        <label>DESCRIPTION: </label>
                        <input class="editDescription">
                        <br>
                        <button type="submit">Edit company</button>
                    </form>
            `
            companies.appendChild(editFormDiv)

            
            let editForm = document.querySelector('.editCompany')
           
            
            editForm.addEventListener('submit', (e)=>{
                e.preventDefault();

                let name = document.querySelector('.editName').value
                let logo = document.querySelector('.editLogo').value
                let url = document.querySelector('.editUrl').value
                let description = document.querySelector('.editDescription').value

           
                let editData = {
                    name: name,
                    logo: logo,
                    url: url,
                    description: description
                }
               
                fetch(editUrl,{
                    method:'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(editData)
                })
                .then(response => response.json)

            })
        })
    })

}

let editCompanyDetails = () => {    
    
}

// POST
    // take data from the user
    // sending the data to the server

let addCompanyData = () =>{
    let name = document.getElementById('name').value
    let logo = document.getElementById('logo').value
    let url = document.getElementById('url').value
    let description = document.getElementById('description').value


    // POST 2 parameters 
        // 1 url
        // 2. object
            // method
            // headers
            // body

    let compData = {
        name: name,
        logo: logo,
        url: url,
        description: description
    }
    
    fetch(dataUrl,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(compData)
    })
    .then(response => response.json())
}

// 2 parameters.
// 1 => an action/ move
// 2 => callback function
addComp.addEventListener('submit',addCompanyData)




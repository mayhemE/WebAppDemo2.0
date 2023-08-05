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
// Create => POST
// Retrieve => GET => 1 (URL)
// update => PUT
// Delete => DELETE

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
        `
        companies.style.border = '1px solid black'
        companies.style.padding='20px'
        companies.style.margin='20px'

        listy.appendChild(companies)
    })

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




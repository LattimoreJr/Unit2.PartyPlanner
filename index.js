const partyList = document.querySelector("#partyList")
const partyForm = document.querySelector("#partyForm")

let parties = []

const render = () => {
  const html = parties.map((party) => {
    return `
    <div>
    <h2>${party.name}</h2>
    <p>Description: ${party.description}</p>
    <p>Date: ${party.date}</p>
    <p>Location: ${party.location}</p>
    <button class="deleteButton" name="${party.id}">Delete</button>
    
    </div>
    `
  })
    partyList.innerHTML = html.join("")
}

const fetchParties = async () => {
   try {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events")
    const json = await response.json()
    parties = json.data
   } catch (error) {
    console.error(error)
    
   }
    render()
}

fetchParties()

partyForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const newParty = {
        name: event.target.name.value,
        description: event.target.description.value,
        date: new Date(event.target.date.value),
        location: event.target.location.value,
    }
    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newParty),
        })
        const json = await response.json()
        parties.push(json.data)
        render()
        partyForm.reset()
    } catch (error) {
        console.error(error)
        
    }
    
})

partyList.addEventListener("click", async (event) => {
    if(event.target.className === "deleteButton") {
        const partyId = event.target.name
        try {
            await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events/${partyId}`, {
                method: "DELETE",
            })
            event.target.parentElement.remove()
            render()
        } catch (error) {
            console.error(error)
        }
    }
})
console.log("index.js is running!")

//=======================================================================

// Just an early basic check to see that we are connecting to our API
    axios.get('http://localhost:3000/')
        .then(function(response) {
            console.log("OUR API!")
            console.log(response.data) 
        })
        .catch(function(err) {
            console.log(err)
})

//=======================================================================

// Reaching out to our API to get all the movies
const renderRecords = function(){
axios.get('http://localhost:3000/movie')
    .then(function(response) {
        const Display = document.querySelector('#movieForm-section')
        while (Display.children.length > 0){
            Display.removeChild(blouseSection.firstChild)
        }

        const allMovies = response.data
        allMovies.forEach(function(record) {
            const newDivElement = createMovie(record) 
            console.log(newDivElement)
            Display.appendChild(newDivElement)
        }) 
    })
    .catch(function(err) {
        console.log(err)
    })
}
renderRecords() 

// This is the function we are going to use to handle the form submission
function SubmitForm(event) {
    event.preventDefault()
    console.log(event.target)
    alert("Form Submitted")
    console.log("Submitting the Movie form")
    const formData = new FormData(movieForm)
    const plainFormData = Object.fromEntries(formData.entries())
    console.log("DISPLAYING THE FORM DATA")
    console.log(plainFormData)

    // Now we have to post the data to our API.
    axios.post('http://localhost:3000/movie', plainFormData)
        .then(function (movieAdded) {
            console.log("New movie added") 
            renderRecords()
        })
        .then(function(err) {
            console.log(err)
        }) 
}

const movieForm = document.querySelector('#movieForm')
movieForm.addEventListener('submit', SubmitForm)

// This is the function to build a new element
const createMovie = function(record) {
    const newWrapperElement = document.createElement('div')

    const newPicture = document.createElement('div')
    const newTitle = document.createElement('div')
    const newGenre = document.createElement('div')
    const newYearReleased = document.createElement('div')
    const newFavCast = document.createElement('div') 

    newPicture.innerHTML = `<p id="h"><img src="${record.Picture}" length= "100" width="400"></p>`
    newTitle.innerHTML = `<p id="h"> ${record.Title} </p>`
    newGenre.innerHTML = `<p id="h"> ${record.Genre} </p>`
    newYearReleased.innerHTML = `<p id="h"> ${record.Year_Released} </p>`
    newFavCast.innerHTML = `<p id="h"> ${record.Favorite_Cast} </p>`

    newWrapperElement.append(newPicture)
    newWrapperElement.append(newTitle)
    newWrapperElement.append(newGenre)  
    newWrapperElement.append(newYearReleased)
    newWrapperElement.append(newFavCast) 
    
    return newWrapperElement
}

console.log("END OF FILE?")

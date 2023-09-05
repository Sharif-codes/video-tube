const categoryHandler = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const categories = await res.json()
    const category = categories.data
    console.log(category)
    categoryName(category)
}
const categoryBtn = document.getElementById('category-btn')
const categoryName = (category) => {
    category.forEach(category => {
        if (category.category_id === '1005') {

            const div = document.createElement('div')
            div.innerHTML = `
            <button onClick="noContentHandler()" class="btn">${category.category}</button>
            `
            categoryBtn.appendChild(div)
        }
        else {
            const div = document.createElement('div')
            div.innerHTML = `
            <button id="content-btn" onClick="contentHandler(${category.category_id})" class="btn">${category.category}</button>
            `
            categoryBtn.appendChild(div)

            // console.log(category.category_id)
        }
    });

    contentHandler(category[0].category_id)

}


const contentHandler = async (id) => {
    
   
    const sortBtnHide = document.getElementById('sort-btn')
    sortBtnHide.classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const contentDetails = data.data

    showContent(contentDetails)
}

const contentContainer = document.getElementById('category-container')
const showContent = (contentDetails) => {

    contentContainer.textContent = ""
    noContent.textContent = ''
    contentDetails.forEach(element => {
        console.log(element)
        // arr.push(parseFloat(element.others.views))
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl mx-auto">
                    <figure class="relative"><img class='h-48 w-full' src="${element.thumbnail}" /></figure>
                    
                    <h2 class="bg-gray-900 text-xs px-1 w-fit text-white absolute top-40  left-44 rounded-sm">${element.others.posted_date == "" ? "<span class='bg-none'></span>" : timeToHourAndMin(element.others?.posted_date)}</h2>
                    
                    <div class="card-body">
                    <div class="flex gap-2">
                    <div><img class="rounded-full w-10 h-10" src="${element.authors[0].profile_picture}" alt=""/></div>
                    <div space-y-10>
                       <h1 class="text-lg font-bold ">${element.title}</h1>
                       <div class="flex gap-1">
                       <p class="text-gray-500 flex-grow-0">${element.authors[0].profile_name}<p>
                       <img src="${element.authors[0].verified ? verified() : ''}"/>
                       </div>
                       <p class="text-gray-500">${element.others.views} <span>views</span><p>
                    </div>
                     </div>
                     
                    </div>
                  </div>
            `

        contentContainer.appendChild(div)
        // console.log(element.authors)

    })

    document.getElementById('sort-btn').addEventListener('click', () => {
        const sort = contentDetails.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views))

        showContent(sort)
    })

}



const verified = () => {
    return 'verified.png'
}
const noContent = document.getElementById('no-content')
const noContentHandler = () => {
    const sortBtnHide = document.getElementById('sort-btn')
    sortBtnHide.classList.add('hidden')
    contentContainer.textContent = ''
    noContent.textContent = ''

    const div = document.createElement('div')
    div.innerHTML = `
    <img class="mx-auto" src="icon.png"/>
    <p> Oops!! Sorry, There is no <br> content here</p>
    `
    noContent.appendChild(div)
}
const timeToHourAndMin = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const min = Math.floor((seconds % 3600) / 60)
    return `${hours} hrs ${min} min ago`

}

// const sortContent = async () => {
// const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
// const data = await res.json()
// const sortedContent = data.data
// console.log(sortedContent)
// sortedContent.sort((a,b)=>parseFloat(b.others.views)- parseFloat(a.others.views))
// console.log(sortedContent)

// }
categoryHandler()

const newHtml = () => {
    window.open('blog.html', '_blank')
}

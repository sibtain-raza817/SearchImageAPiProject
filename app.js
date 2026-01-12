const accessKeyv = 'vzFun-qjVH4Cy-CjbTyTWx6cOK8R55I6swZn2hPj3DM'
//const add = "https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY"
const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imageContainer = document.querySelector(".images-container");
const loadMore = document.querySelector('.loadBtn');


let page = 1;
//function to fetch images from unsplash API
const fetchImage = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imageContainer.innerHTML = '';
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${pageNo}&client_id=${accessKeyv}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach(photo => {
                //create images div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

                //overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                // create overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement)
                imageContainer.appendChild(imageElement);
            });

            if (data.total_pages === pageNo) {
                loadMore.style.display = "none";
            } else {
                loadMore.style.display = "block";
            }
        } else {
            imageContainer.innerHTML = `<h2>Image not found. </h2>`;
        }
    } catch (err) {
        console.log(err);

    }

}

//adding Event Listener To search form
form.addEventListener('submit', (e) => {
    //i will stope the autoSubmit
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImage(inputText, page);
    }
    else {
        imageContainer.innerHTML = `<h2>Please enter a search quesry. </h2>`;
        if (loadMore.style.display === "block") {
            loadMore.style.display = "none"
        }
    }
});

//adding Event Listener To load more images 

loadMore.addEventListener('click', () => {
    fetchImage(searchInput.value.trim(), ++page);
});
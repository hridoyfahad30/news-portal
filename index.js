document.body.style.backgroundColor = '#EDEAEA';

/* Fetch Cetegory */

const fetchCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    showCategory(data.data.news_category);
};

/* Show Category */

const showCategory = (data) => {

    const cetegoriesContainer = document.getElementById('categoriesContainer');

    data.forEach(singleCategory => {

            cetegoriesContainer.innerHTML += `<a class="py-2 px-2 text-base font-medium rounded-md  hover:bg-indigo-100 active:bg-indigo-500 active:text-white" href="#" onclick="cetegoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">${singleCategory.category_name}</a>`;
    })
};


/* Fetch Cetegory news */

const cetegoryNews = async(cetegoriedID, cetegoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${cetegoriedID}`;
    const res = await fetch(url)
    const data = await res.json()
    showCetegoryNews(data.data, cetegoryName);
    // console.log(data.data);
}

/* Show Cetegories News */

const showCetegoryNews = (cetegoriesNews, cetegoryName) => {
    
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    const newsCounter = document.getElementById('newsCounter');
    newsCounter.innerText = cetegoriesNews.length;

    const newsCetegory = document.getElementById('newsCetegory');
        newsCetegory.innerText = cetegoryName;

    cetegoriesNews.forEach(singleCetegoryNews => {

        const date = new Date(singleCetegoryNews.author.published_date).toLocaleDateString();

        // console.log(singleCetegoryNews);

        newsContainer.innerHTML += `
        
        <div class="flex justify-between items-start gap-5 bg-white p-6 my-8 rounded-lg max-h-96">
                <div class="">
                    <img src="${singleCetegoryNews.thumbnail_url}" alt="">
                </div>
                <div class="w-9/12 pr-8">
                    <h1 class="text-3xl font-medium py-4">${singleCetegoryNews.title}</h1>
                    <p class="newsDetails text-lg text-justify text-gray-500 font-normal pb-4 ">${singleCetegoryNews.details}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div>
                                <img class="w-10 rounded-full" id="authID" src="${singleCetegoryNews.author.img ? singleCetegoryNews.author.img : 'No Image Found'}" alt="">
                            </div>
                            <div>
                                <h6 id="authName" class="text-lg font-medium">${singleCetegoryNews.author.name}</h6>
                            <p id="publishDate">${date}</p>
                            </div>
                        </div>
                        <div>
                            <p><i class="fa-solid fa-eye"></i> <span class="text-lg font-medium"> ${singleCetegoryNews.total_view}</span></p>
                        </div>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i>${singleCetegoryNews.rating.number}</i>
                        </div>
                        <div>
                            <button class="px-4 py-2 rounded-full hover:bg-indigo-100"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        `;
    })
};
document.body.style.backgroundColor = '#EDEAEA';

/* Fetch Cetegory */

let allData ;

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
    allData = data.data;
    showCetegoryNews(data.data, cetegoryName);
    // console.log(data.data);
};

cetegoryNews('08', 'All News');

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

        newsContainer.innerHTML += `
        
        <div class="xl:flex justify-between items-start gap-5 bg-white p-3 xl:p-6 my-8 rounded-lg xl:max-h-96">
                <div class="">
                    <img src="${singleCetegoryNews.thumbnail_url}" alt="">
                </div>
                <div class="xl:w-9/12 xl:pr-8">
                    <h1 class="xl:text-3xl font-medium py-4">${singleCetegoryNews.title}</h1>
                    <p class="newsDetails xl:text-lg text-justify text-gray-500 xl:font-normal pb-4 ">${singleCetegoryNews.details.length > 650 ? singleCetegoryNews.details.slice(0, 650)+ '...': singleCetegoryNews.details}</p>
                    <div class="flex justify-between items-center gap-2">
                        <div class="flex flex-wrap items-center gap-2">
                            <div>
                                <img class="w-10 rounded-full" id="authID" src="${singleCetegoryNews.author.img ? singleCetegoryNews.author.img : 'No Image Found'}" alt="">
                            </div>
                            <div>
                                <h6 id="authName" class="xl:text-lg xl:font-medium">${singleCetegoryNews.author.name}</h6>
                            <p id="publishDate">${date}</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center>
                            <p><i class="fa-solid fa-eye"></i> <span class="xl:text-lg xl:font-medium"> ${singleCetegoryNews.total_view}</span></p>
                        </div>
                        <div class="flex justify-center items-center gap-1">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i>${singleCetegoryNews.rating.number}</i>
                        </div>
                        <div>
                        <label onclick="detailsNewsFetch('${singleCetegoryNews._id}')" for="my-modal-5" class="btn bg-indigo-700 hover:bg-indigo-600 rounded-full"><i class="fa-solid fa-arrow-right"></i></label>
                        </div>
                    </div>
                </div>
            </div>

        `;
    })
};


/* Details News Fetch */

const detailsNewsFetch = async(singleID) => {
    const url = `https://openapi.programming-hero.com/api/news/${singleID}`;
    const res = await fetch(url)
    const data = await res.json()
    showDetailsNews(data.data);
};


/* Details News Show */

const showDetailsNews = News => {
    const modalNewsTitle = document.getElementById('modalNewsTitle');
    const modalNewsDetails = document.getElementById('modalNewsDetails');
    const modalNewsImage = document.getElementById('modalNewsImage');
    News.forEach(singleNews => {

        modalNewsTitle.innerText = `${singleNews.title}`;
        modalNewsImage.src = singleNews.image_url;
        modalNewsDetails.innerText = `${singleNews.details}`;

    })
};

document.getElementById('todaysPick').addEventListener('click', function(e){

    const filterData = allData.filter(item => item.others_info.is_todays_pick)
    showCetegoryNews(filterData);
    const newsCetegory = document.getElementById('newsCetegory');
        newsCetegory.innerText = "Today's Pick";
});

document.getElementById('trending').addEventListener('click', function(e){
    
    const filterData = allData.filter(item => item.others_info.is_trending)
    showCetegoryNews(filterData);
    const newsCetegory = document.getElementById('newsCetegory');
        newsCetegory.innerText = "Trending";
});


const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
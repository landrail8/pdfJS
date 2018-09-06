
var listLastNews;
const COUNT_NEWS = 10;
const URL_SPORTS = "https://s8.stc.m.kpcdn.net/content/api/1/pages/get.json/7777777777tmp9876?pages.spot=0&pages.direction=last&pages.target.class=15&pages.target.id=5&sub=0";
var rootDiv = document.getElementsByClassName('fix-head light header-adaptive')[0];

function closeAllBlocks() {
  for (let currentContainer of listLastNews) {
    const nodeA = document.getElementById(`${currentContainer.id}`);
    nodeA.setAttribute('state', 'close');
    const nodeA_block = document.getElementById(`${currentContainer.id}_comment`);
    if (nodeA_block) {
      nodeA_block.style.display = "none";
    }
  }    
}

function toggle_visibility(currentContainer) {
  const blockContainer = document.getElementById(`${currentContainer.id}_comment`);

  if (currentContainer.getAttribute('state') === 'close') {
    
    closeAllBlocks();
    currentContainer.setAttribute('state', 'open');    

    var currentNews;
    for (let i of listLastNews) {
      if (i["id"] == currentContainer.id) {
         currentNews = i;
         break;
      }
     }
    
    if (blockContainer) { // если ранее блок статьи открывался, то его не создаем, а просто открываем:
      blockContainer.style.display = "block";
    } else { // надо создавать блок описания статьи:
      const dateInString = new Date(currentNews.dateNews).toLocaleDateString();
      const text = `${currentNews.descriptionNews} (опубликовано ${dateInString})
        (автор ${currentNews.authorNews}) `;
        
      currentContainer.insertAdjacentHTML('afterend', `<div id="${currentContainer.id}_comment">${text}
        <a target = "_blank" href = "${currentNews.urlNews}">Открыть статью</a>    
        </div>`);
    }    
  } else {
    currentContainer.setAttribute('state', 'close');
    blockContainer.style.display = "none";
  }
}

function makeSortDirection() {
  rootDiv.insertAdjacentHTML('beforeend', `<p>Направление сортировки</p>`);
  const sortDirectionArea = document.createElement('select');
  sortDirectionArea.setAttribute("id", "sortDirectionArea");  

  sortDirectionArea.insertAdjacentHTML('beforeend', `    
    <option value="asc">По возрастанию</option>
    <option value="desc">По убыванию</option>
  `);
  rootDiv.appendChild(sortDirectionArea);
}

function makeSortItems() {
  let sortArea = document.createElement('select');
  sortArea.setAttribute("id", "sortArea");
  sortArea.insertAdjacentHTML('beforeend', getSortOptionsData(listLastNews));
  rootDiv.appendChild(sortArea);
}

function renderHeaderNews() {

  rootDiv.setAttribute("style","height:500px");

  // выведем блок сортировки:
  rootDiv.insertAdjacentHTML('beforeend', `<p>Сортировка</p>`);
  makeSortItems(); 
  makeSortDirection();

  const inputSort = document.createElement('input');
  inputSort.setAttribute("type", "button");
  inputSort.setAttribute("value", "Сортировать!");
  inputSort.addEventListener("click", sortNewsView);
  rootDiv.appendChild(inputSort);
}

function factoryNews(itemNews) {
  const div = document.createElement('div');
  const a = document.createElement('a');
  a.setAttribute("state", "close");
  a.setAttribute("id", itemNews["id"]);
  a.setAttribute("href", "#");
  a.innerText = itemNews.titleNews;
  a.addEventListener("click", () => toggle_visibility(a));
  div.appendChild(a);
  return div;
}

function renderListNews(news) {
  const areaNews = document.createElement('div');
  areaNews.setAttribute("id", "listNewsArea");

  const fragment = news.reduce((acc, itemNews) => {
    acc.appendChild(factoryNews(itemNews));
    return acc;
  }, document.createDocumentFragment());
  
  areaNews.appendChild(fragment);
  rootDiv.appendChild(areaNews);  
}

function sortNewsView() {

  document.getElementById('listNewsArea').remove();
  const sortDirection = document.getElementById("sortDirectionArea").value;
  const sortItem = document.getElementById("sortArea").value;

  listLastNews = getSortedNewsData(sortDirection, sortItem, listLastNews);

  renderListNews(listLastNews);
}

function renderAllNews(news) {
  renderHeaderNews();
  renderListNews(news);
} 

lastNews(COUNT_NEWS, URL_SPORTS);

/* const fetchMethod = () => {
  return new Promise((resolve, reject) => {
    resolve({json: function() {
      return new Promise((resolve, reject) => {
        resolve("1234");
      })
    }});
  })
}; */
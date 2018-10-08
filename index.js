"use strict";

var date, files, allRegions, allJournals, region, journal

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

const prepareURL = (url) => {
  let newUrl = url

  const token = 'HZ1xybTozwZ5G0JFJsST'//localStorage.getItem("token")
  newUrl = updateQueryStringParameter(newUrl, "token", token)

  return newUrl
}

const mockRegions = () => {
  return [{"code":"67","name":"Абакан"},{"code":"63","name":"Архангельск"},{"code":"81","name":"Астрахань"},{"code":"62","name":"Балканы"},{"code":"2","name":"Барнаул"},{"code":"3","name":"Беларусь"},{"code":"57","name":"Белгород"},{"code":"39","name":"Бишкек"},{"code":"41","name":"Благовещенск"},{"code":"59","name":"Брянск"},{"code":"70","name":"Великий Новгород"},{"code":"10","name":"Владивосток"},{"code":"4","name":"Владимир"},{"code":"5","name":"Волгоград"},{"code":"54","name":"Вологда"},{"code":"34","name":"Воронеж"},{"code":"80","name":"Дагестан"},{"code":"78","name":"Донецк"},{"code":"72","name":"Европа"},{"code":"55","name":"Египет"},{"code":"7","name":"Екатеринбург"},{"code":"58","name":"Иваново"},{"code":"50","name":"Ижевск"},{"code":"9","name":"Иркутск"},{"code":"12","name":"Казань"},{"code":"11","name":"Калининград"},{"code":"53","name":"Канада"},{"code":"13","name":"Кемерово"},{"code":"73","name":"Кипр"},{"code":"42","name":"Киров"},{"code":"16","name":"Краснодар"},{"code":"15","name":"Красноярск"},{"code":"74","name":"Крым"},{"code":"71","name":"Курск"},{"code":"66","name":"Липецк"},{"code":"14","name":"Молдова"},{"code":"1","name":"Москва"},{"code":"17","name":"Мурманск"},{"code":"18","name":"Нижний Новгород"},{"code":"19","name":"Новосибирск"},{"code":"68","name":"Новости 24"},{"code":"20","name":"Омск"},{"code":"69","name":"Орел"},{"code":"22","name":"Пенза"},{"code":"23","name":"Пермь"},{"code":"24","name":"Псков"},{"code":"0","name":"Россия"},{"code":"25","name":"Ростов-на-Дону"},{"code":"60","name":"Рязань"},{"code":"61","name":"США"},{"code":"28","name":"Самара"},{"code":"26","name":"Санкт-Петербург"},{"code":"27","name":"Саратов"},{"code":"47","name":"Северная Европа"},{"code":"29","name":"Северный Кавказ"},{"code":"44","name":"Смоленск"},{"code":"48","name":"Сыктывкар"},{"code":"65","name":"Тамбов"},{"code":"36","name":"Тверь"},{"code":"56","name":"Томск"},{"code":"30","name":"Тула"},{"code":"49","name":"Тюмень"},{"code":"31","name":"Украина"},{"code":"46","name":"Ульяновск"},{"code":"32","name":"Уфа"},{"code":"43","name":"Хабаровск"},{"code":"33","name":"Челябинск"},{"code":"51","name":"Черногория"},{"code":"64","name":"Чехия"},{"code":"52","name":"Чита"},{"code":"76","name":"Югра"},{"code":"79","name":"Якутия"},{"code":"75","name":"Ямал"},{"code":"35","name":"Ярославль"},{"code":"77","name":"пресс"},{"code":"83","name":"спорт"}]
}

const mockJournals = () => {
  return [{"code":"kp","name":"Комсомольская правда"},{"code":"tolstyshka","name":"Толстушка"},{"code":"eg","name":"Экспресс-Газета"}]
}

const mockDates = () => {
  return [{"_id":"5b893a84eded4942edbcb9ac","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b893a84eded4942edbcb9ac","exists":1,"p":1,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b893a84eded4942edbcb9ac","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b893a84eded4942edbcb9ac"},{"_id":"5b893a7ceded4942edbcb976","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b893a7ceded4942edbcb976","exists":1,"p":2,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b893a7ceded4942edbcb976","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b893a7ceded4942edbcb976"},{"_id":"5b893b01eded4942814eec9b","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b893b01eded4942814eec9b","exists":1,"p":3,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b893b01eded4942814eec9b","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b893b01eded4942814eec9b"},{"_id":"5b893ab9eded4942c93b0c51","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b893ab9eded4942c93b0c51","exists":1,"p":4,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b893ab9eded4942c93b0c51","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b893ab9eded4942c93b0c51"},{"_id":"5b8d005beded494215748814","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b8d005beded494215748814","exists":1,"p":5,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b8d005beded494215748814","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b8d005beded494215748814"},{"_id":6,"download":null,"exists":0,"p":6,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":7,"download":null,"exists":0,"p":7,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":8,"download":null,"exists":0,"p":8,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":9,"download":null,"exists":0,"p":9,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":10,"download":null,"exists":0,"p":10,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":11,"download":null,"exists":0,"p":11,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":12,"download":null,"exists":0,"p":12,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":13,"download":null,"exists":0,"p":13,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":14,"download":null,"exists":0,"p":14,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":15,"download":null,"exists":0,"p":15,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":16,"download":null,"exists":0,"p":16,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":17,"download":null,"exists":0,"p":17,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":18,"download":null,"exists":0,"p":18,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":19,"download":null,"exists":0,"p":19,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":20,"download":null,"exists":0,"p":20,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":21,"download":null,"exists":0,"p":21,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":22,"download":null,"exists":0,"p":22,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":23,"download":null,"exists":0,"p":23,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":24,"download":null,"exists":0,"p":24,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":25,"download":null,"exists":0,"p":25,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":26,"download":null,"exists":0,"p":26,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":27,"download":null,"exists":0,"p":27,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":28,"download":null,"exists":0,"p":28,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":29,"download":null,"exists":0,"p":29,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":30,"download":null,"exists":0,"p":30,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":31,"download":null,"exists":0,"p":31,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":32,"download":null,"exists":0,"p":32,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":33,"download":null,"exists":0,"p":33,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":34,"download":null,"exists":0,"p":34,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":35,"download":null,"exists":0,"p":35,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":36,"download":null,"exists":0,"p":36,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":37,"download":null,"exists":0,"p":37,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":38,"download":null,"exists":0,"p":38,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":39,"download":null,"exists":0,"p":39,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":40,"download":null,"exists":0,"p":40,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":41,"download":null,"exists":0,"p":41,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":42,"download":null,"exists":0,"p":42,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":43,"download":null,"exists":0,"p":43,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":44,"download":null,"exists":0,"p":44,"preview_big":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png","preview_small":"https://media.discordapp.net/attachments/392340723296501781/485082499781754890/preview_small.png"},{"_id":"5b893b16eded49425ddace2c","download":"https://identity.developers.kp.house/pdf/pages/download?_id=5b893b16eded49425ddace2c","exists":1,"p":45,"preview_big":"https://identity.developers.kp.house/pdf/pages/preview_big?_id=5b893b16eded49425ddace2c","preview_small":"https://identity.developers.kp.house/pdf/pages/preview_small?_id=5b893b16eded49425ddace2c"}]
}

async function getAllRegions() {

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/regions`)

  const responseData = await fetch(requestURL).catch(function(error) {  
    console.log(error);
    throw error
  });
 
  const responseRegions = await responseData.json()

  return responseRegions

}

async function getAllJournals() {

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/journals`)

  const responseData = await fetch(requestURL).catch(function(error) {  
    console.log(error);
    throw error
  });
 
  const responseJournals = await responseData.json()

  return responseJournals
 
}

function getListItemByCode(list, code) {

  const item = {code, name}
  if(!list||!code) return item
  
  list.map((curr) => {
    if(curr.code === code) {
      item.code = curr.code
      item.name = curr.name
    }
  })
  
  return item
}

function renderCurrentRegion() {
  if(region.name) {
    const titleChangedRegionDiv = document.querySelector(".note-title");
    titleChangedRegionDiv.innerHTML = `Выбран регион: ${region.name}`

    const titleRegionName = document.querySelector(".region-name");
    titleRegionName.innerHTML = `Ваш регион: ${region.name}`
  }
}

async function onChangeRegion(regionCode) {
  region = getListItemByCode(allRegions, regionCode)
  renderCurrentRegion()

  renewContent()
  
}

function renderRegionsList() {

  var regionsDiv = document.querySelector(".region-list");
  regionsDiv.insertAdjacentHTML('beforeend', allRegions.map((el, index) => {
    return `
      <li class="region-item">
        <input type="radio" id="region${index}" class="input-hidden" value="${el.code}" name="choose_region" onchange="onChangeRegion(value)">
        <label for="region${index}" class="region-label">
          <span class="region-title">${el.name}</span>
          <span class="checked-text">Выбрано</span>
        </label>
      </li>
    `;
  }).join('\n'));

}

async function renewContent() {

  const freshJournal = await getFreshJournal()
  renderFreshJournal(freshJournal)  

  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const month_1_Journals = await getJournalsByMonth(monthDate)
  const title = monthDate.toLocaleDateString('ru-RU', {month: 'long'})
  renderJournals(month_1_Journals, title)

}

async function onChangeJournal(journalCode) {
  journal = getListItemByCode(allJournals, journalCode)
  renderCurrentJournal()

  renewContent()

}

function renderJournalsList() {

  var journalsDiv = document.querySelector(".products-choose");
  journalsDiv.insertAdjacentHTML('beforeend', allJournals.map((el, index) => {
    return `
      <div class="products-block">
        <input type="radio" id="journal_${el.code}" class="input-hidden" type="radio" name="product_name" value="${el.code}" onchange="onChangeJournal(value)">
        <label for="journal_${el.code}" class="product-label">
          <span class="product-label-title">${el.name}</span>
          <span class="checked-text">Выбрано</span>
        </label>
      </div>
    `;
  }).join('\n'));
}

function renderCurrentJournal() {
  if(journal.name) {

    allJournals.map((el) => {
      const currInputJournal = document.querySelector(`#journal_${el.code}`)
      if(currInputJournal) {
        if(journal.code === el.code) {
          currInputJournal.setAttribute("checked", "checked");
        } else {
          currInputJournal.removeAttribute("checked");
        }
      }
    })

    const titlePage = document.querySelector(".title");
    titlePage.innerHTML = journal.name
    
  }
}

async function getFreshJournal() {
  const fresh = {src: "", date: "", dayWeek: "", periodicity: ""}

  const month = date.getMonth()+1
  const year = date.getFullYear()
  let error

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/pages/previews?month=${month}&year=${year}&region=${region.code}&journal=${journal.code}`);

  const responseMonthDays = await fetch(requestURL).catch((err) => error = err)
  if(error !== undefined) {
    console.log('error response monthDays = ', error)
    return
  }

  const monthDays = await responseMonthDays.json().catch((err) => error = err)
  if(error !== undefined) {
    console.log('error monthDays = ', error)
    return
  }
  
  if(monthDays.length&&monthDays.length > 0) {
    // свежий номер - последний элемент массива:
    const freshJournal = monthDays[monthDays.length - 1]

    fresh.src = prepareURL(`https://identity.developers.kp.house/pdf/${freshJournal.preview}`)

    const dateFreshJournal = new Date(freshJournal.date)
    fresh.date = dateFreshJournal.toLocaleDateString('ru-RU', {weekday: "long"})
    fresh.dayWeek = dateFreshJournal.toLocaleDateString('ru-RU', {date: "long"})
    fresh.periodicity = 'каждый n-день'

    return fresh
  }

  return fresh
}

function renderFreshJournal(freshJournal) {
 
  var freshJournalDiv = document.querySelector("#fresh-journal");

  freshJournalDiv.innerHTML = `
  <h2 class="h2 recent-title">Свежий номер</h2>
  <div class="flex">
    <div class="col col-image">
      <a href="#">
        <div class="image-wrapper">
          <img class="image" src=${freshJournal.src} alt="Кп">
        </div>
      </a>
    </div>
    <div class="col recent-body">
      <div class="h3">
        <span class="date">${freshJournal.date}</span>
        <span class="weekday">${freshJournal.dayWeek}</span>
      </div>
      <p class="recent-text">${freshJournal.periodicity}</p>
      <div class="button-wrapper">
        <a class="button blue" href="#">Купить</a>
      </div>
    </div>
  </div>
    
  `;

}

async function getJournalsByMonth(monthDate) {

  const month = monthDate.getMonth()+1
  const year = monthDate.getFullYear()
  let error

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/pages/previews?month=${month}&year=${year}&region=${region.code}&journal=${journal.code}`);

  const responseMonthDays = await fetch(requestURL).catch((err) => error = err)
  if(error !== undefined) {
    console.log('error response monthDays = ', error)
    return
  }

  let monthDays = []

  monthDays = await responseMonthDays.json().catch((err) => error = err)
  if(error !== undefined) {
    console.log('error monthDays = ', error)
    return
  }
  
  if(monthDays.length&&monthDays.length > 0) {
    return monthDays
  }

  //return fresh

}

function renderJournals(journals, title) {

  if(!journals) return

  const month1contentDiv = document.querySelector("#month-1-content");

  const headerMonth = `
    <div class="product-head">
      <h2 class="h2 product-title">${title}</h2>
      <a href="month.html" class="product-link">Все номера</a>
    </div>
    <div class="product-list">
  `

  month1contentDiv.innerHTML = headerMonth + journals.map((el) => {

    const src = prepareURL(`https://identity.developers.kp.house/pdf/${el.preview}`)

    return `
        <div class="product-item">
          <div class="image-wrapper">
            <a href="#">
              <img class="image" src="${src}" alt="">
            </a>
          </div>
          <div class="product-text">${el.date}</div>
        </div>
      `
  }).join() +  `</div>`

  

}


async function preparePage() {

  allRegions = await getAllRegions().catch(function(error) {  
    console.log(error);
    throw error
  }); //mockRegions()
  region = allRegions[0]
  renderRegionsList()

  allJournals = await getAllJournals().catch(function(error) {  
    console.log(error);
    throw error
  }); //mockJournals()
  journal = allJournals[0]
  renderJournalsList()
  renderCurrentJournal()

  date = new Date()

  renewContent()

}

function onchangeDate(e) {
  date = new Date(e.target.value)
}

async function showJournals() {
  
  const month = date.getMonth()+1
  const year = date.getFullYear()
  let error

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/pages/previews?month=${month}&year=${year}&region=${region.code}&journal=${journal.code}`);

  const responseMonthDays = await fetch(requestURL).catch((err) => error = err)
  if(error !== undefined) {
    console.log('error response monthDays = ', error)
    return
  }

  const monthDays = await responseMonthDays.json().catch((err) => error = err)
  if(error !== undefined) {
    console.log('error monthDays = ', error)
    return
  }
  
  console.log('monthDays = ', monthDays)
   

}

async function showRecent() {
  
  const month = date.getMonth()+1
  const year = date.getFullYear()
  let error

  const requestURL = prepareURL(`https://identity.developers.kp.house/pdf/pages/previews?month=${month}&year=${year}&region=${region.code}&journal=${journal.code}`);

  const responseMonthDays = await fetch(requestURL).catch((err) => error = err)
  if(error !== undefined) {
    console.log('error response monthDays = ', error)
    return
  }

  const monthDays = await responseMonthDays.json().catch((err) => error = err)
  if(error !== undefined) {
    console.log('error monthDays = ', error)
    return
  }
  
  console.log('monthDays = ', monthDays)
   

}

preparePage();
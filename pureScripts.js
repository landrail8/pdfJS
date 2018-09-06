


function getSortOptionsData(listNews) {    
  return Object.keys(listNews[0]).map((el) => `<option value="${el}">${el}</option>`).toString();
}

function getSortedNewsData(sortDirection, sortItem, listNews) {
  return listNews.sort((a,b) => {
    let comparedSign = 0;        
    if (a[sortItem] > b[sortItem]) {
    comparedSign = 1;
    }
    if (a[sortItem] < b[sortItem]) {
    comparedSign = -1;
    }

    if (sortDirection === 'asc') {
    return comparedSign;
    } else {
    return -1*comparedSign;
    }        
  });
}

function generateURLData(element) {
  let URL = element.url;
  if (!URL) {
    switch (element["@class"]) {
      case 10:
        URL = `/online/news/${element["@id"]}/`;
        break;
      case 13:
        URL = `/daily/${element["@id"]}/${element["@id"]}/`;
        break;
      default:
        throw new Error('Sorry, cant make url');
    }
  }
  return URL;
}

function prepareNewsData(element) {
  let news = {};
  if (element.author) {
    news.authorNews = element.author[0].name;
  } else {
    news.authorNews = '';
  }  
  news.id = element["@id"];
  news.descriptionNews = element.ru.description;
  news.dateNews = element.meta[3].value; //date of publication !!!! ПРОВЕРИТЬ!!!
  news.titleNews = element.ru.title;
  news.urlNews = generateURLData(element);
  return news;
}

function makeListNews(responseObject, countNews) {

  const news = responseObject.childs.slice(0, countNews);
  listLastNews = news.map((element) => prepareNewsData(element));

  //console.log(responseObject);

  return listLastNews;
}

/* function makeGetContent(fetch, fn) {
  return function() {
    return fn.apply(null, arguments); //(__COUNT_NEWS, __URL_SPORT, fetchMethod);
  }
} */

function checkResponseFormat(reject, response) {

  if (!response) reject(new Error("Ответ сервера не получен"));
  if (!('json' in response)) reject(new Error("В ответе сервера нет json-функции"));

}

function checkResponseFormatAwait(response) {

  if (!response) throw new Error("Ответ сервера не получен");
  //reject(new Error("Ответ сервера не получен"));
  if (!('json' in response)) throw new Error("В ответе сервера нет json-функции");

}
/* 
function checkObjectFormat(reject, responseObject) {
  
  if (!responseObject) reject(new Error("Данные пустые"));
  if (!responseObject.childs) reject(new Error("В данных нет списка статей"));
  if (!Array.isArray(responseObject.childs)) reject(new Error("Список статей не массив"));
  if (responseObject.childs.length === 0) reject(new Error("Список статей пуст"));

  const firstArticle = responseObject.childs[0];

  if (!(firstArticle !== null && typeof firstArticle === 'object')) reject(new Error("Статья не является объектом"));
  if (!('@class' in firstArticle)) reject(new Error("Статья не имеет обязательного поля @class"));
  if (!('@id' in firstArticle)) reject(new Error("Статья не имеет обязательного поля @id"));
  if (!firstArticle.ru || firstArticle.ru.title) reject(new Error("Статья не имеет обязательного поля Заголовок"));
  if (!firstArticle.ru || firstArticle.ru.description) reject(new Error("Статья не имеет обязательного поля Описание"));
  if (!firstArticle.meta[3].value) reject(new Error("Статья не имеет обязательного поля Дата публикации"));
 
} */

function checkByJSONschema(reject, response) {

  var newsSchema = {
    "title": "Check JSON",
    "description": "Check JSON from backend",
    "type": "object",
    "properties": {
      "childs": {
        "description": "array of articles",
        "type": "array",
        "minItems": 10,
        "items": {
          "type": "object",
          "properties": {
            "@id": {
                "description": "The unique identifier for an article",
                "type": ["integer", "string"]
            },
            "@class": {
                "type": ["string", "integer"]
            },
            "ru": {
              "type": "object",
              "properties": {
                "description": {
                    "description": "Description of an article",
                    "type": "string"
                },
                "title": {
                  "description": "Title of an article",
                  "type": "string"
                }, 
              },   
            },
            "meta": {
              "description": "Dates of an article",
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "value": {
                    "type": ["string", "integer", "boolean"]
                  }
                }
              },
              "minItems": 4
            },
          },
        },
      }
    }
  };

  var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  var validate = ajv.compile(newsSchema);
  var valid = validate(response);
  if (!valid) {
    console.log(validate.errors);    
    reject(validate.errors);
  };

}

/*const consoleVariants = {
  "Предупреждение" : "warn",
  "Ошибка" : "error",
  "Сообщение" : "log"
}*/

function logger(viewMethod, level, text) {
  /*function getViewFunc(viewMethod) {
    const listViewersFunc = {
      "alert": alert,
      "console": console
    };
    return listViewersFunc[viewMethod];
  };*/
   //console.log("hguyg" + this.alert);
  //  alert3();
  //  console.log("______stwetgdg_");
    console.log("viewMethod--" + viewMethod);


    if (viewMethod === "alert") {
      return alert(`${level} ${text}`);
    };

    // if (viewMethod === "console") {
    //   return console[level](`${text}`);
    // };
}

function curryIt(uncurried) {
  var parameters = Array.prototype.slice.call(arguments, 1);
  //onsole.log("___"+ parameters);
  return function() {
    console.log(parameters+ " --"+ arguments[0] + arguments[1]);
    return uncurried.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
};

//console.log(curryIt(logger, "log"));

const methodConsole = curryIt(logger, "console");
const methodConsoleError = curryIt(logger, "console", "error");
const methodConsoleWarning = curryIt(logger, "console", "warn");

//const methodAlert = curryIt(logger, "alert");
/*const messageAlertError = methodAlert("error");
const messageAlertWarning = methodAlert("warn");*/


function getContentPromise(__COUNT_NEWS, __URL_SPORT, method) {
  return new Promise((resolve, reject) => {
      method(__URL_SPORT)
      .then(response => {        

        if (method === fetch) {
          checkResponseFormat(reject, response);
          return response.json();
        }
        if (method === XHR) {
          return JSON.parse(response);
        }
        //console.log(JSON.parse(response));
        //checkResponseFormat(reject, response);

        
      })
      .then(responseObject => {

        // checkObjectFormat(reject, responseObject); 
        checkByJSONschema(reject, responseObject);
        makeListNews(responseObject, __COUNT_NEWS);
        
        logger("console", "log", "Everything is fine (logger)");
        methodConsole("log", "Everything is fine (methodConsole)");
        methodConsoleError("Это ошибка! (methodConsoleError)");
        //messageLogWarning("Это предупреждение!");
        //messageAlertError("Страшная ошибка!")
        
        resolve(listLastNews);    

      })
      .catch(err => reject(err));
  });
}

async function getContent(__COUNT_NEWS, __URL_SPORT, method) {
  //try {
    let response = await method(__URL_SPORT);
    let responseObject;
    if (method === fetch) {
      checkResponseFormatAwait(response);
      responseObject = await response.json();
    }
    if (method === XHR) {
      responseObject = await JSON.parse(response);
    }
    //checkByJSONschema(responseObject);

    const listLastNews = makeListNews(responseObject, __COUNT_NEWS);
    return listLastNews;
    
  // }
  // catch(e) {

  // }
  

    
  // return new Promise((resolve, reject) => {
  //     method(__URL_SPORT)
  //     .then(response => {        
  //       if (method === fetch) {
  //         checkResponseFormat(reject, response);
  //         return response.json();
  //       }
  //       if (method === XHR) {
  //         return JSON.parse(response);
  //       }
  //     })
  //     .then(responseObject => {
  //       checkByJSONschema(reject, responseObject);
  //       makeListNews(responseObject, __COUNT_NEWS);
  //       resolve(listLastNews);  
  //     })
  //     .catch(err => reject(err));
  // });
}

function getContentXHR(__COUNT_NEWS, __URL_SPORT) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', __URL_SPORT);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
  
    // по окончании запроса доступны:
    // status, statusText
    // responseText, responseXML (при content-type: text/xml)
  
    if (this.status != 200) {
      // обработать ошибку
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    }
  
    // получим результат из this.responseText
    

  }
}

function XHR(__URL_SPORT) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', __URL_SPORT);
    

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return; //пока ждём

      // по окончании запроса доступны:
      // status, statusText
      // responseText, responseXML (при content-type: text/xml)    
      if (this.status != 200) {
        // обработать ошибку
        reject(new Error('ошибка: ' + (this.status ? this.statusText : 'запрос не удался')));
        return;
      }
      resolve(this.responseText);
    }
    xhr.send();
  })
}

function lastNews(__COUNT_NEWS, __URL_SPORT) {

  try {
   getContent(__COUNT_NEWS, __URL_SPORT, fetch)
    .then((news) => renderAllNews(news))
  }
  catch(err) {
    alert(err)
  };
}
if (typeof window === 'undefined') {
  exports.getSortOptionsData = getSortOptionsData;
  exports.getSortedNewsData = getSortedNewsData;
  exports.generateURLData = generateURLData;
  exports.prepareNewsData = prepareNewsData;
  exports.getContent = getContent;
  exports.logger = logger;
}


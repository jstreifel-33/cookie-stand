'use strict'; //required for submission

//    GENERAL TOOLS TO MAKE LIFE EASIER    //

function newChildNode(parent, child, content){
  let cell = document.createElement(child);
  cell.innerText = content;
  parent.appendChild(cell);
}

//    FRAMEWORK STUFF FOR APP FUNCTIONALITY   //


//Shop constructor. Accepts array in format we already use: [location, minCust, maxCust, cookiesPerSale]
function CookieShop(newLocation) {
  this.location = newLocation[0];
  this.minCust = newLocation[1];
  this.maxCust = newLocation[2];
  this.cookiePerSale = newLocation[3];
  this.hourlyCust = [];
  this.openHour = 6;
  this.closeHour = 20;
  shopLocations.push(this);
}

//Define CookieShop methods()
//Generate a number of customers for each hour, indexed at 0
CookieShop.prototype.custPerHour = function(){
  this.hourlyCust = [];
  for (let i = this.openHour; i < this.closeHour; i++){
    let customers = this.minCust + Math.floor(Math.random() * (this.maxCust - this.minCust + 1));
    this.hourlyCust.push(customers);
  }
};

//Calculate cookies sold in 1 hour. Runs in this.dailySales
CookieShop.prototype.hourCookies = function (hourCust){
  let cookies = Math.round(this.cookiePerSale * hourCust);
  return cookies;
};

//Generate daily sales. Store in this.todaySales
CookieShop.prototype.dailySales = function (){
  let daySales = []; //initialize empty array for storage of daily sales data
  let totalSales = 0; //initialize total sales for storage

  //step through each hour (0600 to 2000) of operation. Generate sales data
  for (let i = this.openHour, j = 0; i < this.closeHour; i++, j++){
    let hourSales = [];

    //log the time - from 24 hour clock to 12 hour clock
    if(i < 12 && i !== 0){
      hourSales[0] = i;
      hourSales[1] = 'am';
    }else if(i === 12){
      hourSales[0] = i;
      hourSales[1] = 'pm';
    }else if(i === 0){
      hourSales[0] = 12;
      hourSales[1] = 'am';
    }else{
      hourSales[0] = i - 12;
      hourSales[1] = 'pm';
    }

    //log cookies sold. performs hourCookies method on number of customers that hour (stored in hourlyCust)
    hourSales[2] = this.hourCookies(this.hourlyCust[j]);
    //Update total
    totalSales += hourSales[2];

    //store the hour's data and loop
    daySales[j] = hourSales;
  }

  //Add daily total to end of array.
  daySales[daySales.length] = ['Total', null, totalSales]; //Total array length changed to match daily sales. Number goes in array[3] to render method easier to write

  //Store daily sales in todaySales property.
  this.todaySales = daySales;
};

//Generate Sales Data
CookieShop.prototype.generateData = function(){
  this.custPerHour();
  this.dailySales();
};

//Render header with times and total column. Set timeHeader to state = true.
CookieShop.prototype.renderHeader = function(){
  let parentEl = document.getElementById('time');

  for(let i = 0; i < this.todaySales.length; i++){
    //Set each column to say time based on todaySales property.
    if(i < (this.todaySales.length - 1)){
      let text = this.todaySales[i][0] + ':00' + this.todaySales[i][1];
      newChildNode(parentEl, 'th', text);
    //Set last column to say Daily Location Total
    }else{
      let text = 'Daily Location Total';
      newChildNode(parentEl, 'th', text);
    }
    timeHeader = true;
  }
};

//Render this.todaySales data to appropriate row. Renders heading row if missing
CookieShop.prototype.renderData = function(){
  if (!timeHeader){this.renderHeader();}
  //Add name to left header
  let parentEl = document.getElementById(this.location);
  let text = this.location;
  newChildNode(parentEl, 'th', text);
  //step through hourly sales
  for (let i = 0; i < this.todaySales.length; i++){
    let text = this.todaySales[i][2];
    newChildNode(parentEl, 'td', text);
  }
};


//    CREATION AND STORAGE OF SHOP OBJECTS    //

//Create array to store shop objects. This will allow storage/tracking of shops later without needing variable names.
let shopLocations = [];

//use newShop for temp storage of shop data. Can be used later for adding shops.
let newShop = [];

//Make Shops
newShop = ['Seattle', 23, 65, 6.3];
new CookieShop(newShop);

newShop = ['Tokyo', 3, 24, 1.2];
new CookieShop(newShop);

newShop = ['Dubai', 11, 20, 2];
new CookieShop(newShop);

newShop = ['Paris', 20, 38, 2.3];
new CookieShop(newShop);

newShop = ['Lima', 2, 16, 4.6];
new CookieShop(newShop);

// console.log(shopLocations);


//    DATA CREATION AND TABLE RENDERING   //

function refreshAllData(){
  for (let i = 0; i < shopLocations.length; i++){
    shopLocations[i].generateData();
  }
}

function renderTable(){
  for (let i = 0; i < shopLocations.length; i++){
    shopLocations[i].renderData();
  }
}

//Find hourly totals. Store in Array and render to table.
function tableTotals(){
  let cookieTotals = [];
  for (let i=0; i < shopLocations.length; i++){
    let currentShop = shopLocations[i];
    for (let j = 0; j < currentShop.todaySales.length; j++){
      if (!cookieTotals[j]){cookieTotals[j] = 0;}
      cookieTotals[j] += currentShop.todaySales[j][2];
    }
  }

  let parentEl = document.getElementById('Totals');
  let totalText = 'Totals';
  newChildNode(parentEl, 'th', totalText);
  for (let i = 0; i < cookieTotals.length; i++){
    let text = cookieTotals[i];
    newChildNode(parentEl, 'td', text);
  }
}

//    ACTION    //

//Initialize timeHeader state. Refresh data and render to table.
let timeHeader = false;
refreshAllData();
renderTable();
tableTotals();

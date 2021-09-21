//  FRAMEWORK STUFF FOR APP FUNCTIONALITY
// GENERAL FUNCTIONS TO MAKE MY LIFE EASIER
function newChildNode(parent, child, content){
  let cell = document.createElement(child);
  cell.innText = content;
  parent.appendChild(child);
}

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
  //return array of all hours' sales
  daySales[daySales.length] = ['Total', null, totalSales]; //Total array length changed to match daily sales. Number goes in array[3] to render method easier to write

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
    if(i < (this.todaySales.length - 1)){
    let text = this.todaySales[i][1] + ":00" + this.todaySales[i][2];
    newChildNode(parentEl, 'th', text);
  }else{
    let text = "Daily Location Total";
    newChildNode(parentEl, 'th', text);
  }
  timeHeader = true;
}

//Render this.todaySales data to appropriate row. Renders heading row if missing
CookieShop.prototype.renderData = function(){
  if (!timeHeader){this.renderHeader()};
  let parentEl = document.getElementById(this.location);
  let text = this.location;
  newChildNode(parentEl, 'th', text);
  for (let i = 0; i < this.todaySales.length; i++){
    let text = this.todaySales[i][3];
    newChildNode(parentEl, 'tr', text);
  }
}


//CREATION AND STORAGE OF SHOP OBJECTS
//Add Existing shops shops to an array of shops. This will allow storage/tracking of shops later without needing variable names.
let shopLocations = [];
let newShop = []

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


console.log(shopLocations);

//RENDER SALES DATA VIA TABLE
//Initialize timeHeader state false.
let timeHeader = false;


// CREATE SALES DATA
function refreshAll(){
  for (let i = 0; i < shopLocations.length; i++){
    shopLocations[i].generateData();
  }
}
refreshAll();

//  FRAMEWORK STUFF FOR APP FUNCTIONALITY

//Shop constructor. Accepts array in format we already use: [location, minCust, maxCust, cookiesPerSale]
function NewShop(newLocation) {
  this.location = newLocation[0];
  this.minCust = newLocation[1];
  this.maxCust = newLocation[2];
  this.cookiePerSale = newLocation[3];
}

NewShop.prototype.custPerHour = function(){
  let customers = this.minCust + Math.floor(Math.random() * (this.maxCust - this.minCust + 1));
  return customers;
};

//Add Existing shops shops to an array of shops
let shopLocations = [];

let seattle = ['Seattle', 23, 65, 6.3];
shopLocations.push(NewShop(seattle));

let tokyo = ['Tokyo', 3, 24, 1.2];
shopLocations.push(NewShop(tokyo));

let dubai = ['Dubai', 11, 20, 2];
shopLocations.push(NewShop(dubai));

let paris = ['Paris', 20, 38, 2.3];
shopLocations.push(NewShop(paris));

let lima = ['Lima', 2, 16, 4.6];
shopLocations.push(NewShop(lima));

console.log(shopLocations);

//Caluclate cookies sold in 1 hour
function hourCookies(locObj){
  let cookies = Math.floor(locObj.cookiePerSale * locObj.custPerHour());
  return cookies;
}

//Generate daily sales
function dailySales (locObj){
  let daySales = []; //initialize empty array for storage of daily sales data
  let totalSales = 0; //initialize total sales for storage

  //step through each hour (0600 to 2000) of operation. Generate sales data
  for (let i = 6, j = 0; i < 20; i++, j++){
    let hourSales = [];

    //log the time - from 24 hour clock to 12 hour clock
    if(i < 12 && i !== 0){
      hourSales[0] = i;
      hourSales[1] = 'am';
    }else if(i == 12){
      hourSales[0] = i;
      hourSales[1] = 'pm';
    }else if(i == 0){
      hourSales[0] = 12;
      hourSales[1] = 'am';
    }else{
      hourSales[0] = i - 12;
      hourSales[1] = 'pm';
    }

    //log cookies sold
    hourSales[2] = hourCookies(locObj);
    //Update total
    totalSales += hourSales[2];

    //store the hour's data and loop
    daySales[j] = hourSales;
  }
  //return array of all hours' sales
  daySales[daySales.length] = ['Total: ',totalSales]; //total will be only array with length = 2. Will be at end of daySales array.

  locObj.todaySales = daySales;
}

//  ADDING SALES DATA TO SALES DOCUMENT VIA LABELLED DIV

function addData(locObj) {
  //Create a heading with the location of the shop
  let locName = document.createElement('p');
  locName.innerText = locObj.location;
  let container = document.getElementById('sales');
  container.appendChild(locName);

  //Start a ul element to contain hourly count + total
  let salesData = document.createElement('ul');
  let hourlySales = locObj.todaySales;

  //Step through todaySales data to publish each hour to page
  for (let i = 0; i < locObj.todaySales.length; i++){
    let hour = document.createElement('li');
    //Indexes 0 through 'length - 2' contain hourly data
    if(i < (locObj.todaySales.length - 1)){
      let sales = hourlySales[i];
      let text = sales[0] + sales[1] + ': ' + sales[2] + ' cookies';
      hour.innerText = text;
    //Index 'length - 1' contains total cookies sold.
    }else if(i === (locObj.todaySales.length - 1)){
      let totSales = hourlySales[i];
      let text = totSales[0] + totSales[1] + 'cookies';
      hour.innerText = text;
    }
    salesData.appendChild(hour);
  }
  //Add <ul> with each hour and total underneath heading.
  container.appendChild(salesData);
}

// CREATE AND ADD SALES DATA FOR ALL SHOPS UPON LOAD

// dailySales(seattleShop);
// addData(seattleShop);

// dailySales(tokyoShop);
// addData(tokyoShop);

// dailySales(dubaiShop);
// addData(dubaiShop);

// dailySales(parisShop);
// addData(parisShop);

// dailySales(limaShop);
// addData(limaShop);

//Shop creation template
const shop = {
  location: '',
  minCust: 0,
  maxCust:0,
  cookiePerSale: 0,
  custPerHour: function (){
    let customers = this.minCust + Math.floor(Math.random() * (this.maxCust - this.minCust + 1))
    return customers;
  },
};

//Shop add function
function createShop(locArr){
  let newShop = Object.assign({}, shop);
  newShop.location = locArr[0];
  newShop.minCust = locArr[1];
  newShop.maxCust = locArr[2];
  newShop.cookiePerSale = locArr[3];

  return newShop;
}

//Add current shops
let seattle = ['Seattle', 23, 65, 6.3];
let seattleShop = createShop(seattle);

let tokyo = ['Tokyo', 3, 24, 1.2];
let tokyoShop = createShop(tokyo);

let dubai = ['Dubai', 11, 20, 2];
let dubaiShop = createShop(dubai);

let paris = ['Paris', 20, 38, 2.3];
let parisShop = createShop(paris);

let lima = ['Lima', 2, 16, 4.6];
let limaShop = createShop(lima);


//create function for calculating cookies sold per hour
//6 AM to 8 PM (exclusive). Account for AM/PM. 6:00 to 20:00.
//calculate total
//return array (15 length)
//each hour = [hour, AM/PM, cookies sold]

//Caluclate cookies sold in 1 hour
function hourCookies(locObj){
  let cookies = Math.floor(locObj.cookiePerSale * locObj.custPerHour());
  return cookies;
}

//Generate daily sales
function daySales (locObj){
  let daySales = [];  //initialize empty array for storage of daily sales data
  let totalSales = 0;  //initialize total sales for storage
  for (let i = 6, j = 0; i < 20; i++, j++){  //for loop that steps through from open hour to close hour
    let hourSales = [];

    //log the time
    if(i < 13){
      hourSales[0] = i;
      hourSales[1] = 'am';
    }else{
      hourSales[0] = i-12;
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


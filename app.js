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

function createShop(locArr){
  let newShop = Object.assign({}, shop);
  newShop.location = locArr[0];
  newShop.minCust = locArr[1];
  newShop.maxCust = locArr[2];
  newShop.cookiePerSale = locArr[3];

  return newShop;
}

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
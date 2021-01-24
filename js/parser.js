const puppeteer = require("puppeteer");
const jsdom = require("jsdom");

let resultArray = [];

async function findProduct(product) {
  const shops = ['metro', 'varus', 'eko']; //, 'auchan', 'megamarket', 'novus', 'furshet', 'citymarket'];
  const browser = await puppeteer.launch();
  await visitShops(shops);
  browser.close();

  async function visitShops(shops) {
    for (let shop of shops) {
      await parsePage(browser, shop, product);
    }
  }
}

async function parsePage(browser, shop, product) {
  const page = await browser.newPage();
  await page.goto(`https://${shop}.zakaz.ua/uk/search/?q=${product}`);
  const HTMLStr = await page.evaluate(() => document.body.innerHTML);
  const DOM = new jsdom.JSDOM(HTMLStr);
  const productsArray = DOM.window.document.querySelectorAll(".products-box__list-item");

  productsArray.forEach((item, index) => {
    const obj = {};
    obj.img = item.querySelector("img").src;
    obj.name = item.querySelector("span.product-tile__title").textContent;
    obj.price = item.querySelector("span.Price__value_caption").textContent;
    obj.link = `https://${shop}.zakaz.ua/uk` + item.querySelector('a').href;
    console.log(`${shop} ${index + 1}) ${obj.name}, ${obj.price}, ${obj.img}, ${obj.link}`);
    resultArray.push(obj);
  });
}

(async () => {
  await findProduct('крупа гречана');
})();
const { Builder, Capabilities, By } = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await (await driver).get('http://127.0.0.1:5500/movieList/index.html');
})

afterAll(async () => {
  await (await driver).quit()
})

test('verify that a movie can be crossed off', async() => {
  await (await driver).findElement(By.xpath('//input')).sendKeys("Lion King\n")
  await (await driver).sleep(3000)
  await (await driver).findElement(By.xpath('//li/span[text()="Lion King"]')).click();
  expect('Lion King watched!').toBeTruthy()
  await (await driver).sleep(3000)
})

test('verify that a movie can be added after it has been crossed off', async()=> {
  await (await driver).findElement(By.xpath('//input')).sendKeys("Nemo\n")
  await (await driver).sleep(3000)
  await (await driver).findElement(By.xpath('//li/span[text()="Nemo"]')).click();
  await (await driver).sleep(3000)
  await (await driver).findElement(By.xpath('//li/span[text()="Nemo"]')).click();
  expect('Nemo added back!').toBeTruthy()
  await (await driver).sleep(3000)
})

test('verify that a movie can be deleted', async()=> {
  await (await driver).findElement(By.xpath('//input')).sendKeys("Little Mermaid\n")
  await (await driver).sleep(3000)
  await (await driver).findElement(By.xpath('//*[@id="LittleMermaid"]')).click()
  expect('class="hide"').toBeTruthy()
  await (await driver).sleep(3000)
})
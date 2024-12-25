const puppeteer = require('puppeteer'); // 引入 puppeteer
const { Client, Events, GatewayIntentBits, Message } = require('discord.js');

async function calculateDifference(/*channel*/)
    {
  // 启动浏览器
  const browser = await puppeteer.launch();
  // 打开新页面
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  // 导航到目标网页

  await page.goto('https://solana.vaultka.com/', { waitUntil: 'networkidle0' });

    

  const button = await page.locator('body > div.relative.min-h-screen > div[class*="px-[15px]"][class*="py-[30px]"] > div > div > div.w-full > div > div > div:nth-child(2)');

  await page.waitForSelector('button', { state: 'visible' });


  // 点击中间的按钮（第三个按钮，因为索引从0开始）
  await button.click(); // nth(1) 选择第二个元素，即中间的按钮

  const usdcValue = await page.evaluate(() => {
    // 在这里，我们选择包含 "USDC" 的元素，并返回它的文本内容
    const usdcElement = document.querySelector("body > div.relative.min-h-screen > div.px-\\[15px\\].py-\\[30px\\] > div > div > div.w-full > div > div.flex.w-full.flex-col.items-center.gap-\\[20px\\] > div.min-h-\\[200px\\].w-full.transition-all.duration-300 > div > div.relative.rounded-\\[10px\\].border-\\[1px\\].border-\\[rgba\\(0\\,0\\,0\\,\\.1\\)\\].p-\\[12px_15px\\] > div > div:nth-child(3) > div > p")
    return usdcElement.textContent;
  });

  const borrow = await page.evaluate(() => {
    // 在这里，我们选择包含 "USDC" 的元素，并返回它的文本内容
    const usdcElement = document.querySelector("body > div.relative.min-h-screen > div.px-\\[15px\\].py-\\[30px\\] > div > div > div.w-full > div > div.flex.w-full.flex-col.items-center.gap-\\[20px\\] > div.min-h-\\[200px\\].w-full.transition-all.duration-300 > div > div.relative.rounded-\\[10px\\].border-\\[1px\\].border-\\[rgba\\(0\\,0\\,0\\,\\.1\\)\\].p-\\[12px_15px\\] > div > div:nth-child(4) > div > p")
    return usdcElement.textContent;
  });

  // 使用正则表达式提取数值部分
let value1 = parseFloat(usdcValue.match(/\d+\.\d+/)[0]);
let value2 = parseFloat(borrow.match(/\d+\.\d+/)[0]);

// 计算差值
let difference = value1 - value2;

// 输出差值
console.log(difference);
if(difference > 0){
    // channel.send('vaultka diference detected : ' + difference);
}
  // 关闭浏览器
  await browser.close();
}

// const client = new Client({
//     intents: [GatewayIntentBits.Guilds],
// });

// try {
//     client.login('xxx');
// } catch (error) {
//     console.log(error);
// }


// client.on('ready', () => {
    // console.log('client ready');
    // const channel = client.channels.cache.get("1295016600310779977");
    setInterval(() => calculateDifference(/*channel*/), 30000);
    calculateDifference(/*channel*/)
// });
const puppeteer = require('puppeteer');

async function captureNetworkRequests(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Intercept network requests
  page.on('request', (request) => {
    request.continue();
  });

  // Log responses
  page.on('response', (response) => {
    console.log(`URL: ${response.url()}`);
    console.log(`Status: ${response.status()}`);
    console.log(`Headers: ${JSON.stringify(response.headers(), null, 2)}`);
  });

  // Navigate to the specified URL
  await page.goto(url);

  // Close the browser
  await browser.close();
}

// Specify the URL you want to capture requests from
const targetUrl = 'https://tmlearn.ul.ac.za';

// Call the function with the target URL
captureNetworkRequests(targetUrl);

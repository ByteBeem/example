const puppeteer = require('puppeteer');

async function capturePostRequests(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Intercept network requests
  page.on('request', (request) => {
    if (request.method() === 'POST') {
      // Log POST request information
      console.log(`POST Request URL: ${request.url()}`);
      console.log(`POST Request Headers: ${JSON.stringify(request.headers(), null, 2)}`);
      console.log(`POST Request Payload: ${JSON.stringify(request.postData(), null, 2)}`);
    }

    request.continue();
  });

  // Navigate to the specified URL
  await page.goto(url);

  // Close the browser
  await browser.close();
}

// Specify the URL you want to capture POST requests from
const targetUrl = 'https://tmlearn.ul.ac.za';

// Call the function with the target URL
capturePostRequests(targetUrl);

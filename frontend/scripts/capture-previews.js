const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const PROJECTS = [
  { name: 'sharwings-ecommerce', url: 'https://sharwings-kvqz.vercel.app/' },
  { name: 'barim-dubai', url: 'https://barim-dubai.vercel.app/' },
  { name: 'realestate-al-ain', url: 'https://realestate-al-ain.vercel.app/' },
  { name: 'resumeassist', url: 'https://resumeass.vercel.app/' },
  { name: 'campus-market', url: 'https://campus-market.vercel.app/' },
  { name: 'homeasset', url: 'https://homeassest.vercel.app/' },
  { name: 'site-qr', url: 'https://site2-qr.vercel.app/' },
  { name: 'umrah-companions', url: 'https://umrahcompanions-2b9p.vercel.app/' },
  { name: 'travel-bare', url: 'https://travel-bare.vercel.app/' },
  { name: 'homelane', url: 'https://homelane-zpj1.vercel.app/' },
  { name: 'portfolio', url: 'https://muteebmasoodi.vercel.app/' },
  { name: 'resume-optimizer', url: 'https://resume-optimizer-delta.vercel.app/' },
  { name: 'trip-impression', url: 'https://tripimpression.vercel.app/' },
  { name: 'cadhauz', url: 'https://www.cadhauz.com/' },
  { name: 'baraem-abudhabi', url: 'https://baraemabudhabi.ae/' },
  { name: 'tourtravel-al-ain', url: 'https://tourtravel-al-ain.vercel.app/' },
  { name: 'realestate-demo-framer', url: 'https://realestate-demo-framer.vercel.app/' },
  { name: 'sharwings-store', url: 'https://sharwings.in/' },
];

function isMissingChromeError(error) {
  const message = String(error && error.message ? error.message : error);
  return (
    message.includes('Could not find Chrome') ||
    message.includes('Failed to launch the browser process')
  );
}

function tryInstallChrome() {
  try {
    console.log('Chrome not found for Puppeteer. Installing browser binary...');
    execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.warn('Chrome install failed. Continuing build without preview capture.');
    console.warn(`Reason: ${error.message}`);
    return false;
  }
}

async function createBrowser() {
  try {
    return await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  } catch (error) {
    if (!isMissingChromeError(error)) throw error;
    const installed = tryInstallChrome();
    if (!installed) return null;
    return puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  }
}

(async () => {
  if (process.env.SKIP_PREVIEW_CAPTURE === '1') {
    console.log('Skipping preview capture (SKIP_PREVIEW_CAPTURE=1).');
    return;
  }

  const dir = path.join(__dirname, '../public/previews');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await createBrowser();
  if (!browser) return;

  for (const project of PROJECTS) {
    // Skip if already captured
    const outputPath = path.join(dir, `${project.name}.jpg`);
    if (fs.existsSync(outputPath)) {
      console.log(`\u23ed\ufe0f  Skipping ${project.name} \u2014 already exists`);
      continue;
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({
        path: outputPath,
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
      console.log(`\u2705 ${project.name}.jpg`);
    } catch (e) {
      console.log(`\u274c ${project.name} failed: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n\u2705 Done. Check public/previews/');
})().catch((error) => {
  // Do not fail production build for preview generation issues.
  console.warn('Preview capture failed, continuing build.');
  console.warn(error.message);
});

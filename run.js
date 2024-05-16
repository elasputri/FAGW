const bluebird = require("bluebird");
const fs = require("fs");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const puppeteer = require("puppeteer-extra");
const useProxy = require("@stableproxy/puppeteer-page-proxy");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const IDRIVE_ENPOINT = "d4b6.or4.idrivee2-60.com";
const IDRIVE_ACCESS_KEY_ID = "5ce3lLJdmdBVLqcX7RPD";
const IDRIVE_SECRET_ACCESS_KEY = "a6USwSGtrxBDlV2n19XUJWcMt69ivtpu5zm63Hfi";
const BUCKET_NAME = "alchemy-dwi-cookies";

const CONCURENCY = 2;
const HEADLESS = false; // HEADLESS  false or false;

const USE_PROXY = false;
const PROTOCOL = "http";
const PROXY_HOST = "gate.smartproxy.com";
const PROXY_PORT = "7000";
const PROXY_USERNAME = "spoj3coqzt";
const PROXY_PASSWORD = "ttZaB35y17tG~Ocsdw";

const dataAccount = `
keifergoninon@gasss.net,@@Masuk123#oZ,0xc79d77d5f9d4678573f0de5c580fdcb844d77f1e
lgperson@gasss.net,@@Masuk123#oZ,0xe168635159131c4b36f5894fcbf1dd29b62ecfc0
keoki123@gasss.net,@@Masuk123#oZ,0x5139ac00e47cfcdf27ab2029c9f024ef50fe2881
accraboy@gasss.net,@@Masuk123#oZ,0x73a2323ebbaed550ea3e551c66d514c3e43fba16
sofiabrooking@gasss.net,@@Masuk123#oZ,0x363fecc67c0800ac3009e86c604080570e525d85
xfawag@gasss.net,@@Masuk123#oZ,0x3d2e669bc26752550a712f7260583134d9dcd601
rgm14@gasss.net,@@Masuk123#oZ,0x31da02f318df5146a5199cb090fc32970802105b
quispy@gasss.net,@@Masuk123#oZ,0xd0b2844173b061d84afb852e630d781134d2c77c
malevanton@gasss.net,@@Masuk123#oZ,0xcfb57e08304466b19078ad3ff6c3e68a02e41e9a
aclens@gasss.net,@@Masuk123#oZ,0x1c84fd71ee87289cc2a6dc44eaad0d1ac9faae9d
dalindo@gasss.net,@@Masuk123#oZ,0xb3a9c48d62d7a0e7a5fd4864f372036dbc4f95f8
fabio9911@gasss.net,@@Masuk123#oZ,0x58586039ebe073a22f294c1324ba8e49de55445a
sperero@gasss.net,@@Masuk123#oZ,0xb547b3b7823b74acc83ecc201f9b11cafc13eec2
actionank@gasss.net,@@Masuk123#oZ,0xef4c38e096a862ac0ea734754a25dca8216349cc
vovalevitskiy@gasss.net,@@Masuk123#oZ,0xafe4b5646a2100a1c73d4817f96855cba83275b4
brian3902@gasss.net,@@Masuk123#oZ,0x4d9741bafb51c11847029ee30b9b5a1fd77d070f
mjellisxxx@gasss.net,@@Masuk123#oZ,0x19e3e98006862585ed416013f52d2ef734181390
ezrabenun@gasss.net,@@Masuk123#oZ,0xbef759aa13431e20183805c922cf829c7f592764
petekirby42@gasss.net,@@Masuk123#oZ,0x0639019fc26d327a03cbc3e130399e1bc639e82f
kichekov@gasss.net,@@Masuk123#oZ,0x76dedbd09afeb2af9190e88d2210e1d78e53b256
vikakrestenkova2000@gasss.net,@@Masuk123#oZ,0xe74a3d80bb780ce9264ac275630bf1ac88cd5b5a
gypsy6900@gasss.net,@@Masuk123#oZ,0x2d89137db86d063808cca4bc9a1a1d914ef38b2d
carmelo2011@gasss.net,@@Masuk123#oZ,0x65c4b558e64bb79c3398296606c25feedfa053e8
6gk34xv0@gasss.net,@@Masuk123#oZ,0x135ae14a65be715c8654e0a1b4a59755088fc3ac
carolinemscgu@gasss.net,@@Masuk123#oZ,0x71ab5c2f37d4614053b5089337f4f1d7bfbc5b90
faul09@gasss.net,@@Masuk123#oZ,0xcd254f59b907962f1c3eb8ef785615ae52f1254b
pavelmoiseew2012@gasss.net,@@Masuk123#oZ,0x1762154c589a48941e458da36a628b95b6ef9a2d
wotwotupppu@gasss.net,@@Masuk123#oZ,0x4e5b822805101a31e06447a2f394704eab5deff3
arelav58@gasss.net,@@Masuk123#oZ,0x871cbe7711b5150ee613445d269a4fc8f50fc433
longwolf79@gasss.net,@@Masuk123#oZ,0x0261fd3f6deaa68720e2fc4fe9036d6a7ddd8742
boss747@gasss.net,@@Masuk123#oZ,0x694c90ac72dbbdf87ff3c4a981a8f3124f7e60cc
tgppass@gasss.net,@@Masuk123#oZ,0x743d03b2918add4b77e12e57f5a7364593a72421
murf4898@gasss.net,@@Masuk123#oZ,0xd0b8ca98e235562eaf439bcc98da7db19312cb56
freash20@gasss.net,@@Masuk123#oZ,0x5734b51821cf7c5b0318eb33261424a1daf23476
texnostroy2@gasss.net,@@Masuk123#oZ,0x4adb13a73b7b3e6a97c5a13813b7dce29c4746e9
nedsher@gasss.net,@@Masuk123#oZ,0xa4a342b37b746c20a7e0fdec85e0c6d2c12198cc
sarita9@gasss.net,@@Masuk123#oZ,0x4683daa2463641c418099e9c4dc5835758f8ee23
marcotheo@gasss.net,@@Masuk123#oZ,0xd7797a25e03de2cd027cecec6d11985c9f380d6d
romaw2001@gasss.net,@@Masuk123#oZ,0xf2be7b8ab2a6c65f245726082af0190181e488bd
visionary1@gasss.net,@@Masuk123#oZ,0xff0da37ae63f1b4879194aa5d0f74ee54076dceb
blindny@gasss.net,@@Masuk123#oZ,0x82cc05edecbc78e533d9f30bef565ef4035c42bf
markjk75@gasss.net,@@Masuk123#oZ,0xcd72aa5da2a8e45c991822cee8d01fd2814ac8f5
traviskey1@gasss.net,@@Masuk123#oZ,0xcdae63c6c2938407856c43b8a112ee95dbb11486
paulobote@gasss.net,@@Masuk123#oZ,0x015d3cb9f3db89c9fe738a5629c361910d28c3ca
jasn@gasss.net,@@Masuk123#oZ,0x523912f1025b23bc353738cfeac37527a6a7b1e2
tandydunn@gasss.net,@@Masuk123#oZ,0x4d975712ee149658228ab719c1cc8663d8d283a1
angelunaver@gasss.net,@@Masuk123#oZ,0xf8736bc3aafa6fa1288074f84a6ecb0935374adb
richardroesler@gasss.net,@@Masuk123#oZ,0xa243569a3eb09760d0a5a3548cd9f0d250342096
lllong@gasss.net,@@Masuk123#oZ,0x0355ed2bbbfc292385d28b54bf0d80a10296f73c
xxerickaxx333@gasss.net,@@Masuk123#oZ,0x568ba8f41858f61f2d9d0279f5965eadfbdd9139
lukerz@gasss.net,@@Masuk123#oZ,0xe7729dcee78bd9ca79c86556cbcd5ea9da146c8a
luisvideo@gasss.net,@@Masuk123#oZ,0xa02c8a485647f77f2b3d8299c69145c1cd33bd24
destineyangel@gasss.net,@@Masuk123#oZ,0xe6d93bc989ac66552deb748ad5e0d604a867598a
ovremya@gasss.net,@@Masuk123#oZ,0xf3f260d93e20516f87a66eee681af3cfc73fea15
inyartyom@gasss.net,@@Masuk123#oZ,0xb328b00e50dc120b9d83155b8b6c7e73e49da643
jimwater@gasss.net,@@Masuk123#oZ,0x11b1ceb2f475381023d0ecead77a398507891ff5
lordspanq@gasss.net,@@Masuk123#oZ,0x4142dc0ddafe00314fc19cd35fc4b64af6874b10
rittera76@gasss.net,@@Masuk123#oZ,0x8d633c72be647de62b75a41477483f62b02e6340
nagljonysh@gasss.net,@@Masuk123#oZ,0x7aff4c86d03ad66b61da71ea15a4d735a85d4985
leytenant2002@gasss.net,@@Masuk123#oZ,0x6f528c220768c57d51afecc299f19c7978f794e0
krin71@gasss.net,@@Masuk123#oZ,0xbfc1d3c6285e0a1de24737343ee94a581150caa1
reorx9@gasss.net,@@Masuk123#oZ,0xaeac15169791e9c3dc7496af10faf1cd2bd4cda3
superzombiemonkey@gasss.net,@@Masuk123#oZ,0x7dcbe1aca9239fe4c60ae4244ede240f8a97a256
kmh03@gasss.net,@@Masuk123#oZ,0xaa47d6bfa38ba36bfcc8fbccb262e82d797c9564
wildbill77@gasss.net,@@Masuk123#oZ,0x4b09dac3d27ea836adcd7322c6224eb1d0a250fd
rneed@gasss.net,@@Masuk123#oZ,0x8da79c2183d15cb6559a7fe8574411fecad9933a
tisbuy@gasss.net,@@Masuk123#oZ,0x72dee9b581ec51b793d160ef165554a3fdd852a9
adebree@gasss.net,@@Masuk123#oZ,0x5028cf213e1f51fc68e5c3fbd579c8713b458baf
curtis40@gasss.net,@@Masuk123#oZ,0x663274bae01555bdb639613ed6b3b829aa0740a1
gothshot@gasss.net,@@Masuk123#oZ,0xdd192aada8bfe9136636794f0eb340af033fe894
pmshanks@gasss.net,@@Masuk123#oZ,0xc1e97dc0dd97933f05a62c4dc571bdffd06ad1b9
svetik550@gasss.net,@@Masuk123#oZ,0xa9952053b0f3fb9c2888696a81c6c94f34399ef8
septembertwo@gasss.net,@@Masuk123#oZ,0xf5f40caa9ca8d22d1f55abb8d49e773982362b2a
bufera2@gasss.net,@@Masuk123#oZ,0x4848de0030392843e0c866210a5b0d804307c7c8
3lvde@gasss.net,@@Masuk123#oZ,0xaf0ab7b037937dceaa264c9bb1e194f8f4489277
emperorabe@gasss.net,@@Masuk123#oZ,0x12283f3077be8d5b54b0abbd42efb1da6f20ab95
olesiy938521@gasss.net,@@Masuk123#oZ,0xefbdc26d52801458f70eca0e825166bfe09474d8
ashbeket@gasss.net,@@Masuk123#oZ,0x6fc678c2f9e034a78f70dcdabed8a240591442d9
prusakovay@gasss.net,@@Masuk123#oZ,0x0845bc36f6166631738d4fcee3a1430ca357a7a7
dimkamrsmile@gasss.net,@@Masuk123#oZ,0x378113525491e169418be57c013a496062e8727a
reggie8631@gasss.net,@@Masuk123#oZ,0xfa45dcaa11c091cfc4b5aba55d88d4fe2fdeeae0
vadikananev@gasss.net,@@Masuk123#oZ,0x24af53631c55f24027e30431bfda6cc5b37b6c29
utrecht65@gasss.net,@@Masuk123#oZ,0xc551da6b315662af61e3d4a752ecf890963659bf
shameenesydow@gasss.net,@@Masuk123#oZ,0xc659c1faaba412d5c4b87c5dcd60754166be7754
jamesy107@gasss.net,@@Masuk123#oZ,0x60cce76842dbd25bde5322ed0dd4a713be277a95
wailsalem@gasss.net,@@Masuk123#oZ,0xc43996abe8ecb0d7078017689c8f70f89ddb7a10
raketaaks@gasss.net,@@Masuk123#oZ,0x065a1ef848c50af37a2c595b563322146d71ff16
6410hott@niceminute.com,@@Masuk123#oZ,0x94918ff9a82e2812ee83b5bd8ebd887dbb5953fd
aleckdocsem@niceminute.com,@@Masuk123#oZ,0x4bd2a77b5dfab2f62f0b67867fe658f57299fee2
kiruson@niceminute.com,@@Masuk123#oZ,0xfba44823c583ae58b1127499fe3c25520d951f0b
bflickin@niceminute.com,@@Masuk123#oZ,0xb6202effff6d1ec46de339b0d683343b076c0448
angeliluv@niceminute.com,@@Masuk123#oZ,0x965e7cda625114ed025932a6b6df026269ea8828
olliewhant@niceminute.com,@@Masuk123#oZ,0xd925960a194d770b5f64586101af99a7f5876009
schugre@niceminute.com,@@Masuk123#oZ,0x5a2619e11ce2b74a5f16c77c3592ff05c49b1b32
akcwalsum03@niceminute.com,@@Masuk123#oZ,0x4e8beef42ec7b3dd63e9ba2fc154d3d598981b33
nurlan070985@niceminute.com,@@Masuk123#oZ,0xc5183520bf2a01bea468a38020586b798e0a42fc
loudcolors@niceminute.com,@@Masuk123#oZ,0x050bb7fef715ba8b88c3a5039a6674a016c190c5
gatti80@niceminute.com,@@Masuk123#oZ,0x8ece49b7bcc7591f7c042e7c6b5638c715d6c0d7
sashadesna@niceminute.com,@@Masuk123#oZ,0xaaea1e393bcdd088efe98c5b9a45ab5f06122850
vitas9090@niceminute.com,@@Masuk123#oZ,0x3a8af099f5d964ef6cfd003ca1f7e91cbe2fa583
`;

const waiting = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getData = (data, start, end) => {
  const splitData = data.split(/\r?\n/).filter((n) => n);
  const sliceData = splitData.slice(start, end);
  return sliceData;
};

const s3 = () => {
  const endpoint = new AWS.Endpoint(IDRIVE_ENPOINT);
  const s3 = new AWS.S3({
    endpoint: endpoint,
    accessKeyId: IDRIVE_ACCESS_KEY_ID,
    secretAccessKey: IDRIVE_SECRET_ACCESS_KEY,
  });

  return s3;
};

const existsBucket = async (bucketName) => {
  try {
    await listObjects(bucketName);

    return true;
  } catch (err) {
    if (err.code == "NoSuchBucket") {
      return false;
    } else {
      throw err;
    }
  }
};

const listObjects = (bucketName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
    };

    s3().listObjects(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getObject = (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
    };

    s3().getObject(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createObject = async (obj, bucketName, fileName) => {
  const buf = Buffer.from(JSON.stringify(obj));

  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "application/json",
      ACL: "private",
    };

    s3().upload(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const checkExistsObject = async (bucketName, fileName) => {
  try {
    await getObject(bucketName, fileName);

    return true;
  } catch (err) {
    if (err && (err.code == "NoSuchKey" || err.code == "NoSuchBucket"))
      return false;
  }
};

const saveCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const reaponseCookies = await session.send("Network.getAllCookies");

  await session.detach();
  await createObject(reaponseCookies.cookies, BUCKET_NAME, cookieFile);
};

const loadCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const cookies = JSON.parse(cookieFile);
  await session.send("Network.setCookies", {
    cookies: cookies,
  });
  await session.detach();
};

const retryElement = async (page, element, xpath = false, retryCount = 1) => {
  try {
    if (xpath) {
      return await page.waitForXPath(element, { timeout: 8000 });
    } else {
      return await page.waitForSelector(element, { timeout: 8000 });
    }
  } catch (err) {
    if (retryCount <= 0) {
      throw err;
    }
    const currentUrl = await page.url();
    await page.goto(currentUrl, { waitUntil: "networkidle2" });

    return await retryElement(page, element, (xpath = false), retryCount - 1);
  }
};

const launchBrowser = async () => {
  try {
    let browser;

    let args = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-notifications",
      "--no-first-run",
      "--disable-gpu",
      // "--start-maximized",
      "--disable-infobars",
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ];

    const proxyHost = `${PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`;

    USE_PROXY ? args.push(`--proxy-server=${proxyHost}`) : null;

    let browserOptions = {
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: HEADLESS,
      ignoreHTTPSErrors: true,
      acceptInsecureCerts: true,
      defaultViewport: null,
      args: args,
    };

    browser = await puppeteer.launch(browserOptions);
    const context = browser.defaultBrowserContext();

    context.overridePermissions("https://auth.alchemy.com", [
      "geolocation",
      "notifications",
    ]);
    context.overridePermissions("https://www.alchemy.com", [
      "geolocation",
      "notifications",
    ]);

    const [page] = await browser.pages();

    if (USE_PROXY) {
      await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
      });
    }

    await page.setRequestInterception(true);
    const rejectRequestPattern = [
      "googlesyndication.com",
      "/*.doubleclick.net",
      "/*.amazon-adsystem.com",
      "/*.adnxs.com",
      "/*.ads.net",
    ];
    const blockList = [];
    page.on("request", (request) => {
      if (
        rejectRequestPattern.find((pattern) => request.url().match(pattern))
      ) {
        blockList.push(request.url());
        request.abort();
      } else request.continue();
    });

    return { page, browser };
  } catch (err) {
    console.log(`Browser ${err}`);
  }
};

const login = async (page, email, password) => {
  try {
    await page.goto("https://www.alchemy.com/faucets/arbitrum-sepolia", {
      waitUntil: "networkidle2",
    });

    const cookieFile = `${email}.json`;

    const isExistCookies = await checkExistsObject(BUCKET_NAME, cookieFile);

    if (isExistCookies) {
      const getCookies = await getObject(BUCKET_NAME, cookieFile);
      const cookies = getCookies.Body.toString("utf-8");
      await loadCookies(page, cookies);
    }

    await waiting(5000);

    const logoutButtonElm = await page.$$eval("button", (button) => {
      const logoutButton = button.find(
        (btn) => btn.textContent.trim() == "Logout"
      );

      if (logoutButton) {
        return true;
      }

      return false;
    });

    if (logoutButtonElm) {
      return true;
    }

    await page.$$eval("button", (button) => {
      const loginButton = button.find(
        (btn) => btn.textContent.trim() == "Alchemy Login"
      );

      if (loginButton) {
        loginButton.focus();
        loginButton.click();
      }
    });

    await waiting(10000);

    try {
      await retryElement(page, 'input[type="email"]');

      const inputUser = await page.$('input[type="email"]');
      await page.evaluate((user) => {
        user.focus();
        user.click();
      }, inputUser);
      await page.keyboard.type(email);

      const inputPass = await page.$('input[type="password"]');
      await page.evaluate((pass) => {
        pass.focus();
        pass.click();
      }, inputPass);
      await page.keyboard.type(password);

      await page.waitForSelector('button[type="submit"]');
      const buttonLogin = await page.$('button[type="submit"]');

      await page.evaluate((login) => {
        login.click();
      }, buttonLogin);

      await waiting(15000);

      await saveCookies(page, cookieFile);
    } catch (err) {}

    return true;
  } catch (err) {
    console.log(`[${email}] - Login error ${err}`);
  }
};
const claimFoucet = async (page, email, wallet) => {
  let success = false;
  let retry = 0;
  let maxTry = 3;
  let message = "";

  try {
    while (!success && retry <= maxTry) {
      await waiting(2000);

      await retryElement(page, 'form input[type="text"]');
      const walletInputElm = await page.$('form input[type="text"]');

      await page.evaluate((walletInput) => {
        walletInput.focus();
        walletInput.click();
      }, walletInputElm);

      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
      await page.keyboard.sendCharacter(wallet);

      await page.waitForXPath('//div/button[contains(., "Send Me ETH")]');

      const [sendButtonElm] = await page.$x(
        '//div/button[contains(., "Send Me ETH")]'
      );

      await waiting(2000);

      await sendButtonElm.click();

      await waiting(4000);

      const successClaimElm = await page.$x(
        '//*[@id="root"]/div[1]/div[2]/div[3]/div[2]/div/div[2]/div/div[2]'
      );

      if (successClaimElm !== "undefined" && successClaimElm.length > 0) {
        console.log(`[${email}] - BERHASIL CLAIM ARBIT !!`);
        success = true;
        return true;
      } else {
        const [spanMessageElm] = await page.$x('//div[@role="alert"]/span');

        let textMessage = await page.evaluate(
          (element) => element.textContent.trim(),
          spanMessageElm
        );

        message = textMessage;

        retry++;

        await waiting(3000);
      }
    }

    console.log(`[${email}] - GAGAL CLAIM ARBIT ${message}`);
    return true;
  } catch (err) {
    console.log(`[${email}] - TERJADI ERROR: ${err}`);
  }
};

const bot = async (page, account) => {
  let success = false;
  try {
    await page.bringToFront();
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await client.send("Page.enable");
    await client.send("Page.setWebLifecycleState", { state: "active" });

    const data = account.split(",");
    const email = data[0];
    const password = data[1];
    const wallet = data[2];

    const sigin = await login(page, email, password);

    if (sigin) {
      success = await claimFoucet(page, email, wallet);
    }

    return success;
  } catch (err) {
    console.log(err);
  }
};
(async () => {
  const args = process.argv;

  // const startData = parseInt(args[2]);
  // const endData = parseInt(args[3]);

  // if (!startData && !endData) {
  //   console.log(`Params require "node run.js 0 5"`);
  //   process.exit();
  // }

  // For github action
  const rangeDate = process.env.RANGE_INDEX;
  const splitDate = rangeDate.split(",");
  const startData = splitDate[0];
  const endData = splitDate[1];

  const accounts = getData(dataAccount, startData, endData);

  return bluebird.map(
    accounts,
    async (account) => {
      const { page, browser } = await launchBrowser();

      try {
        await bot(page, account);
      } catch (err) {
        await browser.close();
      }

      await browser.close();
    },
    { concurrency: CONCURENCY }
  );
})();

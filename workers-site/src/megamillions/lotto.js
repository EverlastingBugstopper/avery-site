let _getRandom = async () => {
  /* base byte request on very rough probability
    5 / (70 / 255) + 1 / (25 / 255) = 28.4, 
    28.4 * 2 ~= 60 bytes should do the trick
    if you're really unlucky it'll just call it again */
  const csprng = await fetch("https://csprng.xyz/v1/api?length=60");
  const csprngJson = await csprng.json();
  return Buffer.from(csprngJson.Data, "base64");
};

let _checkRand = (rand, arr, low, high) => {
  if (rand <= low || rand >= high) {
    return false;
  }
  return arr.indexOf(rand) === -1;
};

let lottoGenerator = async () => {
  console.log("enterint lotto generator")
  let arr = [];
  let randPos = 0;
  let rand = await _getRandom();
  let currRand;
  while (arr.length < 6) {
    if (randPos + 1 === rand.length) {
      randPos = 0;
      rand = await _getRandom();
    }
    currRand = rand[randPos];
    if (arr.length < 5) {
      if (_checkRand(currRand, arr, 1, 70)) {
        arr.push(currRand);
      }
    } else {
      if (_checkRand(currRand, arr, 1, 25)) {
        arr.push(currRand);
      }
    }
    randPos += 1;
  }
  return arr;
};

let lottoFormatter = lottoNums => {
  let lottoStrings = [];
  lottoNums.forEach(lottoNum => {
    lottoStrings.push(("0" + lottoNum).slice(-2));
  });
  return lottoStrings;
};

export { lottoFormatter, lottoGenerator };

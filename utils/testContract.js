const { initContractsFromEnv } = require('./contracts');
require('dotenv').config();

async function main() {
  try {
    const { GhostCredits } = initContractsFromEnv();

    const target = process.argv[2] || process.env.TEST_ADDRESS || '0x0000000000000000000000000000000000000000';

    console.log('Using address:', target);

    // Example read calls
    const credits = await GhostCredits.getCredits(target);
    console.log('getCredits ->', credits.toString());

    const creditsPerETH = await GhostCredits.creditsPerETH();
    console.log('creditsPerETH ->', creditsPerETH.toString());

    const nftContract = await GhostCredits.nftContract();
    console.log('nftContract ->', nftContract);

    process.exit(0);
  } catch (err) {
    console.error('Error running testContract:', err);
    process.exit(1);
  }
}

main();

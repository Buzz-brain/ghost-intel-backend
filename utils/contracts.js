import fs from 'fs';
import path from 'path';
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadABI(name) {
  const file = path.join(__dirname, '..', 'contracts', `${name}.json`);
  if (!fs.existsSync(file)) throw new Error(`ABI file not found: ${file}`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (Array.isArray(json)) return json;
  return json.abi || json;
}

export function initContractsFromEnv() {
  const providerUrl = process.env.PROVIDER_URL;
  const creditsAddress = process.env.GHOSTCREDITS_ADDRESS;
  const nftAddress = process.env.GHOSTNFT_ADDRESS;
  const adminKey = process.env.ADMIN_PRIVATE_KEY;

  if (!providerUrl) throw new Error('PROVIDER_URL not set in env');
  if (!creditsAddress) throw new Error('GHOSTCREDITS_ADDRESS not set in env');
  if (!nftAddress) throw new Error('GHOSTNFT_ADDRESS not set in env');

  const provider = new JsonRpcProvider(providerUrl);
  let signer = null;
  if (adminKey) {
    signer = new Wallet(adminKey, provider);
  }

  const GhostCredits = new Contract(creditsAddress, loadABI('GhostCredits'), signer || provider);
  const GhostNFT = new Contract(nftAddress, loadABI('GhostNFT'), signer || provider);

  return { provider, signer, GhostCredits, GhostNFT };
}

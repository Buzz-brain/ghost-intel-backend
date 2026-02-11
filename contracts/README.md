This folder should contain the deployed contract ABIs (JSON) for the on-chain contracts
used by the backend. Best practices:

- Place the full ABI JSON files produced by your compiler (Hardhat/Foundry) here,
  named exactly `GhostCredits.json` and `GhostNFT.json`.
- Do NOT commit private keys or RPC credentials. Keep those in environment variables.
- Keep contract addresses in environment variables (see `backend/.env` example).

Example env variables (set in Render / local `.env`):

GHOSTCREDITS_ADDRESS=0x...
GHOSTNFT_ADDRESS=0x...
PROVIDER_URL=https://rpc.example
ADMIN_PRIVATE_KEY=0x...

The backend helper `../utils/contracts.js` will load these files and initialise
ethers Contract instances. Replace the placeholder ABIs with real compiled ABIs
from `artifacts` or `out` directories produced by your contract toolchain.

Security & deployment notes
--------------------------

1. Never commit secret keys to the repository. Use the provided `.env.example`
    file as a template and keep your real `.env` local and gitignored.

2. On Render (or any cloud provider) set sensitive values as protected environment
    variables / secrets instead of committing them. Example Render environment
    variables you should set:

    - `PROVIDER_URL` — your RPC provider (Alchemy, Infura, etc.)
    - `GHOSTCREDITS_ADDRESS` — deployed GhostCredits contract address
    - `GHOSTNFT_ADDRESS` — deployed GhostNFT contract address
    - `ADMIN_PRIVATE_KEY` — backend admin wallet private key (used to sign admin txns)

    In Render: Dashboard → Your Service → Environment → Add Environment Variable
    and mark it as secret. The value will be injected into the runtime but not
    visible in the repo.

3. Rotate the `ADMIN_PRIVATE_KEY` immediately if it ever appears in a public
    commit or log. Keep the key minimal-scope (use a dedicated admin wallet).

4. For extra safety, consider using a signing service or a hardware wallet /
    KMS for admin signing instead of a raw private key in env vars.

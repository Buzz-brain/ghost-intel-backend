import { initContractsFromEnv } from '../utils/contracts.js';

function getContract() {
  const { GhostCredits } = initContractsFromEnv();
  return GhostCredits;
}

export async function pause(req, res) {
  try {
    const contract = getContract();
    const tx = await contract.pause();
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function unpause(req, res) {
  try {
    const contract = getContract();
    const tx = await contract.unpause();
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function setCreditsPerETH(req, res) {
  try {
    const { value } = req.body;
    if (typeof value === 'undefined') return res.status(400).json({ error: 'value required' });
    const contract = getContract();
    const tx = await contract.setCreditsPerETH(value);
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function setCreditsPerUSDC(req, res) {
  try {
    const { value } = req.body;
    if (typeof value === 'undefined') return res.status(400).json({ error: 'value required' });
    const contract = getContract();
    const tx = await contract.setCreditsPerUSDC(value);
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function setNFTContract(req, res) {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: 'address required' });
    const contract = getContract();
    const tx = await contract.setNFTContract(address);
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function setReferralBonus(req, res) {
  try {
    const { percent } = req.body;
    if (typeof percent === 'undefined') return res.status(400).json({ error: 'percent required' });
    const contract = getContract();
    const tx = await contract.setReferralBonus(percent);
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function withdrawETH(req, res) {
  try {
    const contract = getContract();
    const tx = await contract.withdrawETH();
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function withdrawUSDC(req, res) {
  try {
    const contract = getContract();
    const tx = await contract.withdrawUSDC();
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function transferOwnership(req, res) {
  try {
    const { newOwner } = req.body;
    if (!newOwner) return res.status(400).json({ error: 'newOwner required' });
    const contract = getContract();
    const tx = await contract.transferOwnership(newOwner);
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function renounceOwnership(req, res) {
  try {
    const contract = getContract();
    const tx = await contract.renounceOwnership();
    const receipt = await tx.wait();
    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export default {
  pause,
  unpause,
  setCreditsPerETH,
  setCreditsPerUSDC,
  setNFTContract,
  setReferralBonus,
  withdrawETH,
  withdrawUSDC,
  transferOwnership,
  renounceOwnership,
};

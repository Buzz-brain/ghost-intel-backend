import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
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
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require adminAuth
router.post('/pause', adminAuth, pause);
router.post('/unpause', adminAuth, unpause);
router.post('/set-credits-per-eth', adminAuth, setCreditsPerETH);
router.post('/set-credits-per-usdc', adminAuth, setCreditsPerUSDC);
router.post('/set-nft-contract', adminAuth, setNFTContract);
router.post('/set-referral-bonus', adminAuth, setReferralBonus);
router.post('/withdraw-eth', adminAuth, withdrawETH);
router.post('/withdraw-usdc', adminAuth, withdrawUSDC);
router.post('/transfer-ownership', adminAuth, transferOwnership);
router.post('/renounce-ownership', adminAuth, renounceOwnership);

export default router;

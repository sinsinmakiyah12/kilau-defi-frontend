import { ethers } from "ethers";
import KilauDeFiABI from "../abi/KilauDeFi.json";

const CONTRACT_ADDRESS = "0xFeA818b263D35000806135043f827B74bd2c16FF";
export async function getContract() {
  if (!window.ethereum) {
    alert("MetaMask tidak ditemukan! Silakan install MetaMask dulu.");
    return null;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, KilauDeFiABI.abi, signer);
}

export async function getWalletAddress() {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}
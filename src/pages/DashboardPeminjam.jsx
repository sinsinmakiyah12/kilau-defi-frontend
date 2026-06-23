import { useState } from "react";
import { getContract, getWalletAddress } from "../lib/contract";
import { ethers } from "ethers";

export default function DashboardPeminjam() {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    const address = await getWalletAddress();
    if (address) {
      setWalletAddress(address);
      setStatus("Wallet berhasil terhubung!");
    }
  }

  async function cekEligibilitas() {
    setLoading(true);
    try {
      const contract = await getContract();
      const result = await contract.isVerifiedEligible(walletAddress);
      setStatus(result ? "✅ Kamu eligible untuk meminjam!" : "❌ Kamu belum eligible.");
    } catch (err) {
      setStatus("Error: " + err.message);
    }
    setLoading(false);
  }

  async function submitProof() {
    setLoading(true);
    try {
      const contract = await getContract();
      const proof = ethers.toUtf8Bytes("dummy-proof");
      const tx = await contract.submitCreditProof(proof, [1]);
      await tx.wait();
      setStatus("✅ Proof berhasil disubmit! Tx: " + tx.hash);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem" }}>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a3e 0%, #2d2b6b 100%)",
        borderRadius: "28px",
        padding: "2.8rem",
        color: "white",
        marginBottom: "1.5rem",
        boxShadow: "0 20px 60px rgba(26,26,62,0.25)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: "2.8rem",
          width: "60px", height: "3px",
          background: "linear-gradient(90deg, #c9a84c, #f0d080)",
          borderRadius: "0 0 4px 4px"
        }} />
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-50px", right: "-50px",
          width: "200px", height: "200px",
          background: "rgba(201,168,76,0.08)", borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "60px",
          width: "160px", height: "160px",
          background: "rgba(255,255,255,0.04)", borderRadius: "50%"
        }} />

        <p style={{ color: "#c9a84c", fontSize: "0.75rem", fontWeight: "600", letterSpacing: "2px", marginBottom: "0.6rem", textTransform: "uppercase" }}>
          KilauDeFi Protocol
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>
          Dashboard Peminjam
        </h1>
        <p style={{ opacity: 0.5, fontSize: "0.78rem", marginBottom: "2rem", fontFamily: "monospace" }}>
          Contract: 0xFeA818b263D3500806135043f827B74bd2c16FF
        </p>

        <button onClick={connectWallet} style={{
          background: "linear-gradient(135deg, #c9a84c, #f0d080)",
          color: "#1a1a3e",
          border: "none",
          padding: "0.8rem 2rem",
          borderRadius: "50px",
          fontWeight: "700",
          fontSize: "0.9rem",
          letterSpacing: "0.3px",
          boxShadow: "0 4px 20px rgba(201,168,76,0.35)"
        }}>
          {walletAddress
            ? "🔗 " + walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
            : "🦊 Connect MetaMask"}
        </button>
      </div>

      {/* Cards */}
      {walletAddress && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          <div style={cardStyle}>
            <p style={labelStyle}>FITUR 01</p>
            <h3 style={cardTitle}>Cek Eligibilitas</h3>
            <p style={cardDesc}>Verifikasi apakah wallet kamu memenuhi syarat kredit minimum untuk meminjam.</p>
            <button onClick={cekEligibilitas} disabled={loading} style={btnGold}>
              {loading ? "Memproses..." : "Cek Sekarang →"}
            </button>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>FITUR 02</p>
            <h3 style={cardTitle}>Submit Credit Proof</h3>
            <p style={cardDesc}>Kirimkan bukti kredit zero-knowledge ke smart contract untuk diverifikasi.</p>
            <button onClick={submitProof} disabled={loading} style={{ ...btnGold, background: "linear-gradient(135deg, #1a1a3e, #2d2b6b)", color: "white", boxShadow: "0 4px 20px rgba(26,26,62,0.2)" }}>
              {loading ? "Memproses..." : "Submit Proof →"}
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      {status && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1.2rem 1.8rem",
          background: "white",
          borderRadius: "16px",
          border: "1px solid #ede8d5",
          boxShadow: "0 4px 20px rgba(26,26,62,0.06)",
          color: "#333",
          fontSize: "0.92rem",
          fontWeight: "500"
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "22px",
  padding: "2rem",
  boxShadow: "0 4px 24px rgba(26,26,62,0.07)",
  border: "1px solid #ede8f5",
};
const labelStyle = {
  fontSize: "0.7rem",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#c9a84c",
  marginBottom: "0.6rem"
};
const cardTitle = {
  fontSize: "1.15rem",
  fontWeight: "700",
  color: "#1a1a3e",
  marginBottom: "0.5rem"
};
const cardDesc = {
  color: "#888",
  fontSize: "0.85rem",
  lineHeight: "1.6",
  marginBottom: "1.5rem"
};
const btnGold = {
  background: "linear-gradient(135deg, #c9a84c, #f0d080)",
  color: "#1a1a3e",
  border: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "50px",
  fontWeight: "700",
  fontSize: "0.88rem",
  width: "100%",
  boxShadow: "0 4px 16px rgba(201,168,76,0.3)"
};
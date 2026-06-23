import { useState } from "react";
import DashboardPeminjam from "./pages/DashboardPeminjam";
import PortalVerifikator from "./pages/PortalVerifikator";
import "./index.css";

export default function App() {
  const [halaman, setHalaman] = useState("peminjam");

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8f7f4 60%, #eee9ff 100%)" }}>

      {/* Floating Navbar */}
      <div style={{
        position: "fixed",
        top: "1.2rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderRadius: "50px",
        padding: "0.55rem 0.75rem 0.55rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "0 8px 32px rgba(20,20,60,0.10), 0 1.5px 6px rgba(0,0,0,0.06)",
        border: "1px solid rgba(200,195,220,0.5)",
        zIndex: 999,
      }}>
        <span style={{
          fontWeight: "800",
          fontSize: "1.05rem",
          color: "#1a1a3e",
          marginRight: "0.75rem",
          letterSpacing: "0.5px"
        }}>
          ◆ KilauDeFi
        </span>

        {["peminjam", "verifikator"].map((page) => (
          <button
            key={page}
            onClick={() => setHalaman(page)}
            style={{
              background: halaman === page ? "#1a1a3e" : "transparent",
              color: halaman === page ? "#c9a84c" : "#888",
              border: "none",
              padding: "0.55rem 1.3rem",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "0.85rem",
              letterSpacing: "0.3px",
            }}
          >
            {page === "peminjam" ? "Dashboard Peminjam" : "Portal Verifikator"}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: "6rem" }}>
        {halaman === "peminjam" && <DashboardPeminjam />}
        {halaman === "verifikator" && <PortalVerifikator />}
      </div>
    </div>
  );
}
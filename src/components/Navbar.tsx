"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/imgs/veil-logo.png" alt="veil logo" />
      </div>
      <ul>
        <li>How it works</li>
        <button className="button button--gradient">Get Started</button>
        <WalletMultiButton />
      </ul>
    </nav>
  );
}

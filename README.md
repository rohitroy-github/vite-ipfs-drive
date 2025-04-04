# IPFS Drive 1.0 (EVM-Based)

IPFS Drive 1.0 is a **decentralized alternative to Google Drive**, designed for **secure photo storage** using **Blockchain & IPFS**.

Currently, the app supports testing on **Localhost (Hardhat)** and the **Ethereum Sepolia Testnet** via an Alchemy endpoint.

---

## Snapshots

| ![image](./project-assets/screenshot-1.png) | ![image](./project-assets/screenshot-2.png) |
| ------------------------------------------- | ------------------------------------------- |

---

## Features

- **Upload and store pictures securely**
- **Preview images directly within the app**
- **Decentralized storage powered by IPFS**
- **Share drive access using wallet addresses**

---

## Tech Stack

### Frontend:

- **Vite JS** - Fast and modern frontend tooling
- **Tailwind CSS** - Utility-first styling for a sleek UI

### Backend:

- **Node.js** - Server-side runtime
- **Hardhat** - Ethereum development framework
- **Metamask Wallet** - User authentication and transactions
- **Ethers.js** - Blockchain interaction library
- **Alchemy** - Web3 infrastructure provider
- [**Pinata IPFS**](https://www.pinata.cloud/) - IPFS storage solution

---

## Deployed Networks

- ✅ **Ethereum Sepolia Testnet**
- ✅ **Hardhat Local Testnet**

---

## Setup & Testing Guide

### Setting Up Environment Variables

- Create a `.env` file in the `blockchain-hardhat` directory, using `.env.example` as a reference.
- Create a `.env` file in the `frontend-vite` directory, using `.env.example` as a reference.

### Backend Setup

#### Terminal 1 - Start Hardhat Node:

```sh
cd blockchain-hardhat
npx hardhat node
```

#### Terminal 2 - Deploy Contracts:

```sh
cd blockchain-hardhat
# OPTIONAL: Run tests
npx hardhat test
# Deploy contract to Localhost
npx hardhat run scripts/deploy[IPFSDriveContract_Main].js --network localhost
# OPTIONAL: Deploy contract to Sepolia
npx hardhat run scripts/deploy[IPFSDriveContract_Main].js --network sepolia
```

- Update **`backend-config.json`** inside `/frontend-vite` with the **latest contract address** under the **"31337"** key, fetched from Terminal 2.

### Frontend Setup

#### Terminal 1 - Start Frontend:

```sh
cd frontend-vite
npm run dev
```

---

## Contributions & Feedback

The project is functional but open to enhancements. Feel free to suggest improvements or modifications.

If you found this useful, don't forget to leave a ⭐! 😊

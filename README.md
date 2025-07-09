# etherWatch

etherWatch is a frontend application for monitoring the Ethereum network. It provides real-time data such as gas prices, market information, Ethereum metadata, and live pending transactions via WebSockets.

## Features
- Connect to Metamask and realize transactions and view balance
- View current gas prices and historical trends
- Access Ethereum price and market data
- Display general Ethereum information ("bio")
- Real-time pending transactions feed via WebSocket
- Utility tools to:
  - Check wallet balances
  - Get specific transaction details
  - Fetch ENS profiles
  - Get a specific Block
    

## Technologies

- React + Vite + TypeScript
- React Query
- Recharts
- socket.io-client

## Usage

This is the frontend only. Backend services must be running and publicly available for full functionality.

## Development

To run locally:

```bash
npm install
npm run dev

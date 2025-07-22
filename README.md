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

You need to start the container from EtherWatch-Backend, check:
[Back-End Repository](https://github.com/nathazz/EtherWatch-backend)

And

```bash
npm install
npm run dev
```

### loom
https://www.loom.com/share/ab79c4fd527248af8949741eea1a89a4?sid=9bd4df55-440e-4df4-a318-1d57dc6014ed

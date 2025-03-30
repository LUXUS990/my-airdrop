import React from 'react';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { RainbowKitProvider, ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// تنظیم شبکه BSC
const bscChain = {
  id: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    public: { http: ['https://bsc-dataseed.binance.org/'] },
    default: { http: ['https://bsc-dataseed.binance.org/'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
};

// تنظیم زنجیره‌ها و ارائه‌دهنده‌ها
const { chains, publicClient } = configureChains(
  [bscChain, mainnet],
  [publicProvider()]
);

// اتصال کیف پول‌ها
const { connectors } = getDefaultWallets({
  appName: 'Luxus Token Sale',
  projectId: 'ba2fdfc93f10b60f69d3347475fe40ee', // جایگزین کنید با WalletConnect Project ID خودتان
  chains,
});

// پیکربندی wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'ba2fdfc93f10b60f69d3347475fe40ee', // جایگزین کنید با WalletConnect Project ID خودتان
        showQrModal: true,
      },
    }),
  ],
  publicClient,
});

function WalletConnect() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ConnectButton />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default WalletConnect;
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </MoralisProvider>
  );
}

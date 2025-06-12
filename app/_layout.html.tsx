// app/_document.tsx
import { Head, Html, Main, NextScript } from "expo-router/html";

export default function Document() {
  return (
    <Html>
      <Head>
        <base href="/MFA/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

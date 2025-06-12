// app/_layout.html.tsx
import { Slot } from "expo-router/html";

export default function Root() {
  return (
    <html>
      <head>
        <base href="/MFA/" />
      </head>
      <body>
        <Slot />
      </body>
    </html>
  );
}

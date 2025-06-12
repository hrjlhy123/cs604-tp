export default function Root() {
  return (
    <html>
      <head>
        <base href="/MFA/" />
      </head>
      <body>
        <slot />
      </body>
    </html>
  );
}
import React from 'react';

export const metadata = {
  title: 'My App',
  description: 'My Next.js 13 app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

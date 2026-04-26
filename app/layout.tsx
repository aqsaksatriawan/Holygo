import "./globals.css";

export const metadata = {
  title: "HolyGo",
  description: "Prayer Web App",
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
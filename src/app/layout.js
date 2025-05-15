import './globals.css';

export const metadata = {
  title: 'AIW - AI Chat Interface',
  description: 'Modern AI chat interface inspired by ChatGPT and Claude',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
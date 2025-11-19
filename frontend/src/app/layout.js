import './globals.css';

export const metadata = {
  title: 'Todo Tracker',
  description: 'A simple todo tracking application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
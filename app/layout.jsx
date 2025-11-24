import "./globals.css";

export const metadata = {
  title: "Marketing Coach Agent",
  description: "Plan content, extract customer insights, and craft irresistible offers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <header className="header">
            <h1>Marketing Coach Agent</h1>
            <p className="subtitle">Content plans, customer insights, and offer builder</p>
          </header>
          {children}
          <footer className="footer">
            <span>Built for rapid planning and execution</span>
          </footer>
        </main>
      </body>
    </html>
  );
}


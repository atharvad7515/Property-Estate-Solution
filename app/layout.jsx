import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property-pulse",
  keywords: "rental , property , real estate",
  description: "find perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>Main layout {children}</main>
      </body>
    </html>
  );
};

export default MainLayout;

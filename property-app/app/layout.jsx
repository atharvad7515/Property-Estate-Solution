import "@/assets/styles/globals.css";

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

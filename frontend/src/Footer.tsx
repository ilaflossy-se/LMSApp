function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "10px", background: "#f0f0f0" }}>
      <p>© {currentYear} My Learning Management System. All rights reserved.</p>
    </footer>
  );

}
export default Footer;
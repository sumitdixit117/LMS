import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      textAlign: "center",
      padding: "1rem 0",
      backgroundColor: "#355e58",
      color: "white",
      width: "100%",
      marginTop: "30px", // Adding margin-top for spacing above the footer
    }
  };

  return (
    <div style={styles.footer}>
      &copy; 2024 Your Company. All rights reserved.
    </div>
  );
};

export default Footer;

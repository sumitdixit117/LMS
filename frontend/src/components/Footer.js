import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      textAlign: "center",
      padding: "1rem 0",
      backgroundColor: "#355e58",
      color: "white",
      width: "100%",
      borderRadius: "0 0 0.25rem 0.25rem",
      marginTop: '50px'
    }
  };

  return (
    <div style={styles.footer}>
      &copy; 2024 LMSys. All rights reserved.
    </div>
  );
};

export default Footer;

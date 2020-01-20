import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gradient-success  fixed-bottom">
        <div className="container my-auto">
          <div className="copyright text-center font-weight-bold text-dark my-auto">
            <span>
              Powered by AJISAQ LTD |{" "}
              <a href="https://ajisaq.com/">www.ajisaq.com</a>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;

import React, { Component } from "react";
import logo from "../../assets/img/logo.png";
import phone1 from "../../assets/img/phone_1.png";
import phone2 from "../../assets/img/phone_2.png";
import features1 from "../../assets/img/features1.png";
import features2 from "../../assets/img/features2.jpg";

// import "../../assets/css/test.css";

// import "../../assets/css/boot.css";
// import "../../assets/css/nine.css";

export class Home extends Component {
  render() {
    return (
      <div>
        <section class="hero-section" id="hero">
          <div class="wave">
            <svg width="100%" height="355px" viewBox="0 0 1920 355">
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Apple-TV"
                  transform="translate(0.000000, -402.000000)"
                  fill="#FFFFFF"
                >
                  <path
                    d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                    id="Path"
                  ></path>
                </g>
              </g>
            </svg>
          </div>

          <div class="container">
            <div class="row align-items-center">
              <div class="col-12 hero-text-image">
                <div class="row">
                  <div class="col-lg-7 text-center text-lg-left">
                    <h1 data-aos="fade-right">
                      Identity and Data Verification
                    </h1>
                    <p class="mb-5" data-aos="fade-right" data-aos-delay="100">
                      transform your digital identity into trusted identity with
                      blockchain
                    </p>
                    <p data-aos="fade-right" data-aos-delay="200">
                      <a href="#" class="btn btn-outline-white">
                        Get started
                      </a>
                    </p>
                  </div>
                  <div
                    class="col-lg-5 iphone-wrap"
                    data-aos="zoom-out"
                    data-aos-delay="300"
                  >
                    <img
                      src={phone2}
                      alt=""
                      class="phone-1 img-animated"
                      data-aos="fade-right"
                    />
                    <img
                      src={phone1}
                      alt=""
                      class="phone-2 img-animated"
                      data-aos="fade-right"
                      data-aos-delay="200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" class="about">
          <div class="container-fluid">
            <div class="row">
              <div
                class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5"
                data-aos="fade-right"
              >
                <img
                  src={logo}
                  height="125px"
                  width="300px"
                  style={{ margin: "auto" }}
                  alt=""
                />
                <p>
                  Our platform enables organisations to easily issue and verify
                  digital credentials, privately and securely.
                  <br />
                  <br />
                  We use Verifiable Credentials and Blockchain technology to
                  ensure credentials are verifiable anywhere, at any time. And,
                  of course, no personal information is ever written to a
                  blockchain.
                </p>
              </div>
              <div
                class="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch"
                data-aos="fade-left"
              >
                <a
                  href="https://www.youtube.com/watch?v=H69l_trRArU"
                  class="venobox play-btn mb-4"
                  data-vbtype="video"
                  data-autoplay="true"
                  style={{ color: "transparent" }}
                >
                  Play
                </a>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section>
          <div class="container">
            <div class="row">
              <div class="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="50">
                <div class="services h-100">
                  <h4 class="user">For Users</h4>
                  <p>
                    One-click access to services. Our platform allows users to
                    prove their identity, without sharing personal details!
                  </p>
                </div>
              </div>
              <div
                class="col-md-4 mb-4"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div class="services h-100">
                  <h4 class="user">For Issuers</h4>
                  <p>
                    An intuitive dashboard to issue {"&"} verify
                    cryptographically tamper-proof credentials with ease.
                    Protecting your user's personal data and showing them that
                    you care.
                  </p>
                </div>
              </div>
              <div
                class="col-md-4 mb-4"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div class="services h-100">
                  <h4 class="user">For Verifiers</h4>
                  <p>
                    Frictionless on-boarding of verified users without data
                    management head aches. We will make physical ID
                    verifications a thing of the past!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="features">
          <div class="row align-items-center" style={{ margin: "50px" }}>
            <div class="col-md-6 mr-auto">
              <h2 class="mb-4">Access Control</h2>

              <ul data-aos="zoom-in">
                <li>
                  <i class="fas fa-check"></i> Users manage and control who sees
                  what about them with one click
                </li>
                <li>
                  <i class="fas fa-check"></i> Secure storage of your data using
                  blockchain
                </li>
                <li>
                  <i class="fas fa-check"></i>
                  Personal information hidden from requestor and verified using
                  zero-knowledge proof
                </li>
                <li>
                  <i class="fas fa-check"></i> Detailed view of verification
                  results
                </li>
              </ul>
            </div>
            <div class="col-md-4" data-aos="fade-left">
              <img src={features1} alt="" class="img-fluid" />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6" data-aos="fade-right">
              <img src={features2} alt="" class="img-fluid" />
            </div>
            <div class="col-md-5 mr-auto">
              <h2 class="mb-4">Seamless Integration with Business Ecosystem</h2>

              <ul data-aos="zoom-in">
                <li>
                  <i class="fas fa-check"></i> Cloud based with fast setup and
                  easy configuration
                </li>
                <li>
                  <i class="fas fa-check"></i> Send a link to client and get
                  verification results instantly in your Admin Panel
                </li>
                <li>
                  <i class="fas fa-check"></i>
                  Integrate client verification solutions into your platform,
                  collect data you need and get the results via API.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <br />
        <br />
        <section id="contact" class="contact" style={{ marginBottom: "15px" }}>
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>Contact us to get started</h2>
            </div>

            <div class="row">
              <div
                class="col-lg-5 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div class="info">
                  <div class="address">
                    <i class="fas fa-map-marker-alt"></i>
                    <h4>Location:</h4>
                    <p>1 Washington Sq, San Jose, CA 95192</p>
                  </div>

                  <div class="email">
                    <i class="fas fa-envelope"></i>
                    <h4>Email:</h4>
                    <p>verify@sjsu.edu</p>
                  </div>

                  <div class="phone">
                    <i class="fas fa-map-marker-alt"></i>
                    <h4>Call:</h4>
                    <p>+1 123 456 7890</p>
                  </div>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3092217614085!2d-121.88326018473684!3d37.33518737984176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccb864de43d5%3A0x397ffe721937340e!2sSan%20Jos%C3%A9%20State%20University!5e0!3m2!1sen!2sus!4v1612294981924!5m2!1sen!2sus"
                    frameBorder="0"
                    style={{ border: "0", width: "100%", height: "290px" }}
                    allowFullScreen=""
                    title="Location"
                  ></iframe>
                </div>
              </div>

              <div
                class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <form class="php-email-form">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="name"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 4 chars"
                      />
                      <div class="validate"></div>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Your Email</label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        data-rule="email"
                        data-msg="Please enter a valid email"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      class="form-control"
                      name="subject"
                      id="subject"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 8 chars of subject"
                    />
                  </div>
                  <div class="form-group">
                    <label>Message</label>
                    <textarea
                      class="form-control"
                      name="message"
                      rows="10"
                      data-rule="required"
                      data-msg="Please write something for us"
                    ></textarea>
                  </div>

                  <div class="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div class="footer-newsletter" data-aos="fade-up">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <h4>Join Our Newsletter</h4>
                  <form action="" method="post">
                    <input type="email" name="email" />
                    <input type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;

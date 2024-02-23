import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Welcome to Industrial Nexus</h1>
            <p className="lead fw-normal text-white-50 mb-0">Your one-stop destination for industrial solutions</p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="my-5">
                <h2 className="display-5 fw-bolder">About Us</h2>
                <p className="lead fw-normal">Industrial Nexus is dedicated to providing high-quality industrial products and services to meet your business needs. With a wide range of products and expert support, we aim to be your trusted partner in industrial solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
          <div className="col mb-5">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-gear-wide-connected display-3 text-primary mb-4"></i>
                <h5 className="card-title fw-bolder">Quality Products</h5>
                <p className="card-text">Explore our wide range of high-quality industrial products designed to meet your specific requirements.</p>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-hand-thumbs-up display-3 text-primary mb-4"></i>
                <h5 className="card-title fw-bolder">Expert Support</h5>
                <p className="card-text">Our team of experts is available to provide guidance and support to ensure you get the most out of our products and services.</p>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-truck display-3 text-primary mb-4"></i>
                <h5 className="card-title fw-bolder">Fast Delivery</h5>
                <p className="card-text">We understand the importance of timely delivery. Rest assured, your orders will be delivered quickly and efficiently.</p>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-shield-check display-3 text-primary mb-4"></i>
                <h5 className="card-title fw-bolder">Satisfaction Guaranteed</h5>
                <p className="card-text">Your satisfaction is our priority. We stand behind the quality of our products and services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <p className="lead fw-normal mb-0">© 2024 Industrial Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

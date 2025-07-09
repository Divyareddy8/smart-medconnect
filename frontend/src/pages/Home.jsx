import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import homeImage from '../assets/home.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const clickHandler = ()=>{
    if (!localStorage.getItem('role') || localStorage.getItem('role')==="") {
      navigate('/login')
    }
    else {
      navigate(`/${localStorage.getItem('role')}`)
    }
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div style={{height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button className='btn-custom text-white px-4 py-2 rounded' onClick={clickHandler}>Dashboard</button></div>

      {/* Hero Section */}
      <main className="flex-grow-1">
        <section
          className="d-flex align-items-center justify-content-between bg-info text-white w-100 m-0"
          style={{ minHeight: 'calc(100vh - 140px)', paddingInline: '5%' }}
        >
          <div className="w-50">
            <h1 className="display-4 fw-bold">
              Online Health <br /> Connect
            </h1>
            <p className="lead mt-3">
              Your gateway to seamless healthcare access.
            </p>
          </div>

          <div className="w-50 text-end">
            <img
              src={homeImage}
              alt="Home"
              className="img-fluid"
              style={{ height: '450px', objectFit: 'contain' }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

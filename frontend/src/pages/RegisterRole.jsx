import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RoleSelector from '../components/auth/RoleSelector';

const RegisterRole = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <RoleSelector />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRole;

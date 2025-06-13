import React from 'react';
import RoleSelector from '../components/auth/RoleSelector';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const RegisterRole = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <RoleSelector />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRole;
import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'

const DoctorHome = () => {
  return (
        <div>
            <Header 
            title="Medicare"
            options = {[{key:"Doctors", href : "/doctors"}, {key: "Pharmacy", href : "/pharmacy"}, {key : "About", href : "/about"}, {key : "Contact us", href : "/contact"}]}
            RightSide={()=><a href = "/doctor/profile"><button>Profile</button></a>}
            />
            <Body 
            elements={[
                <a href="/patient/buymedicine"><button>Buy Medicines</button></a>,
                <a href="/patient/bookappointment"><button>Book appointment</button></a>,
            ]}
            />
            <Footer 
            elements={[]}
            />
        </div>
    );
}

export default DoctorHome
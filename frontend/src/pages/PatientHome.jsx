import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

export default function PatientHome(){
    return (
        <div>
            <Header 
            title="Medicare"
            options = {[{key:"Doctors", href : "/doctors"}, {key: "Pharmacy", href : "/pharmacy"}, {key : "About", href : "/about"}, {key : "Contact us", href : "/contact"}]}
            RightSide={()=><a href = "/patient/profile"><button>Profile</button></a>}
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
import React from 'react';
import './App.css';
import BookingCalculator from './BookingCalculator';

// Using a component-based approach with conditional rendering
function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  // Function to handle navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch(currentPage) {
      case 'booking':
        return <BookingCalculator onNavigate={navigateTo} />;
      default:
        return renderHomePage();
    }
  };

  // Render the home page content
  const renderHomePage = () => {
    return (
      <>
        <section className="routes-section">
          <h1>Common Routes</h1>
          
          <div className="routes-container">
            <div className="routes-list">
              <div className="route-item">
                <h2>Ithaca to Rochester</h2>
                <p className="price">$100, one-way</p>
              </div>
              
              <div className="route-item">
                <h2>Ithaca to Syracuse</h2>
                <p className="price">$120 single rider, $90 for multiple riders</p>
              </div>
              
              <div className="route-item">
                <h2>Long distance routes</h2>
                <p className="price">$1 per mile, round-trip</p>
              </div>
              
              <button className="quote-btn" onClick={() => navigateTo('booking')}>Get a Quote</button>
            </div>
            
            <div className="map-container">
              {/* Replace this with your actual map image */}
              <img src="/map-placeholder.png" alt="Map with locations" className="map-image" />
            </div>
          </div>
        </section>

        <section className="about-section">
          <h1>About Us</h1>
          
          <div className="about-container">
            <div className="about-text">
              <p>
                At Saferide, we believe that getting to and from campus should be stress-free, safe, and community-driven. As a dedicated student transportation service, we provide reliable and comfortable rides for students traveling between colleges like Cornell, Colgate, and Syracuse to destinations like Ithaca, Rochester, and NYC. With upfront pricing, flexible scheduling, and a commitment to student safety, we ensure that every trip is smooth and hassle-free. Our small but growing team of experienced drivers is available 24/7, making sure students can count on us whenever they need a ride. Whether you're heading home for break, catching a flight, or just making a quick coffee stop along the way, Saferide is here to get you there—comfortably and on time. What sets us apart? We keep things community-focused and transparent—students can see if a ride has already been booked and request to share for a lower fare. We also offer live tracking for parents, push notifications for pickups and drop-offs, and a straightforward booking system that allows for stops, rebookings, and pre-payments.
              </p>
            </div>
            
            <div className="about-image">
              {/* Replace this with your actual bus image */}
              <img src="/bus-placeholder.png" alt="SafeRide Bus" className="bus-image" />
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h1>Testimonials</h1>
          
          <div className="testimonials-container">
            <div className="testimonial-card">
              <h2>"A terrific piece of praise"</h2>
              <div className="testimonial-author">
                {/* Replace with actual profile image */}
                <img src="/profile1-placeholder.png" alt="Profile" className="profile-image" />
                <div className="author-info">
                  <h3>Name</h3>
                  <p>Description</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <h2>"A fantastic bit of feedback"</h2>
              <div className="testimonial-author">
                {/* Replace with actual profile image */}
                <img src="/profile2-placeholder.png" alt="Profile" className="profile-image" />
                <div className="author-info">
                  <h3>Name</h3>
                  <p>Description</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <h2>"A genuinely glowing review"</h2>
              <div className="testimonial-author">
                {/* Replace with actual profile image */}
                <img src="/profile3-placeholder.png" alt="Profile" className="profile-image" />
                <div className="author-info">
                  <h3>Name</h3>
                  <p>Description</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="App">
      <header className="navbar">
      <div className="logo">
        <img src="/logo-placeholder.png" alt="SafeRide Logo" className="nav-logo" />
      </div>
        <nav className="nav-links">
          <a 
            href="#booking" 
            onClick={(e) => { e.preventDefault(); navigateTo('booking'); }}
            className={currentPage === 'booking' ? 'active' : ''}
          >
            Booking
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </a>
        </nav>
      </header>
      
      {renderPage()}

      <footer>
        <p>&copy; {new Date().getFullYear()} SafeRide. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
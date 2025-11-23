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
        {/* --- HERO SECTION --- */}
        <section className="hero">
          <div className="hero-content">
            <h1>SafeRide: Your Trusted, Shared, & Affordable College Shuttle</h1>
            <p>Reliable and stress-free rideshares between Cornell, Colgate, Syracuse, and major cities like Ithaca, Rochester, and NYC. Save money and travel safe with our community-focused service.</p>
            {/* The primary call-to-action button */}
            <button className="quote-btn large" onClick={() => navigateTo('booking')}>Book Your Ride Now</button>
          </div>
          <div className="logo-container">
            <img src="/logo-placeholder.png" alt="SafeRide Logo" className="main-logo" />
          </div>
        </section>

        <section className="routes-section">
          <h1>Common Routes & Pricing</h1>
          
          <div className="routes-container">
            <div className="routes-list">
              <div className="route-item">
                <h2>Ithaca to Rochester</h2>
                <p className="price">$100, one-way</p>
                <p>A direct, comfortable ride to the Rochester area.</p>
              </div>
              
              <div className="route-item">
                <h2>Ithaca to Syracuse</h2>
                <p className="price">$120 single rider, $90 for multiple riders</p>
                <p>The perfect way to travel between the two major university cities, with a discount for shared rides.</p>
              </div>
              
              <div className="route-item">
                <h2>Long Distance Routes</h2>
                <p className="price">$1 per mile, round-trip</p>
                <p>Customized rides to NYC, JFK, or any other destination.</p>
              </div>
              
              {/* Secondary call-to-action button */}
              <button className="quote-btn" onClick={() => navigateTo('booking')}>Check Availability</button>
            </div>
            
            <div className="map-container">
              <img src="/map-placeholder.png" alt="Map highlighting SafeRide routes" className="map-image" />
            </div>
          </div>
        </section>

        <section className="about-section">
          <h1>About Us</h1>
          
          <div className="about-container">
            <div className="about-text">
              <p>
                At **SafeRide**, we believe that getting to and from campus should be stress-free, safe, and community-driven. As a dedicated student transportation service, we provide reliable and comfortable rides for students traveling between colleges like Cornell, Colgate, and Syracuse to destinations like Ithaca, Rochester, and NYC. With upfront pricing, flexible scheduling, and a commitment to student safety, we ensure that every trip is smooth and hassle-free. Our small but growing team of experienced drivers is available 24/7, making sure students can count on us whenever they need a ride. Whether you're heading home for break, catching a flight, or just making a quick coffee stop along the way, SafeRide is here to get you there—comfortably and on time. What sets us apart? We keep things community-focused and transparent—students can see if a ride has already been booked and request to share for a lower fare. We also offer live tracking for parents, push notifications for pickups and drop-offs, and a straightforward booking system that allows for stops, rebookings, and pre-payments.
              </p>
            </div>
            
            <div className="about-image">
              <img src="/bus-placeholder.png" alt="SafeRide Shuttle Bus" className="bus-image" />
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h1>What Our Riders Say</h1>
          
          <div className="testimonials-container">
            <div className="testimonial-card">
              <h2>"The most reliable driving service ever..."</h2>
              <p>
                "The most reliable driving service ever. I am a woman and riding an Uber by myself made me a little anxious; however, I am so glad that I was able to find this service. I had faced a difficult situation that had me needing to urgently go to JFK Airport straight from Ithaca and Mr. Haider was able to kindly and swiftly accommodate my situation and take me to JFK Airport. When returning back to Ithaca, my flight kept getting delayed; however, Mr. David waited for me and helped me get back home safely. I wouldn’t have gotten to the airport and back home without Mr. David and Mr. Haider. They are very kind, caring and safe drivers - I highly recommend using their service!!"
              </p>
              <div className="testimonial-author">
                <img src="/profile1-placeholder.png" alt="Female Passenger Profile" className="profile-image" />
                <div className="author-info">
                  <h3>Female Passenger</h3>
                  <p>Trip to JFK Airport</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <h2>"Such a great experience!"</h2>
              <p>
                "I used Saferide to get from the Syracuse airport to Cornell, and it was such a great experience! David was on time, super friendly, and made the long ride feel comfortable and easy. Everything went smoothly from pickup to drop-off, and I felt comfortable the whole way. It took a lot of stress out of traveling, especially after a flight, and I’d definitely use Saferide again."
              </p>
              <div className="testimonial-author">
                <img src="/profile2-placeholder.png" alt="Male Passenger Profile" className="profile-image" />
                <div className="author-info">
                  <h3>Male Passenger</h3>
                  <p>Syracuse to Cornell</p>
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
          {/* Using buttons to fix accessibility warning */}
          <button 
            onClick={() => navigateTo('home')}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('booking')}
            className={currentPage === 'booking' ? 'active' : ''}
          >
            Booking
          </button>
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
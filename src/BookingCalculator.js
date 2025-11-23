import React, { useState, useEffect } from 'react';

// --- Square Payment Integration Component ---
// This simulates the Square payment form being dynamically loaded and rendered.
const SquarePaymentForm = ({ price }) => {
    // NOTE: These are MOCK IDs. Your company must replace these with their actual Sandbox or Production IDs.
    const SQUARE_APP_ID = 'sq0idp-MOCK-APP-ID-12345';
    const SQUARE_LOCATION_ID = 'MOCK_LOCATION_ID_54321';

    useEffect(() => {
        const initializeSquare = () => {
            if (!window.SqPaymentForm) {
                console.error("Square SDK not loaded. Check index.html script tag.");
                return;
            }

            const fieldStyle = {
                input: {
                    fontSize: '14px',
                    padding: '8px 12px',
                    color: '#333',
                },
            };

            // eslint-disable-next-line no-unused-vars
            const paymentForm = new window.SqPaymentForm({
                applicationId: SQUARE_APP_ID,
                locationId: SQUARE_LOCATION_ID,
                
                // Define the IDs of the HTML elements where the secure fields will be injected
                cardNumber: { elementId: 'sq-card-number', style: fieldStyle },
                cvv: { elementId: 'sq-cvv', style: fieldStyle },
                expirationDate: { elementId: 'sq-expiration-date', style: fieldStyle },
                postalCode: { elementId: 'sq-postal-code', style: fieldStyle },
                
                callbacks: {
                    /*
                    NOTE: In a real app, this is where you would handle the tokenization (payment submission).
                    */
                    cardNonceResponseReceived: function(errors, nonce, cardData) {
                        if (errors) {
                            console.error("Payment tokenization failed:", errors);
                            alert(`Error processing card: ${errors[0].message}`);
                            return;
                        }
                        console.log("SUCCESS! Payment Nonce generated (Ready for backend processing):", nonce);
                        alert(`Booking Confirmed! (Mock Payment Nonce: ${nonce})`);
                    },
                    unsupportedBrowserDetected: function() {
                        console.error("Browser unsupported by Square SDK.");
                    },
                    paymentFormLoaded: function() {
                        console.log("Square Payment Form fields loaded successfully.");
                    }
                }
            });

            return () => {};
        };
        
        if (window.SqPaymentForm) {
            initializeSquare();
        } else {
            const checkScript = setInterval(() => {
                if (window.SqPaymentForm) {
                    clearInterval(checkScript);
                    initializeSquare();
                }
            }, 100);
        }
    }, [price]);

    return (
        <div className="square-placeholder">
            <p style={{fontSize: '0.85rem', color: '#2F3691', fontWeight: 'bold', marginBottom: '10px'}}>
                (Secure Payment Fields are loading from Square's Servers)
            </p>
            <div className="square-form-mock">
                
                {/* These are the containers where Square will inject its secure iframes */}
                <div id="sq-card-number"></div>
                <div id="sq-expiration-date"></div>
                <div id="sq-cvv"></div>
                <div id="sq-postal-code"></div>

                <button 
                    className="square-pay-btn"
                    onClick={() => console.log("Simulating Square payment initiation...")}
                >
                    Complete Booking: Pay ${price}
                </button>
            </div>
        </div>
    );
};
// End of SquarePaymentForm component

// --- Mock Availability Logic ---
const getMockAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i + 1);
        dates.push(nextDay.toISOString().split('T')[0]);
    }
    return dates;
};

// --- Mock Pricing Logic ---
const FIXED_ROUTES = [
    { from: "Ithaca, NY", to: "Rochester, NY", distance: 88, fixedPrice: 100 },
    { from: "Ithaca, NY", to: "Syracuse, NY", distance: 57, singlePrice: 120, sharedPrice: 90 },
];
const COST_PER_MILE_ROUND_TRIP = 1.00;

function calculateMockDistance(from, to) {
    const p = from.toLowerCase();
    const d = to.toLowerCase();

    // 1. Check fixed routes (robust city detection)
    const fixed = FIXED_ROUTES.find(r => 
        (((p.includes("ithaca") || p.includes("cornell")) && (d.includes("rochester") || d.includes("rit"))) || 
        ((d.includes("ithaca") || d.includes("cornell")) && (p.includes("rochester") || p.includes("rit")))) ||
        (((p.includes("ithaca") || p.includes("cornell")) && (d.includes("syracuse") || d.includes("syr"))) ||
        ((d.includes("ithaca") || d.includes("cornell")) && (p.includes("syracuse") || d.includes("syr"))))
    );
    if (fixed) return fixed.distance;

    // 2. Mock specific known long distances 
    if (((p.includes("ithaca") || p.includes("cornell")) && (d.includes("jfk") || d.includes("new york") || d.includes("nyc"))) || 
        ((d.includes("ithaca") || d.includes("cornell")) && (p.includes("jfk") || p.includes("new york") || p.includes("nyc")))) 
        {
            return 260; 
        }
    
    // 3. Default estimate
    const mockDistance = 180 + Math.floor(Math.random() * 80); 
    return Math.min(Math.max(mockDistance, 50), 300); 
}


function BookingCalculator({ onNavigate }) {
  const availableDates = getMockAvailableDates();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: availableDates[0],
    time: '12:00',
    riders: 1,
  });
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setQuote(null);
    setError('');
  };

  const calculateQuote = () => {
    const { pickup, dropoff, riders } = formData;
    if (!pickup || !dropoff || !riders || !formData.date || !formData.time) {
      setError("Please fill out all required fields (Location, Date, and Time).");
      setQuote(null);
      return;
    }

    const distance = calculateMockDistance(pickup, dropoff);
    let estimatedPrice = 0;
    
    const p = pickup.toLowerCase();
    const d = dropoff.toLowerCase();
    const isIthacaRegion = p.includes("ithaca") || p.includes("cornell") || d.includes("ithaca") || d.includes("cornell");
    
    // 1. Rochester
    if (isIthacaRegion && (p.includes("rochester") || p.includes("rit") || d.includes("rochester") || d.includes("rit"))) {
        estimatedPrice = 100;
        setQuote({ price: estimatedPrice, distance: distance, details: "Fixed rate: $100 one-way (Ithaca Region ↔ Rochester Region)." });
        setError(''); return;
    }

    // 2. Syracuse
    if (isIthacaRegion && (p.includes("syracuse") || p.includes("syr") || d.includes("syracuse") || d.includes("syr"))) {
        if (riders === 1) {
            estimatedPrice = 120;
            setQuote({ price: estimatedPrice, distance: distance, details: "Fixed rate: $120 for single rider (Ithaca Region ↔ Syracuse Region)." });
        } else {
            estimatedPrice = 90; 
            setQuote({ price: estimatedPrice, distance: distance, details: "Fixed rate: $90 total for multiple riders (shared ride discount applied)." });
        }
        setError(''); return;
    }
    
    // 3. All other long-distance routes ($1 per mile, round-trip)
    const roundTripDistance = distance * 2;
    estimatedPrice = roundTripDistance * COST_PER_MILE_ROUND_TRIP;
    
    let priceDetails = `$${COST_PER_MILE_ROUND_TRIP}/mile (Round-trip distance: ${roundTripDistance} miles).`;
    
    if (estimatedPrice < 150) {
        estimatedPrice = 150;
        priceDetails = `Minimum custom trip fee applied. Base rate calculated on distance.`;
    }

    setQuote({ price: Math.round(estimatedPrice), distance: distance, details: priceDetails });
    setError('');
  };

  const handleBook = () => {
    setStep(2); // Proceed to Schedule
  };

  const handleSchedule = () => {
      setStep(3); // Proceed to Payment
  }

  // UI for the Quote Calculator (Step 1)
  const renderQuoteCalculator = () => (
    <div className="booking-container">
      <div className="calculator-panel">
        <h2 className="panel-title">1. Get Your Ride Quote</h2>

        <div className="form-group">
            <label htmlFor="pickup">Pick Up Location</label>
            <input 
                id="pickup" name="pickup" value={formData.pickup} onChange={handleInputChange} 
                placeholder="City, Campus Name, or Full Address (e.g., Cornell University, Ithaca, NY)"
                required
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="dropoff">Drop Off Location</label>
            <input 
                id="dropoff" name="dropoff" value={formData.dropoff} onChange={handleInputChange} 
                placeholder="City, Airport Code (e.g., Syracuse Airport (SYR), Rochester, JFK)"
                required
            />
        </div>

        <div className="form-row">
            <div className="form-group half-width">
                <label htmlFor="date">Date (Availability Check)</label>
                <select 
                    id="date" name="date" value={formData.date} onChange={handleInputChange} required
                >
                    {availableDates.map(dateStr => (
                        <option key={dateStr} value={dateStr}>{new Date(dateStr).toLocaleDateString()}</option>
                    ))}
                </select>
            </div>

            <div className="form-group half-width">
                <label htmlFor="time">Time</label>
                <input 
                    id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="riders">Number of Riders</label>
            <select id="riders" name="riders" value={formData.riders} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Rider{num > 1 ? 's' : ''}</option>
                ))}
            </select>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button className="quote-btn large" onClick={calculateQuote}>CALCULATE ESTIMATE</button>
      </div>

      <div className="quote-results-panel">
        <h2 className="panel-title">Route Preview & Estimate</h2>
        
        {quote ? (
          <div className="quote-display">
            <p className="quote-price-label">Estimated Price</p>
            <p className="quote-price">${quote.price}<span className="currency"> USD</span></p>
            
            <div className="quote-details">
                <p><strong>Route:</strong> {formData.pickup} to {formData.dropoff}</p>
                <p><strong>Distance (One-Way):</strong> {quote.distance} miles</p>
                <p><strong>Riders:</strong> {formData.riders}</p>
                <p><strong>Pricing:</strong> {quote.details}</p>
            </div>
            
            <button className="book-btn" onClick={handleBook}>PROCEED TO SCHEDULE</button>
          </div>
        ) : (
          <div className="map-placeholder-box">
            <img src="/map-placeholder.png" alt="Map Preview" className="map-preview-image" />
            <p className="preview-message">Enter your trip details above to calculate distance and receive an instant quote.</p>
          </div>
        )}
      </div>
    </div>
  );

  // UI for the Scheduling Step (Step 2)
  const renderScheduleRide = () => (
    <div className="schedule-payment-container">
        <h2 className="panel-title">2. Schedule Your Ride</h2>
        <div className="back-link" onClick={() => setStep(1)}>&larr; Back to Quote</div>
        
        <div className="schedule-details">
            <div className="detail-card">
                <h3>Trip Summary</h3>
                <p><strong>From:</strong> {formData.pickup}</p>
                <p><strong>To:</strong> {formData.dropoff}</p>
                <p><strong>Date/Time:</strong> {new Date(formData.date).toLocaleDateString()} at {formData.time}</p>
                <p><strong>Riders:</strong> {formData.riders}</p>
                <p className="final-price"><strong>Total Cost:</strong> ${quote.price} USD</p>
            </div>
            
            <div className="payment-placeholder-card">
                <h3>Select Final Time & Driver (via Calendly)</h3>
                <p className="subtext">
                    Click the button below to open the external scheduling link in a new window to select your driver and final reservation time.
                </p>
                
                <a 
                    href="https://calendly.com/YOUR_COMPANY_LINK/safetrip-booking" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="calendly-link-btn"
                >
                    Open Calendly Scheduling Page
                </a>
                
                <p className="subtext" style={{marginTop: '2rem'}}>
                    Once scheduled on Calendly, confirm below to proceed to payment.
                </p>
                <button className="book-btn" onClick={handleSchedule}>I HAVE SCHEDULED, PROCEED TO PAYMENT</button>
            </div>
        </div>
    </div>
  );

  // UI for the Payment Step (Step 3)
  const renderSchedulePayment = () => (
    <div className="schedule-payment-container">
        <h2 className="panel-title">3. Secure Payment</h2>
        <div className="back-link" onClick={() => setStep(2)}>&larr; Back to Scheduling</div>

        <div className="schedule-details">
            <div className="detail-card">
                <h3>Trip Summary</h3>
                <p><strong>From:</strong> {formData.pickup}</p>
                <p><strong>To:</strong> {formData.dropoff}</p>
                <p><strong>Date/Time:</strong> {new Date(formData.date).toLocaleDateString()} at {formData.time}</p>
                <p><strong>Riders:</strong> {formData.riders}</p>
                <p className="final-price"><strong>Total Cost:</strong> ${quote.price} USD</p>
            </div>
            
            <div className="payment-placeholder-card">
                <h3>Secure Payment & Confirmation</h3>
                <p className="subtext">
                    Please use the secure form below to complete your payment and confirm your booking.
                    (Your payment is processed by Square, ensuring security.)
                </p>
                
                <SquarePaymentForm price={quote.price} />
                
                <p className="subtext">
                    Upon successful payment, you will receive a confirmation email with driver and tracking details.
                </p>
            </div>
        </div>
        
    </div>
  );


  return (
    <div className="booking-page-wrapper">
        <h1 className="booking-page-header">Book Your SafeRide Shuttle</h1>
        {step === 1 && renderQuoteCalculator()}
        {step === 2 && renderScheduleRide()}
        {step === 3 && renderSchedulePayment()}
        <button className="back-home-btn" onClick={() => onNavigate('home')}>&larr; Return to Homepage</button>
    </div>
  );
}

export default BookingCalculator;
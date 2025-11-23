## SafeRide: College Shuttle Service Website

This project is the official website for SafeRide, specializing in affordable rideshares in the Ithaca, Syracuse, and Rochester regions.

The application is built using React and features a modern, responsive design and a multi-step booking system tailored to SafeRide's specific pricing model.

-----

### Key Features Implemented

* **Complete UI Redesign:** Modernized homepage layout using CSS with accurate branding (Navy and Light Blue).
* **Robust Pricing Logic:** Implements SafeRide's custom flat rates for key routes (Ithaca/Cornell ↔ Syracuse/Rochester) and mocks a $1/mile round-trip calculation for other long-distance trips.
* **Three-Step Booking Flow:** A clear user journey for reservation:
    1.  **Get Quote:** Instant pricing based on location and riders.
    2.  **Schedule Ride:** Placeholder link for seamless integration with the corporate **Calendly** account.
    3.  **Secure Payment:** Integration of the **Square Web Payments SDK** for secure tokenization.

-----

### CORPORATE SETUP REQUIRED

The application is fully coded but requires linking to your company's external services to be fully functional in production. **These steps must be completed before the application is deployed to a live domain (HTTPS):**

#### 1. Configure Square Payments (Required for Step 3)

The Square form is currently initialized with mock sandbox IDs. To enable real payments, you must:

* **Obtain Live Credentials:** Get your Production Application ID and Location ID from your Square Developer Dashboard.
* **Replace IDs in Code:** Update the following lines at the top of `src/BookingCalculator.js`:

    ```javascript
    const SQUARE_APP_ID = 'YOUR_LIVE_SQUARE_APPLICATION_ID';
    const SQUARE_LOCATION_ID = 'YOUR_LIVE_SQUARE_LOCATION_ID';
    ```

#### 2. Configure Calendly Scheduling (Required for Step 2)

* **Obtain Scheduling Link:** Get the embed URL for your public SafeRide booking page in Calendly.
* **Replace Placeholder Link:** Update the `href` in the **Step 2** rendering function within `src/BookingCalculator.js` with your actual Calendly URL.

-----

### Available Scripts (How to Run the App)

In the project directory, you can run the following standard Create React App commands:

### `npm install`

Installs all necessary project dependencies. Run this first after cloning the repository.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. This is the command you run before deploying the site to a live server.
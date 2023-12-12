// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// <PayPalButtons
//                           createOrder={createOrder}
//                           onApprove={onApprove}
//                           onError={onError}
//                         ></PayPalButtons>
//                       </div>
// const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
// <PayPalScriptProvider deferLoading={true}>
//           <App />
//         </PayPalScriptProvider>
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// PAYPAL_CLIENT_ID=ATlmHf_GhKG08lEYfJGjMEyHJY-c0bOdOeW8R7INCIly6j7-BM6YYQx6dtIb-Rkho6ozabuQHocE9vOs


// App.jsx (or your React component file)

import React from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const YourComponent = () => {
  const yourPayPalClientId = 'your-paypal-client-id'; // Replace with your actual PayPal Client ID

  // PayPal script reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Callbacks for PayPalButtons
  const createOrder = (data, actions) => {
    // Implement createOrder logic
  };

  const onApprove = (data, actions) => {
    // Implement onApprove logic
  };

  const onError = (err) => {
    // Implement onError logic
  };

  return (
    <div>
      <PayPalScriptProvider deferLoading={true}>
        {/* App component */}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        ></PayPalButtons>
      </PayPalScriptProvider>
    </div>
  );
};

export default YourComponent;

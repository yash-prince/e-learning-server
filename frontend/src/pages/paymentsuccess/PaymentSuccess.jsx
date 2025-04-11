import React from 'react'
import "./paymentsuccess.css"
import { Link, useParams } from 'react-router-dom'

const PaymentSuccess = ({user}) => {
  const params = useParams();
  return <div className="payment-success-page">
    {user && <div className="success-message">
        <h2>Payment successful</h2>
        <p>Your course subscription has been activated</p>
        <p>Referance no - {params.id}</p>
        <Link to= {`/${user._id}/dashboard`} className="common-btn">
        Go to dashboard
        </Link>
        </div>
    }
  </div>;
};

export default PaymentSuccess

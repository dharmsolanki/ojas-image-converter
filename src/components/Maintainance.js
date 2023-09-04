import React from 'react';

export default function Maintenance() {
  return (
    <div className="maintenance-container">
      <img className="maintenance-image" src="/images/maintenance.png" alt="Maintenance" width="300" height="200" />
      <p className="message">Sorry, the website is currently under maintenance. We'll be back soon!</p>
      <style jsx>{`
        .maintenance-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .message {
          margin-top: 20px;
          font-size: 18px;
          color: white;
        }
      `}</style>
    </div>
  );
}

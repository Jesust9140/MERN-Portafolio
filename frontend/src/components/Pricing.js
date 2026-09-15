import React, { useState } from 'react';
import '../css/Pricing.css';

const Pricing = () => {
  const [loadingTier, setLoadingTier] = useState(null);
  const [error, setError] = useState('');

  const tiers = [
    {
      id: 1,
      tierKey: "landing-page",
      name: "Landing Page",
      price: "$450",
      description: "A single, high-converting page to get your business online fast.",
      features: [
        "Custom-designed single page",
        "Mobile-responsive layout",
        "Contact form",
        "Basic SEO setup",
        "1 round of revisions"
      ],
      highlighted: false,
      payable: true
    },
    {
      id: 2,
      tierKey: "business-site",
      name: "Business Site",
      price: "$950",
      description: "A full multi-page site for a growing business.",
      features: [
        "Up to 5 pages",
        "Custom design, no templates",
        "Contact/quote form with email notifications",
        "Mobile-responsive layout",
        "Basic SEO setup",
        "2 rounds of revisions"
      ],
      highlighted: true,
      payable: true
    },
    {
      id: 3,
      tierKey: "full-stack-app",
      name: "Full-Stack App",
      price: "From $2,000",
      description: "A custom web application with real functionality — logins, databases, and more.",
      features: [
        "Custom frontend and backend",
        "Database-backed features (accounts, bookings, payments, etc.)",
        "API integrations",
        "Deployment and setup",
        "Ongoing support available"
      ],
      highlighted: false,
      // Variable pricing - no fixed amount to charge, so this tier goes
      // through the contact form instead of straight to checkout.
      payable: false
    }
  ];

  const handleCheckout = async (tierKey) => {
    setError('');
    setLoadingTier(tierKey);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierKey })
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoadingTier(null);
        return;
      }

      // Same-tab redirect straight to Stripe Checkout - no new tab.
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setLoadingTier(null);
    }
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Pricing</h2>
          <p className="pricing-intro">
            Straightforward pricing to fit your project. Need something different? Let's talk.
          </p>
        </div>

        {error && <p className="pricing-error">{error}</p>}

        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`pricing-card ${tier.highlighted ? 'pricing-card-highlighted' : ''}`}
            >
              {tier.highlighted && (
                <div className="pricing-badge">Most Popular</div>
              )}
              <h3 className="pricing-card-name">{tier.name}</h3>
              <p className="pricing-card-price">{tier.price}</p>
              <p className="pricing-card-description">{tier.description}</p>
              <ul className="pricing-card-features">
                {tier.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              {tier.payable ? (
                <button
                  type="button"
                  className="pricing-card-button"
                  onClick={() => handleCheckout(tier.tierKey)}
                  disabled={loadingTier === tier.tierKey}
                >
                  {loadingTier === tier.tierKey ? 'Redirecting...' : 'Get Started'}
                </button>
              ) : (
                <a href="#contact" className="pricing-card-button">
                  Get a Quote
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

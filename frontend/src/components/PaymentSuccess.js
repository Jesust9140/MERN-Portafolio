import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/PaymentSuccess.css';
import templates from '../data/templates';

const MAX_FILES = 10;

const StepHeader = ({ number, label }) => (
  <div className="intake-step-header">
    <span className="intake-step-number">{number}</span>
    <h2 className="intake-step-label">{label}</h2>
  </div>
);

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionError, setSessionError] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    details: '',
    phone: '',
    assetLink: '',
    company: '' // honeypot
  });
  const [templateChoice, setTemplateChoice] = useState(null); // null = custom/none
  const [uploadedFiles, setUploadedFiles] = useState([]); // { id, name, url, type, status: 'uploading' | 'done' | 'error' }
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!sessionId) {
      setSessionError('Missing payment session. If you just paid, check your email for a link.');
      setLoadingSession(false);
      return;
    }

    fetch(`${apiUrl}/api/checkout-session/${sessionId}`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          setSessionError(data.error || 'Could not confirm your payment.');
        } else {
          setSession(data);
        }
      })
      .catch(() => {
        setSessionError('Could not confirm your payment. Please try refreshing this page.');
      })
      .finally(() => setLoadingSession(false));
  }, [sessionId, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // allow selecting the same file again later

    const remainingSlots = MAX_FILES - uploadedFiles.length;
    const filesToUpload = files.slice(0, remainingSlots);

    for (const file of filesToUpload) {
      const localId = `${Date.now()}-${Math.random()}`;
      setUploadedFiles((prev) => [
        ...prev,
        { id: localId, name: file.name, url: null, type: file.type, status: 'uploading' }
      ]);

      try {
        const signResponse = await fetch(`${apiUrl}/api/upload-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, contentType: file.type })
        });
        const signData = await signResponse.json();

        if (!signResponse.ok) {
          throw new Error(signData.error || 'Could not get upload URL');
        }

        const uploadResponse = await fetch(signData.uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === localId ? { ...f, url: signData.fileUrl, status: 'done' } : f))
        );
      } catch (error) {
        console.error('File upload error:', error);
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === localId ? { ...f, status: 'error' } : f))
        );
      }
    }
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const anyFileUploading = uploadedFiles.some((f) => f.status === 'uploading');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/project-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ...formData,
          templateChoice,
          uploadedFiles: uploadedFiles
            .filter((f) => f.status === 'done')
            .map((f) => ({ url: f.url, type: f.type }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Project intake submit error:', error);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const amountDisplay = session && session.amount ? `$${(session.amount / 100).toFixed(2)}` : null;

  return (
    <section className="payment-success-section">
      <div className="payment-success-container">
        {loadingSession && (
          <p className="payment-success-status">Confirming your payment...</p>
        )}

        {!loadingSession && sessionError && (
          <div className="payment-success-status payment-success-error">
            <h1 className="payment-success-title">We couldn't confirm that payment</h1>
            <p>{sessionError}</p>
            <a href="/#contact" className="payment-success-link">Contact me directly instead →</a>
          </div>
        )}

        {!loadingSession && session && !submitted && (
          <>
            <div className="payment-success-header">
              <div className="payment-success-badge">
                <svg viewBox="0 0 24 24" fill="none" className="payment-success-badge-icon">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="payment-success-title">Payment received — thank you!</h1>
              <p className="payment-success-subtitle">
                {session.tierName ? `${session.tierName}${amountDisplay ? ` — ${amountDisplay}` : ''}` : 'Your payment went through.'}
              </p>
              <p className="payment-success-description">
                One more thing — tell me a bit about your project so I can get started on exactly what you need.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="payment-success-form">
              <div className="payment-success-honeypot" aria-hidden="true">
                <label htmlFor="ps-company">Company</label>
                <input
                  type="text"
                  id="ps-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              {/* Step 01 - Contact Details */}
              <div className="intake-step">
                <StepHeader number="01" label="Contact Details" />

                <div className="intake-field">
                  <label htmlFor="ps-companyName" className="intake-field-label">Business / Company Name</label>
                  <input
                    type="text"
                    id="ps-companyName"
                    name="companyName"
                    placeholder="e.g. Acme Corp"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="intake-field">
                    <label htmlFor="ps-firstName" className="intake-field-label">First Name</label>
                    <input
                      type="text"
                      id="ps-firstName"
                      name="firstName"
                      placeholder="e.g. John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="intake-field">
                    <label htmlFor="ps-lastName" className="intake-field-label">Last Name</label>
                    <input
                      type="text"
                      id="ps-lastName"
                      name="lastName"
                      placeholder="e.g. Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="intake-field">
                    <label htmlFor="ps-email" className="intake-field-label">Email Address</label>
                    <input
                      type="email"
                      id="ps-email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="intake-field">
                    <label htmlFor="ps-phone" className="intake-field-label">Phone (optional)</label>
                    <input
                      type="tel"
                      id="ps-phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Step 02 - Template */}
              <div className="intake-step">
                <StepHeader number="02" label="Choose a Template (Optional)" />

                <div className="template-picker">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className={`template-picker-option ${templateChoice === template.name ? 'template-picker-option-active' : ''}`}
                      onClick={() => setTemplateChoice(template.name)}
                    >
                      <img src={template.image} alt={template.name} className="template-picker-image" />
                      <span className="template-picker-name">{template.name}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`template-picker-option template-picker-option-custom ${templateChoice === null ? 'template-picker-option-custom-active' : ''}`}
                    onClick={() => setTemplateChoice(null)}
                  >
                    <span className="template-picker-plus">+</span>
                    <span className="template-picker-name">Custom</span>
                  </button>
                </div>
              </div>

              {/* Step 03 - Assets & Files */}
              <div className="intake-step">
                <StepHeader number="03" label="Assets &amp; Files" />

                <label className="payment-success-dropzone">
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploadedFiles.length >= MAX_FILES}
                    hidden
                  />
                  <span className="payment-success-dropzone-icon">
                    <svg viewBox="0 0 24 24" fill="none" className="payment-success-dropzone-icon-svg">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="payment-success-dropzone-title">Upload logo, brand colors, or reference images</span>
                  <span className="payment-success-dropzone-subtitle">Images, PDF, or Word docs (optional)</span>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="payment-success-file-list">
                    {uploadedFiles.map((file) => {
                      const isImage = file.type && file.type.startsWith('image/');
                      return (
                        <div key={file.id} className="payment-success-file-item">
                          {file.status === 'done' && file.url && isImage ? (
                            <img src={file.url} alt={file.name} className="payment-success-file-thumb" />
                          ) : file.status === 'done' ? (
                            <div className="payment-success-file-thumb payment-success-file-thumb-doc">
                              {file.type && file.type.includes('pdf') ? 'PDF' : 'DOC'}
                            </div>
                          ) : (
                            <div className="payment-success-file-thumb payment-success-file-thumb-placeholder">
                              {file.status === 'uploading' ? '…' : '!'}
                            </div>
                          )}
                          <span className="payment-success-file-name">{file.name}</span>
                          <button
                            type="button"
                            className="payment-success-file-remove"
                            onClick={() => removeFile(file.id)}
                            aria-label={`Remove ${file.name}`}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="intake-field payment-success-asset-link">
                  <label htmlFor="ps-assetLink" className="intake-field-label">
                    Or paste a link to your files (Google Drive, Dropbox, etc.)
                  </label>
                  <input
                    type="url"
                    id="ps-assetLink"
                    name="assetLink"
                    placeholder="https://drive.google.com/..."
                    value={formData.assetLink}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Step 04 - Project Description */}
              <div className="intake-step">
                <StepHeader number="04" label="Project Description" />

                <textarea
                  name="details"
                  placeholder="Tell me about your project — what pages/features you need, any examples you like, timeline, etc."
                  rows="6"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              {submitError && <p className="payment-success-form-error">{submitError}</p>}

              <button
                type="submit"
                disabled={submitting || anyFileUploading}
                className="payment-success-button"
              >
                {anyFileUploading ? 'Uploading images...' : submitting ? 'Sending...' : 'Send Project Details'}
              </button>

              <p className="payment-success-trust-line">
                🔒 Secure Connection • Encrypted Data
              </p>
            </form>
          </>
        )}

        {submitted && (
          <div className="payment-success-status">
            <h1 className="payment-success-title">Got it — thank you!</h1>
            <p>I have your project details and will be in touch soon.</p>
            <a href="/" className="payment-success-link">Back to home →</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentSuccess;

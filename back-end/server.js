const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const { sendMail } = require('./mailer');
const Intake = require('./models/Intake');
const AdminSession = require('./models/AdminSession');

const app = express();
const PORT = process.env.PORT || 5000;

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    : undefined
});

// MongoDB connection - established on startup so intake submissions and
// admin sessions have somewhere real to live instead of disappearing.
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error.message));
} else {
  console.warn('MONGODB_URI not set - intake submissions will not be saved and the admin dashboard will not work.');
}

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));

// Stripe webhook needs the raw request body for signature verification, so
// it must be registered with express.raw() BEFORE the global express.json()
// parser below - otherwise the body would already be parsed/consumed and
// signature verification would fail.
app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error('Stripe webhook signature verification failed:', error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const tierName = session.metadata && session.metadata.tierName
        ? session.metadata.tierName
        : 'Unknown tier';
      const amount = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : 'unknown amount';
      const buyerEmail = session.customer_details && session.customer_details.email
        ? session.customer_details.email
        : session.customer_email;
      const successLink = `${allowedOrigin}/payment-success?session_id=${session.id}`;

      // This webhook is the one reliable signal that money actually moved -
      // it fires regardless of whether the buyer's browser ever makes it to
      // the success page, so it's the right place to notify both sides.
      await sendMail({
        to: process.env.EMAIL_USER || 'jesust9140@gmail.com',
        subject: `New payment received - ${tierName} (${amount})`,
        body: `A payment just came in.\n\nTier: ${tierName}\nAmount: ${amount}\nBuyer email: ${buyerEmail || 'not provided'}\nSession: ${session.id}`
      });

      if (buyerEmail) {
        await sendMail({
          to: buyerEmail,
          subject: 'Thanks for your payment - one more step',
          body: `Thanks for your payment for ${tierName} (${amount})!\n\nTo make sure I build exactly what you need, tell me a bit about your project here:\n${successLink}\n\nIf you already filled this out, you're all set - I'll be in touch soon.`
        });
      }
    }

    res.json({ received: true });
  }
);

app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' }
});

const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});

// Fixed price tiers - kept server-side so the charged amount can never be
// tampered with from the client (never trust a price sent from the browser).
const PRICING_TIERS = {
  'landing-page': { name: 'Landing Page', amount: 60000 },   // $600.00
  'business-site': { name: 'Business Site', amount: 120000 }, // $1,200.00
  'growth-site': { name: 'Growth Site', amount: 180000 }, // $1,800.00
  'full-stack-app': { name: 'Full-Stack App (deposit)', amount: 280000 } // $2,800.00
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = ['website', 'software', 'custom-tool', 'other'];

const stripHtml = (value) => value.replace(/<[^>]*>/g, '');

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

//routes 
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Jesus T.",
    title: "Software Engineer",
    bio: "I build web experiences focused on accessibility and speed. I've started my software engineer career to help my ideas come true.",
    contact: {
      email: "jesust9140@gmail.com",
      linkedin: "https://www.linkedin.com/in/Jesust9140",
      github: "https://github.com/Jesust9140"
    }
  });
});
app.get('/api/experience', (req, res) => {
  res.json([
    {
      id: 1,
      company: "2020Companies",
      position: "Lead Samsung Experience Consultant (Lead SEC)",
      duration: "March 2022 - Present",
      location: "Brooklyn, NY",
      responsibilities: [
        "Led and supported a team of five Samsung Experience Consultants across four high-traffic Best Buy locations in Brooklyn and Manhattan.",
        "Served as the primary escalation point for complex customer issues, product questions, and device troubleshooting.",
        "Conducted weekly coaching sessions and 1:1 performance reviews focused on communication quality, issue resolution, and customer experience consistency.",
        "Delivered hands-on demonstrations of Samsung devices and ecosystem integrations, translating technical features into clear, real-world use cases.",
        "Coordinated with Samsung and Best Buy leadership to execute live events, in-store trainings, and technical walkthroughs.",
        "Maintained top regional performance for three consecutive years through consistent KPI achievement and strong team development."
      ]
    },
    {
      id: 2,
      company: "2020Companies",
      position: "Samsung Technical Support Consultant (in-store)",
      duration: "Jan 2022 - Mar 2022",
      location: "Garden City, NY",
      responsibilities: [
        "Acted as the first point of contact for walk-in customers, providing technical guidance, device explanations, and hands-on demonstrations.",
        "Diagnosed customer needs and recommended appropriate devices, configurations, and ecosystem solutions.",
        "Communicated technical concepts clearly to non-technical users, building trust and ensuring positive customer outcomes.",
        "Collaborated with cross-department teams to provide consistent, end-to-end customer support.",
        "Recognized for reliability, communication skills, and ability to quickly build rapport with customers."
      ]
    },
    {
      id: 3,
      company: "Best Buy",
      position: "Geek Squad Consultation Agent (CA)",
      duration: "Sept 2020 - Jan 2022",
      location: "Brooklyn, NY",
      responsibilities: [
        "Provided Tier 1 technical support for customer devices, including smartphones, laptops, and peripherals.",
        "Diagnosed hardware, software, and connectivity issues using Geek Squad and Apple diagnostic tools (GSX, GSX2, ATLAS).",
        "Supported Windows, macOS, and basic Linux environments, assisting users with OS configuration and troubleshooting.",
        "Assisted customers with productivity tools, including Microsoft Word, Excel, and OneDrive.",
        "Documented issues, troubleshooting steps, and resolutions according to Geek Squad service standards.",
        "Delivered clear explanations and preventative recommendations to help customers avoid recurring technical issues.",
        "Maintained strong customer satisfaction by communicating technical issues effectively, even when delivering unfavorable outcomes."
      ]
    }
  ]);
});

app.get('/api/education', (req, res) => {
  res.json([
    {
      id: 1,
      institution: "General Assembly",
      degree: "Software Engineer Bootcamp",
      duration: "Graduated",
      location: "New York, NY",
      details: [
        "Concentrations: Full-Stack Development",
        "Object-Oriented Programming, Computing in JS & Python, HTML/CSS, Node, Mathematics, AI"
      ]
    },
    {
      id: 2,
      institution: "Spring Creek Community School",
      degree: "Arts & Technologies",
      duration: "Sept 2016 - July 2020",
      location: "Brooklyn, NY",
      details: [
        "Concentrations: Critical Thinking, New Technologies, Algebra I & II",
        "Related Coursework: HTML/CSS, NODE"
      ]
    }
  ]);
});

app.get('/api/certificates', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Technical Support Fundamentals",
      issuer: "Google (Coursera)",
      date: "Dec 2025"
    },
    {
      id: 2,
      name: "Introduction to Cyber Attacks",
      issuer: "New York University (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 3,
      name: "Programming with JavaScript",
      issuer: "Meta (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 4,
      name: "Introduction to Front-End Development",
      issuer: "Meta (Coursera)",
      date: "Jan 2023"
    }
  ]);
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      name: "MERN Portfolio Website",
      description: "Personal portfolio website showcasing my skills and projects. Built with React frontend, Node.js/Express backend, and modern design principles. Features dark mode, responsive design, and RESTful API integration.",
      technologies: ["React", "Node.js", "Express", "TailwindCSS", "MongoDB", "JavaScript"],
      github: "https://github.com/Jesust9140",
      demo: "#",
      featured: true,
      image: "/images/me.jpeg"
    },
    {
      id: 2,
      name: "Cookbook CRUD App",
      description: "Full-stack application for managing recipes and ingredients. Features user authentication, recipe sharing, and pantry management. Built with MongoDB for data persistence and EJS for templating.",
      technologies: ["MongoDB", "Express", "Node.js", "EJS", "JavaScript", "CSS"],
      github: "https://github.com/Jesust9140/cookbook",
      demo: "#",
      featured: true,
      image: "/images/me.jpeg"
    },
    {
      id: 3,
      name: "Samsung Technical Support Platform",
      description: "Experience providing comprehensive technical support for Samsung products including troubleshooting software issues, Active Directory management, and customer service excellence. Achieved #1 performance in the U.S.",
      technologies: ["Customer Service", "Technical Support", "Windows", "Android", "Active Directory"],
      github: "#",
      demo: "#",
      featured: false,
      image: "/images/me.jpeg"
    }
  ]);
});


app.get('/api/skills', (req, res) => {
  res.json({
    technical: [
      "HTML, CSS, JavaScript, React",
      "Node.js, Express, MongoDB, Mongoose",
      "Windows & Linux fundamentals, OS concepts",
      "TCP/IP, DNS, basic networking & connectivity troubleshooting",
      "npm, REST APIs, debugging"
    ],
    professional: [
      "Customer Support & Technical Communication",
      "Technical Troubleshooting & Issue Resolution",
      "KPI Tracking, Reporting, & Documentation",
      "Team Leadership, Training, & Mentorship"
    ]
  });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, projectType, company } = req.body;

  const successResponse = {
    success: true,
    message: 'Message received! I will get back to you soon.'
  };

  // Honeypot - real users never see/fill this field, so if it's filled the
  // submission is almost certainly a bot. Pretend success without processing
  // it further so the bot doesn't learn the submission was rejected.
  if (company) {
    return res.json(successResponse);
  }

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (trimmedName.length > 100) {
    return res.status(400).json({ error: 'Name is too long' });
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  if (trimmedMessage.length > 2000) {
    return res.status(400).json({ error: 'Message is too long' });
  }

  const safeProjectType = PROJECT_TYPES.includes(projectType) ? projectType : '';

  await sendMail({
    to: process.env.EMAIL_USER || 'jesust9140@gmail.com',
    subject: `New contact form message from ${stripHtml(trimmedName)}`,
    body: `Name: ${stripHtml(trimmedName)}\nEmail: ${trimmedEmail}\nProject type: ${safeProjectType || 'not specified'}\n\nMessage:\n${stripHtml(trimmedMessage)}`
  });

  // Send success response
  res.json(successResponse);
});

// Stripe Checkout endpoint
app.post('/api/create-checkout-session', checkoutLimiter, async (req, res) => {
  const { tier } = req.body;
  const selectedTier = PRICING_TIERS[tier];

  if (!selectedTier) {
    return res.status(400).json({ error: 'Invalid pricing tier selected' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Payments are not set up yet. Please use the contact form instead.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // This account has Managed Payments on by default, which requires an
      // eligible product tax code we don't need for simple flat-rate service
      // pricing. Opt this session out so Checkout behaves like standard
      // Stripe Checkout (no automatic tax handling required).
      managed_payments: { enabled: false },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: selectedTier.name },
            unit_amount: selectedTier.amount
          },
          quantity: 1
        }
      ],
      metadata: { tier, tierName: selectedTier.name },
      success_url: `${allowedOrigin}/payment-success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${allowedOrigin}/#pricing`
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    res.status(500).json({ error: 'Something went wrong starting checkout. Please try again.' });
  }
});

// Looks up a completed Checkout session so the /payment-success page can
// confirm payment actually happened and show which tier was purchased,
// rather than trusting whatever is in the URL query string.
app.get('/api/checkout-session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Invalid session id' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Payments are not set up yet.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'This session has not been paid yet.' });
    }

    res.json({
      tierName: session.metadata && session.metadata.tierName,
      amount: session.amount_total,
      email: session.customer_details && session.customer_details.email
    });
  } catch (error) {
    console.error('Checkout session lookup error:', error);
    res.status(404).json({ error: 'Could not find that payment session.' });
  }
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many uploads. Please try again later.' }
});

const ALLOWED_UPLOAD_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const sanitizeFilename = (filename) =>
  String(filename).replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100);

// Generates a pre-signed S3 PUT URL so the browser can upload a file directly
// to S3 - the file never passes through this server, keeping memory/bandwidth
// use here minimal and avoiding the need for multipart body parsing.
app.post('/api/upload-url', uploadLimiter, async (req, res) => {
  const { filename, contentType } = req.body;

  if (!filename || !contentType) {
    return res.status(400).json({ error: 'Missing filename or content type' });
  }

  if (!ALLOWED_UPLOAD_TYPES.includes(contentType)) {
    return res.status(400).json({ error: 'Only images, PDFs, and Word documents are allowed' });
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.S3_BUCKET_NAME) {
    return res.status(503).json({ error: 'File uploads are not set up yet.' });
  }

  try {
    const key = `intake/${crypto.randomUUID()}-${sanitizeFilename(filename)}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;

    res.json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error('S3 pre-signed URL error:', error);
    res.status(500).json({ error: 'Could not prepare upload. Please try again.' });
  }
});

const intakeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});

// Templates a client can pick as a starting reference - kept in sync with
// frontend/src/data/templates.js. Validated server-side so a submission
// can't claim an arbitrary/fake template name.
const TEMPLATE_NAMES = [
  'Midsummer Nail Spa',
  'Bristol Opticians',
  'High Concepts',
  'FBF',
  'VestaState'
];

const MAX_UPLOADED_FILES = 10;

// Post-payment project intake form - lets a buyer tell Jesus what they
// actually want built, tied back to the Stripe session they paid with.
app.post('/api/project-intake', intakeLimiter, async (req, res) => {
  const { sessionId, firstName, lastName, email, details, phone, company, companyName, templateChoice, uploadedFiles, assetLink } = req.body;

  const successResponse = { success: true, message: 'Thanks! I\'ll be in touch soon.' };

  // Honeypot, same pattern as /api/contact.
  if (company) {
    return res.json(successResponse);
  }

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Missing or invalid session id' });
  }

  if (!firstName || !lastName || !email || !details) {
    return res.status(400).json({ error: 'Please fill in your name, email, and project details' });
  }

  const trimmedFirstName = String(firstName).trim();
  const trimmedLastName = String(lastName).trim();
  const trimmedEmail = String(email).trim();
  const trimmedDetails = String(details).trim();
  const trimmedPhone = phone ? String(phone).trim().slice(0, 30) : '';
  const trimmedCompanyName = companyName ? String(companyName).trim().slice(0, 150) : '';

  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedDetails) {
    return res.status(400).json({ error: 'Please fill in your name, email, and project details' });
  }

  if (trimmedFirstName.length > 50 || trimmedLastName.length > 50) {
    return res.status(400).json({ error: 'Name is too long' });
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  if (trimmedDetails.length > 2000) {
    return res.status(400).json({ error: 'Details are too long' });
  }

  const safeTemplateChoice = TEMPLATE_NAMES.includes(templateChoice) ? templateChoice : null;

  const bucketHost = process.env.S3_BUCKET_NAME
    ? `${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`
    : null;

  let safeUploadedFiles = [];
  if (Array.isArray(uploadedFiles)) {
    safeUploadedFiles = uploadedFiles
      .filter((file) => file && typeof file.url === 'string' && typeof file.type === 'string')
      .filter((file) => {
        try {
          const parsed = new URL(file.url);
          return bucketHost ? parsed.host === bucketHost : parsed.protocol === 'https:';
        } catch {
          return false;
        }
      })
      .filter((file) => ALLOWED_UPLOAD_TYPES.includes(file.type))
      .slice(0, MAX_UPLOADED_FILES)
      .map((file) => ({ url: file.url, type: file.type }));
  }

  let safeAssetLink = '';
  if (assetLink) {
    const trimmedLink = String(assetLink).trim();
    if (trimmedLink) {
      try {
        const parsed = new URL(trimmedLink);
        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
          safeAssetLink = trimmedLink.slice(0, 500);
        } else {
          return res.status(400).json({ error: 'Please enter a valid link (starting with http:// or https://)' });
        }
      } catch {
        return res.status(400).json({ error: 'Please enter a valid link (starting with http:// or https://)' });
      }
    }
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Payments are not set up yet.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'This session has not been paid yet.' });
    }

    const tierName = session.metadata && session.metadata.tierName;
    const amount = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : 'unknown amount';

    if (mongoose.connection.readyState === 1) {
      await Intake.create({
        sessionId,
        tierName: tierName || 'Unknown',
        amount: session.amount_total || 0,
        companyName: stripHtml(trimmedCompanyName),
        firstName: stripHtml(trimmedFirstName),
        lastName: stripHtml(trimmedLastName),
        email: trimmedEmail,
        phone: trimmedPhone,
        templateChoice: safeTemplateChoice,
        uploadedFiles: safeUploadedFiles,
        assetLink: safeAssetLink,
        details: stripHtml(trimmedDetails)
      });
    } else {
      console.warn('MongoDB not connected - intake submission was not saved to the database.');
    }

    const filesList = safeUploadedFiles.length
      ? safeUploadedFiles.map((file) => `  - [${file.type}] ${file.url}`).join('\n')
      : '  (none uploaded)';

    await sendMail({
      to: process.env.EMAIL_USER || 'jesust9140@gmail.com',
      subject: `Project details from a paid client - ${tierName || 'Unknown tier'}`,
      body: `A client filled out their project details after paying.\n\nTier: ${tierName || 'Unknown'}\nAmount: ${amount}\nCompany: ${stripHtml(trimmedCompanyName) || 'not provided'}\nName: ${stripHtml(trimmedFirstName)} ${stripHtml(trimmedLastName)}\nEmail: ${trimmedEmail}\nPhone: ${trimmedPhone || 'not provided'}\nTemplate reference: ${safeTemplateChoice || 'None / custom'}\nUploaded files:\n${filesList}\nAsset link: ${safeAssetLink || 'not provided'}\nDetails:\n${stripHtml(trimmedDetails)}\n\nSession: ${sessionId}`
    });

    res.json(successResponse);
  } catch (error) {
    console.error('Project intake error:', error);
    res.status(500).json({ error: 'Something went wrong submitting this. Please try again.' });
  }
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' }
});

// Admin login - checks the shared password (env var, not a per-user account
// system - appropriate for a single-owner dashboard) and issues a session
// token saved in MongoDB so it survives server restarts/redeploys.
app.post('/api/admin/login', adminLoginLimiter, async (req, res) => {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'Admin login is not set up yet.' });
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  try {
    const token = crypto.randomUUID();
    await AdminSession.create({ token });
    res.json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Middleware protecting admin-only routes - checks the x-admin-token header
// against saved sessions in MongoDB.
const requireAdmin = async (req, res, next) => {
  const token = req.headers['x-admin-token'];

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const session = await AdminSession.findOne({ token });

    if (!session) {
      return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
    }

    next();
  } catch (error) {
    console.error('Admin auth check error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// Lists all intake submissions, newest first.
app.get('/api/admin/intakes', requireAdmin, async (req, res) => {
  try {
    const intakes = await Intake.find().sort({ createdAt: -1 });
    res.json(intakes);
  } catch (error) {
    console.error('Admin intake list error:', error);
    res.status(500).json({ error: 'Could not load submissions.' });
  }
});

// Single intake submission detail.
app.get('/api/admin/intakes/:id', requireAdmin, async (req, res) => {
  try {
    const intake = await Intake.findById(req.params.id);

    if (!intake) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    res.json(intake);
  } catch (error) {
    console.error('Admin intake detail error:', error);
    res.status(500).json({ error: 'Could not load that submission.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
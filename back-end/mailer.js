// TODO: replace with a real nodemailer transporter once the business email is
// ready. Until then, every "send" just logs what would have gone out so the
// rest of the payment/intake flow can be built and tested end-to-end now.
const sendMail = async ({ to, subject, body }) => {
  console.log('--- [placeholder email] would send ---');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Body:', body);
  console.log('---------------------------------------');
  return { sent: false, placeholder: true };
};

module.exports = { sendMail };

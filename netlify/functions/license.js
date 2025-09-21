exports.handler = async function(event, context) {
  const expiryDate = process.env.EXPIRY_DATE || '2025-10-01';
  const today = new Date();
  const expiry = new Date(expiryDate);
  let status, message;

  if (today > expiry) {
    status = 'expired';
    message = 'Your license has expired. Please renew.';
  } else {
    status = 'active';
    message = `Your license is valid until ${expiryDate}`;
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      expiry: expiryDate,
      status,
      message
    })
  };
};

export async function handler(event, context) {
  // Example expiry date
  const expiryDate = new Date("2025-08-28T23:59:59Z");
  const now = new Date();

  const diffMs = expiryDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  let status = "valid";
  let message = "Your license is active.";

  if (daysRemaining <= 0) {
    status = "expired";
    message = "Your license has expired.";
  } 

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify({
      status,
      expiryDate: expiryDate.toISOString(),
      daysRemaining,
      message,
    }),
  };
}

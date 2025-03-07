import rateLimit from 'express-rate-limit';

// Configure the rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        message: 'Too many requests from this IP, please try again later.'
    },
    headers: true, // Include rate limit headers in the response
});

export default apiLimiter;

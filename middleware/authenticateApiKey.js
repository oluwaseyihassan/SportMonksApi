export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; 
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key is missing"
      });
    }
    
    if (apiKey !== process.env.API_TOKEN) {
      return res.status(403).json({
        success: false,
        message: "Invalid API key"
      });
    }
    
    next();
  };
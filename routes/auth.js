/* Backend */
/*
var express = require('express');
const router = express.Router();

// Authentication middleware
const requireAuth = (req, res, next) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware or route handler
        return next();
    }

    // User is not authenticated, redirect to login page or send an error response
    res.redirect('/login');
};

// Protected route
router.get('/protected', requireAuth, (req, res) => {
    // This route is only accessible to authenticated users
    res.send('Protected route');
});

module.exports = router;
*/
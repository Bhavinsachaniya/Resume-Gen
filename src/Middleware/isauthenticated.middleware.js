// middlewares/isAuthenticated.js
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // ✅ User is authenticated
    } else {
        return res.redirect('/auth'); // ✅ Redirect to login
    }
};

module.exports = isAuthenticated;

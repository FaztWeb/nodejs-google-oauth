const middlewares = {};

middlewares.checkAuth= (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/');
    } else {
       next(); 
    }
}

module.exports = middlewares;
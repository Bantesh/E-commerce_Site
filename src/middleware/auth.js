module.exports = {
    loginRequired(req, res, next) {
        console.log("user:",req.user)
        if (!req.user) {
         return res.redirect('/signIn')
        }
        next()
    }
}
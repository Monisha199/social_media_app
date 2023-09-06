module.exports.setFlash = function(req,res,next){  // we need to send flash messages in oure response
    // console.log("let seeeeeeeeeeeeeeeeeeeeeeeee");

    res.locals.flash = {
        'success':req.flash('success'),
        'error': req.flash('error')
    }
    next();
}   
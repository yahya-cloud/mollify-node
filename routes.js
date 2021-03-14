module.exports = function(app) {
    app
    .get('/', function(req, res) {
        res.render('pages/index', {title:"home"});
    })
    .get('/team', function(req, res) {
        res.render('pages/team', {title:"team"});
    })
    .get('/contact', function(req, res){
        res.render('pages/contact',  {title:"contact", formAgain: false});
    })
    .get('/career', function(req, res){
        res.render('pages/career', {title:"career", formAgain: false});
    })
    .get('/loaderio-dc8495f4e5d957629862cd56d6022112.html', function(req, res){
        res.render('loaderio-dc8495f4e5d957629862cd56d6022112')
    })
    
};
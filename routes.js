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
    }); 
    
};
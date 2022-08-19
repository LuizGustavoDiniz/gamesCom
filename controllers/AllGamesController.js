module.exports = class AllGamesController{
    static async allGames(req, res){
        res.render('games/home')
    }
}
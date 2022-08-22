const api = require('../services/api')

module.exports = class AllGamesController{
    static async allGames(req, res){

        try {
            
            const {data} = await api.get('games',{
                params:{
                    category: "shooter"
                }
            })

            res.render('games/home',{
                games: data
            })

        } catch (error) {
            res.redirect('/')
        }
    }
}
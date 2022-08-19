const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('gamescom', 'root', '3532gustavo', {
    host: 'localhost',
    dialect: 'mysql'
})


try {
    sequelize.authenticate()
    console.log('Database successfully Conected!')
} catch (error) {
    console.log('Error in connection' + error)
}

module.exports = sequelize

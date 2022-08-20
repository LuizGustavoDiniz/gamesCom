const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')
const path = require('path')
const os = require('os')
const app = express()
const connection = require('./Database/database')
const gamesRoutes = require('./routes/gamesRoutes')
const authRoutes = require('./routes/authRoutes')

const handlebars = hbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function(){},
            path: path.join(os.tmpdir(), "sessions")
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

app.use(flash())
app.use(express.static('public'))

app.use((req, res, next) => {
    if(req.session.userid){
       res.locals.session = req.session
    }

    next()
})

// ============ imports e configs iniciais ============= //

// ============ chamada das rotas =============== //

app.use('/home', gamesRoutes)
app.use('/', authRoutes)
app.get('/', (req, res) => {
    res.render('auth/login')
})

connection.sync({force:false}).then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
}).catch(err => {
    console.log(err)
})


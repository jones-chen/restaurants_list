// 一、基本參數
// 導入套件
const express = require('express')
const app = express()
const port = 3000

// 導入 handlebars, 檔案資料
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// 設定佈局、導入套件位置
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') //不用再填寫副檔名
app.use(express.static('public'))  //先走 public 這個資料夾，看有沒有檔案

// 二、路由設定(routes setting)
// index
app.get('/', (req, res) => {
    // past the movie data into 'index' partial template
    res.render('index', { movie: movieList.results});
})

// Movie Search Result
app.get('/search', (req, res) => {
    let keyword = req.query.keyword     //取得網址的 search=?keyword=...
    const newMovieList = movieList.results.filter(movie => {
        return (movie.title.toLowerCase().includes(keyword.toLowerCase()))
    })
    res.render('index', { movie: newMovieList, keyword: keyword});
})

// movie Info
app.get('/movies/:movie_id', (req, res) => {
    let movieID = req.params.movie_id
    movieOne = movieList.results.filter(item => Number(item.id) === Number(movieID))
    // movieOne = movieList.results[Number(movieID)-1]
    res.render('show', { movie: movieOne[0] });
})

// 三、監聽設定(是否連結)
// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})
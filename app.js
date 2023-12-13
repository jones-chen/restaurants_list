// 一、基本參數
// 導入套件
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// 導入 handlebars, 線下檔案資料

const restaurantList = require('./restaurant.json')

// 設定佈局、導入套件位置
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') //不用再填寫副檔名
app.use(express.static('public'))  //先走 public 這個資料夾，看有沒有檔案

// 二、路由設定(routes setting)
// index
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results});
})

// restaurant Info
app.get('/restaurants/:restaurant_id', (req, res) => {
    let restaurantsID = req.params.restaurant_id
    let restaurantOne = restaurantList.results.filter(item => Number(item.id) === Number(restaurantsID))
    res.render('show', { restaurant: restaurantOne[0] });
})

// restaurant Search Result
app.get('/search', (req, res) => {
    let keyword = req.query.keyword     //取得網址的 search=?keyword=...
    const newRestaurantList = restaurantList.results.filter(restaurant => {
        return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    })
    res.render('index', { restaurants: newRestaurantList, keyword: keyword});
})

// 三、監聽設定(是否連結)
// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})
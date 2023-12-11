// 一、基本參數
// 導入套件
const express = require('express')
const app = express()
const port = 3000

// 導入 handlebars, 線下檔案資料
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// 設定佈局、導入套件位置
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') //不用再填寫副檔名
app.use(express.static('public'))  //先走 public 這個資料夾，看有沒有檔案

// 二、路由設定(routes setting)
// index
app.get('/', (req, res) => {
    res.render('index');
})

// 三、監聽設定(是否連結)
// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})
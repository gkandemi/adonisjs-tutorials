'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')

Route.get("/posts", 'PostController.index')
Route.get("/posts/add", "PostController.add")
Route.post("/posts", "PostController.store")
Route.get("posts/:id","PostController.details")
Route.get("/posts/edit/:id", "PostController.edit")
Route.put("/posts/:id", "PostController.update")
Route.delete("/posts/:id", "PostController.delete")


Route.get("/test", () => 'Hello World!!')
Route.get('/test2', function(){
    return "Test 2 ok!!"
})

Route.get("/test/:id", ({params}) => {
    return `Get id : ${params.id}`
})



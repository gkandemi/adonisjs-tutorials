'use strict'

// Modeli çağırlarım..
const Post = use('App/Models/Post')

// Validator

const { validate } = use('Validator')


class PostController {
    async index({ view }){

        /*
        const posts = [
            { title : "Post 1", body : "Post 1 Body..."},
            { title : "Post 2", body : "Post 2 Body..."},
            { title : "Post 3", body : "Post 3 Body..."},
            { title : "Post 4", body : "Post 4 Body..."},
        ] */

        let posts = await Post.all()

        return view.render("posts.index", {
            title : "Latest Posts",
            posts : posts.toJSON()
        })
    }

    async details({view, params}){
        const post = await Post.find(params.id)
        return view.render("posts.details", {
            post : post
        })
    }

    async add({ view}){
        return view.render("posts.add")
    }

    async store( { request, response, session}){

        // Validate
        const validation = await validate(request.all(), {
            title : "required|min:3|max:255",
            body : "required|min:3"
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect("back")
        }

        const post = new Post()
    
        post.title = request.input("title")
        post.body = request.input("body")
        await post.save()

        session.flash({
            notification : "Post added"
        })

        return response.redirect("/posts")
    }

    async edit({ view, params, response, session}){

        const post = await Post.find(params.id)

        if(post){
            return view.render("posts.edit", {
                post : post
            })
        } else {
            session.flash({
                notification : "Böyle bir id bilgisi bulunamadı!"
            })
            return response.redirect("/posts")
        }
    }

    async update({request, response, session, params}){

         // Validate
         const validation = await validate(request.all(), {
            title : "required|min:3|max:255",
            body : "required|min:3"
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect("back")
        }

        const post = await Post.find(params.id)

        post.title = request.input("title")
        post.body = request.input("body")

        await post.save()

        session.flash({
            notification : "Post Updated"
        })

        response.redirect("/posts")

    }

    async delete({ response, params, session}){

        const post = await Post.find(params.id)

        session.flash({
            notification : "Delete successfully"
        })

        await post.delete()

        return response.redirect("/posts")

    }

}

module.exports = PostController

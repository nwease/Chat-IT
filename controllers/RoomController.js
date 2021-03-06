const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const Promise = require('bluebird')
const resource = 'room'

const slugify = function(text){
    return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
}

const randomString = function(numChars){
    var randomString = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i=0; i <numChars; i++)
        randomString += possible.charAt(Math.floor(Math.random() * possible.length))

    return randomString
}

module.exports = {

    get: (params) => {
        return new Promise((resolve, reject) => {
            turbo.fetch(resource, params)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            turbo.fetchOne(resource, id)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    post: (body) => {
        return new Promise((resolve, reject) => {
            body['subscribers'] = [body.user]
            body['slug'] = slugify(body.category.toLowerCase())+'-'+randomString(6).toLowerCase()

            turbo.fetchOne('user', body.user)
            .then(user => {
                body['user'] = {
                    id: user.id,
                    username: user.username,
                    image: user.image
                }

                return turbo.create(resource, body)
            })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}
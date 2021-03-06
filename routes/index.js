// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const CDN = (process.env.TURBO_ENV == 'dev') ? '' : process.env.TURBO_CDN

router.get('/', (req, res) => {
	const recentTopics = [
		{room:'politics', title:'Will Trump win in 2020?', profile:{username:'cheese', image:''}, numReplies:'7', date:'May 15th, 2018'},
		{room:'sports', title:'Will the Detroit Lions ever go to the Superbowl?', profile:{username:'goat', image:''}, numReplies:'10', date:'May 11th, 2018'}
	]

	const config = {
		cdn: CDN,
		page: 'Home',
		topics: recentTopics,
		loggedIn: 'false'
	}

	// no one logged in:
	if (req.vertexSession == null){
		res.render('index', config)
		return
	}

	// no one logged in:
	if (req.vertexSession.user == null){
		res.render('index', config)	
		return		
	}

	// someone logged in!
	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(data => {
		delete config['loggedIn']
		config['user'] = data

		return turbo.fetch('room', {subscribers: data.id})
	})
	.then(rooms => {
		console.log('ROOMS: ' + JSON.stringify(rooms))
		config['rooms'] = rooms
		res.render('index', config)
	})
	.catch(err => {
		res.render('index', config)
	})
})

router.get('/addroom', (req, res) => {
	const config = {
		cdn: CDN
	}

	// no one logged in:
	if (req.vertexSession == null){
		res.redirect('/')
		return
	}

	// no one logged in:
	if (req.vertexSession.user == null){
		res.redirect('/')
		return		
	}

	// someone logged in!
	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(data => {
		config['user'] = data
		res.render('addroom', config)
	})
	.catch(err => {
		res.render('addroom', config)
	})
})

router.get('/room/:slug', (req, res) => {
	const config = {
		cdn: CDN
	}

	turbo.fetch('room', {slug: req.params.slug})
	.then(rooms => {
		if (rooms.length == 0){ // room not found
			throw new Error('Room' +req.params.slug+ 'not found')
			return
		}

		var room = rooms[0]
		config['room'] = room
		config['page'] = room.category
		console.log('ROOM: ' + JSON.stringify(config))

		res.render('room', config)
	})
	.catch(err => {

	})

	//res.render('room', {room:req.params.slug})
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

module.exports = router

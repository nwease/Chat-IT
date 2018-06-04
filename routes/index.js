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
		res.render('index', config)
	})
	.catch(err => {
		res.render('index', config)
	})
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

router.get('/room/:id', (req, res) => {

	res.render('room', {room:req.params.id})
	
})

module.exports = router

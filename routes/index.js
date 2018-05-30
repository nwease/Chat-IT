// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.get('/', (req, res) => {
	const config = {
		cdn: process.env.TURBO_CDN
	}

	res.render('index', config)
})

router.get('/rooms', (req, res) => {
	res.render('rooms', null)
})

router.get('/room/:id', (req, res) => {

	res.render('room', {room:req.params.id})
	
})

module.exports = router

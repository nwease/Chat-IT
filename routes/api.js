// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

// valid resources
const resources = [
	'room',
	'topic',
	'reply',
	'user'
]

router.post('/:resource', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ // invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})

		return
	}

	turbo.create(resource, req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:resource', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ // invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})

		return
	}

	turbo.fetch(resource, req.query)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	if (resources.indexOf(resource) == -1){ // invalid resource!
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource: ' + resource
		})

		return
	}

	turbo.fetchOne(resource, req.params.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})




module.exports = router

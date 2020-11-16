import { redirection, PageEventOrigin } from './pageControl'

window.onload = function() {
	redirection(PageEventOrigin.initialisation)
}

window.addEventListener('popstate', function(event) {
	console.log('change')
})

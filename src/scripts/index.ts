import { redirection, PageEventOrigin } from './pageControl'

window.onload = function() {
	redirection(PageEventOrigin.initialisation)
}

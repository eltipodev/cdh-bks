import { generateClasses } from '@formkit/themes'

export default {
	config: {
		classes: generateClasses({
			global: { // applies to all input types
				outer: 'SHAZAM ',
				input: '$reset bop w-full'
			},
			text: {
				outer: 'bizz ',
				input: '$reset fizz w-full'
			},
			email: {
				outer: 'bap ',
				input: '$reset bop w-full'
			}
		})
	}
}
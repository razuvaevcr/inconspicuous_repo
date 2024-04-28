import {encoded, translations} from './data.js'

function decoded (data) {
	const set = new Set([]);

	data.forEach(object => {
		for(let key in object) {
			if (
				key == 'groupId' 
				|| key == 'formatSize' 
				|| key == 'ca'
				|| key == 'service' 
			) {
				continue
			}
			
			translations[object[key]]
			|| translations[object[key]] === ''
			|| typeof object[key] === 'object' ?
				object[key] = translations[object[key]] :
				set.add(object[key])
		}
	})

	return {
		decoded: data,
		uniqIds: set
	}
}

console.log(decoded(encoded));

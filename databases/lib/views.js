module.exports = {
	by_author: {
		map: function(doc) {
			if ('authors' in doc) {
				doc.authors.forEach(emit);
			}
		}.toString(),
		reduce: '_count'
	}
}
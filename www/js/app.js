function getAll(entity) {
	fetch('https://faas-vindas.netlify.app/api/' + entity)
	  .then((response) => response.json())
		.then((data) => {
			fetch('/template/list/' + entity + '.html')
				.then((response) => response.text())
				.then((template) => {
					var rendered = Mustache.render(template, data);
					document.getElementById('content').innerHTML = rendered;
				});
		})
}

function getById(query, entity) {
	var params = new URLSearchParams(query);
	fetch('https://faas-vindas.netlify.app/api/' + entity + '/?id=' + params.get('id'))
	  .then((response) => response.json())
		.then((data) => {
			fetch('/template/detail/' + entity + '.html')
				.then((response) => response.text())
				.then((template) => {
					var rendered = Mustache.render(template, data);
					document.getElementById('content').innerHTML = rendered;
				});
		})
}

function home() {
	fetch('/template/home.html')
		.then((response) => response.text())
		.then((template) => {
			var rendered = Mustache.render(template, {});
			document.getElementById('content').innerHTML = rendered;
		});
}

function init() {
	router = new Navigo(null, false, '#!');
	router.on({
		'/reservations': function() {
			getAll('reservations');
		},
		'/authors': function() {
			getAll('authors');
		},
		'/publishers': function() {
			getAll('publishers');
		},
		'/reservationById': function(_, query) {
			getById(query, 'reservations');
		},
		'/authorById': function(_, query) {
			getById(query, 'authors');
		},
		'/publisherById': function(_, query) {
			getById(query, 'publishers');
		}
	});
	router.on(() => home());
	router.resolve();
}

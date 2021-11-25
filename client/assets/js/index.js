const reportForm = document.getElementById('reportForm');

if (!navigator.geolocation) {
	console.log('Geolocation is not supported by your browser');
} else {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			console.log(position);
		},
		(error) => {
			console.log(error);
		}
	);
}

reportForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(reportForm);
	const report = {};

	formData.forEach((value, key) => {
		if (key === 'dateReport') value = new Date(value).toLocaleDateString();

		report[key] = value;
	});

	fetch('http://localhost:3500/api/v1/reports/', {
		method: 'POST',
		body: JSON.stringify(report),
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

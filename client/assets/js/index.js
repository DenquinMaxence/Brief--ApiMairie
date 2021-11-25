const reportForm = document.getElementById('reportForm');

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

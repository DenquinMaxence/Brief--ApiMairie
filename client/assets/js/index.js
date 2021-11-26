const reportForm = document.getElementById('reportForm');

const getPosition = async () => {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	return await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

reportForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(reportForm);

	/* let position;
	if (!navigator.geolocation) console.log('Geolocation is not supported by your browser');
	else position = await getPosition();

	if (position) {
		formData.set('latitude', position.coords.latitude);
		formData.set('longitude', position.coords.longitude);
	} */

	try {
		const response = await fetch('http://localhost:3500/api/v1/reports/', {
			method: 'POST',
			body: formData,
		});

		console.log(response);
	} catch (error) {
		console.log(error);
	}
});

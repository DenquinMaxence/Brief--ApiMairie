import roleModel from '../models/roleModel.js';

// Use to initialize the database with default roles
export default async () => {
	const roles = await roleModel.find({});
	if (roles.length !== 0) return;
	await roleModel.insertMany([
		{
			name: 'ROLE_USER',
		},
		{
			name: 'ROLE_ADMIN',
		},
		{
			name: 'ROLE_SUPER_ADMIN',
		},
	]);
};

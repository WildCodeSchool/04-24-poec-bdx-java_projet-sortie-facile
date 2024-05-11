export type UserDetails = {
	id: string;
	first_name: string;
	last_name: string;
	city: string;
	departement: string;
	avatar: string;
	description: string;
	phone: string;
	birthday: string;
	genre: string;
	userId: string;
};

export type UserDetailsForm = Pick<
	UserDetails,
	'first_name' | 'last_name' | 'description' | 'phone' | 'birthday' | 'genre'
> & {
	email: string;
};

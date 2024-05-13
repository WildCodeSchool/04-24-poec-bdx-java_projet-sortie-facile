export type UserDetails = {
	id: string;
	first_name: string;
	last_name: string;
	streetNumber: number;
	street: string;
	region: string;
	postalCode: number;
	city: string;
	departement: string;
	avatar: string;
	description: string;
	phone: string;
	birthday: string;
	genre: string;
	userId: string;
};

export type UserDetailsPersonalInfosForm = Pick<
	UserDetails,
	'first_name' | 'last_name' | 'phone' | 'birthday' | 'genre'
> & {
	email: string;
};

export type UserDetailsAddressForm = Pick<
	UserDetails,
	'streetNumber' | 'street' | 'region' | 'departement' | 'postalCode' | 'city'
> & {
	email: string;
};

export type UserDetailsPatch = Partial<UserDetails>;

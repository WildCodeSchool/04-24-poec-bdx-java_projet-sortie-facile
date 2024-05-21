export type UserDetails = {
	id: string;
	firstname: string;
	lastname: string;
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
	categorieIds: string[];
};

export type UserDetailsPersonalInfosForm = Pick<
	UserDetails,
	'firstname' | 'lastname' | 'phone' | 'birthday' | 'genre'
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

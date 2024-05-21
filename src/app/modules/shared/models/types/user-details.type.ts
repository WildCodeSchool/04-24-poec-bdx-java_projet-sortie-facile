import { City } from '../classes/city.class';
import { Department } from '../classes/department.class';
import { Region } from '../classes/region.class';

export type UserDetails = {
	id: string;
	firstname: string;
	lastname: string;
	streetNumber: number;
	street: string;
	region: Region;
	postalCode: number;
	city: City;
	department: Department;
	avatar: string;
	description: string;
	phone: string;
	dateOfBirth: string;
	genre: string;
	userId: string;
	categorieIds: string[];
};

export type UserDetailsPersonalInfosForm = Pick<
	UserDetails,
	'firstname' | 'lastname' | 'phone' | 'dateOfBirth' | 'genre'
> & {
	email: string;
};

export type UserDetailsAddressForm = Pick<
	UserDetails,
	'streetNumber' | 'street' | 'region' | 'department' | 'postalCode' | 'city'
> & {
	email: string;
};

export type UserDetailsPatch = Partial<UserDetails>;

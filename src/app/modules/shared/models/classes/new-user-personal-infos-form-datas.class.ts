export class NewUserPersonalInfosFormDatas {
	id: string;
	firstname: string;
	lastname: string;

	constructor(id: string, firstname: string, lastname: string) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
	}
}

import { AddressItem } from '@models/classes/address/addressItem.class';

export class Department extends AddressItem {
	constructor(id: string, name: string) {
		super(id, name);
	}
}

import { AddressItem } from '@models/classes/address/addressItem.class';

export class Department extends AddressItem {
	constructor(id: number, name: string) {
		super(id, name);
	}
}

import { AddressItem } from '@models/classes/address/addressItem.class';

export class City extends AddressItem {
	constructor(id: number, name: string) {
		super(id, name);
	}
}

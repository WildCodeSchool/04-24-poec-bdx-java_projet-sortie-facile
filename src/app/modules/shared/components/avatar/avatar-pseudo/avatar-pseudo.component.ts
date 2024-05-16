import { Component } from '@angular/core';
import { UserInfo } from '@models/types/userInfos.type';

@Component({
	selector: 'app-avatar-pseudo',
	templateUrl: './avatar-pseudo.component.html',
	styleUrl: './avatar-pseudo.component.scss',
})
export class AvatarPseudoComponent {
	user: UserInfo = {
		id: 1,
		pseudonym: 'JohnDoe',
		imgUrl:
			'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
	};
}

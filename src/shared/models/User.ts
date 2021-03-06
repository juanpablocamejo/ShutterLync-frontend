import { BaseObject } from './BaseObject';
import { UserRole } from './enums/UserRole';

export class User extends BaseObject {
    id: string;
    name: string;
    lastName: string;
    email: string;
    location: string;
    role: UserRole;

    constructor(fields?: Partial<User>) {
        super(); this.init(fields);
    }
}

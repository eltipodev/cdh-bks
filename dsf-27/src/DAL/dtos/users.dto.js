export default class UserDto {
	constructor(user) {
		this.firstName = user.firstName;
		this.user = user.user;
		this.age = user.age;
		this.lastName = user.lastName;
		this.email = user.email;
		this.rol = user.rol || "USER";

	}
}


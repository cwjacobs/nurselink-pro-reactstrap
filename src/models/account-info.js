export class AccountInfo {
    signUpDate;
    key;
    email;
    firstName;
    lastName;
    displayName;
    phoneNumber;

    constructor (key, email, firstName = "", lastName = "", displayName = "", phoneNumber = "") {
        this.signUpDate = new Date();
        this.key = key;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
    };
}

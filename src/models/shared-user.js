export class SharedUser {

    acctKey;
    displayName;
    isAdmin;

    constructor(acctKey, displayName, isAdmin, sharedUser) {
        if (sharedUser) {
            this.clone(sharedUser);
        }
        else {
            this.acctKey = acctKey;
            this.displayName = displayName;
            this.isAdmin = isAdmin;      
        }
    };

    clone(clone) {
        this.acctKey = clone.acctKey;
        this.displayName = clone.displayName;
        this.isAdmin = clone.isAdmin;
    };
}
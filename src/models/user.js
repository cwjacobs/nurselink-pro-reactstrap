import { Cabinet } from "./cabinet"
import { SharedUser } from "./shared-user";
import { AccountInfo } from "./account-info";
import { NLAccount } from "./nlAccount";

export class User {
    acctKey = "";
    myCabinet = null;
    hasMedicineCabinet = false;
    myAccountSharedTo = [];
    accountsSharedToMe = [];

    constructor(acctInfo) {
        this.acctKey = acctInfo.key;

        this.myAccountSharedTo = [];
        this.accountsSharedToMe = [];

        this.hasMedicineCabinet = false;
    };

    addMyMedicineCabinet() {
        this.myCabinet = new Cabinet();
        this.hasMedicineCabinet = true;
    }

    shareToUser(sharedUser) {
        this.myAccountSharedTo.push(sharedUser);
    }

    getCabinetsSharedToMe() {
        this.accountsSharedToMe = [];
    }
}

export class ActiveAccountCollection {
    accountCollection = new Map();
    // private accountCollection: { [key: string]: NLAccount[]; } = {};

    loggedInUser = new User();
    loggedInAccount = NLAccount();
    loggedInAccountKey = "";

    currentUser;
    currentAccount;
    currentAccountKey;

    constructor(loggedInAccount) {
        this.loggedInAccount = loggedInAccount;
        this.loggedInUser = loggedInAccount.user;
        this.loggedInAccountKey = loggedInAccount.key;
        this.accountCollection.set(this.loggedInAccountKey, loggedInAccount);
    };

    /** Add an account reference to the list of accounts managed by 'User', Default is 'this.currentAccountKey' */
    addAcctReference(account) {
        this.accountCollection.set(account.key, account);
    };

    // public removeAcctReference(key: string) {
    //     this.accountCollection.delete(key);
    // }

    setCurrentAcct(account) {
        this.currentAccount = account;
        this.currentUser = account.user;
        this.currentAccountKey = account.key;
    }

    /** Returns reference to account specified, or 'undefined' if not found */
    getAccountInstance(accountKey) {
        return this.accountCollection.get(accountKey);
    }

    getAccountCollection() {
        return this.accountCollection;
    }

    isLoggedInUserAcctAdmin(account = this.currentAccount) {
        let isLoggedInUserAdmin;

        if (account.key === this.loggedInAccountKey) {
            isLoggedInUserAdmin = true;
            return isLoggedInUserAdmin;
        }

        let sharedUser = account.user.myAccountSharedTo.find((a) => {
            return (a.acctKey === this.loggedInUser.acctKey);
        })

        if (sharedUser) {
            isLoggedInUserAdmin = sharedUser.isAdmin;
        }
        else {
            isLoggedInUserAdmin = false;
        }
        return isLoggedInUserAdmin;
    }

    isCurrentAccountSharedToUser(userAccountKey = this.currentAccountKey) {
        let isAccountShared;
        let userAccount = this.getAccountInstance(userAccountKey);
        if(userAccount) {
            let sharedUser = userAccount.user.accountsSharedToMe.find((a) => {
                return (a.acctKey === this.currentAccount.key);
            });
            isAccountShared = sharedUser ? true : false;
        }
        else {
            isAccountShared = false;
        }
        return isAccountShared;
    }
}

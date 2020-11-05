import { AccountInfo } from "./account-info";
import { User } from "./user";
import { MonthlyLog } from "./dose";

export class NLAccount {
    key;

    user;
    acctInfo;
    monthlyLog;

    constructor(acctInfo) {
        this.acctInfo = acctInfo;
        this.key = acctInfo.email;
        this.user = new User(acctInfo);
    };
}

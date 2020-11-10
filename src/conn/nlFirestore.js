import * as firebase from 'firebase';
import { firestore } from '../index';
import { employeeList } from '../test/company-test-data';


/** Implemeted as a singleton */
export class NLFirestore {
    static _instance = new NLFirestore();

    constructor() {
        if (NLFirestore._instance) {
            throw new Error("Error: Instantiation failed: Use Firestore.getInstance() instead of new.");
        }
        NLFirestore._instance = this;
        this.initialize();
    }

    initialize() {
    };

    static getInstance() {
        return this._instance;
    }

    getDoseLogPath(year) {
        return "doselog_" + year;
    }
}

export function firebaseLogin(email, password) {
    return new Promise((resolve) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve();
            }).catch((error) => {
                alert(`Auth error ${error}`);
            });
    })
}

export function firebaseLogout() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(JSON.stringify(error));
            });
    });
}

export function getNurseLinkAcct(key) {
    return new Promise((resolve, reject) => {
        const documentRef = firestore.collection(key);

        documentRef.doc("account").get()
            .then((doc) => {
                let data = doc.data();
                let account = JSON.parse(data["json"]);
                console.log(`Account fetched: ${account.key}`);
                resolve(account);
            })
            .catch((err) => {
                console.log('db.getUserInformation error getting medicine cabinet', err);
                reject(err);
            });
    });
}

export function saveNurseLinkAcctData(nlAccount) {
    return new Promise((resolve, reject) => {
        let nlAccountJson = JSON.stringify(nlAccount);
        firestore.collection(nlAccount.key).doc("account").set({ json: nlAccountJson })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    })
};

export function deleteNurseLinkAcctData(key) {
    return new Promise((resolve, reject) => {
        firestore.collection(key).doc("account").set({ json: "" })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    })
};

export function getEmployeeList(key) {
    return employeeList
};

import { Medicine } from "./medicine"
import { DailyLog } from "./dose";

export class Cabinet {
    medicineList= [];
    dailyLog = null;

    constructor() {
        this.medicineList = [];
    };

    setDailyLog(dailyLog) {
        this.dailyLog = dailyLog;
        this.medicineList = dailyLog.medicineList;
    }

    getMedicineList() {
        return this.medicineList;
    }

    addMedicine(medicine) {
        this.medicineList.push(medicine);
    }

    /** Returns the medicineList's reference to medicine with uuid, or 'undefined' if uuid not found */
    getMedicine(uuid) {
        return this.medicineList.find((el) => el.uuid === uuid);
    }

    deleteMedicine(uuid) {
        let temp = this.medicineList.filter((el) => { return el.uuid !== uuid });
        this.medicineList = temp;
        this.dailyLog.medicineList = this.medicineList;
    }
}

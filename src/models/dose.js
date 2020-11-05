import { Medicine } from "./medicine";
import { NLDate } from "./nldate";

export class ScheduledDoseTime {
    hrs; 
    mins;
    ampm;
    constructor(hrs, mins, ampm) {
        this.hrs = hrs;
        this.mins = mins;
        this.ampm = ampm;
    };

    format() {
        let formatted = `${this.hrs}:${this.mins} ${this.ampm}`
        return formatted;
    }
}

export class DoseSchedule {
    scheduledDoseTimes;
    constructor(scheduledDoseTimes = []) {
        this.scheduledDoseTimes = scheduledDoseTimes;
    };
}

export class Dose {
    uuid;
    timeStamp;

    constructor(uuid, timeStamp = new Date()) {
        this.uuid = uuid;
        this.timeStamp = timeStamp;
    };
}

export class DailyLog {
    logId;
    isDirty = false;
    logDate = new NLDate();

    dosesTaken;
    dosesSkipped;
    dosesSnoozed;

    //medicineList = new Medicine([]);

    constructor(nlDate = new NLDate().now(), medicineList, dosesTaken, dosesSkipped, dosesSnoozed) {
        this.logDate = nlDate;
        this.logId = Math.round(Math.random() * 1000);

        // this.medicineList = medicineList;
        // this.dosesTaken = dosesTaken;
        // this.dosesSkipped = dosesSkipped;
        // this.dosesSnoozed = dosesSnoozed;

        this.medicineList = [];
        if (medicineList) {
            for (let m of medicineList) {
                let clone = new Medicine(m.name, m.numDailyDoses, m.quantityPerDose, m.formFactor, m.strength, m.strengthUnits, m.doseSchedule, m.uuid);
                this.medicineList.push(clone);
            }
        }

        let clone;

        this.dosesTaken = [];
        if (dosesTaken) {
            dosesTaken.forEach((d) => {
                clone = new Dose(d.uuid, d.timeStamp);
                this.dosesTaken.push(clone);
            })
        }

        this.dosesSkipped = [];
        if (dosesSkipped) {
            dosesSkipped.forEach((d) => {
                clone = new Dose(d.uuid, d.timeStamp);
                this.dosesSkipped.push(clone);
            })
        }

        this.dosesSnoozed = [];
        if (dosesSnoozed) {
            dosesSnoozed.forEach((d) => {
                clone = new Dose(d.uuid, d.timeStamp);
                this.dosesSnoozed.push(clone);
            })
        }
    };
}

export class MonthlyLog {
    month = "";
    acctKey = "";

    constructor(acctKey, dailyLogs) {
        this.acctKey = acctKey;
        this.dailyLogs = dailyLogs;
        this.month = new NLDate().now().monthName;
    };

    addDailyLog(log) {
        this.dailyLogs.push(log);
    }

    getDailyLog(logDate) {
        let dailyLog = this.dailyLogs.find((el) => {
            return NLDate.isDateEqual(el.logDate, logDate);
        });
        return (dailyLog);
    }

    addDoseTaken(dailyLog, dose) {
        dailyLog.dosesTaken.push(dose);
    }

    addDoseSkipped(dailyLog, dose) {
        dailyLog.dosesTaken.push(dose);
    }

    addDoseSnoozed(dailyLog, dose) {
        dailyLog.dosesTaken.push(dose);
    }
}

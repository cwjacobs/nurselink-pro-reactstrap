import { FormFactor, StrengthUnits } from "./enums";
import { NLDate } from "./nldate";
import { DoseSchedule } from "./dose";

export class Medicine {
    name = 0;
    numDailyDoses = 0;
    quantityPerDose = 0;
    formFactor = 0;
    strength = 0;
    strengthUnits = 0;
    numDosesTaken = 0;
    numDosesSkipped = 0;
    numDosesSnoozed = 0;
    uuid = 0;
    doseSchedule = null;
    dateAdded = null;

   constructor(name, numDailyDoses, quantityPerDose, formFactor, strength, strengthUnits, doseSchedule, uuid) {
        this.name = name;
        this.numDailyDoses = numDailyDoses;
        this.quantityPerDose = quantityPerDose; 
        this.strength = strength;
        this.strengthUnits = strengthUnits;
        this.formFactor = formFactor;
        this.doseSchedule = doseSchedule;

        if(uuid) {
            this.uuid = uuid;
        }
        else {
            this.uuid = this.uuidv4();
        }
        this.dateAdded = new NLDate().now();

        this.numDosesTaken = 0;
        this.numDosesSkipped = 0;
        this.numDosesSnoozed = 0;
    };

    uuidv4() {
        return Math.round(Math.random() * 10000).toString();

        // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        //     return v.toString(16);
        // });
    }
}

import { NLDate } from '../models/nldate';
import { FormFactor, StrengthUnits } from '../models/enums';
import { Medicine } from '../models/medicine';
import { SharedUser } from '../models/shared-user';
import { AccountInfo } from '../models/account-info';
import { NLAccount } from '../models/nlAccount';
import { DailyLog, Dose, MonthlyLog, DoseSchedule, ScheduledDoseTime } from '../models/dose';
import { saveNurseLinkAcctData, deleteNurseLinkAcctData } from '../conn/nlFirestore'

const accounts = ["cwjacobs@gmail.com", "holderman.john@gmail.com", "dillig89@gmail.com"];

const cjAcctInfo = new AccountInfo("cwjacobs@gmail.com", "cwjacobs@gmail.com", "Craig", "Jacobs", "Craig", "646.919.0840");
const diAcctInfo = new AccountInfo("dillig89@gmail.com", "dillig89@gmail.com", "Daniel", "Illig", "Daniel", "347.501.0881");
const jhAcctInfo = new AccountInfo("holderman.john@gmail.com", "holderman.john@gmail.com", "John", "Holderman", "Jonny", "347.501.0881");

const cjHasMedicineCabinet = true;
const diHasMedicineCabinet = true;
const jhHasMedicineCabinet = false;

// --------------------------------------------
const isCjToJhAdmin = false;
const isJhFromCjAdmin = isCjToJhAdmin;

const isCjToDiAdmin = true;
const isDiFromCjAdmin = isCjToDiAdmin;
// --------------------------------------------
const isJhToCjAdmin = true;
const isCjFromJhAdmin = isJhToCjAdmin;

const isJhToDiAdmin = true;
const isDiFromJhAdmin = isJhToDiAdmin;
// --------------------------------------------
const isDiToCjAdmin = true;
const isCjFromDiAdmin = isDiToCjAdmin;

const isDiToJhAdmin = false;
const isHhFromDiAdmin = isDiToJhAdmin;


// name: string, numDailyDoses?: number, quantityPerDose?: number, formFactor?: FormFactor, strength?: number, strengthUnits?: StrengthUnits, doseSchedule: DoseSchedule, uuid?: string
const cjMedicineList = [
    new Medicine("Lisinopril", 1, 2, FormFactor.pill, 20, StrengthUnits.mg, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
        ]
    )),
    new Medicine("Metformin", 3, 1, FormFactor.solution, 115, StrengthUnits.mcgml, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("12", "00", "PM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Atorvastatin", 2, 3, FormFactor.powder, .5, StrengthUnits.g, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Levothyroxine", 4, 9, FormFactor.drops, 15, StrengthUnits.ml, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("11", "30", "AM"),
            new ScheduledDoseTime("5", "30", "PM"),
            new ScheduledDoseTime("10", "30", "PM"),
        ]
    )),
];
const diMedicineList = [
    new Medicine("Ronexedrin", 5, 1, FormFactor.inhaler, 18, StrengthUnits.percent, new DoseSchedule(
        [
            new ScheduledDoseTime("7", "30", "AM"),
            new ScheduledDoseTime("9", "30", "AM"),
            new ScheduledDoseTime("12", "00", "PM"),
            new ScheduledDoseTime("2", "30", "PM"),
            new ScheduledDoseTime("5", "30", "AM"),
        ]
    )),
    new Medicine("Lipscahedron", 3, 1, FormFactor.solution, 125, StrengthUnits.mcgml, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("12", "00", "PM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Morphazite", 2, 3, FormFactor.powder, .8, StrengthUnits.g, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Hippocletan", 4, 9, FormFactor.drops, 12, StrengthUnits.ml, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("11", "30", "AM"),
            new ScheduledDoseTime("5", "30", "PM"),
            new ScheduledDoseTime("10", "30", "PM"),
        ]
    )),
    new Medicine("Rapscalion", 2, 7, FormFactor.inhaler, 17, StrengthUnits.iu, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("11", "30", "AM"),
            new ScheduledDoseTime("5", "30", "PM"),
            new ScheduledDoseTime("10", "30", "PM"),
        ]
    )),
    new Medicine("Quandrin", 3, 2, FormFactor.pill, 18, StrengthUnits.g, new DoseSchedule(
        [
            new ScheduledDoseTime("7", "30", "AM"),
            new ScheduledDoseTime("9", "30", "AM"),
            new ScheduledDoseTime("12", "00", "PM"),
        ]
    )),
    new Medicine("Scrimbik", 3, 4, FormFactor.solution, 125, StrengthUnits.mcgml, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("12", "00", "PM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Blumite", 2, 3, FormFactor.powder, .8, StrengthUnits.g, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("8", "30", "PM"),
        ]
    )),
    new Medicine("Rosuvastatin", 4, 9, FormFactor.pill, 12, StrengthUnits.g, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("11", "30", "AM"),
            new ScheduledDoseTime("5", "30", "PM"),
            new ScheduledDoseTime("10", "30", "PM"),
        ]
    )),
    new Medicine("Milkweed", 4, 7, FormFactor.inhaler, 17, StrengthUnits.iu, new DoseSchedule(
        [
            new ScheduledDoseTime("6", "30", "AM"),
            new ScheduledDoseTime("11", "30", "AM"),
            new ScheduledDoseTime("5", "30", "PM"),
            new ScheduledDoseTime("10", "30", "PM"),
        ]
    )),

];
const jhMedicineList = [];

const cjAccountsSharedToMe = [
    new SharedUser("holderman.john@gmail.com", "Jonny", isJhToCjAdmin),
    new SharedUser("dillig89@gmail.com", "Daniel", isDiToCjAdmin)
]
const diAccountsSharedToMe = [
    new SharedUser("holderman.john@gmail.com", "Jonny", isJhToDiAdmin),
    new SharedUser("cwjacobs@gmail.com", "Craig", isCjToDiAdmin)
]
const jhAccountsSharedToMe = [
    new SharedUser("dillig89@gmail.com", "Daniel", isDiToJhAdmin),
    new SharedUser("cwjacobs@gmail.com", "Craig", isCjToJhAdmin)
]

const cjMyAccountSharedTo = [
    new SharedUser("holderman.john@gmail.com", "Jonny", isJhFromCjAdmin),
    new SharedUser("dillig89@gmail.com", "Daniel", isDiFromCjAdmin)
]
const diMyAccountSharedTo = [
    new SharedUser("holderman.john@gmail.com", "Jonny", isHhFromDiAdmin),
    new SharedUser("cwjacobs@gmail.com", "Craig", isCjFromDiAdmin)
]
const jhMyAccountSharedTo = [
    new SharedUser("dillig89@gmail.com", "Dan", isDiFromJhAdmin),
    new SharedUser("cwjacobs@gmail.com", "Craig", isCjFromJhAdmin),
]

const cjDailyLogs = [
    new DailyLog(new NLDate(new Date(2020, 8, 1)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 1)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 1)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 2)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 2)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 2)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 2)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 3)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 3)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 3)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 4)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 4)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 4)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 4)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 4)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 5)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 5)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 6)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 6)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 6)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 6)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 6)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 6)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 7)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 7)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 7)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 8)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 8)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 8)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 8)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 9)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 9)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 9)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 9)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 9)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 10)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 10)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 10)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 10)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 10)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 11)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 11)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 12)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 12)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 8, 13)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 13)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 14)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 14)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 8, 15)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 15)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 15)),
    ], [
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 15)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 16)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 16)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 16)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 17)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 17)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 17)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 8, 18)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 18)),
    ], [], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 18)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 19)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 19)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 19)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 8, 20)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 20)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 20)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 20)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 21)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 21)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 22)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 22)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 22)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 23)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 23)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 23)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 23)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 24)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 24)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 25)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 25)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 25)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 26)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 26)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 27)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 27)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 8, 28)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 28)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 29)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 29)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 8, 30)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 30)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 30)),
    ], [
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 30)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 8, 31)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 31)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 8, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 8, 31)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 1)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 1)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 1)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 2)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 2)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 2)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 2)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 3)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 3)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 3)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 4)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 4)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 4)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 4)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 4)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 5)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 5)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 6)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 6)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 6)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 6)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 6)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 6)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 7)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 7)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 7)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 7)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 8)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 8)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 8)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 8)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 8)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 9)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 9)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 9)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 9)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 9)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 10)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 10)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 10)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 10)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 10)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 11)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 11)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 12)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 12)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 12)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 13)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 13)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 14)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 14)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 14)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 15)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 15)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 15)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 15)),
    ], [
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 15)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 16)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 16)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 16)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 16)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 17)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 17)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 17)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 17)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 9, 18)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 18)),
    ], [], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 18)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 18)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 19)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 19)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 19)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 19)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 9, 20)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 20)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 20)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 20)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 20)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 21)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 21)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 21)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 22)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 22)),
    ], [

    ], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 22)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 22)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 23)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 23)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 23)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 23)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 23)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 24)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 24)),

    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 25)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 25)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 25)),
    ], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 24)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 24)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 25)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 26)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
    ], [], [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 26)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 27)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 27)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 27)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 28)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 28)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 29)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 29)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 29)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 30)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 30)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 30)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 30)),
    ], [
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 30)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 9, 31)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 31)),
    ], [], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 9, 31)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 9, 31)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 10, 1)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 1)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 1)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 1)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 10, 2)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 2)),
    ], [], [
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 2)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 2)),
    ]),
    new DailyLog(new NLDate(new Date(2020, 10, 3)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
    ], []),
    new DailyLog(new NLDate(new Date(2020, 10, 4)), cjMedicineList, [
        new Dose(cjMedicineList[0].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[2].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 4)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 4)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
    ], [
        new Dose(cjMedicineList[1].uuid, new Date(2020, 10, 3)),
        new Dose(cjMedicineList[3].uuid, new Date(2020, 10, 3)),
    ]),
]

const diDailyLogs = [
    new DailyLog(new NLDate(new Date(2020, 9, 21)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 21)),

    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 22)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 22)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 22)),

    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 23)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 21)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 21)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 24)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 24)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 24)),
    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 25)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 25)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 25)),

    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 26)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 26)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 26)),

    ], [], []),
    new DailyLog(new NLDate(new Date(2020, 9, 27)), diMedicineList, [
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[0].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[1].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[2].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[3].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[4].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[5].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[6].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[7].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[8].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 27)),
        new Dose(diMedicineList[9].uuid, new Date(2020, 9, 27)),
    ], [], []),
]

const jhDailyLogs = [];

const cjMonthlyLog = new MonthlyLog("cwjacobs@gmail.com", cjDailyLogs);
const diMonthlyLog = new MonthlyLog("dillig89@gmail.com", diDailyLogs);
const jhMonthlyLog = new MonthlyLog("holderman.john@gmail.com", jhDailyLogs);

export let testData = [
    {
        acctInfo: cjAcctInfo,
        medicineList: cjMedicineList,
        sharedToMe: cjAccountsSharedToMe,
        sharedToOthers: cjMyAccountSharedTo,
        monthlyLog: cjMonthlyLog,
        hasCabinet: cjHasMedicineCabinet,
    },
    {
        acctInfo: diAcctInfo,
        medicineList: diMedicineList,
        sharedToMe: diAccountsSharedToMe,
        sharedToOthers: diMyAccountSharedTo,
        monthlyLog: diMonthlyLog,
        hasCabinet: diHasMedicineCabinet,
    },
    {
        acctInfo: jhAcctInfo,
        medicineList: jhMedicineList,
        sharedToMe: jhAccountsSharedToMe,
        sharedToOthers: jhMyAccountSharedTo,
        monthlyLog: jhMonthlyLog,
        hasCabinet: jhHasMedicineCabinet,
    },
]

export async function installTestData() {
    testData.forEach((el) => {
        let nlAccount = new NLAccount(el.acctInfo);
        nlAccount.isDirty = false;
        if (el.hasCabinet) {
            nlAccount.user.addMyMedicineCabinet();
        }
        nlAccount.monthlyLog = el.monthlyLog;
        nlAccount.user.accountsSharedToMe = el.sharedToMe;
        nlAccount.user.myAccountSharedTo = el.sharedToOthers;
        saveNurseLinkAcctData(nlAccount);
    });
}

export async function deleteTestData() {
    for (let key of accounts) {
        console.log(`Deleting acct: ${key}`);
        deleteNurseLinkAcctData(key)
            .then(() => {
                console.log(`Account Deleted: ${key}`);
            })
            .catch((err) => {
                console.log(`deleteAcct err: ${err}`);
            })
    }
    console.log(`deleteAccts finished...`);
}

export const medicineNameCollection = [
    ".Insulin Aspart Protamine and Insulin Aspart",
    "0.9% SODIUM CHLORIDE",
    "02 CUSHION SPF45",
    "1 Bladder",
    "1 Detoxification",
    "1% Hydrocortisone",
    "1% LIDOCAINE HCI",
    "1.8oz Armstrong Hand Sanitizer with Aloe Vera and Vitamin E",
    "1.8OZ HAND SANITIZER WITH CLIP -ASSORTED",
    "10 Armani Prima Control Glow Moisturizer SBS SPF 35",
    "10 Parasite Detox",
    "10 TREE MIX",
    "100% Pure Hand Sanitizer",
    "100% Pure Yerba Mate MIst",
    "1000 Roses CC Color plus Correct Sheer Nude SPF 30",
    "1000 Roses CC Color Plus Correct Sheer Tan SPF 30",
    "1000 Roses Daily Shade Facial SPF 18",
    "1012 Antimicrobial",
    "108 Hand Sanitizer",
    "10g Colgate plus Toothbrush Kit",
    "10g Colgate plus Toothbrush plus Floss Kit",
    "ZYMAXID",
    "ZYNCOF",
    "ZYPITAMAG",
    "Zyprexa",
    "Zyrexal",
    "Zyrtec Allergy",
    "ZYRTEC",
    "ZYRTEC-D",
    "Zytiga",
    "Zyvox",
    "ZZZQuil Nightime Sleep-Aid",
    "ZzzQuil",
];


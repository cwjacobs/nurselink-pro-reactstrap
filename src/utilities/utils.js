
const CadetBlue = 'rgba(95, 158, 160, 1)';
const Tan = 'rgba(210, 180, 140, 1)';
const LightCoral = 'rgba(240, 128, 128, 1)';
const SteelBlue = 'rgba(70, 130, 180, 1)';
const MediumPurple = 'rgba(147, 112, 216, 1)';
const Aquamarine = 'rgba(127, 255, 212, 1)';
const GoldenRod = 'rgba(218, 165, 32, 1)';
const IndianRed = 'rgba(205, 92, 92, 1)';
const SlateBlue = 'rgba(106, 90, 205, 1)';
const Purple = 'rgba(128, 0, 128, 1)';
const SeaGreen = 'rgba(46, 139, 87, 1)';
const SandyBrown = 'rgba(244, 164, 96, 1)';
const Maroon = 'rgba(128, 0, 0, 1)';
const Navy = 'rgba(0, 0, 128, 1)';
const Magenta = 'rgba(255, 0, 255, 1)';
const Lime = 'rgba(0, 255, 0, 1)';
const Gold = 'rgba(255, 215, 0, 1)';
const FireBrick = 'rgba(178, 34, 34, 1)';
const LightSkyBlue = 'rgba(135, 206, 250, 1)';
const RoyalBlue = 'rgba(65, 105, 225, 1)';

export const dataColors = [
    CadetBlue, Tan, LightCoral, SteelBlue, MediumPurple, Aquamarine, GoldenRod, IndianRed, SlateBlue, Purple,
    SeaGreen, SandyBrown, Maroon, Navy, Magenta, Lime, Gold, FireBrick, LightSkyBlue, RoyalBlue,
];

/// Primarily used to convert Date month to string
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const weekDayLabels = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`];
export const monthDayLabels = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`,
    `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`,];

export const parseDate = (date) => {
    let month = date.getMonth();
    let parsedDate = {
        day: date.getDate(),
        month: month,
        year: date.getFullYear().toString(),
        monthName: months[month],
    }
    return parsedDate;
}

export const formatDateString = (date) => {
    let dateStr = String(date); // 'Tue Jun 16 2020 00:00:00 GMT-0400 (Eastern Daylight Time)'
    let day = dateStr.slice(7, 10);
    let year = dateStr.slice(11, 15);
    let month = dateStr.slice(4, 7);
    dateStr = `${month} ${day}, ${year}`;
    return (dateStr);
}

export const sortMonthlyLogs = (monthlyLogs) => {
    let sortedMonthlyLogs = [];
    months.forEach((month) => {
        let monthlyLog = monthlyLogs.dailyLogs.filter((log) => {
            return (log.logDate.monthName === month);
        });

        if (monthlyLog.length > 0) {
            sortedMonthlyLogs = sortedMonthlyLogs.concat(monthlyLog);
        }
    });
    return sortedMonthlyLogs;
}

export const getDailyLog = (sortedMonthlyLogs, date) => {
    let matchingDailyLog = null;
    let selectedDay = date.getDate();
    let selectedMonth = date.getMonth();
    let selectedYear = String(date.getFullYear());

    for (let dailyLog of sortedMonthlyLogs) {
        if (dailyLog.logDate.day === selectedDay
            && dailyLog.logDate.month === selectedMonth
            && dailyLog.logDate.year === selectedYear) {
            matchingDailyLog = dailyLog;
            break;
        }
    }

    return matchingDailyLog;
    return matchingDailyLog ? matchingDailyLog : sortedMonthlyLogs[sortedMonthlyLogs.length - 1];
}

export const getNearestDailyLog = (sortedMonthlyLogs, date) => {
    let dailyLogs = sortedMonthlyLogs;

    let earliestLog = dailyLogs[0];
    let latestLog = dailyLogs[dailyLogs.length - 1]; // Lastest log in collection

    // Year
    let selectedYear = String(date.getFullYear());
    if (selectedYear < earliestLog.logDate.year) return earliestLog;
    if (selectedYear > latestLog.logDate.year) return latestLog;
    let selectedYearLogs = sortedMonthlyLogs.filter((log) => {
        return log.logDate.year === selectedYear;
    })

    // Month
    earliestLog = selectedYearLogs[0];
    latestLog = selectedYearLogs[selectedYearLogs.length - 1];

    let selectedMonth = date.getMonth();
    if (selectedMonth < earliestLog.logDate.month) return earliestLog;
    if (selectedMonth > latestLog.logDate.month) return latestLog;
    let selectedMonthLogs = sortedMonthlyLogs.filter((log) => {
        return log.logDate.month === selectedMonth;
    })

    // Day
    earliestLog = selectedMonthLogs[0];
    latestLog = selectedMonthLogs[selectedMonthLogs.length - 1];

    let selectedDay = date.getDate();
    if (selectedDay < earliestLog.logDate.day) return earliestLog;
    if (selectedDay > latestLog.logDate.day) return latestLog;

    latestLog = earliestLog;
    for (let log of selectedMonthLogs) {
        latestLog = log;
        if (log.logDate.day >= selectedDay) break;
    }
    return latestLog;
}

export const getDailyDoses = (dailyLog) => {
    let doses = [];

    dailyLog.medicineList.forEach((med) => {
        let doseCount = {
            day: dailyLog.logDate.day,
            month: dailyLog.logDate.month,
            year: dailyLog.logDate.year,
            numDosesTaken: 0,
            numDosesSkipped: 0,
            numDosesSnoozed: 0,
            uuid: med.uuid,
            name: med.name,
            numDailyDoses: med.numDailyDoses,
            adherence: 0,
        };

        dailyLog.dosesTaken.forEach((dose) => {
            if (dose.uuid === med.uuid) {
                if (!dailyLog.isDirty) med.numDosesTaken += 1;
                doseCount.numDosesTaken += 1;
            }
        });

        dailyLog.dosesSkipped.forEach((dose) => {
            if (dose.uuid === med.uuid) {
                if (!dailyLog.isDirty) med.numDosesSkipped += 1;
                doseCount.numDosesSkipped += 1;
            }
        });

        dailyLog.dosesSnoozed.forEach((dose) => {
            if (dose.uuid === med.uuid) {
                if (!dailyLog.isDirty) med.numDosesSnoozed += 1;
                doseCount.numDosesSnoozed += 1;
            }
        });
        doseCount.adherence = Math.round((doseCount.numDosesTaken / med.numDailyDoses) * 100);
        doses.push(doseCount);
    });
    dailyLog.isDirty = true;
    return doses;
}

/// Generate list of daily logs matching days in selected range
const getWeekRangeData = (selectedDate, sortedMonthlyLogs, numDaysSelected) => {
    const weekDays = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
    let rangeData = [];

    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    for (let i = day; i < (day + numDaysSelected); i++) {
        let dataPoint = {};
        let date = new Date(year, month, i);
        let weekDay = date.getDay();
        dataPoint.label = `${weekDays[weekDay]} ${date.getMonth() + 1}-${date.getDate()}`;

        dataPoint.dailyLog = getDailyLog(sortedMonthlyLogs, date);
        rangeData.push(dataPoint);
    }
    return rangeData;
}

const getMonthRangeData = (selectedDate, sortedMonthlyLogs, numDaysSelected) => {
    const monthDays = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`,
        `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`,];
    let rangeData = [];

    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    for (let i = 0; i < numDaysSelected; i++) {
        let dataPoint = {};
        let date = new Date(year, month, i);
        let weekDay = date.getDay();
        dataPoint.label = `${monthDays[i]}`;

        dataPoint.dailyLog = getDailyLog(sortedMonthlyLogs, date);
        rangeData.push(dataPoint);
    }
    return rangeData;
}

const getRangeData = (selectedDate, sortedMonthlyLogs, numDaysSelected = 7) => {
    let rangeData;
    if (numDaysSelected <= 7) {
        rangeData = getWeekRangeData(selectedDate, sortedMonthlyLogs, numDaysSelected);
    }
    else {
        rangeData = getMonthRangeData(selectedDate, sortedMonthlyLogs, numDaysSelected);
    }
    return rangeData;
}

const getMedData = (medName, doses, i) => {

    let medAdherence = [];
    let backgroundColor = [];

    doses.forEach((day) => {
        if (day.length === 0) {
            medAdherence.push(0);
            backgroundColor.push(dataColors[i]);
        }
        else {
            day.forEach((med) => {
                if (med.name === medName) {
                    medAdherence.push(med.adherence);
                    backgroundColor.push(dataColors[i]);
                }
            });
        }
    });

    let medDataPoint = {
        label: medName,
        data: medAdherence,
        backgroundColor: backgroundColor,
        borderWidth: 1,
    }
    return medDataPoint;
}

const getMonth = (selectedDate) => {
    let date = new Date(selectedDate);
    let year = date.getFullYear();
    let month = date.getMonth();
    return new Date(year, month, 1);
    // new Date(2020, 6, 1)
}

export const getDatasets = (selectedDate, sortedMonthlyLogs, numDaysSelected) => {
    selectedDate = numDaysSelected <= 7 ? selectedDate : getMonth(selectedDate);

    let rangeData = getRangeData(selectedDate, sortedMonthlyLogs, numDaysSelected);

    // Get daily doses for each day in weekDayRange dailyLogs
    let doses = [];
    rangeData.forEach((dataPoint) => {
        let dailyDoses = dataPoint.dailyLog ? getDailyDoses(dataPoint.dailyLog) : [];
        doses.push(dailyDoses);
    })

    const values = [];
    const medNames = [];
    const datasets = {};

    // Collect chart labels
    doses.forEach((day) => {
        day.forEach((med) => {
            if (!medNames.includes(med.name)) {
                medNames.push(med.name);
            }
        });
    });

    medNames.forEach((name, i) => {
        let medData = getMedData(name, doses, i)
        values.push(medData);
    });

    const xAxisLabels = [];
    if (numDaysSelected <= 7) {
        weekDayLabels.forEach((day, i) => {
            let label = `${rangeData[i].label}`;
            xAxisLabels.push(label);
        });
    }
    else {
        monthDayLabels.forEach((day, i) => {
            if (rangeData[i]) {
                let label = `${rangeData[i].label}`;
                xAxisLabels.push(label);
            }
        });
    }

    datasets.labels = xAxisLabels;
    datasets.values = values;
    return datasets;

    const datasetsConst = [
        {
            label: 'Ronexedrin',
            data: adherence2[0],
            backgroundColor: 'rgba(35, 102, 92, 0.6)',
            borderWidth: 1,
        },
        {
            label: 'Lipscahedron',
            data: adherence2[1],
            backgroundColor: 'rgba(35, 102, 92, 0.6)',
            borderWidth: 1,
        },
        {
            label: 'Morphazite',
            data: adherence2[2],
            backgroundColor: 'rgba(35, 102, 92, 0.6)',
            borderWidth: 1,
        },
        {
            label: 'Hippocletan',
            data: adherence2[3],
            backgroundColor: 'rgba(35, 102, 92, 0.6)',
            borderWidth: 1,
        },
        {
            label: 'Rapscalion',
            data: adherence2[4],
            backgroundColor: 'rgba(35, 102, 92, 0.6)',
            borderWidth: 1,
        },
    ];

    const adherence2 = [
        [25, 100, 100, 100, 35, 85, 35],
        [100, 20, 80, 35, 100, 35, 25],
        [20, 80, 35, 100, 35, 100, 100],
        [80, 35, 100, 55, 25, 20, 80],
        [15, 100, 35, 25, 100, 20, 80],
    ];
}

export function getFeeds() {
    let feeds = [];

    feeds.push({
        title: 'Visits',
        data: getRandomDateArray(150)
    });

    feeds.push({
        title: 'Categories',
        data: getRandomArray(20)
    });

    feeds.push({
        title: 'Categories',
        data: getRandomArray(10)
    });

    feeds.push({
        title: 'Data 4',
        data: getRandomArray(6)
    });

    return feeds;
}

/** These Two functions are used barchart_class example, can be deleted */
export function getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for (var i = 0; i < numItems; i++) {
        data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

export function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

// module.exports = { sortMonthlyLogs }
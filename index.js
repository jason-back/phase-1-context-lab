/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(record) {
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employee;
}

function createEmployeeRecords(records) {
    const employees = [];
    records.forEach((record) => {
        employees.push(createEmployeeRecord(record));
    });
    return employees;
}

const createTimeInEvent = function (date) {
    const timeInObject = {
        type: "TimeIn",
        hour: Number(date.substring(11)),
        date: date.substring(0, 10),
    };
    this.timeInEvents.push(timeInObject);
    return this;
};

const createTimeOutEvent = function (date) {
    const timeOutObject = {
        type: "TimeOut",
        hour: Number(date.substring(11)),
        date: date.substring(0, 10),
    };
    this.timeOutEvents.push(timeOutObject);
    return this;
};

function hoursWorkedOnDate(date) {
    var possibleDates = this.timeInEvents;
    var dateIndex = possibleDates.findIndex(function (e) {
        return e.date === date;
    });

    return (
        (this.timeOutEvents[dateIndex].hour -
            this.timeInEvents[dateIndex].hour) /
        100
    );
}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(
        function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this),
        0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
    for (const record of srcArray) {
        if (record.firstName === firstName) {
            return record;
        }
    }
}

const calculatePayroll = function (records) {
    return records.reduce((acc, currRecord) => {
        return (acc += allWagesFor.call(currRecord));
    }, 0);
};

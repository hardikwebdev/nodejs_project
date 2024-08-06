ReE = function (res, err, code) {
  // Error Web Response
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }
  if (typeof code !== "undefined") {
    res.statusCode = code;
  } else {
    res.statusCode = 500;
  }
  return res.json({ success: false, message: err, code: code || 500 });
};

ReS = function (res, msg, data, code) {
  // Success Web Response
  let send_data = { success: true, message: msg, code: code || 200 };
  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  if (typeof code !== "undefined") {
    res.statusCode = code;
  } else {
    res.statusCode = 200;
  }
  return res.json(send_data);
};

randomStr = function (m, remove_unessery = false) {
  let m = m || 9;
  s = "";
  let r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  if (remove_unessery)
    r = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

  for (let i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
};

isJSON = async function (text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

randomNum = function (m) {
  let m = m || 4;
  s = "";
  let r = "1234567890";

  for (let i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
};

generateRandomKey = function (length) {
  let start = 2;
  let stop = parseInt(length) + start;
  return Math.random().toString(36).substring(start, stop);
}

checkisArray = function (a) {
  return (!!a) && (a.constructor === Array);
};

checkisObject = function (a) {
  return (!!a) && (a.constructor === Object);
};

deleteFileSync = function (filepath) {
  const fs = require('fs');
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    return true;
  }
  else {
    return false;
  }
}

const randomNumber = require("random-number-csprng");
generate = size => {
  return new Promise((resolve, reject) => {

    let code = [];
    let splitter = 2;
    let divider = Math.floor(size / splitter);
    while (divider > 9) {
      splitter++;
      divider = Math.floor(size / splitter);
    }

    let min_num = Math.pow(10, divider - 1);
    let max_num = Math.pow(10, divider) - 1;

    let i = 0;
    while (i < splitter) {
      code[i] = randomNumber(min_num, max_num);
      i++;
    }

    let reminder = size % divider;
    if (reminder) {
      let reminder_min = Math.pow(10, reminder - 1);
      let reminder_max = Math.pow(10, reminder) - 1;
      code[i] = randomNumber(reminder_min, reminder_max);
    }

    return Promise.all(code)
      .then(data => {
        resolve(41 + data.join(""));
      })
      .catch(err => reject(err));
  });
};

dayFromString = function (day) {
  if (day == "Monday") {
    return "1";
  }
  else if (day == "Tuesday") {
    return "2";
  }
  else if (day == "Wednesday") {
    return "3";
  }
  else if (day == "Thursday") {
    return "4";
  }
  else if (day == "Friday") {
    return "5";
  }
  else if (day == "Saturday") {
    return "6";
  }
  else if (day == "Sunday") {
    return "7";
  }

  return;
}

hoursToMinutes = function (hoursValue) {
  if (hoursValue.includes(".")) {
    let hoursAndMinutes = hoursValue;
    hoursAndMinutes = parseFloat(hoursAndMinutes).toFixed(hoursAndMinutes.split('.')[1].length);
    hoursAndMinutes = hoursValue.split('.');
    let minutes = hoursAndMinutes.pop();
    let hours = hoursAndMinutes.pop();

    let totalMinutes = parseInt((hours * 60)) + parseInt(minutes)

    return totalMinutes;
  } else {
    let totalMinutes = parseInt((hoursValue * 60)) + parseInt(minutes)
    return totalMinutes;
  }
}

convertMinsToHrsMins = function (minutes) {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + '.' + m;
}

convertMinsToHrsMinsSecs = function (timeDiff) {
  let hh = Math.floor(timeDiff / 1000 / 60 / 60);
  hh = ('0' + hh).slice(-2)

  timeDiff -= hh * 1000 * 60 * 60;
  let mm = Math.floor(timeDiff / 1000 / 60);
  mm = ('0' + mm).slice(-2)

  timeDiff -= mm * 1000 * 60;
  let ss = Math.floor(timeDiff / 1000);
  ss = ('0' + ss).slice(-2)

  return hh + ":" + mm + ":" + ss;
}

getFilesizeInBytes = function (filename) {
  let fs = require("fs");
  if (fs.existsSync(filename)) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
  }
  return null;
}

updateOrCreate = async function (model, where, newItem) {
  // First try to find the record
  const foundItem = await model.findOne({ where: where });
  if (!foundItem) {
    // Item not found, create a new one
    const item = await model.create(newItem)
    return item;
  }
  // Found an item, update it
  await model.update(newItem, { where: where });
  const updatedItem = await model.findOne({ where: where });
  return updatedItem;
}

module.exports.checkJSON = async function (text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

const weekday = {
  "sun": "sunday",
  "mon": "monday",
  "tue": "tuesday",
  "wed": "wednesday",
  "thu": "thursday",
  "thurs": "thursday",
  "fri": "friday",
  "sat": "saturday"
}

getWeekday = async function (text) {
  let day = null;
  let valText = text.toLowerCase().trim();

  for (let key in weekday) {
    let valuei = weekday[key];
    if (valText == key) {
      day = valuei;
      break;
    } else if (valText == valuei) {
      day = valuei;
      break;
    }
  }
  return day;

}

getWeekNumberNonISO = async function (d) {
  // Create UTC equivalent for 23:59:59.999 on the passed in date
  let sat = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999));
  // Set to Saturday at end of week
  sat.setUTCDate(sat.getUTCDate() + 6 - sat.getUTCDay());
  // Get first day of year
  let firstDay = new Date(Date.UTC(sat.getUTCFullYear(), 0, 1));
  // Set to Sunday on or before, i.e. first day of first week in year
  firstDay = firstDay.setUTCDate(firstDay.getUTCDate() - firstDay.getUTCDay());
  // Week number is difference in dates divided by ms/week rounded
  return Math.round((sat - firstDay) / (6.048e8));
}

module.exports.paginate = async function (array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
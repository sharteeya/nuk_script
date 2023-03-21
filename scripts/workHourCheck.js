const tbl = document.getElementById("ctl00_ContentPlaceHolder1_GridView2");
const summary = document.getElementById("ctl00_ContentPlaceHolder1_lblHrSum");
const tbody = tbl.children[0];

const times = [];
const DATE_IDX = 0, STIME_IDX = 2, ETIME_IDX = 3;
const LEAST_ALLOW_TIME_GAP = 30 * 60 * 1000; // 30 minutes
const MAX_HOUR_PER_WORK = 4 * 60 * 60 * 1000; // 4 hours

const STYLES = Object.freeze({
    OK_STYLE: "background-color: #00e070; color: white",
    ERROR_STYLE: "background-color: red; color: white",
    OK_TEXT: "font-size: 20px; color: green; text-decoration: underline",
    ERROR_TEXT: "font-size: 20px; color: red; text-decoration: underline",
})

const check = () => {
    if (window.location.href.split("/")[2] !== "webap.nuk.edu.tw") return;
    for (let idx = 1 ; idx < tbody.children.length ; idx++) {
        let date = tbody.children[idx].children[DATE_IDX].innerText,
            stime = tbody.children[idx].children[STIME_IDX].innerText,
            etime = tbody.children[idx].children[ETIME_IDX].innerText;
        times.push({
            stime: new Date(`${date} ${stime}`),
            etime: new Date(`${date} ${etime}`),
        });
    }

    let is_ok = true;
    for (let idx = 0 ; idx < times.length - 1 ; idx++) {
        const workTimeGap = times[idx+1].stime - times[idx].etime,
              workTimeToday = times[idx].etime - times[idx].stime,
              workTimeNextday = times[idx+1].etime - times[idx+1].stime;
        if (workTimeGap < LEAST_ALLOW_TIME_GAP && workTimeToday + workTimeNextday > MAX_HOUR_PER_WORK) {
            tbody.children[idx+1].children[ETIME_IDX].style = STYLES.ERROR_STYLE;
            tbody.children[idx+2].children[STIME_IDX].style = STYLES.ERROR_STYLE;
            is_ok = false;
        } else {
            tbody.children[idx+1].children[ETIME_IDX].style = STYLES.OK_STYLE;
            tbody.children[idx+2].children[STIME_IDX].style = STYLES.OK_STYLE;
        }
    }

    const text = document.createElement("b");
    text.id = "nuk_script_check";
    if (!is_ok) {
        text.innerText = " 時間不OK，請重填";
        text.style = STYLES.ERROR_TEXT;
    } else {
        text.innerText = " 時間OK，可送出";
        text.style = STYLES.OK_TEXT;
    }
    summary.appendChild(text);
};

if (document.getElementById("nuk_script_check") === null) {
    check();
} else {
    alert("已檢查過時間");
}

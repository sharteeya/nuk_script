const tbl = document.getElementById("ctl00_ContentPlaceHolder1_GridView2");
const tbody = tbl.children[0];
const summary = document.getElementById("ctl00_ContentPlaceHolder1_lblHrSum")

const times = [];
const DATE_IDX = 0, STIME_IDX = 2, ETIME_IDX = 3;
const LEAST_ALLOW_TIME_GAP = 30 * 60 * 1000; // 30 minute

const OK_STYLE = "background-color: #00e070; color: white";
const ERROR_STYLE = "background-color: red; color: white";

const check = () => {
    for (let idx = 1 ; idx < tbody.children.length ; idx++) {
        let date = tbody.children[idx].children[DATE_IDX].innerText;
        let stime = tbody.children[idx].children[STIME_IDX].innerText;
        let etime = tbody.children[idx].children[ETIME_IDX].innerText;
        times.push({
            stime: new Date(`${date} ${stime}`),
            etime: new Date(`${date} ${etime}`),
        });
    }
    
    let is_ok = true;

    for (let idx = 0 ; idx < times.length - 1 ; idx++) {
        if (times[idx+1].stime - times[idx].etime < LEAST_ALLOW_TIME_GAP) {
            tbody.children[idx+1].children[ETIME_IDX].style = ERROR_STYLE;
            tbody.children[idx+2].children[STIME_IDX].style = ERROR_STYLE;
            is_ok = false;
        } else {
            tbody.children[idx+1].children[ETIME_IDX].style = OK_STYLE;
            tbody.children[idx+2].children[STIME_IDX].style = OK_STYLE;
        }
    }


    
    const text = document.createElement("b");
    if (!is_ok) {
        text.innerText = " 時間不OK，請重填";
        text.style = "font-size: 20px; color: red; text-decoration: underline";
    } else {
        text.innerText = " 時間OK，可送出";
        text.style = "font-size: 20px; color: green; text-decoration: underline";
    }
    summary.appendChild(text);
};

check();
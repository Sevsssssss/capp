import * as XLSX from 'xlsx';

onmessage = function (event) {
    var data = event.data.d;
    let rows = [];
    var checker = true;
    var reason = "";

    var workbook = XLSX.read(data, { type: 'array' });
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    var rowObj = XLSX.utils.sheet_to_json(ws, { header: "A", blankrows: false });
    var checkTitle;
    try{
         checkTitle = rowObj[5].B;
    }catch{
         checkTitle = "";
    }
    
    if (checkTitle !== "") {
        if (rowObj[5].B === "Employees Data") {
            for (var i = 0; i < rowObj.length; i++) {
                console.log("hi " + i)
                if (!checker) break;
                if (i >= 7) {
                    rows.push(rowObj[i]);
                }

            }
        }
    }else {
        checker = false;
        reason = "Invalid Title"
    }


    postMessage({
        rows: rows,
        complete: checker,
        reason: reason
    });
    
}

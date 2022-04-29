let addSheetBtn = document.querySelector('.add-sheet');
let sheetList = document.querySelector(".sheets-list");
let sheetId = 0;
addSheetBtn.addEventListener("click",function(){
    sheetId++;
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.setAttribute("sheetid",sheetId);
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.innerText = `Sheet ${sheetId+1}`
    sheetList.append(sheetDiv);
    initUi();
    initDb();
})

sheetList.addEventListener("click",function(e){
    let sheetClicked = e.target;
    if(sheetClicked.classList.contains("active-sheet")){
        return;
    }
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    initUi();
    sheetClicked.classList.add("active-sheet");
    console.log(sheetClicked);
    let sheetId = sheetClicked.getAttribute("sheetid");
    console.log(sheetId);
    db = sheetsDB[sheetId].db;
    visitedCells = sheetsDB[sheetId].visitedCells;
    setUi();
})

function setUi(){
    for(let i=0;i<visitedCells.length;i++){
        let {rowId,colId} = visitedCells[i];
        let cellObject = db[rowId][colId];
        let cellUi = document.querySelector(`div[rowid = "${rowId}"][colid="${colId}"]`)
        cellUi.innerHTML = cellObject.value;
    }
}


function initUi(){
    for(let i=0;i<100;i++){
        for(let j=0;j<25;j++){
            let cell = document.querySelector(`div[rowid = "${i}"][colid="${j}"]`);
            cell.innerHTML = "";
        }
    }
}
function solveFormula(formula,selfCellObject){
    //forumula = D2 * E1 * H4 * 4
    let formulaComps = formula.split(" ");
    //formulaComps = [D2,E1,H4,4];
    for(let i=0;i<formulaComps.length;i++){
        let formulaComp = formulaComps[i];
        if(formulaComp[0]>="A" && formulaComp[0]<="Z"){
            let {rowId,colId} = getRowIdColIdFromAddress(formulaComp);
            // console.log(rowId);
            // console.log(colId);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            if(selfCellObject){
                cellObject.children.push(selfCellObject.name);
                selfCellObject.parent.push(cellObject.name);
            }
            formula = formula.replace(formulaComp,value);
        }
    }
    // console.log(selfCellObject);
    let computedValue = eval(formula);
    return computedValue;
}
function updateChildren(cellObject){
    for(let i=0;i<cellObject.children.length;i++){
        let childName = cellObject.children[i];
        let {rowId,colId} = getRowIdColIdFromAddress(childName);
        let childCellObject = db[rowId][colId];
        let newValue = solveFormula(childCellObject.formula);
        let cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        cellUI.textContent = newValue;
        childCellObject.value = newValue;
        updateChildren(childCellObject);
    }
}
function removeFormula(cellObject){
    for(let i=0;i<cellObject.parent.length;i++){
        let parentName = cellObject.parent[i];
        let {rowId,colId} = getRowIdColIdFromAddress(parentName);
        let parentCellObject = db[rowId][colId];
        let updateChildren = parentCellObject.children.filter(function(child){
            return child!=cellObject.name;
        })
        parentCellObject.children = updateChildren;
    }
    cellObject.parent = [];
}
function getRowIdColIdFromElement(element){
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId,colId
    }
}
function getRowIdColIdFromAddress(address){
    let rowId = Number(address.substring(1))-1;
    let colId = address.charCodeAt(0)-65;
    return { 
        rowId,colId
    }
}
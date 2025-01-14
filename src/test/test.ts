import { initiateMappingTableReader, initiateMappingWriter } from "../api/mainApi";
import { MappableIfcClasses } from "../models/mappingTable/mappingTableDefinition";

const tableReader = initiateMappingTableReader();
tableReader.setMappingRule<MappableIfcClasses.IfcBeam>({
    ifcClass: MappableIfcClasses.IfcBeam,
    userKey: "MyBeam",
    userArgs: {
        startPt: "ptStart",
        endPt: "ptEnd",
        height: "height",
        targetStorey: "Storey"
    }
})

tableReader.setMappingRule<MappableIfcClasses.IfcBuildingStorey>({
    ifcClass: MappableIfcClasses.IfcBuildingStorey,
    userKey: "myStorey",
    userArgs: {
        name: "storeyName",
        height: "level"
    }
})

tableReader.setMappingRule<MappableIfcClasses.IfcColumn>({
    ifcClass: MappableIfcClasses.IfcColumn,
    userKey: "MyColumn",
    userArgs: {
        coordinate: "location",
        height: "Length",
        rotation: "rotation",
        targetStorey: "Storey"
    }
})

const writer = initiateMappingWriter();

const columnItem = {
    userKey: "MyColumn",
    userArgs: {
        location: [2, 4],
        Length: 3,
        rotation: 35,
        Storey: "1F"
    }
}

const storey1F = {
    userKey: "myStorey",
    userArgs: {
        storeyName: "1F",
        level: 0
    }
}

const storey2F = {
    userKey: "myStorey",
    userArgs: {
        storeyName: "2F",
        level: 4
    }
}


const jobResut1 = writer.createMappedItem(columnItem, tableReader);
const jobResut2 = writer.createMappedItem(storey1F, tableReader);
const jobResut3 = writer.createMappedItem(storey2F, tableReader);
console.log(jobResut2);
console.log(jobResut3);

console.log("---MappingRules---");
console.log(tableReader.exportTable().mappingEntity);

console.log("---MappedItems---");
console.log(writer.exportMappedItems());
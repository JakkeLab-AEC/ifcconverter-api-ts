import { MappableIfcColumn } from "../mappableItems/entities/mappableIfcColumn";
import { MappableIfcBeam } from "../mappableItems/entities/mappableIfcBeam";
import { MappableIfcBuildingStorey } from "../mappableItems/entities/mappableIfcBuildingStorey";
import { MappableIfcWallStandardCase } from "../mappableItems/entities/mappableIfcWallStandardCase";
import { MappableItem } from "../mappableItems/mappableItem";
import { MappableIfcClasses } from "./mappingTableDefinition";
import { MappingTableReader } from "./mappingTableReader"

type MappableItemProps = {
    userKey: string,
    userArgs: {
        [key: string]: any
    }
}

const priorityOrder = ["IfcBuildingStorey"]

export class MappingWriter {
    constructor() {
        this.mappedItem = [];
        this.unmappedItem = [];
    }

    private mappedItem: Array<MappableItem>
    private unmappedItem: Array<{entity: MappableItemProps, reason: string}>;

    createMappedItem (item: MappableItemProps, mappingTableReader: MappingTableReader):{result: boolean, message?: string} {
        const mappingRule = mappingTableReader.getMappingRuleByUserKey(item.userKey);
        if(!mappingRule) {
            this.unmappedItem.push({ entity: item, reason: "Can't find matching rule." });
            return {result: false, message: "Can't find matching rule."};
        }
    
        const keysFromItem = Object.keys(item.userArgs)
        const keysFromMappingRule = Object.values(mappingRule.userArgs)

        const allKeysIncluded = keysFromMappingRule.every((key) => keysFromItem.includes(key));
        if (!allKeysIncluded) {
            this.unmappedItem.push({ entity: item, reason: "Some required keys are not included." });
            return { result: false, message: "Some required keys are not included." };
        }

        const transformedArgs: any = {};
        for (const [internalKey, userKey] of Object.entries(mappingRule.userArgs)) {
            if (item.userArgs[userKey] !== undefined) {
                transformedArgs[internalKey] = item.userArgs[userKey];
            }
        }
            
        switch (mappingTableReader.getMappableIfcClass(item.userKey)) {
            case MappableIfcClasses.IfcBuildingStorey: {
                const entity = new MappableIfcBuildingStorey({ userKey: item.userKey, userArgs: transformedArgs }, item.userKey);
                if (entity.isValid) {
                    this.mappedItem.push(entity);
                    return { result: true };
                } else {
                    this.unmappedItem.push({ entity: item, reason: "Type validation failed." });
                    return { result: false, message: "Type validation failed." };
                }
            }
    
            case MappableIfcClasses.IfcColumn: {
                const entity = new MappableIfcColumn({ userKey: item.userKey, userArgs: transformedArgs }, item.userKey);
                if (entity.isValid) {
                    this.mappedItem.push(entity);
                    return { result: true };
                } else {
                    this.unmappedItem.push({ entity: item, reason: "Type validation failed." });
                    return { result: false, message: "Type validation failed." };
                }
            }
    
            case MappableIfcClasses.IfcBeam: {
                const entity = new MappableIfcBeam({ userKey: item.userKey, userArgs: transformedArgs }, item.userKey);
                if (entity.isValid) {
                    this.mappedItem.push(entity);
                    return { result: true };
                } else {
                    this.unmappedItem.push({ entity: item, reason: "Type validation failed." });
                    return { result: false, message: "Type validation failed." };
                }
            }

            case MappableIfcClasses.IfcWallStandardCase: {
                const entity = new MappableIfcWallStandardCase({userKey: item.userKey, userArgs: transformedArgs }, item.userKey);
                if(entity.isValid) {
                    this.mappedItem.push(entity);
                    return { result: true };
                } else {
                    this.unmappedItem.push({ entity: item, reason: "Type validation failed."});
                    return { result: false, message: "Type validation failed." };
                }
            }
    
            default: {
                this.unmappedItem.push({ entity: item, reason: "Unsupported Item." });
                return { result: false, message: "Unsupported Item." };
            }
        }
    }

    getMappedItem():Array<MappableItem> {
        return this.mappedItem;
    }

    getUnmappedItem():Array<{entity: any, reason: string}> {
        return this.unmappedItem;
    }

    exportMappedItems(mappingTable?: MappingTableReader):Array<Object> {
        this.mappedItem.sort((a, b) => {
            if(a.ifcClass === MappableIfcClasses.IfcBuildingStorey && b.ifcClass !== MappableIfcClasses.IfcBuildingStorey) {
                return -1;
            }

            if(a.ifcClass !== MappableIfcClasses.IfcBuildingStorey && b.ifcClass === MappableIfcClasses.IfcBuildingStorey) {
                return 1;
            }

            return 0;
        });
        
        return this.mappedItem.map(item => item.export(mappingTable));
    }
}
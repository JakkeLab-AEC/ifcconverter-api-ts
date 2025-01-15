import { MappingTableReader } from "models/mappingTable/mappingTableReader";
import { MappableIfcClasses, UserArgs } from "../../mappingTable/mappingTableDefinition";
import { MappableItem } from "../mappableItem";

export class MappableIfcBuildingStorey extends MappableItem {
    constructor(data: any, userKey: string) {
        super(data, new Set(["name", "height"]), MappableIfcClasses.IfcBuildingStorey, userKey);
        if(this.isValid) {
            this.height = data.userArgs.height;
            this.name = data.userArgs.name;
        }
    }

    protected name: string | undefined;
    protected height: number | undefined;

    protected validateTypes(data: any): boolean {
        return (
            typeof data.name === "string" && 
            typeof data.height === "number"
        );
    }

    getUserArgs(mappingTable?: MappingTableReader): object {
        if(mappingTable === undefined) {
            return {
                ifcClass: MappableIfcClasses.IfcBuildingStorey,
                name: this.name,
                height: this.height
            }
        } else {
            const rule = mappingTable.getMappingRule(MappableIfcClasses.IfcBuildingStorey) as UserArgs<MappableIfcClasses.IfcBuildingStorey>;
            if(rule !== undefined) {
                return {
                    [rule.userArgs.name]: this.name,
                    [rule.userArgs.height]: this.height
                }
            } else {
                return { }
            }
        }
    }
}
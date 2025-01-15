import { MappingTableReader } from "models/mappingTable/mappingTableReader";
import { MappableIfcClasses, UserArgs } from "../../mappingTable/mappingTableDefinition";
import { MappableItem } from "../mappableItem";

export class MappableIfcColumn extends MappableItem {
    constructor(data: any, userKey: string) {
        super(data, new Set(["coordinate", "height", "rotation", "targetStorey"]), MappableIfcClasses.IfcColumn, userKey);
        if(this.isValid) {
            this.coordinate = data.userArgs.coordinate;
            this.height = data.userArgs.height;
            this.rotation = data.userArgs.rotation;
            this.targetStorey = data.userArgs.targetStorey;
        }
    }
    
    protected coordinate: Array<number> | undefined;
    protected height: number | undefined;
    protected rotation: number | undefined;
    protected targetStorey: string | undefined;

    protected validateTypes(data: any): boolean {
        return (
            Array.isArray(data.coordinate) && data.coordinate.every((item: any) => typeof item === "number") && data.coordinate.length === 2 &&
            typeof data.height === "number" &&
            typeof data.rotation === "number" &&
            typeof data.targetStorey === "string"
        );
    }

    getUserArgs(mappingTable?: MappingTableReader): object {
        if(mappingTable === undefined) {
            return {
                ifcClass: MappableIfcClasses.IfcColumn,
                coordinate: this.coordinate,
                height: this.height,
                rotation: this.rotation,
                targetStorey: this.targetStorey
            }
        } else {
            const rule = mappingTable.getMappingRule(MappableIfcClasses.IfcColumn) as UserArgs<MappableIfcClasses.IfcColumn>;
            if(rule !== undefined) {
                return {
                    [rule.userArgs.coordinate]: this.coordinate,
                    [rule.userArgs.height]: this.height,
                    [rule.userArgs.rotation]: this.rotation,
                    [rule.userArgs.targetStorey]: this.targetStorey
                }
            } else {
                return { }
            }
        }
    }
}
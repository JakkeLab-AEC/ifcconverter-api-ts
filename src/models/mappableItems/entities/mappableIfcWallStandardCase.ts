import { MappingTableReader } from "models/mappingTable/mappingTableReader";
import { MappableIfcClasses, UserArgs } from "../../mappingTable/mappingTableDefinition";
import { MappableItem } from "../mappableItem";

export class MappableIfcWallStandardCase extends MappableItem{
    constructor(data: any, userKey: string) {
        super(data, new Set(["startPt","endPt", "height", "zOffset", "thickness", "targetStorey"]), MappableIfcClasses.IfcWallStandardCase, userKey)
        if(this.isValid) {
            this.startPt = data.userArgs.startPt;
            this.endPt = data.userArgs.endPt;
            this.height = data.userArgs.height;
            this.zOffset = data.userArgs.zOffset;
            this.targetStorey = data.userArgs.targetStorey;
            this.thickness = data.userArgs.thickness;
        }
    }

    protected startPt:Array<number> | undefined;
    protected endPt:Array<number> | undefined;
    protected height:number | undefined;
    protected zOffset:number | undefined;
    protected targetStorey:string | undefined;
    protected thickness:number | undefined;

    protected validateTypes(data: any): boolean {
        return (
            Array.isArray(data.startPt) && data.startPt.every((item: any) => typeof item === "number") && data.startPt.length === 2 &&
            Array.isArray(data.endPt) && data.endPt.every((item: any) => typeof item === "number") && data.startPt.length === 2 &&
            typeof data.height === "number" &&
            typeof data.zOffset === "number" &&
            typeof data.targetStorey === "string" &&
            typeof data.thickness === "number"
        );
    }
    
    getUserArgs(mappingTable?: MappingTableReader): object {
        if (mappingTable === undefined) {
            return {
                startPt: this.startPt,
                endPt: this.endPt,
                height: this.height,
                targetStorey: this.targetStorey,
                thickness: this.thickness,
                zOffset: this.zOffset
            }
        } else {
            const rule = mappingTable.getMappingRule(MappableIfcClasses.IfcWallStandardCase) as UserArgs<MappableIfcClasses.IfcWallStandardCase>;
            if(rule !== undefined) {
                return {
                    [rule.userArgs.startPt]: this.startPt,
                    [rule.userArgs.endPt]: this.endPt,
                    [rule.userArgs.height]: this.height,
                    [rule.userArgs.targetStorey]: this.targetStorey,
                    [rule.userArgs.thickness]: this.thickness,
                    [rule.userArgs.zOffset]: this.zOffset
                }
            } else {
                return { }
            }
        }
    }
}
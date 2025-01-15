import { MappableIfcClasses } from "models/mappingTable/mappingTableDefinition";
import { MappingTableReader } from "models/mappingTable/mappingTableReader";

export abstract class MappableItem {
    readonly requiredParams: Set<string>;
    readonly isValid: boolean;
    readonly ifcClass: MappableIfcClasses;
    readonly userKey: string;

    protected constructor(readonly data: any, requiredParams: Set<string>, ifcClass: MappableIfcClasses, userKey: string) {
        this.ifcClass = ifcClass;
        this.requiredParams = requiredParams;
        this.userKey = userKey;
        this.isValid = this.validate(data);
    }

    protected abstract validateTypes(data: any): boolean;

    validate(data: any): boolean {
        const hasRequiredKeys = Array.from(this.requiredParams).every(param=> Object.keys(data.userArgs).includes(param));
        if (!hasRequiredKeys) {
            return false;
        }
        
        return this.validateTypes(data.userArgs);
    }
    
    abstract getUserArgs(mappingTable?: MappingTableReader): object;
    export(mappingTable?: MappingTableReader): object {
        return {
            userKey: this.userKey,
            userArgs: this.getUserArgs(mappingTable)
        }
    }
}
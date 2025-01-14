import { MappableIfcClasses } from "models/mappingTable/mappingTableDefinition";

export abstract class MappableItem {
    readonly requiredParams: Set<string>;
    readonly isValid: boolean;
    readonly ifcClass: MappableIfcClasses;

    protected constructor(readonly data: any, requiredParams: Set<string>, ifcClass: MappableIfcClasses) {
        this.ifcClass = ifcClass;
        this.requiredParams = requiredParams;
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

    abstract export(): Object;
}
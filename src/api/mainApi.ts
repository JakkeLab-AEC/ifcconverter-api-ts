import { MappingTableReader } from "../models/mappingTable/mappingTableReader";
import { MappingWriter } from "../models/mappingTable/mappingWriter";

export function initiateMappingWriter(): MappingWriter {
    return new MappingWriter();
}

export function initiateMappingTableReader(): MappingTableReader {
    return new MappingTableReader();
}
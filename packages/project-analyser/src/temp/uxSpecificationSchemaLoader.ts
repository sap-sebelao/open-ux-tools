import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

/* Temporary solution until specification package implements API */

/**
 * Loads all JSON files from a specified folder and returns their parsed content.
 *
 * @param folderPath - Path to the folder containing JSON files
 * @returns Object with filename (without extension) as key and parsed JSON content as value
 */
export function getSpecification(folderPath: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    // Check if folder exists
    if (!existsSync(folderPath)) {
        throw new Error(`Folder does not exist: ${folderPath}`);
    }

    // Read all files in the folder
    const files = readdirSync(folderPath);

    // Filter and process only JSON files
    const jsonFiles = files.filter((file: string) => extname(file).toLowerCase() === '.json');

    for (const file of jsonFiles) {
        const filePath = join(folderPath, file);
        const fileName = basename(file, '.json');

        try {
            const fileContent = readFileSync(filePath, 'utf8');
            const parsedContent = JSON.parse(fileContent) as Record<string, unknown>; // TODO meaningful type
            result[fileName] = parsedContent;
        } catch (error) {
            throw new Error(
                `Error processing file ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    return result;
}

// Example usage:
// const specifications = getSpecification('./sample1_pps');
// console.log("Loaded specifications:", Object.keys(specifications));
//
// Expected result format:
// {
//   "PPS_PurchaseOrderItemObjectPage": { ... parsed JSON content ... },
//   "PPS_PurchaseOrderList": { ... parsed JSON content ... },
//   "PPS_PurchaseOrderObjectPage": { ... parsed JSON content ... },
//   "PPS_PurchaseOrderScheduleLineObjectPage": { ... parsed JSON content ... },
//   "PPS_PurOrderAccountAssignmentObjectPage": { ... parsed JSON content ... }
// }

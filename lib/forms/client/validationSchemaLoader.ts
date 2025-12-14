/**
 * Loads a client validation schema based on a simple naming convention.
 *
 * Convention:
 *  - The provided form name (e.g. "contact", "projects", "services")
 *    is used directly to determine:
 *    - Folder name: same as the form name.
 *    - Module path: "@/app/api/forms/<formName>/types-and-validation"
 *    - Export name: "<formName>ClientValidationSchema"
 *
 * @param formName - The name of the form (e.g. "contact")
 * @returns The client validation schema (e.g. a Yup schema)
 * @throws A friendly error if the module or export cannot be found.
 */
export async function loadValidationSchema(formName: string): Promise<unknown> {
  const name = formName.toLowerCase();
  const exportName = `${name}ClientValidationSchema`;
  const modulePath = `@/app/api/forms/${name}/types-and-validation`;

  try {
    const imported = await import(modulePath);
    const schema = (imported as Record<string, unknown>)[exportName];
    if (!schema) {
      throw new Error(`Export "${exportName}" not found in module "${modulePath}"`);
    }
    return schema;
  } catch (error) {
    throw new Error(`Failed to load validation schema for form "${formName}": ${error}`);
  }
}

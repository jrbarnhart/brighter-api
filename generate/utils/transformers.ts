export function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export type ResourceNames = {
  pascal: string; // Room
  camel: string; // room
  plural: string; // rooms
  pascalPlural: string; // Rooms
};

export function generateResourceNames(resource: string): ResourceNames {
  const singular = resource.endsWith('s') ? resource.slice(0, -1) : resource;
  return {
    pascal: toPascalCase(singular),
    camel: toCamelCase(singular),
    plural: `${singular}s`,
    pascalPlural: toPascalCase(`${singular}s`),
  };
}

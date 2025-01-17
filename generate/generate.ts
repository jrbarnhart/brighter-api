import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateResourceNames } from './utils/transformers';
import { controllerTemplate } from './templates/controller.template';
import { serviceTemplate } from './templates/service.template';
import { serviceSpecTemplate } from './templates/service.spec.template';

function createFileIfNotExists(filePath: string, content: string) {
  if (existsSync(filePath)) {
    console.error(`File ${filePath} already exists. Skipping.`);
    return false;
  }

  writeFileSync(filePath, content);
  return true;
}

function replaceTemplateTokens(
  template: string,
  resourceNames: ReturnType<typeof generateResourceNames>,
) {
  return template
    .replace(/__PASCAL_PLURAL__/g, resourceNames.pascalPlural)
    .replace(/__PASCAL__/g, resourceNames.pascal)
    .replace(/__CAMEL_PLURAL__/g, resourceNames.plural)
    .replace(/__CAMEL__/g, resourceNames.camel)
    .replace(/__PLURAL__/g, resourceNames.plural);
}

function generate() {
  const resourceArg = process.argv[2];

  if (!resourceArg) {
    console.error('Please provide a resource name');
    process.exit(1);
  }

  const resourceNames = generateResourceNames(resourceArg);
  const genOutDir = join(process.cwd(), 'genOut');

  // Create genOut directory if it doesn't exist
  if (!existsSync(genOutDir)) {
    mkdirSync(genOutDir);
  }

  // Generate controller
  const controllerContent = replaceTemplateTokens(
    controllerTemplate,
    resourceNames,
  );
  const controllerPath = join(
    genOutDir,
    `${resourceNames.plural}.controller.ts`,
  );

  // Generate service
  const serviceContent = replaceTemplateTokens(serviceTemplate, resourceNames);
  const servicePath = join(genOutDir, `${resourceNames.plural}.service.ts`);

  // Generate service spec
  const serviceSpecContent = replaceTemplateTokens(
    serviceSpecTemplate,
    resourceNames,
  );
  const serviceSpecPath = join(
    genOutDir,
    `${resourceNames.plural}.service.spec.ts`,
  );

  // Create files
  const controllerCreated = createFileIfNotExists(
    controllerPath,
    controllerContent,
  );
  const serviceCreated = createFileIfNotExists(servicePath, serviceContent);
  const serviceSpecCreated = createFileIfNotExists(
    serviceSpecPath,
    serviceSpecContent,
  );

  if (controllerCreated) {
    console.log(`Created controller: ${controllerPath}`);
  }

  if (serviceCreated) {
    console.log(`Created service: ${servicePath}`);
  }

  if (serviceSpecCreated) {
    console.log(`Created service spec: ${serviceSpecPath}`);
  }
}

generate();

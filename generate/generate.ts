import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateResourceNames } from './utils/transformers';
import { controllerTemplate } from './templates/controller.template';
import { serviceTemplate } from './templates/service.template';
import { serviceSpecTemplate } from './templates/service.spec.template';
import { input, select } from '@inquirer/prompts';

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

async function generate() {
  const name = await input({
    message: 'What is the resource name? Use camelCase. Ex: catBreeds',
    validate: (input) => {
      if (input.trim() === '') {
        return 'Name cannot be empty';
      } else {
        return true;
      }
    },
  });

  const fileChoice = await select({
    message: 'Generate which file?',
    choices: [
      {
        name: 'All',
        value: 'all',
        description: 'Create controller, service, and service test files',
      },
      {
        name: 'Controller',
        value: 'controller',
        description: 'Create name.controller.ts',
      },
      {
        name: 'Service',
        value: 'service',
        description: 'Create name.service.ts',
      },
      {
        name: 'Service Tests',
        value: 'spec',
        description: 'Create name.service.spec.ts',
      },
    ],
  });

  const resourceNames = generateResourceNames(name);
  const genOutDir = join(process.cwd(), 'genOut');

  // Create genOut directory if it doesn't exist
  if (!existsSync(genOutDir)) {
    mkdirSync(genOutDir);
  }

  let shouldGenController = false;
  let shouldGenServiceSpec = false;
  let shouldGenService = false;
  switch (fileChoice) {
    case 'all': {
      shouldGenController = true;
      shouldGenServiceSpec = true;
      shouldGenService = true;
      break;
    }
    case 'controller': {
      shouldGenController = true;
      break;
    }
    case 'service': {
      shouldGenService = true;
      break;
    }
    case 'spec': {
      shouldGenServiceSpec = true;
      break;
    }
    default: {
      console.log('Incorrect choice. How did you do that?! Exiting...');
      process.exit(1);
    }
  }

  // Generate controller
  if (shouldGenController) {
    const controllerContent = replaceTemplateTokens(
      controllerTemplate,
      resourceNames,
    );
    const controllerPath = join(
      genOutDir,
      `${resourceNames.plural}.controller.ts`,
    );

    createFileIfNotExists(controllerPath, controllerContent);

    console.log(`Created controller: ${controllerPath}`);
  }

  // Generate service
  if (shouldGenService) {
    const serviceContent = replaceTemplateTokens(
      serviceTemplate,
      resourceNames,
    );
    const servicePath = join(genOutDir, `${resourceNames.plural}.service.ts`);

    createFileIfNotExists(servicePath, serviceContent);
    console.log(`Created service: ${servicePath}`);
  }

  // Generate service spec
  if (shouldGenServiceSpec) {
    const serviceSpecContent = replaceTemplateTokens(
      serviceSpecTemplate,
      resourceNames,
    );
    const serviceSpecPath = join(
      genOutDir,
      `${resourceNames.plural}.service.spec.ts`,
    );

    createFileIfNotExists(serviceSpecPath, serviceSpecContent);
    console.log(`Created service spec: ${serviceSpecPath}`);
  }
}

generate()
  .then()
  .catch((error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
      console.log('👋 User exited tool.');
    } else {
      // Rethrow unknown errors
      throw error;
    }
  });

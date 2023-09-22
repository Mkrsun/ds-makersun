module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Crea un nuevo componente',
    prompts: [
      {
        type: 'list',
        name: 'package',
        message: 'Selecciona el proyecto donde quieres crear el componente',
        choices: ['dozen', 'manaier'],
      },
      {
        type: 'list',
        name: 'type',
        message: 'Selecciona el tipo de componente:',
        choices: ['atom', 'molecule', 'organism'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del componente:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{package}}/src/atomic/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop_templates/atomic/Generic.tsx.plop',
      },
      {
        type: 'add',
        path: 'packages/{{package}}/src/atomic/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop_templates/atomic/Generic.stories.tsx.plop',
      },
      {
        type: 'add',
        path: 'packages/{{package}}/src/atomic/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.scss',
        templateFile: 'plop_templates/atomic/Generic.scss.plop',
      },
      {
        type: 'add',
        path: 'packages/{{package}}/src/atomic/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop_templates/atomic/Generic.test.plop',
      },
      {
        type: 'add',
        path: 'packages/{{package}}/src/atomic/{{type}}s/{{pascalCase name}}/index.ts',
        templateFile: 'plop_templates/index.ts.plop',
      },
      {
        type: 'modify',
        path: 'packages/{{package}}/src/index.ts',
        pattern: /(\/\/ COMPONENT IMPORTS)/g,
        template:
          "import {{properCase name}} from './atomic/{{type}}s/{{properCase name}}'\n$1",
      },
      {
        type: 'modify',
        path: 'packages/{{package}}/src/index.ts',
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        template: '  {{properCase name}},\n$1',
      },
    ],
  });
};

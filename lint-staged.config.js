module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'pnpm tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': filenames => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': filenames => `pnpm prettier --write ${filenames.join(' ')}`,

  // add test check
  '**/*.(ts|tsx)': () => 'pnpm test'
};

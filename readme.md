# ui-input

A React + TypeScript component library with Webpack bundling. Includes ESLint + Prettier for code quality and Jest for testing.

---

## Overview

### Project Structure
``` bash
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── styles/       # Global and component styles
│   └── index.tsx     # Entry point
├── dist/             # Production build output
├── webpack.config.js 
├── eslint.config.js  
├── tsconfig.json     
└── package.json
```

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- (I haven't tested this on macOS or linux. I've taken some measures, hopefully are enough)

### Installation
```bash
git clone https://github.com/rhJairo/ui-input.git
cd ui-input
npm install

```

### Scripts

#### Development

Startup the development server, it has hot reloading enabled.
Go to http://localhost:3000/

```bash

npm run dev

```

#### Build

Builds the project for production in the ``dist/`` folder.

```bash

npm run build

```

#### Type Checking

Runs the Typescript compiler type-checks.

```bash

npm run type-check

```

#### Clean

Removes ``dist``, ``node_modules`` and ``.cache``.

```bash

npm run clean

```

#### Linting

Checks code with ESLint. Use lint:fix to auto-fix issues.

```bash

npm run lint
npm run lint:fix

```

#### Formating

Runs Prettier to format all files in ``src``.

```bash

npm run format

```

#### Testing

```bash

npm run test          # Run all tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report


```

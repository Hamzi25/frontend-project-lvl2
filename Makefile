install:
	npm ci

link:
	npm link

gendiff:
	node gendiff.js

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

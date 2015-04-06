
default: test

test: node_modules $(wildcard test/*.js)
	@node_modules/.bin/mocha test/test.js

clean:
	@rm -rf build.js tmg.js tmg.min.js components node_modules

node_modules: package.json
	@npm install

bundle: index.js
	@duo --standalone tmg --stdout index.js > tmg.js
	@uglifyjs tmg.js --mangle --compress --output tmg.min.js

.PHONY: clean test

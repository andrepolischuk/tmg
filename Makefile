
default: test

test: node_modules $(wildcard test/*.js)
	@node_modules/.bin/mocha test/test.js

clean:
	@rm -rf build.js tmg.js tmg.min.js components node_modules

node_modules: package.json
	@npm install

tmg.js: node_modules index.js
	@node_modules/.bin/duo --standalone tmg --stdout index.js > $@

tmg.min.js: tmg.js
	@node_modules/.bin/uglifyjs $< --mangle --compress --output $@

.PHONY: clean test

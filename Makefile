
default: build

clean:
	@rm -rf build components node_modules

build: index.js index.css
	@duo index.js index.css

.PHONY: clean bundle

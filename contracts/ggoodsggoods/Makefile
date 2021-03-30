.PHONY: clean
clean:
	rm -rf build

.PHONY: build
build:
	mkdir -p build
	cd build && cmake ../ && make
	mv build/ggoodsggoods/dgoods* .
	rm -rf build/*
	mkdir -p build/ggoodsggoods
	mv ggoodsggoods.abi ggoodsggoods.wasm build/ggoodsggoods/

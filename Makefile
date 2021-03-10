
fetch-language-server:
	cp ../language-server-vhdl/com.eccelerators.plugins.vhdl.ide/build/distributions/language-server.zip resources
	(cd resources && \
	 rm -rf lib bin && \
	 unzip language-server.zip && \
	 mv language-server/bin . && \
	 mv language-server/lib . && \
	 rm -rf language-server language-server.zip)

prepare:
	npm install

package: fetch-language-server  prepare
	vsce package

clean:
	@rm -rf out node_modules vhdl-*.vsix

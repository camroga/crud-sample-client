default : client

.PHONY : install-client
install-client :
	npm install npm@latest -g
	npm update
	npm install -g @angular/cli
	ng build

.PHONY : client
client:
	ng serve --open
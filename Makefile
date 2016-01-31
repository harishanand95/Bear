VAR1={\"name\": \"Bear\",
VAR1+=\"description\": \"It is the display interface for the artificial agent Bear.\",
VAR1+=\"shell-version\": [\"
VAR2:=\"],
SHELL_VERSION = $(shell gnome-shell --version)
VERSION_NO_ONLY = $(word 3, $(SHELL_VERSION))
VAR1 := $(VAR1)$(VERSION_NO_ONLY)$(VAR2)
VAR1+=\"uuid\": \"ProjectBear@email.com\"}

dir:=$(HOME)/.local/share/gnome-shell/extensions/

all: install

.PHONY: build
build: 
	if [ -x /usr/bin/apt-get ]; then make apt-packages; fi
	if [ -x /usr/bin/yum ];     then make yum-packages; fi

.PHONY: apt-packages
apt-packages:
	sudo apt-get install -y nodejs gnome-tweak-tool npm build-essential xclip libxml2 ffmpeg python-lxml python-dbus xdotool sox libxslt 


.PHONY: yum-packages
yum-packages: 
	sudo yum install -y nodejs gcc-c++ make npm gnome-tweak-tool xclip libxml2 ffmpeg python-lxml python-dbus xdotool sox libxslt

.PHONY: pip-packages
pip-packages:
	sudo pip install requests wikiapi


.PHONY: exec
exec:
	sudo chmod +x Bear


metadata:
	@echo "$(VAR1)" > $@.json
	cp $@.json ./ProjectBear@email.com

.PHONY: ProjectBear@email.com
ProjectBear@email.com:
	cp -r $@/ $(dir)
	sudo chmod 757 -R $(dir)$@/
	sudo cp Bear /usr/local/bin/
	gnome-shell-extension-tool -e $@

.PHONY: npm
npm:
	cd .Bear/ && $@ i google-speech-api;
	cp -r .Bear/ $(HOME)	
	@echo "Successfully Installed"

.PHONY: install
install: | build pip-packages exec metadata ProjectBear@email.com npm


clean:
	rm -f metadata.json
	rm -rf .Bear/node_modules

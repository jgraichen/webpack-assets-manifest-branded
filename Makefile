#!/usr/bin/make -f

BRANDS := $(shell find brand -mindepth 1 -maxdepth 1 -type d -printf "%f\n")

all: $(BRANDS)

$(BRANDS):
	yarn run webpack build --mode production --env BRAND=$(@F)

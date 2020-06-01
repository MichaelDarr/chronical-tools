#
# github.com/MichaelDarr/chronicle-app/backend
#

BIN := backend
DESTDIR :=
GO ?= go
PREFIX := /usr/local
VERSION = $(shell cat VERSION)

GOFLAGS := -mod=vendor
EXTRA_GOFLAGS ?=

.PHONY: default
default: $(BIN)

.PHONY: build
build: $(BIN)

.PHONY: $(BIN)
$(BIN): ## build
	$(GO) build $(GOFLAGS) $(EXTRA_GOFLAGS) -o $@

.PHONY: install
install:
	install -d $(DESTDIR)$(PREFIX)/bin
	install -m 0755 $(BIN) $(DESTDIR)$(PREFIX)/bin/$(BIN)

.PHONY: uninstall
uninstall:
	rm -f $(DESTDIR)$(PREFIX)/bin/$(BIN)

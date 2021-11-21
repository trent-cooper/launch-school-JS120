class Banner {
  constructor(message, fixedWidth = null) {
    this.message = message;
    this.fixedWidth = fixedWidth;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  getMessageLength() {
    if (this.fixedWidth) {
      return this.fixedWidth - 2;
    } else {
      return this.message.length + 2;
    }
  }

  getSpaces() {
    return ((this.fixedWidth - 2) - (this.message.length)) / 2;
  }

  horizontalRule() {
    return '+' + '-'.repeat(this.getMessageLength()) + '+';
  }

  emptyLine() {
    return '|' + ' '.repeat(this.getMessageLength()) + '|';
  }

  messageLine() {
    if (this.fixedWidth) {
      return `|${' '.repeat(this.getSpaces())}${this.message}${' '.repeat(this.getSpaces())}|`;
    } else {
      return `| ${this.message} |`
    }
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.', 54);
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();
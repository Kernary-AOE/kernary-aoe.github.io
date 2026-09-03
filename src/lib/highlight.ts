// Tiny build-time highlighter for the handful of marketing snippets on the
// homepage. It is deliberately not a real tokenizer: comments, strings,
// keywords, and shell flags are enough to give the blocks visual rhythm.

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KEYWORDS = /\b(import|from|const|await|new|export|return|curl|bun|git|cd|clone|install|run)\b/g;

export function highlight(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      const commentAt = line.search(/(^|\s)(\/\/|#)(?=\s|$)/);
      const body = commentAt >= 0 ? line.slice(0, commentAt) : line;
      const comment = commentAt >= 0 ? line.slice(commentAt) : '';

      const parts: string[] = [];
      const re = /('[^']*'|"[^"]*")/g;
      let last = 0;
      let match: RegExpExecArray | null;
      const plain = (chunk: string) =>
        escape(chunk)
          .replace(KEYWORDS, '<span class="tk-k">$1</span>')
          .replace(/(^|\s)(--?[a-zA-Z][\w-]*)/g, '$1<span class="tk-f">$2</span>')
          .replace(/\b([A-Z][A-Z_]+)(?==)/g, '<span class="tk-e">$1</span>')
          .replace(/\$[A-Z_]+/g, '<span class="tk-e">$&</span>')
          .replace(/\b(aoe_[a-z]+|AoeClient)\b/g, '<span class="tk-i">$1</span>');
      while ((match = re.exec(body))) {
        parts.push(plain(body.slice(last, match.index)));
        parts.push(`<span class="tk-s">${escape(match[0])}</span>`);
        last = match.index + match[0].length;
      }
      parts.push(plain(body.slice(last)));
      if (comment) parts.push(`<span class="tk-c">${escape(comment)}</span>`);
      return parts.join('');
    })
    .join('\n');
}

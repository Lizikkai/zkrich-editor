export class XSSFilter {
  private allowedTags: string[] = ['b', 'i', 'u', 'p', 'br', 'div', 'span', 'a', 'img'];
  private allowedAttrs: Record<string, string[]> = {
    a: ['href', 'target'],
    img: ['src', 'alt', 'width', 'height'],
  }

  sanitize(html: string) {
    if(!html || html.trim() === '') {
      return '';
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    if(!doc.body) {
      return '';
    }
    this.cleanNode(doc.body);
    return doc.body.innerHTML;
  }


  private cleanNode(node: Node) {
    if(node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      // 过滤标签
      if(!this.allowedTags.includes(element.tagName.toLowerCase())) {
        return element.replaceWith(...Array.from(element.childNodes));
      }

      // 过滤属性
      const allowedAttrs = this.allowedAttrs[element.tagName.toLowerCase()] || [];
      Array.from(element.attributes).forEach(attr => {
        if(!allowedAttrs.includes(attr.name)) {
          element.removeAttribute(attr.name);
        }
      })
    }
    // 递归清理子节点
    Array.from(node.childNodes).forEach(child => this.cleanNode(child));
  }
}
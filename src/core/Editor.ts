import { EventBus } from './utils/EventBus';
import { XSSFilter } from './utils/XSSFilter';

export class RichEditor {
  private content: string = '';
  private history: string[] = [];
  private currentStep = -1;
  private eventBus = new EventBus();
  private xssFilter = new XSSFilter();

  constructor(initialContent?:string) {
    this.setContent(initialContent || '');
  }

  setContent(content: string) {
    this.content = this.xssFilter.sanitize(content);
    this.recordHistory();
    this.emitUpdate();
    // this.history.push(this.content);
    // this.currentStep = this.history.length - 1;
  }

  execCommand(command: string, value?: string) {
    document.execCommand(command, false, value);
    this.syncContent();
  }

  private recordHistory() {
    this.history = this.history.slice(0, this.currentStep + 1);
    this.history.push(this.content);
    this.currentStep++;
  }

  private emitUpdate() {
    this.eventBus.emit('update', this.content || '');
  }

  private syncContent() {
    const newContent = this.xssFilter.sanitize(document.getSelection()?.anchorNode?.parentElement?.innerHTML || '');
    if(newContent !== this.content) {
      this.content = newContent;
      this.emitUpdate();
    }
  }

  public undo() {
    if(this.currentStep > 0) {
      this.currentStep--;
      this.content = this.history[this.currentStep];
      this.emitUpdate();
    }
  }

  public redo() {
    if(this.currentStep < this.history.length - 1) {
      this.currentStep++;
      this.content = this.history[this.currentStep];
      this.emitUpdate();
    }
  }

  onUpdate(callback: (content: string | undefined) => void) {
    this.eventBus.on('update', callback);
  }

}
import { Injectable } from '@opensumi/di';
import { OnEvent, WithEventBus } from "@opensumi/ide-core-common";
import { EditorDocumentModelContentChangedEvent, EditorDocumentModelCreationEvent, EditorDocumentModelRemovalEvent } from "@opensumi/ide-editor/lib/browser";

@Injectable()
export class BuiltinEventService extends WithEventBus {
  private _startRecord = false;

  init() {
    this._startRecord = true;
  }

  @OnEvent(EditorDocumentModelRemovalEvent)
  onDocumentRemove({ payload }) {
    if (!this._startRecord) return;
    console.log(`Document \`${payload.toString()}\` removed.`);
  }

  @OnEvent(EditorDocumentModelCreationEvent)
  onDocumentCreate({ payload }) {
    if (!this._startRecord) return;
    console.log(`Document \`${payload.uri.toString()}\` created.`);
  }

  @OnEvent(EditorDocumentModelContentChangedEvent)
  onDocumentChanged({ payload }) {
    if (!this._startRecord) return;
    console.log(`Document \`${payload.uri.toString()}\` changed.`);
  }
}
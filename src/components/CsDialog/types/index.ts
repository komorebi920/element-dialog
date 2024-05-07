import Vue, { VNode } from "vue";

export interface CsDialogSlots {
  /** Content of the Dialog */
  default?: VNode;

  /** Content of the Dialog title */
  title?: VNode;

  /** Content of the Dialog footer */
  footer?: VNode;
}

export declare class CsDialogComponent extends Vue {
  id: string;

  visible: boolean;

  /** Close the Dialog instance */
  close(): void;
}

export interface CsDialogOptions {
  /** Title of Dialog */
  title?: string;

  /** Width of Dialog */
  width?: string;

  /** Whether the Dialog takes up full screen */
  fullscreen?: boolean;

  /** Value for margin-top of Dialog CSS */
  top?: string;

  /** Whether a mask is displayed */
  modal?: boolean;

  /** Custom class names for Dialog */
  customClass?: string;

  /** Whether the Dialog can be closed by clicking the mask */
  closeOnClickModal?: boolean;

  /** Whether the Dialog can be closed by pressing ESC */
  closeOnPressEscape?: boolean;

  /** Whether to show a close button */
  showClose?: boolean;

  /** Whether to align the header and footer in center */
  center?: boolean;

  onOpen?: () => void;

  onOpened?: () => void;

  /** Callback before Dialog closes, and it will prevent Dialog from closing */
  beforeClose?: (done: (...args: unknown[]) => unknown) => void;

  onClose?: () => void;

  onClosed?: () => void;

  $slots?: CsDialogSlots;
}

export interface CsDialog {
  /** Show a dialog */
  (options: CsDialogOptions): CsDialogComponent;

  /** Close the Dialog instance */
  close(id: string, userOnClose?: () => void): void;

  /** Close all Dialog instances */
  closeAll(): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $dialog: CsDialog;
  }
}

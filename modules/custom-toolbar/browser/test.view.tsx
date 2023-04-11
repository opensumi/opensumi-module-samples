import * as React from "react";
import { Button } from "@opensumi/ide-components";
import {
  MessageType,
  ProgressLocation,
  useInjectable,
} from "@opensumi/ide-core-browser";
import { IMainLayoutService } from "@opensumi/ide-main-layout";

export const TestToolbar = () => {
  const layoutService = useInjectable<IMainLayoutService>(IMainLayoutService);
  const bottomTabbarService = layoutService.getTabbarService("bottom");
  const rightTabbarService = layoutService.getTabbarService("right");
  const leftTabbarService = layoutService.getTabbarService("left");

  const [buttonHighlight, setButtonState] = React.useState<
    Record<"editor" | "bottom" | "right", boolean>
  >({
    editor: true,
    bottom: false,
    right: true,
  });
  function updateButtonState() {
    const allHidden = Object.values(buttonHighlight).every((v) => !v);
    if (allHidden) {
      // show editor
      layoutService.expandBottom(false);
      leftTabbarService.updatePanelVisibility(true);
    }
  }

  React.useEffect(() => {
    bottomTabbarService.currentContainerId == "";
    const disposable1 = bottomTabbarService.onCurrentChange(() => {
      setButtonState({
        ...buttonHighlight,
        bottom: !!bottomTabbarService.currentContainerId,
      });
      updateButtonState();
    });

    const disposable2 = rightTabbarService.onCurrentChange(() => {
      setButtonState({
        ...buttonHighlight,
        right: !!rightTabbarService.currentContainerId,
      });
      updateButtonState();
    });

    const disposable3 = leftTabbarService.onCurrentChange(() => {
      setButtonState({
        ...buttonHighlight,
        editor: !!leftTabbarService.currentContainerId,
      });
      updateButtonState();
    });

    return () => {
      disposable1.dispose();
      disposable2.dispose();
      disposable3.dispose();
    };
  });

  return (
    <div
      style={{
        lineHeight: "35px",
        flex: 1,
        padding: "0 20px",
        textAlign: "center",
        backgroundColor: "var(--kt-menubar-background)",
      }}
    >
      {["editor", "bottom", "right"].map((position) => {
        const isActive = buttonHighlight[position];

        return (
          <Button
            type={isActive ? "primary" : "secondary"}
            onClick={() => {
              setButtonState({
                ...buttonHighlight,
                [position]: !isActive,
              });
              if (position === "right") {
                rightTabbarService.updatePanelVisibility(!isActive);
                if (!isActive) {
                  layoutService
                    .getTabbarHandler(
                      rightTabbarService.currentContainerId ||
                        "opensumi-preview-container"
                    )
                    ?.activate();
                  layoutService
                    .getTabbarHandler(
                      rightTabbarService.currentContainerId ||
                        "opensumi-preview-container"
                    )
                    ?.show();
                  layoutService.expandBottom(false);
                }
              } else if (position === "bottom") {
                // When editor is active, only hide container
                const bottomContainer = layoutService.getTabbarHandler(
                  bottomTabbarService.currentContainerId ||
                    "opensumi-devtools-container"
                );
                if (buttonHighlight.editor) {
                  if (!isActive) {
                    bottomTabbarService.updatePanelVisibility(true);
                    bottomContainer?.activate();
                    bottomContainer?.show();
                  } else {
                    bottomContainer?.deactivate();
                  }
                } else {
                  if (!layoutService.bottomExpanded) {
                    bottomTabbarService.updatePanelVisibility(true);
                    bottomContainer?.activate();
                    bottomContainer?.show();
                    rightTabbarService.currentContainerId = "";
                    layoutService.expandBottom(true);
                  }
                }
              } else {
                if (isActive) {
                  leftTabbarService.updatePanelVisibility(false);
                  layoutService.expandBottom(true);
                } else {
                  leftTabbarService.updatePanelVisibility(true);
                  layoutService.expandBottom(false);
                }
              }
            }}
          >
            {position}
          </Button>
        );
      })}
    </div>
  );
};

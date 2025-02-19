import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../di/DIContext";
import Padding from "../components/common/Padding";
import Column from "../components/common/Column";
import PillSelector from "../components/management/PillSelector";
import ListSwitcher from "../components/management/ListSwitcher";
import FloatingActionButton from "../components/common/FloatingActionButton";
import { getPastelColor } from "../colors/pastel";
import AddQuestionDialog from "../components/management/AddQuestionDialog";

/**
 * The main screen for the management.
 * Contains the pill selector, list switcher and add question dialog.
 */
const ManagementScreen = observer(() => {
  const { managementViewModel, gameViewModel } = useDI();

  useEffect(() => {
    managementViewModel.loadQuestions();
    gameViewModel.setNeedsReload(true);
  }, []);

  return (
    <Padding paddingVertical={16}>
      <Column
        width="100%"
        height="100%"
        align="center"
        justify="center"
        gap={16}
      >
        <PillSelector />
        <ListSwitcher />
      </Column>
      <FloatingActionButton
        color={getPastelColor(managementViewModel.selectedListIndex + 1)}
        onPress={() => {
          const currentLevel =
            managementViewModel.selectedListIndex + 1 < 4
              ? managementViewModel.selectedListIndex + 1
              : 1;
          managementViewModel.editNewQuestion({
            level: currentLevel,
          });
          managementViewModel.setDialogMode("add");
          managementViewModel.toggleDialog();
        }}
      />
      <AddQuestionDialog />
    </Padding>
  );
});

export default ManagementScreen;

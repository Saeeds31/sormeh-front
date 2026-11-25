// app/composables/usePanelModal.js
export const usePanelModal = () => {
  const isAnyModalOpen = useState("panel_modal_open", () => false);

  const openModal = () => {
    isAnyModalOpen.value = true;
    document.body.style.overflow = "hidden"; // قفل اسکرول بدنه
  };

  const closeModal = () => {
    isAnyModalOpen.value = false;
    document.body.style.overflow = ""; // باز کردن اسکرول
  };

  return {
    isAnyModalOpen,
    openModal,
    closeModal,
  };
};

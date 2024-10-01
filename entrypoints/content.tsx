import { createRoot } from "react-dom/client";
import PromptModal from "../components/PromptModal";
import Icon from "./assets/message_icon.png";

// Define the content script for the extension, targeting LinkedIn pages.
export default defineContentScript({
  matches: ["https://*.linkedin.com/*"],
  main() {
    let modalVisible = false; // Track modal visibility state.

    // Function to display the AI icon in the message area.
    const displayAiIcon = () => {
      if (document.querySelector(".AI-Icon")) return;

      const img = document.createElement("img");
      img.src = Icon;
      img.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        cursor: pointer;
      `;
      img.className = "AI-Icon";

      const messageTextArea = document.querySelector(".msg-form__contenteditable");

      if (messageTextArea) {
        messageTextArea.appendChild(img);
        img.addEventListener("click", handleIconClick);
      } else {
        console.log("Message text area not found");
      }
    };

    // Function to handle icon clicks and show the modal.
    const handleIconClick = () => {
      modalVisible = true;
      injectReactModal();
    };

    // Function to inject the React modal into the DOM.
    const injectReactModal = () => {
      let modalContainer = document.querySelector("#react-modal-container");
      
      if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.id = "react-modal-container";
        document.body.appendChild(modalContainer);
      }

      const root = createRoot(modalContainer);
      root.render(
        <PromptModal
          modalVisible={modalVisible}
          handleCloseModal={closeReactModal}
          setModalVisible={(visible: boolean) => (modalVisible = visible)}
        />
      );
    };

    // Function to close the React modal and clean up the DOM.
    const closeReactModal = () => {
      const modalContainer = document.querySelector("#react-modal-container");
      if (modalContainer) {
        const root = createRoot(modalContainer);
        root.unmount();
        modalContainer.remove();
      }
    };

    // Function to remove the AI icon from the DOM.
    const removeAiIcon = () => {
      const img = document.querySelector(".AI-Icon");
      if (img) {
        img.remove();
      }
    };

    // Event listener to display the AI icon when the message area is focused.
    document.addEventListener("focusin", (event) => {
      if ((event.target as Element).matches(".msg-form__contenteditable")) {
        displayAiIcon();
      }
    });

    // Event listener to remove the AI icon when focus is lost.
    document.addEventListener("focusout", (event) => {
      const focusedElement = event.relatedTarget as Element;
      if (!focusedElement || !focusedElement.matches(".AI-Icon")) {
        removeAiIcon();
      }
    });
  },
});

import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import Input from "../entrypoints/assets/input.png";
import Reload from "../entrypoints/assets/reload.png";
import Generate from "../entrypoints/assets/Vector.png";

interface PromptModalProps {
  modalVisible: boolean,
  handleCloseModal: () => void,
  setModalVisible: (visible: boolean) => boolean
}

// Dummy text message to display as a reply.
const DUMMMY_TEXT_MESSAGE =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

const PromptModal: React.FC<PromptModalProps> = ({
  modalVisible,
  handleCloseModal,
  setModalVisible,
}: any) => {
  const [inputValue, setInputValue] = useState("");
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");

  // Function to handle the generation of the prompt
  const handleGenerateClick = () => {
    if (inputValue) {
      setGenerated(true);
      setPrompt(inputValue);
      setInputValue("");
    }
  };

  // Function to handle the insertion of the generated message into the text area
  const handleInsertClick = () => {
    setModalVisible(false);
    const replyText: string = DUMMMY_TEXT_MESSAGE;

    const messageElement: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    );

    // If the message element is found, insert the reply text
    if (messageElement) {
      const paragraph: HTMLParagraphElement = document.createElement("p");
      paragraph.textContent = replyText;
      messageElement.textContent = "";
      messageElement.appendChild(paragraph);

      // Update the placeholder label if it exists
      const label: HTMLElement | null = document.querySelector(
        ".msg-form__placeholder"
      );
      if (label) {
        label.removeAttribute("data-placeholder");
      }
      
      // Enable the send button if it exists
      const sendButton: HTMLElement | null = document.querySelector(
        ".msg-form__send-button"
      );
      sendButton?.removeAttribute("disabled");
    }
    handleCloseModal(); // Call the function to close the modal
  };

  return (
    <>
      <div
        className={`w-[570px] max-md:w-[400px] max-sm:w-[300px] modal flex flex-col bg-[#F9FAFB] p-6 rounded-lg shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${
          modalVisible ? "block" : "hidden"
        }`}
      >
        {/* Display the generated prompt and dummy reply message if generated */}
        {generated && (
          <div className="flex flex-col w-full py-4 gap-y-4">
            <div className="bg-[#DFE1E7] p-3 rounded-lg self-end">
              <p className="text-[#666D80] text-[15px]">{prompt}</p>
            </div>
            <div className="flex bg-[#DBEAFE] rounded-lg p-3 max-w-[300px]">
              <p className="text-[#666D80] text-[15px]">
                {DUMMMY_TEXT_MESSAGE}
              </p>
            </div>
          </div>
        )}

        <div className="mb-4 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-[#666D80] text-[15px] p-3 w-full border border-[#C1C7D0] rounded-lg"
            placeholder="Your prompt" 
          />
        </div>

        <div className="flex justify-end items-center">
          {!generated ? ( // Show generate button if not generated
            <ButtonComponent
              label="Generate"
              action={handleGenerateClick}
              image={Generate}
              buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] items-center text-white rounded-lg gap-2"
              ImgClass="h-[18px] w-[14px] pt-1"
              textStyles="text-white"
            />
          ) : ( // Show insert and regenerate buttons if generated
            <div className="flex gap-x-2">
              <ButtonComponent
                label="Insert"
                action={handleInsertClick} // Handle click to insert reply text
                image={Input}
                buttonClass="px-4 py-2 text-[15px] bg-white text-[#666D80] rounded-lg gap-2 border border-[#C1C7D0] border-solid"
                ImgClass="w-[11px] pt-2"
                textStyles="text-[#666D80]"
              />
              <ButtonComponent
                label="Regenerate"
                action={() => {}}
                image={Reload}
                buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] text-white rounded-lg gap-2"
                ImgClass="h-[19px] w-[13px] pt-1"
                textStyles="text-white"
              />
            </div>
          )}
        </div>
      </div>

      {modalVisible && ( // Overlay to close modal when clicked outside
        <div
          onClick={handleCloseModal}
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-10"
        />
      )}
    </>
  );
};

export default PromptModal;

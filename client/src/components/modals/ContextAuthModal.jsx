const ContextAuthModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsConsentGiven,
  isModerator,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Context-Based Authentication
            </h2>
            {isModerator ? (
              <p className="mb-6 text-gray-600">
                This feature is not available for moderators.
              </p>
            ) : (
              <p className="mb-6 text-gray-600">
                To enhance account security, enable context-based authentication. We'll use device and location data (location, device, browser, and IP) for identity verification when you log in from new places/devices, encrypted and confidential. Note: Disable "Do Not Track" in your browser settings to enable this feature. Interested?
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsConsentGiven(false);
                  handleCloseModal();
                }}
                className="text-gray-500 mr-4 hover:text-gray-900 focus:outline-none hover:underline"
              >
                {isModerator ? "Close" : "No, thanks"}
              </button>
              <button
                onClick={() => {
                  setIsConsentGiven(true);
                  handleCloseModal();
                }}
                className={`${isModerator
                    ? "hidden"
                    : "bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                  } text-white px-4 py-2 rounded-md`}
              >
                Yes, enable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContextAuthModal;

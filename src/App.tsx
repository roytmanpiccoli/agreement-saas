import React, { useState } from 'react';
import DocumentForm from './components/DocumentForm';
import DocumentPreview from './components/DocumentPreview';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [documentData, setDocumentData] = useState(null);

  const handleFormSubmit = (data) => {
    setDocumentData(data);
  };

  const handleBack = () => {
    setDocumentData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {documentData ? (
        <DocumentPreview documentData={documentData} onBack={handleBack} />
      ) : (
        <DocumentForm
          onSubmit={handleFormSubmit}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
}

export default App;
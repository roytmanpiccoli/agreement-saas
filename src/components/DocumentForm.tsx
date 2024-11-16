import React from 'react';
import { useForm } from 'react-hook-form';
import { ChevronRight, ChevronLeft, FileText } from 'lucide-react';

type FormData = {
  documentType: string;
  partyName: string;
  partyAddress: string;
  counterpartyName: string;
  counterpartyAddress: string;
  effectiveDate: string;
  jurisdiction: string;
  specialClauses: string;
};

interface DocumentFormProps {
  onSubmit: (data: FormData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function DocumentForm({ onSubmit, currentStep, setCurrentStep }: DocumentFormProps) {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const documentType = watch('documentType');

  const steps = [
    {
      title: 'Document Type',
      fields: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Select Document Type</span>
            <select
              {...register('documentType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a document type...</option>
              <option value="nda">Non-Disclosure Agreement (NDA)</option>
              <option value="serviceAgreement">Service Agreement</option>
              <option value="employmentContract">Employment Contract</option>
            </select>
          </label>
        </div>
      ),
    },
    {
      title: 'Party Information',
      fields: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Your Name/Company Name</span>
            <input
              type="text"
              {...register('partyName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Your Address</span>
            <textarea
              {...register('partyAddress')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
      ),
    },
    {
      title: 'Counterparty Information',
      fields: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Counterparty Name</span>
            <input
              type="text"
              {...register('counterpartyName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Counterparty Address</span>
            <textarea
              {...register('counterpartyAddress')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
      ),
    },
    {
      title: 'Agreement Details',
      fields: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Effective Date</span>
            <input
              type="date"
              {...register('effectiveDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Jurisdiction</span>
            <input
              type="text"
              {...register('jurisdiction')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., California, United States"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Special Clauses or Requirements</span>
            <textarea
              {...register('specialClauses')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter any special terms or conditions..."
            />
          </label>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 ml-2">Legal Document Generator</h2>
        </div>
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex-1 ${
                index !== steps.length - 1 ? 'border-b-2' : ''
              } ${
                index < currentStep
                  ? 'border-blue-600'
                  : index === currentStep
                  ? 'border-blue-400'
                  : 'border-gray-200'
              }`}
            >
              <div
                className={`text-xs text-center mb-2 ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {steps[currentStep].fields}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate Document
              <FileText className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
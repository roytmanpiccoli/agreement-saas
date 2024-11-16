import React from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface DocumentPreviewProps {
  documentData: {
    documentType: string;
    partyName: string;
    partyAddress: string;
    counterpartyName: string;
    counterpartyAddress: string;
    effectiveDate: string;
    jurisdiction: string;
    specialClauses: string;
  };
  onBack: () => void;
}

export default function DocumentPreview({ documentData, onBack }: DocumentPreviewProps) {
  const downloadPDF = () => {
    const element = document.getElementById('document-preview');
    const opt = {
      margin: 1,
      filename: `${documentData.documentType.replace(/\s+/g, '-').toLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
          >
            Back to Editor
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div id="document-preview" className="p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase mb-2">
            {documentData.documentType === 'nda' && 'Non-Disclosure Agreement'}
            {documentData.documentType === 'serviceAgreement' && 'Service Agreement'}
            {documentData.documentType === 'employmentContract' && 'Employment Contract'}
          </h1>
          <p className="text-gray-600">Made and entered into on {formatDate(documentData.effectiveDate)}</p>
        </div>

        <div className="space-y-4">
          <p className="font-bold">This Agreement is made between:</p>
          <p>
            <span className="font-semibold">{documentData.partyName}</span>, located at{' '}
            {documentData.partyAddress} (hereinafter referred to as the "First Party")
          </p>
          <p>and</p>
          <p>
            <span className="font-semibold">{documentData.counterpartyName}</span>, located at{' '}
            {documentData.counterpartyAddress} (hereinafter referred to as the "Second Party")
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">1. JURISDICTION</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of{' '}
            {documentData.jurisdiction}.
          </p>

          {documentData.documentType === 'nda' && (
            <>
              <h2 className="text-xl font-bold">2. CONFIDENTIALITY</h2>
              <p>
                Both parties agree to maintain the confidentiality of any proprietary information
                shared during the course of this agreement. This includes but is not limited to trade
                secrets, business plans, customer data, and technical information.
              </p>
            </>
          )}

          {documentData.documentType === 'serviceAgreement' && (
            <>
              <h2 className="text-xl font-bold">2. SERVICES</h2>
              <p>
                The First Party agrees to provide services as outlined in the scope of work, meeting
                all quality standards and deadlines as mutually agreed upon by both parties.
              </p>
            </>
          )}

          {documentData.documentType === 'employmentContract' && (
            <>
              <h2 className="text-xl font-bold">2. EMPLOYMENT TERMS</h2>
              <p>
                The First Party agrees to employ the Second Party under the terms and conditions
                outlined in this agreement, including responsibilities, compensation, and benefits.
              </p>
            </>
          )}

          <h2 className="text-xl font-bold">3. SPECIAL PROVISIONS</h2>
          <p>{documentData.specialClauses || 'No special provisions specified.'}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-bold mb-4">First Party:</p>
              <p>{documentData.partyName}</p>
              <div className="mt-8 border-t border-gray-400 w-48">
                <p className="text-sm text-gray-600 mt-1">Signature</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-4">Second Party:</p>
              <p>{documentData.counterpartyName}</p>
              <div className="mt-8 border-t border-gray-400 w-48">
                <p className="text-sm text-gray-600 mt-1">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import AboutDocumentUpload from './AboutDocumentUpload';
import DocumentType from './DocumentType';
import DocumentPictures from './DocumentPictures';
import DocumentData from './DocumentData';

export default function DocumentUpload() {
  const [activeTabId, setactiveTabId] = useState(0);
  const activeTab = [
    <AboutDocumentUpload activeTabChange={setactiveTabId} />,
    <DocumentType activeTabChange={setactiveTabId} />,
    <DocumentPictures activeTabChange={setactiveTabId} />,
    <DocumentData activeTabChange={setactiveTabId} />,
  ];

  return (
    <div>
      <button
        className="custom-btn add-btn"
        data-toggle="modal"
        data-target="#document-upload"
        type="button"
      >
        <i className="fas fa-plus" />
        <span>Add New</span>
      </button>

      <div
        className="modal fade"
        id="document-upload"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="tab-content" id="myTabContent">
              {activeTab[activeTabId]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

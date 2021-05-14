import React, { useState } from 'react';
import AboutDocumentUpload from './AboutDocumentUpload';
import DocumentType from './DocumentType';
import DocumentPictures from './DocumentPictures';
import DocumentData from './DocumentData';

export default function EditDocument() {
  const [activeTabId, setactiveTabId] = useState(2);
  const activeTab = [
    <AboutDocumentUpload activeTabChange={setactiveTabId} />,
    <DocumentType activeTabChange={setactiveTabId} />,
    <DocumentPictures activeTabChange={setactiveTabId} />,
    <DocumentData activeTabChange={setactiveTabId} />,
  ];

  return (
    <div>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
        data-toggle="modal"
        data-target="#editdocument-upload"
        type="button"
      >
        <i class="fas fa-edit" />
      </button>

      <div
        className="modal modal-backdrop fade in"
        id="editdocument-upload"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
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
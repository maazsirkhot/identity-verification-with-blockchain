import React from 'react';
import { useState } from 'react';
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
        class="custom-btn add-btn"
        data-toggle="modal"
        data-target="#document-upload"
      >
        <i class="fas fa-plus"></i> <span>Add New</span>
      </button>

      <div
        class="modal fade"
        id="document-upload"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="tab-content" id="myTabContent">
              {activeTab[activeTabId]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

import DocumentPictures from './DocumentPictures';
import DocumentData from './DocumentData';

export default function EditDocument() {
  const [activeTabId, setactiveTabId] = useState(0);
  const activeTab = [
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
        className="modal modal-backdrop fade in"
        id="document-upload"
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

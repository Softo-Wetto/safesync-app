import React from 'react';
import './ConfirmationModal.css'; // Add your own styles

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Confirm Action</h4>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
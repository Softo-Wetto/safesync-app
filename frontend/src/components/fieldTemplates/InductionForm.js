import React from 'react';

const InductionForm = ({ formData, handleInputChange }) => {
    return (
        <>
            <div className="mb-3">
                <label className="form-label">Trainer Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="trainerName"
                    value={formData.trainerName || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Training Date</label>
                <input
                    type="date"
                    className="form-control"
                    name="trainingDate"
                    value={formData.trainingDate || ''}
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
};

export default InductionForm;

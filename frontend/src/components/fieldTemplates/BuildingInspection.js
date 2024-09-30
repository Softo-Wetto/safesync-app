// InductionFields.js
import React from 'react';

const BuildingInspection = ({ formData, handleInputChange }) => {
    return (
        <div>
            <h4>Building Inspection</h4>
            <div className="mb-3">
                <label className="form-label">Induction Trainer</label>
                <input
                    type="text"
                    name="inductionTrainer"
                    className="form-control"
                    value={formData.inductionTrainer || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Training Date</label>
                <input
                    type="date"
                    name="trainingDate"
                    className="form-control"
                    value={formData.trainingDate || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    type="text"
                    name="trainingLocation"
                    className="form-control"
                    value={formData.trainingLocation || ''}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default BuildingInspection;

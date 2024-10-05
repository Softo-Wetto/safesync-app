import React from 'react';

const TrainingInduction = ({ formData, handleInputChange }) => {
    return (
        <div>
            <h4>Training Induction</h4>
            <div className="mb-3">
                <label className="form-label">Trainer Name</label>
                <input
                    type="text"
                    name="trainerName"
                    className="form-control"
                    value={formData.trainerName || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Induction Date</label>
                <input
                    type="date"
                    name="inductionDate"
                    className="form-control"
                    value={formData.inductionDate || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default TrainingInduction;

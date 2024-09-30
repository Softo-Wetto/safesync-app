// InductionFields.js
import React from 'react';

const ConstructionInspection = ({ formData, handleInputChange }) => {
    return (
        <div>
            <h4>Weekly Construction Inspection</h4>
            <div className="mb-3">
                <label className="form-label">Inspection Date</label>
                <input
                    type="date"
                    className="form-control"
                    name="inspectionDate"
                    value={formData.inspectionDate || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Inspector Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="inspectorName"
                    value={formData.inspectorName || ''}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default ConstructionInspection;

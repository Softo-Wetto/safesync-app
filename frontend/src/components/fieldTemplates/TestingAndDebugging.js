import React from 'react';

const TestingAndDebugging = ({ formData, handleInputChange }) => {
    return (
        <div>
            <h4>Testing and Debugging</h4>
            <div className="mb-3">
                <label className="form-label">Test Case Name</label>
                <input
                    type="text"
                    name="testCaseName"
                    className="form-control"
                    value={formData.testCaseName || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Test Start Date</label>
                <input
                    type="date"
                    name="testStartDate"
                    className="form-control"
                    value={formData.testStartDate || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Expected Outcome</label>
                <textarea
                    name="expectedOutcome"
                    className="form-control"
                    value={formData.expectedOutcome || ''}
                    onChange={handleInputChange}
                    rows="4"
                />
            </div>
        </div>
    );
};

export default TestingAndDebugging;

import React from 'react';

const TestingAndDebugging = ({ formData, handleInputChange, isEditable }) => {
    return (
        <div>
            <h4>Testing and Debugging</h4>
            
            <div className="mb-3">
                <label className="form-label">1. Test Case Name</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="testCaseName"
                        className="form-control"
                        value={formData.testCaseName || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.testCaseName || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">2. Test Start Date</label>
                {isEditable ? (
                    <input
                        type="date"
                        name="testStartDate"
                        className="form-control"
                        value={formData.testStartDate || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.testStartDate || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">3. Expected Outcome</label>
                {isEditable ? (
                    <textarea
                        name="expectedOutcome"
                        className="form-control"
                        value={formData.expectedOutcome || ''}
                        onChange={handleInputChange}
                        rows="4"
                    />
                ) : (
                    <p>{formData.expectedOutcome || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">4. Actual Outcome</label>
                {isEditable ? (
                    <textarea
                        name="actualOutcome"
                        className="form-control"
                        value={formData.actualOutcome || ''}
                        onChange={handleInputChange}
                        rows="4"
                    />
                ) : (
                    <p>{formData.actualOutcome || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">5. Tested By</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="testedBy"
                        className="form-control"
                        value={formData.testedBy || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.testedBy || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">6. Test Status</label>
                {isEditable ? (
                    <select
                        name="testStatus"
                        className="form-control"
                        value={formData.testStatus || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                ) : (
                    <p>{formData.testStatus || 'N/A'}</p>
                )}
            </div>
        </div>
    );
};

export default TestingAndDebugging;

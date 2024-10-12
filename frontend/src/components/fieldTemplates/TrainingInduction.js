import React from 'react';

const TrainingInduction = ({ formData, handleInputChange, isEditable }) => {
    return (
        <div>
            <h4>Training Induction</h4>

            <div className="mb-3">
                <label className="form-label">1. Trainer Name</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="trainerName"
                        className="form-control"
                        value={formData.trainerName || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.trainerName || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">2. Induction Date</label>
                {isEditable ? (
                    <input
                        type="date"
                        name="inductionDate"
                        className="form-control"
                        value={formData.inductionDate || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.inductionDate || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">3. Location</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.location || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">4. Topics Covered</label>
                {isEditable ? (
                    <textarea
                        name="topicsCovered"
                        className="form-control"
                        value={formData.topicsCovered || ''}
                        onChange={handleInputChange}
                        rows="4"
                    />
                ) : (
                    <p>{formData.topicsCovered || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">5. Participants</label>
                {isEditable ? (
                    <textarea
                        name="participants"
                        className="form-control"
                        value={formData.participants || ''}
                        onChange={handleInputChange}
                        rows="4"
                    />
                ) : (
                    <p>{formData.participants || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">6. Feedback Collected</label>
                {isEditable ? (
                    <select
                        name="feedbackCollected"
                        className="form-control"
                        value={formData.feedbackCollected || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                ) : (
                    <p>{formData.feedbackCollected || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">7. Follow-up Required</label>
                {isEditable ? (
                    <select
                        name="followUpRequired"
                        className="form-control"
                        value={formData.followUpRequired || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                ) : (
                    <p>{formData.followUpRequired || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">8. Trainer Signature</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="trainerSignature"
                        className="form-control"
                        placeholder="Signature"
                        value={formData.trainerSignature || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.trainerSignature || 'N/A'}</p>
                )}
            </div>
        </div>
    );
};

export default TrainingInduction;
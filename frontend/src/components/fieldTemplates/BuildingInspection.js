// BuildingInspection.js
import React, { useState } from 'react';
import './accordian.css';

const BuildingInspection = ({ formData, handleInputChange, newImages, handleImageChange, handleImageRemove = [], isEditable }) => {

    const [openSection, setOpenSection] = useState(null); 

    // Toggle the section open/close
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const renderInspectionItems = (items, formData = {}, isEditable) => {
        return items.map(item => (
            <div key={item.name} className="mb-3">
                <label className="form-label">{item.label}</label>
                {isEditable ? (
                    <>
                        <select
                            name={item.name}
                            className="form-control"
                            value={formData[item.name] || ''}  // Safeguard against undefined
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="">Select Outcome</option>
                            <option value="C">Compliance</option>
                            <option value="NC">Non-Compliance</option>
                            <option value="N/A">Not Applicable</option>
                            <option value="U/V">Unable to Verify</option>
                        </select>
                        <input
                            type="text"
                            name={`${item.name}Comment`}
                            className="form-control mt-2"
                            placeholder="Add Comment"
                            value={formData[`${item.name}Comment`] || ''}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </>
                ) : (
                    <>
                        <p><strong>Outcome:</strong> {formData[item.name] || 'N/A'}</p>
                        <p><strong>Comment:</strong> {formData[`${item.name}Comment`] || 'N/A'}</p>
                    </>
                )}
            </div>
        ));
    };
    

    return (
        <div>
            <h4>Building Inspection</h4>
            
            <div className="mb-3">
                <label className="form-label">Inspection Conducted By:</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="inspector"
                        className="form-control"
                        value={formData.inspector || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.inspector || 'N/A'}</p>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Date:</label>
                {isEditable ? (
                    <input
                        type="date"
                        name="inspectionDate"
                        className="form-control"
                        value={formData.inspectionDate || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{formData.inspectionDate ? new Date(formData.inspectionDate).toLocaleDateString() : 'N/A'}</p>
                )}
            </div>

            <h5>Outcome Legend</h5>
            <p>C – Compliance, NC – Non-Compliance, N/A – Not Applicable, U/V – Unable to Verify (requires further investigation).</p>

            {/* Collapsible Sections */}
            <div className="accordion-section">

                <div className="accordion-header" onClick={() => toggleSection('mainCriteria')}>
                    <h5>Main Building Inspection Criteria {openSection === 'mainCriteria' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'mainCriteria' && (
                    <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'accessWaysClear', label: '1. Access ways & exits clear and no trip/slip hazards?' },
                        { name: 'stairsInGoodOrder', label: '2. Are stairs, handrails & steps in good order?' },
                        { name: 'liftServiced', label: '3. Has the lift been serviced and in good working order?' },
                        { name: 'floorsInGoodCondition', label: '4. Are floors and carpets in good condition and free of trip or slip hazards?' },
                        { name: 'lightingWorking', label: '5. Is lighting on all levels and areas working and good visibility?' },
                        { name: 'itemsStoredSafely', label: '6. Are items stored safely and out of the way where people need to enter suites and other areas?' },
                        { name: 'buildingInGoodCondition', label: '7. Is the building & suites in good condition (e.g. walls, floors, ceiling, windows)?' },
                        { name: 'kitchenClean', label: '8. Kitchen and other common areas clean and maintained?' },
                        { name: 'courtyardClean', label: '9. Is courtyard clean and free of waste and trip or bump hazards?' },
                        { name: 'windowsSecured', label: '10. Are windows secured from being opened out where a person could get out?' },
                        { name: 'noHangingRopes', label: '11. No hanging ropes or strings from windows?' },
                        { name: 'wasteDisposed', label: '12. Are waste materials disposed of inside and outside?' }
                    ], formData, isEditable)} {/* Correctly pass `isEditable` */}
                </div>
                )}

                {/* Amenities Section */}
                <div className="accordion-header" onClick={() => toggleSection('amenities')}>
                    <h5>Amenities {openSection === 'amenities' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'amenities' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'amenitiesClean', label: '13. Maintained in clean, tidy, serviceable condition?' },
                            { name: 'floorsDryAndClear', label: '14. Floors dry and clear of waste/materials?' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Emergencies / Incidents Section */}
                <div className="accordion-header" onClick={() => toggleSection('emergenciesIncidents')}>
                    <h5>Emergencies / Incidents {openSection === 'emergenciesIncidents' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'emergenciesIncidents' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'fireExtinguishersCharged', label: '15. Fire extinguishers charged and tested every 6 months?' },
                            { name: 'fireAlarmsWorking', label: '16. Fire & smoke alarms tested 6 monthly and working?' },
                            { name: 'securityAlarmsWorking', label: '17. Security alarms working & tested?' },
                            { name: 'evacuationEquipment', label: '18. Equipment on site as per Evacuation Diagram?' },
                            { name: 'firstAidStocked', label: '19. First Aid supplied and stocked?' },
                            { name: 'personnelTrained', label: '20. Have personnel been trained in emergency procedures and fire extinguishers?' },
                            { name: 'qualifiedFirstAider', label: '21. Is there a qualified First Aider/s?' },
                            { name: 'incidentsRecorded', label: '22. Have there been any incidents and if so, are these recorded and actions taken?' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Ceiling & Roof Areas Section */}
                <div className="accordion-header" onClick={() => toggleSection('ceilingRoof')}>
                    <h5>Ceiling & Roof Areas {openSection === 'ceilingRoof' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'ceilingRoof' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'accessLadderCondition', label: '23. Access ladder in good condition?' },
                            { name: 'edgeProtectionCondition', label: '24. Edge protection in good condition around opening?' },
                            { name: 'roofAccessClosed', label: '25. Access to roof closed off?' },
                            { name: 'noMaterialsNearHatch', label: '26. No materials near hatch or ladder access?' },
                            { name: 'accessPathsClear', label: '27. Access paths along ceiling walkways clear of obstacles?' },
                            { name: 'noWasteInCeiling', label: '28. No excess or waste material inside ceiling spaces?' },
                            { name: 'ceilingLightingWorking', label: '29. Lighting in working order?' },
                            { name: 'coversOffWalkway', label: '30. Covers/boards over ceiling tiles off the walkway to contain anyone tripping/falling off walkway?' },
                            { name: 'noFlammableLiquids', label: '31. No flammable liquids?' },
                            { name: 'noDefectiveRoofEquipment', label: '32. No defective equipment or ceiling/roof members e.g. trusses, roofing etc?' },
                            { name: 'roofInspected', label: '33. Has roof condition been inspected by qualified contractor?' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Ladders Section */}
                <div className="accordion-header" onClick={() => toggleSection('ladders')}>
                    <h5>Ladders {openSection === 'ladders' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'ladders' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'ladderThreePointsContact', label: '34. 3 points of contact at all times if in use?' },
                            { name: 'ladderSecured', label: '35. Secured top or bottom, or footed?' },
                            { name: 'ladderRated120kg', label: '36. Industrial rated =>120kg?' },
                            { name: 'ladderCorrectAngle', label: '37. Set up at correct angle & extends 1m above landing?' },
                            { name: 'ladderGoodCondition', label: '38. Ladders in good condition?' },
                            { name: 'ladderStoredSecurely', label: '39. Ladders stored and secured against sliding/falling?' }
                        ], formData, isEditable)}
                    </div>
                )}

            {/* Electrical Section */}
            <div className="accordion-header" onClick={() => toggleSection('electrical')}>
                <h5>Electrical {openSection === 'electrical' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'electrical' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'leadsTested', label: '40. All leads and tools tested and tagged every 12 months in workshop?' },
                        { name: 'leadsGoodCondition', label: '41. Leads and tools in good condition?' },
                        { name: 'electricalWiringGood', label: '42. Electrical wiring in Suites is in good condition and free from damage?' },
                        { name: 'switchboardLocked', label: '43. Main switchboards boards locked from public access?' },
                        { name: 'rcdPushButtonTested', label: '44. Switchboard RCDs pushbutton tested 6 monthly?' },
                        { name: 'switchboardGoodCondition', label: '45. Switchboards – general condition is good and tested every 2 years by electrician?' },
                        { name: 'electricalRegisterUpdated', label: '46. Electrical register is up to date?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Plant & Equipment Section */}
            <div className="accordion-header" onClick={() => toggleSection('plantEquipment')}>
                <h5>Plant & Equipment {openSection === 'plantEquipment' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'plantEquipment' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'plantServiced', label: '47. Plant and Equipment in general tested, serviced, inspected as per manufacturer?' },
                        { name: 'plantGoodCondition', label: '48. In good and safe condition?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Manual Tasks Section */}
            <div className="accordion-header" onClick={() => toggleSection('manualTasks')}>
                <h5>Manual Tasks {openSection === 'manualTasks' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'manualTasks' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'controlsImplemented', label: '49. Appropriate controls implemented?' },
                        { name: 'workersSafePosture', label: '50. Workers not subject to forceful exertions/ awkward working posture etc.?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Hazardous Chemicals Section */}
            <div className="accordion-header" onClick={() => toggleSection('hazardousChemicals')}>
                <h5>Hazardous Chemicals {openSection === 'hazardousChemicals' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'hazardousChemicals' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'sdsAvailable', label: '51. SDS available and in register?' },
                        { name: 'chemicalsBunded', label: '52. Chemicals in bunded containment e.g. tubs etc?' },
                        { name: 'chemicalsAwayFromHeat', label: '53. Chemicals stored away from heat sources?' },
                        { name: 'noLeakingContainers', label: '54. No leaks or defective containers?' },
                        { name: 'containersLabeled', label: '55. All containers have identifiable labels?' },
                        { name: 'handlingAccordingToSDS', label: '56. Handling and use in accordance with SDS?' },
                        { name: 'spillContainment', label: '57. Spill containment on site?' },
                        { name: 'fireExtinguisherAvailable', label: '58. Fire extinguisher available?' },
                        { name: 'chemicalSignage', label: '59. Hazardous chemical signage in storage areas?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Outside Areas Section */}
            <div className="accordion-header" onClick={() => toggleSection('outsideAreas')}>
                <h5>Outside Areas {openSection === 'outsideAreas' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'outsideAreas' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'buildingOutsideGoodCondition', label: '60. Is the building outside in good condition?' },
                        { name: 'externalLightsWorking', label: '61. External lights in working order?' },
                        { name: 'securityCamerasGoodCondition', label: '62. Are security cameras in good condition?' },
                        { name: 'airConditionersSecure', label: '63. External air conditioners secure/ in good condition?' },
                        { name: 'carportGoodCondition', label: '64. Is carport in good condition?' },
                        { name: 'groundFreeOfTripHazards', label: '65. Ground conditions free of trip hazards e.g. potholes?' },
                        { name: 'noExcessWaste', label: '66. No excess/ waste materials?' },
                        { name: 'accessClear', label: '67. Access around stair, carport and other areas clear?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Behavioural Section */}
            <div className="accordion-header" onClick={() => toggleSection('behavioural')}>
                <h5>Behavioural (e.g. Contractors and Others) {openSection === 'behavioural' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'behavioural' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'safetyRulesAdhered', label: '68. Safety rules adhered to?' },
                        { name: 'workplaceHarassment', label: '69. Are there any issues observed relating to work-related harassment, bullying, or violence?' },
                        { name: 'psychosocialHazards', label: '70. Are there any other matters relating to psychosocial hazards identified or raised?' },
                        { name: 'formalComplaints', label: '71. Have there been any formal or informal complaints made that need to be addressed?' },
                        { name: 'policiesDisplayed', label: '72. Are the harassment, bullying, and violence policies displayed?' },
                        { name: 'complaintsProcedureDisplayed', label: '73. Are the issue resolution and complaints procedures displayed?' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Other Hazards Section */}
            <div className="accordion-header" onClick={() => toggleSection('otherHazards')}>
                <h5>Other Hazards {openSection === 'otherHazards' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'otherHazards' && (
                <div className="accordion-content">
                    {renderInspectionItems([
                        { name: 'otherHazard1', label: '74. Any other hazards and risks (to be added):' },
                        { name: 'otherHazard2', label: '75. ' },
                        { name: 'otherHazard3', label: '76. ' },
                        { name: 'otherHazard4', label: '77. ' },
                        { name: 'otherHazard5', label: '78. ' },
                        { name: 'otherHazard6', label: '79. ' }
                    ], formData, isEditable)}
                </div>
            )}

            {/* Collapsible Section for Images */}
                <div className="accordion-header" onClick={() => toggleSection('images')}>
                    <h5>Images {openSection === 'images' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'images' && (
                    <div className="accordion-content">
                        {/* Display Uploaded Images */}
                        {formData.images && formData.images.length > 0 ? (
                            <div className="mb-3">
                                <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="preview-image" style={{ margin: '5px' }}>
                                            <img
                                                src={`http://localhost:5000/uploads/${image}`}
                                                alt={`Uploaded ${index + 1}`}
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                            {isEditable && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageRemove(image)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No uploaded images available.</p>
                        )}

                        {/* Upload New Images (if editable) */}
                        {isEditable && (
                            <div className="mb-3">
                                <h5 className="form-label">Upload New Images</h5>
                                <p>To select multiple images, put them in the same folder and drag and upload.</p>
                                <input
                                    type="file"
                                    name="inspectionImages"
                                    className="form-control"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                                {/* Display New Image Previews */}
                                {newImages && newImages.length > 0 && (
                                    <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {newImages.map((image, index) => (
                                            <div key={index} className="preview-image" style={{ margin: '5px' }}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Collapsible Section for Corrective Actions */}
                <div className="accordion-header" onClick={() => toggleSection('correctiveActions')}>
                    <h5>Corrective Actions {openSection === 'correctiveActions' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'correctiveActions' && (
                    <div className="accordion-content">
                        <div className="mb-3">
                            <label className="form-label">Actions Required</label>
                            {isEditable ? (
                                <textarea
                                    name="correctiveActionsRequired"
                                    className="form-control"
                                    value={formData.correctiveActionsRequired || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.correctiveActionsRequired || 'N/A'}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Actions by Whom</label>
                            {isEditable ? (
                                <input
                                    type="text"
                                    name="actionsByWhom"
                                    className="form-control"
                                    value={formData.actionsByWhom || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.actionsByWhom || 'N/A'}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Priority</label>
                            {isEditable ? (
                                <select
                                    name="correctiveActionPriority"
                                    className="form-control"
                                    value={formData.correctiveActionPriority || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="Priority A">Priority A – NO WORK/ ACCESS till fixed</option>
                                    <option value="Priority B">Priority B – Action IMMEDIATELY</option>
                                    <option value="Priority C">Priority C – Item to be attended to within 24 HOURS</option>
                                    <option value="Priority D">Priority D – Rectified within NOMINATED TIME</option>
                                    <option value="R">R – Issue rectified in inspection</option>
                                    <option value="N/A">N/A – Not Applicable</option>
                                </select>
                            ) : (
                                <p>{formData.correctiveActionPriority || 'N/A'}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            {isEditable ? (
                                <select
                                    name="correctiveActionStatus"
                                    className="form-control"
                                    value={formData.correctiveActionStatus || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            ) : (
                                <p>{formData.correctiveActionStatus || 'N/A'}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Signed & Dated When Done</label>
                            {isEditable ? (
                                <input
                                    type="text"
                                    name="signedAndDated"
                                    className="form-control"
                                    placeholder="Name & Date"
                                    value={formData.signedAndDated || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.signedAndDated || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Collapsible Section for Sign-off */}
                <div className="accordion-header" onClick={() => toggleSection('signOff')}>
                    <h5>Sign-off {openSection === 'signOff' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'signOff' && (
                    <div className="accordion-content">
                        <div className="mb-3">
                            <label className="form-label">Building or Maintenance Manager Name</label>
                            {isEditable ? (
                                <input
                                    type="text"
                                    name="managerName"
                                    className="form-control"
                                    value={formData.managerName || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.managerName || 'N/A'}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Signature</label>
                            {isEditable ? (
                                <input
                                    type="text"
                                    name="managerSignature"
                                    className="form-control"
                                    placeholder="Signature"
                                    value={formData.managerSignature || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.managerSignature || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuildingInspection;

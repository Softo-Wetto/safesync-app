// ConstructionInspection.js
import React, { useState } from 'react';
import './accordian.css';

const ConstructionInspection = ({ formData, handleInputChange, newImages, handleImageChange, handleImageRemove = [], isEditable }) => {

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
                            value={formData[`${item.name}Comment`] || ''}  // Safeguard against undefined
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
            <h4>Weekly Construction Inspection</h4>

            <div className="mb-3">
                <label className="form-label">Project Name:</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="constructionProjectName"
                        className="form-control"
                        value={formData.constructionProjectName || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                <p>{formData.constructionProjectName || 'N/A'}</p>
            )}
            </div>

            <div className="mb-3">
                <label className="form-label">Inspection Conducted By:</label>
                {isEditable ? (
                    <input
                        type="text"
                        name="constructionInspector"
                        className="form-control"
                        value={formData.constructionInspector || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                <p>{formData.constructionInspector || 'N/A'}</p>
            )}
            </div>

            <div className="mb-3">
                <label className="form-label">Date:</label>
                {isEditable ? (
                    <input
                        type="date"
                        name="constructionInspectionDate"
                        className="form-control"
                        value={formData.constructionInspectionDate || ''}
                        onChange={handleInputChange}
                    />
                ) : (
                <p>{formData.constructionInspectionDate || 'N/A'}</p>
            )}
            </div>

            <h5>Outcome Legend</h5>
            <p>C – Compliance, NC – Non-Compliance, N/A – Not Applicable, U/V – Unable to Verify (requires further investigation).</p>

            {/* Main Environment */}
            <div className="accordion-section">
                <div className="accordion-header" onClick={() => toggleSection('mainEnvironment')}>
                    <h5>Main Environment {openSection === 'mainEnvironment' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'mainEnvironment' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'accessClearAdequate', label: '1. Access, (Clear and adequate width)' },
                            { name: 'safetySignsDisplayed', label: '2. Safety signs displayed' },
                            { name: 'wasteStorageInPlace', label: '3. Waste storage and removal in place' },
                            { name: 'materialStorageSecure', label: '4. Material storage secure and doesn’t restrict access' },
                            { name: 'materialsInGoodCondition', label: '5. Materials in good condition' },
                            { name: 'dustControlled', label: '6. Dust controlled' },
                            { name: 'lightingProvided', label: '7. Lighting provided in all areas such as stairwells and access' },
                            { name: 'trafficControlPlans', label: '8. Traffic control plans in place and followed' },
                            { name: 'roadFootpathPermits', label: '9. Road & footpath closures / permits in place (where required)' },
                            { name: 'protrudingObjectsControlled', label: '10. Protruding objects controlled (e.g. starter bars)' },
                            { name: 'penetrationsControlled', label: '11. Penetrations controlled and secured in place' }
                        ], formData, isEditable)}
                    </div>
                )}
            </div>

            {/* Amenities */}
            <div className="accordion-section">
                <div className="accordion-header" onClick={() => toggleSection('amenities')}>
                    <h5>Amenities {openSection === 'amenities' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'amenities' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'amenitiesCleanCondition', label: '12. Maintained in clean, tidy, serviceable condition' },
                            { name: 'firstAidAdequate', label: '13. First Aid supplied adequate for numbers' }
                        ], formData, isEditable)}
                    </div>
                )}
            </div>

            {/* Scaffold/Formwork */}
                <div className="accordion-header" onClick={() => toggleSection('scaffoldFormwork')}>
                    <h5>Scaffold/Formwork {openSection === 'scaffoldFormwork' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'scaffoldFormwork' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'scaffoldPlanOnSite', label: '14. Scaffold/Formwork plan on site and procedures' },
                            { name: 'erectionProcedure', label: '15. Erection / dismantle procedure' },
                            { name: 'secureAccessWorkAreas', label: '16. Access to all work areas & secure' },
                            { name: 'guardrailsInPlace', label: '17. Guardrails / midrails / toeboards / screens in place' },
                            { name: 'tiesBracesAsPerPlan', label: '18. Ties / braces as per plan' },
                            { name: 'basePlatesSecure', label: '19. Base plates/soleboards level and secure' },
                            { name: 'adequateLoad', label: '20. Adequate for loads applied' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Public Protection */}
                <div className="accordion-header" onClick={() => toggleSection('publicProtection')}>
                    <h5>Public Protection {openSection === 'publicProtection' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'publicProtection' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'catchPlatform', label: '21. Catch platform' },
                            { name: 'gantry', label: '22. Gantry' },
                            { name: 'containmentBarrier', label: '23. Containment barrier' },
                            { name: 'signageFencing', label: '24. Signage & fencing' },
                            { name: 'barricadeHoarding', label: '25. Barricade / hoarding height & type' },
                            { name: 'adjoiningAreasSafe', label: '26. Adjoining areas safe' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Welding / Hot Work */}
                <div className="accordion-header" onClick={() => toggleSection('weldingHotWork')}>
                    <h5>Welding / Hot Work {openSection === 'weldingHotWork' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'weldingHotWork' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'fireExtinguisherOnHand', label: '27. Fire extinguisher on hand' },
                            { name: 'cylindersUprightSecured', label: '28. Cylinders upright and secured' },
                            { name: 'flashbackArrestersValves', label: '29. Flashback arresters / non-return valves' },
                            { name: 'screensUsedNeeded', label: '30. Screens used where needed' },
                            { name: 'regulatorHoseCondition', label: '31. Regulator, hoses / leads and handset condition' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Trenches and Excavations */}
                <div className="accordion-header" onClick={() => toggleSection('trenchesExcavations')}>
                    <h5>Trenches and Excavations {openSection === 'trenchesExcavations' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'trenchesExcavations' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'undergroundServicesRecorded', label: '32. Underground services information recorded' },
                            { name: 'barricadeHoardingInPlace', label: '33. Barricade / hoarding in place' },
                            { name: 'collapsePreventionMeasures', label: '34. Collapse prevention (e.g. batter/bench)' },
                            { name: 'ladderAccessEvery9m', label: '35. Access – ladder every 9m' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Edge Protection */}
                <div className="accordion-header" onClick={() => toggleSection('edgeProtection')}>
                    <h5>Edge Protection {openSection === 'edgeProtection' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'edgeProtection' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'erectedAsPerInstructions', label: '36. Erected as per manufacturer’s / supplier’s instructions' },
                            { name: 'withstandLoadings', label: '37. Adequate to withstand loadings' },
                            { name: 'guardrailsScreensInPlace', label: '38. Guardrails / mid-rails toe-boards / screens' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Fall Protection Cover */}
                <div className="accordion-header" onClick={() => toggleSection('fallProtectionCover')}>
                    <h5>Fall Protection Cover {openSection === 'fallProtectionCover' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'fallProtectionCover' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'adequateAndSecured', label: '39. Adequate & Secured in place' }
                        ], formData, isEditable)}
                    </div>
                )}

            {/* Harness System */}
                <div className="accordion-header" onClick={() => toggleSection('harnessSystem')}>
                    <h5>Harness System {openSection === 'harnessSystem' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'harnessSystem' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'anchoragePointAdequate', label: '40. Anchorage point adequate' },
                            { name: 'energyAbsorber', label: '41. Energy absorber' },
                            { name: 'installedAsPerInstructions', label: '42. Installed as per manufacturer / supplier / engineer / competent person' },
                            { name: 'adequateFreeFallDistance', label: '43. Adequate free fall distance for fall arrest' },
                            { name: 'usersTrained', label: '44. Users trained' },
                            { name: 'retrievalProceduresDocumented', label: '45. Retrieval procedures documented & equipment for fall arrest' },
                            { name: 'visualInspectionEquipment', label: '46. Visual inspection of equipment' },
                            { name: 'equipmentInspectedEvery6Months', label: '47. Inspected every 6 months & recorded' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Ladders */}
                <div className="accordion-header" onClick={() => toggleSection('ladders')}>
                    <h5>Ladders {openSection === 'ladders' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'ladders' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'threePointsContact', label: '48. 3 points of contact at all times' },
                            { name: 'securedTopBottom', label: '49. Secured top or bottom, or footed' },
                            { name: 'industrialRatedLadder', label: '50. Industrial rated =>120kg' },
                            { name: 'setAtCorrectAngle', label: '51. Set up at correct angle & extends 1m above landing' },
                            { name: 'ladderInGoodCondition', label: '52. Ladder in good condition' },
                            { name: 'edgeProtectionOver2m', label: '53. Edge protection over 2m for trestles/work platform' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Electrical */}
                <div className="accordion-header" onClick={() => toggleSection('electrical')}>
                    <h5>Electrical {openSection === 'electrical' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'electrical' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'leadsAndToolsTested', label: '54. Leads and tools tested and tagged' },
                            { name: 'leadsAndToolsGoodCondition', label: '55. Leads and tools in good condition' },
                            { name: 'rcdsInPlace', label: '56. RCDs in place/working' },
                            { name: 'switchboardCondition', label: '57. Switchboard – general condition' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Plant & Equipment */}
                <div className="accordion-header" onClick={() => toggleSection('plantEquipment')}>
                    <h5>Plant & Equipment {openSection === 'plantEquipment' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'plantEquipment' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'plantEquipmentGeneralCondition', label: '58. Plant and Equipment in General to manufacturer spec’s' },
                            { name: 'testedServicedInspected', label: '59. Tested, serviced, inspected as per manufacturer manual/ log book' },
                            { name: 'inGoodAndSafeCondition', label: '60. In good and safe condition' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Mobile Plant */}
                <div className="accordion-header" onClick={() => toggleSection('mobilePlant')}>
                    <h5>Mobile Plant {openSection === 'mobilePlant' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'mobilePlant' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'reversingAlarmsInPlace', label: '61. Reversing alarms (and warning lights where required)' },
                            { name: 'logBooksUpToDate', label: '62. Log books completed to date' },
                            { name: 'ropsFopsSeatBelts', label: '63. ROPS / FOPS/seat belts where required' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Cranes & Hoists */}
                <div className="accordion-header" onClick={() => toggleSection('cranesHoists')}>
                    <h5>Cranes & Hoists {openSection === 'cranesHoists' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'cranesHoists' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'registeredWhereRequired', label: '64. Registered where required (WHS Regs Schedule 5)' },
                            { name: 'logBooksUpToDateCranes', label: '65. Log books up to date' },
                            { name: 'slingingMotionsControlled', label: '66. Slinging / motions controlled' },
                            { name: 'liftingGearTested', label: '67. Lifting gear tested and in good condition' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Personal Protective Equipment */}
                <div className="accordion-header" onClick={() => toggleSection('personalProtectiveEquipment')}>
                    <h5>Personal Protective Equipment {openSection === 'personalProtectiveEquipment' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'personalProtectiveEquipment' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'ppeWornGoodCondition', label: '68. Worn as required & in good condition' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Emergency Equipment */}
                <div className="accordion-header" onClick={() => toggleSection('emergencyEquipment')}>
                    <h5>Emergency Equipment {openSection === 'emergencyEquipment' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'emergencyEquipment' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'fireExtinguishersServiced', label: '69. Fire extinguishers serviced/charged' },
                            { name: 'equipmentOnSitePerPlan', label: '70. Equipment on site as per plan' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Manual Tasks */}
                <div className="accordion-header" onClick={() => toggleSection('manualTasks')}>
                    <h5>Manual Tasks {openSection === 'manualTasks' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'manualTasks' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'appropriateControlsImplemented', label: '71. Appropriate controls implemented' },
                            { name: 'workersNotSubjectToExertions', label: '72. Workers not subject to Forceful exertions/ Awkward working posture/other factors' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Noise */}
                <div className="accordion-header" onClick={() => toggleSection('noise')}>
                    <h5>Noise {openSection === 'noise' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'noise' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'effectiveNoiseControls', label: '73. Effective controls in place to reduce exposure to worker to below exposure standards' },
                            { name: 'areasAbove85dBIdentified', label: '74. Areas above 85dB(A) identified and signed' }
                        ], formData, isEditable)}
                    </div>
                )}


            {/* Hazardous Chemicals */}
                <div className="accordion-header" onClick={() => toggleSection('hazardousChemicals')}>
                    <h5>Hazardous Chemicals {openSection === 'hazardousChemicals' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'hazardousChemicals' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'sdsAvailable', label: '76. SDS available and in register' },
                            { name: 'handlingInAccordanceWithRiskAssessments', label: '77. Handling and use in accordance with risk assessments' },
                            { name: 'labellingAllContainersLabelled', label: '78. Labelling (all containers labelled)' },
                            { name: 'spillContainmentOnSite', label: '79. Spill containment on site' },
                            { name: 'ventilatedShadedEnclosedStorage', label: '80. Ventilated/shaded & enclosed storage' },
                            { name: 'placardingSignageInStorageAreas', label: '81. Placarding / signage in storage areas' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Silica */}
                <div className="accordion-header" onClick={() => toggleSection('silica')}>
                    <h5>Silica {openSection === 'silica' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'silica' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'exclusionBarriersExtended', label: '82. Exclusion barriers are extended enough, adequate set out & signage' },
                            { name: 'poweredEquipmentWithWaterDelivery', label: '83. Powered equipment has water delivery or dust collector with a hood or shroud' },
                            { name: 'equipmentMaintainedNoLeaking', label: '84. Equipment that delivers water is maintained and no leaking' },
                            { name: 'fansDoNotBlowDustIntoAreas', label: '85. Fans do not blow dust into other work areas' },
                            { name: 'workConductedToMinimizeDust', label: '86. Work conducted to minimise dust (e.g., wet down of product/area)' },
                            { name: 'housekeepingWasteSlurryBagsAcceptable', label: '87. Housekeeping of waste, slurry, bags, etc., acceptable in work areas' },
                            { name: 'commonAccessAreasClean', label: '88. Common access and areas are clean' },
                            { name: 'sufficientBinsForSilicaContainment', label: '89. Sufficient bins and materials to contain silica' },
                            { name: 'vacuumHOrMClassAvailable', label: '90. Is there a H or M class vacuum available?' },
                            { name: 'vacuumWellMaintainedServiced', label: '91. Vacuums are well maintained and serviced' },
                            { name: 'housekeepingWasteAcceptableInWorkAreas', label: '92. Housekeeping of waste, slurry, bags acceptable in work areas' },
                            { name: 'ppeSpecifiedInSwmsBeingWorn', label: '93. Is PPE specified in the SWMS being worn?' },
                            { name: 'ppeInGoodConditionAndMaintained', label: '94. Is the PPE being worn in good working order and maintained?' },
                            { name: 'sdsAvailableInWorkAreas', label: '95. SDS are available in work areas' },
                            { name: 'fitTestRecordsAvailable', label: '96. Fit test records available for RPE worn?' },
                            { name: 'healthMonitoringForWorkers', label: '97. Workers sampled who have worn RPE 30 days or more in 12 months had health monitoring' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Behavioural */}
                <div className="accordion-header" onClick={() => toggleSection('behavioural')}>
                    <h5>Behavioural {openSection === 'behavioural' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'behavioural' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'swmsFollowed', label: '98. SWMS or safety procedures being followed' },
                            { name: 'siteRulesAdheredTo', label: '99. Site rules being adhered to' },
                            { name: 'nonConformancesRectified', label: '100. Non-conformances being rectified' },
                            { name: 'workRelatedHarassmentIssues', label: '101. Work-related harassment, bullying, or violence issues observed?' },
                            { name: 'psychosocialHazardsIdentified', label: '102. Any psychosocial hazards identified or raised?' },
                            { name: 'formalComplaintsAddressed', label: '103. Formal or informal complaints addressed?' },
                            { name: 'harassmentBullyingPoliciesDisplayed', label: '104. Harassment, bullying, and violence policies displayed?' },
                            { name: 'issueResolutionComplaintsProcedures', label: '105. Issue resolution and complaints procedures displayed?' }
                        ], formData, isEditable)}
                    </div>
                )}

                {/* Other Hazards */}
                <div className="accordion-header" onClick={() => toggleSection('otherHazards')}>
                    <h5>Other Hazards {openSection === 'otherHazards' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'otherHazards' && (
                    <div className="accordion-content">
                        {renderInspectionItems([
                            { name: 'otherHazard1', label: '106. Any other hazards and risks encountered on site not listed' },
                            { name: 'otherHazard2', label: '107. ' },
                            { name: 'otherHazard3', label: '108. ' },
                            { name: 'otherHazard4', label: '109. ' },
                            { name: 'otherHazard5', label: '110. ' },
                            { name: 'otherHazard6', label: '111. ' },
                            { name: 'otherHazard7', label: '112. ' }
                        ], formData, isEditable)}
                    </div>
                )}

            {/* Corrective Actions */}
            <div className="accordion-header" onClick={() => toggleSection('correctiveActions')}>
                <h5>Corrective Actions {openSection === 'correctiveActions' ? '▲' : '▼'}</h5>
            </div>
            {openSection === 'correctiveActions' && (
                <div className="accordion-content">
                    <div className="corrective-actions-section">
                        {Array.from({ length: 1 }).map((_, index) => {
                            const item = index + 1; // Adjust the number of items as needed
                            return (
                                <div key={index} className="mb-3 corrective-action-item">
                                    {isEditable ? (
                                        <>
                                            {/* Editable Form */}
                                            <label className="form-label">Item Number</label>
                                            <input
                                                type="number"
                                                name={`constructionCorrectiveItemNumber${item}`}
                                                className="form-control"
                                                value={formData[`constructionCorrectiveItemNumber${item}`] || ''}
                                                onChange={handleInputChange}
                                            />

                                            <label className="form-label">Actions Required</label>
                                            <input
                                                type="text"
                                                name={`constructionCorrectiveActionRequired${item}`}
                                                className="form-control"
                                                value={formData[`constructionCorrectiveActionRequired${item}`] || ''}
                                                onChange={handleInputChange}
                                            />

                                            <label className="form-label">Actions by Whom</label>
                                            <input
                                                type="text"
                                                name={`constructionCorrectiveActionByWhom${item}`}
                                                className="form-control"
                                                value={formData[`constructionCorrectiveActionByWhom${item}`] || ''}
                                                onChange={handleInputChange}
                                            />

                                            <label className="form-label">Priority</label>
                                            <select
                                                name={`constructionCorrectiveActionPriority${item}`}
                                                className="form-control"
                                                value={formData[`constructionCorrectiveActionPriority${item}`] || ''}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Priority</option>
                                                <option value="Priority A">Priority A – STOP work in this area unless rectified</option>
                                                <option value="Priority B">Priority B – Attend IMMEDIATELY</option>
                                                <option value="Priority C">Priority C – Rectify within 24 HOURS</option>
                                                <option value="Priority D">Priority D – Rectify within NOMINATED TIME</option>
                                                <option value="N/A">N/A – Not Applicable</option>
                                                <option value="R">R – Issue rectified in inspection</option>
                                            </select>

                                            <label className="form-label">Status</label>
                                            <select
                                                name={`constructionCorrectiveActionStatus${item}`}
                                                className="form-control"
                                                value={formData[`constructionCorrectiveActionStatus${item}`] || ''}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Open">Open</option>
                                                <option value="Closed">Closed</option>
                                            </select>

                                            <label className="form-label">Signed & Dated When Done</label>
                                            <input
                                                type="text"
                                                name={`constructionCorrectiveSignedAndDated${item}`}
                                                className="form-control"
                                                placeholder="Name & Date"
                                                value={formData[`constructionCorrectiveSignedAndDated${item}`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {/* Plain Text View */}
                                            <p><strong>Item Number:</strong> {formData[`constructionCorrectiveItemNumber${item}`] || 'N/A'}</p>
                                            <p><strong>Actions Required:</strong> {formData[`constructionCorrectiveActionRequired${item}`] || 'N/A'}</p>
                                            <p><strong>Actions by Whom:</strong> {formData[`constructionCorrectiveActionByWhom${item}`] || 'N/A'}</p>
                                            <p><strong>Priority:</strong> {formData[`constructionCorrectiveActionPriority${item}`] || 'N/A'}</p>
                                            <p><strong>Status:</strong> {formData[`constructionCorrectiveActionStatus${item}`] || 'N/A'}</p>
                                            <p><strong>Signed & Dated When Done:</strong> {formData[`constructionCorrectiveSignedAndDated${item}`] || 'N/A'}</p>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}



            {/* Images Section */}
                <div className="accordion-header" onClick={() => toggleSection('images')}>
                    <h5>Images {openSection === 'images' ? '▲' : '▼'}</h5>
                </div>
                {openSection === 'images' && (
                    <div className="accordion-content">
                        {/* Uploaded Images */}
                        {formData.constructionImages && formData.constructionImages.length > 0 ? (
                            <div className="mb-3">
                                <label className="form-label">Uploaded Images</label>
                                <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {formData.constructionImages.map((image, index) => (
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

                        {/* Upload New Images */}
                        {isEditable && (
                            <div className="mb-3">
                                <h5 className="form-label">Upload New Images</h5>
                                <input
                                    type="file"
                                    name="constructionInspectionImages"
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
        </div>
    );
};

export default ConstructionInspection;

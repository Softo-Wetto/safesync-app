import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import './CalendarPage.css'; 

const CalendarPage = () => {
    const [activities, setActivities] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activitiesOnDate, setActivitiesOnDate] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/activities');
                setActivities(response.data);
            } catch (err) {
                console.error('Error fetching activities:', err);
            }
        };
        fetchActivities();
    }, []);

    // Utility function to compare dates (ignoring time)
    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };

    // Determine the highest priority outcome for a date
    const getHighestPriorityOutcome = (activitiesOnDate) => {
        const priority = ['NS', 'NC', 'PC', 'Unknown', 'C']; // Define priority order
        let highestPriority = 'C'; // Default to 'Completed'

        activitiesOnDate.forEach(activity => {
            const activityPriority = priority.indexOf(activity.outcome);
            const highestPriorityIndex = priority.indexOf(highestPriority);

            if (activityPriority < highestPriorityIndex) {
                highestPriority = activity.outcome;
            }
        });

        return highestPriority;
    };

    const getClassForOutcome = (outcome) => {
        switch (outcome) {
            case 'NS':
                return 'calendar-tile-ns'; // Red for Not Started
            case 'NC':
                return 'calendar-tile-nc'; // Yellow for Not Completed
            case 'PC':
                return 'calendar-tile-pc'; // Gray for Partially Completed
            case 'Unknown':
                return 'calendar-tile-unknown'; // Dark for Unknown
            case 'C':
                return 'calendar-tile-c'; // Green for Completed
            default:
                return '';
        }
    };

    // When the user clicks on a date, filter activities based on the selected date
    useEffect(() => {
        const activitiesForSelectedDate = activities.filter(
            (activity) => isSameDay(activity.dueDate, selectedDate)
        );
        setActivitiesOnDate(activitiesForSelectedDate);
    }, [selectedDate, activities]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid calendar-container">
                <h1 className="mb-4">Activity Calendar</h1>
                <p className="text-muted mb-5">View activities by due date on the calendar.</p>
                <div className="row">
                    <div className="col-md-6 calendar-section">
                        {/* Calendar */}
                        <Calendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            tileClassName={({ date, view }) => {
                                // Filter activities for the current date
                                const activitiesOnThisDate = activities.filter(activity => isSameDay(activity.dueDate, date));
                                
                                if (activitiesOnThisDate.length > 0) {
                                    const highestPriorityOutcome = getHighestPriorityOutcome(activitiesOnThisDate);
                                    return getClassForOutcome(highestPriorityOutcome); // Apply class based on the highest priority outcome
                                }

                                return null;
                            }}
                        />
                    </div>
                    <div className="col-md-6 activities-section">
                        {/* Display activities on selected date */}
                        <h2>Activities on {selectedDate.toDateString()}</h2>
                        {activitiesOnDate.length > 0 ? (
                            <ul className="list-group">
                                {activitiesOnDate.map((activity) => (
                                    <li key={activity.id} className="list-group-item shadow-sm">
                                        <h5>{activity.name}</h5>
                                        <p>
                                            <strong>Outcome:</strong>{' '}
                                            <span className={`badge bg-${getBadgeClass(activity.outcome)}`}>
                                                {getOutcomeLabel(activity.outcome)}
                                            </span>
                                        </p>
                                        <p><strong>Type:</strong> {activity.activityType}</p>
                                        <p><strong>Due Date:</strong> {new Date(activity.dueDate).toLocaleDateString()}</p>
                                        
                                        {/* Add the View button */}
                                        <Link to={`/projects/${activity.projectId}/activities/${activity.id}/view`} className="btn btn-primary">
                                            View Activity
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No activities due on this date.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions for outcome labels and badge styling
const getOutcomeLabel = (outcome) => {
    switch (outcome) {
        case 'NS':
            return 'Not Started';
        case 'NC':
            return 'Not Completed';
        case 'PC':
            return 'Partially Completed';
        case 'C':
            return 'Completed';
        default:
            return 'Unknown';
    }
};

const getBadgeClass = (outcome) => {
    switch (outcome) {
        case 'C':
            return 'success'; // Green badge for completed
        case 'NS':
            return 'danger'; // Red badge for not started
        case 'PC':
            return 'secondary'; // Gray badge for partially completed
        case 'NC':
            return 'warning'; // Yellow badge for not completed
        default:
            return 'dark'; // Dark badge for unknown
    }
};

export default CalendarPage;
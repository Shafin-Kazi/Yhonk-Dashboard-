import React, { useState } from 'react';
import { X } from 'lucide-react';
import './DeviceInstallationChecklist.css';

const API_URL = 'http://localhost:5000/api/device-installation-checklists';

const checklistSections = [
    {
        title: 'Basic Functionality Checks',
        items: [
            { key: 'horn_single', label: 'Single Horn Honk Test' },
            { key: 'horn_multi', label: 'Multi-Horn Check' },
            { key: 'headlights', label: 'Headlights Status (On/Off)' },
            { key: 'engine', label: 'Engine Turn On/Off Test' },
            { key: 'command', label: 'Command Functionality Test' },
        ],
    },
    {
        title: 'Vehicle & Electrical System',
        items: [
            { key: 'indicator_lights', label: 'Indicator Lights Test (Left/Right)' },
            { key: 'tail_light', label: 'Tail Light Functionality' },
            { key: 'battery_voltage', label: 'Battery Voltage Check' },
        ],
    },
    {
        title: 'Device & Network Setup',
        items: [
            { key: 'gps_signal', label: 'GPS Signal Lock Verification' },
            { key: 'sim_signal', label: 'SIM Network Signal Test' },
            { key: 'device_ping', label: 'Device Command Acknowledgement (Ping Test)' },
        ],
    },
    {
        title: 'Verification & Security',
        items: [
            { key: 'driver_otp', label: 'Driver OTP Verification', type: 'otp' },
            { key: 'tamper_switch', label: 'Tamper Switch Test (if applicable)' },
            { key: 'device_photo', label: 'Photo of Installed Device', type: 'photo' },
        ],
    },
];

function isOtpValid(otp) {
    return /^[0-9]{6}$/.test(otp);
}

export default function DeviceInstallationChecklist({ device, onClose }) {
    const [checks, setChecks] = useState(
        checklistSections.flatMap(section => section.items).reduce((acc, item) => {
            acc[item.key] = { status: '', comment: '', timestamp: null, value: '' };
            return acc;
        }, {})
    );
    const [photoFile, setPhotoFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusChange = (key, status) => {
        setChecks(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                status,
                timestamp: new Date().toLocaleString(),
                comment: status === 'Not OK' ? prev[key].comment : '',
            },
        }));
    };

    const handleCommentChange = (key, comment) => {
        setChecks(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                comment,
            },
        }));
    };

    const handleOtpChange = (otp) => {
        setChecks(prev => ({
            ...prev,
            driver_otp: {
                ...prev.driver_otp,
                value: otp,
                timestamp: otp.length === 6 && isOtpValid(otp) ? new Date().toLocaleString() : prev.driver_otp.timestamp,
            },
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
        setChecks(prev => ({
            ...prev,
            device_photo: {
                ...prev.device_photo,
                value: file ? file.name : '',
                timestamp: file ? new Date().toLocaleString() : null,
            },
        }));
    };

    const allFilled = checklistSections.flatMap(s => s.items).every(item => {
        if (item.type === 'otp') return isOtpValid(checks[item.key].value);
        if (item.type === 'photo') return !!checks[item.key].value;
        if (checks[item.key].status === 'Not OK') return !!checks[item.key].comment;
        return checks[item.key].status === 'OK' || checks[item.key].status === 'Not OK';
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        // Prepare FormData for backend
        const formData = new FormData();
        formData.append('device_id', device?.id);
        formData.append('status', allFilled ? 'Completed' : 'Incomplete');
        formData.append(
            'comments',
            Object.entries(checks)
                .filter(([key, val]) => val.comment)
                .map(([key, val]) => `${key}: ${val.comment}`)
                .join('; ')
        );
        formData.append('otp', checks.driver_otp.value);

        // Attach photo file if present
        if (photoFile) {
            formData.append('photo', photoFile);
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to submit checklist');
            setSubmitting(false);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to submit checklist');
            setSubmitting(false);
        }
    };

    return (
        <div className="device-checklist-container">
            <button className="checklist-close-btn" onClick={onClose} title="Close Checklist">
                <X size={22} />
            </button>
            <h2 className="checklist-title">Device Installation Checklist</h2>
            <form className="checklist-form" onSubmit={handleSubmit}>
                {checklistSections.map(section => (
                    <div key={section.title} className="checklist-section">
                        <div className="section-title">{section.title}</div>
                        {section.items.map(item => (
                            <div className="checklist-item" key={item.key}>
                                <label className="item-label">{item.label}</label>
                                {item.type === 'otp' ? (
                                    <input
                                        className="item-otp stylish"
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={checks[item.key].value}
                                        onChange={e => handleOtpChange(e.target.value)}
                                        maxLength={6}
                                        pattern="[0-9]{6}"
                                        required
                                    />
                                ) : item.type === 'photo' ? (
                                    <input
                                        className="item-photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        required
                                    />
                                ) : (
                                    <>
                                        <div className="item-controls">
                                            <button
                                                type="button"
                                                className={`status-btn ok${checks[item.key].status === 'OK' ? ' active' : ''}`}
                                                onClick={() => handleStatusChange(item.key, 'OK')}
                                            >
                                                OK
                                            </button>
                                            <button
                                                type="button"
                                                className={`status-btn notok${checks[item.key].status === 'Not OK' ? ' active' : ''}`}
                                                onClick={() => handleStatusChange(item.key, 'Not OK')}
                                            >
                                                Not OK
                                            </button>
                                        </div>
                                        {checks[item.key].status && (
                                            <span className="item-timestamp">{checks[item.key].timestamp}</span>
                                        )}
                                        {checks[item.key].status === 'Not OK' && (
                                            <input
                                                className="item-comment"
                                                type="text"
                                                placeholder="Add comment (required)"
                                                value={checks[item.key].comment}
                                                onChange={e => handleCommentChange(item.key, e.target.value)}
                                                required
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    type="submit"
                    className="checklist-submit-btn"
                    disabled={!allFilled || submitting}
                >
                    {submitting ? "Submitting..." : "Submit Checklist"}
                </button>
                {error && <div className="checklist-error">{error}</div>}
            </form>
        </div>
    );
}
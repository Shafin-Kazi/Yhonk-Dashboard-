import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HornDurationDetail.css';

const mockDetail = {
  group: 'Uber Ahmedabad',
  driverSerial: 'MARA-8143',
  vehicle: 'GJ-01-DZ-7191',
  yhonkSerial: 'APUB-0123',
  imei: '868404048102722',
  deviceType: 'GS21',
  time: '20250410004656',
  longitude: '72.679764',
  latitude: '23.080658',
  speed: '',
  heading: '181',
  altitude: '45.5',
  satellite: '8',
  eventType: 'Horn detect event',
  battery: '98',
  temperature: '',
  ignition: 'Ignition On',
  statusRegister: '0',
  gsmSignal: '',
  distance: '37076',
  digitalInput1: '',
  analogInput1: '-1',
  analogInput2: '54321',
  mainVoltage: '13992',
  hornType: 'Normal Horn',
  hornDuration: '107',
  hornCount: '0',
  hornCalc: '| DURATION_PER_COUNT = 200 | PENALTY_THRESHOLD_COUNT = 15 | PENALTY_ENABLE_FLAG = 1 | DAILY_ALLOWED_HORN_COUNT = 100 | DELAY_DAILY_ALLOWED_HORN_COUNT = 80 |',
  remoteAddress: '42.106.4.61',
  hex: '$GS21,868404048102722,20250410004656,72.679764,23.080658,28,181,45.500000,8,71,98,0,1,0,0,37076,0,-1,54321,13992,(H:1,107,0)',
  protocol: 'IPv4',
  remotePort: '37022',
  created: '2025-04-10 06:16:56',
  updated: '30/04/2025 00:01',
};

const fields = [
  ['Group', 'group'],
  ['Driver Serial Number', 'driverSerial'],
  ['Vehicle', 'vehicle'],
  ['Yhonk Serial Number', 'yhonkSerial'],
  ['IMEI', 'imei'],
  ['Device Type', 'deviceType'],
  ['Time', 'time'],
  ['Longitude', 'longitude'],
  ['Latitude', 'latitude'],
  ['Speed', 'speed'],
  ['Heading', 'heading'],
  ['Altitude', 'altitude'],
  ['Satellite', 'satellite'],
  ['Event Type', 'eventType'],
  ['Internal Battery Voltage Percentage', 'battery'],
  ['Device Temperature', 'temperature'],
  ['Ignition Status', 'ignition'],
  ['Status Register', 'statusRegister'],
  ['GSM Singal Strength', 'gsmSignal'],
  ['Distance', 'distance'],
  ['Digital Input 1', 'digitalInput1'],
  ['Analog Input 1', 'analogInput1'],
  ['Analog Input 2', 'analogInput2'],
  ['Main Input Voltage', 'mainVoltage'],
  ['Horn Type', 'hornType'],
  ['Horn Duration', 'hornDuration'],
  ['Horn Count', 'hornCount'],
  ['Horn calculation fields', 'hornCalc'],
  ['Remote Address', 'remoteAddress'],
  ['Hex', 'hex'],
  ['Protocol', 'protocol'],
  ['Remote Port', 'remotePort'],
  ['Created Date', 'created'],
  ['Updated Date', 'updated'],
];

export default function HornDurationDetail() {
  const navigate = useNavigate();
  const { recordId } = useParams();
  // In real app, fetch by recordId
  const data = mockDetail;

  return (
    <div className="horn-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
      <h2 className="horn-detail-title">Horn Duration Report Details</h2>
      <div className="horn-detail-card">
        <table className="horn-detail-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(([label, key]) => (
              <tr key={key}>
                <td>{label}</td>
                <td>
                  {key === 'eventType' ? <span className="badge badge-blue">{data[key]}</span>
                  : key === 'ignition' ? <span className="badge badge-green">{data[key]}</span>
                  : key === 'hornType' ? <span className="badge badge-normal">{data[key]}</span>
                  : data[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
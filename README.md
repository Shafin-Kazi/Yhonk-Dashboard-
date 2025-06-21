# Yhonk Dashboard

A comprehensive React-based admin dashboard for managing vehicles, drivers, and devices with a modern red, white, and black theme.

## Features

### 🚗 Vehicle Management
- **Complete Vehicle Registration**: All mandatory fields including registration number, date, brand, model, type, ownership, age calculation, horn decibel, driver assignment, and usage type
- **Smart Form Validation**: Auto-calculated vehicle age from registration date
- **Brand-Model Dependencies**: Dynamic model selection based on brand choice
- **Search & Filter**: Advanced filtering by brand, type, and registration number

### 👥 Driver Management
- **Categorized Information**: Organized into logical sections:
  - **Basic Information**: Name, DOB, email, language, phone
  - **Driver Details**: Experience, age, gender, occupation, rating
  - **Hearing Assessment**: Optional audiogram data and hearing intelligence
  - **Additional Info**: Education, income, disability, marital status
  - **Identification**: Aadhar, license details
  - **Location**: Complete address information
- **Auto Age Calculation**: Automatic age calculation from date of birth
- **Comprehensive Forms**: All required fields with proper validation

### 📱 Device Management
- **Device Registration**: IMEI, SIM, Yhonk serial number, and description
- **Real-time Status**: Battery level, signal strength, last seen timestamps
- **Device Logs**: Complete activity tracking with timestamps and event details
- **Visual Indicators**: Battery bars and signal strength indicators

### 📊 Dashboard Overview
- **Summary Cards**: Total users, vehicles, drivers, and devices with growth indicators
- **Recent Activities**: Real-time activity feed
- **Quick Actions**: Fast access to common operations

## Design Features

### 🎨 Theme & Styling
- **Red, White, Black Theme**: Consistent with Yhonk branding
- **Modern UI**: Clean, minimalist admin panel aesthetics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback

### 🔧 Technical Features
- **React 18**: Latest React features and hooks
- **React Router**: Client-side routing for seamless navigation
- **Lucide Icons**: Beautiful, consistent iconography
- **Date-fns**: Modern date manipulation
- **CSS Variables**: Maintainable theme system
- **Grid & Flexbox**: Modern CSS layouts

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yhonk-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js              # Main dashboard with stats and activities
│   ├── Dashboard.css
│   ├── VehicleManagement.js      # Vehicle registration and management
│   ├── VehicleManagement.css
│   ├── DriverManagement.js       # Driver registration with categorized forms
│   ├── DriverManagement.css
│   ├── DeviceManagement.js       # Device management with logs
│   └── DeviceManagement.css
├── App.js                        # Main app with routing and layout
├── App.css                       # Layout and sidebar styles
├── index.js                      # React entry point
└── index.css                     # Global styles and theme variables
```

## Form Fields Overview

### Vehicle Management
- Registration Number (required)
- Registration Date (required)
- Brand Name (required)
- Model Name (required, dependent on brand)
- Vehicle Type (required)
- Ownership (required)
- Age of Vehicle (auto-calculated)
- Horn Decibel (required)
- Driven By (required)
- Uses or Sub Uses (required)

### Driver Management
#### Basic Information
- First Name, Last Name (required)
- Date of Birth (required)
- Email (required)
- Preferred Language (required)
- Phone Number (required)

#### Driver Details
- Experience (Years) (required)
- Age (auto-calculated)
- Gender (required)
- Occupation (required)
- Driver Rating

#### Hearing Assessment (Optional)
- Right/Left Ear Audiogram
- Signal to Noise Ratio
- Personal Hearing Intelligence

#### Additional Information
- Education Level
- Income Range
- Disability Status
- Marital Status

#### Identification
- Aadhar Number (required)
- License Number (required)
- License Type (required)
- Date of License Issue (required)

#### Location
- Country, State, City, Pincode (all required)

### Device Management
- IMEI Number (required)
- SIM Number (required)
- Yhonk Serial Number (required)
- Description (required)

## Customization

### Theme Colors
The dashboard uses CSS variables for easy theme customization:

```css
:root {
  --yhonk-red: #dc2626;
  --yhonk-red-dark: #b91c1c;
  --yhonk-red-light: #fef2f2;
  --yhonk-black: #111827;
  --yhonk-gray: #6b7280;
  --yhonk-gray-light: #f3f4f6;
  --yhonk-white: #ffffff;
}
```

### Adding New Features
1. Create new components in the `src/components/` directory
2. Add routes in `App.js`
3. Update the sidebar navigation
4. Follow the existing CSS patterns for consistency

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository. 
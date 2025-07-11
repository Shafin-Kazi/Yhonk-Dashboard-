import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions-card">
      <div className="quick-actions-row">
        <button
          className="quick-action-btn quick-action-btn-primary"
          onClick={() => navigate("/vehicles?showForm=true")}
        >
          Add New Vehicle
        </button>
        <button
          className="quick-action-btn quick-action-btn-primary"
          onClick={() => navigate("/drivers?showForm=true")}
        >
          Register Driver
        </button>
        <button
          className="quick-action-btn quick-action-btn-primary"
          onClick={() => navigate("/devices?showForm=true")}
        >
          Activate Device
        </button>
      </div>
    </div>
  );
} 
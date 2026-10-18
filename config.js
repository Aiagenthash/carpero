/**
 * The 24/7 HVAC Revenue Recovery Autopilot™
 * Central Configuration File
 * 
 * Customize these values to plug this landing page directly into your domain,
 * CRM, Twilio/Vapi phone number, and calendar in under 60 seconds.
 */

window.HVAC_CONFIG = {
  // Brand & Company Info
  brandName: "The 24/7 HVAC Revenue Recovery Autopilot™",
  agencyName: "Carpero",
  supportEmail: "support@carpero.com",
  
  // Live Demo Phone Number (Displayed across the page for callers to test live)
  demoPhoneNumber: "(888) 482-2247",
  demoPhoneNumberRaw: "+18884822247",
  
  // Territory Exclusivity Settings
  maxSpotsPerTerritory: 2,
  foundingPartnerSpotsTotal: 10,
  foundingPartnerSpotsClaimed: 8, // Shows 2 spots remaining
  
  // Pricing Strategy (Founding Partner vs Standard)
  pricing: {
    founding: {
      setupFee: "$997",
      setupFeeSubtext: "or $0 upfront (billed after 5th job recovered)",
      monthlyFee: "$497",
      monthlyBillingPeriod: "/month",
      term: "Month-to-Month (Cancel anytime)",
      guarantee: "5 Booked Jobs in 30 Days or 100% Refund"
    },
    standard: {
      setupFee: "$2,497",
      monthlyFee: "$997",
      monthlyBillingPeriod: "/month",
      term: "6-Month Agreement",
      guarantee: "Standard 30-Day Guarantee"
    }
  },

  // Guarantee Specifics
  guaranteeJobsThreshold: 5,
  guaranteeDays: 30,
  
  // GoHighLevel (LeadConnector) Integration
  ghl: {
    locationId: "4rsitvcF0nWZXBh5xzf8",
    calendarId: "Orm5YQIwK1MgN9w5Z2Vw",
    pipelineId: "WeVSKhJlQeCBr6MXxAbF"
  },

  // Webhook Endpoint (Zapier, Make, GoHighLevel, or your backend)
  // When a contractor claims a territory or requests a demo, form data will POST here.
  webhookUrl: "https://hook.us1.make.com/your-webhook-id-here", // Replace with your webhook
  
  // Calendar / Booking Link (Calendly, Cal.com, or GHL calendar URL)
  // Set this to open your calendar inside the confirmation modal or redirect
  calendarBookingUrl: "https://discovery.carpero.com/calendar-page",

  // Demo Audio Simulation Defaults
  audioDemo: {
    customerName: "David Miller",
    customerIssue: "AC unit blowing warm air, loud condenser buzzing",
    diagnosticFee: "$89",
    suggestedSlot: "Tomorrow morning between 8:00 AM - 10:00 AM",
    systemReplacementLeadValue: "$12,800"
  }
};

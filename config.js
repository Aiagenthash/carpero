/**
 * CARPERO™ - Autonomous Revenue Recovery Systems
 * Central Configuration File
 * 
 * Domain: carpero.com
 */

window.CARPERO_CONFIG = {
  // Brand & Company Info
  brandName: "CARPERO™",
  brandSubtitle: "Autonomous Revenue Recovery Systems",
  agencyName: "Carpero Inc.",
  supportEmail: "hello@carpero.com",
  
  // Live Demo Phone Number
  demoPhoneNumber: "(817) 760-2428",
  demoPhoneNumberRaw: "+18177602428",
  
  // Founding Partner Scarcity Settings
  foundingPartnerSpotsTotal: 10,
  foundingPartnerSpotsClaimed: 8, // Shows 2 spots remaining
  
  // Pricing Strategy (Founding Partner vs Standard)
  pricing: {
    founding: {
      setupFee: "$997",
      setupFeeSubtext: "or $0 upfront (billed after first revenue recovered)",
      monthlyFee: "$497",
      monthlyBillingPeriod: "/month",
      term: "Month-to-Month (Cancel anytime)",
      guarantee: "100% Performance Guarantee: Recovers Revenue or You Pay $0"
    },
    standard: {
      setupFee: "$2,497",
      monthlyFee: "$997",
      monthlyBillingPeriod: "/month",
      term: "6-Month Agreement",
      guarantee: "Standard 30-Day Performance Guarantee"
    }
  },

  // GoHighLevel (LeadConnector) Integration
  ghl: {
    locationId: "4rsitvcF0nWZXBh5xzf8",
    calendarId: "Orm5YQIwK1MgN9w5Z2Vw",
    pipelineId: "WeVSKhJlQeCBr6MXxAbF"
  },

  // Webhook Endpoint (Live GHL Inbound Webhook Sync)
  webhookUrl: "https://services.leadconnectorhq.com/hooks/4rsitvcF0nWZXBh5xzf8/webhook-trigger/4ec7c241-9ad8-4c57-af4d-8ed2df56f244",
  
  // Calendar / Booking Link (Live GHL 3-Minute Live AI Demo Call)
  calendarBookingUrl: "https://api.leadconnectorhq.com/widget/booking/Orm5YQIwK1MgN9w5Z2Vw"
};

// Backward-compatibility alias
window.HVAC_CONFIG = window.CARPERO_CONFIG;

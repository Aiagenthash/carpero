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
  demoPhoneNumber: "(888) 482-2247",
  demoPhoneNumberRaw: "+18884822247",
  
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

  // Webhook Endpoint (Zapier, Make, or GHL)
  webhookUrl: "https://hook.us1.make.com/your-webhook-id-here",
  
  // Calendar / Booking Link (Live GHL Sub-account calendar on discovery.carpero.com)
  calendarBookingUrl: "https://discovery.carpero.com/calendar-page"
};

// Backward-compatibility alias
window.HVAC_CONFIG = window.CARPERO_CONFIG;

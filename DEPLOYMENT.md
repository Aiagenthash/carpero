# How to Plug "The 24/7 HVAC Revenue Recovery Autopilot™" Onto Your Domain

This landing page is designed to be **100% plug-and-play**. It requires **zero complex build processes, zero database setups, and zero heavy dependencies**. You can plug it onto any custom domain or subdomain (`www.yourdomain.com`, `offer.yourdomain.com`, or `autopilot.yourdomain.com`) in under 5 minutes.

---

## 🚀 Quick Step 1: Customize Your Settings in `config.js`

Open `config.js` in any text editor. Everything on the page updates automatically when you change these lines:

```javascript
window.HVAC_CONFIG = {
  // 1. Your Brand & Support Info
  brandName: "HVAC Revenue Recovery Autopilot™",
  agencyName: "Your Agency or Business Name",
  supportEmail: "support@yourdomain.com",
  
  // 2. Your Live Demo Phone Number
  // (Put your Twilio or Vapi AI number here. Callers will see & dial this live!)
  demoPhoneNumber: "(888) 482-2247",
  demoPhoneNumberRaw: "+18884822247",
  
  // 3. Webhook Endpoint for Territory Leads
  // Enter your Make.com, Zapier, or GoHighLevel webhook URL here
  webhookUrl: "https://hook.us1.make.com/your-webhook-id",
  
  // 4. Your 15-Minute Zoom / Phone Calendar Link
  // Placed on the confirmation screen after a contractor claims their territory
  calendarBookingUrl: "https://calendly.com/your-name/15min",

  // 5. Territory Limits & Pricing
  maxSpotsPerTerritory: 2,
  foundingPartnerSpotsTotal: 10,
  foundingPartnerSpotsClaimed: 8, // Shows 2 spots remaining
  
  pricing: {
    founding: {
      setupFee: "$997",
      setupFeeSubtext: "or $0 upfront (billed after 5th job recovered)",
      monthlyFee: "$497",
      monthlyBillingPeriod: "/month",
      term: "Month-to-Month (Cancel anytime)",
      guarantee: "5 Booked Jobs in 30 Days or 100% Refund"
    }
  }
};
```

---

## 🌐 Quick Step 2: Plug Onto Your Domain (Choose Your Favorite Method)

### Method A: Cloudflare Pages (Recommended — 100% Free, Global CDN & Instant SSL)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log in.
2. Click **Compute (Workers & Pages)** > **Create application** > **Pages**.
3. Select **Upload assets**.
4. Drag and drop this folder (`hVACS`) into Cloudflare.
5. Click **Deploy Site**.
6. Once deployed, click **Custom domains** > **Set up a custom domain** (e.g., `hvac.yourdomain.com` or `yourdomain.com`).
7. Cloudflare configures the SSL certificate and DNS automatically. Your site is live!

---

### Method B: Vercel or Netlify (Drag & Drop in 60 Seconds)
1. **Netlify**: Go to [app.netlify.com/drop](https://app.netlify.com/drop). Drag the folder onto the browser window.
2. Click **Domain management** > **Add a domain**.
3. Enter your domain (e.g., `go.yourdomain.com`).
4. In your DNS manager (GoDaddy, Namecheap, Cloudflare, etc.), add the CNAME record provided by Netlify/Vercel pointing to your project.
5. Your custom domain is active with free auto-renewing SSL!

---

### Method C: Traditional Web Hosting (cPanel / GoDaddy / Namecheap / Hostinger / Apache / Nginx)
1. Log into your hosting control panel (cPanel, Plesk, or FTP).
2. Open **File Manager** and navigate to your domain's root folder (`public_html` or your subdomain folder).
3. Upload the files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`
4. Visit your domain in any browser. The landing page loads immediately!

---

### Method D: WordPress or Existing CMS (Subdirectory or Subdomain)
- **Option 1 (Subdomain)**: In your DNS / cPanel, create a subdomain like `revenue.yourdomain.com` and upload the files to its document root.
- **Option 2 (Subfolder)**: In your WordPress root directory, create a folder named `autopilot` and place the files inside. The landing page will be accessible at `yourdomain.com/autopilot/`.

---

## 📞 Quick Step 3: Connect Your Live AI Demo Phone Number (Twilio / Vapi)

To give contractors the **"Live Proof In Call"** experience (dialing from their cell on the phone):

1. **Option A: Twilio + Vapi.ai / Bland.ai / Retell AI**:
   - Set up an inbound phone number in [Twilio](https://twilio.com) or [Vapi](https://vapi.ai).
   - In Vapi, configure the system prompt:
     > *"You are the 24/7 AI Receptionist for an elite HVAC contractor. Answer within 2 rings with a warm, professional tone. If the caller has an emergency (AC breakdown, furnace out), quote an $89 diagnostic fee that applies toward any repair and offer an arrival window for tomorrow between 8:00 AM and 10:00 AM. Collect their address and cell phone number."*
   - Paste that phone number into `config.js` under `demoPhoneNumber` (e.g., `"(888) 482-2247"`).
   
2. **Option B: Call Forwarding to Your Sales Line**:
   - If you want the number to ring straight to you or your team initially, simply put your direct business number in `config.js`.

---

## ⚡ Quick Step 4: Connecting the Territory Reservation Webhook

When a contractor enters their company name, zip code, and mobile phone to lock their territory, the form dispatches an automated payload to your `webhookUrl`:

```json
{
  "companyName": "Apex Heating & Air",
  "territoryZip": "75001",
  "fsmSystem": "ServiceTitan",
  "ownerName": "John Miller",
  "phone": "(555) 234-5678",
  "email": "john@apexair.com",
  "submittedAt": "2026-10-06T12:00:00.000Z",
  "offer": "The 24/7 HVAC Revenue Recovery Autopilot (Founding Partner)"
}
```

### How to receive this in GoHighLevel / Zapier / Make:
1. Create a new scenario/Zap with a **Custom Webhook trigger**.
2. Copy the Webhook URL (e.g. `https://hook.us1.make.com/...`).
3. Paste it into `config.js` in `webhookUrl`.
4. Connect the trigger to:
   - Send an immediate SMS to the owner: *"Hey John, we received your territory hold request for Apex Heating & Air (75001). Looking forward to our 15-min dial test!"*
   - Alert your internal sales slack channel or mobile phone.

---

## 🧪 Local Testing
To test the site locally on your computer:
- Double-click `index.html` to open in your browser, or
- Run `python -m http.server 8080` (or `npm start`) in your terminal and open `http://localhost:8080`.

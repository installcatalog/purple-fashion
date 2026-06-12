const APP_CONFIG = {
  // Basic brand
  brandName: "Purple Fashion",
  shortName: "Purple",
  logoText: "Purple Fashion",
  tagline: "Premium fashion collection",

  // Theme
  themeColor: "#8a2be2",
  themeDark: "#5b1a9c",
  themeSoft: "#f5edff",
  accentColor: "#d4af37",
  backgroundColor: "#f6f2ff",
  textColor: "#101827",

  // Common UI behaviour
  ui: {
    preventTextSelection: true
  },

  // API
  scriptApi: "https://script.google.com/macros/s/AKfycbwMQr_bHsvXvDGC0isJS1KLeHzVwMQtcLMlnvW9QONHxh1JP6BXEygmwku_P7YuA3rz2g/exec",

  // Seller contact
  sellerWhatsApp: "918777076542",
  growContactWhatsApp: "919836697502",
  sellerPhone: "8777076542",
  sellerEmail: "",
  shopAddress: "C/231 survey park , Kolkata, India, 700075",
  businessHours: "10 AM - 9 PM",

  // Payment
  payment: {
    enabled: true,
    paymentText: "Pay here",
    paymentLink: "YOUR_PAYMENT_LINK",
    qrImageUrl: ""
  },

  // Product settings
  productIdPrefix: "PF",
  currencySymbol: "Rs",
  defaultStock: "In Stock",
  defaultShow: "Yes",
  emptyImageUrl: "",

  // Category list can be changed per seller.
  categories: [
    "New Arrivals",
    "Saree",
    "Kurti",
    "Tops",
    "Palazzo",
    "Salwar",
    "Gown",
    "Nighty",
    "Western",
    "Kids",
    "Bedsheet",
    "Trendz"
  ],

  // Admin and hidden page security
  admin: {
    pinEnabled: true,
    usersAutoExitSeconds: 180,
    uploadAutoExitSeconds: 360,
    statusAutoExitSeconds: 50,
    labelAutoExitSeconds: 50,
    imageAutoExitSeconds: 50,
    wrongPinLimit: 5,
    wrongPinBlockHours: 24
  },

  // Sheet names
  sheets: {
    products: "Sheet1",
    users: "Users",
    orders: "Orders",
    adminLogs: "AdminLogs",
    userEvents: "UserEvents",
    stockRequests: "StockRequests",
    productIdHistory: "ProductIdHistory"
  },

  // Data cleanup rules
  retention: {
    adminLogsMaxRows: 200,
    userEventsKeepDays: 15,
    stockRequestsKeepDays: 30,
    ordersKeepDays: 60
  },

  // Install app prompt
  installPrompt: {
    title: "Install Purple Fashion",
    message: "Shop faster from your home screen",
    laterText: "Later",
    installText: "Install App"
  },

  // WhatsApp message defaults
  whatsappMessages: {
    productEnquiry: "Hi I am interested in this product",
    availabilityRequest: "Please inform me when this product is available",
    support: "Hi I need help with my order",
    grow: "Hi I want this seller app for my shop"
  }
};

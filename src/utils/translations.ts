// utils/translations.ts 
// Language type (inlined for web - originally from LanguageContext)
export type SupportedLanguage = 'en' | 'es' | 'ar' | 'zh';

interface TranslationKeys {
  // App General
  app: {
    name: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    done: string;
    ok: string;
    yes: string;
    no: string;
    authRequired: string;
  };

  // Tab Navigation
  tabs: {
    home: string;
    scan: string;
    manage: string;
    events: string;
    profile: string;
  };

  // Events
  events: {
    title: string;
    allEvents: string;
    following: string;
    myEvents: string;
    createEvent: string;
    eventTitle: string;
    description: string;
    importantDetails: string;
    startDate: string;
    endDate: string;
    industry: string;
    sector: string;
    location: string;
    save: string;
    cancel: string;
    delete: string;
    deleteConfirm: string;
    deleteSuccess: string;
    addToMyEvents: string;
    removeFromMyEvents: string;
    addedToMyEvents: string;
    removedFromMyEvents: string;
    visible: string;
    hidden: string;
    toggleVisibility: string;
    noEvents: string;
    noEventsForDate: string;
    noFollowingEvents: string;
    noMyEvents: string;
    bookmarked: string;
    rsvpd: string;
    noBookmarkedEvents: string;
    noRsvpdEvents: string;
    loadingEvents: string;
    eventDetail: string;
    postedBy: string;
    attendees: string;
    host: string;
    today: string;
    searchEvents: string;
    filterByIndustry: string;
    filterBySector: string;
    filterByTimeRange: string;
    timeRange_day: string;
    timeRange_week: string;
    timeRange_month: string;
    timeRange_year: string;
    filterByDate: string;
    filterByLocation: string;
    nearMe: string;
    searchCityOrZip: string;
    gettingLocation: string;
    locationPermissionDenied: string;
    allIndustries: string;
    allSectors: string;
    allCities: string;
    filterByCity: string;
    clearFilters: string;
    titleRequired: string;
    endDateAfterStart: string;
    descriptionRequired: string;
    eventCreated: string;
    eventCreateError: string;
    editEvent: string;
    eventUpdated: string;
    eventUpdateError: string;
    signInToCreate: string;
    signInToAdd: string;
    confirmDelete: string;
    tagPeople: string;
    tagCompanies: string;
    searchPeople: string;
    searchCompanies: string;
    taggedPeople: string;
    taggedCompanies: string;
    myCreatedEvents: string;
    noCreatedEvents: string;
    monthNames: string;
    dayNames: string;
    shareEvent: string;
    eventShared: string;
    rsvp: string;
    attending: string;
    rsvpSuccess: string;
    createPostFromEvent: string;
    viewEvent: string;
    sharedAnEvent: string;
    coverImage: string;
    addCoverImage: string;
    postCreated: string;
    postCreateError: string;
  };

  // Authentication
  auth: {
    signin: string;
    signup: string;
    signout: string;
    email: string;
    password: string;
    forgotPassword: string;
    createAccount: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    emailRequired: string;
    passwordRequired: string;
    invalidEmail: string;
    weakPassword: string;
    userNotFound: string;
    wrongPassword: string;
    emailAlreadyInUse: string;
    tooManyRequests: string;
    networkError: string;
  };
// Display Name Service
  displayName: {
    validation: {
      required: string;
      reserved: string;
      currentName: string;
      taken: string;
      temporarilyReserved: string;
      available: string;
      checkError: string;
      tooShort: string;
      tooLong: string;
      invalidCharacters: string;
      invalidFormat: string;
    };
    console: {
      savingToPermanent: string;
      successfullySaved: string;
      documentCreated: string;
      errorSaving: string;
      incrementedCounter: string;
      cannotIncrementCounter: string;
      errorIncrementingCounter: string;
      handlingUsernameChange: string;
      usernameChangeCompleted: string;
      failedToSaveNewUsername: string;
      errorHandlingUsernameChange: string;
      deletedOldUsername: string;
      cannotDeleteUsername: string;
      usernameNotFound: string;
      errorDeletingFromPermanent: string;
      fetchingAllSavedUsernames: string;
      unknown: string;
      foundSavedUsernames: string;
      errorGettingSavedUsernames: string;
      totalSavedUsernames: string;
      errorCountingSavedUsernames: string;
      usernameDeactivated: string;
      unauthorizedDeactivation: string;
      cleanupCompleted: string;
      exampleUsage: {
        title: string;
        saveUsername: string;
        seeAllSaved: string;
        getCount: string;
        testDatabase: string;
        collectionContains: string;
        documentId: string;
        usernameField: string;
        userIdField: string;
        userEmailField: string;
        savedAtField: string;
        isActiveField: string;
        sourceField: string;
      };
    };
  };
  // Network Screen
  network: {
    title: string;
    feedComingSoon: string;
    feedDescription: string;
    signInToCreatePosts: string;
    networkFeed: string;
    followingFeed: string;
    createPost: string;
    whatsHappening: string;
    searchPlaceholder: string;
    noPostsFound: string;
    noFriendsPostsYet: string;
    noConnectionsYet: string;
    startFollowing: string;
    adjustFilters: string;
    signInToSee: string;
    joinConversation: string;
    stories: string;
    addStory: string;
    viewStory: string;
    sharePost: string;
    bookmarkPost: string;
    likePost: string;
    commentOnPost: string;
    reportPost: string;
    hidePost: string;
    blockUser: string;
      followToSeeStories: string;
      postHasBeenDeleted: string;
      viewPost: string;

  };

  // Post Analytics
  postAnalytics: {
    title: string;
    views: string;
    likes: string;
    comments: string;
    shares: string;
    bookmarks: string;
    whoViewed: string;
    whoLiked: string;
    whoCommented: string;
    whoBookmarked: string;
    totalShares: string;
    noData: string;
  };

  // Manage Screen
  // Update the manage interface (around line 142)
manage: {
  title: string;
  browseBusinesses: string;
  manageBusiness: string;
  loading: string;
  services: string;
  messages: string;
  analytics: string;
  addService: string;
  editService: string;
  serviceName: string;
  serviceDescription: string;
  startingPrice: string;
  category: string;
  addImage: string;
  changeImage: string;
  noServicesFound: string;
  createFirstService: string;
  searchServices: string;
  searchBusinesses: string;
  allIndustries: string;
  messageCount: string;
  conversationsWillAppear: string;
  businessMessages: string;
  profileRequired: string;
  addDisplayName: string;
  accountType: string;
  everyone: string;
  businessesOnly: string;
  industries: string;
  sectors: string;
  location: string;
  applyFilters: string;
  resetFilters: string;
  searchFilter: string;
  cityOrZip: string;
  specialties: string;
  loadingServices: string;
  loadingPosts: string;
  loadingAnalytics: string;
  type: string;
  image: string;
  product: string;
  service: string;
  enterServiceName: string;
  describeService: string;
  enterPrice: string;
  enterCategory: string;
  serviceNameRequired: string;
  serviceDescriptionRequired: string;
  validPriceRequired: string;
  contactForPrice: string;
  pleaseSelectCategory: string;
  serviceUpdatedSuccessfully: string;
  serviceCreatedSuccessfully: string;
  failedToCreateService: string;
  failedToUpdateService: string;
  restrictVisibility: string;
  mediaActions: string;
  postArchived: string;
  postVisibilityRestricted: string;
  postDeleted: string;
  failedToArchive: string;
  failedToRestrict: string;
  failedToDelete: string;
  characterCount: string;
  noConversationsYet: string;
  messagesWillAppearHere: string;
  onlineStatus: string;
  offlineStatus: string;
  permissionRequiredCamera: string;
  grantCameraPermission: string;
  failed: string;
  tryAgainLater: string;
  conversationStarted: string;
  failedToStartConversation: string;
  authenticationRequired: string;
  pleaseSignInToStart: string;
  selectFromPhotoLibrary: string;
  noDataAvailable: string;
  lastActive: string;
  startConversation: string;
  allCategories: string;
  viewProfile: string;
  businessProfile: string;
  timeline: string;
  servicesAndProducts: string;
  noServicesYet: string;
  createYourFirst: string;
  selectMedia: string;
  removeMedia: string;
  mediaSelected: string;
  pleaseEnterValidPrice: string;
  categoryRequired: string;
  verified: string;
  moreSpecialties: string;
  businessHours: string;
  established: string;
  viewFullProfile: string;
  getDirections: string;
  business: string;
  businesses: string;
  confirmDeleteService: string;  // ← ADD THIS
  serviceDeletedSuccessfully: string;
  allLocations: string;
  allSpecialties: string;
  moreFilters: string;
  anyRating: string;
  minRating: string;
  locationRadius: string;
  useMyLocation: string;
  searchAddress: string;
  gettingLocation: string;
  searchLocationPlaceholder: string;
  radius: string;
  adjustFilters: string;
};
 notifications: {
    notifications: string;
    all: string;
    posts: string;
    stories: string;
    follows: string;
    network: string;
    pending: string;
    connections: string;
    incoming: string;
    outgoing: string;
    cancelRequest: string;
    requestSent: string;
    noNetworkActivity: string;
    noIncomingRequests: string;
    noOutgoingRequests: string;
    messages: string;
    markAllRead: string;
    markRead: string;
    markUnread: string;
    actions: string;
    chooseAction: string;
    deleteConfirm: string;
    deleteConfirmMessage: string;
    allMarkedRead: string;
    noNotifications: string;
    noNotificationsSubtext: string;
    noConversations: string;
    recentConversations: string;
    liked: string;
    commented: string;
    shared: string;
    followed: string;
    viewedStory: string;
    sentMessage: string;
  };
// Profile Screen
profile: {
  title: string;
  editProfile: string;
  accountSettings: string;
  privacy: string;
  help: string;
  about: string;
  signOut: string;
  profilePicture: string;
  displayName: string;
  businessName: string;
  bio: string;
  website: string;
  phone: string;
  address: string;
  saveChanges: string;
  discardChanges: string;
  followersCount: string;
  followingCount: string;
  postsCount: string;
  follow: string;
  unfollow: string;
  following: string;
  pendingConnection: string;
  acceptConnection: string;
  declineConnection: string;
  cancelRequest: string;
  connectionRequest: string;
  connectionAccepted: string;
  message: string;
  viewLocation: string;
  contactInfo: string;
  businessHours: string;
  established: string;
  verified: string;
  individual: string;
  business: string;
  selectCategory: string;
  selectSpecialties: string;
  chooseAllThatApply: string;
  selected: string;
  // ADD THESE NEW PROPERTIES TO THE INTERFACE:
  loading: string;
  createProfile: string;
  welcomeToProfile: string;
  createAccountToAccess: string;
  letsBegin: string;
  unsavedChanges: string;
  unsavedChangesMessage: string;
  discard: string;
  myProfile: string;
  userProfile: string;
  addCoverPhoto: string;
  userName: string;
  yourName: string;
  required: string;
  enterUsername: string;
  enterRealName: string;
  enterDisplayName: string;
  enterBusinessName: string;
  tellUsAboutYourself: string;
  tellUsAboutBusiness: string;
  industry: string;
  currentPosition: string;
  sectors: string;
  noneSelected: string;
  contactInformation: string;
  businessAddress: string;
  searchForAddress: string;
  getPreciseLocation: string;
  selectedAddress: string;
  locationForNetworking: string;
  selectedLocation: string;
  searchForLocation: string;
  useGpsLocation: string;
  enterManually: string;
  locationDetails: string;
  preciseLocationAvailable: string;
  educationAcademicBackground: string;
  degreeCertification: string;
  schoolUniversity: string;
  graduationYear: string;
  gpa: string;
  additionalEducation: string;
  academicAwardsHonors: string;
  professionalCertifications: string;
  volunteerWorkCommunity: string;
  publicationsResearch: string;
  additionalInformation: string;
  businessDetails: string;
  keySkills: string;
  languages: string;
  professionalInterests: string;
  otherRelevantInformation: string;
  yearEstablished: string;
  logout: string;
  areYouSureLogout: string;
  usernameNotAvailable: string;
  displayNameNotAvailable: string;
  availableAlternatives: string;
  use: string;
  searchAddress: string;
  findExactAddress: string;
  startTypingAddress: string;
  startWithStreetNumber: string;
  selectingAddressProvidesGPS: string;
  selectCoverPhoto: string;
  selectLogo: string;
  chooseFromGallery: string;
  selectFromPhotoLibrary: string;
  invalidUrl: string;
  unableToOpenWebsite: string;
  checkUrlFormat: string;
  copyUrl: string;
  urlCopied: string;
  offlineMode: string;
  profileSavedLocally: string;
  saveFailed: string;
  authenticationError: string;
  signInAgain: string;
  success: string;
  profileSavedSuccessfully: string;
  manualEntry: string;
  enterBusinessAddress: string;
  enterYourLocation: string;
  addressSelected: string;
  addressUpdatedWithLocation: string;
  failedToProcessAddress: string;
  phoneFormat: string;
  enterWebsiteUrl: string;
  degreeExample: string;
  universityExample: string;
  graduationYearExample: string;
  gpaExample: string;
  businessHoursExample: string;
  additionalEducationPlaceholder: string;
  academicAwardsPlaceholder: string;
  certificationsPlaceholder: string;
  volunteerWorkPlaceholder: string;
  publicationsPlaceholder: string;
  keySkillsPlaceholder: string;
  languagesPlaceholder: string;
  professionalInterestsPlaceholder: string;
  otherRelevantPlaceholder: string;
currentPositionPlaceholder: string;
gpaPlaceholder: string;
removeLocation: string;
  locationRemoved: string;
  businessAddressRemoved: string;
  locationCleared: string;
  preciseLocationWithGPS: string;
  manualEntryNoGPS: string;
  
  // ✅ ADD THESE NEW PROPERTIES FOR ENHANCED ADDRESS STATUS:
  addressDetailsTitle: string;
  locationDetailsTitle: string;
  coordinatesLabel: string;
  googlePlaceIdLabel: string;
  manualEntryLabel: string;
  
  // ✅ ADD THESE NEW PROPERTIES FOR ENHANCED SEARCH:
  searchAddressPlaceholder: string;
  noResultsFound: string;
  searchError: string;
  
  // ✅ ADD THESE NEW PROPERTIES FOR API/NETWORK ERRORS:
  apiKeyNotConfigured: string;
  networkError: string;
  requestTimeout: string;
  rateLimitExceeded: string;
  requestDenied: string;
  requiredFieldsProgress: string;
  fieldsRemaining: string;
  // Multi-location support
  multipleLocations: string;
  multipleLocationsDescription: string;
  addLocation: string;
  locationName: string;
  locationNamePlaceholder: string;
  locationPhone: string;
  locationBusinessHours: string;
  locationAddress: string;
  additionalLocations: string;
  editLocation: string;
  deleteLocation: string;
  deleteLocationConfirm: string;
  deleteLocationMessage: string;
  locationAdded: string;
  locationUpdated: string;
  locationDeleted: string;
  noAdditionalLocations: string;
  addYourFirstLocation: string;
  usePrimaryIfBlank: string;
};

  // Scan Screen
scan: {
  title: string;
  searchLocation: string;
  nearbyBusinesses: string;
  mapView: string;
  listView: string;
  directions: string;
  callBusiness: string;
  visitWebsite: string;
  noBusinessesNearby: string;
  locationPermission: string;
  enableLocation: string;
  searchRadius: string;
  filterByCategory: string;
  miles: string;
  kilometers: string;
  searchBusinesses: string;
  measure: string;
  edit: string;
  area: string;
  perimeter: string;
  points: string;
  method: string;
  manual: string;
  gps: string;
  notes: string;
  created: string;
  unknown: string;
  savedFields: string;
  loadingFields: string;
  manualDrawing: string;
  gpsWalking: string;
  tapToView: string;
  noFieldsSaved: string;
  tapMeasureToStart: string;
  businesses: string;
  found: string;
  more: string;
  locationNotSpecified: string;
  tapToViewProfile: string;
  pleaseSignInToDiscover: string;
  loadingMap: string; // ADD THIS LINE
  specialties: string;
signInRequired: string;
mapStandard: string;
mapSatellite: string;
mapHybrid: string;
};
// Categories Translation
// Categories Translation
categories: {
  // Existing simple categories
  agriculture: string;
  automotive: string;
  construction: string;
  technology: string;
  foodBeverage: string;
  retail: string;
  services: string;
  healthcare: string;
  education: string;
  finance: string;
  realEstate: string;
  manufacturing: string;
  transportation: string;
  entertainment: string;
  consulting: string;
  
  // New profile categories
  creativeMedia: string;
  educationTraining: string;
  energyEnvironment: string;
  foodBeverageServices: string;
  healthcareWellness: string;
  manufacturingIndustrial: string;
  professionalFinancial: string;
  propertyMaintenance: string;
  retailConsumer: string;
  technologyDigital: string;
  transportationLogistics: string;
  travel: string;
  governmentPublicServices: string;
  venue: string;
};

// Specialties Translation (expanded)
specialties: {
  // Existing
  organicFarming: string;
  cropManagement: string;
  livestock: string;
  pestControl: string;
  soilManagement: string;
  irrigation: string;
  harvesting: string;
  seedSupply: string;
  fertilizers: string;
  equipmentRental: string;
  realEstate: string;
  consulting: string;
  supplies: string;
  manager: string;
  automotive: string;
  
  // Agriculture specialties
  agriculturalEquipment: string;
  agriculturalEquipmentRetail: string;
  agriculturalServices: string;
  agriculturalSupply: string;
  cropNutritionProtection: string;
  farming: string;
  farmLabor: string;
  farmManagement: string;
  farmSupply: string;
  fertilizer: string;
  irrigationServicesSupply: string;
  pesticides: string;
  veterinaryServicesSupply: string;
  vineyards: string;
  rawMaterials: string;
  agricultureLab: string;
  fieldTrials: string;
  dairy: string;
  dairyServices: string;
  agricultureRealEstate: string;
  cropInsurance: string;
  assetManagement: string;

  // Creative & Media
  audioEngineering: string;
  contentCreation: string;
  design: string;
  filmVideo: string;
  musicProduction: string;
  photography: string;
  writingPublishing: string;
  newsCurrentEventsJournalism: string;

  // Education & Training
  commercialConstruction: string;
  constructionTrades: string;
  corporateTraining: string;
  educationalServices: string;
  formalEducation: string;
  government: string;
  library: string;
  nonProfits: string;
  residentialConstruction: string;
  socialServices: string;
  specializedTrades: string;
  university: string;
  highSchool: string;
  juniorCollege: string;

  // Energy & Environment
  analysis: string;
  energy: string;
  environment: string;
  utilities: string;
  waterServices: string;
  
  // Food & Beverage Services
  barsNightlife: string;
  cafe: string;
  coffeeShops: string;
  foodServices: string;
  restaurants: string;
  
  // Healthcare & Wellness
  barbershop: string;
  dentalServices: string;
  fitness: string;
  hairNailSalon: string;
  healthcareProviders: string;
  massageParlor: string;
  medicalDevices: string;
  mentalHealth: string;
  nutrition: string;
  pharmaceuticals: string;
  physicalTherapy: string;
  spa: string;
  wellness: string;
  
  // Manufacturing & Industrial
  aerospace: string;
  chemicals: string;
  foodBeverageManufacturing: string;
  hydraulicServicesParts: string;
  industrial: string;
  textiles: string;
  constructionAggregates: string;

  // Professional & Financial Services
  accounting: string;
  architectureDesign: string;
  engineering: string;
  financialServices: string;
  legalServices: string;
  marketingAdvertising: string;
  healthInsurance: string;
  autoInsurance: string;
  homeInsurance: string;
  financialManagement: string;
  financialAnalysis: string;
  assetProtection: string;
  propertyManagement: string;

  // Property Maintenance
  autoDetailing: string;
  electrical: string;
  handyMan: string;
  hvac: string;
  landscaping: string;
  lawnCare: string;
  pressureWashing: string;
  wasteRemoval: string;

  // Retail & Consumer Goods
  apparel: string;
  automotiveRentals: string;
  automotiveRetail: string;
  beauty: string;
  bookstore: string;
  carAudio: string;
  carWash: string;
  electronics: string;
  electronicsRetail: string;
  gardening: string;
  hardware: string;
  homeGoods: string;
  specialtyRetail: string;
  tools: string;
  westernWear: string;
  workWear: string;
  
  // Technology & Digital
  aiMachineLearning: string;
  blockchain: string;
  cloudComputing: string;
  cybersecurity: string;
  dataAnalytics: string;
  ecommercePlatforms: string;
  edtech: string;
  fintech: string;
  gaming: string;
  hardwareElectronics: string;
  healthtech: string;
  itServices: string;
  softwareSaas: string;
  telecommunications: string;
  webDevelopment: string;
  
  // Transportation & Logistics
  batteryServices: string;
  equipmentTransportation: string;
  logistics: string;
  roadside: string;
  shipping: string;
  tireServices: string;
  towServices: string;
  repossessionServices: string;

  // Travel
  accommodation: string;
  hospitality: string;
  airTravel: string;
  hotel: string;
  rvPark: string;
  busTransportation: string;
  trainTransportation: string;

  // Transportation & Logistics (storage)
  packagingWarehouse: string;
  coldStorage: string;
  storageWarehouse: string;
  miniStorage: string;
  rvStorage: string;
  boatStorage: string;

  // Retail & Consumer Goods (additional)
  rentals: string;
  cosmetics: string;
  generalProducts: string;
  partsSupply: string;
  artsCrafts: string;

  // Venue
  ballroom: string;
  conventionCenter: string;
  eventHall: string;
  privateVenue: string;
  stadium: string;
};

// Consent & Privacy Compliance (ConsentManager + SettingsScreen)
consent: {
  // ConsentManager - Age Verification
  ageVerification: string;
  ageVerificationDesc: string;
  over13: string;
  under13: string;
  ageRestriction: string;
  mustBe13: string;
  coppaNotice: string;
  confirmAge: string;
  
  // ConsentManager - Region Selection
  yourLocation: string;
  locationDesc: string;
  europeanUnion: string;
  unitedStates: string;
  otherRegion: string;
  applies: string;
  mayApply: string;
  standardPrivacy: string;
  californiaQuestion: string;
  californiaQuestionDesc: string;
  
  // ConsentManager - Consent Form
  privacyConsent: string;
  privacyChoices: string;
  gdprDesc: string;
  ccpaDesc: string;
  standardDesc: string;
  essentialNotice: string;
  dataProcessingPreferences: string;
  customizeExperience: string;
  
  // Consent Options
  essential: string;
  required: string;
  essentialDesc: string;
  analytics: string;
  analyticsDesc: string;
  analyticsData: string;
  crashReports: string;
  crashReportsDesc: string;
  crashData: string;
  performance: string;
  performanceDesc: string;
  performanceData: string;
  marketing: string;
  marketingDesc: string;
  marketingData: string;
  dataCollected: string;
  tracking: string;
  trackingDesc: string;
  personalization: string;
  personalizationDesc: string;
  
  // Actions
  acceptAll: string;
  rejectNonEssential: string;
  rejectAll: string;
  savePreferences: string;
  readPrivacyPolicy: string;
  privacyPolicy: string;
  privacyPolicyDesc: string; // ✅ ADD THIS - MISSING!
  privacyPolicyFull: string;
  acceptSelected: string;
  declineAll: string;
  
  // Legal Documents
  legalDocuments: string;
  legalDocumentsDesc: string; // ✅ ADD THIS - MISSING!
  termsOfService: string;
  termsDesc: string; // ✅ ADD THIS - MISSING!
  byAccepting: string;
  
  // Rights
  gdprRights: string;
  ccpaRights: string;
  standardRights: string;
  yourRights: string;
  gdprRightsDesc: string;
  ccpaRightsDesc: string;
  standardRightsDesc: string;
  rightsDescription: string;
  
  // Messages
  errorSaving: string;
  
  // SettingsScreen - Status
  consentStatus: string;
  consentGiven: string;
  consentDate: string;
  region: string;
  
  // SettingsScreen - Data Processing
  dataProcessing: string;
  dataProcessingDesc: string;
  active: string;
  inactive: string;
  
  // SettingsScreen - User Rights
  exportData: string;
  exportDataShort: string;
  deleteAllData: string;
  deleteAllDataShort: string;
  
  // SettingsScreen - CCPA
  ccpaOptions: string;
  doNotSell: string;
  doNotSellDesc: string;
  
  // SettingsScreen - Revoke
  revokeAll: string;
  revokeAllConfirm: string;
  revokeAllNote: string;
  allConsentRevoked: string;
  
  // SettingsScreen - Messages
  consentEnabled: string;
  consentDisabled: string;
  updateFailed: string;
  requestReceived: string;
  revokeFailed: string;
  
  // SettingsScreen - Info
  whyThisMatters: string;
  whyThisMattersDesc: string;
  
  // ConsentManager - Additional
  welcomeTitle: string;
  introTitle: string;
  introText: string;
  continue: string;
  dataWeCollect: string;
  disclosureProfile: string;
  disclosureUsage: string;
  disclosureCrash: string;
  settingsDataSummary: string;
  profileDataDesc: string;
  usageDataDesc: string;
  crashDataDesc: string;
  noTracking: string;
  noTrackingDesc: string;
};
  // Settings Screen
settings: {
  title: string;
  loading: string;
  general: string;
  accounts: string;
  activity: string;
  blocked: string;
  privacy: string;
  language: string;
  
  // Account Management
  accountManagement: string;
  accountManagementDesc: string;
  activeAccount: string;
  allAccounts: string;
  addAccount: string;
  switchAccount: string;
  removeAccount: string;
  individual: string;
  business: string;
  lastActive: string;
  followers: string;
  following: string;
  
  // NEW Account Management Keys
  enterEmailPassword: string;
  switchedToAccount: string;
  accountAdded: string;
  accountAddedDesc: string;
  closeSettings: string;
  accountOperationFailed: string;
  noAccountFound: string;
  incorrectPassword: string;
  invalidEmail: string;
  tooManyAttempts: string;
  operationFailed: string;
  accountNotFound: string;
  switchAccountConfirm: string;
  removeAccountConfirm: string;
  accountRemovedSuccess: string;
  accountRemovalFailed: string;
  currentUser: string;
  businessAccount: string;
  individualAccount: string;
  userAccount: string;
  switchingAccounts: string;
  loadingLanguage: string;
  accountFeatures: string;
  rememberLogin: string;
  quickSwitch: string;
  savedLoginExpired: string;
  savedLoginExpiredDesc: string;
  forgetSavedLogin: string;
  forgetSavedLoginConfirm: string;
  forget: string;

  // Activity
  yourActivity: string;
  yourActivityDesc: string;
  networkConnections: string;
  networkConnectionsDesc: string;
  contentEngagement: string;
  contentEngagementDesc: string;
  peopleFollowingYou: string;
  peopleYouFollow: string;
  postsCreated: string;
  likesGiven: string;
  commentsPosted: string;
  postsSaved: string;
  noActivityYet: string;
  justNow: string;
  viewPost: string;
  showDeleted: string;
  showArchived: string;
  recentActivities: string;
  noRecentActivities: string;
  
  // NEW Activity Keys
  activityManagement: string;
  activityDeleteFailed: string;
  activityArchiveFailed: string;
  aPost: string;
  aBusiness: string;
  someone: string;
  
  // Language Settings
  languageSettings: string;
  languageSettingsDesc: string;
  currentLanguage: string;
  selectLanguage: string;
  languageChanged: string;
  restartRequired: string;
  
  // NEW Language Keys
  languageChangeFailed: string;
  languageSupport: string;
  languageSupportDesc: string;
  activeLabel: string;
  
  // Blocking
  blockedUsers: string;
  blockedUsersDesc: string;
  blockUser: string;
  unblockUser: string;
  searchUsers: string;
  searchUsersPlaceholder: string;
  noUsersFound: string;
  tryDifferentSearch: string;
  searchForUsers: string;
  startTyping: string;
  blockConfirm: string;
  unblockConfirm: string;
  userBlocked: string;
  userUnblocked: string;
  blockedDate: string;
  
  // NEW Blocking Keys
  unknownUser: string;
  blockedByUser: string;
  blockUserFailed: string;
  unblockUserFailed: string;
  reason: string;
  searchUsersToBlock: string;
  
  // Privacy
  privacySettings: string;
  privacySettingsDesc: string;
  profileVisibility: string;
  profileVisibilityDesc: string;
  public: string;
  friendsOnly: string;
  private: string;
  publicDesc: string;
  friendsOnlyDesc: string;
  privateDesc: string;
  clearAllData: string;
  clearAllDataDesc: string;
  privacyFeaturesComing: string;
  privacyFeaturesDesc: string;
  
  // Sound Effects
  soundEffects: string;
  soundEffectsDesc: string;
  enableSounds: string;

  // NEW Privacy Keys
  privacySettingsUpdated: string;
  privacySettingsFailed: string;
  deleteAllData: string;
  featureComingSoon: string;
  featureComingSoonDesc: string;
  
  // NEW Modal Keys
  signInExistingAccount: string;
  signIn: string;
  createAccount: string;
  createNewAccountDesc: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  passwordMinLength: string;
  passwordsDoNotMatch: string;
  accountCreated: string;
  accountCreatedDesc: string;
  createAccountFailed: string;
  emailAlreadyInUse: string;
  weakPassword: string;
  networkError: string;
  enterEmailAddress: string;
  enterPassword: string;
};

  // Business Profile
  businessProfile: {
    timeline: string;
    services: string;
    posts: string;
    media: string;
    loadingServices: string;
    loadingPosts: string;
    loadingMedia: string;
    noServicesAvailable: string;
    noPostsAvailable: string;
    noMediaPosted: string;
    contactInformation: string;
    email: string;
    phone: string;
    website: string;
    education: string;
    achievements: string;
    additionalInfo: string;
    businessDetails: string;
    degree: string;
    university: string;
    graduationYear: string;
    gpa: string;
    academicAwards: string;
    certifications: string;
    volunteerWork: string;
    publications: string;
    keySkills: string;
    languages: string;
    professionalInterests: string;
    otherInformation: string;
    profilePrivate: string;
    limitedProfileView: string;
    followToSeeMore: string;
    searchServices: string;
    allCategories: string;
    noServicesMatch: string;
    clearFilters: string;
    more: string;
    less: string;
    sortNewest: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortName: string;
    messageSeller: string;
    isStillAvailable: string;
    whatsLowestPrice: string;
    canYouDeliver: string;
    imInterested: string;
    free: string;
};

  // Comments System
  comments: {
    comments: string;
    addComment: string;
    reply: string;
    like: string;
    loadingComments: string;
    noCommentsYet: string;
    beFirstToComment: string;
    replyingTo: string;
    cancelReply: string;
    postComment: string;
    showReplies: string;
    hideReplies: string;
  };

  // Rating System
  rating: {
    rateThis: string;
    yourRating: string;
    averageRating: string;
    totalReviews: string;
    noReviews: string;
    ratingSubmitted: string;
    thankYouRating: string;
    showDetails: string;
    hideDetails: string;
    writeReview: string;
    readReviews: string;
  };

  // Stories
  stories: {
  stories: string;
  yourStory: string;
  addStory: string;
  viewStory: string;
  recordVideo: string;
  chooseFromGallery: string;
  storyExpires24h: string;
  noStoriesYet: string;
  watchStory: string;
  skipStory: string;
  storyUnavailable: string;
  // ADD THESE NEW KEYS:
  preview: string;
  reRecord: string;
  storyInfo: string;
  shareAgriculturalWorld: string;
  startRecording: string;
  recordVideoFirst: string;
  storyPosted: string;
  videoTooLarge: string;
  createStory: string;
  sharePhotoOrVideo: string;
  takePhoto: string;
  selectDuration: string;
  displayFor: string;
  continueEditing: string;
  storyInfoPhotoVideo: string;
  selectMediaFirst: string;
};

  // Messaging
  messaging: {
    messages: string;
    conversation: string;
    typeMessage: string;
    send: string;
    online: string;
    offline: string;
    delivered: string;
    read: string;
    startConversation: string;
    conversationStarted: string;
    noMessages: string;
    loadingMessages: string;
    messageFailed: string;
    tryAgain: string;
  };

  // Create Post
  createPost: {
  createPost: string;
  whatsOnMind: string;
  addPhoto: string;
  addVideo: string;
  camera: string;
  gallery: string;
  publish: string;
  saveDraft: string;
  discardPost: string;
  publishingPost: string;
  postPublished: string;
  addMedia: string;
  removeMedia: string;
  characterCount: string;
  maxCharacters: string;
  // ADD THESE NEW PROPERTIES:
  editPost: string;
  deletePost: string;
  deleteConfirm: string;
};

  // Search and Filters
  search: {
  search: string;
  searchAndFilter: string;
  reset: string;
  noResults: string;
  tryDifferent: string;
  searching: string;
  filterBy: string;
  sortBy: string;
  location: string;
  category: string;
  rating: string;
  distance: string;
  recent: string;
  popular: string;
  nearest: string;
  name: string;
  allSectors: string; // ADD THIS LINE
};

  // Activity Types
  activities: {
    liked: string;
    comment: string;
    reviewed: string;
    following: string;
    saved: string;
    created: string;
    viewed: string;
    createdPost: string;
    profileViewed: string;
    someoneViewed: string;
    startedConversation: string;
    sentMessage: string;
    postedComment: string;
    photoAttached: string;
    videoAttached: string;
    archive: string;
    archived: string;
    deleteActivity: string;
    deleteConfirm: string;
  };

// Around line 939 in your TranslationKeys interface
moderation: {
  reportPost: string;
  hidePost: string;
  blockUser: string;
  reportUser: string;
  spam: string;
  harassment: string;
  inappropriateContent: string;
  misinformation: string;
  other: string;
  reportSubmitted: string;
  postHidden: string;
  userBlocked: string;
  postReported: string;
  alreadyReported: string;
  underReview: string;
  postActions: string;
  chooseAction: string;
  reportReasonTitle: string;
  cannotReportOwnPost: string;
  reportDetailsTitle: string;
  reportDetailsPrompt: string;
  submit: string;
  pleaseProvideReason: string;
  reportThankYou: string;
  alreadyReportedDetailed: string;
  reportSubmissionFailed: string;
  hidePostConfirm: string;
  hide: string;
  postHiddenSuccess: string;
  hidePostFailed: string;
  cannotBlockSelf: string;
  blockConfirmMessage: string;
  block: string;
  userBlockedSuccess: string;
  blockUserFailed: string;
  
  // ADD ALL THESE NEW PROPERTIES:
  whyReporting: string;
  reportAnonymous: string;
  describeIssue: string;
  describePlaceholder: string;
  submitReport: string;  // <-- This was missing
  whatHappensHide: string;
  postDisappears: string;
  authorNotNotified: string;
  canUnhideSettings: string;
  canSeeReplies: string;
  lookingSomethingElse: string;
  considerReporting: string;
  hideThisPost: string;
  hideDescription: string;
  blockThisUser: string;
  ifYouBlock: string;
  seeTheirPosts: string;
  sendReceiveMessages: string;
  seeProfile: string;
  getNotifications: string;
  noteBlock: string;
};

  // Share
  share: {
    title: string;
    searchPlaceholder: string;
    selected: string;
    send: string;
    shareExternally: string;
    success: string;
    selectRecipients: string;
    noFollowers: string;
    sending: string;
    sharedPost: string;
  };

  // Analytics
  analytics: {
    analytics: string;
    overview: string;
    profileViews: string;
    postEngagement: string;
    followers: string;
    reach: string;
    impressions: string;
    clicks: string;
    saves: string;
    shares: string;
    comments: string;
    likes: string;
    growthRate: string;
    mostActiveFollowerTime: string;
    recentActivity: string;
    noDataYet: string;
    lastDays: string;
    thisWeek: string;
    thisMonth: string;
    peakHours: string;
  };

  // Common UI Elements
  ui: {
  search: string;
  searching: string;
  noResults: string;
  loading: string;
  refresh: string;
  pullToRefresh: string;
  endOfResults: string;
  tryAgain: string;
  somethingWentWrong: string;
  checkConnection: string;
  restartApp: string;
  seeMore: string;
  seeLess: string;
  showAll: string;
  collapse: string;
  expand: string;
  // ADD THESE NEW PROPERTIES TO THE INTERFACE:
  precise: string;
  coordinates: string;
  manualEntry: string;
  notSet: string;
};

  // Time & Dates
  time: {
    now: string;
    today: string;
    yesterday: string;
    thisWeek: string;
    thisMonth: string;
    daysAgo: string;
    weeksAgo: string;
    monthsAgo: string;
    minutesAgo: string;
    hoursAgo: string;
    at: string;
    am: string;
    pm: string;
  };

  // Error Messages
  // Error Messages
errors: {
  networkError: string;
  serverError: string;
  unknownError: string;
  tryAgainLater: string;
  invalidInput: string;
  fieldRequired: string;
  emailInvalid: string;
  passwordTooShort: string;
  fileTooLarge: string;
  unsupportedFormat: string;
  uploadFailed: string;
  permissionDenied: string;
  locationDisabled: string;
  cameraUnavailable: string;
  // ADD THESE NEW PROPERTIES TO THE INTERFACE:
  validationError: string;
  userNameRequired: string;
  yourNameRequired: string;
  displayNameRequired: string;
  businessNameRequiredBusiness: string;
  bioRequired: string;
  selectIndustry: string;
  selectCategory: string;
  emailRequiredIndividual: string;
  validWebsiteRequired: string;
  permissionRequired: string;
  grantPhotoPermission: string;
  imageUploadSuccess: string;
  locationPermissionNeeded: string;
  callNotAvailable: string;
  callingNotAvailable: string;
  copyNumber: string;
  phoneNumber: string;
  unableToMakeCall: string;
  navigationError: string;
  unableToNavigate: string;
  addressRequired: string;
  completeProfileFirst: string;
  completeProfileMessage: string;
};

  // Newsletter
  newsletter: {
    // Opt-in Modal
    title: string;
    subtitle: string;
    features: {
      personalized: string;
      personalizedDesc: string;
      monthly: string;
      monthlyDesc: string;
      unsubscribe: string;
      unsubscribeDesc: string;
    };
    subscribe: string;
    maybeLater: string;
    stayConnected: string;
    getPersonalized: string;
    featurePosts: string;
    featureBusinesses: string;
    featureProducts: string;
    featureCommunity: string;
    sentMonthly: string;
    maybeNextTime: string;
    canSubscribeLater: string;

    // Preferences Flow
    selectIndustries: string;
    industriesDesc: string;
    selectSectors: string;
    sectorsDesc: string;
    selectLocations: string;
    locationsDesc: string;
    selectProfileTypes: string;
    profileTypesDesc: string;
    profileTypeIndividual: string;
    profileTypeBusiness: string;
    selectContentTypes: string;
    contentTypesDesc: string;
    contentTypePosts: string;
    contentTypeMedia: string;
    contentTypeProducts: string;
    contentTypeServices: string;
    addInterests: string;
    interestsDesc: string;
    interestPlaceholder: string;
    noInterestsYet: string;
    suggestedInterests: string;

    // Location
    addMyLocation: string;
    addLocation: string;
    enterLocation: string;
    searchCity: string;
    searchLocation: string;
    locationsAdded: string;
    noLocationSet: string;
    receiveFrom: string;
    city: string;
    state: string;
    country: string;

    // Selection
    selected: string;
    sectorsSelected: string;
    noIndustriesSelected: string;

    // Validation
    selectAtLeastOneIndustry: string;
    selectAtLeastOneSector: string;
    selectAtLeastOneLocation: string;
    selectAtLeastOneProfileType: string;
    selectAtLeastOneContentType: string;
    selectAtLeastOneInterest: string;

    // Consent
    consentTitle: string;
    consentText: string;
    agreeToReceive: string;
    privacyPolicy: string;
    termsOfService: string;

    // Navigation
    skip: string;
    continue: string;
    completeSubscription: string;
    savePreferences: string;

    // Settings
    settings: string;
    settingsTitle: string;
    subscribedTitle: string;
    subscribed: string;
    notSubscribed: string;
    inactive: string;
    subscribedSince: string;
    lastEmailSent: string;
    editPreferences: string;
    manageSubscription: string;
    unsubscribeConfirm: string;
    unsubscribeConfirmMessage: string;
    resubscribe: string;
    subscribeNow: string;
    subscriptionUpdated: string;
    preferencesUpdated: string;
    never: string;
    unsubscribeTitle: string;
    unsubscribe: string;
    unsubscribedTitle: string;
    unsubscribedMessage: string;
    unsubscribeError: string;
    resubscribedTitle: string;
    resubscribedMessage: string;
    resubscribeError: string;
    preferencesUpdatedTitle: string;
    preferencesUpdatedMessage: string;
    subscribedMessage: string;
    saveError: string;
    active: string;
    lastSent: string;
    frequency: string;
    yourPreferences: string;
    noPreferences: string;

    // Summary
    industries: string;
    sectors: string;
    locations: string;
    profileTypes: string;
    contentTypes: string;
    allLocations: string;
  };

  // Common
  common: {
    cancel: string;
    save: string;
    error: string;
  };

  // Industries
  industries: {
    agriculture: string;
    automotive: string;
    construction: string;
    creativeMedia: string;
    educationTraining: string;
    energyEnvironment: string;
    foodBeverage: string;
    governmentPublicServices: string;
    healthcareWellness: string;
    manufacturingIndustrial: string;
    professionalFinancial: string;
    propertyMaintenance: string;
    retailConsumer: string;
    technologyDigital: string;
    transportationLogistics: string;
    travel: string;
    venue: string;
  };

  // Sectors
  sectors: {
    // Agriculture
    farming: string;
    agriculturalEquipment: string;
    cropNutrition: string;
    cropProtection: string;
    irrigation: string;
    livestockFeed: string;
    organicAgriculture: string;
    seedDevelopment: string;
    agriculturalTechnology: string;
    landManagement: string;
    animalHusbandry: string;
    agriculturalConsulting: string;
    soilManagement: string;
    harvestingServices: string;
    // Creative & Media
    photography: string;
    videography: string;
    graphicDesign: string;
    contentCreation: string;
    socialMediaManagement: string;
    marketing: string;
    advertising: string;
    branding: string;
    eventPlanning: string;
    musicProduction: string;
    filmProduction: string;
    webDesign: string;
    illustration: string;
    animation: string;
    publishing: string;
    publicRelations: string;
    // Education & Training
    k12Education: string;
    higherEducation: string;
    vocationalTraining: string;
    onlineCourses: string;
    tutoring: string;
    educationalTechnology: string;
    corporateTraining: string;
    languageEducation: string;
    testPreparation: string;
    specialEducation: string;
    earlyChildhoodEducation: string;
    // Energy & Environment
    solarEnergy: string;
    windEnergy: string;
    hydroelectric: string;
    biofuels: string;
    environmentalConsulting: string;
    wasteManagement: string;
    recycling: string;
    carbonManagement: string;
    energyEfficiency: string;
    sustainableDesign: string;
    // Food & Beverage Services
    restaurants: string;
    catering: string;
    foodProduction: string;
    beverageManufacturing: string;
    foodDistribution: string;
    specialtyFoods: string;
    organicFoods: string;
    foodTechnology: string;
    farmToTable: string;
    foodSafetyConsulting: string;
    bakery: string;
    brewery: string;
    // Healthcare & Wellness
    medicalPractice: string;
    dentalCare: string;
    mentalHealth: string;
    physicalTherapy: string;
    alternativeMedicine: string;
    nutritionConsulting: string;
    fitnessTraining: string;
    spaServices: string;
    seniorCare: string;
    homeHealthcare: string;
    medicalEquipment: string;
    pharmaceuticals: string;
    veterinaryServices: string;
    // Manufacturing & Industrial
    heavyMachinery: string;
    electronicsManufacturing: string;
    textiles: string;
    plastics: string;
    metalFabrication: string;
    automotiveParts: string;
    packaging: string;
    chemicalProduction: string;
    industrialEquipment: string;
    qualityControl: string;
    processEngineering: string;
    // Professional & Financial Services
    accounting: string;
    legalServices: string;
    financialPlanning: string;
    insurance: string;
    realEstate: string;
    businessConsulting: string;
    humanResources: string;
    itServices: string;
    taxPreparation: string;
    investmentManagement: string;
    banking: string;
    auditing: string;
    // Property Maintenance
    autoDetailing: string;
    electrical: string;
    handyMan: string;
    hvac: string;
    landscaping: string;
    lawnCare: string;
    pressureWashing: string;
    wasteRemoval: string;
    // Retail & Consumer Goods
    ecommerce: string;
    brickMortarRetail: string;
    wholesale: string;
    consumerElectronics: string;
    apparel: string;
    homeGoods: string;
    sportingGoods: string;
    beautyProducts: string;
    jewelry: string;
    petProducts: string;
    toysGames: string;
    furniture: string;
    carAudio: string;
    carWash: string;
    // Technology & Digital
    softwareDevelopment: string;
    mobileApps: string;
    cloudServices: string;
    cybersecurity: string;
    aiMachineLearning: string;
    dataAnalytics: string;
    iotSolutions: string;
    blockchain: string;
    webDevelopment: string;
    itConsulting: string;
    techSupport: string;
    saasProducts: string;
    // Transportation & Logistics
    freightShipping: string;
    trucking: string;
    warehousing: string;
    lastMileDelivery: string;
    fleetManagement: string;
    supplyChain: string;
    courierServices: string;
    aviation: string;
    maritimeShipping: string;
    railTransport: string;
    movingServices: string;
    // Travel
    hotelsLodging: string;
    tourOperations: string;
    travelAgency: string;
    vacationRentals: string;
    adventureTravel: string;
    ecoTourism: string;
    businessTravel: string;
    cruiseLines: string;
    transportationServices: string;
    travelTechnology: string;
    destinationManagement: string;
    // Venue
    ballroom: string;
    conventionCenter: string;
    eventHall: string;
    privateVenue: string;
    stadium: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationKeys> = {
 en: {
  app: {
    name: 'Cultivatest',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    authRequired: 'Authentication Required',
  },

  tabs: {
    home: 'Home',
    scan: 'Scan',
    manage: 'Manage',
    events: 'Events',
    profile: 'Profile',
  },
  events: {
    title: 'Events',
    allEvents: 'All Events',
    following: 'Connections',
    myEvents: 'Saved Events',
    createEvent: 'Create Event',
    eventTitle: 'Event Title',
    description: 'Description',
    importantDetails: 'Important Details',
    startDate: 'Start Date & Time',
    endDate: 'End Date & Time',
    industry: 'Industry',
    sector: 'Sector',
    location: 'Location',
    save: 'Save Event',
    cancel: 'Cancel',
    delete: 'Delete Event',
    deleteConfirm: 'Are you sure you want to delete this event?',
    deleteSuccess: 'Event deleted successfully',
    addToMyEvents: 'Add to My Events',
    removeFromMyEvents: 'Remove from My Events',
    addedToMyEvents: 'Event added to your list',
    removedFromMyEvents: 'Event removed from your list',
    visible: 'Visible',
    hidden: 'Hidden',
    toggleVisibility: 'Toggle Visibility',
    noEvents: 'No events found',
    noEventsForDate: 'No events on this date',
    noFollowingEvents: 'No events from your connections',
    noMyEvents: 'You have not added any events yet',
    bookmarked: 'Bookmarked',
    rsvpd: "RSVP'd",
    noBookmarkedEvents: 'No bookmarked events',
    noRsvpdEvents: "No RSVP'd events",
    loadingEvents: 'Loading events...',
    eventDetail: 'Event Details',
    postedBy: 'Posted by',
    attendees: 'Attendees',
    host: 'Host',
    today: 'Today',
    searchEvents: 'Search events...',
    filterByIndustry: 'Filter by Industry',
    filterBySector: 'Filter by Sector',
    filterByTimeRange: 'Time Range',
    timeRange_day: 'Day',
    timeRange_week: 'Week',
    timeRange_month: 'Month',
    timeRange_year: 'Year',
    filterByDate: 'Filter by Date',
    filterByLocation: 'Filter by Location',
    nearMe: 'Near me',
    searchCityOrZip: 'Search city or ZIP code...',
    gettingLocation: 'Getting location...',
    locationPermissionDenied: 'Location permission denied',
    allIndustries: 'All Industries',
    allSectors: 'All Sectors',
    allCities: 'All Cities',
    filterByCity: 'Filter by City',
    clearFilters: 'Clear Filters',
    titleRequired: 'Event title is required',
    endDateAfterStart: 'End date must be after start date',
    descriptionRequired: 'Description is required',
    eventCreated: 'Event created successfully',
    eventCreateError: 'Failed to create event',
    editEvent: 'Edit Event',
    eventUpdated: 'Event updated successfully',
    eventUpdateError: 'Failed to update event',
    signInToCreate: 'Sign in to create events',
    signInToAdd: 'Sign in to add events',
    confirmDelete: 'Delete Event',
    tagPeople: 'Tag People',
    tagCompanies: 'Tag Companies',
    searchPeople: 'Search people...',
    searchCompanies: 'Search companies...',
    taggedPeople: 'People Involved',
    taggedCompanies: 'Companies Involved',
    myCreatedEvents: 'My Events',
    noCreatedEvents: "You haven't created any events yet",
    monthNames: 'January,February,March,April,May,June,July,August,September,October,November,December',
    dayNames: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    shareEvent: 'Share Event',
    eventShared: 'Event shared!',
    rsvp: 'RSVP',
    attending: 'Attending',
    rsvpSuccess: "You're now attending this event!",
    createPostFromEvent: 'Create Post',
    viewEvent: 'View Event',
    sharedAnEvent: 'Shared an event',
    coverImage: 'Cover Image',
    addCoverImage: 'Add Cover Image',
    postCreated: 'Post created from event!',
    postCreateError: 'Failed to create post.',
  },
consent: {
  // Age Verification
  ageVerification: 'Age Verification',
  ageVerificationDesc: 'We need to verify your age to comply with COPPA (Children\'s Online Privacy Protection Act).',
  over13: 'I am 13 or older',
  under13: 'I am under 13',
  ageRestriction: 'Age Restriction',
  mustBe13: 'You must be at least 13 years old to use this app. Thank you for your understanding.',
  coppaNotice: 'This verification is required by COPPA to protect children\'s privacy.',
  confirmAge: 'I confirm that I am 13 years of age or older',
  
  // Region Selection
  yourLocation: 'Your Location',
  locationDesc: 'Different privacy laws apply based on your location. Please select your region:',
  europeanUnion: 'European Union',
  unitedStates: 'United States',
  otherRegion: 'Other Region',
  applies: 'applies',
  mayApply: 'may apply',
  standardPrivacy: 'Standard privacy protections',
  californiaQuestion: 'California Resident?',
  californiaQuestionDesc: 'Are you a California resident? CCPA privacy rights may apply to you.',
  
  // Consent Form
  privacyConsent: 'Privacy & Consent',
  privacyChoices: 'Your Privacy Choices',
  gdprDesc: 'Under GDPR, we need your explicit consent to process your data. You can change these preferences anytime in Settings.',
  ccpaDesc: 'Under CCPA, you have the right to opt-out of data selling and know how your data is used. Choose your preferences below.',
  standardDesc: 'We respect your privacy. Choose which data processing activities you\'re comfortable with. You can change these anytime.',
  essentialNotice: 'Essential services (authentication, security, basic app functionality) are always active and cannot be disabled.',
  dataProcessingPreferences: 'Data Processing Preferences',
  customizeExperience: 'Customize your experience by choosing which data you want to share with us.',
  essential: 'Essential',
  
  // Consent Options
  required: 'Required',
  essentialDesc: 'Required for the app to function properly. This cannot be disabled.',
  analytics: 'Analytics',
  analyticsDesc: 'Help us improve the app by sharing anonymous usage data',
  analyticsData: 'App usage, features used, time spent',
  crashReports: 'Crash Reports',
  crashReportsDesc: 'Automatically send crash reports to help us fix bugs',
  crashData: 'Device info, crash logs, app version',
  performance: 'Performance Monitoring',
  performanceDesc: 'Monitor app performance to identify and fix slowdowns',
  performanceData: 'Load times, network speed, device performance',
  marketing: 'Marketing Communications',
  marketingDesc: 'Receive personalized content, offers, and product updates',
  marketingData: 'Interests, preferences, engagement history',
  dataCollected: 'Data collected',
  tracking: 'Tracking & Advertising',
  trackingDesc: 'Allow us to track your activity across apps for personalized advertising',
  personalization: 'Personalization',
  personalizationDesc: 'Personalize your feed and recommendations based on your interests',
  
  // Actions
  acceptAll: 'Accept All',
  rejectNonEssential: 'Reject Non-Essential',
  rejectAll: 'Reject All (Essential Only)',
  savePreferences: 'Save My Preferences',
  readPrivacyPolicy: 'Read Full Privacy Policy',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyDesc: 'Learn how we collect, use, and protect your data', // ✅ NEW
  privacyPolicyFull: 'Your complete privacy policy text goes here.',
  acceptSelected: 'Accept Selected',
  declineAll: 'Decline All',
  
  // Legal Documents
  legalDocuments: 'Legal Documents',
  legalDocumentsDesc: 'View our privacy policy and terms of service', // ✅ NEW
  termsOfService: 'Terms of Service',
  termsDesc: 'Read the terms and conditions for using our app', // ✅ NEW
  byAccepting: 'By continuing, you agree to our Privacy Policy and Terms of Service.',

  // Rights
  gdprRights: 'Under GDPR, you have the right to access, rectify, erase, restrict processing, data portability, and object to processing. Contact us to exercise your rights.',
  ccpaRights: 'Under CCPA, you have the right to know what personal information is collected, request deletion, and opt-out of sale. You will not be discriminated against for exercising these rights.',
  standardRights: 'You have the right to access and delete your personal data. You can manage your privacy settings anytime in the app.',
  yourRights: 'Your Data Rights',
  gdprRightsDesc: 'Under GDPR, you have the right to access, export, and delete your personal data.',
  ccpaRightsDesc: 'Under CCPA, you have the right to know what data we collect and request deletion.',
  standardRightsDesc: 'You have the right to access and delete your personal data.',
  rightsDescription: 'You can change these preferences at any time in Settings. You also have the right to access, export, or delete your data.',
  
  // Messages
  errorSaving: 'Failed to save your consent preferences. Please try again.',
  
  // Status
  consentStatus: 'Consent Status',
  consentGiven: 'Consent Given',
  consentDate: 'Consent Date',
  region: 'Region',
  
  // Data Processing
  dataProcessing: 'Data Processing Consent',
  dataProcessingDesc: 'Control how your data is used',
  active: 'Active',
  inactive: 'Inactive',
  
  // User Rights
  exportData: 'Export Your Data',
  exportDataShort: 'Download all your data in JSON format',
  deleteAllData: 'Delete Account',
  deleteAllDataShort: 'Permanently delete all your data (30-day grace period)',
  
  // CCPA
  ccpaOptions: 'California Privacy Rights (CCPA)',
  doNotSell: 'Do Not Sell My Data',
  doNotSellDesc: 'Opt out of data selling as required by CCPA',
  
  // Revoke
  revokeAll: 'Revoke All Consent',
  revokeAllConfirm: 'Are you sure you want to revoke all consent? This will disable all data processing features.',
  revokeAllNote: 'This will set all consents to inactive. You can re-enable them anytime.',
  allConsentRevoked: 'All consent has been revoked.',
  
  // Messages
  consentEnabled: 'Consent enabled',
  consentDisabled: 'Consent disabled',
  updateFailed: 'Failed to update consent',
  requestReceived: 'Request Received',
  revokeFailed: 'Failed to revoke consent',
  
  // Info
  whyThisMatters: 'Why This Matters',
  whyThisMattersDesc: 'We respect your privacy. These controls give you transparency and choice over how your data is used. You can change these settings anytime.',
  
  // Additional
  welcomeTitle: 'Welcome to CultivaNetwork',
  introTitle: 'Welcome to CultivaNetwork',
  introText: 'CultivaNetwork collects basic information — such as your name, profile details, and activity within the app — solely to provide and improve your experience. We do not track you across other apps or websites.',
  continue: 'Continue',
  dataWeCollect: 'What We Collect',
  disclosureProfile: 'Your profile information (name, photo, bio)',
  disclosureUsage: 'How you use the app to improve features',
  disclosureCrash: 'Crash reports to help us fix bugs',
  settingsDataSummary: 'We collect only what is needed to run the app. We do not track you across other apps or websites.',
  profileDataDesc: 'Your name, photo, bio, and contact details you provide',
  usageDataDesc: 'How you use the app to help us improve features',
  crashDataDesc: 'Crash reports and error logs to help us fix bugs',
  noTracking: 'No Cross-App Tracking',
  noTrackingDesc: 'We do not track you across other apps or websites, and we do not share your data with third parties for advertising.',
},

  auth: {
    signin: 'Sign In',
    signup: 'Sign Up',
    signout: 'Sign Out',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidEmail: 'Please enter a valid email address',
    weakPassword: 'Password should be at least 6 characters',
    userNotFound: 'No account found with this email',
    wrongPassword: 'Incorrect password',
    emailAlreadyInUse: 'An account with this email already exists',
    tooManyRequests: 'Too many failed attempts. Please try again later',
    networkError: 'Network error. Please check your connection',
  },

  displayName: {
    validation: {
      required: 'Display name is required',
      reserved: 'This name is reserved and cannot be used',
      currentName: 'This is your current display name',
      taken: 'This username is already taken',
      temporarilyReserved: 'This username is temporarily reserved',
      available: 'Username is available!',
      checkError: 'Unable to check availability. Please try again.',
      tooShort: 'Username must be at least 3 characters long',
      tooLong: 'Username must be less than 30 characters long',
      invalidCharacters: 'Username can only contain letters, numbers, spaces, underscores, and hyphens',
      invalidFormat: 'Username format is invalid',
    },
    console: {
      savingToPermanent: '💾 SAVING TO PERMANENT USERNAMES DATABASE:',
      successfullySaved: '✅ SUCCESSFULLY SAVED TO PERMANENT DATABASE:',
      documentCreated: '📊 Document created in saved_usernames collection with ID:',
      errorSaving: '❌ ERROR SAVING TO PERMANENT DATABASE:',
      incrementedCounter: '📈 Incremented taken attempt counter for:',
      cannotIncrementCounter: '⚠️ Cannot increment counter - username not found in saved_usernames:',
      errorIncrementingCounter: '❌ Error incrementing taken attempt counter:',
      handlingUsernameChange: '🔄 HANDLING USERNAME CHANGE:',
      usernameChangeCompleted: '✅ Username change completed successfully',
      failedToSaveNewUsername: '❌ Failed to save new username during change',
      errorHandlingUsernameChange: '❌ Error handling username change:',
      deletedOldUsername: '🗑️ Deleted old username from permanent database:',
      cannotDeleteUsername: '❌ Cannot delete username - belongs to different user:',
      usernameNotFound: 'ℹ️ Username not found in database (already deleted?):',
      errorDeletingFromPermanent: '❌ Error deleting from permanent database:',
      fetchingAllSavedUsernames: '📊 Fetching all saved usernames from database...',
      unknown: 'Unknown',
      foundSavedUsernames: '✅ Found {{count}} saved usernames in database',
      errorGettingSavedUsernames: '❌ Error getting saved usernames:',
      totalSavedUsernames: '📊 Total saved usernames in database: {{count}}',
      errorCountingSavedUsernames: '❌ Error counting saved usernames:',
      usernameDeactivated: '✅ Username deactivated:',
      unauthorizedDeactivation: '❌ Unauthorized: User cannot deactivate this username',
      cleanupCompleted: 'Cleaned up {{count}} expired attempt documents',
      exampleUsage: {
        title: 'HOW TO USE THE SAVED USERNAMES DATABASE:',
        saveUsername: 'When user successfully saves their username in your app:',
        seeAllSaved: 'To see all saved usernames:',
        getCount: 'To get count:',
        testDatabase: 'To test the database:',
        collectionContains: 'The saved_usernames collection will contain:',
        documentId: 'Document ID: lowercase username',
        usernameField: 'username: original case',
        userIdField: 'userId: who saved it',
        userEmailField: 'userEmail: user\'s email',
        savedAtField: 'savedAt: timestamp',
        isActiveField: 'isActive: true/false',
        sourceField: 'source: where it was saved from',
      },
    },
  },

  categories: {
    agriculture: 'Agriculture',
    automotive: 'Automotive',
    construction: 'Construction',
    technology: 'Technology',
    foodBeverage: 'Food & Beverage',
    retail: 'Retail',
    services: 'Services',
    healthcare: 'Healthcare',
    education: 'Education',
    finance: 'Finance',
    realEstate: 'Real Estate',
    manufacturing: 'Manufacturing',
    transportation: 'Transportation',
    entertainment: 'Entertainment',
    consulting: 'Consulting',
    creativeMedia: 'Creative & Media',
    educationTraining: 'Education & Training',
    energyEnvironment: 'Energy & Environment',
    foodBeverageServices: 'Food & Beverage Services',
    healthcareWellness: 'Healthcare & Wellness',
    manufacturingIndustrial: 'Manufacturing & Industrial',
    professionalFinancial: 'Professional & Financial Services',
    propertyMaintenance: 'Property Maintenance',
    retailConsumer: 'Retail & Consumer Goods',
    technologyDigital: 'Technology & Digital',
    transportationLogistics: 'Transportation & Logistics',
    travel: 'Travel',
    governmentPublicServices: 'Government & Public Services',
    venue: 'Venue',
  },
notifications: {
  notifications: 'Notifications',
  all: 'All',
  posts: 'Posts',
  stories: 'Stories',
  follows: 'Pending',
  network: 'Network',
  pending: 'Pending',
  connections: 'Connections',
  incoming: 'Incoming',
  outgoing: 'Outgoing',
  cancelRequest: 'Cancel',
  requestSent: 'Connection request sent',
  noNetworkActivity: 'No connections yet',
  noIncomingRequests: 'No incoming requests',
  noOutgoingRequests: 'No outgoing requests',
  messages: 'Messages',
  markAllRead: 'Mark All Read',
  markRead: 'Mark Read',
  markUnread: 'Mark Unread',
  actions: 'Notification Actions',
  chooseAction: 'Choose an action for this notification',
  deleteConfirm: 'Delete Notification',
  deleteConfirmMessage: 'Are you sure you want to delete this notification?',
  allMarkedRead: 'All notifications marked as read',
  noNotifications: 'No notifications yet',
  noNotificationsSubtext: 'When people interact with your content, you\'ll see notifications here',
  noConversations: 'No conversations yet',
  recentConversations: 'Recent Conversations',
  liked: 'liked your post',
  commented: 'commented on your post',
  shared: 'shared your post',
  followed: 'connected with you',
  viewedStory: 'viewed your story',
  sentMessage: 'sent you a message'
},
  specialties: {
    organicFarming: 'Organic Farming',
    cropManagement: 'Crop Management',
    livestock: 'Livestock',
    pestControl: 'Pest Control',
    soilManagement: 'Soil Management',
    irrigation: 'Irrigation',
    harvesting: 'Harvesting',
    seedSupply: 'Seed Supply',
    fertilizers: 'Fertilizers',
    equipmentRental: 'Equipment Rental',
    consulting: 'Consulting',
    realEstate: 'Real Estate',
    rawMaterials: 'Raw Materials',
    supplies: 'Supplies',
    manager: 'Manager',
    automotive: 'Automotive',
    agriculturalEquipment: 'Agricultural Equipment',
    agriculturalEquipmentRetail: 'Agricultural Equipment Retail',
    agriculturalServices: 'Agricultural Services',
    agriculturalSupply: 'Agricultural Supply',
    cropNutritionProtection: 'Crop Nutrition/Protection',
    farming: 'Farming',
    farmLabor: 'Farm Labor',
    farmManagement: 'Farm Management',
    farmSupply: 'Farm Supply',
    fertilizer: 'Fertilizer',
    irrigationServicesSupply: 'Irrigation Services/Supply',
    pesticides: 'Pesticides',
    veterinaryServicesSupply: 'Veterinary Services/Supply',
    vineyards: 'Vineyards',
    agricultureLab: 'Agriculture Lab',
    fieldTrials: 'Field Trials',
    dairy: 'Dairy',
    dairyServices: 'Dairy Services',
    agricultureRealEstate: 'Agriculture Real Estate',
    cropInsurance: 'Crop Insurance',
    assetManagement: 'Asset Management',
    audioEngineering: 'Audio Engineering',
    contentCreation: 'Content Creation',
    design: 'Design',
    filmVideo: 'Film & Video',
    musicProduction: 'Music Production',
    photography: 'Photography',
    writingPublishing: 'Writing & Publishing',
    newsCurrentEventsJournalism: 'News, Current Events & Journalism',
    commercialConstruction: 'Commercial Construction',
    constructionTrades: 'Construction & Trades',
    corporateTraining: 'Corporate Training',
    educationalServices: 'Educational Services',
    formalEducation: 'Formal Education',
    government: 'Government',
    library: 'Library',
    nonProfits: 'Non-Profits',
    residentialConstruction: 'Residential Construction',
    socialServices: 'Social Services',
    specializedTrades: 'Specialized Trades',
    university: 'University',
    highSchool: 'High School',
    juniorCollege: 'Junior College',
    analysis: 'Analysis',
    energy: 'Energy',
    environment: 'Environment',
    utilities: 'Utilities',
    waterServices: 'Water Services',
    barsNightlife: 'Bars & Nightlife',
    cafe: 'Cafe',
    coffeeShops: 'Coffee Shops',
    foodServices: 'Food Services',
    restaurants: 'Restaurants',
    barbershop: 'Barbershop',
    dentalServices: 'Dental Services',
    fitness: 'Fitness',
    hairNailSalon: 'Hair/Nail Salon',
    healthcareProviders: 'Healthcare Providers',
    massageParlor: 'Massage Parlor',
    medicalDevices: 'Medical Devices',
    mentalHealth: 'Mental Health',
    nutrition: 'Nutrition',
    pharmaceuticals: 'Pharmaceuticals',
    physicalTherapy: 'Physical Therapy',
    spa: 'Spa',
    wellness: 'Wellness',
    aerospace: 'Aerospace',
    chemicals: 'Chemicals',
    foodBeverageManufacturing: 'Food & Beverage Manufacturing',
    hydraulicServicesParts: 'Hydraulic Services/Parts',
    industrial: 'Industrial',
    textiles: 'Textiles',
    constructionAggregates: 'Construction Aggregates',
    accounting: 'Accounting',
    architectureDesign: 'Architecture & Design',
    engineering: 'Engineering',
    financialServices: 'Financial Services',
    legalServices: 'Legal Services',
    marketingAdvertising: 'Marketing & Advertising',
    healthInsurance: 'Health Insurance',
    autoInsurance: 'Auto Insurance',
    homeInsurance: 'Home Insurance',
    financialManagement: 'Financial Management',
    financialAnalysis: 'Financial Analysis',
    assetProtection: 'Asset Protection',
    propertyManagement: 'Property Management',
    autoDetailing: 'Auto Detailing',
    electrical: 'Electrical',
    handyMan: 'Handy Man',
    hvac: 'HVAC',
    landscaping: 'Landscaping',
    lawnCare: 'Lawn Care',
    pressureWashing: 'Pressure Washing',
    wasteRemoval: 'Waste Removal',
    apparel: 'Apparel',
    automotiveRentals: 'Automotive Rentals',
    automotiveRetail: 'Automotive Retail',
    beauty: 'Beauty',
    bookstore: 'Bookstore',
    carAudio: 'Car Audio',
    carWash: 'Car Wash',
    electronics: 'Electronics',
    electronicsRetail: 'Electronics Retail',
    gardening: 'Gardening',
    hardware: 'Hardware',
    homeGoods: 'Home Goods',
    specialtyRetail: 'Specialty Retail',
    tools: 'Tools',
    westernWear: 'Western Wear',
    workWear: 'Work Wear',
    aiMachineLearning: 'AI & Machine Learning',
    blockchain: 'Blockchain',
    cloudComputing: 'Cloud Computing',
    cybersecurity: 'Cybersecurity',
    dataAnalytics: 'Data & Analytics',
    ecommercePlatforms: 'E-commerce Platforms',
    edtech: 'EdTech',
    fintech: 'FinTech',
    gaming: 'Gaming',
    hardwareElectronics: 'Hardware & Electronics',
    healthtech: 'HealthTech',
    itServices: 'IT Services',
    softwareSaas: 'Software & SaaS',
    telecommunications: 'Telecommunications',
    webDevelopment: 'Web Development',
    batteryServices: 'Battery Services',
    equipmentTransportation: 'Equipment Transportation',
    logistics: 'Logistics',
    roadside: 'Roadside',
    shipping: 'Shipping',
    tireServices: 'Tire Services',
    towServices: 'Tow Services',
    repossessionServices: 'Repossession Services',
    accommodation: 'Accommodation',
    hospitality: 'Hospitality',
    airTravel: 'Air Travel',
    hotel: 'Hotel',
    rvPark: 'RV Park',
    busTransportation: 'Bus Transportation',
    trainTransportation: 'Train Transportation',
    packagingWarehouse: 'Packaging Warehouse',
    coldStorage: 'Cold Storage',
    storageWarehouse: 'Storage Warehouse',
    miniStorage: 'Mini Storage',
    rvStorage: 'RV Storage',
    boatStorage: 'Boat Storage',
    rentals: 'Rentals',
    cosmetics: 'Cosmetics',
    generalProducts: 'General Products',
    partsSupply: 'Parts Supply',
    artsCrafts: 'Arts & Crafts',
    ballroom: 'Ballroom',
    conventionCenter: 'Convention Center',
    eventHall: 'Event Hall',
    privateVenue: 'Private Venue',
    stadium: 'Stadium',
  },

  network: {
    title: 'Network',
    feedComingSoon: 'Network Feed Coming Soon',
    feedDescription: 'This will show posts from your network',
    signInToCreatePosts: 'Please sign in to create posts.',
    networkFeed: 'Network',
    followingFeed: 'Connections',
    createPost: 'Create Post',
    whatsHappening: "What's happening in your agricultural world?",
    searchPlaceholder: 'Search posts, people, companies...',
    noPostsFound: 'No posts found',
    noFriendsPostsYet: 'No posts from friends yet',
    noConnectionsYet: 'No connections yet',
    startFollowing: 'Start connecting with people to see their posts here',
    adjustFilters: 'Try adjusting your search filters',
    signInToSee: 'Sign in to see posts',
    joinConversation: 'Create an account to join the conversation',
    stories: 'Stories',
    addStory: 'Add Story',
    viewStory: 'View Story',
    sharePost: 'Share Post',
    bookmarkPost: 'Bookmark Post',
    likePost: 'Like Post',
    commentOnPost: 'Comment on Post',
    reportPost: 'Report Post',
    hidePost: 'Hide Post',
    blockUser: 'Block User',
      followToSeeStories: 'Connect with people to see their stories',
      postHasBeenDeleted: 'This post has been deleted',
      viewPost: 'View Post',

  },

  postAnalytics: {
    title: 'Post Analytics',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    shares: 'Shares',
    bookmarks: 'Bookmarks',
    whoViewed: 'Who viewed',
    whoLiked: 'Who liked',
    whoCommented: 'Who commented',
    whoBookmarked: 'Who bookmarked',
    totalShares: 'Total shares',
    noData: 'No data yet',
  },

  manage: {
    title: 'Manage',
    browseBusinesses: 'Browse Businesses',
    manageBusiness: 'Manage Business',
    loading: 'Loading...',
    services: 'Services',
    messages: 'Messages',
    analytics: 'Analytics',
    addService: 'Add Service',
    editService: 'Edit Service',
    serviceName: 'Service Name',
    serviceDescription: 'Service Description',
    startingPrice: 'Starting Price',
    category: 'Category',
    addImage: 'Add Image',
    changeImage: 'Change Image',
    noServicesFound: 'No services found',
    createFirstService: 'Create your first service or adjust filters',
    searchServices: 'Search services...',
    searchBusinesses: 'Search businesses, services, industries...',
    allIndustries: 'All Industries',
    messageCount: 'conversations',
    conversationsWillAppear: 'Messages will appear here when businesses contact you',
    businessMessages: 'Business Messages',
    profileRequired: 'Profile Required',
    addDisplayName: 'Please add at least a display name or business name to create posts.',
    accountType: 'Account Type',
    everyone: 'Everyone',
    businessesOnly: 'Businesses Only',
    industries: 'Industries',
    sectors: 'Sectors',
    location: 'Location',
    applyFilters: 'Apply Filters',
    resetFilters: 'Reset',
    searchFilter: 'Search & Filter',
    cityOrZip: 'City or ZIP code',
    specialties: 'Specialties',
    loadingServices: 'Loading services...',
    loadingPosts: 'Loading posts...',
    loadingAnalytics: 'Loading analytics...',
    type: 'Type',
    image: 'Image',
    product: 'Product',
    service: 'Service',
    enterServiceName: 'Enter service name',
    describeService: 'Describe your service',
    enterPrice: 'Enter price',
    enterCategory: 'Enter category',
    serviceNameRequired: 'Service name is required.',
    serviceDescriptionRequired: 'Service description is required.',
    validPriceRequired: 'Valid price is required.',
    contactForPrice: 'Contact for pricing',
    pleaseSelectCategory: 'Please select a category.',
    serviceUpdatedSuccessfully: 'Service updated successfully!',
    serviceCreatedSuccessfully: 'Service created successfully!',
    failedToCreateService: 'Failed to create service. Please try again.',
    failedToUpdateService: 'Failed to update service. Please try again.',
    restrictVisibility: 'Restrict Visibility',
    mediaActions: 'Media Actions',
    postArchived: 'Post archived successfully',
    postVisibilityRestricted: 'Post visibility restricted',
    postDeleted: 'Post deleted successfully',
    failedToArchive: 'Failed to archive post. Please try again.',
    failedToRestrict: 'Failed to restrict post. Please try again.',
    failedToDelete: 'Failed to delete post. Please try again.',
    characterCount: '{{current}}/{{max}} characters',
    noConversationsYet: 'No conversations yet',
    messagesWillAppearHere: 'Messages will appear here when businesses contact you',
    onlineStatus: 'Online',
    offlineStatus: 'Offline',
    permissionRequiredCamera: 'Camera Permission Required',
    grantCameraPermission: 'Please grant permission to access camera.',
    failed: 'Failed',
    tryAgainLater: 'Please try again later',
    conversationStarted: 'Conversation started successfully',
    failedToStartConversation: 'Failed to start conversation',
    authenticationRequired: 'Authentication Required',
    pleaseSignInToStart: 'Please sign in to start conversations.',
    selectFromPhotoLibrary: 'Select from photo library',
    noDataAvailable: 'No data available yet',
    lastActive: 'Last active',
    startConversation: 'Start Conversation',
    allCategories: 'All Categories',
    viewProfile: 'View Profile',
    businessProfile: 'Business Profile',
    timeline: 'Timeline',
    servicesAndProducts: 'Services & Products',
    noServicesYet: 'No services yet',
    createYourFirst: 'Create your first service',
    selectMedia: 'Select Media',
    removeMedia: 'Remove Media',
    mediaSelected: 'Media selected',
    pleaseEnterValidPrice: 'Please enter a valid price',
    categoryRequired: 'Category is required',
    verified: 'Verified',
    moreSpecialties: 'more specialties',
    businessHours: 'Business Hours',
    established: 'Established',
    viewFullProfile: 'View Full Profile',
    getDirections: 'Get Directions',
    business: 'business',
    businesses: 'businesses',
    confirmDeleteService: 'Are you sure you want to delete',  // ← ADD THIS
  serviceDeletedSuccessfully: 'Service deleted successfully',
  allLocations: 'All Locations',
  allSpecialties: 'All Specialties',
  moreFilters: 'More Filters',
  anyRating: 'Any Rating',
  minRating: 'Min Rating',
  locationRadius: 'Location Radius',
  useMyLocation: 'Use My Location',
  searchAddress: 'Search Address',
  gettingLocation: 'Getting your location...',
  searchLocationPlaceholder: 'Search for an address or city...',
  radius: 'Radius',
  adjustFilters: 'Try adjusting your filters',
  },

  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    accountSettings: 'Account Settings',
    privacy: 'Privacy',
    help: 'Help',
    about: 'About',
    signOut: 'Sign Out',
    profilePicture: 'Profile Picture',
    displayName: 'Display Name',
    businessName: 'Business Name',
    bio: 'Bio',
    website: 'Website',
    phone: 'Phone',
    address: 'Address',
    saveChanges: 'Save Changes',
    discardChanges: 'Discard Changes',
    followersCount: 'Connected',
    followingCount: 'Connected To',
    postsCount: 'Posts',
    follow: 'Connect',
    unfollow: 'Remove Connection',
    following: 'Connected',
    pendingConnection: 'Pending',
    acceptConnection: 'Accept',
    declineConnection: 'Decline',
    cancelRequest: 'Cancel Request',
    connectionRequest: 'wants to connect with you',
    connectionAccepted: 'accepted your connection request',
    message: 'Message',
    viewLocation: 'View Location',
    contactInfo: 'Contact Info',
    businessHours: 'Business Hours',
    established: 'Established',
    verified: 'Verified',
    individual: 'Individual',
    business: 'Business',
    selectCategory: 'Select Category',
    selectSpecialties: 'Select Specialties',
    chooseAllThatApply: 'Choose all that apply',
    selected: 'selected',
    loading: 'Loading profile...',
    createProfile: 'Create Profile',
    welcomeToProfile: 'Welcome to Your Profile',
    createAccountToAccess: 'Create an account to access your profile and manage your business information',
    letsBegin: "Let's Begin",
    unsavedChanges: 'Unsaved Changes',
    unsavedChangesMessage: 'You have unsaved changes. Would you like to save them before closing?',
    discard: 'Discard',
    myProfile: 'My Profile',
    userProfile: 'User Profile',
    addCoverPhoto: 'Add Cover Photo',
    userName: 'User Name',
    yourName: 'Your Name',
    required: '*',
    enterUsername: 'Enter your username',
    enterRealName: 'Enter your real name',
    enterDisplayName: 'Enter your display name',
    enterBusinessName: 'Enter your business name',
    tellUsAboutYourself: 'Tell us about yourself and your expertise',
    tellUsAboutBusiness: 'Tell us about your business and services',
    industry: 'Industry',
    currentPosition: 'Current Position',
    sectors: 'Sectors',
    noneSelected: 'None selected',
    contactInformation: 'Contact Information',
    businessAddress: 'Business Address',
    searchForAddress: 'Search for Address',
    getPreciseLocation: 'Get precise location automatically',
    selectedAddress: 'Selected Address',
    locationForNetworking: 'Add your location for networking',
    selectedLocation: 'Selected Location',
    searchForLocation: 'Search for Location',
    useGpsLocation: 'Use GPS Location',
    enterManually: 'Enter Manually',
    locationDetails: 'Location Details',
    preciseLocationAvailable: 'Precise location available',
    educationAcademicBackground: 'Education & Academic Background',
    degreeCertification: 'Degree/Certification',
    schoolUniversity: 'School/University',
    graduationYear: 'Graduation Year',
    gpa: 'GPA',
    additionalEducation: 'Additional Education',
    academicAwardsHonors: 'Academic Awards & Honors',
    professionalCertifications: 'Professional Certifications',
    volunteerWorkCommunity: 'Volunteer Work & Community Service',
    publicationsResearch: 'Publications & Research',
    additionalInformation: 'Additional Information',
    businessDetails: 'Business Details',
    keySkills: 'Key Skills',
    languages: 'Languages',
    professionalInterests: 'Professional Interests',
    otherRelevantInformation: 'Other Relevant Information',
    yearEstablished: 'Year established',
    logout: 'Logout',
    areYouSureLogout: 'Are you sure you want to logout?',
    usernameNotAvailable: 'Username Not Available',
    displayNameNotAvailable: 'Display Name Not Available',
    availableAlternatives: 'Available alternatives:',
    use: 'Use',
    searchAddress: 'Search Address',
    findExactAddress: 'Find your exact address for accurate location display',
    startTypingAddress: 'Start typing your address...',
    startWithStreetNumber: 'Start with your street number or address',
    selectingAddressProvidesGPS: 'Selecting an address provides precise GPS coordinates',
    selectCoverPhoto: 'Select Cover Photo',
    selectLogo: 'Select Logo',
    chooseFromGallery: 'Choose from Gallery',
    selectFromPhotoLibrary: 'Select from your photo library',
    invalidUrl: 'Invalid URL',
    unableToOpenWebsite: 'Unable to open this website. Please check the URL format.',
    checkUrlFormat: 'Please check the URL format',
    copyUrl: 'Copy URL',
    urlCopied: 'URL Copied',
    offlineMode: 'Offline Mode',
    profileSavedLocally: 'Your profile has been saved locally and will sync when you\'re back online.',
    saveFailed: 'Save Failed',
    authenticationError: 'Authentication error. Please sign in again.',
    signInAgain: 'Please sign in again',
    success: 'Success',
    profileSavedSuccessfully: 'Profile saved successfully!',
    manualEntry: 'Manual Entry',
    enterBusinessAddress: 'Enter your business address:',
    enterYourLocation: 'Enter your location:',
    addressSelected: 'Address Selected',
    addressUpdatedWithLocation: 'Address updated with precise location data for accurate map display.',
    failedToProcessAddress: 'Failed to process address. Please try again.',
    phoneFormat: '(555) 123-4567',
    enterWebsiteUrl: 'Enter website URL (e.g., https://cultivanetwork.com)',
    degreeExample: 'e.g., Bachelor\'s in Computer Science',
    universityExample: 'e.g., University of California, Berkeley',
    graduationYearExample: 'e.g., 2023',
    gpaExample: 'e.g., 3.8',
    businessHoursExample: 'e.g., Mon-Fri: 9AM-6PM',
    additionalEducationPlaceholder: 'Other courses, bootcamps, online certifications...',
    academicAwardsPlaceholder: 'Dean\'s list, scholarships, academic competitions...',
    certificationsPlaceholder: 'Industry certifications, licenses, professional credentials...',
    volunteerWorkPlaceholder: 'Community involvement, volunteer positions, non-profit work...',
    publicationsPlaceholder: 'Research papers, articles, published work...',
    keySkillsPlaceholder: 'Technical skills, software proficiency, tools you\'re experienced with...',
    languagesPlaceholder: 'e.g., English (Native), Spanish (Fluent), French (Conversational)',
    professionalInterestsPlaceholder: 'Areas you\'re passionate about, industries you want to work in...',
    otherRelevantPlaceholder: 'Anything else that might be relevant for potential employers...',
    currentPositionPlaceholder: 'e.g., Senior Software Engineer, Farm Manager, etc.',
    gpaPlaceholder: 'e.g., 3.8',
    removeLocation: 'Remove Location',
  locationRemoved: 'Location Removed',
  businessAddressRemoved: 'Business address has been removed from your profile.',
  locationCleared: 'Your location has been cleared from your profile.',
  preciseLocationWithGPS: 'Precise location with GPS coordinates',
  manualEntryNoGPS: 'Manual entry - no GPS coordinates',
    addressDetailsTitle: 'Address Details',
  locationDetailsTitle: 'Location Details',
  coordinatesLabel: 'Coordinates:',
  googlePlaceIdLabel: 'Google Places ID:',
  manualEntryLabel: 'Manual entry',
  searchAddressPlaceholder: 'Start typing your address...',
  noResultsFound: 'No addresses found. Try a different search term.',
  searchError: 'Search failed. Please check your internet connection.',
    apiKeyNotConfigured: 'Address search is not available. Please contact support.',
  networkError: 'Network error. Please check your connection and try again.',
  requestTimeout: 'Request timed out. Please try again.',
  rateLimitExceeded: 'Too many requests. Please wait a moment and try again.',
  requestDenied: 'Address search permission denied. Please contact support.',
  requiredFieldsProgress: '{filled} of {total} required fields completed',
  fieldsRemaining: 'Fields remaining:',
  multipleLocations: 'Multiple Locations',
  multipleLocationsDescription: 'Add additional locations for your business',
  addLocation: 'Add Location',
  locationName: 'Location Name',
  locationNamePlaceholder: 'e.g., Main Office, Warehouse, Downtown Branch',
  locationPhone: 'Phone',
  locationBusinessHours: 'Business Hours',
  locationAddress: 'Address',
  additionalLocations: 'Additional Locations',
  editLocation: 'Edit Location',
  deleteLocation: 'Delete Location',
  deleteLocationConfirm: 'Delete Location?',
  deleteLocationMessage: 'Are you sure you want to remove this location?',
  locationAdded: 'Location added successfully',
  locationUpdated: 'Location updated successfully',
  locationDeleted: 'Location removed',
  noAdditionalLocations: 'No additional locations yet',
  addYourFirstLocation: 'Tap "Add Location" to add another business location',
  usePrimaryIfBlank: 'Leave blank to use primary location info',
  },

  scan: {
    title: 'Scan',
    searchLocation: 'Search Location',
    nearbyBusinesses: 'Nearby Businesses',
    mapView: 'Map View',
    listView: 'List View',
    directions: 'Directions',
    callBusiness: 'Call Business',
    visitWebsite: 'Visit Website',
    noBusinessesNearby: 'No businesses found nearby',
    locationPermission: 'Location Permission Required',
    enableLocation: 'Enable Location',
    searchRadius: 'Search Radius',
    filterByCategory: 'Filter by Category',
    miles: 'miles',
    kilometers: 'km',
    searchBusinesses: 'Search businesses...',
    measure: 'Measure',
    edit: 'Edit',
    area: 'Area',
    perimeter: 'Perimeter',
    points: 'Points',
    method: 'Method',
    manual: 'Manual',
    gps: 'GPS',
    notes: 'Notes',
    created: 'Created',
    unknown: 'Unknown',
    savedFields: 'Saved Fields',
    loadingFields: 'Loading fields...',
    manualDrawing: 'Manual Drawing',
    gpsWalking: 'GPS Walking',
    tapToView: 'Tap to view on map',
    noFieldsSaved: 'No fields saved yet',
    tapMeasureToStart: 'Tap the "Measure" button to start measuring field areas',
    businesses: 'businesses',
    found: 'found',
    more: 'more',
    locationNotSpecified: 'Location not specified',
    tapToViewProfile: 'Tap to view full profile',
    pleaseSignInToDiscover: 'Please sign in to discover businesses near you',
    loadingMap: 'Loading map...',
    specialties: 'Specialties',
    signInRequired: 'Sign In Required',
    mapStandard: 'Standard',
    mapSatellite: 'Satellite',
    mapHybrid: 'Hybrid',
  },

  settings: {
    title: 'Settings',
    loading: 'Loading settings...',
    general: 'General',
    accounts: 'Accounts',
    activity: 'Activity',
    blocked: 'Blocked',
    privacy: 'Privacy',
    language: 'Language',
    accountManagement: 'Account Management',
    accountManagementDesc: 'Manage and switch between your multiple accounts',
    activeAccount: 'Active Account',
    allAccounts: 'All Accounts',
    addAccount: 'Add Account',
    switchAccount: 'Switch Account',
    removeAccount: 'Remove Account',
    individual: 'Individual',
    business: 'Business',
    lastActive: 'Last active',
    followers: 'connections',
    following: 'connections',
    yourActivity: 'Your Activity',
    yourActivityDesc: 'View and manage your activity history with real-time updates',
    networkConnections: 'Network & Connections',
    networkConnectionsDesc: 'Your social presence on Cultiva',
    contentEngagement: 'Content & Engagement',
    contentEngagementDesc: 'Your posts and interactions',
    peopleFollowingYou: 'Connected',
    peopleYouFollow: 'Connected To',
    postsCreated: 'Posts created',
    likesGiven: 'Likes given',
    commentsPosted: 'Comments posted',
    postsSaved: 'Posts saved',
    noActivityYet: 'No activity yet',
    justNow: 'Just now',
    viewPost: 'View post',
    showDeleted: 'Show Deleted',
    showArchived: 'Show Archived',
    recentActivities: 'Recent Activities',
    noRecentActivities: 'No recent activities',
    languageSettings: 'Language Settings',
    languageSettingsDesc: 'Choose your preferred language for the entire app',
    currentLanguage: 'Current Language',
    selectLanguage: 'Select Language',
    languageChanged: 'Language changed successfully',
    restartRequired: 'Please restart the app for full effect',
    blockedUsers: 'Blocked Users',
    blockedUsersDesc: 'Manage users you\'ve blocked from interacting with you',
    blockUser: 'Block a User',
    unblockUser: 'Unblock',
    searchUsers: 'Search for users',
    searchUsersPlaceholder: 'Search users by name or business...',
    noUsersFound: 'No users found',
    tryDifferentSearch: 'Try a different search term',
    searchForUsers: 'Search for users to block',
    startTyping: 'Start typing to see results',
    blockConfirm: 'Block {{name}}? They won\'t be able to see your posts or contact you.',
    unblockConfirm: 'Unblock {{name}}?',
    userBlocked: 'User blocked successfully',
    userUnblocked: 'User unblocked successfully',
    blockedDate: 'Blocked {{date}}',
    privacySettings: 'Privacy Settings',
    privacySettingsDesc: 'Control how others can see and interact with your profile',
    profileVisibility: 'Profile Visibility',
    profileVisibilityDesc: 'Control who can see your profile information',
    public: 'Public',
    friendsOnly: 'Connections Only',
    private: 'Private',
    publicDesc: 'Anyone can see your profile and posts',
    friendsOnlyDesc: 'Only your connections can see your profile',
    privateDesc: 'Only you can see your profile',
    clearAllData: 'Clear All Data',
    clearAllDataDesc: 'This will permanently delete all your data including posts, messages, and activity. This action cannot be undone.',
    privacyFeaturesComing: 'Privacy Settings',
    privacyFeaturesDesc: 'Your privacy is important. Advanced privacy controls will be available in a future update.',
    enterEmailPassword: 'Please enter both email and password',
  switchedToAccount: 'Switched to {{name}}',
  accountAdded: 'Account Added',
  accountAddedDesc: 'Successfully added and switched to the account! Close Settings to see your new account\'s posts.',
  closeSettings: 'Close Settings',
  accountOperationFailed: 'Failed to process account. Please try again.',
  noAccountFound: 'No account found with this email address.',
  incorrectPassword: 'Incorrect password for this account.',
  invalidEmail: 'Please enter a valid email address.',
  tooManyAttempts: 'Too many failed attempts. Please try again later.',
  operationFailed: 'Operation Failed',
  accountNotFound: 'Account not found.',
  switchAccountConfirm: 'You\'ll need to enter your password to verify your identity.',
  removeAccountConfirm: 'Remove {{name}} from this device? You can add it back later by signing in.',
  accountRemovedSuccess: 'Account removed successfully.',
  accountRemovalFailed: 'Failed to remove account.',
  currentUser: 'Current User',
  businessAccount: 'Business Account',
  individualAccount: 'Individual Account',
  userAccount: 'User',
  switchingAccounts: 'Switching accounts...',
  loadingLanguage: 'Loading language...',
  accountFeatures: 'Separate Data • Switch Instantly • Secure & Private',
  rememberLogin: 'Remember this login for faster switching',
  quickSwitch: 'Quick Switch',
  savedLoginExpired: 'Saved Login Expired',
  savedLoginExpiredDesc: 'Your saved credentials are no longer valid. Please sign in again.',
  forgetSavedLogin: 'Forget Saved Login',
  forgetSavedLoginConfirm: 'Remove saved login for {{name}}? You\'ll need to enter the password next time you switch.',
  forget: 'Forget',

  // Activity
  activityManagement: 'Activity Management',
  activityDeleteFailed: 'Failed to delete activity.',
  activityArchiveFailed: 'Failed to archive activity.',
  aPost: 'a post',
  aBusiness: 'a business',
  someone: 'someone',
  
  // Blocking
  unknownUser: 'Unknown User',
  blockedByUser: 'Blocked by user',
  blockUserFailed: 'Failed to block user.',
  unblockUserFailed: 'Failed to unblock user.',
  reason: 'Reason',
  searchUsersToBlock: 'Search for users by name or business to block them',
  
  // Sound Effects
  soundEffects: 'Sound Effects',
  soundEffectsDesc: 'Play sounds for notifications and actions',
  enableSounds: 'Enable Sounds',

  // Privacy
  privacySettingsUpdated: 'Privacy settings updated.',
  privacySettingsFailed: 'Failed to save privacy settings.',
  deleteAllData: 'Delete All Data',
  featureComingSoon: 'Feature Coming Soon',
  featureComingSoonDesc: 'This feature will be available in a future update.',

  // Language
  languageChangeFailed: 'Failed to change language.',
  languageSupport: 'Language Support',
  languageSupportDesc: 'Language changes apply immediately across the entire app. Arabic text direction changes may require an app restart for full effect.',
  activeLabel: 'ACTIVE',
  
  // Modal text
  signInExistingAccount: 'Sign in to an existing account to add it to this device',
  signIn: 'Sign In',
  createAccount: 'Create Account',
  createNewAccountDesc: 'Create a new account and add it to this device',
  confirmPassword: 'Confirm Password',
  confirmPasswordPlaceholder: 'Re-enter your password',
  passwordMinLength: 'Password must be at least 8 characters',
  passwordsDoNotMatch: 'Passwords do not match',
  accountCreated: 'Account Created',
  accountCreatedDesc: 'Your new account has been created and is now active! Close Settings to get started.',
  createAccountFailed: 'Could not create account. Please try again.',
  emailAlreadyInUse: 'An account with this email already exists',
  weakPassword: 'Password is too weak. Use at least 8 characters.',
  networkError: 'Connection problem. Check your internet.',
  enterEmailAddress: 'Enter email address',
  enterPassword: 'Enter password',
  },

  businessProfile: {
    timeline: 'Timeline',
    services: 'Services & Products',
    posts: 'Posts',
    media: 'Media',
    loadingServices: 'Loading services...',
    loadingPosts: 'Loading posts...',
    loadingMedia: 'Loading media...',
    noServicesAvailable: 'No services available',
    noPostsAvailable: 'No posts available',
    noMediaPosted: 'No media posted yet',
    contactInformation: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    education: 'Education & Background',
    achievements: 'Achievements & Certifications',
    additionalInfo: 'Additional Information',
    businessDetails: 'Business Details',
    degree: 'Degree/Certification',
    university: 'University/School',
    graduationYear: 'Graduation Year',
    gpa: 'GPA',
    academicAwards: 'Academic Awards',
    certifications: 'Professional Certifications',
    volunteerWork: 'Volunteer Work',
    publications: 'Publications & Research',
    keySkills: 'Key Skills',
    languages: 'Languages',
    professionalInterests: 'Professional Interests',
    otherInformation: 'Other Information',
    profilePrivate: 'This profile is private',
    limitedProfileView: 'Limited profile view - connect to see more',
    followToSeeMore: 'Connect to see more',
    searchServices: 'Search services...',
  allCategories: 'All',
  noServicesMatch: 'No services match your filters',
  clearFilters: 'Clear Filters',
  more: 'More',
  less: 'Less',
  sortNewest: 'Newest First',
  sortPriceLow: 'Price: Low to High',
  sortPriceHigh: 'Price: High to Low',
  sortName: 'Name: A-Z',
  messageSeller: 'Message Seller',
  isStillAvailable: 'Is this still available?',
  whatsLowestPrice: "What's the lowest price?",
  canYouDeliver: 'Can you deliver?',
  imInterested: "I'm interested in this",
  free: 'Free',
  },

  comments: {
    comments: 'Comments',
    addComment: 'Add a comment...',
    reply: 'Reply',
    like: 'Like',
    loadingComments: 'Loading comments...',
    noCommentsYet: 'No comments yet',
    beFirstToComment: 'Be the first to comment',
    replyingTo: 'Replying to',
    cancelReply: 'Cancel Reply',
    postComment: 'Post Comment',
    showReplies: 'Show replies',
    hideReplies: 'Hide replies',
  },

  rating: {
    rateThis: 'Rate this business',
    yourRating: 'Your rating',
    averageRating: 'Average rating',
    totalReviews: 'reviews',
    noReviews: 'No reviews yet',
    ratingSubmitted: 'Rating submitted',
    thankYouRating: 'Thanks for your rating! Here\'s how others rated:',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    writeReview: 'Write Review',
    readReviews: 'Read Reviews',
  },

  stories: {
    stories: 'Stories',
    yourStory: 'Your Story',
    addStory: 'Add Story',
    viewStory: 'View Story',
    recordVideo: 'Record Video',
    chooseFromGallery: 'Choose from Gallery',
    storyExpires24h: 'Story expires in 24 hours',
    noStoriesYet: 'No stories yet',
    watchStory: 'Watch Story',
    skipStory: 'Skip Story',
    storyUnavailable: 'Story unavailable',
      preview: 'Preview',
  reRecord: 'Re-record',
  storyInfo: 'Stories are visible for 24 hours and can be up to 30 seconds long',
  shareAgriculturalWorld: 'Share what\'s happening in your agricultural world with a 30-second video',
  startRecording: 'Start Recording',
  recordVideoFirst: 'Please record a video first',
  storyPosted: 'Your story has been posted!',
  videoTooLarge: 'Video size: {{size}}MB exceeds the 500MB limit for stories. Please record a shorter video.',
  createStory: 'Create Story',
  sharePhotoOrVideo: 'Share a photo or video that will be visible for 24 hours',
  takePhoto: 'Take Photo',
  selectDuration: 'Select Duration',
  displayFor: 'Display for',
  continueEditing: 'Continue to Edit',
  storyInfoPhotoVideo: 'Photos and videos are visible for 24 hours. Videos can be up to 30 seconds.',
  selectMediaFirst: 'Please select a photo or video first',
  },

  messaging: {
    messages: 'Messages',
    conversation: 'Conversation',
    typeMessage: 'Type a message...',
    send: 'Send',
    online: 'Online',
    offline: 'Offline',
    delivered: 'Delivered',
    read: 'Read',
    startConversation: 'Start Conversation',
    conversationStarted: 'Conversation started',
    noMessages: 'No messages',
    loadingMessages: 'Loading messages...',
    messageFailed: 'Message failed to send',
    tryAgain: 'Try again',
  },

  createPost: {
  createPost: 'Create Post',
  whatsOnMind: "What's on your mind?",
  addPhoto: 'Add Photo',
  addVideo: 'Add Video',
  camera: 'Camera',
  gallery: 'Gallery',
  publish: 'Publish',
  saveDraft: 'Save Draft',
  discardPost: 'Discard Post',
  publishingPost: 'Publishing post...',
  postPublished: 'Post published successfully!',
  addMedia: 'Add Media',
  removeMedia: 'Remove Media',
  characterCount: 'characters',
  maxCharacters: 'Max 500 characters',
  // ADD THESE NEW KEYS:
  editPost: 'Edit Post',
  deletePost: 'Delete Post',
  deleteConfirm: 'Are you sure you want to delete this post?',
},
  search: {
    search: 'Search',
    searchAndFilter: 'Search & Filter',
    reset: 'Reset',
    noResults: 'No results found',
    tryDifferent: 'Try a different search term',
    searching: 'Searching...',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    location: 'Location',
    category: 'Category',
    rating: 'Rating',
    distance: 'Distance',
    recent: 'Recent',
    popular: 'Popular',
    nearest: 'Nearest',
    name: 'Name',
      allSectors: 'All Sectors',

  },

  activities: {
    liked: 'Liked',
    comment: 'Comment',
    reviewed: 'Reviewed',
    following: 'Connected with',
    saved: 'Saved',
    created: 'Created a Post',
    viewed: 'Viewer',
    createdPost: 'Created a Post',
    profileViewed: 'profile viewed your profile',
    someoneViewed: 'Someone viewed your profile',
    startedConversation: 'Started a conversation',
    sentMessage: 'Sent a message',
    postedComment: 'Posted a comment',
    photoAttached: 'Photo attached',
    videoAttached: 'Video attached',
    archive: 'Archive',
    archived: 'Activity archived',
    deleteActivity: 'Delete Activity',
    deleteConfirm: 'Are you sure you want to delete this activity?',
  },

  moderation: {
    reportPost: 'Report Post',
    hidePost: 'Hide Post',
    blockUser: 'Block User',
    reportUser: 'Report User',
    spam: 'Spam',
    harassment: 'Harassment',
    inappropriateContent: 'Inappropriate Content',
    misinformation: 'Misinformation',
    other: 'Other',
    reportSubmitted: 'Your report has been submitted and will be reviewed.',
    postHidden: 'This post has been hidden from your feed.',
    userBlocked: 'User has been blocked. You won\'t see their posts anymore.',
    postReported: 'Post has been reported for review.',
    alreadyReported: 'You have already reported this post.',
    underReview: 'This post is under review',
    postActions: 'Post Actions',
    chooseAction: 'Choose an action',
    reportReasonTitle: 'Why are you reporting this post?',
  cannotReportOwnPost: 'You cannot report your own post.',
  reportDetailsTitle: 'Report Details',
  reportDetailsPrompt: 'Please describe why you are reporting this post:',
  submit: 'Submit',
  pleaseProvideReason: 'Please provide a reason for reporting.',
  reportThankYou: 'Thank you for your report. Our team will review this content shortly.',
  alreadyReportedDetailed: 'You have already reported this post. Thank you for helping keep our community safe.',
  reportSubmissionFailed: 'Failed to submit report. Please try again later.',
  hidePostConfirm: 'This post will be hidden from your feed. You can unhide it later from your settings.',
  hide: 'Hide',
  postHiddenSuccess: 'This post has been hidden from your feed.',
  hidePostFailed: 'Failed to hide post. Please try again.',
  cannotBlockSelf: 'You cannot block yourself.',
  blockConfirmMessage: 'Are you sure you want to block {{name}}? You won\'t see any of their posts or be able to message them.',
  block: 'Block',
  userBlockedSuccess: '{{name}} has been blocked. You won\'t see their posts anymore.',
  blockUserFailed: 'Failed to block user. Please try again.',
   whyReporting: 'Why are you reporting this post?',
  reportAnonymous: 'Your report is anonymous and helps us keep the community safe.',
  describeIssue: 'Please describe the issue:',
  describePlaceholder: 'Describe why you\'re reporting this post...',
  whatHappensHide: 'What happens when you hide a post:',
  postDisappears: 'The post disappears from your feed',
  authorNotNotified: 'The author won\'t be notified',
  canUnhideSettings: 'You can unhide it later in settings',
  canSeeReplies: 'You can still see replies if mentioned',
  lookingSomethingElse: 'Looking for something else?',
  considerReporting: 'If this post violates our community guidelines, consider reporting it instead of just hiding it.',
  hideThisPost: 'Hide this post?',
  hideDescription: 'This post will be hidden from your feed. You won\'t see it when browsing posts, but you can still access it directly if shared with you.',
  blockThisUser: 'Block this user?',
  ifYouBlock: 'If you block this user, you won\'t be able to:',
  seeTheirPosts: 'See their posts in your feed',
  sendReceiveMessages: 'Send or receive messages from them',
  seeProfile: 'See their profile or business information',
  getNotifications: 'Get notifications from their activities',
  noteBlock: 'Note: {{name}} will not be notified that you blocked them. You can unblock them later in your settings.',
  submitReport: 'Submit Report',

  },

  share: {
    title: 'Share Post',
    searchPlaceholder: 'Search people...',
    selected: 'selected',
    send: 'Send',
    shareExternally: 'Share externally',
    success: 'Post shared successfully',
    selectRecipients: 'Select recipients to share with',
    noFollowers: 'No connections to share with',
    sending: 'Sending...',
    sharedPost: 'shared a post with you',
  },

  analytics: {
    analytics: 'Analytics',
    overview: 'Overview',
    profileViews: 'Profile Views',
    postEngagement: 'Post Engagement',
    followers: 'Connections',
    reach: 'Reach',
    impressions: 'Impressions',
    clicks: 'Clicks',
    saves: 'Saves',
    shares: 'Shares',
    comments: 'Comments',
    likes: 'Likes',
    growthRate: 'Growth Rate',
    mostActiveFollowerTime: 'Most Active Connection Time',
    recentActivity: 'Recent Activity',
    noDataYet: 'No data available yet',
    lastDays: 'Last 7 days',
    thisWeek: 'This week',
    thisMonth: 'This month',
    peakHours: 'Peak Hours',

  },

  ui: {
    search: 'Search',
    searching: 'Searching...',
    noResults: 'No results',
    loading: 'Loading...',
    refresh: 'Refresh',
    pullToRefresh: 'Pull to refresh',
    endOfResults: 'End of results',
    tryAgain: 'Try again',
    somethingWentWrong: 'Something went wrong',
    checkConnection: 'Please check your internet connection',
    restartApp: 'Please restart the app',
    seeMore: 'See more',
    seeLess: 'See less',
    showAll: 'Show all',
    collapse: 'Collapse',
    expand: 'Expand',
    precise: 'Precise',
    coordinates: 'Coordinates',
    manualEntry: 'Manual entry',
    notSet: 'Not set',
  },

  time: {
    now: 'now',
    today: 'today',
    yesterday: 'yesterday',
    thisWeek: 'this week',
    thisMonth: 'this month',
    daysAgo: '{{count}} days ago',
    weeksAgo: '{{count}} weeks ago',
    monthsAgo: '{{count}} months ago',
    minutesAgo: '{{count}}m ago',
    hoursAgo: '{{count}}h ago',
    at: 'at',
    am: 'AM',
    pm: 'PM',
  },

  errors: {
    networkError: 'Network connection error',
    serverError: 'Server error occurred',
    unknownError: 'An unknown error occurred',
    tryAgainLater: 'Please try again later',
    invalidInput: 'Invalid input provided',
    fieldRequired: 'This field is required',
    emailInvalid: 'Please enter a valid email address',
    passwordTooShort: 'Password must be at least 6 characters',
    fileTooLarge: 'File size is too large',
    unsupportedFormat: 'Unsupported file format',
    uploadFailed: 'Failed to upload file',
    permissionDenied: 'Permission denied',
    locationDisabled: 'Location services are disabled',
    cameraUnavailable: 'Camera is not available',
    validationError: 'Validation Error',
    userNameRequired: 'User name is required.',
    yourNameRequired: 'Your name is required.',
    displayNameRequired: 'Username is required.',
    businessNameRequiredBusiness: 'Business name is required for business accounts.',
    bioRequired: 'Bio is required.',
    selectIndustry: 'Please select an industry.',
    selectCategory: 'Please select a category.',
    emailRequiredIndividual: 'Email is required for individual accounts.',
    validWebsiteRequired: 'Please enter a valid website URL.',
    permissionRequired: 'Permission Required',
    grantPhotoPermission: 'Please grant permission to access your photos.',
    imageUploadSuccess: 'Image uploaded successfully!',
    locationPermissionNeeded: 'Location permission is needed to get your current location.',
    callNotAvailable: 'Call Not Available',
    callingNotAvailable: 'Calling is not available on this device.',
    copyNumber: 'Copy Number',
    phoneNumber: 'Phone Number',
    unableToMakeCall: 'Unable to make phone call.',
    navigationError: 'Navigation Error',
    unableToNavigate: 'Unable to navigate.',
    addressRequired: 'Business address is required.',
    completeProfileFirst: 'Complete Your Profile',
    completeProfileMessage: 'You must fill in all required fields before accessing the app.',
  },

  // Newsletter
  newsletter: {
    // Opt-in Modal
    title: 'Stay Connected',
    subtitle: 'Subscribe to our newsletter to receive personalized updates about the cannabis industry.',
    features: {
      personalized: 'Personalized Content',
      personalizedDesc: 'Updates tailored to your interests and location',
      monthly: 'Monthly Digest',
      monthlyDesc: 'One email per month, no spam',
      unsubscribe: 'Easy Unsubscribe',
      unsubscribeDesc: 'Unsubscribe anytime with one click',
    },
    subscribe: 'Subscribe Now',
    maybeLater: 'Maybe Later',
    stayConnected: 'Stay Connected with Your Network',
    getPersonalized: 'Get personalized monthly updates delivered straight to your inbox.',
    featurePosts: 'New posts from your interests',
    featureBusinesses: 'Businesses in your area',
    featureProducts: 'Products and services',
    featureCommunity: 'Community highlights',
    sentMonthly: 'Sent once a month on the 1st',
    maybeNextTime: 'Maybe Next Time',
    canSubscribeLater: 'You can always subscribe later from Settings',

    // Preferences Flow
    selectIndustries: 'Select Industries',
    industriesDesc: 'Choose the industries you want to hear about. Select up to 5.',
    selectSectors: 'Select Sectors',
    sectorsDesc: 'Choose specific sectors within your selected industries.',
    selectLocations: 'Select Locations',
    locationsDesc: 'Choose geographic areas to receive content from.',
    selectProfileTypes: 'Select Profile Types',
    profileTypesDesc: 'Choose which types of profiles you want to see content from.',
    profileTypeIndividual: 'Individuals',
    profileTypeBusiness: 'Businesses',
    selectContentTypes: 'Select Content Types',
    contentTypesDesc: 'Choose what kind of content you want to receive.',
    contentTypePosts: 'Posts & Updates',
    contentTypeMedia: 'Photos & Videos',
    contentTypeProducts: 'Products',
    contentTypeServices: 'Services',
    addInterests: 'Add Personal Interests',
    interestsDesc: 'Add specific topics or keywords you\'re interested in. (Optional)',
    interestPlaceholder: 'Type an interest...',
    noInterestsYet: 'No interests added yet. This step is optional.',
    suggestedInterests: 'Suggestions',

    // Location
    addMyLocation: 'Add My Location',
    addLocation: 'Add Location',
    enterLocation: 'Enter city, state, or country',
    searchCity: 'Search for a city...',
    searchLocation: 'Search by address, city, or zip code...',
    locationsAdded: 'locations added',
    noLocationSet: 'No location set. Content from all locations will be included.',
    receiveFrom: 'Receive from:',
    city: 'City',
    state: 'State',
    country: 'Country',

    // Selection
    selected: 'selected',
    sectorsSelected: 'sectors selected',
    noIndustriesSelected: 'Please select industries first',

    // Validation
    selectAtLeastOneIndustry: 'Please select at least one industry',
    selectAtLeastOneSector: 'Please select at least one sector',
    selectAtLeastOneLocation: 'Please select at least one location',
    selectAtLeastOneProfileType: 'Please select at least one profile type',
    selectAtLeastOneContentType: 'Please select at least one content type',
    selectAtLeastOneInterest: 'Please add at least one interest',

    // Consent
    consentTitle: 'Legal Consent',
    consentText: `By subscribing to the CultivaNetwork newsletter, you agree to the following:

EMAIL COMMUNICATIONS
I consent to receive monthly newsletter emails from CultivaNetwork at the email address associated with my account. These emails will contain personalized content based on my selected preferences.

DATA USAGE
I understand that CultivaNetwork will use my preference selections to curate and personalize newsletter content. My preferences and email address will be stored securely and used solely for delivering relevant newsletter content.

THIRD-PARTY SHARING
My email address and preferences will not be sold, rented, or shared with third parties for marketing purposes.

UNSUBSCRIBE
I can unsubscribe at any time by clicking the "Unsubscribe" link in any newsletter email or through the app Settings.

DATA RETENTION
My subscription data will be retained until I unsubscribe or delete my account.

COMPLIANCE
This newsletter complies with applicable email marketing regulations including CAN-SPAM Act requirements.`,
    agreeToReceive: 'I agree to receive the CultivaNetwork monthly newsletter and accept the terms above.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',

    // Navigation
    skip: 'Skip',
    continue: 'Continue',
    completeSubscription: 'Complete Subscription',
    savePreferences: 'Save Preferences',

    // Settings
    settings: 'Newsletter Settings',
    settingsTitle: 'Newsletter',
    subscribedTitle: 'Subscribed to Newsletter',
    subscribed: 'Subscribed',
    notSubscribed: 'Not Subscribed',
    inactive: 'Inactive',
    subscribedSince: 'Subscribed since',
    lastEmailSent: 'Last email sent',
    editPreferences: 'Edit Preferences',
    manageSubscription: 'Manage Subscription',
    unsubscribeConfirm: 'Unsubscribe',
    unsubscribeConfirmMessage: 'Are you sure you want to unsubscribe from the newsletter?',
    resubscribe: 'Resubscribe',
    subscribeNow: 'Subscribe Now',
    subscriptionUpdated: 'Subscription updated',
    preferencesUpdated: 'Preferences updated successfully',
    never: 'Never',
    unsubscribeTitle: 'Unsubscribe',
    unsubscribe: 'Unsubscribe',
    unsubscribedTitle: 'Unsubscribed',
    unsubscribedMessage: 'You have been unsubscribed from the newsletter.',
    unsubscribeError: 'Failed to unsubscribe. Please try again.',
    resubscribedTitle: 'Resubscribed',
    resubscribedMessage: 'Welcome back! You will receive the next newsletter.',
    resubscribeError: 'Failed to resubscribe. Please try again.',
    preferencesUpdatedTitle: 'Preferences Updated',
    preferencesUpdatedMessage: 'Your newsletter preferences have been saved.',
    subscribedMessage: 'You will receive your first newsletter on the 1st of next month.',
    saveError: 'Failed to save. Please try again.',
    active: 'Active',
    lastSent: 'Last sent:',
    frequency: 'Monthly (1st of each month)',
    yourPreferences: 'Your preferences:',
    noPreferences: 'No preferences set',

    // Summary
    industries: 'Industries',
    sectors: 'Sectors',
    locations: 'Locations',
    profileTypes: 'Profile Types',
    contentTypes: 'Content Types',
    allLocations: 'All Locations',
  },

  // Common
  common: {
    cancel: 'Cancel',
    save: 'Save',
    error: 'Error',
  },

  // Industries
  industries: {
    agriculture: 'Agriculture',
    automotive: 'Automotive',
    construction: 'Construction',
    creativeMedia: 'Creative & Media',
    educationTraining: 'Education & Training',
    energyEnvironment: 'Energy & Environment',
    foodBeverage: 'Food & Beverage Services',
    healthcareWellness: 'Healthcare & Wellness',
    manufacturingIndustrial: 'Manufacturing & Industrial',
    professionalFinancial: 'Professional & Financial Services',
    propertyMaintenance: 'Property Maintenance',
    retailConsumer: 'Retail & Consumer Goods',
    technologyDigital: 'Technology & Digital',
    transportationLogistics: 'Transportation & Logistics',
    travel: 'Travel',
    governmentPublicServices: 'Government & Public Services',
    venue: 'Venue',
  },

  // Sectors
  sectors: {
    // Agriculture
    farming: 'Farming',
    agriculturalEquipment: 'Agricultural Equipment',
    cropNutrition: 'Crop Nutrition',
    cropProtection: 'Crop Protection',
    irrigation: 'Irrigation',
    livestockFeed: 'Livestock Feed',
    organicAgriculture: 'Organic Agriculture',
    seedDevelopment: 'Seed Development',
    agriculturalTechnology: 'Agricultural Technology',
    landManagement: 'Land Management',
    animalHusbandry: 'Animal Husbandry',
    agriculturalConsulting: 'Agricultural Consulting',
    soilManagement: 'Soil Management',
    harvestingServices: 'Harvesting Services',
    // Creative & Media
    photography: 'Photography',
    videography: 'Videography',
    graphicDesign: 'Graphic Design',
    contentCreation: 'Content Creation',
    socialMediaManagement: 'Social Media Management',
    marketing: 'Marketing',
    advertising: 'Advertising',
    branding: 'Branding',
    eventPlanning: 'Event Planning',
    musicProduction: 'Music Production',
    filmProduction: 'Film Production',
    webDesign: 'Web Design',
    illustration: 'Illustration',
    animation: 'Animation',
    publishing: 'Publishing',
    publicRelations: 'Public Relations',
    // Education & Training
    k12Education: 'K-12 Education',
    higherEducation: 'Higher Education',
    vocationalTraining: 'Vocational Training',
    onlineCourses: 'Online Courses',
    tutoring: 'Tutoring',
    educationalTechnology: 'Educational Technology',
    corporateTraining: 'Corporate Training',
    languageEducation: 'Language Education',
    testPreparation: 'Test Preparation',
    specialEducation: 'Special Education',
    earlyChildhoodEducation: 'Early Childhood Education',
    // Energy & Environment
    solarEnergy: 'Solar Energy',
    windEnergy: 'Wind Energy',
    hydroelectric: 'Hydroelectric',
    biofuels: 'Biofuels',
    environmentalConsulting: 'Environmental Consulting',
    wasteManagement: 'Waste Management',
    recycling: 'Recycling',
    carbonManagement: 'Carbon Management',
    energyEfficiency: 'Energy Efficiency',
    sustainableDesign: 'Sustainable Design',
    // Food & Beverage Services
    restaurants: 'Restaurants',
    catering: 'Catering',
    foodProduction: 'Food Production',
    beverageManufacturing: 'Beverage Manufacturing',
    foodDistribution: 'Food Distribution',
    specialtyFoods: 'Specialty Foods',
    organicFoods: 'Organic Foods',
    foodTechnology: 'Food Technology',
    farmToTable: 'Farm to Table',
    foodSafetyConsulting: 'Food Safety Consulting',
    bakery: 'Bakery',
    brewery: 'Brewery',
    // Healthcare & Wellness
    medicalPractice: 'Medical Practice',
    dentalCare: 'Dental Care',
    mentalHealth: 'Mental Health',
    physicalTherapy: 'Physical Therapy',
    alternativeMedicine: 'Alternative Medicine',
    nutritionConsulting: 'Nutrition Consulting',
    fitnessTraining: 'Fitness Training',
    spaServices: 'Spa Services',
    seniorCare: 'Senior Care',
    homeHealthcare: 'Home Healthcare',
    medicalEquipment: 'Medical Equipment',
    pharmaceuticals: 'Pharmaceuticals',
    veterinaryServices: 'Veterinary Services',
    // Manufacturing & Industrial
    heavyMachinery: 'Heavy Machinery',
    electronicsManufacturing: 'Electronics Manufacturing',
    textiles: 'Textiles',
    plastics: 'Plastics',
    metalFabrication: 'Metal Fabrication',
    automotiveParts: 'Automotive Parts',
    packaging: 'Packaging',
    chemicalProduction: 'Chemical Production',
    industrialEquipment: 'Industrial Equipment',
    qualityControl: 'Quality Control',
    processEngineering: 'Process Engineering',
    // Professional & Financial Services
    accounting: 'Accounting',
    legalServices: 'Legal Services',
    financialPlanning: 'Financial Planning',
    insurance: 'Insurance',
    realEstate: 'Real Estate',
    businessConsulting: 'Business Consulting',
    humanResources: 'Human Resources',
    itServices: 'IT Services',
    taxPreparation: 'Tax Preparation',
    investmentManagement: 'Investment Management',
    banking: 'Banking',
    auditing: 'Auditing',
    // Property Maintenance
    autoDetailing: 'Auto Detailing',
    electrical: 'Electrical',
    handyMan: 'Handy Man',
    hvac: 'HVAC',
    landscaping: 'Landscaping',
    lawnCare: 'Lawn Care',
    pressureWashing: 'Pressure Washing',
    wasteRemoval: 'Waste Removal',
    // Retail & Consumer Goods
    ecommerce: 'E-commerce',
    brickMortarRetail: 'Brick & Mortar Retail',
    wholesale: 'Wholesale',
    consumerElectronics: 'Consumer Electronics',
    apparel: 'Apparel',
    homeGoods: 'Home Goods',
    sportingGoods: 'Sporting Goods',
    beautyProducts: 'Beauty Products',
    jewelry: 'Jewelry',
    petProducts: 'Pet Products',
    toysGames: 'Toys & Games',
    furniture: 'Furniture',
    carAudio: 'Car Audio',
    carWash: 'Car Wash',
    // Technology & Digital
    softwareDevelopment: 'Software Development',
    mobileApps: 'Mobile Apps',
    cloudServices: 'Cloud Services',
    cybersecurity: 'Cybersecurity',
    aiMachineLearning: 'AI & Machine Learning',
    dataAnalytics: 'Data Analytics',
    iotSolutions: 'IoT Solutions',
    blockchain: 'Blockchain',
    webDevelopment: 'Web Development',
    itConsulting: 'IT Consulting',
    techSupport: 'Tech Support',
    saasProducts: 'SaaS Products',
    // Transportation & Logistics
    freightShipping: 'Freight Shipping',
    trucking: 'Trucking',
    warehousing: 'Warehousing',
    lastMileDelivery: 'Last Mile Delivery',
    fleetManagement: 'Fleet Management',
    supplyChain: 'Supply Chain',
    courierServices: 'Courier Services',
    aviation: 'Aviation',
    maritimeShipping: 'Maritime Shipping',
    railTransport: 'Rail Transport',
    movingServices: 'Moving Services',
    // Travel
    hotelsLodging: 'Hotels & Lodging',
    tourOperations: 'Tour Operations',
    travelAgency: 'Travel Agency',
    vacationRentals: 'Vacation Rentals',
    adventureTravel: 'Adventure Travel',
    ecoTourism: 'Eco-Tourism',
    businessTravel: 'Business Travel',
    cruiseLines: 'Cruise Lines',
    transportationServices: 'Transportation Services',
    travelTechnology: 'Travel Technology',
    destinationManagement: 'Destination Management',
    // Venue
    ballroom: 'Ballroom',
    conventionCenter: 'Convention Center',
    eventHall: 'Event Hall',
    privateVenue: 'Private Venue',
    stadium: 'Stadium',
  },
},

  es: {
  app: {
    name: 'Cultivatest',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    back: 'Volver',
    next: 'Siguiente',
    done: 'Hecho',
    ok: 'OK',
    yes: 'Sí',
    no: 'No',
    authRequired: 'Autenticación Requerida',
  },

  tabs: {
    home: 'Inicio',
    scan: 'Escanear',
    manage: 'Gestionar',
    events: 'Eventos',
    profile: 'Perfil',
  },
  events: {
    title: 'Eventos',
    allEvents: 'Red',
    following: 'Conexiones',
    myEvents: 'Guardados',
    createEvent: 'Crear Evento',
    eventTitle: 'Título del Evento',
    description: 'Descripción',
    importantDetails: 'Detalles Importantes',
    startDate: 'Fecha y Hora de Inicio',
    endDate: 'Fecha y Hora de Fin',
    industry: 'Industria',
    sector: 'Sector',
    location: 'Ubicación',
    save: 'Guardar Evento',
    cancel: 'Cancelar',
    delete: 'Eliminar Evento',
    deleteConfirm: '¿Estás seguro de que quieres eliminar este evento?',
    deleteSuccess: 'Evento eliminado exitosamente',
    addToMyEvents: 'Agregar a Mis Eventos',
    removeFromMyEvents: 'Quitar de Mis Eventos',
    addedToMyEvents: 'Evento agregado a tu lista',
    removedFromMyEvents: 'Evento eliminado de tu lista',
    visible: 'Visible',
    hidden: 'Oculto',
    toggleVisibility: 'Cambiar Visibilidad',
    noEvents: 'No se encontraron eventos',
    noEventsForDate: 'No hay eventos en esta fecha',
    noFollowingEvents: 'No hay eventos de tus conexiones',
    noMyEvents: 'Aún no has agregado ningún evento',
    bookmarked: 'Guardados',
    rsvpd: 'Confirmados',
    noBookmarkedEvents: 'No hay eventos guardados',
    noRsvpdEvents: 'No hay eventos confirmados',
    loadingEvents: 'Cargando eventos...',
    eventDetail: 'Detalles del Evento',
    postedBy: 'Publicado por',
    attendees: 'Asistentes',
    host: 'Anfitrión',
    today: 'Hoy',
    searchEvents: 'Buscar eventos...',
    filterByIndustry: 'Filtrar por Industria',
    filterBySector: 'Filtrar por Sector',
    filterByTimeRange: 'Rango de Tiempo',
    timeRange_day: 'Día',
    timeRange_week: 'Semana',
    timeRange_month: 'Mes',
    timeRange_year: 'Año',
    filterByDate: 'Filtrar por Fecha',
    filterByLocation: 'Filtrar por Ubicación',
    nearMe: 'Cerca de mí',
    searchCityOrZip: 'Buscar ciudad o código postal...',
    gettingLocation: 'Obteniendo ubicación...',
    locationPermissionDenied: 'Permiso de ubicación denegado',
    allIndustries: 'Todas las Industrias',
    allSectors: 'Todos los Sectores',
    allCities: 'Todas las Ciudades',
    filterByCity: 'Filtrar por Ciudad',
    clearFilters: 'Limpiar Filtros',
    titleRequired: 'El título del evento es obligatorio',
    endDateAfterStart: 'La fecha de fin debe ser posterior a la de inicio',
    descriptionRequired: 'La descripción es obligatoria',
    eventCreated: 'Evento creado exitosamente',
    eventCreateError: 'Error al crear el evento',
    editEvent: 'Editar Evento',
    eventUpdated: 'Evento actualizado exitosamente',
    eventUpdateError: 'Error al actualizar el evento',
    signInToCreate: 'Inicia sesión para crear eventos',
    signInToAdd: 'Inicia sesión para agregar eventos',
    confirmDelete: 'Eliminar Evento',
    tagPeople: 'Etiquetar Personas',
    tagCompanies: 'Etiquetar Empresas',
    searchPeople: 'Buscar personas...',
    searchCompanies: 'Buscar empresas...',
    taggedPeople: 'Personas Involucradas',
    taggedCompanies: 'Empresas Involucradas',
    myCreatedEvents: 'Mis Eventos',
    noCreatedEvents: 'Aún no has creado ningún evento',
    monthNames: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
    dayNames: 'Dom,Lun,Mar,Mié,Jue,Vie,Sáb',
    shareEvent: 'Compartir Evento',
    eventShared: 'Evento compartido!',
    rsvp: 'Confirmar Asistencia',
    attending: 'Asistiendo',
    rsvpSuccess: 'Ahora estás asistiendo a este evento!',
    createPostFromEvent: 'Crear Publicación',
    viewEvent: 'Ver Evento',
    sharedAnEvent: 'Compartió un evento',
    coverImage: 'Imagen de Portada',
    addCoverImage: 'Agregar Imagen de Portada',
    postCreated: 'Publicación creada del evento!',
    postCreateError: 'Error al crear la publicación.',
  },

  auth: {
    signin: 'Iniciar Sesión',
    signup: 'Registrarse',
    signout: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu Contraseña?',
    createAccount: 'Crear Cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    emailRequired: 'El correo electrónico es requerido',
    passwordRequired: 'La contraseña es requerida',
    invalidEmail: 'Por favor ingresa un correo electrónico válido',
    weakPassword: 'La contraseña debe tener al menos 6 caracteres',
    userNotFound: 'No se encontró cuenta con este correo',
    wrongPassword: 'Contraseña incorrecta',
    emailAlreadyInUse: 'Ya existe una cuenta con este correo',
    tooManyRequests: 'Muchos intentos fallidos. Inténtalo más tarde',
    networkError: 'Error de red. Verifica tu conexión',
  },

  displayName: {
    validation: {
      required: 'El nombre de usuario es obligatorio',
      reserved: 'Este nombre está reservado y no se puede usar',
      currentName: 'Este es tu nombre de usuario actual',
      taken: 'Este nombre de usuario ya está en uso',
      temporarilyReserved: 'Este nombre de usuario está temporalmente reservado',
      available: '¡El nombre de usuario está disponible!',
      checkError: 'No se puede verificar la disponibilidad. Por favor, inténtalo de nuevo.',
      tooShort: 'El nombre de usuario debe tener al menos 3 caracteres',
      tooLong: 'El nombre de usuario debe tener menos de 30 caracteres',
      invalidCharacters: 'El nombre de usuario solo puede contener letras, números, espacios, guiones bajos y guiones',
      invalidFormat: 'El formato del nombre de usuario es inválido',
    },
    console: {
      savingToPermanent: '💾 GUARDANDO EN BASE DE DATOS PERMANENTE DE USUARIOS:',
      successfullySaved: '✅ GUARDADO EXITOSAMENTE EN BASE DE DATOS PERMANENTE:',
      documentCreated: '📊 Documento creado en colección saved_usernames con ID:',
      errorSaving: '❌ ERROR GUARDANDO EN BASE DE DATOS PERMANENTE:',
      incrementedCounter: '📈 Contador de intentos de nombre ocupado incrementado para:',
      cannotIncrementCounter: '⚠️ No se puede incrementar contador - nombre de usuario no encontrado en saved_usernames:',
      errorIncrementingCounter: '❌ Error incrementando contador de intentos:',
      handlingUsernameChange: '🔄 MANEJANDO CAMBIO DE NOMBRE DE USUARIO:',
      usernameChangeCompleted: '✅ Cambio de nombre de usuario completado exitosamente',
      failedToSaveNewUsername: '❌ Falló al guardar nuevo nombre de usuario durante el cambio',
      errorHandlingUsernameChange: '❌ Error manejando cambio de nombre de usuario:',
      deletedOldUsername: '🗑️ Nombre de usuario anterior eliminado de base de datos permanente:',
      cannotDeleteUsername: '❌ No se puede eliminar nombre de usuario - pertenece a diferente usuario:',
      usernameNotFound: 'ℹ️ Nombre de usuario no encontrado en base de datos (¿ya eliminado?):',
      errorDeletingFromPermanent: '❌ Error eliminando de base de datos permanente:',
      fetchingAllSavedUsernames: '📊 Obteniendo todos los nombres de usuario guardados de la base de datos...',
      unknown: 'Desconocido',
      foundSavedUsernames: '✅ Se encontraron {{count}} nombres de usuario guardados en la base de datos',
      errorGettingSavedUsernames: '❌ Error obteniendo nombres de usuario guardados:',
      totalSavedUsernames: '📊 Total de nombres de usuario guardados en base de datos: {{count}}',
      errorCountingSavedUsernames: '❌ Error contando nombres de usuario guardados:',
      usernameDeactivated: '✅ Nombre de usuario desactivado:',
      unauthorizedDeactivation: '❌ No autorizado: El usuario no puede desactivar este nombre de usuario',
      cleanupCompleted: 'Se limpiaron {{count}} documentos de intentos expirados',
      exampleUsage: {
        title: 'CÓMO USAR LA BASE DE DATOS DE NOMBRES DE USUARIO GUARDADOS:',
        saveUsername: 'Cuando el usuario guarda exitosamente su nombre de usuario en tu aplicación:',
        seeAllSaved: 'Para ver todos los nombres de usuario guardados:',
        getCount: 'Para obtener el conteo:',
        testDatabase: 'Para probar la base de datos:',
        collectionContains: 'La colección saved_usernames contendrá:',
        documentId: 'ID del Documento: nombre de usuario en minúsculas',
        usernameField: 'username: mayúsculas/minúsculas originales',
        userIdField: 'userId: quién lo guardó',
        userEmailField: 'userEmail: email del usuario',
        savedAtField: 'savedAt: marca de tiempo',
        isActiveField: 'isActive: verdadero/falso',
        sourceField: 'source: desde dónde se guardó',
      },
    },
  },
consent: {
  // Age Verification
  ageVerification: 'Verificación de Edad',
  ageVerificationDesc: 'Necesitamos verificar tu edad para cumplir con COPPA (Ley de Protección de la Privacidad en Línea de los Niños).',
  over13: 'Tengo 13 años o más',
  under13: 'Soy menor de 13 años',
  ageRestriction: 'Restricción de Edad',
  mustBe13: 'Debes tener al menos 13 años para usar esta aplicación. Gracias por tu comprensión.',
  coppaNotice: 'Esta verificación es requerida por COPPA para proteger la privacidad de los niños.',
  confirmAge: 'Confirmo que tengo 13 años de edad o más',
  
  // Region Selection
  yourLocation: 'Tu Ubicación',
  locationDesc: 'Diferentes leyes de privacidad se aplican según tu ubicación. Por favor selecciona tu región:',
  europeanUnion: 'Unión Europea',
  unitedStates: 'Estados Unidos',
  otherRegion: 'Otra Región',
  applies: 'se aplica',
  mayApply: 'puede aplicar',
  standardPrivacy: 'Protecciones de privacidad estándar',
  californiaQuestion: '¿Residente de California?',
  californiaQuestionDesc: '¿Eres residente de California? Los derechos de privacidad de CCPA pueden aplicarse a ti.',
  
  // Consent Form
  privacyConsent: 'Privacidad y Consentimiento',
  privacyChoices: 'Tus Opciones de Privacidad',
  gdprDesc: 'Bajo GDPR, necesitamos tu consentimiento explícito para procesar tus datos. Puedes cambiar estas preferencias en cualquier momento en Configuración.',
  ccpaDesc: 'Bajo CCPA, tienes derecho a optar por no vender datos y saber cómo se usan tus datos. Elige tus preferencias a continuación.',
  standardDesc: 'Respetamos tu privacidad. Elige qué actividades de procesamiento de datos te resultan cómodas. Puedes cambiarlas en cualquier momento.',
  essentialNotice: 'Los servicios esenciales (autenticación, seguridad, funcionalidad básica de la aplicación) están siempre activos y no se pueden desactivar.',
  dataProcessingPreferences: 'Preferencias de Procesamiento de Datos',
  customizeExperience: 'Personaliza tu experiencia eligiendo qué datos deseas compartir con nosotros.',
  essential: 'Esencial',
  
  // Consent Options
  required: 'Requerido',
  essentialDesc: 'Requerido para que la aplicación funcione correctamente. Esto no se puede deshabilitar.',
  analytics: 'Análisis',
  analyticsDesc: 'Ayúdanos a mejorar la aplicación compartiendo datos de uso anónimos',
  analyticsData: 'Uso de la aplicación, funciones utilizadas, tiempo empleado',
  crashReports: 'Informes de Fallos',
  crashReportsDesc: 'Enviar automáticamente informes de fallos para ayudarnos a corregir errores',
  crashData: 'Información del dispositivo, registros de fallos, versión de la aplicación',
  performance: 'Monitoreo de Rendimiento',
  performanceDesc: 'Monitorear el rendimiento de la aplicación para identificar y corregir ralentizaciones',
  performanceData: 'Tiempos de carga, velocidad de red, rendimiento del dispositivo',
  marketing: 'Comunicaciones de Marketing',
  marketingDesc: 'Recibir contenido personalizado, ofertas y actualizaciones de productos',
  marketingData: 'Intereses, preferencias, historial de participación',
  dataCollected: 'Datos recopilados',
  tracking: 'Seguimiento y Publicidad',
  trackingDesc: 'Permítenos rastrear tu actividad en aplicaciones para publicidad personalizada',
  personalization: 'Personalización',
  personalizationDesc: 'Personaliza tu feed y recomendaciones según tus intereses',
  
  // Actions
  acceptAll: 'Aceptar Todo',
  rejectNonEssential: 'Rechazar No Esencial',
  rejectAll: 'Rechazar Todo (Solo Esencial)',
  savePreferences: 'Guardar Mis Preferencias',
  readPrivacyPolicy: 'Leer Política de Privacidad Completa',
  privacyPolicy: 'Política de Privacidad',
  privacyPolicyDesc: 'Aprende cómo recopilamos, usamos y protegemos tus datos', // ✅ NEW
  privacyPolicyFull: 'Tu texto completo de política de privacidad va aquí.',
  acceptSelected: 'Aceptar Seleccionado',
  declineAll: 'Rechazar Todo',
  
  // Legal Documents
  legalDocuments: 'Documentos Legales',
  legalDocumentsDesc: 'Ver nuestra política de privacidad y términos de servicio', // ✅ NEW
  termsOfService: 'Términos de Servicio',
  termsDesc: 'Lee los términos y condiciones para usar nuestra aplicación', // ✅ NEW
  byAccepting: 'Al continuar, aceptas nuestra Política de Privacidad y Términos de Servicio.',

  // Rights
  gdprRights: 'Bajo GDPR, tienes derecho a acceder, rectificar, borrar, restringir el procesamiento, portabilidad de datos y oponerte al procesamiento. Contáctanos para ejercer tus derechos.',
  ccpaRights: 'Bajo CCPA, tienes derecho a saber qué información personal se recopila, solicitar su eliminación y optar por no venderla. No serás discriminado por ejercer estos derechos.',
  standardRights: 'Tienes derecho a acceder y eliminar tus datos personales. Puedes administrar tu configuración de privacidad en cualquier momento en la aplicación.',
  yourRights: 'Tus Derechos sobre los Datos',
  gdprRightsDesc: 'Bajo GDPR, tienes derecho a acceder, exportar y eliminar tus datos personales.',
  ccpaRightsDesc: 'Bajo CCPA, tienes derecho a saber qué datos recopilamos y solicitar su eliminación.',
  standardRightsDesc: 'Tienes derecho a acceder y eliminar tus datos personales.',
  rightsDescription: 'Puedes cambiar estas preferencias en cualquier momento en Configuración. También tienes derecho a acceder, exportar o eliminar tus datos.',
  
  // Messages
  errorSaving: 'Error al guardar tus preferencias de consentimiento. Por favor, intenta de nuevo.',
  
  // Status
  consentStatus: 'Estado del Consentimiento',
  consentGiven: 'Consentimiento Dado',
  consentDate: 'Fecha del Consentimiento',
  region: 'Región',
  
  // Data Processing
  dataProcessing: 'Consentimiento de Procesamiento de Datos',
  dataProcessingDesc: 'Controla cómo se usan tus datos',
  active: 'Activo',
  inactive: 'Inactivo',
  
  // User Rights
  exportData: 'Exportar Tus Datos',
  exportDataShort: 'Descarga todos tus datos en formato JSON',
  deleteAllData: 'Eliminar Cuenta',
  deleteAllDataShort: 'Eliminar permanentemente todos tus datos (período de gracia de 30 días)',
  
  // CCPA
  ccpaOptions: 'Derechos de Privacidad de California (CCPA)',
  doNotSell: 'No Vender Mis Datos',
  doNotSellDesc: 'Optar por no vender datos según lo requiere CCPA',
  
  // Revoke
  revokeAll: 'Revocar Todo el Consentimiento',
  revokeAllConfirm: '¿Estás seguro de que quieres revocar todo el consentimiento? Esto deshabilitará todas las funciones de procesamiento de datos.',
  revokeAllNote: 'Esto establecerá todos los consentimientos como inactivos. Puedes volver a habilitarlos en cualquier momento.',
  allConsentRevoked: 'Se ha revocado todo el consentimiento.',
  
  // Messages
  consentEnabled: 'Consentimiento habilitado',
  consentDisabled: 'Consentimiento deshabilitado',
  updateFailed: 'Error al actualizar el consentimiento',
  requestReceived: 'Solicitud Recibida',
  revokeFailed: 'Error al revocar el consentimiento',
  
  // Info
  whyThisMatters: 'Por Qué Esto Importa',
  whyThisMattersDesc: 'Respetamos tu privacidad. Estos controles te dan transparencia y elección sobre cómo se usan tus datos. Puedes cambiar estos ajustes en cualquier momento.',
  
  // Additional
  welcomeTitle: 'Bienvenido a CultivaNetwork',
  introTitle: 'Bienvenido a CultivaNetwork',
  introText: 'CultivaNetwork recopila información básica — como tu nombre, detalles de perfil y actividad dentro de la app — únicamente para ofrecer y mejorar tu experiencia. No te rastreamos en otras apps o sitios web.',
  continue: 'Continuar',
  dataWeCollect: 'Qué Recopilamos',
  disclosureProfile: 'Tu información de perfil (nombre, foto, bio)',
  disclosureUsage: 'Cómo usas la app para mejorar funciones',
  disclosureCrash: 'Informes de fallos para ayudarnos a corregir errores',
  settingsDataSummary: 'Solo recopilamos lo necesario para el funcionamiento de la app. No te rastreamos en otras apps o sitios web.',
  profileDataDesc: 'Tu nombre, foto, bio y datos de contacto que proporcionas',
  usageDataDesc: 'Cómo usas la app para ayudarnos a mejorar funciones',
  crashDataDesc: 'Informes de fallos y errores para ayudarnos a corregir problemas',
  noTracking: 'Sin Rastreo Entre Apps',
  noTrackingDesc: 'No te rastreamos en otras apps o sitios web, ni compartimos tus datos con terceros para publicidad.',
},
  categories: {
    agriculture: 'Agricultura',
    automotive: 'Automotriz',
    construction: 'Construcción',
    technology: 'Tecnología',
    foodBeverage: 'Alimentos y Bebidas',
    retail: 'Comercio',
    services: 'Servicios',
    healthcare: 'Salud',
    education: 'Educación',
    finance: 'Finanzas',
    realEstate: 'Bienes Raíces',
    manufacturing: 'Manufactura',
    transportation: 'Transporte',
    entertainment: 'Entretenimiento',
    consulting: 'Consultoría',
    creativeMedia: 'Creativos y Medios',
    educationTraining: 'Educación y Capacitación',
    energyEnvironment: 'Energía y Medio Ambiente',
    foodBeverageServices: 'Servicios de Alimentos y Bebidas',
    healthcareWellness: 'Salud y Bienestar',
    manufacturingIndustrial: 'Manufactura e Industrial',
    professionalFinancial: 'Servicios Profesionales y Financieros',
    propertyMaintenance: 'Mantenimiento de Propiedades',
    retailConsumer: 'Retail y Bienes de Consumo',
    technologyDigital: 'Tecnología y Digital',
    transportationLogistics: 'Transporte y Logística',
    travel: 'Viajes',
    governmentPublicServices: 'Gobierno y Servicios Públicos',
    venue: 'Lugar',
  },
notifications: {
  notifications: 'Notificaciones',
  all: 'Todas',
  posts: 'Publicaciones',
  stories: 'Historias',
  follows: 'Pendientes',
  network: 'Red',
  pending: 'Pendientes',
  connections: 'Conexiones',
  incoming: 'Recibidas',
  outgoing: 'Enviadas',
  cancelRequest: 'Cancelar',
  requestSent: 'Solicitud de conexión enviada',
  noNetworkActivity: 'Sin conexiones aún',
  noIncomingRequests: 'Sin solicitudes recibidas',
  noOutgoingRequests: 'Sin solicitudes enviadas',
  messages: 'Mensajes',
  markAllRead: 'Marcar Todo como Leído',
  markRead: 'Marcar como Leído',
  markUnread: 'Marcar como No Leído',
  actions: 'Acciones de Notificación',
  chooseAction: 'Elige una acción para esta notificación',
  deleteConfirm: 'Eliminar Notificación',
  deleteConfirmMessage: '¿Estás seguro de que quieres eliminar esta notificación?',
  allMarkedRead: 'Todas las notificaciones marcadas como leídas',
  noNotifications: 'No hay notificaciones aún',
  noNotificationsSubtext: 'Cuando las personas interactúen con tu contenido, verás notificaciones aquí',
  noConversations: 'No hay conversaciones aún',
  recentConversations: 'Conversaciones Recientes',
  liked: 'le gustó tu publicación',
  commented: 'comentó en tu publicación',
  shared: 'compartió tu publicación',
  followed: 'se conectó contigo',
  viewedStory: 'vio tu historia',
  sentMessage: 'te envió un mensaje'
},
  specialties: {
    organicFarming: 'Agricultura Orgánica',
    cropManagement: 'Manejo de Cultivos',
    livestock: 'Ganadería',
    pestControl: 'Control de Plagas',
    soilManagement: 'Manejo de Suelos',
    irrigation: 'Irrigación',
    harvesting: 'Cosecha',
    seedSupply: 'Suministro de Semillas',
    fertilizers: 'Fertilizantes',
    equipmentRental: 'Alquiler de Equipos',
    consulting: 'Consultoría',
    realEstate: 'Bienes Raíces',
    rawMaterials: 'Materias Primas',
    supplies: 'Suministros',
    manager: 'Gerente',
    automotive: 'Automotriz',
    agriculturalEquipment: 'Equipos Agrícolas',
    agriculturalEquipmentRetail: 'Venta de Equipos Agrícolas',
    agriculturalServices: 'Servicios Agrícolas',
    agriculturalSupply: 'Suministros Agrícolas',
    cropNutritionProtection: 'Nutrición/Protección de Cultivos',
    farming: 'Agricultura',
    farmLabor: 'Mano de Obra Agrícola',
    farmManagement: 'Gestión Agrícola',
    farmSupply: 'Suministros de Granja',
    fertilizer: 'Fertilizante',
    irrigationServicesSupply: 'Servicios/Suministros de Irrigación',
    pesticides: 'Pesticidas',
    veterinaryServicesSupply: 'Servicios/Suministros Veterinarios',
    vineyards: 'Viñedos',
    agricultureLab: 'Laboratorio Agrícola',
    fieldTrials: 'Ensayos de Campo',
    dairy: 'Productos Lácteos',
    dairyServices: 'Servicios Lácteos',
    agricultureRealEstate: 'Bienes Raíces Agrícolas',
    cropInsurance: 'Seguro de Cultivos',
    assetManagement: 'Gestión de Activos',
    audioEngineering: 'Ingeniería de Audio',
    contentCreation: 'Creación de Contenido',
    design: 'Diseño',
    filmVideo: 'Cine y Video',
    musicProduction: 'Producción Musical',
    photography: 'Fotografía',
    writingPublishing: 'Escritura y Publicación',
    newsCurrentEventsJournalism: 'Noticias, Actualidad y Periodismo',
    commercialConstruction: 'Construcción Comercial',
    constructionTrades: 'Construcción y Oficios',
    corporateTraining: 'Capacitación Corporativa',
    educationalServices: 'Servicios Educativos',
    formalEducation: 'Educación Formal',
    government: 'Gobierno',
    library: 'Biblioteca',
    nonProfits: 'Sin Fines de Lucro',
    residentialConstruction: 'Construcción Residencial',
    socialServices: 'Servicios Sociales',
    specializedTrades: 'Oficios Especializados',
    university: 'Universidad',
    highSchool: 'Escuela Secundaria',
    juniorCollege: 'Colegio Comunitario',
    analysis: 'Análisis',
    energy: 'Energía',
    environment: 'Medio Ambiente',
    utilities: 'Servicios Públicos',
    waterServices: 'Servicios de Agua',
    barsNightlife: 'Bares y Vida Nocturna',
    cafe: 'Café',
    coffeeShops: 'Cafeterías',
    foodServices: 'Servicios de Alimentos',
    restaurants: 'Restaurantes',
    barbershop: 'Barbería',
    dentalServices: 'Servicios Dentales',
    fitness: 'Fitness',
    hairNailSalon: 'Salón de Cabello/Uñas',
    healthcareProviders: 'Proveedores de Salud',
    massageParlor: 'Salón de Masajes',
    medicalDevices: 'Dispositivos Médicos',
    mentalHealth: 'Salud Mental',
    nutrition: 'Nutrición',
    pharmaceuticals: 'Farmacéuticos',
    physicalTherapy: 'Fisioterapia',
    spa: 'Spa',
    wellness: 'Bienestar',
    aerospace: 'Aeroespacial',
    chemicals: 'Químicos',
    foodBeverageManufacturing: 'Manufactura de Alimentos y Bebidas',
    hydraulicServicesParts: 'Servicios/Partes Hidráulicas',
    industrial: 'Industrial',
    textiles: 'Textiles',
    constructionAggregates: 'Agregados de Construcción',
    accounting: 'Contabilidad',
    architectureDesign: 'Arquitectura y Diseño',
    engineering: 'Ingeniería',
    financialServices: 'Servicios Financieros',
    legalServices: 'Servicios Legales',
    marketingAdvertising: 'Marketing y Publicidad',
    healthInsurance: 'Seguro de Salud',
    autoInsurance: 'Seguro de Auto',
    homeInsurance: 'Seguro de Hogar',
    financialManagement: 'Gestión Financiera',
    financialAnalysis: 'Análisis Financiero',
    assetProtection: 'Protección de Activos',
    propertyManagement: 'Gestión de Propiedades',
    autoDetailing: 'Detallado de Autos',
    electrical: 'Electricidad',
    handyMan: 'Servicios Generales',
    hvac: 'HVAC',
    landscaping: 'Paisajismo',
    lawnCare: 'Cuidado de Jardines',
    pressureWashing: 'Lavado a Presión',
    wasteRemoval: 'Recolección de Residuos',
    apparel: 'Ropa',
    automotiveRentals: 'Alquiler Automotriz',
    automotiveRetail: 'Venta Automotriz',
    beauty: 'Belleza',
    bookstore: 'Librería',
    carAudio: 'Audio para Autos',
    carWash: 'Lavado de Autos',
    electronics: 'Electrónicos',
    electronicsRetail: 'Venta de Electrónicos',
    gardening: 'Jardinería',
    hardware: 'Ferretería',
    homeGoods: 'Artículos para el Hogar',
    specialtyRetail: 'Retail Especializado',
    tools: 'Herramientas',
    westernWear: 'Ropa Vaquera',
    workWear: 'Ropa de Trabajo',
    aiMachineLearning: 'IA y Aprendizaje Automático',
    blockchain: 'Blockchain',
    cloudComputing: 'Computación en la Nube',
    cybersecurity: 'Ciberseguridad',
    dataAnalytics: 'Datos y Análisis',
    ecommercePlatforms: 'Plataformas de Comercio Electrónico',
    edtech: 'TecnologíaEducativa',
    fintech: 'TecnologíaFinanciera',
    gaming: 'Videojuegos',
    hardwareElectronics: 'Hardware y Electrónicos',
    healthtech: 'TecnologíaMédica',
    itServices: 'Servicios de TI',
    softwareSaas: 'Software y SaaS',
    telecommunications: 'Telecomunicaciones',
    webDevelopment: 'Desarrollo Web',
    batteryServices: 'Servicios de Batería',
    equipmentTransportation: 'Transporte de Equipos',
    logistics: 'Logística',
    roadside: 'Auxilio Vial',
    shipping: 'Envío',
    tireServices: 'Servicios de Neumáticos',
    towServices: 'Servicios de Grúa',
    repossessionServices: 'Servicios de Recuperación',
    accommodation: 'Alojamiento',
    hospitality: 'Hospitalidad',
    airTravel: 'Viajes Aéreos',
    hotel: 'Hotel',
    rvPark: 'Parque de Casas Rodantes',
    busTransportation: 'Transporte en Autobús',
    trainTransportation: 'Transporte en Tren',
    packagingWarehouse: 'Almacén de Empaque',
    coldStorage: 'Almacenamiento en Frío',
    storageWarehouse: 'Almacén de Almacenamiento',
    miniStorage: 'Mini Almacén',
    rvStorage: 'Almacenamiento de Casas Rodantes',
    boatStorage: 'Almacenamiento de Botes',
    rentals: 'Alquileres',
    cosmetics: 'Cosméticos',
    generalProducts: 'Productos Generales',
    partsSupply: 'Suministro de Partes',
    artsCrafts: 'Artes y Manualidades',
    ballroom: 'Salón de Baile',
    conventionCenter: 'Centro de Convenciones',
    eventHall: 'Salón de Eventos',
    privateVenue: 'Lugar Privado',
    stadium: 'Estadio',
  },

  network: {
    title: 'Red',
    feedComingSoon: 'Feed de Red Próximamente',
    feedDescription: 'Aquí se mostrarán las publicaciones de tu red',
    signInToCreatePosts: 'Inicia sesión para crear publicaciones.',
    networkFeed: 'Red',
    followingFeed: 'Conexiones',
    createPost: 'Crear Publicación',
    whatsHappening: '¿Qué está pasando en tu mundo agrícola?',
    searchPlaceholder: 'Buscar publicaciones, personas, empresas...',
    noPostsFound: 'No se encontraron publicaciones',
    noFriendsPostsYet: 'Aún no hay publicaciones de amigos',
    noConnectionsYet: 'Sin conexiones aún',
    startFollowing: 'Comienza a conectar con personas para ver sus publicaciones aquí',
    adjustFilters: 'Intenta ajustar tus filtros de búsqueda',
    signInToSee: 'Inicia sesión para ver publicaciones',
    joinConversation: 'Crea una cuenta para unirte a la conversación',
    stories: 'Historias',
    addStory: 'Agregar Historia',
    viewStory: 'Ver Historia',
    sharePost: 'Compartir Publicación',
    bookmarkPost: 'Guardar Publicación',
    likePost: 'Me Gusta',
    commentOnPost: 'Comentar Publicación',
    reportPost: 'Reportar Publicación',
    hidePost: 'Ocultar Publicación',
    blockUser: 'Bloquear Usuario',
      followToSeeStories: 'Conéctate con personas para ver sus historias',
      postHasBeenDeleted: 'Esta publicación ha sido eliminada',
      viewPost: 'Ver Publicación',

  },

  postAnalytics: {
    title: 'Analíticas de Publicación',
    views: 'Vistas',
    likes: 'Me gusta',
    comments: 'Comentarios',
    shares: 'Compartidos',
    bookmarks: 'Guardados',
    whoViewed: 'Quién vio',
    whoLiked: 'A quién le gustó',
    whoCommented: 'Quién comentó',
    whoBookmarked: 'Quién guardó',
    totalShares: 'Total compartido',
    noData: 'Sin datos aún',
  },

  manage: {
    title: 'Gestionar',
    browseBusinesses: 'Explorar Empresas',
    manageBusiness: 'Gestionar Negocio',
    loading: 'Cargando...',
    services: 'Servicios',
    messages: 'Mensajes',
    analytics: 'Analíticas',
    addService: 'Agregar Servicio',
    editService: 'Editar Servicio',
    serviceName: 'Nombre del Servicio',
    serviceDescription: 'Descripción del Servicio',
    startingPrice: 'Precio Inicial',
    category: 'Categoría',
    addImage: 'Agregar Imagen',
    changeImage: 'Cambiar Imagen',
    noServicesFound: 'No se encontraron servicios',
    createFirstService: 'Crea tu primer servicio o ajusta los filtros',
    searchServices: 'Buscar servicios...',
    searchBusinesses: 'Buscar empresas, servicios, industrias...',
    allIndustries: 'Todas las Industrias',
    messageCount: 'conversaciones',
    conversationsWillAppear: 'Los mensajes aparecerán aquí cuando las empresas te contacten',
    businessMessages: 'Mensajes de Negocios',
    profileRequired: 'Perfil Requerido',
    addDisplayName: 'Agrega al menos un nombre para mostrar o nombre comercial para crear publicaciones.',
    accountType: 'Tipo de Cuenta',
    everyone: 'Todos',
    businessesOnly: 'Solo Empresas',
    industries: 'Industrias',
    sectors: 'Sectores',
    location: 'Ubicación',
    applyFilters: 'Aplicar Filtros',
    resetFilters: 'Restablecer',
    searchFilter: 'Buscar y Filtrar',
    cityOrZip: 'Ciudad o código postal',
    specialties: 'Especialidades',
    loadingServices: 'Cargando servicios...',
    loadingPosts: 'Cargando publicaciones...',
    loadingAnalytics: 'Cargando analíticas...',
    type: 'Tipo',
    image: 'Imagen',
    product: 'Producto',
    service: 'Servicio',
    enterServiceName: 'Ingresa el nombre del servicio',
    describeService: 'Describe tu servicio',
    enterPrice: 'Ingresa el precio',
    enterCategory: 'Ingresa la categoría',
    serviceNameRequired: 'El nombre del servicio es obligatorio.',
    serviceDescriptionRequired: 'La descripción del servicio es obligatoria.',
    validPriceRequired: 'Se requiere un precio válido.',
    contactForPrice: 'Contactar para precio',
    pleaseSelectCategory: 'Por favor selecciona una categoría.',
    serviceUpdatedSuccessfully: '¡Servicio actualizado exitosamente!',
    serviceCreatedSuccessfully: '¡Servicio creado exitosamente!',
    failedToCreateService: 'Error al crear servicio. Inténtalo de nuevo.',
    failedToUpdateService: 'Error al actualizar servicio. Inténtalo de nuevo.',
    restrictVisibility: 'Restringir Visibilidad',
    mediaActions: 'Acciones de Media',
    postArchived: 'Publicación archivada exitosamente',
    postVisibilityRestricted: 'Visibilidad de publicación restringida',
    postDeleted: 'Publicación eliminada exitosamente',
    failedToArchive: 'Error al archivar publicación. Inténtalo de nuevo.',
    failedToRestrict: 'Error al restringir publicación. Inténtalo de nuevo.',
    failedToDelete: 'Error al eliminar publicación. Inténtalo de nuevo.',
    characterCount: '{{current}}/{{max}} caracteres',
    noConversationsYet: 'No hay conversaciones aún',
    messagesWillAppearHere: 'Los mensajes aparecerán aquí cuando las empresas te contacten',
    onlineStatus: 'En línea',
    offlineStatus: 'Desconectado',
    permissionRequiredCamera: 'Permiso de Cámara Requerido',
    grantCameraPermission: 'Por favor concede permiso para acceder a la cámara.',
    failed: 'Error',
    tryAgainLater: 'Por favor intenta más tarde',
    conversationStarted: 'Conversación iniciada exitosamente',
    failedToStartConversation: 'Error al iniciar conversación',
    authenticationRequired: 'Autenticación Requerida',
    pleaseSignInToStart: 'Por favor inicia sesión para comenzar conversaciones.',
    selectFromPhotoLibrary: 'Seleccionar de la biblioteca de fotos',
    noDataAvailable: 'No hay datos disponibles aún',
    lastActive: 'Última actividad',
    startConversation: 'Iniciar Conversación',
    allCategories: 'Todas las Categorías',
    viewProfile: 'Ver Perfil',
    businessProfile: 'Perfil de Negocio',
    timeline: 'Cronología',
    servicesAndProducts: 'Servicios y Productos',
    noServicesYet: 'No hay servicios aún',
    createYourFirst: 'Crea tu primer servicio',
    selectMedia: 'Seleccionar Media',
    removeMedia: 'Eliminar Media',
    mediaSelected: 'Media seleccionado',
    pleaseEnterValidPrice: 'Por favor ingresa un precio válido',
    categoryRequired: 'La categoría es requerida',
    verified: 'Verificado',
    moreSpecialties: 'más especialidades',
    businessHours: 'Horarios de Atención',
    established: 'Establecido',
    viewFullProfile: 'Ver Perfil Completo',
    getDirections: 'Obtener Direcciones',
    business: 'empresa',
  businesses: 'empresas',
  confirmDeleteService: '¿Estás seguro de que quieres eliminar',  // ← ADD THIS
  serviceDeletedSuccessfully: 'Servicio eliminado exitosamente',
  allLocations: 'Todas las Ubicaciones',
  allSpecialties: 'Todas las Especialidades',
  moreFilters: 'Más Filtros',
  anyRating: 'Cualquier Calificación',
  minRating: 'Calificación Mínima',
  locationRadius: 'Radio de Ubicación',
  useMyLocation: 'Usar Mi Ubicación',
  searchAddress: 'Buscar Dirección',
  gettingLocation: 'Obteniendo tu ubicación...',
  searchLocationPlaceholder: 'Buscar una dirección o ciudad...',
  radius: 'Radio',
  adjustFilters: 'Intenta ajustar tus filtros',
  },

  profile: {
    title: 'Perfil',
    editProfile: 'Editar Perfil',
    accountSettings: 'Configuración de Cuenta',
    privacy: 'Privacidad',
    help: 'Ayuda',
    about: 'Acerca de',
    signOut: 'Cerrar Sesión',
    profilePicture: 'Foto de Perfil',
    displayName: 'Nombre para Mostrar',
    businessName: 'Nombre del Negocio',
    bio: 'Biografía',
    website: 'Sitio Web',
    phone: 'Teléfono',
    address: 'Dirección',
    saveChanges: 'Guardar Cambios',
    discardChanges: 'Descartar Cambios',
    followersCount: 'Conectados',
    followingCount: 'Conectado A',
    postsCount: 'Publicaciones',
    follow: 'Conectar',
    unfollow: 'Eliminar Conexión',
    following: 'Conectado',
    pendingConnection: 'Pendiente',
    acceptConnection: 'Aceptar',
    declineConnection: 'Rechazar',
    cancelRequest: 'Cancelar Solicitud',
    connectionRequest: 'quiere conectarse contigo',
    connectionAccepted: 'aceptó tu solicitud de conexión',
    message: 'Mensaje',
    viewLocation: 'Ver Ubicación',
    contactInfo: 'Info de Contacto',
    businessHours: 'Horario de Atención',
    established: 'Establecido',
    verified: 'Verificado',
    individual: 'Individual',
    business: 'Empresa',
    selectCategory: 'Seleccionar Categoría',
    selectSpecialties: 'Seleccionar Especialidades',
    chooseAllThatApply: 'Elige todas las que apliquen',
    selected: 'seleccionadas',
    loading: 'Cargando perfil...',
    createProfile: 'Crear Perfil',
    welcomeToProfile: 'Bienvenido a Tu Perfil',
    createAccountToAccess: 'Crea una cuenta para acceder a tu perfil y gestionar tu información comercial',
    letsBegin: 'Comencemos',
    unsavedChanges: 'Cambios sin Guardar',
    unsavedChangesMessage: '¿Tienes cambios sin guardar. ¿Te gustaría guardarlos antes de cerrar?',
    discard: 'Descartar',
    myProfile: 'Mi Perfil',
    userProfile: 'Perfil de Usuario',
    addCoverPhoto: 'Agregar Foto de Portada',
    userName: 'Nombre de Usuario',
    yourName: 'Tu Nombre',
    required: '*',
    enterUsername: 'Ingresa tu nombre de usuario',
    enterRealName: 'Ingresa tu nombre real',
    enterDisplayName: 'Ingresa tu nombre para mostrar',
    enterBusinessName: 'Ingresa el nombre de tu negocio',
    tellUsAboutYourself: 'Cuéntanos sobre ti y tu experiencia',
    tellUsAboutBusiness: 'Cuéntanos sobre tu negocio y servicios',
    industry: 'Industria',
    currentPosition: 'Posición Actual',
    sectors: 'Sectores',
    noneSelected: 'Ninguno seleccionado',
    contactInformation: 'Información de Contacto',
    businessAddress: 'Dirección del Negocio',
    searchForAddress: 'Buscar Dirección',
    getPreciseLocation: 'Obtener ubicación precisa automáticamente',
    selectedAddress: 'Dirección Seleccionada',
    locationForNetworking: 'Agrega tu ubicación para networking',
    selectedLocation: 'Ubicación Seleccionada',
    searchForLocation: 'Buscar Ubicación',
    useGpsLocation: 'Usar Ubicación GPS',
    enterManually: 'Ingresar Manualmente',
    locationDetails: 'Detalles de Ubicación',
    preciseLocationAvailable: 'Ubicación precisa disponible',
    educationAcademicBackground: 'Educación y Formación Académica',
    degreeCertification: 'Título/Certificación',
    schoolUniversity: 'Escuela/Universidad',
    graduationYear: 'Año de Graduación',
    gpa: 'Promedio',
    additionalEducation: 'Educación Adicional',
    academicAwardsHonors: 'Premios y Honores Académicos',
    professionalCertifications: 'Certificaciones Profesionales',
    volunteerWorkCommunity: 'Trabajo Voluntario y Servicio Comunitario',
    publicationsResearch: 'Publicaciones e Investigación',
    additionalInformation: 'Información Adicional',
    businessDetails: 'Detalles del Negocio',
    keySkills: 'Habilidades Clave',
    languages: 'Idiomas',
    professionalInterests: 'Intereses Profesionales',
    otherRelevantInformation: 'Otra Información Relevante',
    yearEstablished: 'Año de establecimiento',
    logout: 'Cerrar Sesión',
    areYouSureLogout: '¿Estás seguro de que quieres cerrar sesión?',
    usernameNotAvailable: 'Nombre de Usuario No Disponible',
    displayNameNotAvailable: 'Nombre para Mostrar No Disponible',
    availableAlternatives: 'Alternativas disponibles:',
    use: 'Usar',
    searchAddress: 'Buscar Dirección',
    findExactAddress: 'Encuentra tu dirección exacta para mostrar ubicación precisa',
    startTypingAddress: 'Comienza a escribir tu dirección...',
    startWithStreetNumber: 'Comienza con el número de tu calle o dirección',
    selectingAddressProvidesGPS: 'Seleccionar una dirección proporciona coordenadas GPS precisas',
    selectCoverPhoto: 'Seleccionar Foto de Portada',
    selectLogo: 'Seleccionar Logo',
    chooseFromGallery: 'Elegir de la Galería',
    selectFromPhotoLibrary: 'Seleccionar de tu biblioteca de fotos',
    invalidUrl: 'URL Inválida',
    unableToOpenWebsite: 'No se puede abrir este sitio web. Por favor verifica el formato de la URL.',
    checkUrlFormat: 'Por favor verifica el formato de la URL',
    copyUrl: 'Copiar URL',
    urlCopied: 'URL Copiada',
    offlineMode: 'Modo Desconectado',
    profileSavedLocally: 'Tu perfil se ha guardado localmente y se sincronizará cuando estés en línea.',
    saveFailed: 'Error al Guardar',
    authenticationError: 'Error de autenticación. Por favor inicia sesión de nuevo.',
    signInAgain: 'Por favor inicia sesión de nuevo',
    success: 'Éxito',
    profileSavedSuccessfully: '¡Perfil guardado exitosamente!',
    manualEntry: 'Entrada Manual',
    enterBusinessAddress: 'Ingresa la dirección de tu negocio:',
    enterYourLocation: 'Ingresa tu ubicación:',
    addressSelected: 'Dirección Seleccionada',
    addressUpdatedWithLocation: 'Dirección actualizada con datos de ubicación precisos para mostrar en el mapa.',
    failedToProcessAddress: 'Error al procesar la dirección. Por favor intenta de nuevo.',
    phoneFormat: '(555) 123-4567',
    enterWebsiteUrl: 'Ingresa URL del sitio web (ej., https://cultivanetwork.com)',
    degreeExample: 'ej., Licenciatura en Ciencias de la Computación',
    universityExample: 'ej., Universidad de California, Berkeley',
    graduationYearExample: 'ej., 2023',
    gpaExample: 'ej., 3.8',
    businessHoursExample: 'ej., Lun-Vie: 9AM-6PM',
    additionalEducationPlaceholder: 'Otros cursos, bootcamps, certificaciones en línea...',
    academicAwardsPlaceholder: 'Lista del decano, becas, competencias académicas...',
    certificationsPlaceholder: 'Certificaciones industriales, licencias, credenciales profesionales...',
    volunteerWorkPlaceholder: 'Participación comunitaria, puestos voluntarios, trabajo sin fines de lucro...',
    publicationsPlaceholder: 'Trabajos de investigación, artículos, trabajo publicado...',
    keySkillsPlaceholder: 'Habilidades técnicas, competencia en software, herramientas con experiencia...',
    languagesPlaceholder: 'ej., Inglés (Nativo), Español (Fluido), Francés (Conversacional)',
    professionalInterestsPlaceholder: 'Áreas que te apasionan, industrias en las que quieres trabajar...',
    otherRelevantPlaceholder: 'Cualquier otra cosa que pueda ser relevante para empleadores potenciales...',
    currentPositionPlaceholder: 'ej., Ingeniero de Software Senior, Gerente de Granja, etc.',
    gpaPlaceholder: 'ej., 3.8',
    removeLocation: 'Eliminar Ubicación',
  locationRemoved: 'Ubicación Eliminada',
  businessAddressRemoved: 'La dirección del negocio ha sido eliminada de tu perfil.',
  locationCleared: 'Tu ubicación ha sido eliminada de tu perfil.',
  preciseLocationWithGPS: 'Ubicación precisa con coordenadas GPS',
  manualEntryNoGPS: 'Entrada manual - sin coordenadas GPS',
    addressDetailsTitle: 'Detalles de Dirección',
  locationDetailsTitle: 'Detalles de Ubicación',
  coordinatesLabel: 'Coordenadas:',
  googlePlaceIdLabel: 'ID de Google Places:',
  manualEntryLabel: 'Entrada manual',
    searchAddressPlaceholder: 'Comienza a escribir tu dirección...',
  noResultsFound: 'No se encontraron direcciones. Intenta con un término diferente.',
  searchError: 'Búsqueda falló. Por favor verifica tu conexión a internet.',
    apiKeyNotConfigured: 'La búsqueda de direcciones no está disponible. Por favor contacta soporte.',
  networkError: 'Error de red. Por favor verifica tu conexión e intenta de nuevo.',
  requestTimeout: 'Tiempo de espera agotado. Por favor intenta de nuevo.',
  rateLimitExceeded: 'Demasiadas solicitudes. Por favor espera un momento e intenta de nuevo.',
  requestDenied: 'Permiso de búsqueda de direcciones denegado. Por favor contacta soporte.',
  requiredFieldsProgress: '{filled} de {total} campos requeridos completados',
  fieldsRemaining: 'Campos pendientes:',
  multipleLocations: 'Múltiples Ubicaciones',
  multipleLocationsDescription: 'Agrega ubicaciones adicionales para tu negocio',
  addLocation: 'Agregar Ubicación',
  locationName: 'Nombre de la Ubicación',
  locationNamePlaceholder: 'ej., Oficina Principal, Almacén, Sucursal Centro',
  locationPhone: 'Teléfono',
  locationBusinessHours: 'Horario de Atención',
  locationAddress: 'Dirección',
  additionalLocations: 'Ubicaciones Adicionales',
  editLocation: 'Editar Ubicación',
  deleteLocation: 'Eliminar Ubicación',
  deleteLocationConfirm: '¿Eliminar Ubicación?',
  deleteLocationMessage: '¿Estás seguro de que deseas eliminar esta ubicación?',
  locationAdded: 'Ubicación agregada exitosamente',
  locationUpdated: 'Ubicación actualizada exitosamente',
  locationDeleted: 'Ubicación eliminada',
  noAdditionalLocations: 'Aún no hay ubicaciones adicionales',
  addYourFirstLocation: 'Toca "Agregar Ubicación" para añadir otra ubicación de negocio',
  usePrimaryIfBlank: 'Dejar en blanco para usar la información de la ubicación principal',
  },

  scan: {
    title: 'Escanear',
    searchLocation: 'Buscar Ubicación',
    nearbyBusinesses: 'Empresas Cercanas',
    mapView: 'Vista de Mapa',
    listView: 'Vista de Lista',
    directions: 'Direcciones',
    callBusiness: 'Llamar Empresa',
    visitWebsite: 'Visitar Sitio Web',
    noBusinessesNearby: 'No se encontraron empresas cercanas',
    locationPermission: 'Permiso de Ubicación Requerido',
    enableLocation: 'Habilitar Ubicación',
    searchRadius: 'Radio de Búsqueda',
    filterByCategory: 'Filtrar por Categoría',
    miles: 'millas',
    kilometers: 'km',
    searchBusinesses: 'Buscar empresas...',
    measure: 'Medir',
    edit: 'Editar',
    area: 'Área',
    perimeter: 'Perímetro',
    points: 'Puntos',
    method: 'Método',
    manual: 'Manual',
    gps: 'GPS',
    notes: 'Notas',
    created: 'Creado',
    unknown: 'Desconocido',
    savedFields: 'Campos Guardados',
    loadingFields: 'Cargando campos...',
    manualDrawing: 'Dibujo Manual',
    gpsWalking: 'Caminata GPS',
    tapToView: 'Toca para ver en el mapa',
    noFieldsSaved: 'No hay campos guardados aún',
    tapMeasureToStart: 'Toca el botón "Medir" para comenzar a medir áreas de campos',
    businesses: 'empresas',
    found: 'encontradas',
    more: 'más',
    locationNotSpecified: 'Ubicación no especificada',
    tapToViewProfile: 'Toca para ver el perfil completo',
    pleaseSignInToDiscover: 'Por favor inicia sesión para descubrir empresas cerca de ti',
    loadingMap: 'Cargando mapa...',
    specialties: 'Especialidades',
    signInRequired: 'Inicio de Sesión Requerido',
    mapStandard: 'Estándar',
    mapSatellite: 'Satélite',
    mapHybrid: 'Híbrido',
  },

  settings: {
    title: 'Configuración',
    loading: 'Cargando configuración...',
    general: 'General',
    accounts: 'Cuentas',
    activity: 'Actividad',
    blocked: 'Bloqueados',
    privacy: 'Privacidad',
    language: 'Idioma',
    accountManagement: 'Gestión de Cuentas',
    accountManagementDesc: 'Administra y cambia entre tus múltiples cuentas',
    activeAccount: 'Cuenta Activa',
    allAccounts: 'Todas las Cuentas',
    addAccount: 'Agregar Cuenta',
    switchAccount: 'Cambiar Cuenta',
    removeAccount: 'Eliminar Cuenta',
    individual: 'Individual',
    business: 'Empresa',
    lastActive: 'Última actividad',
    followers: 'conexiones',
    following: 'conexiones',
    yourActivity: 'Tu Actividad',
    yourActivityDesc: 'Ve y gestiona tu historial de actividad con actualizaciones en tiempo real',
    networkConnections: 'Red y Conexiones',
    networkConnectionsDesc: 'Tu presencia social en Cultiva',
    contentEngagement: 'Contenido e Interacción',
    contentEngagementDesc: 'Tus publicaciones e interacciones',
    peopleFollowingYou: 'Conectados',
    peopleYouFollow: 'Conectado A',
    postsCreated: 'Publicaciones creadas',
    likesGiven: 'Me gusta dados',
    commentsPosted: 'Comentarios publicados',
    postsSaved: 'Publicaciones guardadas',
    noActivityYet: 'Sin actividad aún',
    justNow: 'Justo ahora',
    viewPost: 'Ver publicación',
    showDeleted: 'Mostrar Eliminados',
    showArchived: 'Mostrar Archivados',
    recentActivities: 'Actividades Recientes',
    noRecentActivities: 'Sin actividades recientes',
    languageSettings: 'Configuración de Idioma',
    languageSettingsDesc: 'Elige tu idioma preferido para toda la aplicación',
    currentLanguage: 'Idioma Actual',
    selectLanguage: 'Seleccionar Idioma',
    languageChanged: 'Idioma cambiado exitosamente',
    restartRequired: 'Por favor reinicia la aplicación para el efecto completo',
    blockedUsers: 'Usuarios Bloqueados',
    blockedUsersDesc: 'Administra usuarios que has bloqueado para que no interactúen contigo',
    blockUser: 'Bloquear Usuario',
    unblockUser: 'Desbloquear',
    searchUsers: 'Buscar usuarios',
    searchUsersPlaceholder: 'Buscar usuarios por nombre o negocio...',
    noUsersFound: 'No se encontraron usuarios',
    tryDifferentSearch: 'Prueba un término de búsqueda diferente',
    searchForUsers: 'Buscar usuarios para bloquear',
    startTyping: 'Comienza a escribir para ver resultados',
    blockConfirm: '¿Bloquear a {{name}}? No podrán ver tus publicaciones ni contactarte.',
    unblockConfirm: '¿Desbloquear a {{name}}?',
    userBlocked: 'Usuario bloqueado exitosamente',
    userUnblocked: 'Usuario desbloqueado exitosamente',
    blockedDate: 'Bloqueado el {{date}}',
    privacySettings: 'Configuración de Privacidad',
    privacySettingsDesc: 'Controla cómo otros pueden ver e interactuar con tu perfil',
    profileVisibility: 'Visibilidad del Perfil',
    profileVisibilityDesc: 'Controla quién puede ver la información de tu perfil',
    public: 'Público',
    friendsOnly: 'Solo Conexiones',
    private: 'Privado',
    publicDesc: 'Cualquiera puede ver tu perfil y publicaciones',
    friendsOnlyDesc: 'Solo tus conexiones pueden ver tu perfil',
    privateDesc: 'Solo tú puedes ver tu perfil',
    clearAllData: 'Borrar Todos los Datos',
    clearAllDataDesc: 'Esto eliminará permanentemente todos tus datos incluyendo publicaciones, mensajes y actividad. Esta acción no se puede deshacer.',
    privacyFeaturesComing: 'Configuración de Privacidad',
    privacyFeaturesDesc: 'Tu privacidad es importante. Los controles avanzados de privacidad estarán disponibles en una futura actualización.',
     enterEmailPassword: 'Por favor ingresa correo electrónico y contraseña',
  switchedToAccount: 'Cambiado a {{name}}',
  accountAdded: 'Cuenta Agregada',
  accountAddedDesc: '¡Cuenta agregada y cambiada exitosamente! Cierra Configuración para ver las publicaciones de tu nueva cuenta.',
  closeSettings: 'Cerrar Configuración',
  accountOperationFailed: 'Error al procesar cuenta. Por favor intenta de nuevo.',
  noAccountFound: 'No se encontró cuenta con esta dirección de correo.',
  incorrectPassword: 'Contraseña incorrecta para esta cuenta.',
  invalidEmail: 'Por favor ingresa una dirección de correo válida.',
  tooManyAttempts: 'Muchos intentos fallidos. Intenta más tarde.',
  operationFailed: 'Operación Fallida',
  accountNotFound: 'Cuenta no encontrada.',
  switchAccountConfirm: 'Necesitarás ingresar tu contraseña para verificar tu identidad.',
  removeAccountConfirm: '¿Eliminar {{name}} de este dispositivo? Puedes agregarla de nuevo iniciando sesión.',
  accountRemovedSuccess: 'Cuenta eliminada exitosamente.',
  accountRemovalFailed: 'Error al eliminar cuenta.',
  currentUser: 'Usuario Actual',
  businessAccount: 'Cuenta Comercial',
  individualAccount: 'Cuenta Individual',
  userAccount: 'Usuario',
  switchingAccounts: 'Cambiando cuentas...',
  loadingLanguage: 'Cargando idioma...',
  accountFeatures: 'Datos Separados • Cambio Instantáneo • Seguro y Privado',
  rememberLogin: 'Recordar este inicio de sesión para cambio rápido',
  quickSwitch: 'Cambio Rápido',
  savedLoginExpired: 'Inicio de Sesión Guardado Expirado',
  savedLoginExpiredDesc: 'Tus credenciales guardadas ya no son válidas. Por favor inicia sesión de nuevo.',
  forgetSavedLogin: 'Olvidar Inicio de Sesión',
  forgetSavedLoginConfirm: '¿Eliminar inicio de sesión guardado para {{name}}? Necesitarás ingresar la contraseña la próxima vez.',
  forget: 'Olvidar',

  // Activity
  activityManagement: 'Gestión de Actividad',
  activityDeleteFailed: 'Error al eliminar actividad.',
  activityArchiveFailed: 'Error al archivar actividad.',
  aPost: 'una publicación',
  aBusiness: 'un negocio',
  someone: 'alguien',
  
  // Blocking
  unknownUser: 'Usuario Desconocido',
  blockedByUser: 'Bloqueado por usuario',
  blockUserFailed: 'Error al bloquear usuario.',
  unblockUserFailed: 'Error al desbloquear usuario.',
  reason: 'Razón',
  searchUsersToBlock: 'Busca usuarios por nombre o negocio para bloquearlos',
  
  // Sound Effects
  soundEffects: 'Efectos de Sonido',
  soundEffectsDesc: 'Reproducir sonidos para notificaciones y acciones',
  enableSounds: 'Activar Sonidos',

  // Privacy
  privacySettingsUpdated: 'Configuración de privacidad actualizada.',
  privacySettingsFailed: 'Error al guardar configuración de privacidad.',
  deleteAllData: 'Eliminar Todos los Datos',
  featureComingSoon: 'Función Próximamente',
  featureComingSoonDesc: 'Esta función estará disponible en una futura actualización.',

  // Language
  languageChangeFailed: 'Error al cambiar idioma.',
  languageSupport: 'Soporte de Idiomas',
  languageSupportDesc: 'Los cambios de idioma se aplican inmediatamente en toda la aplicación. Los cambios de dirección del texto árabe pueden requerir reiniciar la aplicación para tener efecto completo.',
  activeLabel: 'ACTIVO',
  
  // Modal text
  signInExistingAccount: 'Inicia sesión en una cuenta existente para agregarla a este dispositivo',
  signIn: 'Iniciar Sesión',
  createAccount: 'Crear Cuenta',
  createNewAccountDesc: 'Crea una nueva cuenta y agrégala a este dispositivo',
  confirmPassword: 'Confirmar Contraseña',
  confirmPasswordPlaceholder: 'Vuelve a ingresar tu contraseña',
  passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
  passwordsDoNotMatch: 'Las contraseñas no coinciden',
  accountCreated: 'Cuenta Creada',
  accountCreatedDesc: '¡Tu nueva cuenta ha sido creada y está activa! Cierra Configuración para comenzar.',
  createAccountFailed: 'No se pudo crear la cuenta. Inténtalo de nuevo.',
  emailAlreadyInUse: 'Ya existe una cuenta con este correo electrónico',
  weakPassword: 'La contraseña es muy débil. Usa al menos 8 caracteres.',
  networkError: 'Problema de conexión. Verifica tu internet.',
  enterEmailAddress: 'Ingresa dirección de correo',
  enterPassword: 'Ingresa contraseña',
  },

  businessProfile: {
    timeline: 'Cronología',
    services: 'Servicios y Productos',
    posts: 'Publicaciones',
    media: 'Medios',
    loadingServices: 'Cargando servicios...',
    loadingPosts: 'Cargando publicaciones...',
    loadingMedia: 'Cargando medios...',
    noServicesAvailable: 'No hay servicios disponibles',
    noPostsAvailable: 'No hay publicaciones disponibles',
    noMediaPosted: 'No se han publicado medios aún',
    contactInformation: 'Información de Contacto',
    email: 'Correo',
    phone: 'Teléfono',
    website: 'Sitio Web',
    education: 'Educación y Formación',
    achievements: 'Logros y Certificaciones',
    additionalInfo: 'Información Adicional',
    businessDetails: 'Detalles del Negocio',
    degree: 'Título/Certificación',
    university: 'Universidad/Escuela',
    graduationYear: 'Año de Graduación',
    gpa: 'Promedio',
    academicAwards: 'Premios Académicos',
    certifications: 'Certificaciones Profesionales',
    volunteerWork: 'Trabajo Voluntario',
    publications: 'Publicaciones e Investigación',
    keySkills: 'Habilidades Clave',
    languages: 'Idiomas',
    professionalInterests: 'Intereses Profesionales',
    otherInformation: 'Otra Información',
    profilePrivate: 'Este perfil es privado',
    limitedProfileView: 'Vista limitada del perfil - conéctate para ver más',
    followToSeeMore: 'Conéctate para ver más',
    searchServices: 'Buscar servicios...',
  allCategories: 'Todas',
  noServicesMatch: 'Ningún servicio coincide con sus filtros',
  clearFilters: 'Limpiar Filtros',
  sortNewest: 'Más recientes',
  sortPriceLow: 'Precio: de menor a mayor',
  sortPriceHigh: 'Precio: de mayor a menor',
  sortName: 'Nombre: A-Z',
  messageSeller: 'Enviar mensaje al vendedor',
  isStillAvailable: '¿Todavía está disponible?',
  whatsLowestPrice: '¿Cuál es el precio más bajo?',
  canYouDeliver: '¿Puedes entregar?',
  imInterested: 'Estoy interesado en esto',
  free: 'Gratis',
  more: 'Más',
  less: 'Menos',
  },

  comments: {
    comments: 'Comentarios',
    addComment: 'Agregar un comentario...',
    reply: 'Responder',
    like: 'Me gusta',
    loadingComments: 'Cargando comentarios...',
    noCommentsYet: 'Aún no hay comentarios',
    beFirstToComment: 'Sé el primero en comentar',
    replyingTo: 'Respondiendo a',
    cancelReply: 'Cancelar Respuesta',
    postComment: 'Publicar Comentario',
    showReplies: 'Mostrar respuestas',
    hideReplies: 'Ocultar respuestas',
  },

  rating: {
    rateThis: 'Califica este negocio',
    yourRating: 'Tu calificación',
    averageRating: 'Calificación promedio',
    totalReviews: 'reseñas',
    noReviews: 'Aún no hay reseñas',
    ratingSubmitted: 'Calificación enviada',
    thankYouRating: '¡Gracias por tu calificación! Así calificaron otros:',
    showDetails: 'Mostrar Detalles',
    hideDetails: 'Ocultar Detalles',
    writeReview: 'Escribir Reseña',
    readReviews: 'Leer Reseñas',
  },

  stories: {
    stories: 'Historias',
    yourStory: 'Tu Historia',
    addStory: 'Agregar Historia',
    viewStory: 'Ver Historia',
    recordVideo: 'Grabar Video',
    chooseFromGallery: 'Elegir de la Galería',
    storyExpires24h: 'La historia expira en 24 horas',
    noStoriesYet: 'Aún no hay historias',
    watchStory: 'Ver Historia',
    skipStory: 'Omitir Historia',
    storyUnavailable: 'Historia no disponible',
      preview: 'Vista Previa',
  reRecord: 'Volver a Grabar',
  storyInfo: 'Las historias son visibles durante 24 horas y pueden durar hasta 30 segundos',
  shareAgriculturalWorld: 'Comparte lo que está pasando en tu mundo agrícola con un video de 30 segundos',
  startRecording: 'Comenzar Grabación',
  recordVideoFirst: 'Por favor graba un video primero',
  storyPosted: '¡Tu historia ha sido publicada!',
  videoTooLarge: 'Tamaño del video: {{size}}MB excede el límite de 500MB para historias. Por favor graba un video más corto.',
  createStory: 'Crear Historia',
  sharePhotoOrVideo: 'Comparte una foto o video que será visible durante 24 horas',
  takePhoto: 'Tomar Foto',
  selectDuration: 'Seleccionar Duración',
  displayFor: 'Mostrar por',
  continueEditing: 'Continuar Editando',
  storyInfoPhotoVideo: 'Las fotos y videos son visibles durante 24 horas. Los videos pueden durar hasta 30 segundos.',
  selectMediaFirst: 'Por favor selecciona una foto o video primero',
  },

  messaging: {
    messages: 'Mensajes',
    conversation: 'Conversación',
    typeMessage: 'Escribe un mensaje...',
    send: 'Enviar',
    online: 'En línea',
    offline: 'Desconectado',
    delivered: 'Entregado',
    read: 'Leído',
    startConversation: 'Iniciar Conversación',
    conversationStarted: 'Conversación iniciada',
    noMessages: 'No hay mensajes',
    loadingMessages: 'Cargando mensajes...',
    messageFailed: 'Falló el envío del mensaje',
    tryAgain: 'Intentar de nuevo',
  },

  createPost: {
    createPost: 'Crear Publicación',
    whatsOnMind: '¿Qué tienes en mente?',
    addPhoto: 'Agregar Foto',
    addVideo: 'Agregar Video',
    camera: 'Cámara',
    gallery: 'Galería',
    publish: 'Publicar',
    saveDraft: 'Guardar Borrador',
    discardPost: 'Descartar Publicación',
    publishingPost: 'Publicando...',
    postPublished: '¡Publicación publicada exitosamente!',
    addMedia: 'Agregar Medios',
    removeMedia: 'Eliminar Medios',
    characterCount: 'caracteres',
    maxCharacters: 'Máx. 500 caracteres',
    editPost: 'Editar Publicación',
  deletePost: 'Eliminar Publicación', 
  deleteConfirm: '¿Estás seguro de que quieres eliminar esta publicación?',
  },

  search: {
    search: 'Buscar',
    searchAndFilter: 'Buscar y Filtrar',
    reset: 'Restablecer',
    noResults: 'No se encontraron resultados',
    tryDifferent: 'Prueba un término de búsqueda diferente',
    searching: 'Buscando...',
    filterBy: 'Filtrar por',
    sortBy: 'Ordenar por',
    location: 'Ubicación',
    category: 'Categoría',
    rating: 'Calificación',
    distance: 'Distancia',
    recent: 'Reciente',
    popular: 'Popular',
    nearest: 'Más cercano',
    name: 'Nombre',
      allSectors: 'Todos los Sectores',

  },

  activities: {
    liked: 'Le gustó',
    comment: 'Comentario',
    reviewed: 'Reseñó',
    following: 'Se conectó con',
    saved: 'Guardó',
    created: 'Crear una Publicación',
    viewed: 'Visitante',
    createdPost: 'Crear una Publicación',
    profileViewed: 'el perfil vio tu perfil',
    someoneViewed: 'Alguien vio tu perfil',
    startedConversation: 'Inició una conversación',
    sentMessage: 'Envió un mensaje',
    postedComment: 'Publicó un comentario',
    photoAttached: 'Foto adjunta',
    videoAttached: 'Video adjunto',
    archive: 'Archivar',
    archived: 'Actividad archivada',
    deleteActivity: 'Eliminar Actividad',
    deleteConfirm: '¿Estás seguro de que quieres eliminar esta actividad?',
  },

  moderation: {
    reportPost: 'Reportar Publicación',
    hidePost: 'Ocultar Publicación',
    blockUser: 'Bloquear Usuario',
    reportUser: 'Reportar Usuario',
    spam: 'Spam',
    harassment: 'Acoso',
    inappropriateContent: 'Contenido Inapropiado',
    misinformation: 'Desinformación',
    other: 'Otro',
    reportSubmitted: 'Tu reporte ha sido enviado y será revisado.',
    postHidden: 'Esta publicación ha sido ocultada de tu feed.',
    userBlocked: 'Usuario ha sido bloqueado. Ya no verás sus publicaciones.',
    postReported: 'Publicación ha sido reportada para revisión.',
    alreadyReported: 'Ya has reportado esta publicación.',
    underReview: 'Esta publicación está bajo revisión',
    postActions: 'Acciones de Publicación',
    chooseAction: 'Elige una acción',
     reportReasonTitle: '¿Por qué estás reportando esta publicación?',
  cannotReportOwnPost: 'No puedes reportar tu propia publicación.',
  reportDetailsTitle: 'Detalles del Reporte',
  reportDetailsPrompt: 'Por favor describe por qué estás reportando esta publicación:',
  submit: 'Enviar',
  pleaseProvideReason: 'Por favor proporciona una razón para reportar.',
  reportThankYou: 'Gracias por tu reporte. Nuestro equipo revisará este contenido en breve.',
  alreadyReportedDetailed: 'Ya has reportado esta publicación. Gracias por ayudar a mantener nuestra comunidad segura.',
  reportSubmissionFailed: 'Error al enviar reporte. Por favor intenta más tarde.',
  hidePostConfirm: 'Esta publicación se ocultará de tu feed. Puedes mostrarla más tarde desde configuración.',
  hide: 'Ocultar',
  postHiddenSuccess: 'Esta publicación se ha ocultado de tu feed.',
  hidePostFailed: 'Error al ocultar publicación. Por favor intenta de nuevo.',
  cannotBlockSelf: 'No puedes bloquearte a ti mismo.',
  blockConfirmMessage: '¿Estás seguro de que quieres bloquear a {{name}}? No verás sus publicaciones ni podrás enviarles mensajes.',
  block: 'Bloquear',
  userBlockedSuccess: '{{name}} ha sido bloqueado. Ya no verás sus publicaciones.',
  blockUserFailed: 'Error al bloquear usuario. Por favor intenta de nuevo.',
   whyReporting: '¿Por qué estás reportando esta publicación?',
  reportAnonymous: 'Tu reporte es anónimo y nos ayuda a mantener la comunidad segura.',
  describeIssue: 'Por favor describe el problema:',
  describePlaceholder: 'Describe por qué estás reportando esta publicación...',
  submitReport: 'Enviar Reporte',
  whatHappensHide: 'Qué sucede cuando ocultas una publicación:',
  postDisappears: 'La publicación desaparece de tu feed',
  authorNotNotified: 'El autor no será notificado',
  canUnhideSettings: 'Puedes mostrarla más tarde en configuración',
  canSeeReplies: 'Aún puedes ver respuestas si te mencionan',
  lookingSomethingElse: '¿Buscas algo más?',
  considerReporting: 'Si esta publicación viola nuestras normas comunitarias, considera reportarla en lugar de solo ocultarla.',
  hideThisPost: '¿Ocultar esta publicación?',
  hideDescription: 'Esta publicación se ocultará de tu feed. No la verás al navegar publicaciones, pero aún puedes acceder directamente si te la comparten.',
  blockThisUser: '¿Bloquear a este usuario?',
  ifYouBlock: 'Si bloqueas a este usuario, no podrás:',
  seeTheirPosts: 'Ver sus publicaciones en tu feed',
  sendReceiveMessages: 'Enviar o recibir mensajes de ellos',
  seeProfile: 'Ver su perfil o información comercial',
  getNotifications: 'Recibir notificaciones de sus actividades',
  noteBlock: 'Nota: {{name}} no será notificado de que lo bloqueaste. Puedes desbloquearlo más tarde en tu configuración.',
  },

  share: {
    title: 'Compartir Publicación',
    searchPlaceholder: 'Buscar personas...',
    selected: 'seleccionado(s)',
    send: 'Enviar',
    shareExternally: 'Compartir externamente',
    success: 'Publicación compartida exitosamente',
    selectRecipients: 'Selecciona destinatarios para compartir',
    noFollowers: 'No tienes conexiones con quienes compartir',
    sending: 'Enviando...',
    sharedPost: 'compartió una publicación contigo',
  },

  analytics: {
    analytics: 'Analíticas',
    overview: 'Resumen',
    profileViews: 'Vistas de Perfil',
    postEngagement: 'Engagement de Publicaciones',
    followers: 'Conexiones',
    reach: 'Alcance',
    impressions: 'Impresiones',
    clicks: 'Clics',
    saves: 'Guardados',
    shares: 'Compartidos',
    comments: 'Comentarios',
    likes: 'Me gusta',
    growthRate: 'Tasa de Crecimiento',
    mostActiveFollowerTime: 'Horario Más Activo de Conexiones',
    recentActivity: 'Actividad Reciente',
    noDataYet: 'Aún no hay datos disponibles',
    lastDays: 'Últimos 7 días',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mes',
    peakHours: 'Horas Pico',
  },

  ui: {
    search: 'Buscar',
    searching: 'Buscando...',
    noResults: 'Sin resultados',
    loading: 'Cargando...',
    refresh: 'Actualizar',
    pullToRefresh: 'Desliza para actualizar',
    endOfResults: 'Fin de los resultados',
    tryAgain: 'Intentar de nuevo',
    somethingWentWrong: 'Algo salió mal',
    checkConnection: 'Por favor verifica tu conexión a internet',
    restartApp: 'Por favor reinicia la aplicación',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    showAll: 'Mostrar todo',
    collapse: 'Colapsar',
    expand: 'Expandir',
    precise: 'Preciso',
    coordinates: 'Coordenadas',
    manualEntry: 'Entrada manual',
    notSet: 'No establecido',
  },

  time: {
    now: 'ahora',
    today: 'hoy',
    yesterday: 'ayer',
    thisWeek: 'esta semana',
    thisMonth: 'este mes',
    daysAgo: 'hace {{count}} días',
    weeksAgo: 'hace {{count}} semanas',
    monthsAgo: 'hace {{count}} meses',
    minutesAgo: 'hace {{count}}m',
    hoursAgo: 'hace {{count}}h',
    at: 'a las',
    am: 'AM',
    pm: 'PM',
  },

  errors: {
    networkError: 'Error de conexión de red',
    serverError: 'Error del servidor',
    unknownError: 'Ocurrió un error desconocido',
    tryAgainLater: 'Por favor intenta de nuevo más tarde',
    invalidInput: 'Entrada inválida proporcionada',
    fieldRequired: 'Este campo es requerido',
    emailInvalid: 'Por favor ingresa un email válido',
    passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
    fileTooLarge: 'El archivo es demasiado grande',
    unsupportedFormat: 'Formato de archivo no soportado',
    uploadFailed: 'Error al subir archivo',
    permissionDenied: 'Permiso denegado',
    locationDisabled: 'Los servicios de ubicación están deshabilitados',
    cameraUnavailable: 'La cámara no está disponible',
    validationError: 'Error de Validación',
    userNameRequired: 'El nombre de usuario es requerido.',
    yourNameRequired: 'Tu nombre es requerido.',
    displayNameRequired: 'El nombre para mostrar es requerido.',
    businessNameRequiredBusiness: 'El nombre del negocio es requerido para cuentas comerciales.',
    bioRequired: 'La biografía es requerida.',
    selectIndustry: 'Por favor selecciona una industria.',
    selectCategory: 'Por favor selecciona una categoría.',
    emailRequiredIndividual: 'El correo electrónico es requerido para cuentas individuales.',
    validWebsiteRequired: 'Por favor ingresa una URL de sitio web válida.',
    permissionRequired: 'Permiso Requerido',
    grantPhotoPermission: 'Por favor otorga permiso para acceder a tus fotos.',
    imageUploadSuccess: '¡Imagen subida exitosamente!',
    locationPermissionNeeded: 'Se necesita permiso de ubicación para obtener tu ubicación actual.',
    callNotAvailable: 'Llamada No Disponible',
    callingNotAvailable: 'Las llamadas no están disponibles en este dispositivo.',
    copyNumber: 'Copiar Número',
    phoneNumber: 'Número de Teléfono',
    unableToMakeCall: 'No se puede realizar la llamada telefónica.',
    navigationError: 'Error de Navegación',
    unableToNavigate: 'No se puede navegar.',
    addressRequired: 'La dirección del negocio es requerida.',
    completeProfileFirst: 'Completa Tu Perfil',
    completeProfileMessage: 'Debes completar todos los campos requeridos antes de acceder a la aplicación.',
  },

  // Newsletter
  newsletter: {
    // Opt-in Modal
    title: 'Mantente Conectado',
    subtitle: 'Suscríbete a nuestro boletín para recibir actualizaciones personalizadas sobre la industria del cannabis.',
    features: {
      personalized: 'Contenido Personalizado',
      personalizedDesc: 'Actualizaciones adaptadas a tus intereses y ubicación',
      monthly: 'Resumen Mensual',
      monthlyDesc: 'Un correo por mes, sin spam',
      unsubscribe: 'Fácil Cancelación',
      unsubscribeDesc: 'Cancela en cualquier momento con un clic',
    },
    subscribe: 'Suscribirse Ahora',
    maybeLater: 'Quizás Después',
    stayConnected: 'Mantente Conectado con Tu Red',
    getPersonalized: 'Recibe actualizaciones mensuales personalizadas directamente en tu bandeja de entrada.',
    featurePosts: 'Nuevas publicaciones de tus intereses',
    featureBusinesses: 'Negocios en tu área',
    featureProducts: 'Productos y servicios',
    featureCommunity: 'Destacados de la comunidad',
    sentMonthly: 'Enviado una vez al mes el día 1',
    maybeNextTime: 'Quizás la Próxima Vez',
    canSubscribeLater: 'Siempre puedes suscribirte después desde Configuración',

    // Preferences Flow
    selectIndustries: 'Seleccionar Industrias',
    industriesDesc: 'Elige las industrias de las que quieres saber. Selecciona hasta 5.',
    selectSectors: 'Seleccionar Sectores',
    sectorsDesc: 'Elige sectores específicos dentro de tus industrias seleccionadas.',
    selectLocations: 'Seleccionar Ubicaciones',
    locationsDesc: 'Elige áreas geográficas de las que recibir contenido.',
    selectProfileTypes: 'Seleccionar Tipos de Perfil',
    profileTypesDesc: 'Elige qué tipos de perfiles quieres ver contenido.',
    profileTypeIndividual: 'Individuos',
    profileTypeBusiness: 'Empresas',
    selectContentTypes: 'Seleccionar Tipos de Contenido',
    contentTypesDesc: 'Elige qué tipo de contenido quieres recibir.',
    contentTypePosts: 'Publicaciones y Actualizaciones',
    contentTypeMedia: 'Fotos y Videos',
    contentTypeProducts: 'Productos',
    contentTypeServices: 'Servicios',
    addInterests: 'Agregar Intereses Personales',
    interestsDesc: 'Agrega temas o palabras clave específicas que te interesen. (Opcional)',
    interestPlaceholder: 'Escribe un interés...',
    noInterestsYet: 'Aún no hay intereses agregados. Este paso es opcional.',
    suggestedInterests: 'Sugerencias',

    // Location
    addMyLocation: 'Agregar Mi Ubicación',
    addLocation: 'Agregar Ubicación',
    enterLocation: 'Ingresa ciudad, estado o país',
    searchCity: 'Buscar una ciudad...',
    searchLocation: 'Buscar por dirección, ciudad o código postal...',
    locationsAdded: 'ubicaciones agregadas',
    noLocationSet: 'Sin ubicación establecida. Se incluirá contenido de todas las ubicaciones.',
    receiveFrom: 'Recibir de:',
    city: 'Ciudad',
    state: 'Estado',
    country: 'País',

    // Selection
    selected: 'seleccionados',
    sectorsSelected: 'sectores seleccionados',
    noIndustriesSelected: 'Por favor selecciona industrias primero',

    // Validation
    selectAtLeastOneIndustry: 'Por favor selecciona al menos una industria',
    selectAtLeastOneSector: 'Por favor selecciona al menos un sector',
    selectAtLeastOneLocation: 'Por favor selecciona al menos una ubicación',
    selectAtLeastOneProfileType: 'Por favor selecciona al menos un tipo de perfil',
    selectAtLeastOneContentType: 'Por favor selecciona al menos un tipo de contenido',
    selectAtLeastOneInterest: 'Por favor agrega al menos un interés',

    // Consent
    consentTitle: 'Consentimiento Legal',
    consentText: `Al suscribirte al boletín de CultivaNetwork, aceptas lo siguiente:

COMUNICACIONES POR CORREO ELECTRÓNICO
Consiento recibir correos electrónicos mensuales del boletín de CultivaNetwork en la dirección de correo asociada con mi cuenta. Estos correos contendrán contenido personalizado basado en mis preferencias seleccionadas.

USO DE DATOS
Entiendo que CultivaNetwork usará mis selecciones de preferencias para curar y personalizar el contenido del boletín. Mis preferencias y dirección de correo se almacenarán de forma segura y se usarán únicamente para entregar contenido relevante del boletín.

COMPARTIR CON TERCEROS
Mi dirección de correo y preferencias no serán vendidas, alquiladas ni compartidas con terceros para fines de marketing.

CANCELACIÓN DE SUSCRIPCIÓN
Puedo cancelar mi suscripción en cualquier momento haciendo clic en el enlace "Cancelar suscripción" en cualquier correo del boletín o a través de la Configuración de la aplicación.

RETENCIÓN DE DATOS
Mis datos de suscripción se conservarán hasta que cancele mi suscripción o elimine mi cuenta.

CUMPLIMIENTO
Este boletín cumple con las regulaciones aplicables de marketing por correo electrónico, incluyendo los requisitos de la Ley CAN-SPAM.`,
    agreeToReceive: 'Acepto recibir el boletín mensual de CultivaNetwork y acepto los términos anteriores.',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',

    // Navigation
    skip: 'Omitir',
    continue: 'Continuar',
    completeSubscription: 'Completar Suscripción',
    savePreferences: 'Guardar Preferencias',

    // Settings
    settings: 'Configuración del Boletín',
    settingsTitle: 'Boletín',
    subscribedTitle: 'Suscrito al Boletín',
    subscribed: 'Suscrito',
    notSubscribed: 'No Suscrito',
    inactive: 'Inactivo',
    subscribedSince: 'Suscrito desde',
    lastEmailSent: 'Último correo enviado',
    editPreferences: 'Editar Preferencias',
    manageSubscription: 'Gestionar Suscripción',
    unsubscribeConfirm: 'Cancelar Suscripción',
    unsubscribeConfirmMessage: '¿Estás seguro de que quieres cancelar la suscripción al boletín?',
    resubscribe: 'Volver a Suscribirse',
    subscribeNow: 'Suscribirse Ahora',
    subscriptionUpdated: 'Suscripción actualizada',
    preferencesUpdated: 'Preferencias actualizadas exitosamente',
    never: 'Nunca',
    unsubscribeTitle: 'Cancelar Suscripción',
    unsubscribe: 'Cancelar Suscripción',
    unsubscribedTitle: 'Suscripción Cancelada',
    unsubscribedMessage: 'Has cancelado tu suscripción al boletín.',
    unsubscribeError: 'Error al cancelar suscripción. Por favor intenta de nuevo.',
    resubscribedTitle: 'Suscripción Renovada',
    resubscribedMessage: '¡Bienvenido de vuelta! Recibirás el próximo boletín.',
    resubscribeError: 'Error al renovar suscripción. Por favor intenta de nuevo.',
    preferencesUpdatedTitle: 'Preferencias Actualizadas',
    preferencesUpdatedMessage: 'Tus preferencias del boletín han sido guardadas.',
    subscribedMessage: 'Recibirás tu primer boletín el día 1 del próximo mes.',
    saveError: 'Error al guardar. Por favor intenta de nuevo.',
    active: 'Activo',
    lastSent: 'Último envío:',
    frequency: 'Mensual (día 1 de cada mes)',
    yourPreferences: 'Tus preferencias:',
    noPreferences: 'Sin preferencias establecidas',

    // Summary
    industries: 'Industrias',
    sectors: 'Sectores',
    locations: 'Ubicaciones',
    profileTypes: 'Tipos de Perfil',
    contentTypes: 'Tipos de Contenido',
    allLocations: 'Todas las Ubicaciones',
  },

  // Common
  common: {
    cancel: 'Cancelar',
    save: 'Guardar',
    error: 'Error',
  },

  // Industries
  industries: {
    agriculture: 'Agricultura',
    automotive: 'Automotriz',
    construction: 'Construcción',
    creativeMedia: 'Creatividad y Medios',
    educationTraining: 'Educación y Capacitación',
    energyEnvironment: 'Energía y Medio Ambiente',
    foodBeverage: 'Servicios de Alimentos y Bebidas',
    healthcareWellness: 'Salud y Bienestar',
    manufacturingIndustrial: 'Manufactura e Industrial',
    professionalFinancial: 'Servicios Profesionales y Financieros',
    propertyMaintenance: 'Mantenimiento de Propiedades',
    retailConsumer: 'Comercio y Bienes de Consumo',
    technologyDigital: 'Tecnología y Digital',
    transportationLogistics: 'Transporte y Logística',
    travel: 'Viajes',
    governmentPublicServices: 'Gobierno y Servicios Públicos',
    venue: 'Lugar',
  },

  // Sectors
  sectors: {
    // Agriculture
    farming: 'Agricultura',
    agriculturalEquipment: 'Equipos Agrícolas',
    cropNutrition: 'Nutrición de Cultivos',
    cropProtection: 'Protección de Cultivos',
    irrigation: 'Irrigación',
    livestockFeed: 'Alimento para Ganado',
    organicAgriculture: 'Agricultura Orgánica',
    seedDevelopment: 'Desarrollo de Semillas',
    agriculturalTechnology: 'Tecnología Agrícola',
    landManagement: 'Gestión de Tierras',
    animalHusbandry: 'Ganadería',
    agriculturalConsulting: 'Consultoría Agrícola',
    soilManagement: 'Gestión del Suelo',
    harvestingServices: 'Servicios de Cosecha',
    // Creative & Media
    photography: 'Fotografía',
    videography: 'Videografía',
    graphicDesign: 'Diseño Gráfico',
    contentCreation: 'Creación de Contenido',
    socialMediaManagement: 'Gestión de Redes Sociales',
    marketing: 'Marketing',
    advertising: 'Publicidad',
    branding: 'Branding',
    eventPlanning: 'Planificación de Eventos',
    musicProduction: 'Producción Musical',
    filmProduction: 'Producción Cinematográfica',
    webDesign: 'Diseño Web',
    illustration: 'Ilustración',
    animation: 'Animación',
    publishing: 'Editorial',
    publicRelations: 'Relaciones Públicas',
    // Education & Training
    k12Education: 'Educación K-12',
    higherEducation: 'Educación Superior',
    vocationalTraining: 'Formación Profesional',
    onlineCourses: 'Cursos en Línea',
    tutoring: 'Tutorías',
    educationalTechnology: 'Tecnología Educativa',
    corporateTraining: 'Capacitación Corporativa',
    languageEducation: 'Educación de Idiomas',
    testPreparation: 'Preparación de Exámenes',
    specialEducation: 'Educación Especial',
    earlyChildhoodEducation: 'Educación Infantil',
    // Energy & Environment
    solarEnergy: 'Energía Solar',
    windEnergy: 'Energía Eólica',
    hydroelectric: 'Hidroeléctrica',
    biofuels: 'Biocombustibles',
    environmentalConsulting: 'Consultoría Ambiental',
    wasteManagement: 'Gestión de Residuos',
    recycling: 'Reciclaje',
    carbonManagement: 'Gestión de Carbono',
    energyEfficiency: 'Eficiencia Energética',
    sustainableDesign: 'Diseño Sostenible',
    // Food & Beverage Services
    restaurants: 'Restaurantes',
    catering: 'Catering',
    foodProduction: 'Producción de Alimentos',
    beverageManufacturing: 'Fabricación de Bebidas',
    foodDistribution: 'Distribución de Alimentos',
    specialtyFoods: 'Alimentos Especializados',
    organicFoods: 'Alimentos Orgánicos',
    foodTechnology: 'Tecnología Alimentaria',
    farmToTable: 'Del Campo a la Mesa',
    foodSafetyConsulting: 'Consultoría de Seguridad Alimentaria',
    bakery: 'Panadería',
    brewery: 'Cervecería',
    // Healthcare & Wellness
    medicalPractice: 'Práctica Médica',
    dentalCare: 'Cuidado Dental',
    mentalHealth: 'Salud Mental',
    physicalTherapy: 'Fisioterapia',
    alternativeMedicine: 'Medicina Alternativa',
    nutritionConsulting: 'Consultoría Nutricional',
    fitnessTraining: 'Entrenamiento Físico',
    spaServices: 'Servicios de Spa',
    seniorCare: 'Cuidado de Adultos Mayores',
    homeHealthcare: 'Atención Médica Domiciliaria',
    medicalEquipment: 'Equipos Médicos',
    pharmaceuticals: 'Farmacéuticos',
    veterinaryServices: 'Servicios Veterinarios',
    // Manufacturing & Industrial
    heavyMachinery: 'Maquinaria Pesada',
    electronicsManufacturing: 'Fabricación de Electrónicos',
    textiles: 'Textiles',
    plastics: 'Plásticos',
    metalFabrication: 'Fabricación de Metales',
    automotiveParts: 'Autopartes',
    packaging: 'Empaque',
    chemicalProduction: 'Producción Química',
    industrialEquipment: 'Equipos Industriales',
    qualityControl: 'Control de Calidad',
    processEngineering: 'Ingeniería de Procesos',
    // Professional & Financial Services
    accounting: 'Contabilidad',
    legalServices: 'Servicios Legales',
    financialPlanning: 'Planificación Financiera',
    insurance: 'Seguros',
    realEstate: 'Bienes Raíces',
    businessConsulting: 'Consultoría Empresarial',
    humanResources: 'Recursos Humanos',
    itServices: 'Servicios de TI',
    taxPreparation: 'Preparación de Impuestos',
    investmentManagement: 'Gestión de Inversiones',
    banking: 'Banca',
    auditing: 'Auditoría',
    // Property Maintenance
    autoDetailing: 'Detallado de Autos',
    electrical: 'Electricidad',
    handyMan: 'Servicios Generales',
    hvac: 'HVAC',
    landscaping: 'Paisajismo',
    lawnCare: 'Cuidado de Jardines',
    pressureWashing: 'Lavado a Presión',
    wasteRemoval: 'Recolección de Residuos',
    // Retail & Consumer Goods
    ecommerce: 'Comercio Electrónico',
    brickMortarRetail: 'Comercio Físico',
    wholesale: 'Mayorista',
    consumerElectronics: 'Electrónicos de Consumo',
    apparel: 'Ropa',
    homeGoods: 'Artículos para el Hogar',
    sportingGoods: 'Artículos Deportivos',
    beautyProducts: 'Productos de Belleza',
    jewelry: 'Joyería',
    petProducts: 'Productos para Mascotas',
    toysGames: 'Juguetes y Juegos',
    furniture: 'Muebles',
    carAudio: 'Audio para Autos',
    carWash: 'Lavado de Autos',
    // Technology & Digital
    softwareDevelopment: 'Desarrollo de Software',
    mobileApps: 'Aplicaciones Móviles',
    cloudServices: 'Servicios en la Nube',
    cybersecurity: 'Ciberseguridad',
    aiMachineLearning: 'IA y Aprendizaje Automático',
    dataAnalytics: 'Análisis de Datos',
    iotSolutions: 'Soluciones IoT',
    blockchain: 'Blockchain',
    webDevelopment: 'Desarrollo Web',
    itConsulting: 'Consultoría de TI',
    techSupport: 'Soporte Técnico',
    saasProducts: 'Productos SaaS',
    // Transportation & Logistics
    freightShipping: 'Envío de Carga',
    trucking: 'Transporte por Camión',
    warehousing: 'Almacenamiento',
    lastMileDelivery: 'Entrega de Última Milla',
    fleetManagement: 'Gestión de Flotas',
    supplyChain: 'Cadena de Suministro',
    courierServices: 'Servicios de Mensajería',
    aviation: 'Aviación',
    maritimeShipping: 'Transporte Marítimo',
    railTransport: 'Transporte Ferroviario',
    movingServices: 'Servicios de Mudanza',
    // Travel
    hotelsLodging: 'Hoteles y Alojamiento',
    tourOperations: 'Operaciones Turísticas',
    travelAgency: 'Agencia de Viajes',
    vacationRentals: 'Alquileres Vacacionales',
    adventureTravel: 'Viajes de Aventura',
    ecoTourism: 'Ecoturismo',
    businessTravel: 'Viajes de Negocios',
    cruiseLines: 'Líneas de Cruceros',
    transportationServices: 'Servicios de Transporte',
    travelTechnology: 'Tecnología de Viajes',
    destinationManagement: 'Gestión de Destinos',
    // Venue
    ballroom: 'Salón de Baile',
    conventionCenter: 'Centro de Convenciones',
    eventHall: 'Salón de Eventos',
    privateVenue: 'Lugar Privado',
    stadium: 'Estadio',
  },
},

  ar: {
    app: {
      name: 'كلتيفاتست',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تحرير',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      done: 'تم',
      ok: 'موافق',
      yes: 'نعم',
      no: 'لا',
      authRequired: 'المصادقة مطلوبة',
    },

notifications: {
  notifications: 'الإشعارات',
  all: 'الكل',
  posts: 'المنشورات',
  stories: 'القصص',
  follows: 'معلقة',
  network: 'الشبكة',
  pending: 'معلقة',
  connections: 'الاتصالات',
  incoming: 'واردة',
  outgoing: 'صادرة',
  cancelRequest: 'إلغاء',
  requestSent: 'تم إرسال طلب الاتصال',
  noNetworkActivity: 'لا توجد اتصالات بعد',
  noIncomingRequests: 'لا توجد طلبات واردة',
  noOutgoingRequests: 'لا توجد طلبات صادرة',
  messages: 'الرسائل',
  markAllRead: 'تمييز الكل كمقروء',
  markRead: 'تمييز كمقروء',
  markUnread: 'تمييز كغير مقروء',
  actions: 'إجراءات الإشعار',
  chooseAction: 'اختر إجراءً لهذا الإشعار',
  deleteConfirm: 'حذف الإشعار',
  deleteConfirmMessage: 'هل أنت متأكد من أنك تريد حذف هذا الإشعار؟',
  allMarkedRead: 'تم تمييز جميع الإشعارات كمقروءة',
  noNotifications: 'لا توجد إشعارات بعد',
  noNotificationsSubtext: 'عندما يتفاعل الأشخاص مع محتواك، ستظهر الإشعارات هنا',
  noConversations: 'لا توجد محادثات بعد',
  recentConversations: 'المحادثات الأخيرة',
  liked: 'أعجب بمنشورك',
  commented: 'علق على منشورك',
  shared: 'شارك منشورك',
  followed: 'تواصل معك',
  viewedStory: 'شاهد قصتك',
  sentMessage: 'أرسل لك رسالة'
},
consent: {
  // Age Verification
  ageVerification: 'التحقق من العمر',
  ageVerificationDesc: 'نحتاج إلى التحقق من عمرك للامتثال لـ COPPA (قانون حماية خصوصية الأطفال عبر الإنترنت).',
  over13: 'أنا 13 عاماً أو أكثر',
  under13: 'أنا أقل من 13 عاماً',
  ageRestriction: 'قيود العمر',
  mustBe13: 'يجب أن يكون عمرك 13 عاماً على الأقل لاستخدام هذا التطبيق. شكراً لتفهمك.',
  coppaNotice: 'هذا التحقق مطلوب بموجب COPPA لحماية خصوصية الأطفال.',
  confirmAge: 'أؤكد أن عمري 13 عاماً أو أكثر',
  
  // Region Selection
  yourLocation: 'موقعك',
  locationDesc: 'تنطبق قوانين خصوصية مختلفة بناءً على موقعك. يرجى اختيار منطقتك:',
  europeanUnion: 'الاتحاد الأوروبي',
  unitedStates: 'الولايات المتحدة',
  otherRegion: 'منطقة أخرى',
  applies: 'ينطبق',
  mayApply: 'قد ينطبق',
  standardPrivacy: 'حماية الخصوصية القياسية',
  californiaQuestion: 'مقيم في كاليفورنيا؟',
  californiaQuestionDesc: 'هل أنت مقيم في كاليفورنيا؟ قد تنطبق عليك حقوق خصوصية CCPA.',
  
  // Consent Form
  privacyConsent: 'الخصوصية والموافقة',
  privacyChoices: 'خيارات الخصوصية الخاصة بك',
  gdprDesc: 'بموجب GDPR، نحتاج إلى موافقتك الصريحة لمعالجة بياناتك. يمكنك تغيير هذه التفضيلات في أي وقت في الإعدادات.',
  ccpaDesc: 'بموجب CCPA، لديك الحق في إلغاء الاشتراك في بيع البيانات ومعرفة كيفية استخدام بياناتك. اختر تفضيلاتك أدناه.',
  standardDesc: 'نحن نحترم خصوصيتك. اختر أنشطة معالجة البيانات التي تشعر بالراحة تجاهها. يمكنك تغييرها في أي وقت.',
  essentialNotice: 'الخدمات الأساسية (المصادقة، الأمان، الوظائف الأساسية للتطبيق) نشطة دائماً ولا يمكن تعطيلها.',
  dataProcessingPreferences: 'تفضيلات معالجة البيانات',
  customizeExperience: 'خصص تجربتك عن طريق اختيار البيانات التي تريد مشاركتها معنا.',
  essential: 'أساسي',
  
  // Consent Options
  required: 'مطلوب',
  essentialDesc: 'مطلوب لكي يعمل التطبيق بشكل صحيح. لا يمكن تعطيل هذا.',
  analytics: 'التحليلات',
  analyticsDesc: 'ساعدنا على تحسين التطبيق بمشاركة بيانات الاستخدام المجهولة',
  analyticsData: 'استخدام التطبيق، الميزات المستخدمة، الوقت المستغرق',
  crashReports: 'تقارير الأعطال',
  crashReportsDesc: 'إرسال تقارير الأعطال تلقائياً لمساعدتنا في إصلاح الأخطاء',
  crashData: 'معلومات الجهاز، سجلات الأعطال، إصدار التطبيق',
  performance: 'مراقبة الأداء',
  performanceDesc: 'مراقبة أداء التطبيق لتحديد وإصلاح البطء',
  performanceData: 'أوقات التحميل، سرعة الشبكة، أداء الجهاز',
  marketing: 'اتصالات التسويق',
  marketingDesc: 'تلقي محتوى مخصص وعروض وتحديثات المنتج',
  marketingData: 'الاهتمامات، التفضيلات، تاريخ المشاركة',
  dataCollected: 'البيانات المجمعة',
  tracking: 'التتبع والإعلان',
  trackingDesc: 'اسمح لنا بتتبع نشاطك عبر التطبيقات للإعلانات المخصصة',
  personalization: 'التخصيص',
  personalizationDesc: 'قم بتخصيص موجز الأخبار والتوصيات الخاصة بك بناءً على اهتماماتك',
  
  // Actions
  acceptAll: 'قبول الكل',
  rejectNonEssential: 'رفض غير الأساسي',
  rejectAll: 'رفض الكل (الأساسي فقط)',
  savePreferences: 'حفظ تفضيلاتي',
  readPrivacyPolicy: 'قراءة سياسة الخصوصية الكاملة',
  privacyPolicy: 'سياسة الخصوصية',
  privacyPolicyDesc: 'تعرف على كيفية جمع بياناتك واستخدامها وحمايتها', // ✅ NEW
  privacyPolicyFull: 'يجب أن يتضمن نص سياسة الخصوصية الكامل الخاص بك هنا.',
  acceptSelected: 'قبول المحدد',
  declineAll: 'رفض الكل',
  
  // Legal Documents
  legalDocuments: 'الوثائق القانونية',
  legalDocumentsDesc: 'عرض سياسة الخصوصية وشروط الخدمة', // ✅ NEW
  termsOfService: 'شروط الخدمة',
  termsDesc: 'اقرأ الشروط والأحكام لاستخدام تطبيقنا', // ✅ NEW
  byAccepting: 'بالمتابعة، فإنك توافق على سياسة الخصوصية وشروط الخدمة الخاصة بنا.',

  // Rights
  gdprRights: 'بموجب GDPR، لديك الحق في الوصول والتصحيح والمحو وتقييد المعالجة ونقل البيانات والاعتراض على المعالجة. اتصل بنا لممارسة حقوقك.',
  ccpaRights: 'بموجب CCPA، لديك الحق في معرفة المعلومات الشخصية التي يتم جمعها، وطلب حذفها، وإلغاء الاشتراك في البيع. لن تتعرض للتمييز لممارسة هذه الحقوق.',
  standardRights: 'لديك الحق في الوصول إلى بياناتك الشخصية وحذفها. يمكنك إدارة إعدادات الخصوصية الخاصة بك في أي وقت في التطبيق.',
  yourRights: 'حقوقك في البيانات',
  gdprRightsDesc: 'بموجب GDPR، لديك الحق في الوصول إلى بياناتك الشخصية وتصديرها وحذفها.',
  ccpaRightsDesc: 'بموجب CCPA، لديك الحق في معرفة البيانات التي نجمعها وطلب حذفها.',
  standardRightsDesc: 'لديك الحق في الوصول إلى بياناتك الشخصية وحذفها.',
  rightsDescription: 'يمكنك تغيير هذه التفضيلات في أي وقت في الإعدادات. لديك أيضاً الحق في الوصول إلى بياناتك أو تصديرها أو حذفها.',
  
  // Messages
  errorSaving: 'فشل في حفظ تفضيلات الموافقة الخاصة بك. يرجى المحاولة مرة أخرى.',
  
  // Status
  consentStatus: 'حالة الموافقة',
  consentGiven: 'الموافقة المعطاة',
  consentDate: 'تاريخ الموافقة',
  region: 'المنطقة',
  
  // Data Processing
  dataProcessing: 'موافقة معالجة البيانات',
  dataProcessingDesc: 'تحكم في كيفية استخدام بياناتك',
  active: 'نشط',
  inactive: 'غير نشط',
  
  // User Rights
  exportData: 'تصدير بياناتك',
  exportDataShort: 'تنزيل جميع بياناتك بتنسيق JSON',
  deleteAllData: 'حذف الحساب',
  deleteAllDataShort: 'حذف جميع بياناتك نهائياً (فترة سماح 30 يوماً)',
  
  // CCPA
  ccpaOptions: 'حقوق الخصوصية في كاليفورنيا (CCPA)',
  doNotSell: 'عدم بيع بياناتي',
  doNotSellDesc: 'إلغاء الاشتراك في بيع البيانات كما هو مطلوب بموجب CCPA',
  
  // Revoke
  revokeAll: 'إلغاء جميع الموافقات',
  revokeAllConfirm: 'هل أنت متأكد من أنك تريد إلغاء جميع الموافقات؟ سيؤدي هذا إلى تعطيل جميع ميزات معالجة البيانات.',
  revokeAllNote: 'سيؤدي هذا إلى تعيين جميع الموافقات على غير نشط. يمكنك إعادة تمكينها في أي وقت.',
  allConsentRevoked: 'تم إلغاء جميع الموافقات.',
  
  // Messages
  consentEnabled: 'تم تمكين الموافقة',
  consentDisabled: 'تم تعطيل الموافقة',
  updateFailed: 'فشل في تحديث الموافقة',
  requestReceived: 'تم استلام الطلب',
  revokeFailed: 'فشل في إلغاء الموافقة',
  
  // Info
  whyThisMatters: 'لماذا هذا مهم',
  whyThisMattersDesc: 'نحن نحترم خصوصيتك. تمنحك هذه الضوابط الشفافية والاختيار حول كيفية استخدام بياناتك. يمكنك تغيير هذه الإعدادات في أي وقت.',
  
  // Additional
  welcomeTitle: 'مرحباً بك في CultivaNetwork',
  introTitle: 'مرحباً بك في CultivaNetwork',
  introText: 'يجمع CultivaNetwork معلومات أساسية — مثل اسمك وتفاصيل ملفك الشخصي ونشاطك داخل التطبيق — فقط لتقديم وتحسين تجربتك. نحن لا نتتبعك عبر تطبيقات أو مواقع ويب أخرى.',
  continue: 'متابعة',
  dataWeCollect: 'ما نجمعه',
  disclosureProfile: 'معلومات ملفك الشخصي (الاسم، الصورة، النبذة)',
  disclosureUsage: 'كيفية استخدامك للتطبيق لتحسين الميزات',
  disclosureCrash: 'تقارير الأعطال لمساعدتنا في إصلاح الأخطاء',
  settingsDataSummary: 'نجمع فقط ما هو ضروري لتشغيل التطبيق. نحن لا نتتبعك عبر تطبيقات أو مواقع ويب أخرى.',
  profileDataDesc: 'اسمك وصورتك ونبذتك وبيانات الاتصال التي تقدمها',
  usageDataDesc: 'كيفية استخدامك للتطبيق لمساعدتنا في تحسين الميزات',
  crashDataDesc: 'تقارير الأعطال وسجلات الأخطاء لمساعدتنا في إصلاح المشاكل',
  noTracking: 'بدون تتبع عبر التطبيقات',
  noTrackingDesc: 'نحن لا نتتبعك عبر تطبيقات أو مواقع ويب أخرى، ولا نشارك بياناتك مع أطراف ثالثة للإعلان.',
},
    tabs: {
      home: 'الرئيسية',
      scan: 'مسح',
      manage: 'إدارة',
      events: 'الأحداث',
      profile: 'الملف الشخصي',
    },
    events: {
      title: 'الأحداث',
      allEvents: 'جميع الأحداث',
      following: 'الاتصالات',
      myEvents: 'الأحداث المحفوظة',
      createEvent: 'إنشاء حدث',
      eventTitle: 'عنوان الحدث',
      description: 'الوصف',
      importantDetails: 'تفاصيل مهمة',
      startDate: 'تاريخ ووقت البدء',
      endDate: 'تاريخ ووقت الانتهاء',
      industry: 'الصناعة',
      sector: 'القطاع',
      location: 'الموقع',
      save: 'حفظ الحدث',
      cancel: 'إلغاء',
      delete: 'حذف الحدث',
      deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا الحدث؟',
      deleteSuccess: 'تم حذف الحدث بنجاح',
      addToMyEvents: 'إضافة إلى أحداثي',
      removeFromMyEvents: 'إزالة من أحداثي',
      addedToMyEvents: 'تمت إضافة الحدث إلى قائمتك',
      removedFromMyEvents: 'تمت إزالة الحدث من قائمتك',
      visible: 'مرئي',
      hidden: 'مخفي',
      toggleVisibility: 'تبديل الرؤية',
      noEvents: 'لم يتم العثور على أحداث',
      noEventsForDate: 'لا توجد أحداث في هذا التاريخ',
      noFollowingEvents: 'لا توجد أحداث من اتصالاتك',
      noMyEvents: 'لم تقم بإضافة أي أحداث بعد',
      bookmarked: 'المحفوظة',
      rsvpd: 'المؤكدة',
      noBookmarkedEvents: 'لا توجد أحداث محفوظة',
      noRsvpdEvents: 'لا توجد أحداث مؤكدة',
      loadingEvents: 'جاري تحميل الأحداث...',
      eventDetail: 'تفاصيل الحدث',
      postedBy: 'نشر بواسطة',
      attendees: 'الحاضرون',
      host: 'المضيف',
      today: 'اليوم',
      searchEvents: 'البحث عن أحداث...',
      filterByIndustry: 'تصفية حسب الصناعة',
      filterBySector: 'تصفية حسب القطاع',
      filterByTimeRange: 'النطاق الزمني',
      timeRange_day: 'يوم',
      timeRange_week: 'أسبوع',
      timeRange_month: 'شهر',
      timeRange_year: 'سنة',
      filterByDate: 'تصفية حسب التاريخ',
      filterByLocation: 'تصفية حسب الموقع',
      nearMe: 'بالقرب مني',
      searchCityOrZip: 'ابحث عن مدينة أو رمز بريدي...',
      gettingLocation: 'جارٍ تحديد الموقع...',
      locationPermissionDenied: 'تم رفض إذن الموقع',
      allIndustries: 'جميع الصناعات',
      allSectors: 'جميع القطاعات',
      allCities: 'جميع المدن',
      filterByCity: 'تصفية حسب المدينة',
      clearFilters: 'مسح الفلاتر',
      titleRequired: 'عنوان الحدث مطلوب',
      endDateAfterStart: 'يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء',
      descriptionRequired: 'الوصف مطلوب',
      eventCreated: 'تم إنشاء الحدث بنجاح',
      eventCreateError: 'فشل في إنشاء الحدث',
      editEvent: 'تعديل الحدث',
      eventUpdated: 'تم تحديث الحدث بنجاح',
      eventUpdateError: 'فشل في تحديث الحدث',
      signInToCreate: 'سجل الدخول لإنشاء الأحداث',
      signInToAdd: 'سجل الدخول لإضافة الأحداث',
      confirmDelete: 'حذف الحدث',
      tagPeople: 'وسم الأشخاص',
      tagCompanies: 'وسم الشركات',
      searchPeople: 'البحث عن أشخاص...',
      searchCompanies: 'البحث عن شركات...',
      taggedPeople: 'الأشخاص المشاركون',
      taggedCompanies: 'الشركات المشاركة',
      myCreatedEvents: 'فعالياتي',
      noCreatedEvents: 'لم تقم بإنشاء أي فعاليات بعد',
      monthNames: 'يناير,فبراير,مارس,أبريل,مايو,يونيو,يوليو,أغسطس,سبتمبر,أكتوبر,نوفمبر,ديسمبر',
      dayNames: 'أحد,إثن,ثلا,أرب,خمي,جمع,سبت',
      shareEvent: 'مشاركة الحدث',
      eventShared: 'تمت مشاركة الحدث!',
      rsvp: 'تأكيد الحضور',
      attending: 'حاضر',
      rsvpSuccess: 'أنت الآن تحضر هذا الحدث!',
      createPostFromEvent: 'إنشاء منشور',
      viewEvent: 'عرض الحدث',
      sharedAnEvent: 'شارك حدثاً',
      coverImage: 'صورة الغلاف',
      addCoverImage: 'إضافة صورة غلاف',
      postCreated: 'تم إنشاء المنشور من الحدث!',
      postCreateError: 'فشل في إنشاء المنشور.',
    },

    auth: {
      signin: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      signout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      createAccount: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      emailRequired: 'البريد الإلكتروني مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      weakPassword: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      userNotFound: 'لم يتم العثور على حساب بهذا البريد الإلكتروني',
      wrongPassword: 'كلمة مرور خاطئة',
      emailAlreadyInUse: 'يوجد حساب بهذا البريد الإلكتروني بالفعل',
      tooManyRequests: 'محاولات فاشلة كثيرة. يرجى المحاولة لاحقاً',
      networkError: 'خطأ في الشبكة. يرجى فحص اتصالك',
    },
    
    displayName: {
      validation: {
        required: 'اسم المستخدم مطلوب',
        reserved: 'هذا الاسم محجوز ولا يمكن استخدامه',
        currentName: 'هذا هو اسم المستخدم الحالي الخاص بك',
        taken: 'اسم المستخدم مُستخدم بالفعل',
        temporarilyReserved: 'اسم المستخدم محجوز مؤقتاً',
        available: 'اسم المستخدم متاح!',
        checkError: 'غير قادر على التحقق من التوفر. يرجى المحاولة مرة أخرى.',
        tooShort: 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل',
        tooLong: 'يجب أن يكون اسم المستخدم أقل من 30 حرفاً',
        invalidCharacters: 'يمكن لاسم المستخدم أن يحتوي على أحرف وأرقام ومسافات وشرطات سفلية وشرطات فقط',
        invalidFormat: 'تنسيق اسم المستخدم غير صحيح',
      },
      console: {
        savingToPermanent: '💾 حفظ في قاعدة البيانات الدائمة لأسماء المستخدمين:',
        successfullySaved: '✅ تم الحفظ بنجاح في قاعدة البيانات الدائمة:',
        documentCreated: '📊 تم إنشاء مستند في مجموعة saved_usernames بالمعرف:',
        errorSaving: '❌ خطأ في الحفظ في قاعدة البيانات الدائمة:',
        incrementedCounter: '📈 تم زيادة عداد محاولات الأسماء المُستخدمة لـ:',
        cannotIncrementCounter: '⚠️ لا يمكن زيادة العداد - اسم المستخدم غير موجود في saved_usernames:',
        errorIncrementingCounter: '❌ خطأ في زيادة عداد المحاولات:',
        handlingUsernameChange: '🔄 معالجة تغيير اسم المستخدم:',
        usernameChangeCompleted: '✅ تم إكمال تغيير اسم المستخدم بنجاح',
        failedToSaveNewUsername: '❌ فشل في حفظ اسم المستخدم الجديد أثناء التغيير',
        errorHandlingUsernameChange: '❌ خطأ في معالجة تغيير اسم المستخدم:',
        deletedOldUsername: '🗑️ تم حذف اسم المستخدم القديم من قاعدة البيانات الدائمة:',
        cannotDeleteUsername: '❌ لا يمكن حذف اسم المستخدم - ينتمي لمستخدم مختلف:',
        usernameNotFound: 'ℹ️ اسم المستخدم غير موجود في قاعدة البيانات (محذوف بالفعل؟):',
        errorDeletingFromPermanent: '❌ خطأ في الحذف من قاعدة البيانات الدائمة:',
        fetchingAllSavedUsernames: '📊 جلب جميع أسماء المستخدمين المحفوظة من قاعدة البيانات...',
        unknown: 'غير معروف',
        foundSavedUsernames: '✅ تم العثور على {{count}} أسماء مستخدمين محفوظة في قاعدة البيانات',
        errorGettingSavedUsernames: '❌ خطأ في الحصول على أسماء المستخدمين المحفوظة:',
        totalSavedUsernames: '📊 إجمالي أسماء المستخدمين المحفوظة في قاعدة البيانات: {{count}}',
        errorCountingSavedUsernames: '❌ خطأ في عد أسماء المستخدمين المحفوظة:',
        usernameDeactivated: '✅ تم إلغاء تفعيل اسم المستخدم:',
        unauthorizedDeactivation: '❌ غير مصرح: المستخدم لا يستطيع إلغاء تفعيل هذا الاسم',
        cleanupCompleted: 'تم تنظيف {{count}} مستندات محاولات منتهية الصلاحية',
        exampleUsage: {
          title: 'كيفية استخدام قاعدة بيانات أسماء المستخدمين المحفوظة:',
          saveUsername: 'عندما يحفظ المستخدم اسمه بنجاح في التطبيق:',
          seeAllSaved: 'لرؤية جميع أسماء المستخدمين المحفوظة:',
          getCount: 'للحصول على العدد:',
          testDatabase: 'لاختبار قاعدة البيانات:',
          collectionContains: 'ستحتوي مجموعة saved_usernames على:',
          documentId: 'معرف المستند: اسم المستخدم بأحرف صغيرة',
          usernameField: 'username: الحالة الأصلية',
          userIdField: 'userId: من حفظه',
          userEmailField: 'userEmail: بريد المستخدم الإلكتروني',
          savedAtField: 'savedAt: الطابع الزمني',
          isActiveField: 'isActive: صحيح/خاطئ',
          sourceField: 'source: من أين تم حفظه',
        },
      },
    },

categories: {
  // Existing categories
  agriculture: 'الزراعة',
  automotive: 'السيارات',
  construction: 'البناء',
  technology: 'التكنولوجيا',
  foodBeverage: 'الطعام والشراب',
  retail: 'البيع بالتجزئة',
  services: 'الخدمات',
  healthcare: 'الرعاية الصحية',
  education: 'التعليم',
  finance: 'المالية',
  realEstate: 'العقارات',
  manufacturing: 'التصنيع',
  transportation: 'النقل',
  entertainment: 'الترفيه',
  consulting: 'الاستشارات',
  
  // New categories
  creativeMedia: 'الإبداع والإعلام',
  educationTraining: 'التعليم والتدريب',
  energyEnvironment: 'الطاقة والبيئة',
  foodBeverageServices: 'خدمات الطعام والشراب',
  healthcareWellness: 'الرعاية الصحية والعافية',
  manufacturingIndustrial: 'التصنيع والصناعة',
  professionalFinancial: 'الخدمات المهنية والمالية',
  propertyMaintenance: 'صيانة العقارات',
  retailConsumer: 'البيع بالتجزئة والسلع الاستهلاكية',
  technologyDigital: 'التكنولوجيا الرقمية',
  transportationLogistics: 'النقل واللوجستيات',
  travel: 'السفر',
  governmentPublicServices: 'الحكومة والخدمات العامة',
  venue: 'مكان',
},

specialties: {
  // Agriculture
  organicFarming: 'الزراعة العضوية',
  cropManagement: 'إدارة المحاصيل',
  livestock: 'الثروة الحيوانية',
  pestControl: 'مكافحة الآفات',
  soilManagement: 'إدارة التربة',
  irrigation: 'الري',
  harvesting: 'الحصاد',
  seedSupply: 'توريد البذور',
  fertilizers: 'الأسمدة',
  equipmentRental: 'تأجير المعدات',
  consulting: 'الاستشارات',
  realEstate: 'العقارات',
  rawMaterials: 'المواد الخام',
  supplies: 'اللوازم',
  manager: 'مدير',
  automotive: 'السيارات',
  
  agriculturalEquipment: 'المعدات الزراعية',
  agriculturalEquipmentRetail: 'بيع المعدات الزراعية',
  agriculturalServices: 'الخدمات الزراعية',
  agriculturalSupply: 'اللوازم الزراعية',
  cropNutritionProtection: 'تغذية/حماية المحاصيل',
  farming: 'الزراعة',
  farmLabor: 'العمالة الزراعية',
  farmManagement: 'إدارة المزارع',
  farmSupply: 'مستلزمات المزارع',
  fertilizer: 'الأسمدة',
  irrigationServicesSupply: 'خدمات/مستلزمات الري',
  pesticides: 'المبيدات',
  veterinaryServicesSupply: 'الخدمات/المستلزمات البيطرية',
  vineyards: 'الكروم',
  agricultureLab: 'مختبر زراعي',
  fieldTrials: 'التجارب الحقلية',
  dairy: 'منتجات الألبان',
  dairyServices: 'خدمات الألبان',
  agricultureRealEstate: 'العقارات الزراعية',
  cropInsurance: 'تأمين المحاصيل',
  assetManagement: 'إدارة الأصول',

  // Creative & Media
  audioEngineering: 'هندسة الصوت',
  contentCreation: 'إنشاء المحتوى',
  design: 'التصميم',
  filmVideo: 'الأفلام والفيديو',
  musicProduction: 'إنتاج الموسيقى',
  photography: 'التصوير',
  writingPublishing: 'الكتابة والنشر',
  newsCurrentEventsJournalism: 'الأخبار والأحداث الجارية والصحافة',

  // Education & Training
  commercialConstruction: 'البناء التجاري',
  constructionTrades: 'الحرف والبناء',
  corporateTraining: 'التدريب المؤسسي',
  educationalServices: 'الخدمات التعليمية',
  formalEducation: 'التعليم الرسمي',
  government: 'الحكومة',
  library: 'المكتبة',
  nonProfits: 'غير الربحية',
  residentialConstruction: 'البناء السكني',
  socialServices: 'الخدمات الاجتماعية',
  specializedTrades: 'الحرف المتخصصة',
  university: 'الجامعة',
  highSchool: 'المدرسة الثانوية',
  juniorCollege: 'الكلية المتوسطة',

  // Energy & Environment
  analysis: 'التحليل',
  energy: 'الطاقة',
  environment: 'البيئة',
  utilities: 'المرافق العامة',
  waterServices: 'خدمات المياه',
  
  // Food & Beverage Services
  barsNightlife: 'الحانات والحياة الليلية',
  cafe: 'المقهى',
  coffeeShops: 'محلات القهوة',
  foodServices: 'خدمات الطعام',
  restaurants: 'المطاعم',
  
  // Healthcare & Wellness
  barbershop: 'صالون الحلاقة',
  dentalServices: 'خدمات الأسنان',
  fitness: 'اللياقة البدنية',
  hairNailSalon: 'صالون الشعر/الأظافر',
  healthcareProviders: 'مقدمو الرعاية الصحية',
  massageParlor: 'صالون التدليك',
  medicalDevices: 'الأجهزة الطبية',
  mentalHealth: 'الصحة النفسية',
  nutrition: 'التغذية',
  pharmaceuticals: 'الصيدلة',
  physicalTherapy: 'العلاج الطبيعي',
  spa: 'السبا',
  wellness: 'العافية',
  
  // Manufacturing & Industrial
  aerospace: 'الطيران والفضاء',
  chemicals: 'الكيماويات',
  foodBeverageManufacturing: 'تصنيع الطعام والشراب',
  hydraulicServicesParts: 'خدمات/قطع هيدروليكية',
  industrial: 'الصناعي',
  textiles: 'المنسوجات',
  constructionAggregates: 'ركام البناء',

  // Professional & Financial Services
  accounting: 'المحاسبة',
  architectureDesign: 'الهندسة المعمارية والتصميم',
  engineering: 'الهندسة',
  financialServices: 'الخدمات المالية',
  legalServices: 'الخدمات القانونية',
  marketingAdvertising: 'التسويق والإعلان',
  healthInsurance: 'التأمين الصحي',
  autoInsurance: 'تأمين السيارات',
  homeInsurance: 'تأمين المنزل',
  financialManagement: 'الإدارة المالية',
  financialAnalysis: 'التحليل المالي',
  assetProtection: 'حماية الأصول',
  propertyManagement: 'إدارة العقارات',

  // Property Maintenance
  autoDetailing: 'تنظيف السيارات',
  electrical: 'الكهرباء',
  handyMan: 'عامل الصيانة',
  hvac: 'التدفئة والتبريد',
  landscaping: 'تنسيق الحدائق',
  lawnCare: 'العناية بالعشب',
  pressureWashing: 'الغسيل بالضغط',
  wasteRemoval: 'إزالة النفايات',

  // Retail & Consumer Goods
  apparel: 'الملابس',
  automotiveRentals: 'تأجير السيارات',
  automotiveRetail: 'بيع السيارات',
  beauty: 'الجمال',
  bookstore: 'المكتبة',
  carAudio: 'صوتيات السيارات',
  carWash: 'غسيل السيارات',
  electronics: 'الإلكترونيات',
  electronicsRetail: 'بيع الإلكترونيات',
  gardening: 'البستنة',
  hardware: 'الأدوات',
  homeGoods: 'السلع المنزلية',
  specialtyRetail: 'البيع المتخصص',
  tools: 'الأدوات',
  westernWear: 'الملابس الغربية',
  workWear: 'ملابس العمل',
  
  // Technology & Digital
  aiMachineLearning: 'الذكاء الاصطناعي والتعلم الآلي',
  blockchain: 'البلوك تشين',
  cloudComputing: 'الحوسبة السحابية',
  cybersecurity: 'الأمن السيبراني',
  dataAnalytics: 'البيانات والتحليلات',
  ecommercePlatforms: 'منصات التجارة الإلكترونية',
  edtech: 'التكنولوجيا التعليمية',
  fintech: 'التكنولوجيا المالية',
  gaming: 'الألعاب',
  hardwareElectronics: 'الأجهزة والإلكترونيات',
  healthtech: 'التكنولوجيا الصحية',
  itServices: 'خدمات تقنية المعلومات',
  softwareSaas: 'البرمجيات كخدمة',
  telecommunications: 'الاتصالات',
  webDevelopment: 'تطوير الويب',
  
  // Transportation & Logistics
  batteryServices: 'خدمات البطارية',
  equipmentTransportation: 'نقل المعدات',
  logistics: 'اللوجستيات',
  roadside: 'الطريق',
  shipping: 'الشحن',
  tireServices: 'خدمات الإطارات',
  towServices: 'خدمات السحب',
  repossessionServices: 'خدمات الاستعادة',

  // Travel
  accommodation: 'الإقامة',
  hospitality: 'الضيافة',
  airTravel: 'السفر الجوي',
  hotel: 'الفندق',
  rvPark: 'حديقة عربات سكنية',
  busTransportation: 'النقل بالحافلات',
  trainTransportation: 'النقل بالقطار',
  packagingWarehouse: 'مستودع التعبئة',
  coldStorage: 'التخزين البارد',
  storageWarehouse: 'مستودع التخزين',
  miniStorage: 'تخزين صغير',
  rvStorage: 'تخزين العربات السكنية',
  boatStorage: 'تخزين القوارب',
  rentals: 'الإيجارات',
  cosmetics: 'مستحضرات التجميل',
  generalProducts: 'منتجات عامة',
  partsSupply: 'توريد القطع',
  artsCrafts: 'الفنون والحرف',
  ballroom: 'قاعة رقص',
  conventionCenter: 'مركز مؤتمرات',
  eventHall: 'قاعة فعاليات',
  privateVenue: 'مكان خاص',
  stadium: 'ملعب',
},

    network: {
      title: 'الشبكة',
      feedComingSoon: 'موجز الشبكة قريباً',
      feedDescription: 'ستظهر هنا منشورات شبكتك',
      signInToCreatePosts: 'يرجى تسجيل الدخول لإنشاء منشورات.',
      networkFeed: 'الشبكة',
      followingFeed: 'الاتصالات',
      createPost: 'إنشاء منشور',
      whatsHappening: 'ماذا يحدث في عالمك الزراعي؟',
      searchPlaceholder: 'البحث عن منشورات، أشخاص، شركات...',
      noPostsFound: 'لا توجد منشورات',
      noFriendsPostsYet: 'لا توجد منشورات من الأصدقاء بعد',
      noConnectionsYet: 'لا توجد اتصالات بعد',
      startFollowing: 'ابدأ بالتواصل مع أشخاص لرؤية منشوراتهم هنا',
      adjustFilters: 'جرب تعديل مرشحات البحث',
      signInToSee: 'سجل الدخول لرؤية المنشورات',
      joinConversation: 'أنشئ حساباً للانضمام إلى المحادثة',
      stories: 'القصص',
      addStory: 'إضافة قصة',
      viewStory: 'عرض القصة',
      sharePost: 'مشاركة المنشور',
      bookmarkPost: 'حفظ المنشور',
      likePost: 'إعجاب بالمنشور',
      commentOnPost: 'التعليق على المنشور',
      reportPost: 'الإبلاغ عن المنشور',
      hidePost: 'إخفاء المنشور',
      blockUser: 'حظر المستخدم',
      followToSeeStories: 'تواصل مع الأشخاص لرؤية قصصهم',
      postHasBeenDeleted: 'تم حذف هذا المنشور',
      viewPost: 'عرض المنشور',
    },

    postAnalytics: {
      title: 'تحليلات المنشور',
      views: 'المشاهدات',
      likes: 'الإعجابات',
      comments: 'التعليقات',
      shares: 'المشاركات',
      bookmarks: 'المحفوظات',
      whoViewed: 'من شاهد',
      whoLiked: 'من أعجب',
      whoCommented: 'من علّق',
      whoBookmarked: 'من حفظ',
      totalShares: 'إجمالي المشاركات',
      noData: 'لا توجد بيانات بعد',
    },

    manage: {
      title: 'إدارة',
      browseBusinesses: 'تصفح الشركات',
      manageBusiness: 'إدارة الأعمال',
      loading: 'جاري التحميل...',
      services: 'الخدمات',
      messages: 'الرسائل',
      analytics: 'التحليلات',
      addService: 'إضافة خدمة',
      editService: 'تحرير الخدمة',
      serviceName: 'اسم الخدمة',
      serviceDescription: 'وصف الخدمة',
      startingPrice: 'السعر الابتدائي',
      category: 'الفئة',
      addImage: 'إضافة صورة',
      changeImage: 'تغيير الصورة',
      noServicesFound: 'لا توجد خدمات',
      createFirstService: 'أنشئ خدمتك الأولى أو عدل المرشحات',
      searchServices: 'البحث عن خدمات...',
      searchBusinesses: 'البحث عن شركات، خدمات، صناعات...',
      allIndustries: 'جميع الصناعات',
      messageCount: 'محادثات',
      conversationsWillAppear: 'ستظهر الرسائل هنا عندما تتواصل معك الشركات',
      businessMessages: 'رسائل الأعمال',
      profileRequired: 'الملف الشخصي مطلوب',
      addDisplayName: 'يرجى إضافة اسم للعرض أو اسم تجاري على الأقل لإنشاء منشورات.',
      accountType: 'نوع الحساب',
      everyone: 'الجميع',
      businessesOnly: 'الشركات فقط',
      industries: 'الصناعات',
      sectors: 'القطاعات',
      location: 'الموقع',
      applyFilters: 'تطبيق المرشحات',
      resetFilters: 'إعادة تعيين',
      searchFilter: 'البحث والترشيح',
      cityOrZip: 'المدينة أو الرمز البريدي',
      specialties: 'التخصصات',
      loadingServices: 'جاري تحميل الخدمات...',
      loadingPosts: 'جاري تحميل المنشورات...',
      loadingAnalytics: 'جاري تحميل التحليلات...',
      type: 'النوع',
      image: 'الصورة',
      product: 'المنتج',
      service: 'الخدمة',
      enterServiceName: 'أدخل اسم الخدمة',
      describeService: 'اوصف خدمتك',
      enterPrice: 'أدخل السعر',
      enterCategory: 'أدخل الفئة',
      serviceNameRequired: 'اسم الخدمة مطلوب.',
      serviceDescriptionRequired: 'وصف الخدمة مطلوب.',
      validPriceRequired: 'سعر صالح مطلوب.',
      contactForPrice: 'اتصل للحصول على السعر',
      pleaseSelectCategory: 'يرجى اختيار فئة.',
      serviceUpdatedSuccessfully: 'تم تحديث الخدمة بنجاح!',
      serviceCreatedSuccessfully: 'تم إنشاء الخدمة بنجاح!',
      failedToCreateService: 'فشل في إنشاء الخدمة. يرجى المحاولة مرة أخرى.',
      failedToUpdateService: 'فشل في تحديث الخدمة. يرجى المحاولة مرة أخرى.',
      restrictVisibility: 'تقييد الرؤية',
      mediaActions: 'إجراءات الوسائط',
      postArchived: 'تم أرشفة المنشور بنجاح',
      postVisibilityRestricted: 'تم تقييد رؤية المنشور',
      postDeleted: 'تم حذف المنشور بنجاح',
      failedToArchive: 'فشل في أرشفة المنشور. يرجى المحاولة مرة أخرى.',
      failedToRestrict: 'فشل في تقييد المنشور. يرجى المحاولة مرة أخرى.',
      failedToDelete: 'فشل في حذف المنشور. يرجى المحاولة مرة أخرى.',
      characterCount: '{{current}}/{{max}} حرف',
      noConversationsYet: 'لا توجد محادثات بعد',
      messagesWillAppearHere: 'ستظهر الرسائل هنا عندما تتواصل معك الشركات',
      onlineStatus: 'متصل',
      offlineStatus: 'غير متصل',
      permissionRequiredCamera: 'إذن الكاميرا مطلوب',
      grantCameraPermission: 'يرجى منح إذن للوصول إلى الكاميرا.',
      failed: 'فشل',
      tryAgainLater: 'يرجى المحاولة مرة أخرى لاحقاً',
      conversationStarted: 'بدأت المحادثة بنجاح',
      failedToStartConversation: 'فشل في بدء المحادثة',
      authenticationRequired: 'المصادقة مطلوبة',
      pleaseSignInToStart: 'يرجى تسجيل الدخول لبدء المحادثات.',
      selectFromPhotoLibrary: 'اختيار من مكتبة الصور',
      noDataAvailable: 'لا توجد بيانات متاحة بعد',
      lastActive: 'آخر نشاط',
      startConversation: 'بدء المحادثة',
      allCategories: 'جميع الفئات',
      viewProfile: 'عرض الملف الشخصي',
      businessProfile: 'ملف العمل الشخصي',
      timeline: 'الجدول الزمني',
      servicesAndProducts: 'الخدمات والمنتجات',
      noServicesYet: 'لا توجد خدمات بعد',
      createYourFirst: 'أنشئ خدمتك الأولى',
      selectMedia: 'اختيار الوسائط',
      removeMedia: 'إزالة الوسائط',
      mediaSelected: 'تم اختيار الوسائط',
      pleaseEnterValidPrice: 'يرجى إدخال سعر صالح',
      categoryRequired: 'الفئة مطلوبة',
      verified: 'موثق',
      moreSpecialties: 'المزيد من التخصصات',
      businessHours: 'ساعات العمل',
      established: 'تأسس',
      viewFullProfile: 'عرض الملف الشخصي الكامل',
      getDirections: 'الحصول على الاتجاهات',
      business: 'شركة',
      businesses: 'شركات',
      confirmDeleteService: 'هل أنت متأكد من أنك تريد حذف',  // ← ADD THIS
  serviceDeletedSuccessfully: 'تم حذف الخدمة بنجاح',
  allLocations: 'جميع المواقع',
  allSpecialties: 'جميع التخصصات',
  moreFilters: 'مزيد من المرشحات',
  anyRating: 'أي تقييم',
  minRating: 'الحد الأدنى للتقييم',
  locationRadius: 'نطاق الموقع',
  useMyLocation: 'استخدام موقعي',
  searchAddress: 'البحث عن عنوان',
  gettingLocation: 'جاري الحصول على موقعك...',
  searchLocationPlaceholder: 'ابحث عن عنوان أو مدينة...',
  radius: 'نطاق',
  adjustFilters: 'حاول تعديل المرشحات',
    },

    profile: {
      currentPositionPlaceholder: 'مثال: مهندس برمجيات أول، مدير مزرعة، إلخ',
      gpaPlaceholder: 'مثال: 3.8',
      title: 'الملف الشخصي',
      editProfile: 'تحرير الملف الشخصي',
      accountSettings: 'إعدادات الحساب',
      privacy: 'الخصوصية',
      help: 'مساعدة',
      about: 'حول',
      signOut: 'تسجيل الخروج',
      profilePicture: 'صورة الملف الشخصي',
      displayName: 'اسم العرض',
      businessName: 'اسم العمل',
      bio: 'السيرة الذاتية',
      website: 'الموقع الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      saveChanges: 'حفظ التغييرات',
      discardChanges: 'تجاهل التغييرات',
      followersCount: 'متصلون',
      followingCount: 'متصل بـ',
      postsCount: 'المنشورات',
      follow: 'تواصل',
      unfollow: 'إزالة الاتصال',
      following: 'متصل',
      pendingConnection: 'قيد الانتظار',
      acceptConnection: 'قبول',
      declineConnection: 'رفض',
      cancelRequest: 'إلغاء الطلب',
      connectionRequest: 'يريد التواصل معك',
      connectionAccepted: 'قبل طلب التواصل الخاص بك',
      message: 'رسالة',
      viewLocation: 'عرض الموقع',
      contactInfo: 'معلومات الاتصال',
      businessHours: 'ساعات العمل',
      established: 'تأسس في',
      verified: 'موثق',
      individual: 'فردي',
      business: 'تجاري',
      selectCategory: 'اختر الفئة',
      selectSpecialties: 'اختر التخصصات',
      chooseAllThatApply: 'اختر كل ما ينطبق',
      selected: 'مُختارة',
      loading: 'جاري تحميل الملف الشخصي...',
      createProfile: 'إنشاء ملف شخصي',
      welcomeToProfile: 'مرحباً بك في ملفك الشخصي',
      createAccountToAccess: 'أنشئ حساباً للوصول إلى ملفك الشخصي وإدارة معلومات عملك',
      letsBegin: 'لنبدأ',
      unsavedChanges: 'تغييرات غير محفوظة',
      unsavedChangesMessage: 'لديك تغييرات غير محفوظة. هل تريد حفظها قبل الإغلاق؟',
      discard: 'تجاهل',
      myProfile: 'ملفي الشخصي',
      userProfile: 'ملف المستخدم الشخصي',
      addCoverPhoto: 'إضافة صورة غلاف',
      userName: 'اسم المستخدم',
      yourName: 'اسمك',
      required: '*',
      enterUsername: 'أدخل اسم المستخدم',
      enterRealName: 'أدخل اسمك الحقيقي',
      enterDisplayName: 'أدخل اسم العرض',
      enterBusinessName: 'أدخل اسم العمل',
      tellUsAboutYourself: 'أخبرنا عن نفسك وخبراتك',
      tellUsAboutBusiness: 'أخبرنا عن عملك وخدماتك',
      industry: 'الصناعة',
      currentPosition: 'المنصب الحالي',
      sectors: 'القطاعات',
      noneSelected: 'لم يتم اختيار أي منها',
      contactInformation: 'معلومات الاتصال',
      businessAddress: 'عنوان العمل',
      searchForAddress: 'البحث عن عنوان',
      getPreciseLocation: 'احصل على موقع دقيق تلقائياً',
      selectedAddress: 'العنوان المحدد',
      locationForNetworking: 'أضف موقعك للتواصل المهني',
      selectedLocation: 'الموقع المحدد',
      searchForLocation: 'البحث عن موقع',
      useGpsLocation: 'استخدم موقع GPS',
      enterManually: 'أدخل يدوياً',
      locationDetails: 'تفاصيل الموقع',
      preciseLocationAvailable: 'موقع دقيق متاح',
      educationAcademicBackground: 'التعليم والخلفية الأكاديمية',
      degreeCertification: 'الدرجة/الشهادة',
      schoolUniversity: 'المدرسة/الجامعة',
      graduationYear: 'سنة التخرج',
      gpa: 'المعدل',
      additionalEducation: 'تعليم إضافي',
      academicAwardsHonors: 'الجوائز والأوسمة الأكاديمية',
      professionalCertifications: 'الشهادات المهنية',
      volunteerWorkCommunity: 'العمل التطوعي وخدمة المجتمع',
      publicationsResearch: 'المنشورات والأبحاث',
      additionalInformation: 'معلومات إضافية',
      businessDetails: 'تفاصيل العمل',
      keySkills: 'المهارات الأساسية',
      languages: 'اللغات',
      professionalInterests: 'الاهتمامات المهنية',
      otherRelevantInformation: 'معلومات أخرى ذات صلة',
      yearEstablished: 'سنة التأسيس',
      logout: 'تسجيل الخروج',
      areYouSureLogout: 'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      usernameNotAvailable: 'اسم المستخدم غير متاح',
      displayNameNotAvailable: 'اسم العرض غير متاح',
      availableAlternatives: 'البدائل المتاحة:',
      use: 'استخدم',
      searchAddress: 'البحث عن عنوان',
      findExactAddress: 'اعثر على عنوانك الدقيق لعرض موقع دقيق',
      startTypingAddress: 'ابدأ بكتابة عنوانك...',
      startWithStreetNumber: 'ابدأ برقم الشارع أو العنوان',
      selectingAddressProvidesGPS: 'تحديد العنوان يوفر إحداثيات GPS دقيقة',
      selectCoverPhoto: 'اختيار صورة الغلاف',
      selectLogo: 'اختيار الشعار',
      chooseFromGallery: 'اختيار من المعرض',
      selectFromPhotoLibrary: 'اختيار من مكتبة الصور',
      invalidUrl: 'رابط غير صحيح',
      unableToOpenWebsite: 'لا يمكن فتح هذا الموقع. يرجى التحقق من تنسيق الرابط.',
      checkUrlFormat: 'يرجى التحقق من تنسيق الرابط',
      copyUrl: 'نسخ الرابط',
      urlCopied: 'تم نسخ الرابط',
      offlineMode: 'الوضع غير المتصل',
      profileSavedLocally: 'تم حفظ ملفك الشخصي محلياً وسيتم المزامنة عند الاتصال بالإنترنت.',
      saveFailed: 'فشل في الحفظ',
      authenticationError: 'خطأ في المصادقة. يرجى تسجيل الدخول مرة أخرى.',
      signInAgain: 'يرجى تسجيل الدخول مرة أخرى',
      success: 'نجح',
      profileSavedSuccessfully: 'تم حفظ الملف الشخصي بنجاح!',
      manualEntry: 'إدخال يدوي',
      enterBusinessAddress: 'أدخل عنوان عملك:',
      enterYourLocation: 'أدخل موقعك:',
      addressSelected: 'تم اختيار العنوان',
      addressUpdatedWithLocation: 'تم تحديث العنوان ببيانات موقع دقيقة للعرض على الخريطة.',
      failedToProcessAddress: 'فشل في معالجة العنوان. يرجى المحاولة مرة أخرى.',
      phoneFormat: '(555) 123-4567',
      enterWebsiteUrl: 'أدخل رابط الموقع (مثل: https://cultivanetwork.com)',
      degreeExample: 'مثال: بكالوريوس في علوم الكمبيوتر',
      universityExample: 'مثال: جامعة كاليفورنيا، بيركلي',
      graduationYearExample: 'مثال: 2023',
      gpaExample: 'مثال: 3.8',
      businessHoursExample: 'مثال: الاثنين-الجمعة، 9 صباحاً-6 مساءً',
      additionalEducationPlaceholder: 'دورات أخرى، معسكرات تدريبية، شهادات عبر الإنترنت...',
      academicAwardsPlaceholder: 'قائمة العميد، منح دراسية، مسابقات أكاديمية...',
      certificationsPlaceholder: 'شهادات صناعية، تراخيص، اعتمادات مهنية...',
      volunteerWorkPlaceholder: 'مشاركة مجتمعية، مناصب تطوعية، عمل غير ربحي...',
      publicationsPlaceholder: 'أوراق بحثية، مقالات، عمل منشور...',
      keySkillsPlaceholder: 'مهارات تقنية، إتقان البرمجيات، أدوات لديك خبرة فيها...',
      languagesPlaceholder: 'مثال: الإنجليزية (أصلي)، الإسبانية (طليق)، الفرنسية (محادثة)',
      professionalInterestsPlaceholder: 'مجالات تشعر بالشغف تجاهها، صناعات تريد العمل فيها...',
      otherRelevantPlaceholder: 'أي شيء آخر قد يكون ذا صلة لأصحاب العمل المحتملين...',
      removeLocation: 'إزالة الموقع',
      locationRemoved: 'تم حذف الموقع',
      businessAddressRemoved: 'تم حذف عنوان العمل من ملفك الشخصي.',
      locationCleared: 'تم مسح موقعك من ملفك الشخصي.',
      preciseLocationWithGPS: 'موقع دقيق مع إحداثيات GPS',
      manualEntryNoGPS: 'إدخال يدوي - بدون إحداثيات GPS',
      addressDetailsTitle: 'تفاصيل العنوان',
      locationDetailsTitle: 'تفاصيل الموقع',
      coordinatesLabel: 'الإحداثيات:',
      googlePlaceIdLabel: 'معرف أماكن جوجل:',
      manualEntryLabel: 'إدخال يدوي',
      searchAddressPlaceholder: 'ابدأ بكتابة عنوانك...',
      noResultsFound: 'لم يتم العثور على عناوين. جرب مصطلح بحث مختلف.',
      searchError: 'فشل البحث. يرجى التحقق من اتصال الإنترنت.',
      apiKeyNotConfigured: 'البحث عن العناوين غير متاح. يرجى الاتصال بالدعم.',
      networkError: 'خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
      requestTimeout: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.',
      rateLimitExceeded: 'طلبات كثيرة جداً. يرجى الانتظار قليلاً والمحاولة مرة أخرى.',
      requestDenied: 'تم رفض إذن البحث عن العناوين. يرجى الاتصال بالدعم.',
      requiredFieldsProgress: '{filled} من {total} حقول مطلوبة مكتملة',
      fieldsRemaining: 'الحقول المتبقية:',
      multipleLocations: 'مواقع متعددة',
      multipleLocationsDescription: 'أضف مواقع إضافية لنشاطك التجاري',
      addLocation: 'إضافة موقع',
      locationName: 'اسم الموقع',
      locationNamePlaceholder: 'مثال: المكتب الرئيسي، المستودع، فرع وسط المدينة',
      locationPhone: 'الهاتف',
      locationBusinessHours: 'ساعات العمل',
      locationAddress: 'العنوان',
      additionalLocations: 'المواقع الإضافية',
      editLocation: 'تعديل الموقع',
      deleteLocation: 'حذف الموقع',
      deleteLocationConfirm: 'حذف الموقع؟',
      deleteLocationMessage: 'هل أنت متأكد أنك تريد إزالة هذا الموقع؟',
      locationAdded: 'تمت إضافة الموقع بنجاح',
      locationUpdated: 'تم تحديث الموقع بنجاح',
      locationDeleted: 'تم إزالة الموقع',
      noAdditionalLocations: 'لا توجد مواقع إضافية بعد',
      addYourFirstLocation: 'اضغط على "إضافة موقع" لإضافة موقع تجاري آخر',
      usePrimaryIfBlank: 'اتركه فارغاً لاستخدام معلومات الموقع الرئيسي',
    },

    scan: {
      title: 'مسح',
      searchLocation: 'البحث عن موقع',
      nearbyBusinesses: 'الشركات القريبة',
      mapView: 'عرض الخريطة',
      listView: 'عرض القائمة',
      directions: 'الاتجاهات',
      callBusiness: 'اتصال بالشركة',
      visitWebsite: 'زيارة الموقع',
      noBusinessesNearby: 'لا توجد شركات قريبة',
      locationPermission: 'إذن الموقع مطلوب',
      enableLocation: 'تمكين الموقع',
      searchRadius: 'نطاق البحث',
      filterByCategory: 'ترشيح حسب الفئة',
      miles: 'ميل',
      kilometers: 'كم',
      loadingMap: 'جاري تحميل الخريطة...',
      signInRequired: 'يرجى تسجيل الدخول لاكتشاف الشركات القريبة منك',
      pleaseSignInToDiscover: 'يرجى تسجيل الدخول لاكتشاف الشركات القريبة منك',
      searchBusinesses: 'البحث عن شركات...',
      measure: 'قياس',
      edit: 'تعديل',
      area: 'المساحة',
      perimeter: 'المحيط',
      points: 'النقاط',
      method: 'الطريقة',
      manual: 'يدوي',
      gps: 'GPS',
      notes: 'ملاحظات',
      created: 'تم الإنشاء',
      unknown: 'غير معروف',
      savedFields: 'الحقول المحفوظة',
      loadingFields: 'جاري تحميل الحقول...',
      manualDrawing: 'الرسم اليدوي',
      gpsWalking: 'المشي بـ GPS',
      tapToView: 'انقر للعرض على الخريطة',
      noFieldsSaved: 'لا توجد حقول محفوظة بعد',
      tapMeasureToStart: 'انقر على زر "قياس" لبدء قياس مساحات الحقول',
      businesses: 'شركات',
      found: 'موجودة',
      more: 'المزيد',
      locationNotSpecified: 'الموقع غير محدد',
      tapToViewProfile: 'انقر لعرض الملف الشخصي الكامل',
      specialties: 'التخصصات',
      mapStandard: 'قياسي',
      mapSatellite: 'قمر صناعي',
      mapHybrid: 'هجين',
    },

    settings: {
      title: 'الإعدادات',
      loading: 'جاري تحميل الإعدادات...',
      general: 'عام',
      accounts: 'الحسابات',
      activity: 'النشاط',
      blocked: 'المحظورون',
      privacy: 'الخصوصية',
      language: 'اللغة',
      
      accountManagement: 'إدارة الحسابات',
      accountManagementDesc: 'إدارة والتبديل بين حساباتك المتعددة',
      activeAccount: 'الحساب النشط',
      allAccounts: 'جميع الحسابات',
      addAccount: 'إضافة حساب',
      switchAccount: 'تبديل الحساب',
      removeAccount: 'إزالة الحساب',
      individual: 'فردي',
      business: 'تجاري',
      lastActive: 'آخر نشاط',
      followers: 'اتصالات',
      following: 'اتصالات',
      
      yourActivity: 'نشاطك',
      yourActivityDesc: 'عرض وإدارة تاريخ نشاطك مع التحديثات الفورية',
      networkConnections: 'الشبكة والاتصالات',
      networkConnectionsDesc: 'حضورك الاجتماعي على كلتيفا',
      contentEngagement: 'المحتوى والتفاعل',
      contentEngagementDesc: 'منشوراتك وتفاعلاتك',
      peopleFollowingYou: 'متصلون',
      peopleYouFollow: 'متصل بـ',
      postsCreated: 'المنشورات المُنشأة',
      likesGiven: 'الإعجابات المُعطاة',
      commentsPosted: 'التعليقات المنشورة',
      postsSaved: 'المنشورات المحفوظة',
      noActivityYet: 'لا يوجد نشاط بعد',
      justNow: 'الآن',
      viewPost: 'عرض المنشور',
      showDeleted: 'إظهار المحذوفة',
      showArchived: 'إظهار المؤرشفة',
      recentActivities: 'الأنشطة الحديثة',
      noRecentActivities: 'لا توجد أنشطة حديثة',
      
      languageSettings: 'إعدادات اللغة',
      languageSettingsDesc: 'اختر لغتك المفضلة للتطبيق بأكمله',
      currentLanguage: 'اللغة الحالية',
      selectLanguage: 'اختيار اللغة',
      languageChanged: 'تم تغيير اللغة بنجاح',
      restartRequired: 'يرجى إعادة تشغيل التطبيق للتأثير الكامل',
      
      blockedUsers: 'المستخدمون المحظورون',
      blockedUsersDesc: 'إدارة المستخدمين الذين حظرتهم من التفاعل معك',
      blockUser: 'حظر مستخدم',
      unblockUser: 'إلغاء الحظر',
      searchUsers: 'البحث عن مستخدمين',
      searchUsersPlaceholder: 'البحث عن المستخدمين بالاسم أو العمل...',
      noUsersFound: 'لم يتم العثور على مستخدمين',
      tryDifferentSearch: 'جرب مصطلح بحث مختلف',
      searchForUsers: 'البحث عن مستخدمين لحظرهم',
      startTyping: 'ابدأ بالكتابة لرؤية النتائج',
      blockConfirm: 'حظر {{name}}؟ لن يتمكنوا من رؤية منشوراتك أو الاتصال بك.',
      unblockConfirm: 'إلغاء حظر {{name}}؟',
      userBlocked: 'تم حظر المستخدم بنجاح',
      userUnblocked: 'تم إلغاء حظر المستخدم بنجاح',
      blockedDate: 'محظور في {{date}}',
      
      privacySettings: 'إعدادات الخصوصية',
      privacySettingsDesc: 'تحكم في كيفية رؤية الآخرين والتفاعل مع ملفك الشخصي',
      profileVisibility: 'رؤية الملف الشخصي',
      profileVisibilityDesc: 'تحكم في من يمكنه رؤية معلومات ملفك الشخصي',
      public: 'عام',
      friendsOnly: 'الاتصالات فقط',
      private: 'خاص',
      publicDesc: 'يمكن لأي شخص رؤية ملفك الشخصي ومنشوراتك',
      friendsOnlyDesc: 'فقط اتصالاتك يمكنهم رؤية ملفك الشخصي',
      privateDesc: 'فقط أنت يمكنك رؤية ملفك الشخصي',
      clearAllData: 'مسح جميع البيانات',
      clearAllDataDesc: 'سيؤدي هذا إلى حذف جميع بياناتك نهائياً بما في ذلك المنشورات والرسائل والنشاط. لا يمكن التراجع عن هذا الإجراء.',
      privacyFeaturesComing: 'إعدادات الخصوصية',
      privacyFeaturesDesc: 'خصوصيتك مهمة. ستكون ضوابط الخصوصية المتقدمة متاحة في تحديث مستقبلي.',
      
      enterEmailPassword: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
      switchedToAccount: 'تم التبديل إلى {{name}}',
      accountAdded: 'تم إضافة الحساب',
      accountAddedDesc: 'تم إضافة الحساب والتبديل إليه بنجاح! أغلق الإعدادات لرؤية منشورات حسابك الجديد.',
      closeSettings: 'إغلاق الإعدادات',
      accountOperationFailed: 'فشل في معالجة الحساب. يرجى المحاولة مرة أخرى.',
      noAccountFound: 'لم يتم العثور على حساب بهذا البريد الإلكتروني.',
      incorrectPassword: 'كلمة مرور خاطئة لهذا الحساب.',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
      tooManyAttempts: 'محاولات فاشلة كثيرة. يرجى المحاولة لاحقاً.',
      operationFailed: 'فشلت العملية',
      accountNotFound: 'الحساب غير موجود.',
      switchAccountConfirm: 'التبديل إلى؟\n\nستحتاج إلى إدخال كلمة المرور للتحقق من هويتك.',
      removeAccountConfirm: 'إزالة {{name}} من هذا الجهاز؟ يمكنك إضافته مرة أخرى بتسجيل الدخول.',
      accountRemovedSuccess: 'تم حذف الحساب بنجاح.',
      accountRemovalFailed: 'فشل في حذف الحساب.',
      currentUser: 'المستخدم الحالي',
      businessAccount: 'حساب تجاري',
      individualAccount: 'حساب فردي',
      userAccount: 'مستخدم',
      switchingAccounts: 'تبديل الحسابات...',
      loadingLanguage: 'تحميل اللغة...',
      accountFeatures: 'بيانات منفصلة • تبديل فوري • آمن وخاص',
      rememberLogin: 'تذكر تسجيل الدخول للتبديل السريع',
      quickSwitch: 'تبديل سريع',
      savedLoginExpired: 'انتهت صلاحية تسجيل الدخول المحفوظ',
      savedLoginExpiredDesc: 'بيانات الاعتماد المحفوظة لم تعد صالحة. يرجى تسجيل الدخول مرة أخرى.',
      forgetSavedLogin: 'نسيان تسجيل الدخول المحفوظ',
      forgetSavedLoginConfirm: 'إزالة تسجيل الدخول المحفوظ لـ {{name}}؟ ستحتاج إلى إدخال كلمة المرور في المرة القادمة.',
      forget: 'نسيان',

      // Activity
      activityManagement: 'إدارة النشاط',
      activityDeleteFailed: 'فشل في حذف النشاط.',
      activityArchiveFailed: 'فشل في أرشفة النشاط.',
      aPost: 'منشور',
      aBusiness: 'شركة',
      someone: 'شخص ما',
      
      // Blocking
      unknownUser: 'مستخدم غير معروف',
      blockedByUser: 'محظور بواسطة المستخدم',
      blockUserFailed: 'فشل في حظر المستخدم.',
      unblockUserFailed: 'فشل في إلغاء حظر المستخدم.',
      reason: 'السبب',
      searchUsersToBlock: 'ابحث عن المستخدمين بالاسم أو الشركة لحظرهم',
      
      // Sound Effects
      soundEffects: 'المؤثرات الصوتية',
      soundEffectsDesc: 'تشغيل الأصوات للإشعارات والإجراءات',
      enableSounds: 'تفعيل الأصوات',

      // Privacy
      privacySettingsUpdated: 'تم تحديث إعدادات الخصوصية.',
      privacySettingsFailed: 'فشل في حفظ إعدادات الخصوصية.',
      deleteAllData: 'حذف جميع البيانات',
      featureComingSoon: 'الميزة قريباً',
      featureComingSoonDesc: 'ستكون هذه الميزة متاحة في تحديث مستقبلي.',

      // Language
      languageChangeFailed: 'فشل في تغيير اللغة.',
      languageSupport: 'دعم اللغة',
      languageSupportDesc: 'تطبق تغييرات اللغة فوراً عبر التطبيق بأكمله. قد تتطلب تغييرات اتجاه النص العربي إعادة تشغيل التطبيق للحصول على التأثير الكامل.',
      activeLabel: 'نشط',
      
      // Modal text
      signInExistingAccount: 'سجل الدخول إلى حساب موجود لإضافته إلى هذا الجهاز',
      signIn: 'تسجيل الدخول',
      createAccount: 'إنشاء حساب',
      createNewAccountDesc: 'أنشئ حسابًا جديدًا وأضفه إلى هذا الجهاز',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
      passwordMinLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
      accountCreated: 'تم إنشاء الحساب',
      accountCreatedDesc: 'تم إنشاء حسابك الجديد وهو نشط الآن! أغلق الإعدادات للبدء.',
      createAccountFailed: 'تعذر إنشاء الحساب. حاول مرة أخرى.',
      emailAlreadyInUse: 'يوجد حساب بهذا البريد الإلكتروني بالفعل',
      weakPassword: 'كلمة المرور ضعيفة جدًا. استخدم 8 أحرف على الأقل.',
      networkError: 'مشكلة في الاتصال. تحقق من الإنترنت.',
      enterEmailAddress: 'أدخل عنوان البريد الإلكتروني',
      enterPassword: 'أدخل كلمة المرور',
    },

    businessProfile: {
      timeline: 'الجدول الزمني',
      services: 'الخدمات والمنتجات',
      posts: 'المنشورات',
      media: 'الوسائط',
      loadingServices: 'جاري تحميل الخدمات...',
      loadingPosts: 'جاري تحميل المنشورات...',
      loadingMedia: 'جاري تحميل الوسائط...',
      noServicesAvailable: 'لا توجد خدمات متاحة',
      noPostsAvailable: 'لا توجد منشورات متاحة',
      noMediaPosted: 'لم يتم نشر وسائط بعد',
      contactInformation: 'معلومات الاتصال',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      website: 'الموقع الإلكتروني',
      education: 'التعليم والخلفية',
      achievements: 'الإنجازات والشهادات',
      additionalInfo: 'معلومات إضافية',
      businessDetails: 'تفاصيل العمل',
      degree: 'الدرجة/الشهادة',
      university: 'الجامعة/المدرسة',
      graduationYear: 'سنة التخرج',
      gpa: 'المعدل',
      academicAwards: 'الجوائز الأكاديمية',
      certifications: 'الشهادات المهنية',
      volunteerWork: 'العمل التطوعي',
      publications: 'المنشورات والبحوث',
      keySkills: 'المهارات الأساسية',
      languages: 'اللغات',
      professionalInterests: 'الاهتمامات المهنية',
      otherInformation: 'معلومات أخرى',
      profilePrivate: 'هذا الملف الشخصي خاص',
      limitedProfileView: 'عرض محدود للملف الشخصي - تواصل لرؤية المزيد',
      followToSeeMore: 'تواصل لرؤية المزيد',
      searchServices: 'البحث عن الخدمات...',
      allCategories: 'الكل',
      noServicesMatch: 'لا توجد خدمات تتطابق مع مرشحاتك',
      clearFilters: 'مسح المرشحات',
      sortNewest: 'الأحدث أولاً',
      sortPriceLow: 'السعر: من الأقل إلى الأعلى',
      sortPriceHigh: 'السعر: من الأعلى إلى الأقل',
      sortName: 'الاسم: أ-ي',
      messageSeller: 'مراسلة البائع',
      isStillAvailable: 'هل لا يزال متاحاً؟',
      whatsLowestPrice: 'ما هو أقل سعر؟',
      canYouDeliver: 'هل يمكنك التوصيل؟',
      imInterested: 'أنا مهتم بهذا',
      free: 'مجاني',
      more: 'المزيد',
      less: 'أقل',
    },

    comments: {
      comments: 'التعليقات',
      addComment: 'إضافة تعليق...',
      reply: 'رد',
      like: 'إعجاب',
      loadingComments: 'جاري تحميل التعليقات...',
      noCommentsYet: 'لا توجد تعليقات بعد',
      beFirstToComment: 'كن أول من يعلق',
      replyingTo: 'رد على',
      cancelReply: 'إلغاء الرد',
      postComment: 'نشر التعليق',
      showReplies: 'إظهار الردود',
      hideReplies: 'إخفاء الردود',
    },

    rating: {
      rateThis: 'قيم هذا العمل',
      yourRating: 'تقييمك',
      averageRating: 'متوسط التقييم',
      totalReviews: 'مراجعات',
      noReviews: 'لا توجد مراجعات بعد',
      ratingSubmitted: 'تم إرسال التقييم',
      thankYouRating: 'شكراً لك على تقييمك! إليك كيف قيم الآخرون:',
      showDetails: 'إظهار التفاصيل',
      hideDetails: 'إخفاء التفاصيل',
      writeReview: 'كتابة مراجعة',
      readReviews: 'قراءة المراجعات',
    },

    stories: {
      stories: 'القصص',
      yourStory: 'قصتك',
      addStory: 'إضافة قصة',
      viewStory: 'عرض القصة',
      recordVideo: 'تسجيل فيديو',
      chooseFromGallery: 'اختيار من المعرض',
      storyExpires24h: 'تنتهي صلاحية القصة خلال 24 ساعة',
      noStoriesYet: 'لا توجد قصص بعد',
      watchStory: 'مشاهدة القصة',
      skipStory: 'تخطي القصة',
      storyUnavailable: 'القصة غير متاحة',
      preview: 'معاينة',
      reRecord: 'إعادة التسجيل',
      storyInfo: 'القصص مرئية لمدة 24 ساعة ويمكن أن تصل إلى 30 ثانية',
      shareAgriculturalWorld: 'شارك ما يحدث في عالمك الزراعي بفيديو مدته 30 ثانية',
      startRecording: 'بدء التسجيل',
      recordVideoFirst: 'يرجى تسجيل فيديو أولاً',
      storyPosted: 'تم نشر قصتك!',
      videoTooLarge: 'حجم الفيديو: {{size}} ميجابايت يتجاوز حد 500 ميجابايت للقصص. يرجى تسجيل فيديو أقصر.',
      createStory: 'إنشاء قصة',
      sharePhotoOrVideo: 'شارك صورة أو فيديو سيكون مرئياً لمدة 24 ساعة',
      takePhoto: 'التقاط صورة',
      selectDuration: 'اختر المدة',
      displayFor: 'عرض لمدة',
      continueEditing: 'متابعة التحرير',
      storyInfoPhotoVideo: 'الصور والفيديوهات مرئية لمدة 24 ساعة. يمكن أن تصل الفيديوهات إلى 30 ثانية.',
      selectMediaFirst: 'يرجى اختيار صورة أو فيديو أولاً',
    },

    messaging: {
      messages: 'الرسائل',
      conversation: 'المحادثة',
      typeMessage: 'اكتب رسالة...',
      send: 'إرسال',
      online: 'متصل',
      offline: 'غير متصل',
      delivered: 'تم التسليم',
      read: 'مقروء',
      startConversation: 'بدء المحادثة',
      conversationStarted: 'بدأت المحادثة',
      noMessages: 'لا توجد رسائل',
      loadingMessages: 'جاري تحميل الرسائل...',
      messageFailed: 'فشل في إرسال الرسالة',
      tryAgain: 'حاول مرة أخرى',
    },

    createPost: {
      createPost: 'إنشاء منشور',
      whatsOnMind: 'ما الذي تفكر فيه؟',
      addPhoto: 'إضافة صورة',
      addVideo: 'إضافة فيديو',
      camera: 'الكاميرا',
      gallery: 'المعرض',
      publish: 'نشر',
      saveDraft: 'حفظ المسودة',
      discardPost: 'تجاهل المنشور',
      publishingPost: 'جاري النشر...',
      postPublished: 'تم نشر المنشور بنجاح!',
      addMedia: 'إضافة وسائط',
      removeMedia: 'إزالة الوسائط',
      characterCount: 'أحرف',
      maxCharacters: 'الحد الأقصى 500 حرف',
      editPost: 'تحرير المنشور',
  deletePost: 'حذف المنشور',
  deleteConfirm: 'هل أنت متأكد من أنك تريد حذف هذا المنشور؟',
    },

    search: {
      search: 'بحث',
      searchAndFilter: 'البحث والترشيح',
      reset: 'إعادة تعيين',
      noResults: 'لا توجد نتائج',
      tryDifferent: 'جرب مصطلح بحث مختلف',
      searching: 'جاري البحث...',
      filterBy: 'ترشيح حسب',
      sortBy: 'ترتيب حسب',
      location: 'الموقع',
      category: 'الفئة',
      rating: 'التقييم',
      distance: 'المسافة',
      recent: 'حديث',
      popular: 'شائع',
      nearest: 'الأقرب',
      name: 'الاسم',
      allSectors: 'جميع القطاعات',
    },

    activities: {
      liked: 'أعجب بـ',
      comment: 'تعليق',
      reviewed: 'راجع',
      following: 'تواصل مع',
      saved: 'حفظ',
      created: 'أنشأ منشوراً',
      viewed: 'زائر',
      createdPost: 'أنشأ منشوراً',
      profileViewed: 'الملف الشخصي شاهد ملفك الشخصي',
      someoneViewed: 'شخص ما شاهد ملفك الشخصي',
      startedConversation: 'بدأ محادثة',
      sentMessage: 'أرسل رسالة',
      postedComment: 'نشر تعليقاً',
      photoAttached: 'صورة مرفقة',
      videoAttached: 'فيديو مرفق',
      archive: 'أرشفة',
      archived: 'تم أرشفة النشاط',
      deleteActivity: 'حذف النشاط',
      deleteConfirm: 'هل أنت متأكد من أنك تريد حذف هذا النشاط؟',
    },

    moderation: {
      reportPost: 'الإبلاغ عن المنشور',
      hidePost: 'إخفاء المنشور',
      blockUser: 'حظر المستخدم',
      reportUser: 'الإبلاغ عن المستخدم',
      spam: 'رسائل مزعجة',
      harassment: 'تحرش',
      inappropriateContent: 'محتوى غير مناسب',
      misinformation: 'معلومات مضللة',
      other: 'أخرى',
      reportSubmitted: 'تم إرسال تقريرك وسيتم مراجعته.',
      postHidden: 'تم إخفاء هذا المنشور من الموجز.',
      userBlocked: 'تم حظر المستخدم. لن تعود ترى منشوراتهم.',
      postReported: 'تم الإبلاغ عن المنشور للمراجعة.',
      alreadyReported: 'لقد أبلغت عن هذا المنشور بالفعل.',
      underReview: 'هذا المنشور قيد المراجعة',
      postActions: 'إجراءات المنشور',
      chooseAction: 'اختر إجراءً',
      reportReasonTitle: 'لماذا تقوم بالإبلاغ عن هذا المنشور؟',
      cannotReportOwnPost: 'لا يمكنك الإبلاغ عن منشورك الخاص.',
      reportDetailsTitle: 'تفاصيل البلاغ',
      reportDetailsPrompt: 'يرجى وصف سبب الإبلاغ عن هذا المنشور:',
      submit: 'إرسال',
      pleaseProvideReason: 'يرجى تقديم سبب للإبلاغ.',
      reportThankYou: 'شكراً لك على البلاغ. فريقنا سيراجع هذا المحتوى قريباً.',
      alreadyReportedDetailed: 'لقد أبلغت عن هذا المنشور بالفعل. شكراً لك لمساعدتك في الحفاظ على أمان مجتمعنا.',
      reportSubmissionFailed: 'فشل في إرسال البلاغ. يرجى المحاولة مرة أخرى لاحقاً.',
      hidePostConfirm: 'سيتم إخفاء هذا المنشور من موجزك. يمكنك إظهاره لاحقاً من الإعدادات.',
      hide: 'إخفاء',
      postHiddenSuccess: 'تم إخفاء هذا المنشور من موجزك.',
      hidePostFailed: 'فشل في إخفاء المنشور. يرجى المحاولة مرة أخرى.',
      cannotBlockSelf: 'لا يمكنك حظر نفسك.',
      blockConfirmMessage: 'هل أنت متأكد من أنك تريد حظر {{name}}؟ لن تشاهد منشوراتهم أو تتمكن من مراسلتهم.',
      block: 'حظر',
      userBlockedSuccess: 'تم حظر {{name}}. لن تشاهد منشوراتهم بعد الآن.',
      blockUserFailed: 'فشل في حظر المستخدم. يرجى المحاولة مرة أخرى.',
      whyReporting: 'لماذا تقوم بالإبلاغ عن هذا المنشور؟',
      reportAnonymous: 'بلاغك مجهول الهوية ويساعدنا في الحفاظ على أمان المجتمع.',
      describeIssue: 'يرجى وصف المشكلة:',
      describePlaceholder: 'اوصف سبب الإبلاغ عن هذا المنشور...',
      submitReport: 'إرسال البلاغ',
      whatHappensHide: 'ماذا يحدث عند إخفاء منشور:',
      postDisappears: 'يختفي المنشور من موجز الأخبار',
      authorNotNotified: 'لن يتم إخطار المؤلف',
      canUnhideSettings: 'يمكنك إظهاره لاحقاً في الإعدادات',
      canSeeReplies: 'لا يزال بإمكانك رؤية الردود إذا تم ذكرك',
      lookingSomethingElse: 'تبحث عن شيء آخر؟',
      considerReporting: 'إذا كان هذا المنشور ينتهك إرشادات مجتمعنا، ففكر في الإبلاغ عنه بدلاً من إخفائه فقط.',
      hideThisPost: 'إخفاء هذا المنشور؟',
      hideDescription: 'سيتم إخفاء هذا المنشور من موجز الأخبار. لن تراه عند تصفح المنشورات، ولكن يمكنك الوصول إليه مباشرة إذا تمت مشاركته معك.',
      blockThisUser: 'حظر هذا المستخدم؟',
      ifYouBlock: 'إذا قمت بحظر هذا المستخدم، فلن تتمكن من:',
      seeTheirPosts: 'رؤية منشوراتهم في موجز الأخبار',
      sendReceiveMessages: 'إرسال أو استقبال رسائل منهم',
      seeProfile: 'رؤية ملفهم الشخصي أو معلومات أعمالهم',
      getNotifications: 'تلقي إشعارات من أنشطتهم',
      noteBlock: 'ملاحظة: لن يتم إخطار {{name}} بأنك حظرته. يمكنك إلغاء حظره لاحقاً في إعداداتك.',
    },

    share: {
      title: 'مشاركة المنشور',
      searchPlaceholder: 'البحث عن أشخاص...',
      selected: 'محدد',
      send: 'إرسال',
      shareExternally: 'مشاركة خارجياً',
      success: 'تم مشاركة المنشور بنجاح',
      selectRecipients: 'حدد المستلمين للمشاركة معهم',
      noFollowers: 'لا توجد اتصالات للمشاركة معهم',
      sending: 'جاري الإرسال...',
      sharedPost: 'شارك منشوراً معك',
    },

    analytics: {
      analytics: 'التحليلات',
      overview: 'نظرة عامة',
      profileViews: 'مشاهدات الملف الشخصي',
      postEngagement: 'تفاعل المنشورات',
      followers: 'الاتصالات',
      reach: 'الوصول',
      impressions: 'الانطباعات',
      clicks: 'النقرات',
      saves: 'الحفظ',
      shares: 'المشاركات',
      comments: 'التعليقات',
      likes: 'الإعجابات',
      growthRate: 'معدل النمو',
      mostActiveFollowerTime: 'وقت نشاط الاتصالات الأكثر',
      recentActivity: 'النشاط الحديث',
      noDataYet: 'لا توجد بيانات متاحة بعد',
      lastDays: 'آخر 7 أيام',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      peakHours: 'ساعات الذروة',

    },

    ui: {
      search: 'بحث',
      searching: 'جاري البحث...',
      noResults: 'لا توجد نتائج',
      loading: 'جاري التحميل...',
      refresh: 'تحديث',
      pullToRefresh: 'اسحب للتحديث',
      endOfResults: 'نهاية النتائج',
      tryAgain: 'حاول مرة أخرى',
      somethingWentWrong: 'حدث خطأ ما',
      checkConnection: 'يرجى فحص اتصال الإنترنت',
      restartApp: 'يرجى إعادة تشغيل التطبيق',
      seeMore: 'رؤية المزيد',
      seeLess: 'رؤية أقل',
      showAll: 'إظهار الكل',
      collapse: 'طي',
      expand: 'توسيع',
      precise: 'دقيق',
      coordinates: 'الإحداثيات',
      manualEntry: 'إدخال يدوي',
      notSet: 'غير محدد',
    },

    time: {
      now: 'الآن',
      today: 'اليوم',
      yesterday: 'أمس',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      daysAgo: 'منذ {{count}} أيام',
      weeksAgo: 'منذ {{count}} أسابيع',
      monthsAgo: 'منذ {{count}} شهور',
      minutesAgo: 'منذ {{count}}د',
      hoursAgo: 'منذ {{count}}س',
      at: 'في',
      am: 'ص',
      pm: 'م',
    },

    errors: {
      networkError: 'خطأ في اتصال الشبكة',
      serverError: 'حدث خطأ في الخادم',
      unknownError: 'حدث خطأ غير معروف',
      tryAgainLater: 'يرجى المحاولة مرة أخرى لاحقاً',
      invalidInput: 'تم توفير إدخال غير صالح',
      fieldRequired: 'هذا الحقل مطلوب',
      emailInvalid: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      passwordTooShort: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      fileTooLarge: 'حجم الملف كبير جداً',
      unsupportedFormat: 'تنسيق ملف غير مدعوم',
      uploadFailed: 'فشل في رفع الملف',
      permissionDenied: 'تم رفض الإذن',
      locationDisabled: 'خدمات الموقع معطلة',
      cameraUnavailable: 'الكاميرا غير متاحة',
      validationError: 'خطأ في التحقق',
      userNameRequired: 'اسم المستخدم مطلوب.',
      yourNameRequired: 'اسمك مطلوب.',
      displayNameRequired: 'اسم العرض مطلوب.',
      businessNameRequiredBusiness: 'اسم العمل مطلوب للحسابات التجارية.',
      bioRequired: 'السيرة الذاتية مطلوبة.',
      selectIndustry: 'يرجى اختيار صناعة.',
      selectCategory: 'يرجى اختيار فئة.',
      emailRequiredIndividual: 'البريد الإلكتروني مطلوب للحسابات الفردية.',
      validWebsiteRequired: 'يرجى إدخال رابط موقع صالح.',
      permissionRequired: 'إذن مطلوب',
      grantPhotoPermission: 'يرجى منح إذن للوصول إلى صورك.',
      imageUploadSuccess: 'تم رفع الصورة بنجاح!',
      locationPermissionNeeded: 'إذن الموقع مطلوب للحصول على موقعك الحالي.',
      callNotAvailable: 'المكالمة غير متاحة',
      callingNotAvailable: 'المكالمات غير متاحة على هذا الجهاز.',
      copyNumber: 'نسخ الرقم',
      phoneNumber: 'رقم الهاتف',
      unableToMakeCall: 'لا يمكن إجراء مكالمة هاتفية.',
      navigationError: 'خطأ في التنقل',
      unableToNavigate: 'لا يمكن التنقل.',
      addressRequired: 'عنوان النشاط التجاري مطلوب.',
      completeProfileFirst: 'أكمل ملفك الشخصي',
      completeProfileMessage: 'يجب عليك ملء جميع الحقول المطلوبة قبل الوصول إلى التطبيق.',
    },

  // Newsletter
  newsletter: {
    // Opt-in Modal
    title: 'ابق على اتصال',
    subtitle: 'اشترك في نشرتنا الإخبارية لتلقي تحديثات مخصصة حول صناعة القنب.',
    features: {
      personalized: 'محتوى مخصص',
      personalizedDesc: 'تحديثات مصممة وفقًا لاهتماماتك وموقعك',
      monthly: 'ملخص شهري',
      monthlyDesc: 'بريد واحد شهريًا، بدون إزعاج',
      unsubscribe: 'إلغاء اشتراك سهل',
      unsubscribeDesc: 'ألغِ اشتراكك في أي وقت بنقرة واحدة',
    },
    subscribe: 'اشترك الآن',
    maybeLater: 'ربما لاحقًا',
    stayConnected: 'ابق على اتصال مع شبكتك',
    getPersonalized: 'احصل على تحديثات شهرية مخصصة مباشرة في بريدك الوارد.',
    featurePosts: 'منشورات جديدة من اهتماماتك',
    featureBusinesses: 'أعمال في منطقتك',
    featureProducts: 'منتجات وخدمات',
    featureCommunity: 'أبرز أخبار المجتمع',
    sentMonthly: 'يُرسل مرة واحدة شهريًا في اليوم الأول',
    maybeNextTime: 'ربما في المرة القادمة',
    canSubscribeLater: 'يمكنك الاشتراك لاحقًا من الإعدادات',

    // Preferences Flow
    selectIndustries: 'اختر الصناعات',
    industriesDesc: 'اختر الصناعات التي تريد معرفتها. اختر حتى 5.',
    selectSectors: 'اختر القطاعات',
    sectorsDesc: 'اختر قطاعات محددة ضمن الصناعات المختارة.',
    selectLocations: 'اختر المواقع',
    locationsDesc: 'اختر المناطق الجغرافية لتلقي المحتوى منها.',
    selectProfileTypes: 'اختر أنواع الملفات الشخصية',
    profileTypesDesc: 'اختر أنواع الملفات الشخصية التي تريد رؤية محتواها.',
    profileTypeIndividual: 'أفراد',
    profileTypeBusiness: 'شركات',
    selectContentTypes: 'اختر أنواع المحتوى',
    contentTypesDesc: 'اختر نوع المحتوى الذي تريد تلقيه.',
    contentTypePosts: 'منشورات وتحديثات',
    contentTypeMedia: 'صور وفيديوهات',
    contentTypeProducts: 'منتجات',
    contentTypeServices: 'خدمات',
    addInterests: 'أضف اهتمامات شخصية',
    interestsDesc: 'أضف مواضيع أو كلمات مفتاحية محددة تهمك. (اختياري)',
    interestPlaceholder: 'اكتب اهتمامًا...',
    noInterestsYet: 'لم تتم إضافة اهتمامات بعد. هذه الخطوة اختيارية.',
    suggestedInterests: 'اقتراحات',

    // Location
    addMyLocation: 'أضف موقعي',
    addLocation: 'أضف موقعًا',
    enterLocation: 'أدخل المدينة أو الولاية أو البلد',
    searchCity: 'ابحث عن مدينة...',
    searchLocation: 'ابحث بالعنوان أو المدينة أو الرمز البريدي...',
    locationsAdded: 'مواقع مضافة',
    noLocationSet: 'لم يتم تعيين موقع. سيتم تضمين المحتوى من جميع المواقع.',
    receiveFrom: 'استلام من:',
    city: 'مدينة',
    state: 'ولاية',
    country: 'بلد',

    // Selection
    selected: 'مختار',
    sectorsSelected: 'قطاعات مختارة',
    noIndustriesSelected: 'يرجى اختيار الصناعات أولاً',

    // Validation
    selectAtLeastOneIndustry: 'يرجى اختيار صناعة واحدة على الأقل',
    selectAtLeastOneSector: 'يرجى اختيار قطاع واحد على الأقل',
    selectAtLeastOneLocation: 'يرجى اختيار موقع واحد على الأقل',
    selectAtLeastOneProfileType: 'يرجى اختيار نوع ملف شخصي واحد على الأقل',
    selectAtLeastOneContentType: 'يرجى اختيار نوع محتوى واحد على الأقل',
    selectAtLeastOneInterest: 'يرجى إضافة اهتمام واحد على الأقل',

    // Consent
    consentTitle: 'الموافقة القانونية',
    consentText: `بالاشتراك في نشرة CultivaNetwork الإخبارية، فإنك توافق على ما يلي:

الاتصالات عبر البريد الإلكتروني
أوافق على تلقي رسائل البريد الإلكتروني الشهرية من نشرة CultivaNetwork على عنوان البريد الإلكتروني المرتبط بحسابي. ستحتوي هذه الرسائل على محتوى مخصص بناءً على تفضيلاتي المختارة.

استخدام البيانات
أفهم أن CultivaNetwork ستستخدم اختياراتي للتفضيلات لتنسيق وتخصيص محتوى النشرة الإخبارية. سيتم تخزين تفضيلاتي وعنوان بريدي الإلكتروني بشكل آمن واستخدامها فقط لتقديم محتوى النشرة الإخبارية ذي الصلة.

المشاركة مع أطراف ثالثة
لن يتم بيع أو تأجير أو مشاركة عنوان بريدي الإلكتروني وتفضيلاتي مع أطراف ثالثة لأغراض التسويق.

إلغاء الاشتراك
يمكنني إلغاء الاشتراك في أي وقت بالنقر على رابط "إلغاء الاشتراك" في أي بريد إلكتروني للنشرة الإخبارية أو من خلال إعدادات التطبيق.

الاحتفاظ بالبيانات
سيتم الاحتفاظ ببيانات اشتراكي حتى ألغي اشتراكي أو أحذف حسابي.

الامتثال
تمتثل هذه النشرة الإخبارية للوائح التسويق عبر البريد الإلكتروني المعمول بها بما في ذلك متطلبات قانون CAN-SPAM.`,
    agreeToReceive: 'أوافق على تلقي النشرة الإخبارية الشهرية من CultivaNetwork وأقبل الشروط المذكورة أعلاه.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',

    // Navigation
    skip: 'تخطي',
    continue: 'متابعة',
    completeSubscription: 'إكمال الاشتراك',
    savePreferences: 'حفظ التفضيلات',

    // Settings
    settings: 'إعدادات النشرة الإخبارية',
    settingsTitle: 'النشرة الإخبارية',
    subscribedTitle: 'مشترك في النشرة الإخبارية',
    subscribed: 'مشترك',
    notSubscribed: 'غير مشترك',
    inactive: 'غير نشط',
    subscribedSince: 'مشترك منذ',
    lastEmailSent: 'آخر بريد تم إرساله',
    editPreferences: 'تعديل التفضيلات',
    manageSubscription: 'إدارة الاشتراك',
    unsubscribeConfirm: 'إلغاء الاشتراك',
    unsubscribeConfirmMessage: 'هل أنت متأكد أنك تريد إلغاء الاشتراك من النشرة الإخبارية؟',
    resubscribe: 'إعادة الاشتراك',
    subscribeNow: 'اشترك الآن',
    subscriptionUpdated: 'تم تحديث الاشتراك',
    preferencesUpdated: 'تم تحديث التفضيلات بنجاح',
    never: 'أبدًا',
    unsubscribeTitle: 'إلغاء الاشتراك',
    unsubscribe: 'إلغاء الاشتراك',
    unsubscribedTitle: 'تم إلغاء الاشتراك',
    unsubscribedMessage: 'تم إلغاء اشتراكك من النشرة الإخبارية.',
    unsubscribeError: 'فشل في إلغاء الاشتراك. يرجى المحاولة مرة أخرى.',
    resubscribedTitle: 'تم تجديد الاشتراك',
    resubscribedMessage: 'مرحبًا بعودتك! ستتلقى النشرة الإخبارية القادمة.',
    resubscribeError: 'فشل في تجديد الاشتراك. يرجى المحاولة مرة أخرى.',
    preferencesUpdatedTitle: 'تم تحديث التفضيلات',
    preferencesUpdatedMessage: 'تم حفظ تفضيلات النشرة الإخبارية الخاصة بك.',
    subscribedMessage: 'ستتلقى أول نشرة إخبارية في اليوم الأول من الشهر القادم.',
    saveError: 'فشل في الحفظ. يرجى المحاولة مرة أخرى.',
    active: 'نشط',
    lastSent: 'آخر إرسال:',
    frequency: 'شهريًا (اليوم الأول من كل شهر)',
    yourPreferences: 'تفضيلاتك:',
    noPreferences: 'لم يتم تعيين تفضيلات',

    // Summary
    industries: 'الصناعات',
    sectors: 'القطاعات',
    locations: 'المواقع',
    profileTypes: 'أنواع الملفات الشخصية',
    contentTypes: 'أنواع المحتوى',
    allLocations: 'جميع المواقع',
  },

  // Common
  common: {
    cancel: 'إلغاء',
    save: 'حفظ',
    error: 'خطأ',
  },

  // Industries
  industries: {
    agriculture: 'الزراعة',
    automotive: 'السيارات',
    construction: 'البناء',
    creativeMedia: 'الإبداع والإعلام',
    educationTraining: 'التعليم والتدريب',
    energyEnvironment: 'الطاقة والبيئة',
    foodBeverage: 'خدمات الأغذية والمشروبات',
    healthcareWellness: 'الرعاية الصحية والعافية',
    manufacturingIndustrial: 'التصنيع والصناعة',
    professionalFinancial: 'الخدمات المهنية والمالية',
    propertyMaintenance: 'صيانة العقارات',
    retailConsumer: 'التجزئة والسلع الاستهلاكية',
    technologyDigital: 'التكنولوجيا والرقمية',
    transportationLogistics: 'النقل والخدمات اللوجستية',
    travel: 'السفر',
    governmentPublicServices: 'الحكومة والخدمات العامة',
    venue: 'مكان',
  },

  // Sectors
  sectors: {
    // Agriculture
    farming: 'الزراعة',
    agriculturalEquipment: 'المعدات الزراعية',
    cropNutrition: 'تغذية المحاصيل',
    cropProtection: 'حماية المحاصيل',
    irrigation: 'الري',
    livestockFeed: 'علف الماشية',
    organicAgriculture: 'الزراعة العضوية',
    seedDevelopment: 'تطوير البذور',
    agriculturalTechnology: 'التكنولوجيا الزراعية',
    landManagement: 'إدارة الأراضي',
    animalHusbandry: 'تربية الحيوانات',
    agriculturalConsulting: 'الاستشارات الزراعية',
    soilManagement: 'إدارة التربة',
    harvestingServices: 'خدمات الحصاد',
    // Creative & Media
    photography: 'التصوير الفوتوغرافي',
    videography: 'تصوير الفيديو',
    graphicDesign: 'التصميم الجرافيكي',
    contentCreation: 'إنشاء المحتوى',
    socialMediaManagement: 'إدارة وسائل التواصل الاجتماعي',
    marketing: 'التسويق',
    advertising: 'الإعلان',
    branding: 'العلامات التجارية',
    eventPlanning: 'تخطيط الفعاليات',
    musicProduction: 'الإنتاج الموسيقي',
    filmProduction: 'الإنتاج السينمائي',
    webDesign: 'تصميم المواقع',
    illustration: 'الرسم التوضيحي',
    animation: 'الرسوم المتحركة',
    publishing: 'النشر',
    publicRelations: 'العلاقات العامة',
    // Education & Training
    k12Education: 'التعليم من الروضة حتى الثانوية',
    higherEducation: 'التعليم العالي',
    vocationalTraining: 'التدريب المهني',
    onlineCourses: 'الدورات عبر الإنترنت',
    tutoring: 'الدروس الخصوصية',
    educationalTechnology: 'تكنولوجيا التعليم',
    corporateTraining: 'التدريب المؤسسي',
    languageEducation: 'تعليم اللغات',
    testPreparation: 'التحضير للاختبارات',
    specialEducation: 'التعليم الخاص',
    earlyChildhoodEducation: 'تعليم الطفولة المبكرة',
    // Energy & Environment
    solarEnergy: 'الطاقة الشمسية',
    windEnergy: 'طاقة الرياح',
    hydroelectric: 'الطاقة الكهرومائية',
    biofuels: 'الوقود الحيوي',
    environmentalConsulting: 'الاستشارات البيئية',
    wasteManagement: 'إدارة النفايات',
    recycling: 'إعادة التدوير',
    carbonManagement: 'إدارة الكربون',
    energyEfficiency: 'كفاءة الطاقة',
    sustainableDesign: 'التصميم المستدام',
    // Food & Beverage Services
    restaurants: 'المطاعم',
    catering: 'خدمات الطعام',
    foodProduction: 'إنتاج الغذاء',
    beverageManufacturing: 'تصنيع المشروبات',
    foodDistribution: 'توزيع الأغذية',
    specialtyFoods: 'الأطعمة المتخصصة',
    organicFoods: 'الأطعمة العضوية',
    foodTechnology: 'تكنولوجيا الغذاء',
    farmToTable: 'من المزرعة إلى المائدة',
    foodSafetyConsulting: 'استشارات سلامة الغذاء',
    bakery: 'المخابز',
    brewery: 'مصانع الجعة',
    // Healthcare & Wellness
    medicalPractice: 'الممارسة الطبية',
    dentalCare: 'رعاية الأسنان',
    mentalHealth: 'الصحة النفسية',
    physicalTherapy: 'العلاج الطبيعي',
    alternativeMedicine: 'الطب البديل',
    nutritionConsulting: 'استشارات التغذية',
    fitnessTraining: 'التدريب البدني',
    spaServices: 'خدمات السبا',
    seniorCare: 'رعاية كبار السن',
    homeHealthcare: 'الرعاية الصحية المنزلية',
    medicalEquipment: 'المعدات الطبية',
    pharmaceuticals: 'الأدوية',
    veterinaryServices: 'الخدمات البيطرية',
    // Manufacturing & Industrial
    heavyMachinery: 'الآلات الثقيلة',
    electronicsManufacturing: 'تصنيع الإلكترونيات',
    textiles: 'المنسوجات',
    plastics: 'البلاستيك',
    metalFabrication: 'تصنيع المعادن',
    automotiveParts: 'قطع غيار السيارات',
    packaging: 'التعبئة والتغليف',
    chemicalProduction: 'الإنتاج الكيميائي',
    industrialEquipment: 'المعدات الصناعية',
    qualityControl: 'مراقبة الجودة',
    processEngineering: 'هندسة العمليات',
    // Professional & Financial Services
    accounting: 'المحاسبة',
    legalServices: 'الخدمات القانونية',
    financialPlanning: 'التخطيط المالي',
    insurance: 'التأمين',
    realEstate: 'العقارات',
    businessConsulting: 'استشارات الأعمال',
    humanResources: 'الموارد البشرية',
    itServices: 'خدمات تكنولوجيا المعلومات',
    taxPreparation: 'إعداد الضرائب',
    investmentManagement: 'إدارة الاستثمارات',
    banking: 'الخدمات المصرفية',
    auditing: 'التدقيق',
    // Property Maintenance
    autoDetailing: 'تنظيف السيارات',
    electrical: 'الكهرباء',
    handyMan: 'عامل الصيانة',
    hvac: 'التدفئة والتبريد',
    landscaping: 'تنسيق الحدائق',
    lawnCare: 'العناية بالعشب',
    pressureWashing: 'الغسيل بالضغط',
    wasteRemoval: 'إزالة النفايات',
    // Retail & Consumer Goods
    ecommerce: 'التجارة الإلكترونية',
    brickMortarRetail: 'التجزئة التقليدية',
    wholesale: 'تجارة الجملة',
    consumerElectronics: 'الإلكترونيات الاستهلاكية',
    apparel: 'الملابس',
    homeGoods: 'السلع المنزلية',
    sportingGoods: 'السلع الرياضية',
    beautyProducts: 'منتجات التجميل',
    jewelry: 'المجوهرات',
    petProducts: 'منتجات الحيوانات الأليفة',
    toysGames: 'الألعاب',
    furniture: 'الأثاث',
    carAudio: 'صوتيات السيارات',
    carWash: 'غسيل السيارات',
    // Technology & Digital
    softwareDevelopment: 'تطوير البرمجيات',
    mobileApps: 'تطبيقات الجوال',
    cloudServices: 'الخدمات السحابية',
    cybersecurity: 'الأمن السيبراني',
    aiMachineLearning: 'الذكاء الاصطناعي والتعلم الآلي',
    dataAnalytics: 'تحليل البيانات',
    iotSolutions: 'حلول إنترنت الأشياء',
    blockchain: 'البلوكتشين',
    webDevelopment: 'تطوير الويب',
    itConsulting: 'استشارات تكنولوجيا المعلومات',
    techSupport: 'الدعم التقني',
    saasProducts: 'منتجات SaaS',
    // Transportation & Logistics
    freightShipping: 'شحن البضائع',
    trucking: 'النقل بالشاحنات',
    warehousing: 'التخزين',
    lastMileDelivery: 'توصيل الميل الأخير',
    fleetManagement: 'إدارة الأسطول',
    supplyChain: 'سلسلة التوريد',
    courierServices: 'خدمات البريد السريع',
    aviation: 'الطيران',
    maritimeShipping: 'الشحن البحري',
    railTransport: 'النقل بالسكك الحديدية',
    movingServices: 'خدمات النقل',
    // Travel
    hotelsLodging: 'الفنادق والإقامة',
    tourOperations: 'العمليات السياحية',
    travelAgency: 'وكالة السفر',
    vacationRentals: 'إيجارات العطلات',
    adventureTravel: 'سفر المغامرات',
    ecoTourism: 'السياحة البيئية',
    businessTravel: 'سفر الأعمال',
    cruiseLines: 'خطوط الرحلات البحرية',
    transportationServices: 'خدمات النقل',
    travelTechnology: 'تكنولوجيا السفر',
    destinationManagement: 'إدارة الوجهات',
    // Venue
    ballroom: 'قاعة رقص',
    conventionCenter: 'مركز مؤتمرات',
    eventHall: 'قاعة فعاليات',
    privateVenue: 'مكان خاص',
    stadium: 'ملعب',
  },
},

  zh: {
    app: {
      name: '栽培测试',
      loading: '正在加载...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      back: '返回',
      next: '下一个',
      done: '完成',
      ok: '确定',
      yes: '是',
      no: '否',
      authRequired: '需要身份验证',
    },

    tabs: {
      home: '首页',
      scan: '扫描',
      manage: '管理',
      events: '活动',
      profile: '个人资料',
    },
    events: {
      title: '活动',
      allEvents: '所有活动',
      following: '人脉',
      myEvents: '已保存的活动',
      createEvent: '创建活动',
      eventTitle: '活动标题',
      description: '描述',
      importantDetails: '重要详情',
      startDate: '开始日期和时间',
      endDate: '结束日期和时间',
      industry: '行业',
      sector: '部门',
      location: '地点',
      save: '保存活动',
      cancel: '取消',
      delete: '删除活动',
      deleteConfirm: '确定要删除此活动吗？',
      deleteSuccess: '活动已成功删除',
      addToMyEvents: '添加到我的活动',
      removeFromMyEvents: '从我的活动中移除',
      addedToMyEvents: '活动已添加到您的列表',
      removedFromMyEvents: '活动已从您的列表中移除',
      visible: '可见',
      hidden: '隐藏',
      toggleVisibility: '切换可见性',
      noEvents: '未找到活动',
      noEventsForDate: '此日期没有活动',
      noFollowingEvents: '您的人脉没有活动',
      noMyEvents: '您还没有添加任何活动',
      bookmarked: '已收藏',
      rsvpd: '已报名',
      noBookmarkedEvents: '没有收藏的活动',
      noRsvpdEvents: '没有报名的活动',
      loadingEvents: '正在加载活动...',
      eventDetail: '活动详情',
      postedBy: '发布者',
      attendees: '参与者',
      host: '主办方',
      today: '今天',
      searchEvents: '搜索活动...',
      filterByIndustry: '按行业筛选',
      filterBySector: '按部门筛选',
      filterByTimeRange: '时间范围',
      timeRange_day: '日',
      timeRange_week: '周',
      timeRange_month: '月',
      timeRange_year: '年',
      filterByDate: '按日期筛选',
      filterByLocation: '按地点筛选',
      nearMe: '附近',
      searchCityOrZip: '搜索城市或邮编...',
      gettingLocation: '正在获取位置...',
      locationPermissionDenied: '位置权限被拒绝',
      allIndustries: '所有行业',
      allSectors: '所有部门',
      allCities: '所有城市',
      filterByCity: '按城市筛选',
      clearFilters: '清除筛选',
      titleRequired: '活动标题为必填项',
      endDateAfterStart: '结束日期必须晚于开始日期',
      descriptionRequired: '描述为必填项',
      eventCreated: '活动创建成功',
      eventCreateError: '创建活动失败',
      editEvent: '编辑活动',
      eventUpdated: '活动更新成功',
      eventUpdateError: '更新活动失败',
      signInToCreate: '登录以创建活动',
      signInToAdd: '登录以添加活动',
      confirmDelete: '删除活动',
      tagPeople: '标记人员',
      tagCompanies: '标记公司',
      searchPeople: '搜索人员...',
      searchCompanies: '搜索公司...',
      taggedPeople: '参与人员',
      taggedCompanies: '参与公司',
      myCreatedEvents: '我的活动',
      noCreatedEvents: '您还没有创建任何活动',
      monthNames: '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
      dayNames: '日,一,二,三,四,五,六',
      shareEvent: '分享活动',
      eventShared: '活动已分享！',
      rsvp: '确认参加',
      attending: '参加中',
      rsvpSuccess: '您现在正在参加此活动！',
      createPostFromEvent: '创建帖子',
      viewEvent: '查看活动',
      sharedAnEvent: '分享了一个活动',
      coverImage: '封面图片',
      addCoverImage: '添加封面图片',
      postCreated: '已从活动创建帖子！',
      postCreateError: '创建帖子失败。',
    },
notifications: {
  notifications: '通知',
  all: '全部',
  posts: '帖子',
  stories: '故事',
  follows: '待处理',
  network: '人脉',
  pending: '待处理',
  connections: '连接',
  incoming: '收到的',
  outgoing: '发出的',
  cancelRequest: '取消',
  requestSent: '已发送连接请求',
  noNetworkActivity: '还没有连接',
  noIncomingRequests: '没有收到的请求',
  noOutgoingRequests: '没有发出的请求',
  messages: '消息',
  markAllRead: '全部标记为已读',
  markRead: '标记为已读',
  markUnread: '标记为未读',
  actions: '通知操作',
  chooseAction: '选择此通知的操作',
  deleteConfirm: '删除通知',
  deleteConfirmMessage: '您确定要删除此通知吗？',
  allMarkedRead: '所有通知已标记为已读',
  noNotifications: '还没有通知',
  noNotificationsSubtext: '当有人与您的内容互动时，您将在此处看到通知',
  noConversations: '还没有对话',
  recentConversations: '最近的对话',
  liked: '点赞了您的帖子',
  commented: '评论了您的帖子',
  shared: '分享了您的帖子',
  followed: '与您建立了联系',
  viewedStory: '查看了您的故事',
  sentMessage: '给您发送了消息'
},
consent: {
  // Age Verification
  ageVerification: '年龄验证',
  ageVerificationDesc: '我们需要验证您的年龄以遵守 COPPA（儿童在线隐私保护法）。',
  over13: '我13岁或以上',
  under13: '我不满13岁',
  ageRestriction: '年龄限制',
  mustBe13: '您必须至少年满13岁才能使用此应用程序。感谢您的理解。',
  coppaNotice: 'COPPA 要求进行此验证以保护儿童隐私。',
  confirmAge: '我确认我已年满13岁',
  
  // Region Selection
  yourLocation: '您的位置',
  locationDesc: '不同的隐私法律根据您的位置而适用。请选择您的地区：',
  europeanUnion: '欧盟',
  unitedStates: '美国',
  otherRegion: '其他地区',
  applies: '适用',
  mayApply: '可能适用',
  standardPrivacy: '标准隐私保护',
  californiaQuestion: '加州居民？',
  californiaQuestionDesc: '您是加州居民吗？CCPA 隐私权可能适用于您。',
  
  // Consent Form
  privacyConsent: '隐私和同意',
  privacyChoices: '您的隐私选择',
  gdprDesc: '根据 GDPR，我们需要您的明确同意来处理您的数据。您可以随时在设置中更改这些偏好。',
  ccpaDesc: '根据 CCPA，您有权选择退出数据销售并了解您的数据如何使用。在下面选择您的偏好。',
  standardDesc: '我们尊重您的隐私。选择您感到舒适的数据处理活动。您可以随时更改这些设置。',
  essentialNotice: '基本服务（身份验证、安全、基本应用功能）始终处于活动状态，无法禁用。',
  dataProcessingPreferences: '数据处理偏好',
  customizeExperience: '通过选择您想与我们分享的数据来自定义您的体验。',
  essential: '必需',
  
  // Consent Options
  required: '必需',
  essentialDesc: '应用正常运行所必需。这无法禁用。',
  analytics: '分析',
  analyticsDesc: '通过共享匿名使用数据帮助我们改进应用',
  analyticsData: '应用使用情况、使用的功能、花费的时间',
  crashReports: '崩溃报告',
  crashReportsDesc: '自动发送崩溃报告以帮助我们修复错误',
  crashData: '设备信息、崩溃日志、应用版本',
  performance: '性能监控',
  performanceDesc: '监控应用性能以识别和修复减速',
  performanceData: '加载时间、网络速度、设备性能',
  marketing: '营销通讯',
  marketingDesc: '接收个性化内容、优惠和产品更新',
  marketingData: '兴趣、偏好、参与历史',
  dataCollected: '收集的数据',
  tracking: '跟踪和广告',
  trackingDesc: '允许我们跟踪您在应用中的活动以进行个性化广告',
  personalization: '个性化',
  personalizationDesc: '根据您的兴趣个性化您的动态和推荐',
  
  // Actions
  acceptAll: '全部接受',
  rejectNonEssential: '拒绝非必要',
  rejectAll: '全部拒绝（仅必需）',
  savePreferences: '保存我的偏好',
  readPrivacyPolicy: '阅读完整隐私政策',
  privacyPolicy: '隐私政策',
  privacyPolicyDesc: '了解我们如何收集、使用和保护您的数据', // ✅ NEW
  privacyPolicyFull: '您的完整隐私政策文本在这里。',
  acceptSelected: '接受选中项',
  declineAll: '全部拒绝',
  
  // Legal Documents
  legalDocuments: '法律文件',
  legalDocumentsDesc: '查看我们的隐私政策和服务条款', // ✅ NEW
  termsOfService: '服务条款',
  termsDesc: '阅读使用我们应用的条款和条件', // ✅ NEW
  byAccepting: '继续即表示您同意我们的隐私政策和服务条款。',

  // Rights
  gdprRights: '根据 GDPR，您有权访问、纠正、删除、限制处理、数据可移植性和反对处理。联系我们以行使您的权利。',
  ccpaRights: '根据 CCPA，您有权了解收集了哪些个人信息、请求删除并选择退出销售。您不会因行使这些权利而受到歧视。',
  standardRights: '您有权访问和删除您的个人数据。您可以随时在应用中管理您的隐私设置。',
  yourRights: '您的数据权利',
  gdprRightsDesc: '根据 GDPR，您有权访问、导出和删除您的个人数据。',
  ccpaRightsDesc: '根据 CCPA，您有权知道我们收集了哪些数据并请求删除。',
  standardRightsDesc: '您有权访问和删除您的个人数据。',
  rightsDescription: '您可以随时在设置中更改这些偏好。您也有权访问、导出或删除您的数据。',
  
  // Messages
  errorSaving: '保存您的同意偏好失败。请重试。',
  
  // Status
  consentStatus: '同意状态',
  consentGiven: '已同意',
  consentDate: '同意日期',
  region: '地区',
  
  // Data Processing
  dataProcessing: '数据处理同意',
  dataProcessingDesc: '控制您的数据使用方式',
  active: '活跃',
  inactive: '未活跃',
  
  // User Rights
  exportData: '导出您的数据',
  exportDataShort: '以 JSON 格式下载所有数据',
  deleteAllData: '删除账户',
  deleteAllDataShort: '永久删除所有数据（30天宽限期）',
  
  // CCPA
  ccpaOptions: '加州隐私权 (CCPA)',
  doNotSell: '不要出售我的数据',
  doNotSellDesc: '根据 CCPA 要求选择退出数据销售',
  
  // Revoke
  revokeAll: '撤销所有同意',
  revokeAllConfirm: '您确定要撤销所有同意吗？这将禁用所有数据处理功能。',
  revokeAllNote: '这将把所有同意设置为未活跃。您可以随时重新启用。',
  allConsentRevoked: '所有同意已被撤销。',
  
  // Messages
  consentEnabled: '同意已启用',
  consentDisabled: '同意已禁用',
  updateFailed: '更新同意失败',
  requestReceived: '请求已收到',
  revokeFailed: '撤销同意失败',
  
  // Info
  whyThisMatters: '为什么这很重要',
  whyThisMattersDesc: '我们尊重您的隐私。这些控制让您了解数据的使用方式并做出选择。您可以随时更改这些设置。',
  
  // Additional
  welcomeTitle: '欢迎来到CultivaNetwork',
  introTitle: '欢迎来到CultivaNetwork',
  introText: 'CultivaNetwork收集基本信息——如您的姓名、个人资料和应用内的活动——仅用于提供和改善您的体验。我们不会跨其他应用或网站追踪您。',
  continue: '继续',
  dataWeCollect: '我们收集的信息',
  disclosureProfile: '您的个人资料信息（姓名、照片、简介）',
  disclosureUsage: '您的应用使用方式以改进功能',
  disclosureCrash: '崩溃报告以帮助我们修复错误',
  settingsDataSummary: '我们仅收集运行应用所需的信息。我们不会跨其他应用或网站追踪您。',
  profileDataDesc: '您提供的姓名、照片、简介和联系方式',
  usageDataDesc: '您的应用使用方式，以帮助我们改进功能',
  crashDataDesc: '崩溃报告和错误日志，以帮助我们修复问题',
  noTracking: '无跨应用追踪',
  noTrackingDesc: '我们不会跨其他应用或网站追踪您，也不会与第三方共享您的数据用于广告。',
},
    auth: {
      signin: '登录',
      signup: '注册',
      signout: '退出',
      email: '邮箱',
      password: '密码',
      forgotPassword: '忘记密码？',
      createAccount: '创建账户',
      alreadyHaveAccount: '已有账户？',
      dontHaveAccount: '还没有账户？',
      emailRequired: '请输入邮箱',
      passwordRequired: '请输入密码',
      invalidEmail: '请输入有效的邮箱地址',
      weakPassword: '密码至少需要6个字符',
      userNotFound: '未找到此邮箱的账户',
      wrongPassword: '密码错误',
      emailAlreadyInUse: '此邮箱已被使用',
      tooManyRequests: '尝试次数过多，请稍后再试',
      networkError: '网络错误，请检查网络连接',
    },
    displayName: {
      validation: {
        required: '显示名称为必填项',
        reserved: '此名称已被保留，无法使用',
        currentName: '这是您当前的显示名称',
        taken: '此用户名已被使用',
        temporarilyReserved: '此用户名暂时被保留',
        available: '用户名可用！',
        checkError: '无法检查可用性。请重试。',
        tooShort: '用户名必须至少3个字符',
        tooLong: '用户名必须少于30个字符',
        invalidCharacters: '用户名只能包含字母、数字、空格、下划线和连字符',
        invalidFormat: '用户名格式无效',
      },
      console: {
        savingToPermanent: '💾 保存到永久用户名数据库:',
        successfullySaved: '✅ 成功保存到永久数据库:',
        documentCreated: '📊 在saved_usernames集合中创建了文档，ID为:',
        errorSaving: '❌ 保存到永久数据库时出错:',
        incrementedCounter: '📈 已占用用户名尝试计数器增加:',
        cannotIncrementCounter: '⚠️ 无法增加计数器 - 在saved_usernames中未找到用户名:',
        errorIncrementingCounter: '❌ 增加尝试计数器时出错:',
        handlingUsernameChange: '🔄 处理用户名更改:',
        usernameChangeCompleted: '✅ 用户名更改成功完成',
        failedToSaveNewUsername: '❌ 更改期间保存新用户名失败',
        errorHandlingUsernameChange: '❌ 处理用户名更改时出错:',
        deletedOldUsername: '🗑️ 从永久数据库中删除了旧用户名:',
        cannotDeleteUsername: '❌ 无法删除用户名 - 属于不同用户:',
        usernameNotFound: 'ℹ️ 数据库中未找到用户名（已删除？）:',
        errorDeletingFromPermanent: '❌ 从永久数据库删除时出错:',
        fetchingAllSavedUsernames: '📊 从数据库获取所有保存的用户名...',
        unknown: '未知',
        foundSavedUsernames: '✅ 在数据库中找到了{{count}}个保存的用户名',
        errorGettingSavedUsernames: '❌ 获取保存的用户名时出错:',
        totalSavedUsernames: '📊 数据库中保存的用户名总数: {{count}}',
        errorCountingSavedUsernames: '❌ 计算保存的用户名时出错:',
        usernameDeactivated: '✅ 用户名已停用:',
        unauthorizedDeactivation: '❌ 未授权：用户无法停用此用户名',
        cleanupCompleted: '清理了{{count}}个过期的尝试文档',
        exampleUsage: {
          title: '如何使用保存的用户名数据库:',
          saveUsername: '当用户在您的应用中成功保存用户名时:',
          seeAllSaved: '查看所有保存的用户名:',
          getCount: '获取计数:',
          testDatabase: '测试数据库:',
          collectionContains: 'saved_usernames集合将包含:',
          documentId: '文档ID: 小写用户名',
          usernameField: 'username: 原始大小写',
          userIdField: 'userId: 保存者',
          userEmailField: 'userEmail: 用户邮箱',
          savedAtField: 'savedAt: 时间戳',
          isActiveField: 'isActive: 真/假',
          sourceField: 'source: 保存来源',
        },
      },
    },
categories: {
  // Existing
  agriculture: '农业',
  automotive: '汽车',
  construction: '建筑',
  technology: '技术',
  foodBeverage: '食品饮料',
  retail: '零售',
  services: '服务',
  healthcare: '医疗',
  education: '教育',
  finance: '金融',
  realEstate: '房地产',
  manufacturing: '制造业',
  transportation: '交通运输',
  entertainment: '娱乐',
  consulting: '咨询',
  
  // New
  creativeMedia: '创意与媒体',
  educationTraining: '教育与培训',
  energyEnvironment: '能源与环境',
  foodBeverageServices: '食品饮料服务',
  healthcareWellness: '医疗保健与健康',
  manufacturingIndustrial: '制造与工业',
  professionalFinancial: '专业与金融服务',
  propertyMaintenance: '物业维护',
  retailConsumer: '零售与消费品',
  technologyDigital: '科技与数字',
  transportationLogistics: '运输与物流',
  travel: '旅游',
  governmentPublicServices: '政府与公共服务',
  venue: '场馆',
},

specialties: {
  // Existing
  organicFarming: '有机农业',
  cropManagement: '作物管理',
  livestock: '畜牧业',
  pestControl: '病虫害防治',
  soilManagement: '土壤管理',
  irrigation: '灌溉',
  harvesting: '收获',
  seedSupply: '种子供应',
  fertilizers: '肥料',
  equipmentRental: '设备租赁',
  consulting: '咨询',
  realEstate: '房地产',
rawMaterials: '原材料',
supplies: '用品',
manager: '经理',
automotive: '汽车',
  
  // Agriculture
  agriculturalEquipment: '农业设备',
  agriculturalEquipmentRetail: '农业设备零售',
  agriculturalServices: '农业服务',
  agriculturalSupply: '农业供应',
  cropNutritionProtection: '作物营养/保护',
  farming: '农业',
  farmLabor: '农场劳动',
  farmManagement: '农场管理',
  farmSupply: '农场供应',
  fertilizer: '肥料',
  irrigationServicesSupply: '灌溉服务/供应',
  pesticides: '杀虫剂',
  veterinaryServicesSupply: '兽医服务/供应',
  vineyards: '葡萄园',
  agricultureLab: '农业实验室',
  fieldTrials: '田间试验',
  dairy: '乳制品',
  dairyServices: '乳制品服务',
  agricultureRealEstate: '农业房地产',
  cropInsurance: '作物保险',
  assetManagement: '资产管理',

  // Creative & Media
  audioEngineering: '音频工程',
  contentCreation: '内容创作',
  design: '设计',
  filmVideo: '电影与视频',
  musicProduction: '音乐制作',
  photography: '摄影',
  writingPublishing: '写作与出版',
  newsCurrentEventsJournalism: '新闻、时事与新闻学',

  // Education & Training
  commercialConstruction: '商业建筑',
  constructionTrades: '建筑与贸易',
  corporateTraining: '企业培训',
  educationalServices: '教育服务',
  formalEducation: '正式教育',
  government: '政府',
  library: '图书馆',
  nonProfits: '非营利组织',
  residentialConstruction: '住宅建筑',
  socialServices: '社会服务',
  specializedTrades: '专业贸易',
  university: '大学',
  highSchool: '高中',
  juniorCollege: '专科学校',

  // Energy & Environment
  analysis: '分析',
  energy: '能源',
  environment: '环境',
  utilities: '公用事业',
  waterServices: '水务服务',
  
  // Food & Beverage Services
  barsNightlife: '酒吧与夜生活',
  cafe: '咖啡厅',
  coffeeShops: '咖啡店',
  foodServices: '食品服务',
  restaurants: '餐厅',
  
  // Healthcare & Wellness
  barbershop: '理发店',
  dentalServices: '牙科服务',
  fitness: '健身',
  hairNailSalon: '美发/美甲沙龙',
  healthcareProviders: '医疗保健提供者',
  massageParlor: '按摩店',
  medicalDevices: '医疗设备',
  mentalHealth: '心理健康',
  nutrition: '营养',
  pharmaceuticals: '制药',
  physicalTherapy: '物理治疗',
  spa: '水疗',
  wellness: '健康',
  
  // Manufacturing & Industrial
  aerospace: '航空航天',
  chemicals: '化学',
  foodBeverageManufacturing: '食品饮料制造',
  hydraulicServicesParts: '液压服务/零件',
  industrial: '工业',
  textiles: '纺织品',
  constructionAggregates: '建筑骨料',

  // Professional & Financial Services
  accounting: '会计',
  architectureDesign: '建筑与设计',
  engineering: '工程',
  financialServices: '金融服务',
  legalServices: '法律服务',
  marketingAdvertising: '营销与广告',
  healthInsurance: '健康保险',
  autoInsurance: '汽车保险',
  homeInsurance: '房屋保险',
  financialManagement: '财务管理',
  financialAnalysis: '财务分析',
  assetProtection: '资产保护',
  propertyManagement: '物业管理',

  // Property Maintenance
  autoDetailing: '汽车美容',
  electrical: '电气',
  handyMan: '杂工',
  hvac: '暖通空调',
  landscaping: '园林绿化',
  lawnCare: '草坪护理',
  pressureWashing: '高压清洗',
  wasteRemoval: '垃圾清理',

  // Retail & Consumer Goods
  apparel: '服装',
  automotiveRentals: '汽车租赁',
  automotiveRetail: '汽车零售',
  beauty: '美容',
  bookstore: '书店',
  carAudio: '汽车音响',
  carWash: '洗车',
  electronics: '电子产品',
  electronicsRetail: '电子产品零售',
  gardening: '园艺',
  hardware: '五金',
  homeGoods: '家居用品',
  specialtyRetail: '专业零售',
  tools: '工具',
  westernWear: '西部服装',
  workWear: '工作服',
  
  // Technology & Digital
  aiMachineLearning: '人工智能与机器学习',
  blockchain: '区块链',
  cloudComputing: '云计算',
  cybersecurity: '网络安全',
  dataAnalytics: '数据与分析',
  ecommercePlatforms: '电商平台',
  edtech: '教育科技',
  fintech: '金融科技',
  gaming: '游戏',
  hardwareElectronics: '硬件与电子产品',
  healthtech: '健康科技',
  itServices: 'IT服务',
  softwareSaas: '软件与SaaS',
  telecommunications: '电信',
  webDevelopment: 'Web开发',
  
  // Transportation & Logistics
  batteryServices: '电池服务',
  equipmentTransportation: '设备运输',
  logistics: '物流',
  roadside: '路边',
  shipping: '运输',
  tireServices: '轮胎服务',
  towServices: '拖车服务',
  repossessionServices: '回收服务',

  // Travel
  accommodation: '住宿',
  hospitality: '酒店业',
  airTravel: '航空旅行',
  hotel: '酒店',
  rvPark: '房车公园',
  busTransportation: '公共汽车运输',
  trainTransportation: '火车运输',
  packagingWarehouse: '包装仓库',
  coldStorage: '冷藏库',
  storageWarehouse: '储存仓库',
  miniStorage: '迷你仓库',
  rvStorage: '房车存储',
  boatStorage: '船只存储',
  rentals: '租赁',
  cosmetics: '化妆品',
  generalProducts: '一般产品',
  partsSupply: '零件供应',
  artsCrafts: '工艺美术',
  ballroom: '舞厅',
  conventionCenter: '会议中心',
  eventHall: '活动大厅',
  privateVenue: '私人场所',
  stadium: '体育场',
},
    network: {
      title: '网络',
      feedComingSoon: '网络动态即将推出',
      feedDescription: '这里将显示您网络中的动态',
      signInToCreatePosts: '请登录以创建帖子。',
      networkFeed: '网络',
      followingFeed: '人脉',
      createPost: '创建帖子',
      whatsHappening: '您的农业世界有什么新动态？',
      searchPlaceholder: '搜索帖子、用户、公司...',
      noPostsFound: '未找到帖子',
      noFriendsPostsYet: '朋友还没有发布动态',
      noConnectionsYet: '暂无连接',
      startFollowing: '开始与用户建立联系以在此查看他们的帖子',
      adjustFilters: '尝试调整搜索筛选',
      signInToSee: '登录以查看帖子',
      joinConversation: '创建账户加入对话',
      stories: '故事',
      addStory: '添加故事',
      viewStory: '查看故事',
      sharePost: '分享帖子',
      bookmarkPost: '收藏帖子',
      likePost: '点赞帖子',
      commentOnPost: '评论帖子',
      reportPost: '举报帖子',
      hidePost: '隐藏帖子',
      blockUser: '屏蔽用户',
        followToSeeStories: '与用户建立联系查看他们的故事',
        postHasBeenDeleted: '此帖子已被删除',
        viewPost: '查看帖子',

    },

    postAnalytics: {
      title: '帖子分析',
      views: '浏览',
      likes: '点赞',
      comments: '评论',
      shares: '分享',
      bookmarks: '收藏',
      whoViewed: '谁浏览了',
      whoLiked: '谁点赞了',
      whoCommented: '谁评论了',
      whoBookmarked: '谁收藏了',
      totalShares: '总分享数',
      noData: '暂无数据',
    },

    manage: {
  title: '管理',
  browseBusinesses: '浏览企业',
  manageBusiness: '管理业务',
  loading: '加载中...',
  services: '服务',
  messages: '消息',
  analytics: '分析',
  addService: '添加服务',
  editService: '编辑服务',
  serviceName: '服务名称',
  serviceDescription: '服务描述',
  startingPrice: '起始价格',
  category: '类别',
  addImage: '添加图片',
  changeImage: '更换图片',
  noServicesFound: '未找到服务',
  createFirstService: '创建您的第一个服务或调整筛选',
  searchServices: '搜索服务...',
  searchBusinesses: '搜索企业、服务、行业...',
  allIndustries: '所有行业',
  messageCount: '对话',
  conversationsWillAppear: '企业联系您时消息将显示在这里',
  businessMessages: '商务消息',
  profileRequired: '需要个人资料',
  addDisplayName: '请至少添加显示名称或商业名称以创建帖子。',
  accountType: '账户类型',
  everyone: '所有人',
  businessesOnly: '仅企业',
  industries: '行业',
  sectors: '部门',
  location: '位置',
  applyFilters: '应用筛选',
  resetFilters: '重置',
  searchFilter: '搜索和筛选',
  cityOrZip: '城市或邮编',
  specialties: '专业',
  loadingServices: '正在加载服务...',
  loadingPosts: '正在加载帖子...',
  loadingAnalytics: '正在加载分析...',
  type: '类型',
  image: '图片',
  product: '产品',
  service: '服务',
  enterServiceName: '输入服务名称',
  describeService: '描述您的服务',
  enterPrice: '输入价格',
  enterCategory: '输入类别',
  serviceNameRequired: '服务名称为必填项。',
  serviceDescriptionRequired: '服务描述为必填项。',
  validPriceRequired: '需要有效价格。',
  contactForPrice: '联系获取价格',
  pleaseSelectCategory: '请选择类别。',
  serviceUpdatedSuccessfully: '服务更新成功！',
  serviceCreatedSuccessfully: '服务创建成功！',
  failedToCreateService: '创建服务失败。请重试。',
  failedToUpdateService: '更新服务失败。请重试。',
  restrictVisibility: '限制可见性',
  mediaActions: '媒体操作',
  postArchived: '帖子归档成功',
  postVisibilityRestricted: '帖子可见性受限',
  postDeleted: '帖子删除成功',
  failedToArchive: '归档帖子失败。请重试。',
  failedToRestrict: '限制帖子失败。请重试。',
  failedToDelete: '删除帖子失败。请重试。',
  characterCount: '{{current}}/{{max}} 字符',
  noConversationsYet: '尚无对话',
  messagesWillAppearHere: '企业联系您时消息将显示在这里',
  onlineStatus: '在线',
  offlineStatus: '离线',
  permissionRequiredCamera: '需要相机权限',
  grantCameraPermission: '请授予访问相机的权限。',
  failed: '失败',
  tryAgainLater: '请稍后重试',
  conversationStarted: '对话开始成功',
  failedToStartConversation: '开始对话失败',
  authenticationRequired: '需要身份验证',
  pleaseSignInToStart: '请登录以开始对话。',
  selectFromPhotoLibrary: '从照片库选择',
  noDataAvailable: '暂无可用数据',
  lastActive: '最后活跃',
  startConversation: '开始对话',
  allCategories: '所有类别',
  viewProfile: '查看资料',
  businessProfile: '商业资料',
  timeline: '时间线',
  servicesAndProducts: '服务和产品',
  noServicesYet: '尚无服务',
  createYourFirst: '创建您的第一个服务',
  selectMedia: '选择媒体',
  removeMedia: '移除媒体',
  mediaSelected: '媒体已选择',
  pleaseEnterValidPrice: '请输入有效价格',
  categoryRequired: '类别为必填项',
  verified: '已验证',
  moreSpecialties: '更多专业',
  businessHours: '营业时间',
  established: '成立于',
  viewFullProfile: '查看完整资料',
  getDirections: '获取路线',
  business: '企业',
  businesses: '企业',
  confirmDeleteService: '您确定要删除吗',  // ← ADD THIS
  serviceDeletedSuccessfully: '服务删除成功',
  allLocations: '所有地点',
  allSpecialties: '所有专业',
  moreFilters: '更多筛选',
  anyRating: '任何评分',
  minRating: '最低评分',
  locationRadius: '位置半径',
  useMyLocation: '使用我的位置',
  searchAddress: '搜索地址',
  gettingLocation: '正在获取您的位置...',
  searchLocationPlaceholder: '搜索地址或城市...',
  radius: '半径',
  adjustFilters: '尝试调整筛选条件',
},

    profile: {
    currentPositionPlaceholder: '例如，高级软件工程师、农场经理等',
gpaPlaceholder: '例如，3.8',
  title: '个人资料',
  editProfile: '编辑资料',
  accountSettings: '账户设置',
  privacy: '隐私',
  help: '帮助',
  about: '关于',
  signOut: '退出登录',
  profilePicture: '头像',
  displayName: '显示名称',
  businessName: '企业名称',
  bio: '简介',
  website: '网站',
  phone: '电话',
  address: '地址',
  saveChanges: '保存更改',
  discardChanges: '放弃更改',
  followersCount: '已联系',
  followingCount: '联系了',
  postsCount: '帖子',
  follow: '建立联系',
  unfollow: '移除联系',
  following: '已联系',
  pendingConnection: '待处理',
  acceptConnection: '接受',
  declineConnection: '拒绝',
  cancelRequest: '取消请求',
  connectionRequest: '想与您建立联系',
  connectionAccepted: '接受了您的联系请求',
  message: '消息',
  viewLocation: '查看位置',
  contactInfo: '联系信息',
  businessHours: '营业时间',
  established: '成立于',
  verified: '已验证',
  individual: '个人',
  business: '企业',
  selectCategory: '选择类别',
  selectSpecialties: '选择专业',
  chooseAllThatApply: '选择所有适用的',
  selected: '已选择',
  loading: '正在加载个人资料...',
  createProfile: '创建个人资料',
  welcomeToProfile: '欢迎来到您的个人资料',
  createAccountToAccess: '创建账户以访问您的个人资料并管理您的商业信息',
  letsBegin: '让我们开始',
  unsavedChanges: '未保存的更改',
  unsavedChangesMessage: '您有未保存的更改。关闭前是否要保存？',
  discard: '丢弃',
  myProfile: '我的个人资料',
  userProfile: '用户个人资料',
  addCoverPhoto: '添加封面照片',
  userName: '用户名',
  yourName: '您的姓名',
  required: '*',
  enterUsername: '输入您的用户名',
  enterRealName: '输入您的真实姓名',
  enterDisplayName: '输入您的显示名称',
  enterBusinessName: '输入您的企业名称',
  tellUsAboutYourself: '告诉我们关于您自己和您的专业知识',
  tellUsAboutBusiness: '告诉我们关于您的企业和服务',
  industry: '行业',
  currentPosition: '当前职位',
  sectors: '部门',
  noneSelected: '未选择',
  contactInformation: '联系信息',
  businessAddress: '企业地址',
  searchForAddress: '搜索地址',
  getPreciseLocation: '自动获取精确位置',
  selectedAddress: '选择的地址',
  locationForNetworking: '为网络添加您的位置',
  selectedLocation: '选择的位置',
  searchForLocation: '搜索位置',
  useGpsLocation: '使用GPS位置',
  enterManually: '手动输入',
  locationDetails: '位置详情',
  preciseLocationAvailable: '精确位置可用',
  educationAcademicBackground: '教育和学术背景',
  degreeCertification: '学位/认证',
  schoolUniversity: '学校/大学',
  graduationYear: '毕业年份',
  gpa: 'GPA',
  additionalEducation: '其他教育',
  academicAwardsHonors: '学术奖项和荣誉',
  professionalCertifications: '专业认证',
  volunteerWorkCommunity: '志愿工作和社区服务',
  publicationsResearch: '出版物和研究',
  additionalInformation: '其他信息',
  businessDetails: '企业详情',
  keySkills: '关键技能',
  languages: '语言',
  professionalInterests: '专业兴趣',
  otherRelevantInformation: '其他相关信息',
  yearEstablished: '成立年份',
  logout: '登出',
  areYouSureLogout: '您确定要登出吗？',
  usernameNotAvailable: '用户名不可用',
  displayNameNotAvailable: '显示名称不可用',
  availableAlternatives: '可用的替代方案：',
  use: '使用',
  searchAddress: '搜索地址',
  findExactAddress: '找到您的确切地址以显示精确位置',
  startTypingAddress: '开始输入您的地址...',
  startWithStreetNumber: '从您的街道号码或地址开始',
  selectingAddressProvidesGPS: '选择地址提供精确的GPS坐标',
  selectCoverPhoto: '选择封面照片',
  selectLogo: '选择标志',
  chooseFromGallery: '从图库选择',
  selectFromPhotoLibrary: '从您的照片库选择',
  invalidUrl: '无效URL',
  unableToOpenWebsite: '无法打开此网站。请检查URL格式。',
  checkUrlFormat: '请检查URL格式',
  copyUrl: '复制URL',
  urlCopied: 'URL已复制',
  offlineMode: '离线模式',
  profileSavedLocally: '您的个人资料已本地保存，并将在您重新联网时同步。',
  saveFailed: '保存失败',
  authenticationError: '身份验证错误。请重新登录。',
  signInAgain: '请重新登录',
  success: '成功',
  profileSavedSuccessfully: '个人资料保存成功！',
  manualEntry: '手动输入',
  enterBusinessAddress: '输入您的企业地址：',
  enterYourLocation: '输入您的位置：',
  addressSelected: '地址已选择',
  addressUpdatedWithLocation: '地址已更新，包含精确位置数据以在地图上显示。',
  failedToProcessAddress: '处理地址失败。请重试。',
  phoneFormat: '(555) 123-4567',
enterWebsiteUrl: '输入网站URL（例如，https://cultivanetwork.com）',
degreeExample: '例如，计算机科学学士',
universityExample: '例如，加州大学伯克利分校',
graduationYearExample: '例如，2023',
gpaExample: '例如，3.8',
businessHoursExample: '例如，周一-周五：上午9点-下午6点',
additionalEducationPlaceholder: '其他课程、训练营、在线认证...',
academicAwardsPlaceholder: '院长名单、奖学金、学术竞赛...',
certificationsPlaceholder: '行业认证、许可证、专业凭证...',
volunteerWorkPlaceholder: '社区参与、志愿职位、非营利工作...',
publicationsPlaceholder: '研究论文、文章、已发表作品...',
keySkillsPlaceholder: '技术技能、软件熟练程度、有经验的工具...',
languagesPlaceholder: '例如，英语（母语）、西班牙语（流利）、法语（对话水平）',
professionalInterestsPlaceholder: '您热衷的领域、想要工作的行业...',
otherRelevantPlaceholder: '对潜在雇主可能相关的其他任何信息...',
removeLocation: '删除位置',
  locationRemoved: '位置已删除',
  businessAddressRemoved: '商业地址已从您的个人资料中删除。',
  locationCleared: '您的位置已从个人资料中清除。',
  preciseLocationWithGPS: '精确位置带GPS坐标',
  manualEntryNoGPS: '手动输入 - 无GPS坐标',
  
  // Enhanced address status indicators
  addressDetailsTitle: '地址详情',
  locationDetailsTitle: '位置详情',
  coordinatesLabel: '坐标：',
  googlePlaceIdLabel: '谷歌地点ID：',
  manualEntryLabel: '手动输入',
  
  // Enhanced search functionality
  searchAddressPlaceholder: '开始输入您的地址...',
  noResultsFound: '未找到地址。请尝试不同的搜索词。',
  searchError: '搜索失败。请检查您的网络连接。',
  
  // API and network error messages
  apiKeyNotConfigured: '地址搜索不可用。请联系支持。',
  networkError: '网络错误。请检查您的连接并重试。',
  requestTimeout: '请求超时。请重试。',
  rateLimitExceeded: '请求过多。请稍等片刻再试。',
  requestDenied: '地址搜索权限被拒绝。请联系支持。',
  requiredFieldsProgress: '已完成 {filled}/{total} 个必填字段',
  fieldsRemaining: '剩余字段：',
  multipleLocations: '多个地点',
  multipleLocationsDescription: '为您的企业添加更多地点',
  addLocation: '添加地点',
  locationName: '地点名称',
  locationNamePlaceholder: '例如：总部、仓库、市中心分店',
  locationPhone: '电话',
  locationBusinessHours: '营业时间',
  locationAddress: '地址',
  additionalLocations: '其他地点',
  editLocation: '编辑地点',
  deleteLocation: '删除地点',
  deleteLocationConfirm: '删除地点？',
  deleteLocationMessage: '您确定要删除此地点吗？',
  locationAdded: '地点添加成功',
  locationUpdated: '地点更新成功',
  locationDeleted: '地点已删除',
  noAdditionalLocations: '暂无其他地点',
  addYourFirstLocation: '点击"添加地点"来添加另一个营业地点',
  usePrimaryIfBlank: '留空将使用主要地点的信息',

},

    scan: {
  title: '扫描',
  searchLocation: '搜索位置',
  nearbyBusinesses: '附近企业',
  mapView: '地图视图',
  listView: '列表视图',
  directions: '路线',
  callBusiness: '致电企业',
  visitWebsite: '访问网站',
  noBusinessesNearby: '附近未找到企业',
  locationPermission: '需要位置权限',
  enableLocation: '启用位置',
  searchRadius: '搜索半径',
  filterByCategory: '按类别筛选',
  miles: '英里',
  kilometers: '公里',
  // NEW KEYS TO ADD:
  loadingMap: '正在加载地图...',
  signInRequired: '请登录以发现您附近的企业',
  pleaseSignInToDiscover: '请登录以发现您附近的企业',
  searchBusinesses: '搜索企业...',
  measure: '测量',
  edit: '编辑',
  area: '面积',
  perimeter: '周长',
  points: '点数',
  method: '方法',
  manual: '手动',
  gps: 'GPS',
  notes: '备注',
  created: '创建时间',
  unknown: '未知',
  savedFields: '保存的字段',
  loadingFields: '正在加载字段...',
  manualDrawing: '手动绘制',
  gpsWalking: 'GPS行走',
  tapToView: '点击在地图上查看',
  noFieldsSaved: '尚未保存字段',
  tapMeasureToStart: '点击"测量"按钮开始测量田地面积',
  businesses: '企业',
  found: '找到',
  more: '更多',
  locationNotSpecified: '未指定位置',
  tapToViewProfile: '点击查看完整个人资料',
  specialties: '专业',
  mapStandard: '标准',
  mapSatellite: '卫星',
  mapHybrid: '混合',
},

    settings: {
      title: '设置',
      loading: '正在加载设置...',
      general: '通用',
      accounts: '账户',
      activity: '动态',
      blocked: '已屏蔽',
      privacy: '隐私',
      language: '语言',
      
      accountManagement: '账户管理',
      accountManagementDesc: '管理和切换您的多个账户',
      activeAccount: '当前账户',
      allAccounts: '所有账户',
      addAccount: '添加账户',
      switchAccount: '切换账户',
      removeAccount: '移除账户',
      individual: '个人',
      business: '商业',
      lastActive: '最后活跃',
      followers: '人脉',
      following: '人脉',
      
      yourActivity: '您的动态',
      yourActivityDesc: '查看和管理您的动态历史，实时更新',
      networkConnections: '网络和连接',
      networkConnectionsDesc: '您在Cultiva的社交存在',
      contentEngagement: '内容和互动',
      contentEngagementDesc: '您的帖子和互动',
      peopleFollowingYou: '已联系',
      peopleYouFollow: '联系了',
      postsCreated: '创建的帖子',
      likesGiven: '点赞数',
      commentsPosted: '发表的评论',
      postsSaved: '保存的帖子',
      noActivityYet: '暂无动态',
      justNow: '刚刚',
      viewPost: '查看帖子',
      showDeleted: '显示已删除',
      showArchived: '显示已归档',
      recentActivities: '最近动态',
      noRecentActivities: '暂无最近动态',
      
      languageSettings: '语言设置',
      languageSettingsDesc: '为整个应用选择您偏好的语言',
      currentLanguage: '当前语言',
      selectLanguage: '选择语言',
      languageChanged: '语言更改成功',
      restartRequired: '请重启应用以获得完整效果',
      
      blockedUsers: '已屏蔽用户',
      blockedUsersDesc: '管理您已屏蔽的无法与您互动的用户',
      blockUser: '屏蔽用户',
      unblockUser: '取消屏蔽',
      searchUsers: '搜索用户',
      searchUsersPlaceholder: '按姓名或企业搜索用户...',
      noUsersFound: '未找到用户',
      tryDifferentSearch: '尝试不同的搜索词',
      searchForUsers: '搜索用户以屏蔽',
      startTyping: '开始输入以查看结果',
      blockConfirm: '屏蔽{{name}}？他们将无法看到您的帖子或联系您。',
      unblockConfirm: '取消屏蔽{{name}}？',
      userBlocked: '用户屏蔽成功',
      userUnblocked: '用户取消屏蔽成功',
      blockedDate: '屏蔽于{{date}}',
      
      privacySettings: '隐私设置',
      privacySettingsDesc: '控制他人如何查看和与您的个人资料互动',
      profileVisibility: '个人资料可见性',
      profileVisibilityDesc: '控制谁可以查看您的个人资料信息',
      public: '公开',
      friendsOnly: '仅人脉',
      private: '私密',
      publicDesc: '任何人都可以看到您的个人资料和帖子',
      friendsOnlyDesc: '只有您的人脉可以看到您的个人资料',
      privateDesc: '只有您可以看到您的个人资料',
      clearAllData: '清除所有数据',
      clearAllDataDesc: '这将永久删除您的所有数据，包括帖子、消息和动态。此操作无法撤销。',
      privacyFeaturesComing: '隐私设置',
      privacyFeaturesDesc: '您的隐私很重要。高级隐私控制将在未来的更新中提供。',
      enterEmailPassword: '请输入邮箱和密码',
  switchedToAccount: '已切换到{{name}}',
  accountAdded: '账户已添加',
  accountAddedDesc: '成功添加并切换到账户！关闭设置以查看您新账户的帖子。',
  closeSettings: '关闭设置',
  accountOperationFailed: '处理账户失败。请重试。',
  noAccountFound: '未找到此邮箱的账户。',
  incorrectPassword: '此账户的密码错误。',
  invalidEmail: '请输入有效的邮箱地址。',
  tooManyAttempts: '尝试次数过多。请稍后再试。',
  operationFailed: '操作失败',
  accountNotFound: '未找到账户。',
  switchAccountConfirm: '您需要输入密码来验证身份。',
  removeAccountConfirm: '从此设备移除{{name}}？您可以稍后通过登录重新添加。',
  accountRemovedSuccess: '账户移除成功。',
  accountRemovalFailed: '移除账户失败。',
  currentUser: '当前用户',
  businessAccount: '企业账户',
  individualAccount: '个人账户',
  userAccount: '用户',
  switchingAccounts: '切换账户中...',
  loadingLanguage: '加载语言中...',
  accountFeatures: '数据分离 • 即时切换 • 安全私密',
  rememberLogin: '记住此登录以快速切换',
  quickSwitch: '快速切换',
  savedLoginExpired: '保存的登录已过期',
  savedLoginExpiredDesc: '保存的凭据已失效，请重新登录。',
  forgetSavedLogin: '忘记保存的登录',
  forgetSavedLoginConfirm: '移除{{name}}的保存登录？下次切换时需要输入密码。',
  forget: '忘记',
  
  // Activity
  activityManagement: '活动管理',
  activityDeleteFailed: '删除活动失败。',
  activityArchiveFailed: '归档活动失败。',
  aPost: '一个帖子',
  aBusiness: '一个企业',
  someone: '某人',
  
  // Blocking
  unknownUser: '未知用户',
  blockedByUser: '被用户屏蔽',
  blockUserFailed: '屏蔽用户失败。',
  unblockUserFailed: '取消屏蔽用户失败。',
  reason: '原因',
  searchUsersToBlock: '按姓名或企业搜索要屏蔽的用户',
  
  // Sound Effects
  soundEffects: '音效',
  soundEffectsDesc: '为通知和操作播放声音',
  enableSounds: '启用声音',

  // Privacy
  privacySettingsUpdated: '隐私设置已更新。',
  privacySettingsFailed: '保存隐私设置失败。',
  deleteAllData: '删除所有数据',
  featureComingSoon: '功能即将推出',
  featureComingSoonDesc: '此功能将在未来的更新中提供。',

  // Language
  languageChangeFailed: '更改语言失败。',
  languageSupport: '语言支持',
  languageSupportDesc: '语言更改会立即应用于整个应用程序。阿拉伯文字方向更改可能需要重新启动应用程序才能完全生效。',
  activeLabel: '当前',
  
  // Modal text
  signInExistingAccount: '登录现有账户以将其添加到此设备',
  signIn: '登录',
  createAccount: '创建账户',
  createNewAccountDesc: '创建新账户并添加到此设备',
  confirmPassword: '确认密码',
  confirmPasswordPlaceholder: '重新输入密码',
  passwordMinLength: '密码至少需要8个字符',
  passwordsDoNotMatch: '密码不匹配',
  accountCreated: '账户已创建',
  accountCreatedDesc: '您的新账户已创建并已激活！关闭设置即可开始使用。',
  createAccountFailed: '无法创建账户，请重试。',
  emailAlreadyInUse: '此邮箱已注册账户',
  weakPassword: '密码太弱，请使用至少8个字符。',
  networkError: '连接问题，请检查网络。',
  enterEmailAddress: '输入邮箱地址',
  enterPassword: '输入密码',
    },

    businessProfile: {
      timeline: '时间线',
      services: '服务和产品',
      posts: '帖子',
      media: '媒体',
      loadingServices: '正在加载服务...',
      loadingPosts: '正在加载帖子...',
      loadingMedia: '正在加载媒体...',
      noServicesAvailable: '暂无可用服务',
      noPostsAvailable: '暂无可用帖子',
      noMediaPosted: '尚未发布媒体',
      contactInformation: '联系信息',
      email: '邮箱',
      phone: '电话',
      website: '网站',
      education: '教育背景',
      achievements: '成就和认证',
      additionalInfo: '附加信息',
      businessDetails: '业务详情',
      degree: '学位/认证',
      university: '大学/学校',
      graduationYear: '毕业年份',
      gpa: 'GPA',
      academicAwards: '学术奖项',
      certifications: '专业认证',
      volunteerWork: '志愿工作',
      publications: '出版物和研究',
      keySkills: '关键技能',
      languages: '语言',
      professionalInterests: '专业兴趣',
      otherInformation: '其他信息',
      profilePrivate: '此个人资料为私密',
      limitedProfileView: '受限的个人资料视图 - 建立联系以查看更多',
      followToSeeMore: '建立联系以查看更多',
      searchServices: '搜索服务...',
  allCategories: '全部',
  noServicesMatch: '没有服务匹配您的筛选条件',
  clearFilters: '清除筛选',
  sortNewest: '最新优先',
  sortPriceLow: '价格：从低到高',
  sortPriceHigh: '价格：从高到低',
  sortName: '名称：A-Z',
  messageSeller: '联系卖家',
  isStillAvailable: '请问还有吗？',
  whatsLowestPrice: '最低价是多少？',
  canYouDeliver: '可以送货吗？',
  imInterested: '我对此感兴趣',
  free: '免费',
  more: '更多',
  less: '更少',
    },

    comments: {
      comments: '评论',
      addComment: '添加评论...',
      reply: '回复',
      like: '点赞',
      loadingComments: '正在加载评论...',
      noCommentsYet: '尚无评论',
      beFirstToComment: '成为第一个评论的人',
      replyingTo: '回复',
      cancelReply: '取消回复',
      postComment: '发表评论',
      showReplies: '显示回复',
      hideReplies: '隐藏回复',
    },

    rating: {
      rateThis: '为此企业评分',
      yourRating: '您的评分',
      averageRating: '平均评分',
      totalReviews: '评价',
      noReviews: '尚无评价',
      ratingSubmitted: '评分已提交',
      thankYouRating: '感谢您的评分！以下是其他人的评分：',
      showDetails: '显示详情',
      hideDetails: '隐藏详情',
      writeReview: '写评价',
      readReviews: '阅读评价',
    },

    stories: {
      stories: '故事',
      yourStory: '您的故事',
      addStory: '添加故事',
      viewStory: '查看故事',
      recordVideo: '录制视频',
      chooseFromGallery: '从相册选择',
      storyExpires24h: '故事将在24小时后过期',
      noStoriesYet: '尚无故事',
      watchStory: '观看故事',
      skipStory: '跳过故事',
      storyUnavailable: '故事不可用',
       preview: '预览',
  reRecord: '重新录制',
  storyInfo: '故事可见24小时，时长最多30秒',
  shareAgriculturalWorld: '用30秒视频分享您的农业世界正在发生的事情',
  startRecording: '开始录制',
  recordVideoFirst: '请先录制一个视频',
  storyPosted: '您的故事已发布！',
  videoTooLarge: '视频大小：{{size}}MB 超过故事500MB限制。请录制较短的视频。',
  createStory: '创建故事',
  sharePhotoOrVideo: '分享将可见24小时的照片或视频',
  takePhoto: '拍照',
  selectDuration: '选择时长',
  displayFor: '显示',
  continueEditing: '继续编辑',
  storyInfoPhotoVideo: '照片和视频可见24小时。视频最长30秒。',
  selectMediaFirst: '请先选择照片或视频',
    },

    messaging: {
      messages: '消息',
      conversation: '对话',
      typeMessage: '输入消息...',
      send: '发送',
      online: '在线',
      offline: '离线',
      delivered: '已送达',
      read: '已读',
      startConversation: '开始对话',
      conversationStarted: '对话已开始',
      noMessages: '暂无消息',
      loadingMessages: '正在加载消息...',
      messageFailed: '消息发送失败',
      tryAgain: '重试',
    },

    createPost: {
      createPost: '创建帖子',
      whatsOnMind: '您在想什么？',
      addPhoto: '添加照片',
      addVideo: '添加视频',
      camera: '相机',
      gallery: '相册',
      publish: '发布',
      saveDraft: '保存草稿',
      discardPost: '丢弃帖子',
      publishingPost: '正在发布...',
      postPublished: '帖子发布成功！',
      addMedia: '添加媒体',
      removeMedia: '移除媒体',
      characterCount: '字符',
      maxCharacters: '最多500字符',
      editPost: '编辑帖子',
  deletePost: '删除帖子',
  deleteConfirm: '您确定要删除这个帖子吗？',
    },

    search: {
      search: '搜索',
      searchAndFilter: '搜索和筛选',
      reset: '重置',
      noResults: '未找到结果',
      tryDifferent: '尝试不同的搜索词',
      searching: '搜索中...',
      filterBy: '筛选',
      sortBy: '排序',
      location: '位置',
      category: '类别',
      rating: '评分',
      distance: '距离',
      recent: '最近',
      popular: '热门',
      nearest: '最近',
      name: '名称',
        allSectors: '所有部门',

    },

    activities: {
      liked: '点赞了',
      comment: '评论',
      reviewed: '评价了',
      following: '建立了联系',
      saved: '保存了',
      created: '创建了帖子',
      viewed: '访问者',
      createdPost: '创建了帖子',
      profileViewed: '个人资料查看了您的个人资料',
      someoneViewed: '有人查看了您的个人资料',
      startedConversation: '开始了对话',
      sentMessage: '发送了消息',
      postedComment: '发表了评论',
      photoAttached: '附加了照片',
      videoAttached: '附加了视频',
      archive: '归档',
      archived: '动态已归档',
      deleteActivity: '删除动态',
      deleteConfirm: '您确定要删除这个动态吗？',
    },

    moderation: {
      reportPost: '举报帖子',
      hidePost: '隐藏帖子',
      blockUser: '屏蔽用户',
      reportUser: '举报用户',
      spam: '垃圾信息',
      harassment: '骚扰',
      inappropriateContent: '不当内容',
      misinformation: '虚假信息',
      other: '其他',
      reportSubmitted: '您的举报已提交并将被审核。',
      postHidden: '此帖子已从您的动态中隐藏。',
      userBlocked: '用户已被屏蔽。您将不再看到他们的帖子。',
      postReported: '帖子已被举报并等待审核。',
      alreadyReported: '您已经举报过这个帖子。',
      underReview: '此帖子正在审核中',
      postActions: '帖子操作',
      chooseAction: '选择操作',
      reportReasonTitle: '您为什么要举报这个帖子？',
  cannotReportOwnPost: '您不能举报自己的帖子。',
  reportDetailsTitle: '举报详情',
  reportDetailsPrompt: '请描述您举报这个帖子的原因：',
  submit: '提交',
  pleaseProvideReason: '请提供举报原因。',
  reportThankYou: '感谢您的举报。我们的团队将很快审核此内容。',
  alreadyReportedDetailed: '您已经举报过这个帖子。感谢您帮助保持我们社区的安全。',
  reportSubmissionFailed: '提交举报失败。请稍后重试。',
  hidePostConfirm: '此帖子将从您的动态中隐藏。您可以稍后在设置中取消隐藏。',
  hide: '隐藏',
  postHiddenSuccess: '此帖子已从您的动态中隐藏。',
  hidePostFailed: '隐藏帖子失败。请重试。',
  cannotBlockSelf: '您不能屏蔽自己。',
  blockConfirmMessage: '您确定要屏蔽{{name}}吗？您将看不到他们的帖子，也无法向他们发送消息。',
  block: '屏蔽',
  userBlockedSuccess: '{{name}}已被屏蔽。您将不再看到他们的帖子。',
  blockUserFailed: '屏蔽用户失败。请重试。',
   whyReporting: '您为什么要举报这个帖子？',
  reportAnonymous: '您的举报是匿名的，有助于我们保持社区安全。',
  describeIssue: '请描述问题：',
  describePlaceholder: '描述您举报这个帖子的原因...',
  submitReport: '提交举报',
  whatHappensHide: '隐藏帖子后会发生什么：',
  postDisappears: '帖子从您的动态中消失',
  authorNotNotified: '作者不会收到通知',
  canUnhideSettings: '您可以稍后在设置中取消隐藏',
  canSeeReplies: '如果被提及，您仍可看到回复',
  lookingSomethingElse: '寻找其他选项？',
  considerReporting: '如果此帖子违反我们的社区准则，请考虑举报而不仅仅是隐藏它。',
  hideThisPost: '隐藏此帖子？',
  hideDescription: '此帖子将从您的动态中隐藏。浏览帖子时您不会看到它，但如果有人分享给您，您仍可直接访问。',
  blockThisUser: '屏蔽此用户？',
  ifYouBlock: '如果您屏蔽此用户，您将无法：',
  seeTheirPosts: '在动态中看到他们的帖子',
  sendReceiveMessages: '与他们发送或接收消息',
  seeProfile: '查看他们的个人资料或企业信息',
  getNotifications: '收到他们活动的通知',
  noteBlock: '注意：{{name}} 不会收到您屏蔽他们的通知。您可以稍后在设置中取消屏蔽。',
    },

    share: {
      title: '分享帖子',
      searchPlaceholder: '搜索联系人...',
      selected: '已选择',
      send: '发送',
      shareExternally: '分享到外部',
      success: '帖子分享成功',
      selectRecipients: '选择要分享的对象',
      noFollowers: '没有人脉可以分享',
      sending: '发送中...',
      sharedPost: '向您分享了一篇帖子',
    },

    analytics: {
      analytics: '分析',
      overview: '概览',
      profileViews: '个人资料浏览',
      postEngagement: '帖子互动',
      followers: '人脉',
      reach: '触达',
      impressions: '展示',
      clicks: '点击',
      saves: '保存',
      shares: '分享',
      comments: '评论',
      likes: '点赞',
      growthRate: '增长率',
      mostActiveFollowerTime: '人脉最活跃时间',
      recentActivity: '最近活动',
      noDataYet: '暂无可用数据',
      lastDays: '过去7天',
      thisWeek: '本周',
      thisMonth: '本月',
      peakHours: '高峰时段',
    },

    ui: {
  search: '搜索',
  searching: '搜索中...',
  noResults: '无结果',
  loading: '正在加载...',
  refresh: '刷新',
  pullToRefresh: '下拉刷新',
  endOfResults: '结果结束',
  tryAgain: '再试一次',
  somethingWentWrong: '出现了问题',
  checkConnection: '请检查您的网络连接',
  restartApp: '请重启应用',
  seeMore: '查看更多',
  seeLess: '查看更少',
  showAll: '显示全部',
  collapse: '收起',
  expand: '展开',
  precise: '精确',
  coordinates: '坐标',
  manualEntry: '手动输入',
  notSet: '未设置',
},


    time: {
      now: '刚刚',
      today: '今天',
      yesterday: '昨天',
      thisWeek: '本周',
      thisMonth: '本月',
      daysAgo: '{{count}}天前',
      weeksAgo: '{{count}}周前',
      monthsAgo: '{{count}}个月前',
      minutesAgo: '{{count}}分钟前',
      hoursAgo: '{{count}}小时前',
      at: '在',
      am: '上午',
      pm: '下午',
    },

    errors: {
  networkError: '网络连接错误',
  serverError: '服务器错误',
  unknownError: '发生未知错误',
  tryAgainLater: '请稍后重试',
  invalidInput: '提供的输入无效',
  fieldRequired: '此字段为必填项',
  emailInvalid: '请输入有效的邮箱地址',
  passwordTooShort: '密码至少需要6个字符',
  fileTooLarge: '文件太大',
  unsupportedFormat: '不支持的文件格式',
  uploadFailed: '上传文件失败',
  permissionDenied: '权限被拒绝',
  locationDisabled: '位置服务已禁用',
  cameraUnavailable: '相机不可用',
  validationError: '验证错误',
  userNameRequired: '用户名为必填项。',
  yourNameRequired: '您的姓名为必填项。',
  displayNameRequired: '显示名称为必填项。',
  businessNameRequiredBusiness: '企业账户需要企业名称。',
  bioRequired: '简介为必填项。',
  selectIndustry: '请选择行业。',
  selectCategory: '请选择类别。',
  emailRequiredIndividual: '个人账户需要邮箱。',
  validWebsiteRequired: '请输入有效的网站URL。',
  permissionRequired: '需要权限',
  grantPhotoPermission: '请授权访问您的照片。',
  imageUploadSuccess: '图片上传成功！',
  locationPermissionNeeded: '需要位置权限来获取您的当前位置。',
  callNotAvailable: '呼叫不可用',
  callingNotAvailable: '此设备不支持呼叫。',
  copyNumber: '复制号码',
  phoneNumber: '电话号码',
  unableToMakeCall: '无法拨打电话。',
  navigationError: '导航错误',
  unableToNavigate: '无法导航。',
  addressRequired: '需要填写企业地址。',
  completeProfileFirst: '完善您的个人资料',
  completeProfileMessage: '您必须填写所有必填字段才能访问应用程序。',
},

  // Newsletter
  newsletter: {
    // Opt-in Modal
    title: '保持联系',
    subtitle: '订阅我们的通讯，接收有关大麻行业的个性化更新。',
    features: {
      personalized: '个性化内容',
      personalizedDesc: '根据您的兴趣和位置定制的更新',
      monthly: '月度摘要',
      monthlyDesc: '每月一封邮件，无垃圾邮件',
      unsubscribe: '轻松取消订阅',
      unsubscribeDesc: '随时一键取消订阅',
    },
    subscribe: '立即订阅',
    maybeLater: '稍后再说',
    stayConnected: '与您的网络保持联系',
    getPersonalized: '获取个性化的月度更新，直接发送到您的收件箱。',
    featurePosts: '来自您兴趣的新帖子',
    featureBusinesses: '您所在地区的企业',
    featureProducts: '产品和服务',
    featureCommunity: '社区亮点',
    sentMonthly: '每月1日发送一次',
    maybeNextTime: '下次再说',
    canSubscribeLater: '您可以稍后在设置中订阅',

    // Preferences Flow
    selectIndustries: '选择行业',
    industriesDesc: '选择您想了解的行业。最多选择5个。',
    selectSectors: '选择部门',
    sectorsDesc: '在您选择的行业中选择特定部门。',
    selectLocations: '选择位置',
    locationsDesc: '选择您想接收内容的地理区域。',
    selectProfileTypes: '选择个人资料类型',
    profileTypesDesc: '选择您想看到内容的个人资料类型。',
    profileTypeIndividual: '个人',
    profileTypeBusiness: '企业',
    selectContentTypes: '选择内容类型',
    contentTypesDesc: '选择您想接收的内容类型。',
    contentTypePosts: '帖子和更新',
    contentTypeMedia: '照片和视频',
    contentTypeProducts: '产品',
    contentTypeServices: '服务',
    addInterests: '添加个人兴趣',
    interestsDesc: '添加您感兴趣的特定主题或关键词。（可选）',
    interestPlaceholder: '输入一个兴趣...',
    noInterestsYet: '尚未添加兴趣。此步骤是可选的。',
    suggestedInterests: '建议',

    // Location
    addMyLocation: '添加我的位置',
    addLocation: '添加位置',
    enterLocation: '输入城市、州或国家',
    searchCity: '搜索城市...',
    searchLocation: '按地址、城市或邮编搜索...',
    locationsAdded: '已添加位置',
    noLocationSet: '未设置位置。将包含所有位置的内容。',
    receiveFrom: '接收来自：',
    city: '城市',
    state: '州',
    country: '国家',

    // Selection
    selected: '已选择',
    sectorsSelected: '个部门已选择',
    noIndustriesSelected: '请先选择行业',

    // Validation
    selectAtLeastOneIndustry: '请至少选择一个行业',
    selectAtLeastOneSector: '请至少选择一个部门',
    selectAtLeastOneLocation: '请至少选择一个位置',
    selectAtLeastOneProfileType: '请至少选择一个个人资料类型',
    selectAtLeastOneContentType: '请至少选择一个内容类型',
    selectAtLeastOneInterest: '请至少添加一个兴趣',

    // Consent
    consentTitle: '法律同意',
    consentText: `订阅CultivaNetwork通讯，即表示您同意以下内容：

电子邮件通信
我同意在与我的账户关联的电子邮件地址接收来自CultivaNetwork的每月通讯电子邮件。这些电子邮件将包含基于我所选偏好的个性化内容。

数据使用
我理解CultivaNetwork将使用我的偏好选择来策划和个性化通讯内容。我的偏好和电子邮件地址将被安全存储，仅用于提供相关的通讯内容。

第三方共享
我的电子邮件地址和偏好不会被出售、出租或与第三方共享用于营销目的。

取消订阅
我可以随时通过点击任何通讯电子邮件中的"取消订阅"链接或通过应用设置取消订阅。

数据保留
我的订阅数据将保留到我取消订阅或删除账户为止。

合规性
本通讯符合适用的电子邮件营销法规，包括CAN-SPAM法案要求。`,
    agreeToReceive: '我同意接收CultivaNetwork的月度通讯并接受上述条款。',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',

    // Navigation
    skip: '跳过',
    continue: '继续',
    completeSubscription: '完成订阅',
    savePreferences: '保存偏好',

    // Settings
    settings: '通讯设置',
    settingsTitle: '通讯',
    subscribedTitle: '已订阅通讯',
    subscribed: '已订阅',
    notSubscribed: '未订阅',
    inactive: '未激活',
    subscribedSince: '订阅时间',
    lastEmailSent: '最后发送邮件',
    editPreferences: '编辑偏好',
    manageSubscription: '管理订阅',
    unsubscribeConfirm: '取消订阅',
    unsubscribeConfirmMessage: '您确定要取消订阅通讯吗？',
    resubscribe: '重新订阅',
    subscribeNow: '立即订阅',
    subscriptionUpdated: '订阅已更新',
    preferencesUpdated: '偏好设置已成功更新',
    never: '从未',
    unsubscribeTitle: '取消订阅',
    unsubscribe: '取消订阅',
    unsubscribedTitle: '已取消订阅',
    unsubscribedMessage: '您已取消订阅通讯。',
    unsubscribeError: '取消订阅失败。请重试。',
    resubscribedTitle: '已重新订阅',
    resubscribedMessage: '欢迎回来！您将收到下一期通讯。',
    resubscribeError: '重新订阅失败。请重试。',
    preferencesUpdatedTitle: '偏好设置已更新',
    preferencesUpdatedMessage: '您的通讯偏好设置已保存。',
    subscribedMessage: '您将在下个月1日收到第一期通讯。',
    saveError: '保存失败。请重试。',
    active: '活跃',
    lastSent: '上次发送：',
    frequency: '每月（每月1日）',
    yourPreferences: '您的偏好：',
    noPreferences: '未设置偏好',

    // Summary
    industries: '行业',
    sectors: '部门',
    locations: '位置',
    profileTypes: '个人资料类型',
    contentTypes: '内容类型',
    allLocations: '所有位置',
  },

  // Common
  common: {
    cancel: '取消',
    save: '保存',
    error: '错误',
  },

  // Industries
  industries: {
    agriculture: '农业',
    automotive: '汽车',
    construction: '建筑',
    creativeMedia: '创意与媒体',
    educationTraining: '教育与培训',
    energyEnvironment: '能源与环境',
    foodBeverage: '餐饮服务',
    healthcareWellness: '医疗保健',
    manufacturingIndustrial: '制造与工业',
    professionalFinancial: '专业与金融服务',
    propertyMaintenance: '物业维护',
    retailConsumer: '零售与消费品',
    technologyDigital: '科技与数字',
    transportationLogistics: '运输与物流',
    travel: '旅游',
    governmentPublicServices: '政府与公共服务',
    venue: '场馆',
  },

  // Sectors
  sectors: {
    // Agriculture
    farming: '农业',
    agriculturalEquipment: '农业设备',
    cropNutrition: '作物营养',
    cropProtection: '作物保护',
    irrigation: '灌溉',
    livestockFeed: '畜牧饲料',
    organicAgriculture: '有机农业',
    seedDevelopment: '种子开发',
    agriculturalTechnology: '农业技术',
    landManagement: '土地管理',
    animalHusbandry: '畜牧业',
    agriculturalConsulting: '农业咨询',
    soilManagement: '土壤管理',
    harvestingServices: '收割服务',
    // Creative & Media
    photography: '摄影',
    videography: '摄像',
    graphicDesign: '平面设计',
    contentCreation: '内容创作',
    socialMediaManagement: '社交媒体管理',
    marketing: '市场营销',
    advertising: '广告',
    branding: '品牌建设',
    eventPlanning: '活动策划',
    musicProduction: '音乐制作',
    filmProduction: '影视制作',
    webDesign: '网页设计',
    illustration: '插画',
    animation: '动画',
    publishing: '出版',
    publicRelations: '公共关系',
    // Education & Training
    k12Education: 'K-12教育',
    higherEducation: '高等教育',
    vocationalTraining: '职业培训',
    onlineCourses: '在线课程',
    tutoring: '辅导',
    educationalTechnology: '教育技术',
    corporateTraining: '企业培训',
    languageEducation: '语言教育',
    testPreparation: '考试准备',
    specialEducation: '特殊教育',
    earlyChildhoodEducation: '幼儿教育',
    // Energy & Environment
    solarEnergy: '太阳能',
    windEnergy: '风能',
    hydroelectric: '水电',
    biofuels: '生物燃料',
    environmentalConsulting: '环境咨询',
    wasteManagement: '废物管理',
    recycling: '回收利用',
    carbonManagement: '碳管理',
    energyEfficiency: '能源效率',
    sustainableDesign: '可持续设计',
    // Food & Beverage Services
    restaurants: '餐厅',
    catering: '餐饮服务',
    foodProduction: '食品生产',
    beverageManufacturing: '饮料制造',
    foodDistribution: '食品配送',
    specialtyFoods: '特色食品',
    organicFoods: '有机食品',
    foodTechnology: '食品技术',
    farmToTable: '从农场到餐桌',
    foodSafetyConsulting: '食品安全咨询',
    bakery: '烘焙',
    brewery: '酿酒厂',
    // Healthcare & Wellness
    medicalPractice: '医疗实践',
    dentalCare: '牙科护理',
    mentalHealth: '心理健康',
    physicalTherapy: '物理治疗',
    alternativeMedicine: '替代医学',
    nutritionConsulting: '营养咨询',
    fitnessTraining: '健身培训',
    spaServices: '水疗服务',
    seniorCare: '老年护理',
    homeHealthcare: '家庭医疗',
    medicalEquipment: '医疗设备',
    pharmaceuticals: '制药',
    veterinaryServices: '兽医服务',
    // Manufacturing & Industrial
    heavyMachinery: '重型机械',
    electronicsManufacturing: '电子制造',
    textiles: '纺织',
    plastics: '塑料',
    metalFabrication: '金属加工',
    automotiveParts: '汽车零部件',
    packaging: '包装',
    chemicalProduction: '化学生产',
    industrialEquipment: '工业设备',
    qualityControl: '质量控制',
    processEngineering: '工艺工程',
    // Professional & Financial Services
    accounting: '会计',
    legalServices: '法律服务',
    financialPlanning: '财务规划',
    insurance: '保险',
    realEstate: '房地产',
    businessConsulting: '商业咨询',
    humanResources: '人力资源',
    itServices: 'IT服务',
    taxPreparation: '税务准备',
    investmentManagement: '投资管理',
    banking: '银行',
    auditing: '审计',
    // Property Maintenance
    autoDetailing: '汽车美容',
    electrical: '电气',
    handyMan: '杂工',
    hvac: '暖通空调',
    landscaping: '园林绿化',
    lawnCare: '草坪护理',
    pressureWashing: '高压清洗',
    wasteRemoval: '垃圾清理',
    // Retail & Consumer Goods
    ecommerce: '电子商务',
    brickMortarRetail: '实体零售',
    wholesale: '批发',
    consumerElectronics: '消费电子',
    apparel: '服装',
    homeGoods: '家居用品',
    sportingGoods: '体育用品',
    beautyProducts: '美容产品',
    jewelry: '珠宝',
    petProducts: '宠物用品',
    toysGames: '玩具游戏',
    furniture: '家具',
    carAudio: '汽车音响',
    carWash: '洗车',
    // Technology & Digital
    softwareDevelopment: '软件开发',
    mobileApps: '移动应用',
    cloudServices: '云服务',
    cybersecurity: '网络安全',
    aiMachineLearning: 'AI与机器学习',
    dataAnalytics: '数据分析',
    iotSolutions: '物联网解决方案',
    blockchain: '区块链',
    webDevelopment: 'Web开发',
    itConsulting: 'IT咨询',
    techSupport: '技术支持',
    saasProducts: 'SaaS产品',
    // Transportation & Logistics
    freightShipping: '货运',
    trucking: '卡车运输',
    warehousing: '仓储',
    lastMileDelivery: '最后一公里配送',
    fleetManagement: '车队管理',
    supplyChain: '供应链',
    courierServices: '快递服务',
    aviation: '航空',
    maritimeShipping: '海运',
    railTransport: '铁路运输',
    movingServices: '搬家服务',
    // Travel
    hotelsLodging: '酒店住宿',
    tourOperations: '旅游运营',
    travelAgency: '旅行社',
    vacationRentals: '度假租赁',
    adventureTravel: '探险旅游',
    ecoTourism: '生态旅游',
    businessTravel: '商务旅行',
    cruiseLines: '邮轮',
    transportationServices: '交通服务',
    travelTechnology: '旅游科技',
    destinationManagement: '目的地管理',
    // Venue
    ballroom: '舞厅',
    conventionCenter: '会议中心',
    eventHall: '活动大厅',
    privateVenue: '私人场所',
    stadium: '体育场',
  },

  },
};

export default translations;
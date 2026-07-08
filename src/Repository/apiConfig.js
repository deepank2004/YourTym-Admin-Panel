const endPoints = {
  loginAdmin: "api/v1/admin/login",
  getprivactpolicy: "api/v1/static/getPrivacy",
  getterms: "api/v1/static/getTerms",
  getprivactpolicybyid: (id) => `api/v1/static/privacy/${id}`,
  gettermsbyid: (id) => `api/v1/static/terms/${id}`,
  getAboutusbyid: (id) => `api/v1/static/aboutUs/${id}`,
  getfaqbyid: (id) => `api/v1/static/faq/${id}`,
  getticketbyid: (id) => `api/v1/user/ticket/${id}`,
  getallUser: (page, limit, search, status) =>
    `api/v1/admin/getProfileByType?page=${page}&limit=${limit}&search=${search ? search : ""
    }&status=${status ? status : ""}&userType=USER`,
  getallPartner: (page, limit, search, status) =>
    `api/v1/admin/getProfileByType?page=${page}&limit=${limit}&search=${search ? search : ""
    }&status=${status ? status : ""}&userType=PARTNER`,
  getallSubAdmin: (page, limit, search, status) =>
    `api/v1/admin/getProfileByType?page=${page}&limit=${limit}&search=${search ? search : ""
    }&status=${status ? status : ""}&userType=SUB-ADMIN`,
  getallBookings: (page, limit, search, date, status, startDate, endDate) =>
    `api/v1/admin/getOrders?page=${page}&limit=${limit}&search=${search ? search : ""
    }&dateFilter=${date ? date : ""}&status=${status ? status : ""}&startDate=${startDate ? startDate : ""
    }&endDate=${endDate ? endDate : ""}`,

  getallSubscription: "api/v1/admin/getSubscription",
  getExamPlan: "api/v1/admin/examPlan",
  getallBanner: "api/v1/admin/Banner/allBanner",
  getallmaincategoryBanner: "api/v1/admin/Banner/mainCategory/allBanner",
  getallcategoryBanner: "api/v1/admin/Banner/Category/allBanner",
  getallCoupon: "api/v1/admin/Coupan/listCoupan",
  getallOffer: "api/v1/admin/Offer/listOffer",
  getallNotification: "api/v1/admin/notifications/user",
  getallFaq: "api/v1/static/faq/All",
  getallTicket: "api/v1/admin/ticket/listTicket",
  getallContact: "api/v1/admin/viewContactDetails",
  getallMaincategory: "api/v1/admin/mainCategory/allCategory",
  getallCount: "api/v1/admin/allcount",
  getallMaincategorytypes: "api/v1/admin/MainCategoryType/allCategory",
  getAllCategory: "api/v1/admin/Category/getAllCategory",
  getAllpackages: "api/v1/admin/Package/getAllService",
  getAllSubCategory: "api/v1/admin/getAllSubCategories",
  getAllservice: "api/v1/admin/Service/getAllService",
  getAllcity: "api/v1/admin/city/cities",
  getAllslots: "api/v1/admin/slot",
  getAllsession: "api/v1/admin/book-sessions",
  getadminprofile: "api/v1/admin/getProfile",
  getcity: "api/v1/admin/city/cities",
  getarea: "api/v1/admin/area/areas",
  getCharges: "api/v1/admin/Charges/allCharges",
  getTraningvideos: "api/v1/admin/all-training-videos",
  gettestimonial: "api/v1/admin/testimonial",
  getleaves: "api/v1/admin/all-leaves",
  getInsurance: "api/v1/admin/insurance-plans",
  getConsentForms: "api/v1/admin/consent-forms",
  getTraningReport: "api/v1/admin/traning-forms",
  getAboutUs: "api/v1/static/getAboutUs",
  getfaqbycategoryid: (id) => `api/v1/static/faq/Allcategory/${id}`,
  getAllSectorbycityid: (id) => `api/v1/admin/areas/city/${id}`,
  getallUserTranscation: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser?page=${page}&limit=${limit}&isUser=true`,
  getallpayoutTranscation: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser?page=${page}&limit=${limit}&payoutTransction=true`,
  getAllTransactionsubscription: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser/?page=${page}&limit=${limit}&isSubscription=true`,
  getAllTransactioncredit: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser/?page=${page}&limit=${limit}&type=Credit`,
  getAllmaincategorytypebymaincategory: (mainid) =>
    `api/v1/admin/MainCategoryType/getMainCategoryTypeByMainCateogry/${mainid}`,
  getAllCategorybymaincategory: (mainid) =>
    `api/v1/admin/Category/allCategory/${mainid}`,
  getAllsubcategorybycategory: (mainid, catid) =>
    `api/v1/admin/SubCategory/${mainid}/${catid}`,
  getAllservicebysubcategoryid: (mainid, catid, subid) =>
    `api/v1/admin/Service/${mainid}/${catid}/${subid}`,
  getAdminEarningsByMonth: (year) =>
    `api/v1/admin/getAdminEarningsByMonth?year=${year ? year : "2025"}`,
  getpopularserviceByMonth: (year) =>
    `api/v1/admin/getPopularServices?year=${year ? year : "2025"}`,
  getAllWalletTransaction: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser/?page=${page}&limit=${limit}&type=Credit`,
  getAllReferralTransaction: (page, limit) =>
    `api/v1/admin/wallet/allTransactionUser/?page=${page}&limit=${limit}&type=Referral`,
  getAllReferraluserTransaction: (page, limit, id) =>
    `api/v1/admin/wallet/allTransactionUser?type=Referral&page=${page}&limit=${limit}&user=${id}`,

  addMaincategory: "api/v1/admin/mainCategory/addCategory",
  addCategory: "api/v1/admin/Category/createCategory",
  addMaincategoryType: "api/v1/admin/MainCategoryType/addCategory",
  addcategory: "api/v1/admin/Category/createCategory",
  addsubcategory: "api/v1/admin/SubCategory/createCategory",
  addService: "api/v1/admin/Service/addService",
  AddPackage: "api/v1/admin/Service/addPackages",
  addBanner: "api/v1/admin/Banner/AddBanner",
  addMaincategoryBanner: "api/v1/admin/Banner/mainCategory/AddBanner",
  addcategoryBanner: "api/v1/admin/Banner/Category/AddBanner",
  addSlot: "api/v1/admin/slot",
  addOffer: "api/v1/admin/Offer/addOffer",
  addCoupom: "api/v1/admin/Coupan/addCoupan",
  addNotification: "api/v1/admin/notifications",
  addPrivacyPolicy: "api/v1/static/createPrivacy",
  addterms: "api/v1/static/createTerms",
  addFaq: "api/v1/static/faq/createFaq",
  addcontactdetails: "api/v1/admin/addContactDetails",
  addsubadmin: "api/v1/admin/partner/registration",
  addsubadminpermission: "api/v1/admin/addPermissions",
  addcity: "api/v1/admin/city/cities",
  // Hub
  getHub: "api/v1/admin/hubs",
  addHub: "api/v1/admin/hubs",
  updateHub: (id) => `api/v1/admin/hubs/${id}`,
  deleteHub: (id) => `api/v1/admin/hubs/${id}`,
  getHubAreas: (hubId) => `api/v1/admin/hubs/${hubId}/areas`,
  getHubAnalytics: ({ cityId, mainCategoryId, hubAreaId, active }) =>
    `api/v1/admin/hubs/analytics?cityId=${cityId || ""}&mainCategoryId=${mainCategoryId || ""
    }&hubAreaId=${hubAreaId || ""}&active=${active}`,
  // Partner Hub
  getPartnerHub: (partnerId) => `api/v1/admin/partner/${partnerId}/hub`,
  removePartnerFromHub: (hubId, hubAreaId, partnerId) => `api/v1/admin/hubs/${hubId}/areas/${hubAreaId}/partners/${partnerId}`,
  addBulkPartnersToHub: (hubId, hubAreaId) =>
    `api/v1/admin/hubs/${hubId}/areas/${hubAreaId}/partners/bulk`,
  addarea: "api/v1/admin/area/areas",
  addCharge: "api/v1/admin/Charges/addCharges",
  addTraningvideo: "api/v1/partner-trainings",
  addTestimonial: "api/v1/admin-testimonial",
  addInsurance: "api/v1/admin/insurance-plans",
  addSubscription: "api/v1/admin/createSubscription",
  addExamPlan: "api/v1/admin/examPlan",
  addaboutus: "api/v1/static/createAboutus",

  addServiceLocation: (id) => `api/v1/admin/services/${id}/add-location`,
  updateserviceLocationandPrice: (id, ids) =>
    `api/v1/admin/services/${id}/update-location/${ids}`,
  addPackageLocationandPrice: (id) => `api/v1/admin/package/${id}/add-location`,
  updatePackageLocationandPrice: (id, ids) =>
    `api/v1/admin/package/${id}/update-location/${ids}`,
  assignPartnerToService: (id, ids) => `api/v1/admin/assignOrder/${id}/${ids}`,

  updateMaincategory: (id) => `api/v1/admin/mainCategory/updateCategory/${id}`,
  updateUserStatus: (id) => `api/v1/admin/update/user/${id}`,
  updateMaincategoryType: (id) =>
    `api/v1/admin/MainCategoryType/updateCategory/${id}`,
  updatecategory: (id) => `api/v1/admin/Category/update/${id}`,
  updatesubcategory: (id) => `api/v1/admin/SubCategory/update/${id}`,
  updateservice: (id) => `api/v1/admin/Service/update/${id}`,
  updateserviceimg: (id) => `api/v1/admin/Service/uploadService/${id}`,
  updatepackageimg: (id) => `api/v1/admin/Package/uploadService/${id}`,
  updateSlot: (id) => `api/v1/admin/slot/${id}`,
  updateSkillresult: (id) => `api/v1/admin/book-session/${id}`,
  updatePrivacyPolicy: (id) => `api/v1/static/privacy/${id}`,
  updateTerms: (id) => `api/v1/static/terms/${id}`,
  updateFAQ: (id) => `api/v1/static/faq/${id}`,
  updateCloseTicket: (id) => `api/v1/admin/closeTicket/${id}`,
  updatesubadmin: (id) => `api/v1/admin/update/user/${id}`,
  updatesubadminimage: (id) => `api/v1/admin/upload-profile-picture/${id}`,
  updatecity: (id) => `api/v1/admin/city/cities/${id}`,
  updatearea: (id) => `api/v1/admin/area/areas/${id}`,
  updatecharges: (id) => `api/v1/admin/Charges/updateCharges/${id}`,
  updatetraningvideos: (id) => `api/v1/partner-trainings/${id}`,
  updatetestimonial: (id) => `api/v1/admin/testimonials/${id}`,
  updateleaves: (id) => `api/v1/admin/approve-leave/${id}`,
  updateleaves1: (id) => `api/v1/admin/cancel-leave/${id}`,
  updateInsurance: (id) => `api/v1/admin/insurance-plans/${id}`,
  updatePackage: (id) => `api/v1/admin/Package/update/${id}`,
  updateadminprofile: "api/v1/admin/update",
  updateadminprofileimg: (id) => `api/v1/admin/upload-profile-picture/${id}`,
  updateminimumcartamount: "api/v1/admin/update-minimum-cart-amount",
  updatePayoutStatus: (id) =>
    `api/v1/admin/wallet/updatePayoutTransaction/${id}`,
  updateRefund: (id) => `api/v1/admin/wallet/updatePaymentStatus/${id}`,
  updateaboutus: (id) => `api/v1/static/aboutUs/${id}`,
  updateSubsacription: (id) => `api/v1/admin/updateSubscription/${id}`,

  deleteuser: (id) => `api/v1/admin/users/profile/delete/${id}`,
  deleteplan: (id) => `api/v1/admin/deleteSubscription/${id}`,
  deleteExamPlan: (id) => `api/v1/admin/examPlan/${id}`,
  deletebanner: (id) => `api/v1/admin/Banner/deleteBanner/${id}`,
  deletemaincategorybanner: (id) =>
    `api/v1/admin/Banner/deleteBanner/mainCategory/${id}`,
  deletecategorybanner: (id) =>
    `api/v1/admin/Banner/deleteBanner/Category/${id}`,
  deletemaincategory: (id) => `api/v1/admin/mainCategory/deleteCategory/${id}`,
  deletecategory: (id) => `api/v1/admin/Category/delete/${id}`,
  deletemaincategorytype: (id) =>
    `api/v1/admin/MainCategoryType/deleteCategory/${id}`,
  deletesubcategory: (id) => `api/v1/admin/SubCategory/delete/${id}`,
  deleteservice: (id) => `api/v1/admin/Service/delete/${id}`,
  deleteslote: (id) => `api/v1/admin/slot/${id}`,
  deletesession: (id) => `api/v1/admin/book-session/${id}`,
  deletenotification: (id) => `api/v1/admin/notifications/delete/${id}`,
  deleteprivacypolicy: (id) => `api/v1/static/privacy/${id}`,
  deleteterms: (id) => `api/v1/static/terms/${id}`,
  deletefaq: (id) => `api/v1/static/faq/${id}`,
  deletecity: (id) => `api/v1/admin/city/cities/${id}`,
  deletearea: (id) => `api/v1/admin/area/areas/${id}`,
  deleteCharges: (id) => `api/v1/admin/Charges/deleteCharges/${id}`,
  deleteTestimonial: (id) => `api/v1/admin/testimonials/${id}`,
  deleteinsurance: (id) => `api/v1/admin/insurance-plans/${id}`,
  deletepackage: (id) => `api/v1/admin/Package/delete/${id}`,
  deleteaboutus: (id) => `api/v1/static/aboutUs/${id}`,
  deleteAllnotification: `api/v1/admin/notifications/delete/all`,

  getuserbyid: (id) => `api/v1/admin/getProfileById?user=${id}`,
  getuserbookingbyid: (id) => `api/v1/admin/orders/user/${id}`,
  getpartnerbookingbyid: (id) => `api/v1/admin/orders/partner/${id}`,
  getuserwalletbyid: (id, page, limit, type) =>
    `api/v1/admin/wallet/allTransactionUser?user=${id}&page=${page}&limit=${limit}`,

  getpartnerbyid: (id) => `api/v1/admin/getProfileById?partner=${id}`,
  getbookingbyid: (id) => `api/v1/admin/orders/${id}`,
  getplanbyid: (id) => `api/v1/admin/getSubscriptionById/${id}`,
  getcategorybymaincategoryid: (id) =>
    `api/v1/admin/Category/allCategory/${id}`,
  getsubcategorybycategoryid: (id, categoryid) =>
    `api/v1/admin/SubCategory/${id}/${categoryid}`,
  getservicebymaincategorysubcategorycategoryid: (
    id,
    categoryid,
    subcategoryid
  ) => `api/v1/admin/Service/${id}/${categoryid}/${subcategoryid}`,
  getsubcategorybyid: (id) => `api/v1/admin/getSubCategoryById/${id}`,
  getservicebyid: (id) => `api/v1/admin/Service/${id}`,
  getmaincategorytypebymaincategoryid: (id) =>
    `api/v1/admin/MainCategoryType/getMainCategoryTypeByMainCateogry/${id}`,

  getbannerbyid: (id) => `api/v1/admin/Banner/getBannerById/${id}`,
  getpackagebyid: (id) => `api/v1/admin/Package/${id}`,
  getTransactionbyuserid: (id, page, limit) =>
    `api/v1/admin/wallet/allTransactionUser?user=${id}&walletTransction=true&page=${page}&limit=${limit}`,
  getmaincategorybyid: (id) =>
    `api/v1/admin/mainCategory/getMainCategoryById/${id}`,

  newuserRecuitment: (page, limit, search, year, month) =>
    `api/v1/admin/getUsersByTypeAndDate?page=${page}&limit=${limit}&search=${search ? search : ""
    }&year=${year}&month=${month}`,
  absentuser: (page, limit, search) =>
    `admin/getUsersNotInAttendanceLastTwoMonths?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  downloadabsentuser: "api/v1/admin/downloadAbsentUsersLastTwoMonths",
  totalDeploymentDaily: "api/v1/admin/totalDeploymentDaily",
  siteWiseAttendance: "api/v1/admin/getSiteWiseAttendance",
  getEarlyCheckoutCount: "admin/getEarlyCheckoutCount",
  getLateAttendanceCount: "admin/getLateAttendanceCount",
  doubleDutyDaily: "api/v1/admin/doubleDutyDaily",
  users: (page, limit, search) =>
    `api/v1/admin/getAllUser?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  getAllSiteReports: (page, limit, search, year, month) =>
    `api/v1/admin/getAllSiteReports?page=${page}&limit=${limit}&search=${search ? search : ""
    }&year=${year}&month=${month}`,
  getSiteReportById: (id) => `api/v1/admin/getSiteReportById/${id}`,
  updateVisitSiteReport: (id) => `admin/updateVisitSiteReport/${id}`,
  countUniqueSiteIds: "admin/countUniqueSiteIds",
  getMonthlyDeployment: (page, limit, search, year, month) =>
    `api/v1/admin/getMonthlyDeployment?page=${page}&limit=${limit}&search=${search ? search : ""
    }&year=${year}&month=${month}`,

  getAllPendingRegularization: (page, limit, search) =>
    `admin/getAllPendingRegularization?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  updateRegularizationStatus: "admin/updateRegularizationStatus",
  getAllManualAttendance: (page, limit, search) =>
    `admin/getAllManualAttendance?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  getAllSiteDetails: "api/v1/admin/getAllSiteDetails",
  New_addSiteDetailsAdmin_new: "api/v1/admin/addSiteDetailsAdmin",
  updateSiteDetails: (id) => `api/v1/admin/updateSiteDetails/${id}`,
  getSiteDetailsById: (id) => `api/v1/admin/getSiteDetailsById/${id}`,

  deleteSiteDetailsById: (id) => `api/v1/admin/deleteSiteDetailsById/${id}`,
  getUserById: (id) => `api/v1/admin/getUserById/${id}`,

  getAllUpdateRequests: (page, limit, search) =>
    `api/v1/admin/getAllUpdateRequests?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  approveUpdateProfile: "api/v1/admin/approveUpdateProfile",
  rejectUpdateProfile: "api/v1/admin/rejectUpdateProfile",
  getAllLeave: (page, limit, search) =>
    `api/v1/admin/getAllLeave?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  pushNotification: "api/v1/admin/pushNotification",
  getSiteWiseDailyDeployment: (page, limit, search) =>
    `api/v1/admin/getSiteWiseDailyDeployment?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  getEarlyCheckoutUsers: (page, limit, search) =>
    `admin/getEarlyCheckoutUsers?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  dailypresent: (page, limit, search) =>
    `api/v1/admin/getSiteWiseAttendance?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  doubleduty: (page, limit, search) =>
    `admin/getUsersWithMultipleAttendance?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  getLateAttendances: (page, limit, search) =>
    `admin/getLateAttendances?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
  getUsersBySiteId: (id) => `admin/getUsersBySiteId/${id}`,
  addUser: "api/v1/admin/addUser",
  getAllUniqueSiteIds: (page, limit, search) =>
    `admin/getAllUniqueSiteIds?page=${page}&limit=${limit}&search=${search ? search : ""
    }`,
};

export default endPoints;

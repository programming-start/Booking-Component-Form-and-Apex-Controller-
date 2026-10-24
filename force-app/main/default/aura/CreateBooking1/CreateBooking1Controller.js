// ({
//     doInit: function(component, event, helper){
//      var action=component.get("c.getPlotAllDetails");  
//         action.setParams({'recId':  component.get('v.plotId') });
//         action.setCallback(this,function(response){
//             if(response.getState()=="SUCCESS"){
//                 var plots = response.getReturnValue();
//                 component.set("v.showNextCmp",true);
//                 component.set("v.PlotRecord",plots);
//                 if(plots.Status__c === 'Available' || plots.Status__c === 'Reserved'){
//                     component.set("v.checkBookedOrNot",true);
//                     //alert('hellooo');
//                 }
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     searchText1 : function(component, event, helper){
//         var plot= component.get('v.plots');
//         component.set('v.showCostSheet',false);
//         var searchText1= component.get('v.searchText1');
//         console.log(searchText1.length)
//         if(searchText1.length < 1){
//             console.log(searchText1)
//         }
//         var matchplots=[];
//         if(searchText1 !=''){
//             for(var i=0;i<plot.length; i++){ 
//                 if(plot[i].Name.toLowerCase().indexOf(searchText1.toLowerCase())  != -1  ){
//                     if(matchplots.length <50){
//                         matchplots.push( plot[i] );
//                     }else{
//                         break;
//                     }
//                 } 
//             } 
//             if(matchplots.length >0){
//                 component.set('v.matchplots',matchplots);
//             }
//         }else{
//             component.set('v.matchplots',[]);
//         }
//     },
//     update1: function(component, event, helper) {
//         component.set('v.Showfields', false);
//         var edi =  event.currentTarget.dataset.id;
//         var plt= component.get('v.matchplots');
//         var selPlot= component.get('v.plots');
//         var oppPlot = component.get('v.oppPlot');
//         var opp = component.get("v.OppRecord");
        
//         for(var i=0;i<plt.length; i++){  
//             if(plt[i].Id ===  edi ){
//                 if(plt[i].Name!=null)
//                 {
//                     component.set('v.Showfields', true);
//                     component.set('v.searchText1', plt[i].Name);
//                     component.set('v.projectName', plt[i].Project__r.Name);
//                     component.set('v.flatNumber', plt[i].Name);
//                 }
//                 selPlot = plt[i];
//                 oppPlot.SLead__c = component.get('v.recordId');
//                 oppPlot.Plot__c = plt[i].Id;
//                 oppPlot.Project__c = plt[i].Project__r.Name;
//                 oppPlot.Property_Type__c = plt[i].Property_Type__c;
//                 oppPlot.Plot_Land_Area__c = plt[i].Plot_Land_Area__c;
//                 oppPlot.Rate_per_sqft__c = plt[i].Basic_Price__c;
//                 oppPlot.Unit_Facing_Direction__c = plt[i].Unit_Facing_Direction__c;
//                 component.set('v.GrandTotal',plt[i].Total_Cost__c);
//                 var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//                 oppPlot.Booking_Date__c = today;
//                 break;
//             } 
//         } 
//         component.set('v.showCostSheet',true);
//         component.set('v.plots', selPlot);
//         component.set('v.oppPlot',oppPlot);
//         component.set('v.matchplots',[]);
//     },
//     doSave: function(component,event,helper) {
//         if (helper.validate(component, event)) {
//             helper.save(component,event,helper);
//         }
//     },
//     handleNationalityChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI1", true);
//         } else {
//             component.set("v.isNRI1", false);
//         }
        
//     },
//     handleNationalityChange1 : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI2", true);
//         } else {
//             component.set("v.isNRI2", false);
//         }
        
//     },
//     handleReferredbyChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'Customer') {
//             component.set("v.IsEmployeeReferral", false);
//             component.set("v.IsCustomerReferral", true);
//         } else if(selectedValue === 'Employee'){
//             component.set("v.IsEmployeeReferral", true);
//             component.set("v.IsCustomerReferral", false);
//         }
//             else{
//                 component.set("v.IsEmployeeReferral", false);
//                 component.set("v.IsCustomerReferral", false);
//             }
//     },
//     closeModel: function(component, event, helper) {
//         var overlayLib = component.find("overlayLib");
//         if (overlayLib) {
//             overlayLib.notifyClose();
//         }
//     },
//     getChangeOrgType: function(component, event, helper){
//         var selectedValue = component.find("orgType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue',true);
//         }
//     },
//     getChangeIndusType: function(component, event, helper){
//         var selectedValue = component.find("indusType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue2',true);
//         }
//     },
//     handleSecondApplicantChange: function (cmp, event, helper){
//         let secondApplicantName = cmp.find("secondApplicantName").get("v.value");
//         alert('secondApplicantName > ' + secondApplicantName);
//         if(secondApplicantName != '' && secondApplicantName !=null){
//             cmp.set("v.is2ndAppRequired", true);
//         }
//         else{
//             cmp.set("v.is2ndAppRequired", false);
//         }
//     },
//     handlePaymentScheduleFileChange: function(component, event, helper) {
//         var files = event.getSource().get("v.files");
//         if(!files || files.length === 0){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             return;
//         }
//         var selectedFile = files[0];
//         var maxFileSizeBytes = 4 * 1024 * 1024; // 4 MB
//         if(selectedFile.size > maxFileSizeBytes){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form must be less than 4 MB.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             return;
//         }
//         var fileReader = new FileReader();
//         fileReader.onloadend = $A.getCallback(function() {
//             var base64Data = fileReader.result.split(',')[1];
//             component.set('v.paymentScheduleFileName', selectedFile.name);
//             component.set('v.paymentScheduleFileBase64', base64Data);
//         });
//         fileReader.readAsDataURL(selectedFile);
//     },
//     handleError: function(component, event, helper) {
//         //alert('handle error');
//         var errors = event.getParams("error");
//         if (errors) {
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "An error occurred while saving the record.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(errors);
//         }
//         component.set('v.buttonDisable',false);
//     },
//     handleSubmit: function(component, event, helper) {
//         event.preventDefault(); // Prevent default submit
//         var fields = event.getParam("fields");
//         var dobField = component.find("dobField").get("v.value");
//         component.set('v.buttonDisable',true);
        
//         if(!fields.Salutation__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Salutation of 1st Applicant is Mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!fields.First_Applicant_Name__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "First Applicant Name required.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!component.get('v.paymentScheduleFileBase64')) {
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form upload is mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } 
//                 else {
//             var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//             var plotDetails = component.get('v.PlotRecord');
//             var projectRecord = component.get('v.projectRecord');
//             fields["Plot__c"] = component.get('v.plotId');
//             fields["Plot_Land_Area__c"] = plotDetails.Plot_Land_Area__c;
//             fields["Rate_per_sqft__c"] = plotDetails.Basic_Price__c;
//             fields["Project__c"] = component.get("v.projectName");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["Sales_User__c"] = $A.get("$SObjectType.CurrentUser.Id");
//             fields["Booking_Date__c"] = today;
//             fields["CRM_Manager__c"] = projectRecord.CRM_Manager__c;
//             fields["Finance_User__c"] = projectRecord.Finance_User__c;
//             fields["Unit_Facing_Direction__c"] = plotDetails.Unit_Facing_Direction__c;
//             component.find('myform').submit(fields); // Submit form if valid
//         }
//     },
    
//     /*handleSuccess: function(component, event, helper) {
//         var record = event.getParam("response");
//         var myRecordId = record.id;              // ID of updated or created record
//         component.set('v.spinner',false);
//         component.set('v.buttonDisable',false);
//         window.location.reload();  // Optionally reload the page after closing the modal
//     }*/
//    handleSuccess: function(component, event, helper) {
//     var record = event.getParam("response");
//     var myRecordId = record.id;
//     component.set('v.spinner', true);

//     var navigateToBooking = function() {
//         component.set('v.spinner', false);
//         component.set('v.buttonDisable', false);
//         // Check if force:navigateToSObject is available
//         var navEvt = $A.get("e.force:navigateToSObject");
//         if (navEvt) {
//             navEvt.setParams({
//                 "recordId": myRecordId,
//                 "slideDevName": "detail"
//             });
//             navEvt.fire();
//         } else {
//             // Fallback for Visualforce context
//             window.location.href = '/' + myRecordId;
//         }
//     };

//     var uploadAction = component.get("c.uploadPaymentScheduleFile");
//     uploadAction.setParams({
//         'bookingId': myRecordId,
//         'fileName': component.get('v.paymentScheduleFileName'),
//         'base64Data': component.get('v.paymentScheduleFileBase64')
//     });
//     uploadAction.setCallback(this, function(response) {
//         if(response.getState() !== "SUCCESS"){
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Booking saved but Payment Schedule Form upload failed. Please upload it manually on the Booking.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(response.getError());
//         }
//         navigateToBooking();
//     });
//     $A.enqueueAction(uploadAction);
// }
// })

// ===================================================================================================================================================
// ==========================================================Added by Sivam V =========================================================================

// ({
//     doInit: function(component, event, helper){
//         // Channel Partner on Booking : Yes / No options for the radio (added 22-09-2026)
//         component.set("v.channelPartnerOptions", [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);
//      var action=component.get("c.getPlotAllDetails");  
//         action.setParams({'recId':  component.get('v.plotId') });
//         action.setCallback(this,function(response){
//             if(response.getState()=="SUCCESS"){
//                 var plots = response.getReturnValue();
//                 component.set("v.showNextCmp",true);
//                 component.set("v.PlotRecord",plots);
//                 if(plots.Status__c === 'Available' || plots.Status__c === 'Reserved'){
//                     component.set("v.checkBookedOrNot",true);
//                     //alert('hellooo');
//                 }
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     searchText1 : function(component, event, helper){
//         var plot= component.get('v.plots');
//         component.set('v.showCostSheet',false);
//         var searchText1= component.get('v.searchText1');
//         console.log(searchText1.length)
//         if(searchText1.length < 1){
//             console.log(searchText1)
//         }
//         var matchplots=[];
//         if(searchText1 !=''){
//             for(var i=0;i<plot.length; i++){ 
//                 if(plot[i].Name.toLowerCase().indexOf(searchText1.toLowerCase())  != -1  ){
//                     if(matchplots.length <50){
//                         matchplots.push( plot[i] );
//                     }else{
//                         break;
//                     }
//                 } 
//             } 
//             if(matchplots.length >0){
//                 component.set('v.matchplots',matchplots);
//             }
//         }else{
//             component.set('v.matchplots',[]);
//         }
//     },
//     update1: function(component, event, helper) {
//         component.set('v.Showfields', false);
//         var edi =  event.currentTarget.dataset.id;
//         var plt= component.get('v.matchplots');
//         var selPlot= component.get('v.plots');
//         var oppPlot = component.get('v.oppPlot');
//         var opp = component.get("v.OppRecord");
        
//         for(var i=0;i<plt.length; i++){  
//             if(plt[i].Id ===  edi ){
//                 if(plt[i].Name!=null)
//                 {
//                     component.set('v.Showfields', true);
//                     component.set('v.searchText1', plt[i].Name);
//                     component.set('v.projectName', plt[i].Project__r.Name);
//                     component.set('v.flatNumber', plt[i].Name);
//                 }
//                 selPlot = plt[i];
//                 oppPlot.SLead__c = component.get('v.recordId');
//                 oppPlot.Plot__c = plt[i].Id;
//                 oppPlot.Project__c = plt[i].Project__r.Name;
//                 oppPlot.Property_Type__c = plt[i].Property_Type__c;
//                 oppPlot.Plot_Land_Area__c = plt[i].Plot_Land_Area__c;
//                 oppPlot.Rate_per_sqft__c = plt[i].Basic_Price__c;
//                 oppPlot.Unit_Facing_Direction__c = plt[i].Unit_Facing_Direction__c;
//                 component.set('v.GrandTotal',plt[i].Total_Cost__c);
//                 var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//                 oppPlot.Booking_Date__c = today;
//                 break;
//             } 
//         } 
//         component.set('v.showCostSheet',true);
//         component.set('v.plots', selPlot);
//         component.set('v.oppPlot',oppPlot);
//         component.set('v.matchplots',[]);
//     },
//     doSave: function(component,event,helper) {
//         if (helper.validate(component, event)) {
//             helper.save(component,event,helper);
//         }
//     },
//     handleNationalityChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI1", true);
//         } else {
//             component.set("v.isNRI1", false);
//         }
        
//     },
//     handleNationalityChange1 : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI2", true);
//         } else {
//             component.set("v.isNRI2", false);
//         }
        
//     },
//     handleReferredbyChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'Customer') {
//             component.set("v.IsEmployeeReferral", false);
//             component.set("v.IsCustomerReferral", true);
//         } else if(selectedValue === 'Employee'){
//             component.set("v.IsEmployeeReferral", true);
//             component.set("v.IsCustomerReferral", false);
//         }
//             else{
//                 component.set("v.IsEmployeeReferral", false);
//                 component.set("v.IsCustomerReferral", false);
//             }
//     },
//     closeModel: function(component, event, helper) {
//         var overlayLib = component.find("overlayLib");
//         if (overlayLib) {
//             overlayLib.notifyClose();
//         }
//     },
//     getChangeOrgType: function(component, event, helper){
//         var selectedValue = component.find("orgType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue',true);
//         }
//     },
//     getChangeIndusType: function(component, event, helper){
//         var selectedValue = component.find("indusType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue2',true);
//         }
//     },
//     handleSecondApplicantChange: function (cmp, event, helper){
//         let secondApplicantName = cmp.find("secondApplicantName").get("v.value");
//         alert('secondApplicantName > ' + secondApplicantName);
//         if(secondApplicantName != '' && secondApplicantName !=null){
//             cmp.set("v.is2ndAppRequired", true);
//         }
//         else{
//             cmp.set("v.is2ndAppRequired", false);
//         }
//     },
//     handlePaymentScheduleFileChange: function(component, event, helper) {
//         var files = event.getSource().get("v.files");
//         if(!files || files.length === 0){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             return;
//         }
//         var selectedFile = files[0];
//         var maxFileSizeBytes = 4 * 1024 * 1024; // 4 MB
//         if(selectedFile.size > maxFileSizeBytes){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form must be less than 4 MB.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             return;
//         }
//         var fileReader = new FileReader();
//         fileReader.onloadend = $A.getCallback(function() {
//             var base64Data = fileReader.result.split(',')[1];
//             component.set('v.paymentScheduleFileName', selectedFile.name);
//             component.set('v.paymentScheduleFileBase64', base64Data);
//         });
//         fileReader.readAsDataURL(selectedFile);
//     },
//     // Channel Partner on Booking : added 22-09-2026 starts
//     handleChannelPartnerToggle : function(component, event, helper) {
//         if (event.getParam("value") !== 'Yes') {
//             helper.resetChannelPartnerState(component);
//         }
//     },
//     handleChannelPartnerCodeChange : function(component, event, helper) {
//         // A changed code is not verified until the lookup runs again
//         component.set("v.channelPartnerName", '');
//         component.set("v.verifiedChannelPartnerCode", '');
//         component.set("v.channelPartnerError", '');
//     },
//     handleChannelPartnerCodeBlur : function(component, event, helper) {
//         var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
//         if (channelPartnerCode && channelPartnerCode !== component.get("v.verifiedChannelPartnerCode")) {
//             helper.lookupChannelPartner(component, channelPartnerCode);
//         }
//     },
//     // Channel Partner on Booking : added 22-09-2026 ends
//     handleError: function(component, event, helper) {
//         //alert('handle error');
//         var errors = event.getParams("error");
//         if (errors) {
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "An error occurred while saving the record.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(errors);
//         }
//         component.set('v.buttonDisable',false);
//     },
//     handleSubmit: function(component, event, helper) {
//         event.preventDefault(); // Prevent default submit
//         var fields = event.getParam("fields");
//         var dobField = component.find("dobField").get("v.value");
//         component.set('v.buttonDisable',true);
        
//         if(!fields.Salutation__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Salutation of 1st Applicant is Mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!fields.First_Applicant_Name__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "First Applicant Name required.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!component.get('v.paymentScheduleFileBase64')) {
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form upload is mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } 
//                 else {
//             var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//             var plotDetails = component.get('v.PlotRecord');
//             var projectRecord = component.get('v.projectRecord');
//             fields["Plot__c"] = component.get('v.plotId');
//             fields["Plot_Land_Area__c"] = plotDetails.Plot_Land_Area__c;
//             fields["Rate_per_sqft__c"] = plotDetails.Basic_Price__c;
//             fields["Project__c"] = component.get("v.projectName");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["Sales_User__c"] = $A.get("$SObjectType.CurrentUser.Id");
//             fields["Booking_Date__c"] = today;
//             fields["CRM_Manager__c"] = projectRecord.CRM_Manager__c;
//             fields["Finance_User__c"] = projectRecord.Finance_User__c;
//             fields["Unit_Facing_Direction__c"] = plotDetails.Unit_Facing_Direction__c;
//             // Channel Partner on Booking : added 22-09-2026 starts
//             // A verified code stamps By_Adissia_CP__c + Channel_Partner_Code__c; a blank / invalid code never blocks the booking
//             var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
//             var isChannelPartnerBooking = component.get("v.byChannelPartner") === 'Yes' && channelPartnerCode !== '';
//             var submitBooking = function() {
//                 if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") === channelPartnerCode) {
//                     fields["By_Adissia_CP__c"] = true;
//                     fields["Channel_Partner_Code__c"] = channelPartnerCode;
//                 }
//                 component.find('myform').submit(fields); // Submit form if valid
//             };
//             if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") !== channelPartnerCode) {
//                 // Code typed but not verified yet: check it first, then submit either way
//                 helper.lookupChannelPartner(component, channelPartnerCode, submitBooking);
//             } else {
//                 submitBooking();
//             }
//             // Channel Partner on Booking : added 22-09-2026 ends
//         }
//     },
    
//     /*handleSuccess: function(component, event, helper) {
//         var record = event.getParam("response");
//         var myRecordId = record.id;              // ID of updated or created record
//         component.set('v.spinner',false);
//         component.set('v.buttonDisable',false);
//         window.location.reload();  // Optionally reload the page after closing the modal
//     }*/
//    handleSuccess: function(component, event, helper) {
//     var record = event.getParam("response");
//     var myRecordId = record.id;
//     component.set('v.spinner', true);

//     var navigateToBooking = function() {
//         component.set('v.spinner', false);
//         component.set('v.buttonDisable', false);
//         // Check if force:navigateToSObject is available
//         var navEvt = $A.get("e.force:navigateToSObject");
//         if (navEvt) {
//             navEvt.setParams({
//                 "recordId": myRecordId,
//                 "slideDevName": "detail"
//             });
//             navEvt.fire();
//         } else {
//             // Fallback for Visualforce context
//             window.location.href = '/' + myRecordId;
//         }
//     };

//     var uploadAction = component.get("c.uploadPaymentScheduleFile");
//     uploadAction.setParams({
//         'bookingId': myRecordId,
//         'fileName': component.get('v.paymentScheduleFileName'),
//         'base64Data': component.get('v.paymentScheduleFileBase64')
//     });
//     uploadAction.setCallback(this, function(response) {
//         if(response.getState() !== "SUCCESS"){
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Booking saved but Payment Schedule Form upload failed. Please upload it manually on the Booking.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(response.getError());
//         }
//         navigateToBooking();
//     });
//     $A.enqueueAction(uploadAction);
// }
// })


// ==================================================================================================


// ({
//     doInit: function(component, event, helper){
//         // Channel Partner on Booking : Yes / No options for the radio (added 22-09-2026)
//         component.set("v.channelPartnerOptions", [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);
//      var action=component.get("c.getPlotAllDetails");  
//         action.setParams({'recId':  component.get('v.plotId') });
//         action.setCallback(this,function(response){
//             if(response.getState()=="SUCCESS"){
//                 var plots = response.getReturnValue();
//                 component.set("v.showNextCmp",true);
//                 component.set("v.PlotRecord",plots);
//                 if(plots.Status__c === 'Available' || plots.Status__c === 'Reserved'){
//                     component.set("v.checkBookedOrNot",true);
//                     //alert('hellooo');
//                 }
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     searchText1 : function(component, event, helper){
//         var plot= component.get('v.plots');
//         component.set('v.showCostSheet',false);
//         var searchText1= component.get('v.searchText1');
//         console.log(searchText1.length)
//         if(searchText1.length < 1){
//             console.log(searchText1)
//         }
//         var matchplots=[];
//         if(searchText1 !=''){
//             for(var i=0;i<plot.length; i++){ 
//                 if(plot[i].Name.toLowerCase().indexOf(searchText1.toLowerCase())  != -1  ){
//                     if(matchplots.length <50){
//                         matchplots.push( plot[i] );
//                     }else{
//                         break;
//                     }
//                 } 
//             } 
//             if(matchplots.length >0){
//                 component.set('v.matchplots',matchplots);
//             }
//         }else{
//             component.set('v.matchplots',[]);
//         }
//     },
//     update1: function(component, event, helper) {
//         component.set('v.Showfields', false);
//         var edi =  event.currentTarget.dataset.id;
//         var plt= component.get('v.matchplots');
//         var selPlot= component.get('v.plots');
//         var oppPlot = component.get('v.oppPlot');
//         var opp = component.get("v.OppRecord");
        
//         for(var i=0;i<plt.length; i++){  
//             if(plt[i].Id ===  edi ){
//                 if(plt[i].Name!=null)
//                 {
//                     component.set('v.Showfields', true);
//                     component.set('v.searchText1', plt[i].Name);
//                     component.set('v.projectName', plt[i].Project__r.Name);
//                     component.set('v.flatNumber', plt[i].Name);
//                 }
//                 selPlot = plt[i];
//                 oppPlot.SLead__c = component.get('v.recordId');
//                 oppPlot.Plot__c = plt[i].Id;
//                 oppPlot.Project__c = plt[i].Project__r.Name;
//                 oppPlot.Property_Type__c = plt[i].Property_Type__c;
//                 oppPlot.Plot_Land_Area__c = plt[i].Plot_Land_Area__c;
//                 oppPlot.Rate_per_sqft__c = plt[i].Basic_Price__c;
//                 oppPlot.Unit_Facing_Direction__c = plt[i].Unit_Facing_Direction__c;
//                 component.set('v.GrandTotal',plt[i].Total_Cost__c);
//                 var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//                 oppPlot.Booking_Date__c = today;
//                 break;
//             } 
//         } 
//         component.set('v.showCostSheet',true);
//         component.set('v.plots', selPlot);
//         component.set('v.oppPlot',oppPlot);
//         component.set('v.matchplots',[]);
//     },
//     doSave: function(component,event,helper) {
//         if (helper.validate(component, event)) {
//             helper.save(component,event,helper);
//         }
//     },
//     handleNationalityChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI1", true);
//         } else {
//             component.set("v.isNRI1", false);
//         }
        
//     },
//     handleNationalityChange1 : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'NRI') {
//             component.set("v.isNRI2", true);
//         } else {
//             component.set("v.isNRI2", false);
//         }
        
//     },
//     handleReferredbyChange : function(component,event,helper){
//         var selectedValue = event.getParam("value");
//         if (selectedValue === 'Customer') {
//             component.set("v.IsEmployeeReferral", false);
//             component.set("v.IsCustomerReferral", true);
//         } else if(selectedValue === 'Employee'){
//             component.set("v.IsEmployeeReferral", true);
//             component.set("v.IsCustomerReferral", false);
//         }
//             else{
//                 component.set("v.IsEmployeeReferral", false);
//                 component.set("v.IsCustomerReferral", false);
//             }
//     },
//     closeModel: function(component, event, helper) {
//         var overlayLib = component.find("overlayLib");
//         if (overlayLib) {
//             overlayLib.notifyClose();
//         }
//     },
//     getChangeOrgType: function(component, event, helper){
//         var selectedValue = component.find("orgType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue',true);
//         }
//     },
//     getChangeIndusType: function(component, event, helper){
//         var selectedValue = component.find("indusType").get("v.value");
//         if(selectedValue == 'Others'){
//             component.set('v.showTrue2',true);
//         }
//     },
//     handleSecondApplicantChange: function (cmp, event, helper){
//         let secondApplicantName = cmp.find("secondApplicantName").get("v.value");
//         alert('secondApplicantName > ' + secondApplicantName);
//         if(secondApplicantName != '' && secondApplicantName !=null){
//             cmp.set("v.is2ndAppRequired", true);
//         }
//         else{
//             cmp.set("v.is2ndAppRequired", false);
//         }
//     },
//     handlePaymentScheduleFileChange: function(component, event, helper) {
//         var files = event.getSource().get("v.files");
//         if(!files || files.length === 0){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             return;
//         }
//         var selectedFile = files[0];
//         var maxFileSizeBytes = 4 * 1024 * 1024; // 4 MB
//         if(selectedFile.size > maxFileSizeBytes){
//             component.set('v.paymentScheduleFileName', '');
//             component.set('v.paymentScheduleFileBase64', '');
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form must be less than 4 MB.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             return;
//         }
//         var fileReader = new FileReader();
//         fileReader.onloadend = $A.getCallback(function() {
//             var base64Data = fileReader.result.split(',')[1];
//             component.set('v.paymentScheduleFileName', selectedFile.name);
//             component.set('v.paymentScheduleFileBase64', base64Data);
//         });
//         fileReader.readAsDataURL(selectedFile);
//     },
//     // Channel Partner on Booking : added 22-09-2026 starts
//     handleChannelPartnerToggle : function(component, event, helper) {
//         if (event.getParam("value") !== 'Yes') {
//             helper.resetChannelPartnerState(component);
//         }
//     },
//     handleChannelPartnerCodeChange : function(component, event, helper) {
//         // A changed code is not verified until the lookup runs again
//         component.set("v.channelPartnerName", '');
//         component.set("v.verifiedChannelPartnerCode", '');
//         component.set("v.channelPartnerError", '');
//     },
//     handleChannelPartnerCodeBlur : function(component, event, helper) {
//         var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
//         if (channelPartnerCode && channelPartnerCode !== component.get("v.verifiedChannelPartnerCode")) {
//             helper.lookupChannelPartner(component, channelPartnerCode);
//         }
//     },
//     // Channel Partner on Booking : added 22-09-2026 ends
//     handleError: function(component, event, helper) {
//         //alert('handle error');
//         var errors = event.getParams("error");
//         if (errors) {
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "An error occurred while saving the record.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(errors);
//         }
//         component.set('v.buttonDisable',false);
//     },
//     handleSubmit: function(component, event, helper) {
//         event.preventDefault(); // Prevent default submit
//         var fields = event.getParam("fields");
//         var dobField = component.find("dobField").get("v.value");
//         component.set('v.buttonDisable',true);
        
//         if(!fields.Salutation__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Salutation of 1st Applicant is Mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!fields.First_Applicant_Name__c) {
//             // Show error message if necessary fields are missing
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "First Applicant Name required.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } else if(!component.get('v.paymentScheduleFileBase64')) {
//             component.set('v.buttonDisable',false);
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Payment Schedule Form upload is mandatory.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//         } 
//                 else {
//             // Added by Sivam 24-09-2026 starts
//             // A blank required field makes lightning:recordEditForm refuse the submit without firing
//             // onsuccess or onerror, so the Submit button stayed disabled for good. Check them here,
//             // tell the user which field is missing and release the button.
//             var requiredFieldLabels = {
//                 'Date_of_Birth__c': 'Date of Birth',
//                 'Nationality__c': 'Nationality',
//                 'Aadhaar_Number__c': 'Aadhaar Number',
//                 'PAN_Number__c': 'PAN Number',
//                 'Email__c': 'Email',
//                 'Contact_Number__c': 'Contact Number',
//                 'Marital_Status__c': 'Marital Status',
//                 'State__c': 'State',
//                 'District__c': 'District',
//                 'Permanent_Address__c': 'Permanent Address',
//                 'Organization_Type__c': 'Organization Type',
//                 'Industry__c': 'Industry'
//             };
//             if (component.get('v.isNRI1')) {
//                 requiredFieldLabels['Passport_PI_no__c'] = 'Passport / PI No of 1st Applicant';
//             }
//             if (component.get('v.is2ndAppRequired')) {
//                 requiredFieldLabels['Date_of_Birth3__c'] = 'Date of Birth of 2nd Applicant';
//                 requiredFieldLabels['Nationality1__c'] = 'Nationality of 2nd Applicant';
//                 requiredFieldLabels['Aadhaar1__c'] = 'Aadhaar Number of 2nd Applicant';
//                 requiredFieldLabels['PAN_Number1__c'] = 'PAN Number of 2nd Applicant';
//                 requiredFieldLabels['Email1__c'] = 'Email of 2nd Applicant';
//                 requiredFieldLabels['Mobile_Number_2__c'] = 'Mobile Number of 2nd Applicant';
//                 requiredFieldLabels['Marital_Status1__c'] = 'Marital Status of 2nd Applicant';
//             }
//             if (component.get('v.isNRI2')) {
//                 requiredFieldLabels['Passport_PI_no1__c'] = 'Passport / PI No of 2nd Applicant';
//             }
//             var missingFieldLabel = '';
//             for (var requiredFieldName in requiredFieldLabels) {
//                 if (!fields[requiredFieldName]) {
//                     missingFieldLabel = requiredFieldLabels[requiredFieldName];
//                     break;
//                 }
//             }
//             if (missingFieldLabel !== '') {
//                 component.set('v.buttonDisable', false);
//                 var missingFieldToast = $A.get("e.force:showToast");
//                 missingFieldToast.setParams({
//                     "title": "Error!",
//                     "message": missingFieldLabel + " is mandatory.",
//                     "type": "error"
//                 });
//                 missingFieldToast.fire();
//                 return;
//             }
//             // Added by Sivam 24-09-2026 ends
//             var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
//             var plotDetails = component.get('v.PlotRecord');
//             var projectRecord = component.get('v.projectRecord');
//             fields["Plot__c"] = component.get('v.plotId');
//             fields["Plot_Land_Area__c"] = plotDetails.Plot_Land_Area__c;
//             fields["Rate_per_sqft__c"] = plotDetails.Basic_Price__c;
//             fields["Project__c"] = component.get("v.projectName");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["SLead__c"] = component.get("v.leadId");
//             fields["Sales_User__c"] = $A.get("$SObjectType.CurrentUser.Id");
//             fields["Booking_Date__c"] = today;
//             fields["CRM_Manager__c"] = projectRecord.CRM_Manager__c;
//             fields["Finance_User__c"] = projectRecord.Finance_User__c;
//             fields["Unit_Facing_Direction__c"] = plotDetails.Unit_Facing_Direction__c;
//             // Channel Partner on Booking : added 22-09-2026 starts
//             // A verified code stamps By_Adissia_CP__c + Channel_Partner_Code__c; a blank / invalid code never blocks the booking
//             var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
//             var isChannelPartnerBooking = component.get("v.byChannelPartner") === 'Yes' && channelPartnerCode !== '';
//             var submitBooking = function() {
//                 if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") === channelPartnerCode) {
//                     fields["By_Adissia_CP__c"] = true;
//                     fields["Channel_Partner_Code__c"] = channelPartnerCode;
//                 }
//                 component.find('myform').submit(fields); // Submit form if valid
//             };
//             if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") !== channelPartnerCode) {
//                 // Code typed but not verified yet: check it first, then submit either way
//                 helper.lookupChannelPartner(component, channelPartnerCode, submitBooking);
//             } else {
//                 submitBooking();
//             }
//             // Channel Partner on Booking : added 22-09-2026 ends
//         }
//     },
    
//     /*handleSuccess: function(component, event, helper) {
//         var record = event.getParam("response");
//         var myRecordId = record.id;              // ID of updated or created record
//         component.set('v.spinner',false);
//         component.set('v.buttonDisable',false);
//         window.location.reload();  // Optionally reload the page after closing the modal
//     }*/
//    handleSuccess: function(component, event, helper) {
//     var record = event.getParam("response");
//     var myRecordId = record.id;
//     component.set('v.spinner', true);

//     var navigateToBooking = function() {
//         component.set('v.spinner', false);
//         component.set('v.buttonDisable', false);
//         // Check if force:navigateToSObject is available
//         var navEvt = $A.get("e.force:navigateToSObject");
//         if (navEvt) {
//             navEvt.setParams({
//                 "recordId": myRecordId,
//                 "slideDevName": "detail"
//             });
//             navEvt.fire();
//         } else {
//             // Fallback for Visualforce context
//             window.location.href = '/' + myRecordId;
//         }
//     };

//     var uploadAction = component.get("c.uploadPaymentScheduleFile");
//     uploadAction.setParams({
//         'bookingId': myRecordId,
//         'fileName': component.get('v.paymentScheduleFileName'),
//         'base64Data': component.get('v.paymentScheduleFileBase64')
//     });
//     uploadAction.setCallback(this, function(response) {
//         if(response.getState() !== "SUCCESS"){
//             var toastEvent = $A.get("e.force:showToast");
//             toastEvent.setParams({
//                 "title": "Error!",
//                 "message": "Booking saved but Payment Schedule Form upload failed. Please upload it manually on the Booking.",
//                 "type": "error"
//             });
//             toastEvent.fire();
//             console.error(response.getError());
//         }
//         navigateToBooking();
//     });
//     $A.enqueueAction(uploadAction)
// }
// })

// =================================================================================================================


({
    doInit: function(component, event, helper){
        // Channel Partner on Booking : Yes / No options for the radio (added 22-09-2026)
        component.set("v.channelPartnerOptions", [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);
     var action=component.get("c.getPlotAllDetails");  
        action.setParams({'recId':  component.get('v.plotId') });
        action.setCallback(this,function(response){
            if(response.getState()=="SUCCESS"){
                var plots = response.getReturnValue();
                component.set("v.showNextCmp",true);
                component.set("v.PlotRecord",plots);
                if(plots.Status__c === 'Available' || plots.Status__c === 'Reserved'){
                    component.set("v.checkBookedOrNot",true);
                    //alert('hellooo');
                }
            }
        });
        $A.enqueueAction(action);
    },
    searchText1 : function(component, event, helper){
        var plot= component.get('v.plots');
        component.set('v.showCostSheet',false);
        var searchText1= component.get('v.searchText1');
        console.log(searchText1.length)
        if(searchText1.length < 1){
            console.log(searchText1)
        }
        var matchplots=[];
        if(searchText1 !=''){
            for(var i=0;i<plot.length; i++){ 
                if(plot[i].Name.toLowerCase().indexOf(searchText1.toLowerCase())  != -1  ){
                    if(matchplots.length <50){
                        matchplots.push( plot[i] );
                    }else{
                        break;
                    }
                } 
            } 
            if(matchplots.length >0){
                component.set('v.matchplots',matchplots);
            }
        }else{
            component.set('v.matchplots',[]);
        }
    },
    update1: function(component, event, helper) {
        component.set('v.Showfields', false);
        var edi =  event.currentTarget.dataset.id;
        var plt= component.get('v.matchplots');
        var selPlot= component.get('v.plots');
        var oppPlot = component.get('v.oppPlot');
        var opp = component.get("v.OppRecord");
        
        for(var i=0;i<plt.length; i++){  
            if(plt[i].Id ===  edi ){
                if(plt[i].Name!=null)
                {
                    component.set('v.Showfields', true);
                    component.set('v.searchText1', plt[i].Name);
                    component.set('v.projectName', plt[i].Project__r.Name);
                    component.set('v.flatNumber', plt[i].Name);
                }
                selPlot = plt[i];
                oppPlot.SLead__c = component.get('v.recordId');
                oppPlot.Plot__c = plt[i].Id;
                oppPlot.Project__c = plt[i].Project__r.Name;
                oppPlot.Property_Type__c = plt[i].Property_Type__c;
                oppPlot.Plot_Land_Area__c = plt[i].Plot_Land_Area__c;
                oppPlot.Rate_per_sqft__c = plt[i].Basic_Price__c;
                oppPlot.Unit_Facing_Direction__c = plt[i].Unit_Facing_Direction__c;
                component.set('v.GrandTotal',plt[i].Total_Cost__c);
                var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
                oppPlot.Booking_Date__c = today;
                break;
            } 
        } 
        component.set('v.showCostSheet',true);
        component.set('v.plots', selPlot);
        component.set('v.oppPlot',oppPlot);
        component.set('v.matchplots',[]);
    },
    doSave: function(component,event,helper) {
        if (helper.validate(component, event)) {
            helper.save(component,event,helper);
        }
    },
    handleNationalityChange : function(component,event,helper){
        var selectedValue = event.getParam("value");
        if (selectedValue === 'NRI') {
            component.set("v.isNRI1", true);
        } else {
            component.set("v.isNRI1", false);
        }
        
    },
    handleNationalityChange1 : function(component,event,helper){
        var selectedValue = event.getParam("value");
        if (selectedValue === 'NRI') {
            component.set("v.isNRI2", true);
        } else {
            component.set("v.isNRI2", false);
        }
        
    },
    handleReferredbyChange : function(component,event,helper){
        var selectedValue = event.getParam("value");
        if (selectedValue === 'Customer') {
            component.set("v.IsEmployeeReferral", false);
            component.set("v.IsCustomerReferral", true);
        } else if(selectedValue === 'Employee'){
            component.set("v.IsEmployeeReferral", true);
            component.set("v.IsCustomerReferral", false);
        }
            else{
                component.set("v.IsEmployeeReferral", false);
                component.set("v.IsCustomerReferral", false);
            }
    },
    closeModel: function(component, event, helper) {
        var overlayLib = component.find("overlayLib");
        if (overlayLib) {
            overlayLib.notifyClose();
        }
    },
    getChangeOrgType: function(component, event, helper){
        var selectedValue = component.find("orgType").get("v.value");
        if(selectedValue == 'Others'){
            component.set('v.showTrue',true);
        }
    },
    getChangeIndusType: function(component, event, helper){
        var selectedValue = component.find("indusType").get("v.value");
        if(selectedValue == 'Others'){
            component.set('v.showTrue2',true);
        }
    },
    handleSecondApplicantChange: function (cmp, event, helper){
        let secondApplicantName = cmp.find("secondApplicantName").get("v.value");
        alert('secondApplicantName > ' + secondApplicantName);
        if(secondApplicantName != '' && secondApplicantName !=null){
            cmp.set("v.is2ndAppRequired", true);
        }
        else{
            cmp.set("v.is2ndAppRequired", false);
        }
    },
    handlePaymentScheduleFileChange: function(component, event, helper) {
        var files = event.getSource().get("v.files");
        if(!files || files.length === 0){
            component.set('v.paymentScheduleFileName', '');
            component.set('v.paymentScheduleFileBase64', '');
            return;
        }
        var selectedFile = files[0];
        var maxFileSizeBytes = 4 * 1024 * 1024; // 4 MB
        if(selectedFile.size > maxFileSizeBytes){
            component.set('v.paymentScheduleFileName', '');
            component.set('v.paymentScheduleFileBase64', '');
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "Payment Schedule Form must be less than 4 MB.",
                "type": "error"
            });
            toastEvent.fire();
            return;
        }
        var fileReader = new FileReader();
        fileReader.onloadend = $A.getCallback(function() {
            var base64Data = fileReader.result.split(',')[1];
            component.set('v.paymentScheduleFileName', selectedFile.name);
            component.set('v.paymentScheduleFileBase64', base64Data);
        });
        fileReader.readAsDataURL(selectedFile);
    },
    // Channel Partner on Booking : added 22-09-2026 starts
    handleChannelPartnerToggle : function(component, event, helper) {
        if (event.getParam("value") !== 'Yes') {
            helper.resetChannelPartnerState(component);
        }
    },
    handleChannelPartnerCodeChange : function(component, event, helper) {
        // A changed code is not verified until the lookup runs again
        component.set("v.channelPartnerName", '');
        component.set("v.verifiedChannelPartnerCode", '');
        component.set("v.channelPartnerError", '');
    },
    handleChannelPartnerCodeBlur : function(component, event, helper) {
        var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
        if (channelPartnerCode && channelPartnerCode !== component.get("v.verifiedChannelPartnerCode")) {
            helper.lookupChannelPartner(component, channelPartnerCode);
        }
    },
    // Channel Partner on Booking : added 22-09-2026 ends
    handleError: function(component, event, helper) {
        //alert('handle error');
        var errors = event.getParams("error");
        if (errors) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "An error occurred while saving the record.",
                "type": "error"
            });
            toastEvent.fire();
            console.error(errors);
        }
        component.set('v.buttonDisable',false);
    },
    handleSubmit: function(component, event, helper) {
        event.preventDefault(); // Prevent default submit
        var fields = event.getParam("fields");
        var dobField = component.find("dobField").get("v.value");
        component.set('v.buttonDisable',true);
        
        if(!fields.Salutation__c) {
            // Show error message if necessary fields are missing
            component.set('v.buttonDisable',false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "Salutation of 1st Applicant is Mandatory.",
                "type": "error"
            });
            toastEvent.fire();
        } else if(!fields.First_Applicant_Name__c) {
            // Show error message if necessary fields are missing
            component.set('v.buttonDisable',false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "First Applicant Name required.",
                "type": "error"
            });
            toastEvent.fire();
        } else if(!component.get('v.paymentScheduleFileBase64')) {
            component.set('v.buttonDisable',false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "Payment Schedule Form upload is mandatory.",
                "type": "error"
            });
            toastEvent.fire();
        } else if(!component.get('v.byChannelPartner')) {
            // Channel Partner made mandatory 26-09-2026 : Yes / No must be chosen
            component.set('v.buttonDisable',false);
            var channelPartnerToast = $A.get("e.force:showToast");
            channelPartnerToast.setParams({
                "title": "Error!",
                "message": "Please select whether this booking is By Channel Partner.",
                "type": "error"
            });
            channelPartnerToast.fire();
        } else if(component.get('v.byChannelPartner') === 'Yes' && (component.get('v.channelPartnerCode') || '').trim() === '') {
            // Channel Partner made mandatory 26-09-2026 : a code is required when Yes is selected
            component.set('v.buttonDisable',false);
            var channelPartnerCodeToast = $A.get("e.force:showToast");
            channelPartnerCodeToast.setParams({
                "title": "Error!",
                "message": "Channel Partner Code is mandatory when By Channel Partner is Yes.",
                "type": "error"
            });
            channelPartnerCodeToast.fire();
        } 
                else {
            // Added by Sivam 24-09-2026 starts
            // A blank required field makes lightning:recordEditForm refuse the submit without firing
            // onsuccess or onerror, so the Submit button stayed disabled for good. Check them here,
            // tell the user which field is missing and release the button.
            var requiredFieldLabels = {
                'Date_of_Birth__c': 'Date of Birth',
                'Nationality__c': 'Nationality',
                'Aadhaar_Number__c': 'Aadhaar Number',
                'PAN_Number__c': 'PAN Number',
                'Email__c': 'Email',
                'Contact_Number__c': 'Contact Number',
                'Marital_Status__c': 'Marital Status',
                'State__c': 'State',
                'District__c': 'District',
                'Permanent_Address__c': 'Permanent Address',
                'Organization_Type__c': 'Organization Type',
                'Industry__c': 'Industry'
            };
            if (component.get('v.isNRI1')) {
                requiredFieldLabels['Passport_PI_no__c'] = 'Passport / PI No of 1st Applicant';
            }
            if (component.get('v.is2ndAppRequired')) {
                requiredFieldLabels['Date_of_Birth3__c'] = 'Date of Birth of 2nd Applicant';
                requiredFieldLabels['Nationality1__c'] = 'Nationality of 2nd Applicant';
                requiredFieldLabels['Aadhaar1__c'] = 'Aadhaar Number of 2nd Applicant';
                requiredFieldLabels['PAN_Number1__c'] = 'PAN Number of 2nd Applicant';
                requiredFieldLabels['Email1__c'] = 'Email of 2nd Applicant';
                requiredFieldLabels['Mobile_Number_2__c'] = 'Mobile Number of 2nd Applicant';
                requiredFieldLabels['Marital_Status1__c'] = 'Marital Status of 2nd Applicant';
            }
            if (component.get('v.isNRI2')) {
                requiredFieldLabels['Passport_PI_no1__c'] = 'Passport / PI No of 2nd Applicant';
            }
            var missingFieldLabel = '';
            for (var requiredFieldName in requiredFieldLabels) {
                if (!fields[requiredFieldName]) {
                    missingFieldLabel = requiredFieldLabels[requiredFieldName];
                    break;
                }
            }
            if (missingFieldLabel !== '') {
                component.set('v.buttonDisable', false);
                var missingFieldToast = $A.get("e.force:showToast");
                missingFieldToast.setParams({
                    "title": "Error!",
                    "message": missingFieldLabel + " is mandatory.",
                    "type": "error"
                });
                missingFieldToast.fire();
                return;
            }
            // Added by Sivam 24-09-2026 ends
            var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
            var plotDetails = component.get('v.PlotRecord');
            var projectRecord = component.get('v.projectRecord');
            fields["Plot__c"] = component.get('v.plotId');
            fields["Plot_Land_Area__c"] = plotDetails.Plot_Land_Area__c;
            fields["Rate_per_sqft__c"] = plotDetails.Basic_Price__c;
            fields["Project__c"] = component.get("v.projectName");
            fields["SLead__c"] = component.get("v.leadId");
            fields["SLead__c"] = component.get("v.leadId");
            fields["Sales_User__c"] = $A.get("$SObjectType.CurrentUser.Id");
            fields["Booking_Date__c"] = today;
            fields["CRM_Manager__c"] = projectRecord.CRM_Manager__c;
            fields["Finance_User__c"] = projectRecord.Finance_User__c;
            fields["Unit_Facing_Direction__c"] = plotDetails.Unit_Facing_Direction__c;
            // Channel Partner on Booking : added 22-09-2026 starts
            // A verified code stamps By_Adissia_CP__c + Channel_Partner_Code__c; a blank / invalid code never blocks the booking
            var channelPartnerCode = (component.get("v.channelPartnerCode") || '').trim();
            var isChannelPartnerBooking = component.get("v.byChannelPartner") === 'Yes' && channelPartnerCode !== '';
            var submitBooking = function() {
                if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") === channelPartnerCode) {
                    fields["By_Adissia_CP__c"] = true;
                    fields["Channel_Partner_Code__c"] = channelPartnerCode;
                }
                component.find('myform').submit(fields); // Submit form if valid
            };
            if (isChannelPartnerBooking && component.get("v.verifiedChannelPartnerCode") !== channelPartnerCode) {
                // Code typed but not verified yet: check it first, then submit either way
                helper.lookupChannelPartner(component, channelPartnerCode, submitBooking);
            } else {
                submitBooking();
            }
            // Channel Partner on Booking : added 22-09-2026 ends
        }
    },
    
    /*handleSuccess: function(component, event, helper) {
        var record = event.getParam("response");
        var myRecordId = record.id;              // ID of updated or created record
        component.set('v.spinner',false);
        component.set('v.buttonDisable',false);
        window.location.reload();  // Optionally reload the page after closing the modal
    }*/
   handleSuccess: function(component, event, helper) {
    var record = event.getParam("response");
    var myRecordId = record.id;
    component.set('v.spinner', true);

    var navigateToBooking = function() {
        component.set('v.spinner', false);
        component.set('v.buttonDisable', false);
        // Check if force:navigateToSObject is available
        var navEvt = $A.get("e.force:navigateToSObject");
        if (navEvt) {
            navEvt.setParams({
                "recordId": myRecordId,
                "slideDevName": "detail"
            });
            navEvt.fire();
        } else {
            // Fallback for Visualforce context
            window.location.href = '/' + myRecordId;
        }
    };

    var uploadAction = component.get("c.uploadPaymentScheduleFile");
    uploadAction.setParams({
        'bookingId': myRecordId,
        'fileName': component.get('v.paymentScheduleFileName'),
        'base64Data': component.get('v.paymentScheduleFileBase64')
    });
    uploadAction.setCallback(this, function(response) {
        if(response.getState() !== "SUCCESS"){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!",
                "message": "Booking saved but Payment Schedule Form upload failed. Please upload it manually on the Booking.",
                "type": "error"
            });
            toastEvent.fire();
            console.error(response.getError());
        }
        navigateToBooking();
    });
    $A.enqueueAction(uploadAction)
}
})
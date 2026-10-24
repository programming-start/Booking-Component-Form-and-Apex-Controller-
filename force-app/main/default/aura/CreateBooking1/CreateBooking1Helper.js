// ({
//     validate: function(component, event) {
//         var isValid = true;
//         var oppPlot = component.get('v.oppPlot');
//         console.log(oppPlot)
//         if(oppPlot.Plot__c == null){
//             isValid = false;
//             alert('Please select Plot.');
//         }
//         return isValid;
//     },
//     save  : function(component, event, helper){
//         var action=component.get("c.saveBooking");  
//         action.setParams({
//             oppPlot:component.get("v.oppPlot"),
//         });
//         action.setCallback(this,function(response){
//             if(response.getState()=="SUCCESS"){ 
//                 var bookingId = response.getReturnValue();
//                 component.set("v.bookingId",bookingId);
//                 if(bookingId != 'notc'){
//                     component.set('v.spinner',false);
//                     helper.showToast("Success","Success","Booking Created Successfully");
//                     var navEvt = $A.get("e.force:navigateToSObject");
//                     navEvt.setParams({
//                         "recordId": component.get('v.bookingId'),
//                         "slideDevName": "detail"
//                     });
//                     navEvt.fire();
//                 }
//                 else{
//                     component.set('v.spinner',false);
//                     var errors = response.getError();
//                     var errormessage = errors[0].message;
//                     alert(errormessage);
//                     if (errors) {
//                         helper.showToast('Error','Unknown Error',errormessage);
//                     }
//                     else {
//                         console.log("Unknown error");
//                     }
//                 }
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     showToast : function(type,title,message) {
//         console.log(message)
//         var toastEvent = $A.get("e.force:showToast");
//         toastEvent.setParams({
//             "type":type,
//             "title":title,
//             "message":message
//         });
//         toastEvent.fire();
//     }
// })

// =====================================================================================================================================


// ({
//     validate: function(component, event) {
//         var isValid = true;
//         var oppPlot = component.get('v.oppPlot');
//         console.log(oppPlot)
//         if(oppPlot.Plot__c == null){
//             isValid = false;
//             alert('Please select Plot.');
//         }
//         return isValid;
//     },
//     save  : function(component, event, helper){
//         var action=component.get("c.saveBooking");  
//         action.setParams({
//             oppPlot:component.get("v.oppPlot"),
//         });
//         action.setCallback(this,function(response){
//             if(response.getState()=="SUCCESS"){ 
//                 var bookingId = response.getReturnValue();
//                 component.set("v.bookingId",bookingId);
//                 if(bookingId != 'notc'){
//                     component.set('v.spinner',false);
//                     helper.showToast("Success","Success","Booking Created Successfully");
//                     var navEvt = $A.get("e.force:navigateToSObject");
//                     navEvt.setParams({
//                         "recordId": component.get('v.bookingId'),
//                         "slideDevName": "detail"
//                     });
//                     navEvt.fire();
//                 }
//                 else{
//                     component.set('v.spinner',false);
//                     var errors = response.getError();
//                     var errormessage = errors[0].message;
//                     alert(errormessage);
//                     if (errors) {
//                         helper.showToast('Error','Unknown Error',errormessage);
//                     }
//                     else {
//                         console.log("Unknown error");
//                     }
//                 }
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     showToast : function(type,title,message) {
//         console.log(message)
//         var toastEvent = $A.get("e.force:showToast");
//         toastEvent.setParams({
//             "type":type,
//             "title":title,
//             "message":message
//         });
//         toastEvent.fire();
//     },

//     // Channel Partner on Booking : added by Sivam 17-09-2026 starts
//     // Same server lookup the GRE form uses; shows the partner name on a match, an inline error otherwise
//     lookupChannelPartner : function(component, channelPartnerCode) {
//         component.set("v.isVerifyingChannelPartner", true);
//         var action = component.get("c.getChannelPartnerNameByCode");
//         action.setParams({ cpCode: channelPartnerCode });
//         action.setCallback(this, function(response){
//             component.set("v.isVerifyingChannelPartner", false);
//             // Ignore a stale response if the user kept typing
//             var currentCode = (component.get("v.channelPartnerCode") || '').trim();
//             if(currentCode !== channelPartnerCode){
//                 return;
//             }
//             if(response.getState() === "SUCCESS"){
//                 var channelPartnerName = response.getReturnValue();
//                 if(channelPartnerName){
//                     component.set("v.channelPartnerName", channelPartnerName);
//                     component.set("v.verifiedChannelPartnerCode", channelPartnerCode);
//                     component.set("v.channelPartnerError", '');
//                 } else {
//                     component.set("v.channelPartnerName", '');
//                     component.set("v.verifiedChannelPartnerCode", '');
//                     component.set("v.channelPartnerError", 'Invalid Channel Partner Code.');
//                 }
//             } else {
//                 component.set("v.channelPartnerName", '');
//                 component.set("v.verifiedChannelPartnerCode", '');
//                 component.set("v.channelPartnerError", 'Unable to verify Channel Partner Code.');
//             }
//         });
//         $A.enqueueAction(action);
//     },
//     resetChannelPartnerState : function(component) {
//         component.set("v.channelPartnerCode", '');
//         component.set("v.channelPartnerName", '');
//         component.set("v.verifiedChannelPartnerCode", '');
//         component.set("v.channelPartnerError", '');
//         component.set("v.isVerifyingChannelPartner", false);
//     }
//     // Channel Partner on Booking : added by Sivam 17-09-2026 ends
// })

// ===================================================================================================================================================
// ========================================================== Added by Sivam V =========================================================================

({
    validate: function(component, event) {
        var isValid = true;
        var oppPlot = component.get('v.oppPlot');
        console.log(oppPlot)
        if(oppPlot.Plot__c == null){
            isValid = false;
            alert('Please select Plot.');
        }
        return isValid;
    },
    save  : function(component, event, helper){
        var action=component.get("c.saveBooking");  
        action.setParams({
            oppPlot:component.get("v.oppPlot"),
        });
        action.setCallback(this,function(response){
            if(response.getState()=="SUCCESS"){ 
                var bookingId = response.getReturnValue();
                component.set("v.bookingId",bookingId);
                if(bookingId != 'notc'){
                    component.set('v.spinner',false);
                    helper.showToast("Success","Success","Booking Created Successfully");
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": component.get('v.bookingId'),
                        "slideDevName": "detail"
                    });
                    navEvt.fire();
                }
                else{
                    component.set('v.spinner',false);
                    var errors = response.getError();
                    var errormessage = errors[0].message;
                    alert(errormessage);
                    if (errors) {
                        helper.showToast('Error','Unknown Error',errormessage);
                    }
                    else {
                        console.log("Unknown error");
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(type,title,message) {
        console.log(message)
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type":type,
            "title":title,
            "message":message
        });
        toastEvent.fire();
    },

    // Channel Partner on Booking : added by Sivam 17-09-2026 starts
    // Same server lookup the GRE form uses; shows the partner name on a match, an inline error otherwise
    // onComplete (optional) runs after every lookup, so Submit can verify the code and then save either way (22-09-2026)
    lookupChannelPartner : function(component, channelPartnerCode, onComplete) {
        component.set("v.isVerifyingChannelPartner", true);
        var action = component.get("c.getChannelPartnerNameByCode");
        action.setParams({ cpCode: channelPartnerCode });
        action.setCallback(this, function(response){
            component.set("v.isVerifyingChannelPartner", false);
            // Ignore a stale response if the user kept typing
            var currentCode = (component.get("v.channelPartnerCode") || '').trim();
            if(currentCode === channelPartnerCode){
                if(response.getState() === "SUCCESS"){
                    var channelPartnerName = response.getReturnValue();
                    if(channelPartnerName){
                        component.set("v.channelPartnerName", channelPartnerName);
                        component.set("v.verifiedChannelPartnerCode", channelPartnerCode);
                        component.set("v.channelPartnerError", '');
                    } else {
                        component.set("v.channelPartnerName", '');
                        component.set("v.verifiedChannelPartnerCode", '');
                        component.set("v.channelPartnerError", 'Invalid Channel Partner Code.');
                    }
                } else {
                    component.set("v.channelPartnerName", '');
                    component.set("v.verifiedChannelPartnerCode", '');
                    component.set("v.channelPartnerError", 'Unable to verify Channel Partner Code.');
                }
            }
            if(typeof onComplete === 'function'){
                onComplete();
            }
        });
        $A.enqueueAction(action);
    },
    resetChannelPartnerState : function(component) {
        component.set("v.channelPartnerCode", '');
        component.set("v.channelPartnerName", '');
        component.set("v.verifiedChannelPartnerCode", '');
        component.set("v.channelPartnerError", '');
        component.set("v.isVerifyingChannelPartner", false);
    }
    // Channel Partner on Booking : added by Sivam 17-09-2026 ends
})
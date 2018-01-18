module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
var constants = require('../controllers/constants');
var utils = require('../controllers/utils');
var upsAPI = require('shipping-ups');
var ups = new upsAPI({
	environment: 'sandbox', // or live
	username: 'UPSUSERNAME',
	password: 'UPSPASSWORD',
	access_key: 'UPSACCESSTOKEN',
	imperial: true // set to false for metric
});

/**
 * This file include all Authorized.net payment functions as follow.
 * Credentials are saved in : controllers/constants.js
 * Functions used are : acceptPaymentPage -> paymentReturn, paymentCancel -> paymentNotify.
 * 
 */

var controller = {
	getOrderOfInvoice: function (req, res) {
		if (req.body) {
			ProductOrders.getOrderOfInvoice(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: {
					message: "Invalid Request"
				}
			})
		}
	},

	generatecsvForUser: function (req, res) {
		ProductOrders.exceltotalProductOrdersforUser(req.body, function (err, data) {
			data.name = "invoice"
			Config.jsonTOCsvConvert(data, function (csv) {
				_.cloneDeep(csv);
				res.set('Content-Type', "application/CSV");
				res.set('Content-Disposition', "attachment;filename=" + csv.path);
				res.send(csv.csvData);
			});
		});
	},

	generatecsv: function (req, res) {
		ProductOrders.exceltotalProductOrders(req.body, function (err, data) {
			data.name = "ecommerce"
			Config.jsonTOCsvConvert(data, function (csv) {
				_.cloneDeep(csv);
				res.set('Content-Type', "application/CSV");
				res.set('Content-Disposition', "attachment;filename=" + csv.path);
				res.send(csv.csvData);
			});
		});
	},

	generatePdfForUser: function (req, res) {
		ProductOrders.exceltotalProductOrdersforUser(req.body, function (err, data) {
			data.name = "invoice"
			Config.generatePdfFormatData(data, function (pdf) {
				_.cloneDeep(pdf);
				res.set('Content-Type', "application/pdf");
				res.set('Content-Disposition', "attachment;filename=" + pdf.path);
				res.send(pdf.pdfData);
			});
		});
	},

	generatePdf: function (req, res) {
		ProductOrders.exceltotalProductOrders(req.body, function (err, data) {
			data.name = "ecommerce"
			Config.generatePdfFormatData(data, function (pdf) {
				_.cloneDeep(pdf);
				res.set('Content-Type', "application/pdf");
				res.set('Content-Disposition', "attachment;filename=" + pdf.path);
				res.send(pdf.pdfData);
			});
		});
	},

	exceltotalProductOrders: function (req, res) {
		ProductOrders.exceltotalProductOrders(req.body, function (err, data) {
			ProductOrders.generateExcelProductOrders(data, function (err, singleData) {
				Config.generateExcel("ProductExcel", singleData, function (excels) {
					// console.log("excel", excels, "err", err);
					res.set('Content-Type', "application/octet-stream");
					res.set('Content-Disposition', "attachment;filename=" + excels.path);
					res.send(excels.excel);
				});
			});
		});
	},

	exceltotalProductOrdersforUser: function (req, res) {
		ProductOrders.exceltotalProductOrdersforUser(req.body, function (err, data) {
			ProductOrders.generateExcelProductOrdersforUser(data, function (err, singleData) {
				Config.generateExcel("ProductExcel", singleData, function (excels) {
					// console.log("excel", excels, "err", err);
					res.set('Content-Type', "application/octet-stream");
					res.set('Content-Disposition', "attachment;filename=" + excels.path);
					res.send(excels.excel);
				});
			});
		});
	},

	getProductData: function (req, res) {
		if (req.body) {
			ProductOrders.getProductData(req.body, res.callback);
		} else {
			res.callback("Please provide Valid AccessToken", null);
		}
	},

	getProductOrders: function (req, res) {
		if (req.body) {
			ProductOrders.getProductOrders(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: {
					message: "Invalid Request"
				}
			});
		}
	},

	invoiceGenerate: function (req, res) {
		if (req.body) {
			ProductOrders.invoiceGenerate(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: {
					message: "Invalid Request"
				}
			});
		}
	},

	paymentReturn: function (req, res) {

		var invoiceUserId = {};
		console.log("...........................Payment Responce..........................");
		console.log(req.allParams());
		console.log(req.query);
		console.log("...........................Payment Responce..........................");

		invoiceUserId.invoiceNo = req.query.invoiceNumber;
		// res.redirect("http://unifli.aero/thankyou");
		ProductOrders.invoiceGenerate(invoiceUserId, function (err, data) {
			console.log(data);
		})
		ProductOrders.findOne({
			invoiceNo: req.query.invoiceNumber
		}).lean().exec(function (err, found) {
			if (err || _.isEmpty(found)) {} else {
				if (found.cadLineWork) {
					res.redirect(global["env"].realHost + "/#!/cadfile-request");
				} else {
					var invoiceNum = found.invoiceNo;

					//get transaction
					if (req.query.PayerID) {

						var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
						merchantAuthenticationType.setName(constants.apiLoginKey);
						merchantAuthenticationType.setTransactionKey(constants.transactionKey);

						var payPalType = new ApiContracts.PayPalType();
						payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');
						payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');
						payPalType.setPayerID(req.query.PayerID);

						var paymentType = new ApiContracts.PaymentType();
						paymentType.setPayPal(payPalType);

						var txnRequest = new ApiContracts.TransactionRequestType();
						txnRequest.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURECONTINUETRANSACTION);
						txnRequest.setPayment(paymentType);
						txnRequest.setAmount(1);
						txnRequest.setRefTransId(found.transactionId);

						var createRequest = new ApiContracts.CreateTransactionRequest();
						createRequest.setMerchantAuthentication(merchantAuthenticationType);
						createRequest.setTransactionRequest(txnRequest);

						console.log(JSON.stringify(createRequest.getJSON(), null, 2));

						var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

						ctrl.setEnvironment(SDKConstants.endpoint.sandbox);

						ctrl.execute(function () {

							var apiResponse = ctrl.getResponse();

							var response = new ApiContracts.CreateTransactionResponse(apiResponse);

							console.log(JSON.stringify(response, null, 2));

							if (response !== null) {
								if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
									if (response.getTransactionResponse().getMessages() !== null) {
										console.log(".........................................................................");
										console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
										console.log('Payer Id: ' + response.getTransactionResponse().getSecureAcceptance().getPayerID());
										console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
										console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
										console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
										res.redirect("http://unifli.aero/thankyou/" + invoiceNum);

									} else {
										console.log(".........................................................................");

										console.log('Failed Transaction.');
										if (response.getTransactionResponse().getErrors() !== null) {
											console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
											console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
										}
										res.redirect("http://unifli.aero/sorry");

									}
								} else {
									console.log(".........................................................................");

									console.log('Failed Transaction. ');
									if (response.getTransactionResponse() !== null && response.getTransactionResponse().getErrors() !== null) {
										console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
										console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
									} else {
										console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
										console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
									}
									res.redirect("http://unifli.aero/sorry");

								}
							} else {
								console.log('Null Response.');
								res.redirect("http://unifli.aero/sorry");

							}

						});
					} else {
						res.redirect("http://unifli.aero/thankyou/" + invoiceNum);
					}

				}

				if (found.dfmSubscription) {
					console.log("user", found.user);
					User.findOneAndUpdate({
						_id: found.user
					}, {
						currentSubscription: found.dfmSubscription
					}).exec(function (err, found) {
						if (err) {
							console.log("err1")
						} else if (_.isEmpty(found)) {
							console.log("err2")
						} else {
							console.log("err3")
						}

					})
					found.status = "Paid";
					ProductOrders.saveData(found, function (err, data) {
						if (err) {
							console.log("error occured while updating payment status");
						} else {
							console.log("saved successfully");
						}

					})
				}
				if (found.products[0]) {
					console.log("inside if found product ")
					console.log("user", found.user);
					User.findOneAndUpdate({
						_id: found.user
					}, {
						cartProducts: []
					}).exec(function (err, found) {
						if (err) {
							console.log("err1")
						} else if (_.isEmpty(found)) {
							console.log("err2")
						} else {
							console.log("err3")
						}

					})
					found.status = "Paid";
					ProductOrders.saveData(found, function (err, data) {
						if (err) {
							console.log("error occured while updating payment status");
						} else {
							console.log("saved successfully");
						}

					})
				}


			}

		});
	},

	paymentCancel: function (req, res) {
		res.redirect("http://unifli.aero/sorry");
	},

	//recursive payment

	createCustomerProfileFromTransaction: function (transactionIdData, callback) {

		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var createRequest = new ApiContracts.CreateCustomerProfileFromTransactionRequest();
		createRequest.setTransId(transactionIdData);
		createRequest.setMerchantAuthentication(merchantAuthenticationType);

		//console.log(JSON.stringify(createRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.CreateCustomerProfileFromTransactionController(createRequest.getJSON());

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);
			//console.log(JSON.stringify(response.getJSON(), null, 2));

			if (response != null) {
				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					console.log('Successfully created a customer payment profile with id: ' + response.getCustomerProfileId() +
						' from a transaction : ' + "60036139346");
				} else {
					//console.log(JSON.stringify(response));
					//console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			} else {
				console.log('Null response received');
			}

			res.callback(response);

		});
	},

	getCustomerProfile: function (profileIdData, callback) {

		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var getRequest = new ApiContracts.GetCustomerProfileRequest();
		getRequest.setCustomerProfileId(profileIdData);
		getRequest.setMerchantAuthentication(merchantAuthenticationType);

		//pretty print request
		//console.log(JSON.stringify(createRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.GetCustomerProfileController(getRequest.getJSON());

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.GetCustomerProfileResponse(apiResponse);

			//pretty print response
			//console.log(JSON.stringify(response, null, 2));

			if (response != null) {
				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					console.log('Customer profile ID : ' + response.getProfile().getCustomerProfileId());
					console.log('Customer Email : ' + response.getProfile().getEmail());
					console.log('Description : ' + response.getProfile().getDescription());
				} else {
					//console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			} else {
				console.log('Null response received');
			}

			res.callback(response);
		});
	},

	createSubscriptionFromCustomerProfile: function (profileData, callback) {

		var customerProfileId = profileData.profiledata.customerProfileId;
		var customerAddressId = profileData.profiledata.shipToList[0].customerAddressId;
		var customerPaymentProfileId = profileData.profiledata.paymentProfiles[0].customerPaymentProfileId;

		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var interval = new ApiContracts.PaymentScheduleType.Interval();
		interval.setLength(1);
		interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

		var paymentScheduleType = new ApiContracts.PaymentScheduleType();
		paymentScheduleType.setInterval(interval);
		paymentScheduleType.setStartDate(profileData.transactiondate);
		paymentScheduleType.setTotalOccurrences(9999);
		paymentScheduleType.setTrialOccurrences(0);

		var customerProfileIdType = new ApiContracts.CustomerProfileIdType();
		customerProfileIdType.setCustomerProfileId(customerProfileId);
		customerProfileIdType.setCustomerPaymentProfileId(customerPaymentProfileId);
		customerProfileIdType.setCustomerAddressId(customerAddressId);

		var arbSubscription = new ApiContracts.ARBSubscriptionType();
		arbSubscription.setName(utils.getRandomString('Name'));
		arbSubscription.setPaymentSchedule(paymentScheduleType);
		arbSubscription.setAmount(profileData.transactionamt);
		// arbSubscription.setTrialAmount(utils.getRandomAmount());
		arbSubscription.setProfile(customerProfileIdType);

		var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
		createRequest.setMerchantAuthentication(merchantAuthenticationType);
		createRequest.setSubscription(arbSubscription);

		console.log(JSON.stringify(createRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);

			console.log(JSON.stringify(response, null, 2));

			if (response != null) {
				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					console.log('Subscription Id : ' + response.getSubscriptionId());
					console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
					console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
				} else {
					console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			} else {
				console.log('Null Response.');
			}

			res.callback(response);
		});
	},

	cancelSubscription: function (req, res) {

		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var cancelRequest = new ApiContracts.ARBCancelSubscriptionRequest();
		cancelRequest.setMerchantAuthentication(merchantAuthenticationType);
		cancelRequest.setSubscriptionId(subscriptionId);

		console.log(JSON.stringify(cancelRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.ARBCancelSubscriptionController(cancelRequest.getJSON());

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.ARBCancelSubscriptionResponse(apiResponse);

			console.log(JSON.stringify(response, null, 2));

			if (response != null) {
				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
					console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
				} else {
					console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			} else {
				console.log('Null Response.');
			}

			res.callback(response);
		});
	},

	recursivePayment: function (req, res) {
		async.waterfall([
			function (data, callback) {
				ProductOrders.findOne({
					invoiceNo: req.query.invoiceNumber
				}).exec(function (err, data) {
					if (err || _.isEmpty(data)) {
						callback(err, []);
					} else {
						var transactionId = data.transactionId;
						var transactionDate = data.transactionDate;
						var transactionAmt = data.totalAmount;
						callback(null, transactionId);
					}
				});
			},
			function (transactionIdData, callback) {
				ProductOrders.createCustomerProfileFromTransaction(transactionIdData, function (err, data) {
					if (err || _.isEmpty(data)) {
						callback(err, []);
					} else {
						callback(null, data.customerProfileId);
					}
				})
			},
			function (profileIdData, callback) {
				console.log("createCustomerProfileFromTransaction", profileIdData)
				// remove all the transactions where this rule is mensioned
				ProductOrders.getCustomerProfile(profileIdData, function (err, data) {
					if (err || _.isEmpty(data)) {
						callback(err, []);
					} else {
						var dataToSend = {};
						dataToSend.profiledata = data;
						dataToSend.transactiondate = transactionDate;
						dataToSend.transactionamt = transactionAmt
						callback(null, dataToSend);
					}
				})
			},
			function (profileData, callback) { // 
				console.log("getCustomerProfile", profileData)
				// checkViolationForRule run rules on all the transactions for this new created rule only
				ProductOrders.createSubscriptionFromCustomerProfile(profileData, callback)
			}
		], function () {
			// nothing at all
		});
	},

	//recursive payment end

	/**
	 * Webhook Funtion
	 * This function is initated in authorized.net.
	 */

	paymentNotify: function (req, res) {
		console.log("notify notify");
		console.log(req.body);
		console.log("notify notify");

		if (req.body.payload.id) {
			var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
			merchantAuthenticationType.setName(constants.apiLoginKey);
			merchantAuthenticationType.setTransactionKey(constants.transactionKey);

			var getRequest = new ApiContracts.GetTransactionDetailsRequest();
			getRequest.setMerchantAuthentication(merchantAuthenticationType);
			getRequest.setTransId(req.body.payload.id);

			console.log(JSON.stringify(getRequest.getJSON(), null, 2));

			var ctrl = new ApiControllers.GetTransactionDetailsController(getRequest.getJSON());
			ctrl.setEnvironment(SDKConstants.endpoint.sandbox);

			ctrl.execute(function () {

				var apiResponse = ctrl.getResponse();

				var response = new ApiContracts.GetTransactionDetailsResponse(apiResponse);

				var paymentRes = JSON.parse(JSON.stringify(response, null, 2))
				console.log("response-----------", paymentRes);

				if (response != null) {
					if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
						ProductOrders.update({
							invoiceNo: response.getTransaction().getOrder().getInvoiceNumber()
						}, {
							$set: {
								paymentResponse: paymentRes,
								status: 'Paid',
								transactionId: paymentRes.transaction.transId,
								transactionDate: paymentRes.transaction.submitTimeUTC
							}
						}).exec(function (err, found) {
							if (err) {
								console.log(err);
							} else if (_.isEmpty(found)) {
								console.log("noDataound");
							} else {
								console.log('Transaction Id : ' + response.getTransaction().getTransId());
								console.log('Transaction Type : ' + response.getTransaction().getTransactionType());
								console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
								console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
							}

						});

					} else {
						console.log('Result Code: ' + response.getMessages().getResultCode());
						console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
						console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
					}
				} else {
					console.log('Null Response.');
				}

				// callback(response);
			});
		}

	},

	/**
	 * Start of transaction:
	 * As per which type of transaction it excecute paypal or card transaction 
	 * In card transaction refer : https://developer.authorize.net/api/reference/index.html#payment-transactions-get-an-accept-payment-page
	 * In Paypal : https://developer.authorize.net/api/reference/features/paypal.html
	 * 			   SEQUENCE 3 is used.
	 */

	acceptPaymentPage: function (req, res) {
		console.log(req.query);
		if (req.query.amount && req.query.invoiceNumber) {

			ProductOrders.findOne({
				invoiceNo: req.query.invoiceNumber
			}).deepPopulate('user products.product').exec(function (err, data) {
				if (err || _.isEmpty(data)) {
					callback(err, [])
				} else {
					console.log(data);
					if (req.query.paymentType == "paypal") {
						var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
						merchantAuthenticationType.setName(constants.apiLoginKey);
						merchantAuthenticationType.setTransactionKey(constants.transactionKey);

						var payPalType = new ApiContracts.PayPalType();
						payPalType.setCancelUrl(global["env"].realHost+'/api/ProductOrders/paymentCancel');
						payPalType.setSuccessUrl(global["env"].realHost+'/api/ProductOrders/paymentReturn?invoiceNumber=' + req.query.invoiceNumber);
						payPalType.setPayerID('X3KMJR6UXFJG2');

						var paymentType = new ApiContracts.PaymentType();
						paymentType.setPayPal(payPalType);

						var transactionRequestType = new ApiContracts.TransactionRequestType();
						transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
						transactionRequestType.setPayment(paymentType);
						transactionRequestType.setAmount(1);


						var transactionOrderType = new ApiContracts.OrderType();
						transactionOrderType.setInvoiceNumber(req.query.invoiceNumber);
						transactionRequestType.setOrder(transactionOrderType);

						var transactionCustomerDataType = new ApiContracts.CustomerDataType();
						transactionCustomerDataType.setEmail(data.user.email);
						transactionRequestType.setCustomer(transactionCustomerDataType);

						var transactionBillTo = new ApiContracts.CustomerAddressType();
						transactionBillTo.setFirstName(data.billingAddress.fname);
						transactionBillTo.setLastName(data.billingAddress.lname);
						transactionBillTo.setCompany(data.billingAddress.comapny);
						transactionBillTo.setAddress(data.billingAddress.streetAddress);
						transactionBillTo.setCity(data.billingAddress.city);
						transactionBillTo.setState(data.billingAddress.state);
						transactionBillTo.setZip(data.billingAddress.zip);
						transactionBillTo.setCountry("USA");
						transactionBillTo.setPhoneNumber(data.billingAddress.phonenumber);
						transactionBillTo.setFaxNumber("NA");
						transactionBillTo.setEmail(data.user.email);
						transactionRequestType.setBillTo(transactionBillTo);

						var transactionShippTo = new ApiContracts.NameAndAddressType();
						transactionShippTo.setFirstName(data.shippingAddress.fname);
						transactionShippTo.setLastName(data.shippingAddress.lname);
						transactionShippTo.setCompany(data.shippingAddress.comapny);
						transactionShippTo.setAddress(data.shippingAddress.streetAddress);
						transactionShippTo.setCity(data.shippingAddress.city);
						transactionShippTo.setState(data.shippingAddress.state);
						transactionShippTo.setZip(data.shippingAddress.zip);
						transactionShippTo.setCountry("USA");
						transactionRequestType.setShipTo(transactionShippTo);

						// var lineItems = new ApiContracts.ArrayOfLineItem();
						// var lineItem_array = [];
						// _.each(data.products, function (n) {
						// 	var lineItem = new ApiContracts.LineItemType();
						// 	lineItem.setItemId(n.product._id);
						// 	lineItem.setName(n.product.name);
						// 	lineItem.setQuantity(n.qty);
						// 	lineItem.setUnitPrice(n.product.price);
						// 	lineItem.setTaxable(false);
						// 	lineItem_array.push(lineItem);
						// });
						// lineItems.setLineItem(lineItem_array);

						// transactionRequestType.setLineItems(lineItems);


						var createRequest = new ApiContracts.CreateTransactionRequest();
						createRequest.setMerchantAuthentication(merchantAuthenticationType);
						createRequest.setTransactionRequest(transactionRequestType);

						console.log(JSON.stringify(createRequest.getJSON(), null, 2));

						var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

						ctrl.setEnvironment(SDKConstants.endpoint.sandbox);

						ctrl.execute(function () {

							var apiResponse = ctrl.getResponse();

							var response = new ApiContracts.CreateTransactionResponse(apiResponse);

							console.log(JSON.stringify(response, null, 2));

							if (response != null) {
								if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
									if (response.getTransactionResponse().getMessages() != null) {
										console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
										console.log('Secure Acceptance URL: ' + response.getTransactionResponse().getSecureAcceptance().getSecureAcceptanceUrl());
										console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
										console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
										console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
										ProductOrders.update({
											invoiceNo: req.query.invoiceNumber
										}, {
											$set: {
												transactionId: response.getTransactionResponse().getTransId()
											}
										}).exec(function (err, found) {
											if (err) {
												console.log(err);
											} else if (_.isEmpty(found)) {
												console.log("noDataound");
											} else {
												var formbody = '<form id="nonseamless" method="post" name="redirect" action="' + response.getTransactionResponse().getSecureAcceptance().getSecureAcceptanceUrl() + '"/><script language="javascript">document.redirect.submit();</script></form>';

												res.send(formbody);
											}

										});

									} else {
										console.log('Failed Transaction.');
										if (response.getTransactionResponse().getErrors() != null) {
											console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
											console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
										}
									}
								} else {
									console.log('Failed Transaction. ');
									if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

										console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
										console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
									} else {
										console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
										console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
									}
								}
							} else {
								console.log('Null Response.');
							}

						});
					} else {

						console.log(data);
						var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
						merchantAuthenticationType.setName(constants.apiLoginKey);
						merchantAuthenticationType.setTransactionKey(constants.transactionKey);

						var transactionRequestType = new ApiContracts.TransactionRequestType();
						transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
						transactionRequestType.setAmount(1);

						var transactionOrderType = new ApiContracts.OrderType();
						transactionOrderType.setInvoiceNumber(req.query.invoiceNumber);
						transactionRequestType.setOrder(transactionOrderType);

						var transactionCustomerDataType = new ApiContracts.CustomerDataType();
						transactionCustomerDataType.setEmail(data.user.email);
						transactionRequestType.setCustomer(transactionCustomerDataType);

						var transactionBillTo = new ApiContracts.CustomerAddressType();
						transactionBillTo.setFirstName(data.billingAddress.fname);
						transactionBillTo.setLastName(data.billingAddress.lname);
						transactionBillTo.setCompany(data.billingAddress.comapny);
						transactionBillTo.setAddress(data.billingAddress.streetAddress);
						transactionBillTo.setCity(data.billingAddress.city);
						transactionBillTo.setState(data.billingAddress.state);
						transactionBillTo.setZip(data.billingAddress.zip);
						transactionBillTo.setCountry("USA");
						transactionBillTo.setPhoneNumber(data.billingAddress.phonenumber);
						transactionBillTo.setFaxNumber("NA");
						transactionBillTo.setEmail(data.user.email);
						transactionRequestType.setBillTo(transactionBillTo);

						var transactionShippTo = new ApiContracts.NameAndAddressType();
						transactionShippTo.setFirstName(data.shippingAddress.fname);
						transactionShippTo.setLastName(data.shippingAddress.lname);
						transactionShippTo.setCompany(data.shippingAddress.comapny);
						transactionShippTo.setAddress(data.shippingAddress.streetAddress);
						transactionShippTo.setCity(data.shippingAddress.city);
						transactionShippTo.setState(data.shippingAddress.state);
						transactionShippTo.setZip(data.shippingAddress.zip);
						transactionShippTo.setCountry("USA");
						transactionRequestType.setShipTo(transactionShippTo);

						var lineItems = new ApiContracts.ArrayOfLineItem();
						var lineItem_array = [];
						_.each(data.products, function (n) {
							var lineItem = new ApiContracts.LineItemType();
							lineItem.setItemId(n.product._id);
							lineItem.setName(n.product.name);
							lineItem.setQuantity(n.qty);
							lineItem.setUnitPrice(n.product.price);
							lineItem.setTaxable(false);
							lineItem_array.push(lineItem);
						});
						lineItems.setLineItem(lineItem_array);

						transactionRequestType.setLineItems(lineItems);



						var setting1 = new ApiContracts.SettingType();
						setting1.setSettingName('hostedPaymentButtonOptions');
						setting1.setSettingValue('{\"text\": \"Pay\"}');

						var setting2 = new ApiContracts.SettingType();
						setting2.setSettingName('hostedPaymentOrderOptions');
						setting2.setSettingValue('{\"show\": true}');

						var setting3 = new ApiContracts.SettingType();
						setting3.setSettingName('hostedPaymentBillingAddressOptions');
						setting3.setSettingValue('{\"show\": false}');

						var setting4 = new ApiContracts.SettingType();
						setting4.setSettingName('hostedPaymentReturnOptions');
						var settingValue = {
							'showReceipt': false,
							'url': 'http://cloud.unifli.aero/api/ProductOrders/paymentReturn?invoiceNumber=' + req.query.invoiceNumber,
							'urlText': 'Continue',
							'cancelUrl': 'http://cloud.unifli.aero/api/ProductOrders/paymentCancel',
							'cancelUrlText': 'Cancel'
						};
						setting4.setSettingValue(JSON.stringify(settingValue));

						var setting5 = new ApiContracts.SettingType();
						setting5.setSettingName('hostedPaymentPaymentOptions');
						setting5.setSettingValue("{\"cardCodeRequired\": false, \"showCreditCard\": true, \"showBankAccount\": true}");

						var settingList = [];
						settingList.push(setting1);
						settingList.push(setting2);
						settingList.push(setting3);
						settingList.push(setting4);
						settingList.push(setting5);


						var alist = new ApiContracts.ArrayOfSetting();
						alist.setSetting(settingList);

						var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
						getRequest.setMerchantAuthentication(merchantAuthenticationType);
						getRequest.setTransactionRequest(transactionRequestType);
						getRequest.setHostedPaymentSettings(alist);

						console.log(JSON.stringify(getRequest.getJSON(), null, 2));

						var ctrl = new ApiControllers.GetHostedPaymentPageController(getRequest.getJSON());
						ctrl.setEnvironment(SDKConstants.endpoint.sandbox);

						ctrl.execute(function () {

							var apiResponse = ctrl.getResponse();

							var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

							//pretty print response
							//console.log(JSON.stringify(response, null, 2));

							if (response != null) {
								if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
									console.log('Hosted payment page token :');
									console.log('Error message: ' + response.getToken());
									var formData = {
										token: response.getToken()
									};
									// this.createCustomerProfileFromTransaction()									
									// res.json({
									// 	value: true,
									// 	data: response,
									// });
									res.view("pay_form", formData);
								} else {
									res.redirect("http://unifli.aero/sorry");

									console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
									console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
								}
							} else {
								res.redirect("http://unifli.aero/sorry")

							}


						});
					}
				}
			})

		} else {
			res.redirect("http://unifli.aero/sorry");
		}

	},

	chargeCreditCard: function (req, res) {
		if (req.body.expirationDate) {
			var date = new Date(req.body.expirationDate);
			var year = date.getFullYear().toString().substr(-2);
			var month = date.getMonth() + 1;
			var m = month.toString().length;
			if (m == 1) {
				month = "0" + month;
			}
		}
		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var creditCard = new ApiContracts.CreditCardType();

		creditCard.setCardNumber(req.body.cardNumber);
		creditCard.setExpirationDate(1119);
		creditCard.setCardCode(req.body.cardCode);


		var paymentType = new ApiContracts.PaymentType();
		paymentType.setCreditCard(creditCard);

		var orderDetails = new ApiContracts.OrderType();

		orderDetails.setInvoiceNumber("99889");
		orderDetails.setDescription('Product Description');

		// var tax = new ApiContracts.ExtendedAmountType();
		// tax.setAmount('4.26');
		// tax.setName('level2 tax name');
		// tax.setDescription('level2 tax');

		// var duty = new ApiContracts.ExtendedAmountType();
		// duty.setAmount('8.55');
		// duty.setName('duty name');
		// duty.setDescription('duty description');

		// var shipping = new ApiContracts.ExtendedAmountType();
		// shipping.setAmount('8.55');
		// shipping.setName('shipping name');
		// shipping.setDescription('shipping description');

		// var billTo = new ApiContracts.CustomerAddressType();
		// billTo.setFirstName('Ellen');
		// billTo.setLastName('Johnson');
		// billTo.setCompany('Souveniropolis');
		// billTo.setAddress('14 Main Street');
		// billTo.setCity('Pecan Springs');
		// billTo.setState('TX');
		// billTo.setZip('44628');
		// billTo.setCountry('USA');

		// var shipTo = new ApiContracts.CustomerAddressType();
		// shipTo.setFirstName('China');
		// shipTo.setLastName('Bayles');
		// shipTo.setCompany('Thyme for Tea');
		// shipTo.setAddress('12 Main Street');
		// shipTo.setCity('Pecan Springs');
		// shipTo.setState('TX');
		// shipTo.setZip('44628');
		// shipTo.setCountry('USA');

		// var lineItem_id1 = new ApiContracts.LineItemType();
		// lineItem_id1.setItemId('1');
		// lineItem_id1.setName('vase');
		// lineItem_id1.setDescription('cannes logo');
		// lineItem_id1.setQuantity('18');
		// lineItem_id1.setUnitPrice(45.00);

		// var lineItem_id2 = new ApiContracts.LineItemType();
		// lineItem_id2.setItemId('2');
		// lineItem_id2.setName('vase2');
		// lineItem_id2.setDescription('cannes logo2');
		// lineItem_id2.setQuantity('28');
		// lineItem_id2.setUnitPrice('25.00');

		// var lineItemList = [];
		// lineItemList.push(lineItem_id1);
		// lineItemList.push(lineItem_id2);

		// var lineItems = new ApiContracts.ArrayOfLineItem();
		// lineItems.setLineItem(lineItemList);

		// var userField_a = new ApiContracts.UserField();
		// userField_a.setName('A');
		// userField_a.setValue('Aval');

		// var userField_b = new ApiContracts.UserField();
		// userField_b.setName('B');
		// userField_b.setValue('Bval');

		// var userFieldList = [];
		// userFieldList.push(userField_a);
		// userFieldList.push(userField_b);

		// var userFields = new ApiContracts.TransactionRequestType.UserFields();
		// userFields.setUserField(userFieldList);

		// var transactionSetting1 = new ApiContracts.SettingType();
		// transactionSetting1.setSettingName('testRequest');
		// transactionSetting1.setSettingValue('s1val');

		// var transactionSetting2 = new ApiContracts.SettingType();
		// transactionSetting2.setSettingName('testRequest');
		// transactionSetting2.setSettingValue('s2val');

		// var transactionSettingList = [];
		// transactionSettingList.push(transactionSetting1);
		// transactionSettingList.push(transactionSetting2);

		// var transactionSettings = new ApiContracts.ArrayOfSetting();
		// transactionSettings.setSetting(transactionSettingList);

		var transactionRequestType = new ApiContracts.TransactionRequestType();
		transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
		transactionRequestType.setPayment(paymentType);
		transactionRequestType.setAmount(req.body.amount);
		// transactionRequestType.setLineItems(lineItems);
		// transactionRequestType.setUserFields(userFields);
		transactionRequestType.setOrder(orderDetails);
		// transactionRequestType.setTax(tax);
		// transactionRequestType.setDuty(duty);
		// transactionRequestType.setShipping(shipping);
		// transactionRequestType.setBillTo(billTo);
		// transactionRequestType.setShipTo(shipTo);
		// transactionRequestType.setTransactionSettings(transactionSettings);

		var createRequest = new ApiContracts.CreateTransactionRequest();
		createRequest.setMerchantAuthentication(merchantAuthenticationType);
		createRequest.setTransactionRequest(transactionRequestType);

		//pretty print request
		console.log(JSON.stringify(createRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
		//Defaults to sandbox
		ctrl.setEnvironment(SDKConstants.endpoint.sandbox);

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.CreateTransactionResponse(apiResponse);

			//pretty print response
			console.log(JSON.stringify(response, null, 2));

			if (response != null) {
				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					if (response.getTransactionResponse().getMessages() != null) {
						console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
						console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
						console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
						console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
					} else {
						console.log('Failed Transaction.');
						if (response.getTransactionResponse().getErrors() != null) {
							console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
							console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
						}
					}
				} else {
					console.log('Failed Transaction. ');
					if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

						console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
						console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
					} else {
						console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
						console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
					}
				}
			} else {
				console.log('Null Response.');
			}
			res.callback(null, response.messages);
		});

		// calculateRate: function (callback) {
		// 	ups.rates({}, function (err, result) {});
		// }
	},

	createInvoice: function (req, res) {
		if (req.body) {
			ProductOrders.createInvoice(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: {
					message: "Invalid Request"
				}
			});
		}
	},

	paymentIdGenerate: function (req, res) {
		if (req.body) {
			ProductOrders.paymentIdGenerate(req.body, res.callback);
		} else {
			res.json({
				value: false,
				data: {
					message: "Invalid Request"
				}
			});
		}
	}

};


// if (require.main === module) {
// 	authorizeCreditCard(function(){
// 		console.log('authorizeCreditCard call complete.');
// 	});
// }

//module.exports.authorizeCreditCard = authorizeCreditCard;
module.exports = _.assign(module.exports, controller);
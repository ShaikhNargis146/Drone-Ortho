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

var controller = {
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
					res.redirect("http://cloud.unifli.aero/#!/cadfile-request");
				} else {
					res.redirect("http://unifli.aero/thankyou");
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


			}

		});
	},

	paymentCancel: function (req, res) {
		res.redirect("http://unifli.aero/sorry");
	},

	paymentNotify: function (req, res) {
		console.log("notify notify");
		console.log(req.body.payload.id);
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

				console.log("response-----------", JSON.parse(JSON.stringify(response, null, 2)));

				if (response != null) {
					if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
						ProductOrders.update({
							invoiceNo: response.getTransaction().getOrder().getInvoiceNumber()
						}, {
							$set: {
								paymentResponse: JSON.stringify(response, null, 2),
								status: 'Paid'
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

	acceptPaymentPage: function (req, res) {
		console.log(req.query);
		if (req.query.amount && req.query.invoiceNumber) {

			ProductOrders.findOne({
				invoiceNo: req.query.invoiceNumber
			}).deepPopulate('user').exec(function (err, data) {
				if (err || _.isEmpty(data)) {
					callback(err, [])
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

					var transactionBillTo = new ApiContracts.CustomerAddressType();
					transactionBillTo.setFirstName(data.billingAddress.fname);
					transactionBillTo.setLastName(data.billingAddress.lname);
					transactionBillTo.setCompany(data.billingAddress.comapny);
					transactionBillTo.setAddress(data.billingAddress.address + " " + data.billingAddress.streetAddress);
					transactionBillTo.setCity(data.billingAddress.city);
					transactionBillTo.setState(data.billingAddress.state);
					transactionBillTo.setZip(data.billingAddress.zip);
					transactionBillTo.setCountry(data.billingAddress.country);
					transactionBillTo.setPhoneNumber(data.billingAddress.phonenumber);
					transactionBillTo.setEmail(data.user.email);
					transactionRequestType.setBillTo(transactionBillTo);

					var transactionShippTo = new ApiContracts.NameAndAddressType();
					transactionShippTo.setFirstName(data.shippingAddress.fname);
					transactionShippTo.setLastName(data.shippingAddress.lname);
					transactionShippTo.setCompany(data.shippingAddress.comapny);
					transactionShippTo.setAddress(data.shippingAddress.address + " " + data.shippingAddress.streetAddress);
					transactionShippTo.setCity(data.shippingAddress.city);
					transactionShippTo.setState(data.shippingAddress.state);
					transactionShippTo.setZip(data.shippingAddress.zip);
					transactionShippTo.setCountry(data.shippingAddress.country);
					transactionRequestType.setShipTo(transactionShippTo);


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

					var settingList = [];
					settingList.push(setting1);
					settingList.push(setting2);
					settingList.push(setting3);
					settingList.push(setting4);


					var alist = new ApiContracts.ArrayOfSetting();
					alist.setSetting(settingList);

					var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
					getRequest.setMerchantAuthentication(merchantAuthenticationType);
					getRequest.setTransactionRequest(transactionRequestType);
					getRequest.setHostedPaymentSettings(alist);

					//console.log(JSON.stringify(getRequest.getJSON(), null, 2));

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
		ctrl.setEnvironment(SDKConstants.endpoint.production);

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
	},

	payPalCheckout: function (req, res) {
		console.log("sdfasdfasdf");
		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);

		var payPalType = new ApiContracts.PayPalType();
		payPalType.setCancelUrl('http://localhost:1337/api/ProductOrders/paymentCancel');
		payPalType.setSuccessUrl('http://localhost:1337/api/ProductOrders/paymentReturn');
		payPalType.setPayerID('X3KMJR6UXFJG2');

		var paymentType = new ApiContracts.PaymentType();
		paymentType.setPayPal(payPalType);

		var transactionRequestType = new ApiContracts.TransactionRequestType();
		transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
		transactionRequestType.setPayment(paymentType);
		transactionRequestType.setAmount(1000);

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
	}

};


// if (require.main === module) {
// 	authorizeCreditCard(function(){
// 		console.log('authorizeCreditCard call complete.');
// 	});
// }

//module.exports.authorizeCreditCard = authorizeCreditCard;
module.exports = _.assign(module.exports, controller);
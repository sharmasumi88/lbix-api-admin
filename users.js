var request = require("request");
var async = require("async");
var config = require('./config');
var FUNCTIONS = require("./functions.js");

var moment = require('moment');
var multiparty   = require('multiparty');
var randomstring = require("random-string");
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
var crypto = require('crypto');


const fs = require('fs');
var pdf = require('html-pdf');
const path = require('path');
const utils = require('util');
const readFile = utils.promisify(fs.readFile);

// Gsuite - 
// hello@learningbix.com
// Hello@123#
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
	secure :false,
    auth: {
      user: 'hello@learningbix.com', // Your email id
      pass: 'Learningbix@123#$' // Your password 
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

//AWS
var AWS = require('aws-sdk');
const { initParams } = require("request");
AWS.config.update({
    accessKeyId: "AKIAZNJI33ZWAGS5TKVX",
    secretAccessKey: "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",
    //"region": "s3-us-west-2" 
});
const s3 = new AWS.S3({   signatureVersion: 'v4',  })
var photoBucket = new AWS.S3({
	params: {
		Bucket: 'learningbix.com'
	}
})

var SAND_MERCHANT_KEY='L65Dbu'; //Unpfur7w  //IHr0pP
var SAND_MERCHANT_SALT='v3irXcow';//9oF3Hz5QaA  //YD5BIxBM
var PAYUMONEY_AUTHORIZATION_HEADER='dmPYPx2VM8cfSgTRLm/kPFfLf/Dt44jnAzpdp+bL/yU=';
//payuMoney
//var payUMoney = require('payumoney_nodejs');
var payUMoney = require('payumoney-node');
//payumoney.setProdKeys(MERCHANT_KEY, MERCHANT_SALT, PAYUMONEY_AUTHORIZATION_HEADER);
payUMoney.setKeys(SAND_MERCHANT_KEY, SAND_MERCHANT_SALT, PAYUMONEY_AUTHORIZATION_HEADER);
payUMoney.isProdMode(true);

// functions user basic
module.exports.login = login;
module.exports.otp_generate = otp_generate;
module.exports.otp_verify = otp_verify;
module.exports.user_forgot_password = user_forgot_password;
module.exports.reset_password = reset_password;
module.exports.register_student = register_student;
module.exports.update_student_profile = update_student_profile;
module.exports.update_profile_image = update_profile_image;
module.exports.demo_class_time_slots = demo_class_time_slots;

module.exports.register_teacher = register_teacher;
module.exports.update_teacher_profile = update_teacher_profile;
module.exports.demo_class_details = demo_class_details;

module.exports.add_bank_details = add_bank_details;
module.exports.user_bank_details = user_bank_details;
module.exports.teacher_demo_class_list = teacher_demo_class_list;

module.exports.teacher_schedule_days_list = teacher_schedule_days_list;
module.exports.teacher_schedule_slots_list = teacher_schedule_slots_list;
module.exports.update_schedule_day_status = update_schedule_day_status;
module.exports.update_schedule_slot_status = update_schedule_slot_status;

module.exports.student_teacher_schedule_days_list = student_teacher_schedule_days_list;
module.exports.student_teacher_schedule_slots_list = student_teacher_schedule_slots_list;
module.exports.check_student_subscription = check_student_subscription;

module.exports.student_lessons_list = student_lessons_list;
module.exports.book_slot_student = book_slot_student;
module.exports.slot_booking_details = slot_booking_details;
module.exports.cancle_slot_booking = cancle_slot_booking;
module.exports.teacher_classes_list = teacher_classes_list;
module.exports.mark_chapter_complete = mark_chapter_complete;

module.exports.student_projects_list = student_projects_list;
module.exports.student_quizzes_list = student_quizzes_list;
module.exports.student_submit_project_link = student_submit_project_link;
module.exports.view_quiz_info = view_quiz_info;
module.exports.group_post_list = group_post_list;

module.exports.like_post = like_post;
module.exports.post_comment = post_comment;
module.exports.delete_post = delete_post;
module.exports.delete_post_comment = delete_post_comment;
module.exports.report_post_abuse = report_post_abuse;
module.exports.group_post_details = group_post_details;

module.exports.my_orders = my_orders;
module.exports.live_courses_list = live_courses_list;
module.exports.self_page_courses_list = self_page_courses_list;
module.exports.update_course_status_pie = update_course_status_pie;
module.exports.student_subscription = student_subscription;
module.exports.web_student_testimonials_list = web_student_testimonials_list; 
module.exports.send_feedback = send_feedback;

module.exports.student_track_info = student_track_info;
module.exports.student_weekly_status = student_weekly_status;
module.exports.bonus_classes_list = bonus_classes_list;
module.exports.category_classes_list = category_classes_list;
module.exports.day_live_classes_list = day_live_classes_list;
module.exports.social_login = social_login;
module.exports.apply_coupon = apply_coupon;
module.exports.generate_invoice = generate_invoice;
module.exports.get_tracking_info = get_tracking_info;
module.exports.school_login_bypass = school_login_bypass;
module.exports.school_reset_password = school_reset_password;

module.exports.assesment_question_list = assesment_question_list;
module.exports.student_assesment_submit = student_assesment_submit;
module.exports.update_assesment_teacher_comment = update_assesment_teacher_comment;
module.exports.student_assesment_marks_list = student_assesment_marks_list;

//payu
module.exports.make_payment = make_payment;
module.exports.check_payment_status = check_payment_status;
module.exports.make_payment_lazypay = make_payment_lazypay;
module.exports.check_payment_lazypay = check_payment_lazypay;
module.exports.fetch_terms_courses = fetch_terms_courses;
module.exports.web_user_refferal_list = web_user_refferal_list;
module.exports.send_invite_link = send_invite_link;
module.exports.youtube_class_list = youtube_class_list;
module.exports.school_otp_generate = school_otp_generate;
module.exports.school_otp_verify = school_otp_verify;
module.exports.create_teacher = create_teacher;

module.exports.otp_generate_email = otp_generate_email;
module.exports.otp_verify_email = otp_verify_email;

module.exports.subjects_list = subjects_list;
module.exports.teacher_assesment_submit = teacher_assesment_submit;
module.exports.overall_details_student = overall_details_student;

module.exports.create_review = create_review;
module.exports.update_reviews_status = update_reviews_status;
module.exports.create_doubt = create_doubt;
module.exports.student_dashboard_info = student_dashboard_info;

module.exports.send_class_badges = send_class_badges;
module.exports.class_badges_list = class_badges_list;
module.exports.teacher_student_course_summary_track = teacher_student_course_summary_track;

module.exports.send_enquiry_email = send_enquiry_email;
module.exports.overall_details_teacher = overall_details_teacher;

module.exports.grades_list = grades_list;
module.exports.school_user_list = school_user_list;
module.exports.reviews_list = reviews_list;



// variables global
var imageFilePath = config.imageFilePath;
var secretSalt = config.secretSalt;
var REFFERAMOUNT = config.REFFERAMOUNT;
var SITE_TITLE = config.SITE_TITLE;
// new Date().toLocaleString('en-US', {
// 	timeZone: 'Asia/Calcutta'
// });
var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var ToDate = new Date();
//var tday = weekday[ToDate.getDay()];
var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() +":" + ToDate.getSeconds();

console.log('-CurTime-',CurTime);
console.log(Curdate+'-'+CurTime);

var dt = new Date();

dt.setMinutes( dt.getMinutes() - 15 );
var ButtonShowTime = dt.getHours() + ":" + dt.getMinutes()+":" + ToDate.getSeconds();
console.log('ButtonShowTime',ButtonShowTime);
/*  users login */

// Inti();
// function Inti(){
	
// var tempId ='1707162064387383901';
// var phone ='7014410620';
// var msg ="Dear DArpan"; 
// msg +="Your Learningpie@Home account password is 123456. Your Demo Dashboard has been unlocked for Titi for next 7 Days.";
// msg +="We are excited to be part of titi's foundational learning journey. Happy Exploring! Call us on <8010554400>  for any queries.";
// var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+""
// console.log('message',message);
// console.log('msg',msg);
// request({
// 	url: message,
// 	method: 'GET',
// }, function(error, response, body){
// 	if(error) {
// 		console.log(error);
// 		resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully", "cmd":"register"}\n';
// 		console.log('res-suceess');
		
// 	} else {
// 		console.log('url',message);
// 		resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully", "cmd":"register"}\n';
// 		console.log('res-suceess');
		
		
// 	}
// });
// }


//Make payment
function make_payment(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var sid = '';
	var firstname = '';
	var lastname = '';
	var email =''; 
	var phone =''; 
	var amount =''; 
	var productinfo =''; 
	var transaction_id =''; 
	var subvention_eligibility ='All'; 
	
	if (typeof userdata.firstname != 'undefined' && userdata.firstname != '') {
		firstname =userdata.firstname;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid =userdata.sid;
	}
	if (typeof userdata.lastname != 'undefined' && userdata.lastname != '') {
		lastname = userdata.lastname;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.productinfo != 'undefined' && userdata.productinfo != '') {
		productinfo = userdata.productinfo;
	}
	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	
	if (typeof userdata.subvention_eligibility != 'undefined' && userdata.subvention_eligibility != '') {
		subvention_eligibility = userdata.subvention_eligibility;
	}

	var uid = hashids.decode(sid);
	pool.getConnection(function (err, connection) {
		var cryp = crypto.createHash('sha512');
		var key = SAND_MERCHANT_KEY;
		var salt = SAND_MERCHANT_SALT;
		var udf5 = 'PayUBiz_NODE_JS_KIT';
		var text = key+'|'+transaction_id+'|'+amount+'|'+productinfo+'|'+firstname+'|'+email+'|||||||||||'+salt+'|'+amount+'|'+subvention_eligibility;
		cryp.update(text);
		var hash = cryp.digest('hex');	
		console.log('hash',hash);
		resultJson = '{"replyCode":"success","replyMsg": "success", "hash":'+ JSON.stringify(hash) +',"cmd":"login"}\n';
		console.log('resultJson',resultJson);
		connection.release();
		callback(200, null, resultJson);
		return;		
		
	});	
}


//check payment
function check_payment_status(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var resultJson = '';
	
	var transaction_id =''; 
	
	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	
	//SAND_MERCHANT_KEY
	pool.getConnection(function (err, connection) {
		var cryp = crypto.createHash('sha512');
		var key = SAND_MERCHANT_KEY;
		var salt = SAND_MERCHANT_SALT;
		var command = "verify_payment";
	
		var hash_str = key  + '|' + command + '|' + transaction_id + '|' + salt ;
		var cryp = crypto.createHash('sha512');	
		cryp.update(hash_str);
		var hash = cryp.digest('hex');
		var requestBody = {
			"key":key,
			"command" : "verify_payment",
			"var1" : transaction_id, //this must be a genrated at your side
			"hash":hash
		};
		request.post({
			url: 'https://info.payu.in/merchant/postservice.php?form=2',
			form: requestBody,
			json: true
		  }, function(error, response, body){
			  if(error){
				console.log('error',error);
				console.log(error);
				resultJson = '{"replyCode":"error","replyMsg":"Some error occured.","cmd":"check_payment_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			  }else{
				console.log('################################################################');
				console.log(response);
				console.log('STATUS:'+response.statusMessage);
				resultJson = '{"replyCode":"success","replyMsg":"Payment processed","cmd":"check_payment_status","data" : '+JSON.stringify(response.body)+'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
				console.log('***************************************************************');
			  }
		  
		});
		
	});	
}

//Make payment
function make_payment_lazypay(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var sid = '';
	var firstname = '';
	var lastname = '';
	var lastname = '';
	var parent_name = '';
	var email =''; 
	var phone =''; 
	var amount =''; 
	var productinfo =''; 
	var pan =''; 
	var transaction_id =''; 
	var dob='';
	var address='';
	var city='';
	var pincode='';


	var ToDate = new Date();
	ToDate.setHours(ToDate.getHours()-5.30)
	var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
	var CurTime = ToDate.getHours() +":" + ToDate.getMinutes() +":" + ToDate.getSeconds();
	var constentTime = Curdate+' '+CurTime;
	console.log('-constentTime-');
	console.log(constentTime);

	if (typeof userdata.firstname != 'undefined' && userdata.firstname != '') {
		firstname =userdata.firstname;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid =userdata.sid;
	}
	if (typeof userdata.lastname != 'undefined' && userdata.lastname != '') {
		lastname = userdata.lastname;
	}
	if (typeof userdata.parent_name != 'undefined' && userdata.parent_name != '') {
		parent_name = userdata.parent_name;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.productinfo != 'undefined' && userdata.productinfo != '') {
		productinfo = userdata.productinfo;
	}
	
	if (typeof userdata.pan != 'undefined' && userdata.pan != '') {
		pan = userdata.pan;
	}

	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	if (typeof userdata.lastname != 'undefined' && userdata.lastname != '') {
		lastname = userdata.lastname;
	}
	if (typeof userdata.parent_name != 'undefined' && userdata.parent_name != '') {
		parent_name = userdata.parent_name;
	}
	if (typeof userdata.address != 'undefined' && userdata.address != '') {
		address = userdata.address;
	}
	if (typeof userdata.city != 'undefined' && userdata.city != '') {
		city = userdata.city;
	}
	if (typeof userdata.pincode != 'undefined' && userdata.pincode != '') {
		pincode = userdata.pincode;
	}

	var uid = hashids.decode(sid);
	pool.getConnection(function (err, connection) {
		const crypto = require('crypto')
		var currency='INR';
		var signature = crypto.createHmac('sha1','d1090594b01ae7e44f751e73d570342d2972a55c')
		.update(phone + amount + currency)
		.digest('hex');
		console.log('signature',signature);	
		var jsonDataObj = {
			"userDetails":
			{ "address":
			{ "line1": address,
			"line2": city,
			"pincode": pincode
			},
			"dob": dob,
			"email": email,
			"firstName": firstname,
			"gender": "male",
			"lastName": lastname,
			"maritalStatus": "unmarried",
			"middleName": "",
			"mobile": phone,
			"pan": pan,
			"employmentType": "salaried",
			"fatherName":parent_name },
			"amount":
			{ "value": amount,
			"currency": "INR"
			},
			"cbpConsent":
			{
			"value": true,
			"consentTime": constentTime
			},
			"customParams": {},
			"merchantTxnId": transaction_id,
			"backUrl": "https://www.learningbix.com/payment-success",
			"notifyUrl": "https://www.learningbix.com/payment-success"
			};

		console.log('jsonDataObj',jsonDataObj);	
		request.post({
			headers: {'content-type': 'application/json','signature':signature,'accessKey':'R1D5WBXDEP40YY1KCXA6'},
			url: 'https://api.lazypay.in/api/lazypay/cof/v0/initiate',
			body: jsonDataObj,
			json: true
		  }, function(error, response, body){
			  if(error){
				console.log('error',error);
				console.log(error);
				resultJson = '{"replyCode":"error","replyMsg":"Some error occured.","cmd":"make_payment_lazypay"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			  }else{
				console.log('################################################################');
				console.log(response);
				resultJson = '{"replyCode":"success","replyMsg":"Payment processed","cmd":"make_payment_lazypay","payulink" : '+JSON.stringify(response.body)+'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
				console.log('***************************************************************');
			  }
		  
		});
	});	
}


//Make payment
function check_payment_lazypay(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var sid = '';
	var firstname = '';
	var lastname = '';
	var email =''; 
	var phone =''; 
	var amount =''; 
	var productinfo =''; 
	var transaction_id =''; 
	
	var ToDate = new Date();
	ToDate.setHours(ToDate.getHours()-5.30)
	var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
	var CurTime = ToDate.getHours() +":" + ToDate.getMinutes() +":" + ToDate.getSeconds();
	var constentTime = Curdate+' '+CurTime;
	console.log('-constentTime-');
	console.log(constentTime);

	if (typeof userdata.firstname != 'undefined' && userdata.firstname != '') {
		firstname =userdata.firstname;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid =userdata.sid;
	}
	if (typeof userdata.lastname != 'undefined' && userdata.lastname != '') {
		lastname = userdata.lastname;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.productinfo != 'undefined' && userdata.productinfo != '') {
		productinfo = userdata.productinfo;
	}
	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	var uid = hashids.decode(sid);
	pool.getConnection(function (err, connection) {
		const crypto = require('crypto')
		var currency='INR';
		var signature = crypto.createHmac('sha1','d1090594b01ae7e44f751e73d570342d2972a55c')
		.update(phone + amount + currency)
		.digest('hex');
		console.log('signature',signature);	
		var jsonDataObj = {
			"merchantTxnId": transaction_id
			};

		console.log('jsonDataObj',jsonDataObj);	
		request.get({
			headers: {'signature':signature,'accessKey':'R1D5WBXDEP40YY1KCXA6'},
			url:'https://api.lazypay.in/api/lazypay/cof/v0/transaction-status?merchantTxnId='+transaction_id+''
		  }, function(error, response, body){
			  if(error){
				console.log('error',error);
				console.log('################################################################');
				
				resultJson = '{"replyCode":"error","replyMsg":"Payment processed","cmd":"make_payment_lazypay","payulink" : '+error+'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			  }else{
				console.log('################################################################');
				console.log(response);
				resultJson = '{"replyCode":"success","replyMsg":"Payment processed","cmd":"make_payment_lazypay","payulink" : '+JSON.stringify(response.body)+'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
				console.log('***************************************************************');
			  }
		  
		});
	});	
}



function social_login(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var social_type = 'Facebook'; // Fcebook , Google
	var social_id = '';

	if (typeof userdata.social_type != 'undefined' && userdata.social_type != '') {
		social_type = userdata.social_type;
	}
	
	if (typeof userdata.social_id != 'undefined' && userdata.social_id != '') {
		social_id = userdata.social_id;
	}

	console.log('userdata',userdata)
	pool.getConnection(function (err, connection) {
		if(social_type=='Facebook'){
			squery ='SELECT users.* from users WHERE facebook_id="'+social_id+'" AND role_id="2"';
		}else{
			squery ='SELECT users.* from users WHERE google_id="'+social_id+'" AND role_id="2"';
		}
		
		console.log('ss',squery)
		connection.query(squery, function (err, results) {
			if (!err)
			{
				if(results.length > 0){
					if(results[0].status != 1){
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var sid = hashids.encode(results[0].id);
						
						var dataResult = results[0];
						console.log('-------------------');
						console.log(dataResult);
						connection.query('SELECT deviceToken FROM users WHERE deviceToken="'+userdata.deviceToken+'"', function(errs, device){
							if(!errs){
								if(device.length > 0){
									connection.query('UPDATE users SET deviceToken=""  WHERE deviceToken="' + userdata.deviceToken +'"', function(errs, done){
										if(!errs){
											connection.query('UPDATE users SET deviceToken="' + userdata.deviceToken + '" WHERE id="' + dataResult.id + '" ');
										}
									});
								}else{
									connection.query('UPDATE users SET deviceToken="' + userdata.deviceToken + '" WHERE id="' + dataResult.id + '" ');
								}
							}
						});
					
						results[0].deviceToken=	userdata.deviceToken;
						resultJson = '{"replyCode":"success","replyMsg": "success", "data":'+ JSON.stringify(results[0]) +',"sid":"'+sid+'","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;		
					}
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"No user registered with this social account.","cmd":"login"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"login"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function login(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var phone = '';
	var email = '';
	var role_id = '1';
	var password='';

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}

	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	
	console.log('userdata',userdata)
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + userdata.password);
		
		squery ='SELECT users.*,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id WHERE users.email="' + email + '" AND users.password="' + hash_password + '" AND users.email !="" AND users.role_id="'+role_id+'"';
		console.log('ss',squery)
		connection.query(squery, function (err, results) {
			if (!err)
			{
				if(results.length > 0){
					if(results[0].status != 1){
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var sid = hashids.encode(results[0].id);
						
						var dataResult = results[0];
						console.log('-------------------');
						console.log(dataResult);
						var dataResult = results[0];
						console.log('-------------------');
						console.log(dataResult);
						connection.query('SELECT deviceToken FROM users WHERE deviceToken="'+userdata.deviceToken+'"', function(errs, device){
							if(!errs){
								if(device.length > 0){
									connection.query('UPDATE users SET deviceToken=""  WHERE deviceToken="' + userdata.deviceToken +'"', function(errs, done){
										if(!errs){
											connection.query('UPDATE users SET deviceToken="' + userdata.deviceToken + '" WHERE id="' + dataResult.id + '" ');
										}
									});
								}else{
									connection.query('UPDATE users SET deviceToken="' + userdata.deviceToken + '" WHERE id="' + dataResult.id + '" ');
								}
							}
						});
					
						results[0].deviceToken=	userdata.deviceToken;
						resultJson = '{"replyCode":"success","replyMsg": "success", "data":'+ JSON.stringify(results[0]) +',"sid":"'+sid+'","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;		
					}
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Please check your login credentials.","cmd":"login"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"login"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/* OTP generate*/
function otp_generate(userdata, pool, callback){
	var resultJson = '';
	var phone = '';
	var role_id = '2';
	var Keyconditoin='';
	if (typeof userdata.phone != 'undefined' && userdata.phone != ''){
		phone = userdata.phone;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != ''){
		role_id = userdata.role_id;
	}

	if(role_id =='2'){
		Keyconditoin =' AND users.role_id ="2"';
	}

	pool.getConnection(function (err, connection) {
		console.log('SELECT users.* FROM users WHERE phone="'+phone+'" '+Keyconditoin+'');
		connection.query('SELECT users.* FROM users WHERE phone="'+phone+'" '+Keyconditoin+'', function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_generate"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{	
				if(users.length > 0){
					if(users[0].status != 1){
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized, Please contact Society admin","cmd":"otp_generate"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var secureCode = Math.floor(100000 + Math.random() * 900000);
						secureCode = secureCode.toString().substring(0,4);
						var message = '';
						secureCode =  parseInt(secureCode);
						//secureCode =  1234;
						message += "Your Learning-Bix Verification code is  " + secureCode + "\n";
						var newMob='+91'+phone;
						request({
							url: 'http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles='+phone+'&tempid=1707161822699439765&sms=You%20are%20just%20one%20step%20away%20from%20accessing%20your%20dashboard%20account%20at%20LearningBix.%20Enter%20'+secureCode+'%20to%20continue.%20Valid%20for%20only%205%20mins.%20Do%20not%20share%20it%20with%20others',
							method: 'GET',
						}, function(error, response, body){
							if(error) {
								console.log(error);
								resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"otp_generate"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								//console.log(response)
								connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+users[0].id+'"');
								resultJson = '{"replyCode":"success","replyMsg":"OTP sent successfully on registered number","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
								console.log('res-suceess');
								connection.release();
								callback(200, null, resultJson);
								return;
								
							}
						});
					
						// resultJson = '{"replyCode":"success","replyMsg":"OTP generated","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
						// console.log('res-suceess');
						// connection.release();
						// callback(200, null, resultJson);
						// return;
					}
				}else{
					var secureCode = Math.floor(100000 + Math.random() * 900000);
					secureCode = secureCode.toString().substring(0,4);
					var message = '';
					secureCode =  parseInt(secureCode);
					//secureCode =  1234;
					message += "Your Learning-Bix Verification code is  " + secureCode + "\n";
					var newMob='+91'+phone;
					request({
						url: 'http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles='+phone+'&tempid=1707161822699439765&sms=You%20are%20just%20one%20step%20away%20from%20accessing%20your%20dashboard%20account%20at%20LearningBix.%20Enter%20'+secureCode+'%20to%20continue.%20Valid%20for%20only%205%20mins.%20Do%20not%20share%20it%20with%20others',
						method: 'GET',
					}, function(error, response, body){
						if(error) {
							console.log(error);
							resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"otp_generate"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							
							resultJson = '{"replyCode":"success","replyMsg":"OTP sent successfully on registered number","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
							
						}
					});
				}	
			}
		});	
	 	
	}); 
}

/* OTP verify*/
function otp_verify(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var phone = '';
	var otp = '';
	
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.otp != 'undefined' && userdata.otp != '') {
		otp = userdata.otp;
	}
	
	pool.getConnection(function (err, connection) {
		///phone =phone.replace(/^0+/, '');
		connection.query('SELECT users.* FROM users WHERE phone="'+phone+'" AND otp="'+otp+'"', function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_verify"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{		
				console.log(users)
				if(users.length > 0){
					var user_id = users[0].id;
					var Que = 'UPDATE users SET verified = "1" WHERE phone ="'+phone+'"';
					connection.query(Que, function(errUpdate, updated){
						if(errUpdate){
							resultJson = '{"replyCode":"error","replyMsg":"'+errUpdate.message+'","cmd":"otp_verify"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							var sid = hashids.encode(users[0].id);
							resultJson = '{"replyCode":"success","replyMsg":"OTP verified","sid":"'+sid+'","data":'+ JSON.stringify(users[0])+', "cmd":"otp_verify"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});			
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Credentials are not valid , Please check ","cmd":"otp_verify"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;	
				}
			}
		});	
	});
}




/*
 * function name :- forgotPassword
 * Description :- to set the user password when user get forgot his password
 * Created :- 11-04-20
*/
function user_forgot_password(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var email = '';
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	
	pool.getConnection(function (err, connection) {
		
		//console.log('Query : SELECT * from users where email="' + email + '"');
		squery ='SELECT users.* from users WHERE users.email="'+email+'"';
		connection.query(squery, function (err, results) {
			if (!err)
			{
				if(results.length > 0){
						if(results[0].status == '1'){
							var secureCode = Math.floor(10000000 + Math.random() * 99999999);
							secureCode = secureCode.toString().substring(0,4);
							secureCode =  parseInt(secureCode);
							//secureCode =  123456;
							console.log(secureCode);
							var reset_code  = secureCode;
							var hash_newpassword = sha1(secretSalt + reset_code);
						   
							var message = '';
							message += "Please use this temporary key(" + secureCode + ") for login , Please change password for future use. \n\n";	
							
							connection.query('UPDATE users SET  password = "'+hash_newpassword+'",password_text="'+secureCode+'" WHERE email = "'+email+'"', function(errs, updated){
								if(errs){
									resultJson = '{"replyCode":"error","replyMsg":"' + errs.message + '","cmd":"forgotPassword"}\n';
									connection.release();
									callback(400, null, resultJson);
									return;
								}else{
									connection.query('SELECT * FROM email_templates WHERE email_type = "forgot_password"', function(err, resultTemplate){
										if(resultTemplate.length > 0){
											var nodemailer = require('nodemailer');
											var message = resultTemplate[0].message;
											var name =results[0].fullName;
											var email =results[0].email;
											message = message.replace("[fullname]", name);
											message = message.replace("[EMAIL]", email);
											message = message.replace("[PASSWORD]", reset_code);
											message = message.replace("[sitename]", SITE_TITLE);

											// setup e-mail data with unicode symbols
											var mailOptions = {
												from: SITE_TITLE+' <info@learning-bix.com>', // sender address
												to: email, // list of receivers
												subject: resultTemplate[0].subject, // Subject line
												html: message // html body
											};
												//from: smtpMailUser,
												
											var transporter = nodemailer.createTransport(smtpConfig);

											// var id = hashids.encode(results[0].id);
											// resultJson = '{"replyCode":"success","resetCode":"'+reset_code+'","sid":"'+id+'","replyMsg":"You will get temporary password on your mail inbox, Please check."}\n';
											// connection.release();
											// callback(200, null, resultJson);
											// return;
											// send mail with defined transport object

											transporter.sendMail(mailOptions, function (error, info) {
												if (error) {
													console.log('ERRPR-EAMIL',error);
													var id = hashids.encode(results[0].id);
													resultJson = '{"replyCode":"success","resetCode":"'+reset_code+'","sid":"'+id+'","replyMsg":"You will get temporary password on your mail inbox, Please check."}\n';
													connection.release();
													callback(200, null, resultJson);
													return;
												} else {
													var id = hashids.encode(results[0].id);
													resultJson = '{"replyCode":"success","resetCode":"'+reset_code+'","sid":"'+id+'","replyMsg":"You will get temporary password on your mail inbox, Please check."}\n';
													connection.release();
													callback(200, null, resultJson);
													return;
												
												}
											});
										}
									});
								}
							});
							
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"Your are not authorized .","cmd":"forgotPassword"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Not a registered Phone, Please check.","cmd":"forgotPassword"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"forgotPassword"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}


// reset password 

function reset_password(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var password = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	
	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	console.log(userdata);
	pool.getConnection(function (err, connection) {
		var hash_newpassword = sha1(secretSalt + password);
		
		var uid = hashids.decode(sid);
		console.log('UPDATE users SET password = "'+hash_newpassword+'",password_text="'+password+'"  WHERE id = "'+uid+'"');
		connection.query('UPDATE users SET password = "'+hash_newpassword+'",password_text="'+password+'"  WHERE id = "'+uid+'"', function(errs, done){
			if(errs){
				resultJson = '{"replyCode":"error","replyMsg":"' + errs.message + '","cmd":"reset_password"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Password has been changed successfully","cmd":"reset_password"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//register student

function register_student(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var id = '';
	var name = '';
	var email = '';
	var image = '';
	var password = '';	
	var role_id = '2';//1-admin,2-student,3-teacher,4-subadmin
	var phone = '';
	var gender= '1'; //	1-male,2-female,3-other
	var age= '0';
	var time_zone= '0';
	var dob= '0000-00-00';
	var parents_name= ' Parent';
	var school_name= '';
	var subscription_type= '0';//0-trail,1-paid
	var time_from= '0'
	var time_to= '0';
	var demo_class_date= '';
	var refferal_code= '';
	var learning= '0';
	var age_group_id= '';
	var address= '';
	var facebook_id= '';
	var google_id= '';
	var RelatedProspectId= '';
	var state= '';
	var gst= '';
	var sponsor_code= '';
	var school_code='';
	var city='';
	var pincode='';
	var country='';
	var school_code='';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}else{
		var secureCode = Math.floor(10000000 + Math.random() * 99999999);
		secureCode = secureCode.toString().substring(0,4);
		secureCode =  parseInt(secureCode);
		console.log(secureCode);
		password = secureCode;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}
	
	if (typeof userdata.phone_no != 'undefined' && userdata.phone_no != '') {
		phone = userdata.phone_no;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	
	if (typeof userdata.time_zone != 'undefined' && userdata.time_zone != '') {
		time_zone = userdata.time_zone;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.parents_name != 'undefined' && userdata.parents_name != '') {
		parents_name = userdata.parents_name;
	}
	if (typeof userdata.school_name != 'undefined' && userdata.school_name != '') {
		school_name = userdata.school_name;
	}
	if (typeof userdata.subscription_type != 'undefined' && userdata.subscription_type != '') {
		subscription_type = userdata.subscription_type;
	}
	
	if (typeof userdata.time_from != 'undefined' && userdata.time_from != '') {
		time_from = userdata.time_from;
	}
	
	if (typeof userdata.time_to != 'undefined' && userdata.time_to != '') {
		time_to = userdata.time_to;
	}
	if (typeof userdata.demo_class_date != 'undefined' && userdata.demo_class_date != '') {
		demo_class_date = userdata.demo_class_date;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.address != 'undefined' && userdata.address != '') {
		address = userdata.address;
	}
	if (typeof userdata.facebook_id != 'undefined' && userdata.facebook_id != '') {
		facebook_id = userdata.facebook_id;
	}
	if (typeof userdata.google_id != 'undefined' && userdata.google_id != '') {
		google_id = userdata.google_id;
	}
	if (typeof userdata.RelatedProspectId != 'undefined' && userdata.RelatedProspectId != '') {
		RelatedProspectId = userdata.RelatedProspectId;
	}
	if (typeof userdata.state != 'undefined' && userdata.state != '') {
		state = userdata.state;
	}
	if (typeof userdata.gst != 'undefined' && userdata.gst != '') {
		gst = userdata.gst;
	}
	if (typeof userdata.sponsor_code != 'undefined' && userdata.sponsor_code != '') {
		sponsor_code = userdata.sponsor_code;
	}
	
	if (typeof userdata.city != 'undefined' && userdata.city != '') {
		city = userdata.city;
	}
	if (typeof userdata.pincode != 'undefined' && userdata.pincode != '') {
		pincode = userdata.pincode;
	}
	if (typeof userdata.country != 'undefined' && userdata.country != '') {
		country = userdata.country;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		
		var hash_password = sha1(secretSalt + userdata.password);
		var checkEmail ='SELECT * from users where email = "'+email+'" AND email != ""';
		connection.query(checkEmail, function (erremail, resultsemail) {
			if (!erremail){
				var pagingCount1 = resultsemail.length;
				console.log(userdata);
				console.log(pagingCount1);
				if (pagingCount1 > 0){
					if(resultsemail[0].status == '1' && demo_class_date =='' ){
						resultJson = '{"replyCode":"error","replyMsg":"Email already Registered, please try with different email address","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;								
					}else if (resultsemail[0].status == '1' && demo_class_date !=''){
						connection.query('UPDATE users SET learning = "'+learning+'" WHERE email ="'+email+'"');
						var checkPhone ='SELECT * from users where phone = "'+phone+'" AND phone != ""';
						console.log(checkPhone)
						connection.query(checkPhone, function (errphone, resultsphone) {
							if (!errphone){
								if (resultsphone.length > 0){
									
									if(resultsphone[0].status == '1'){

										var user_id = resultsphone[0].id;

										if(demo_class_date !=''){
											console.log('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",status="1",created= NOW()');

											connection.query('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",learning="'+learning+'",status="1",created= NOW()');
											if(learning=='1'){
												var emailMessage ="Dear "+parents_name+",";

												emailMessage +="Congratulations on taking the first step in exploring India’s most scientifically designed curriculum. LearningPie@home ensures that your child evolves beautifully, focusing on all the important skills for early learning- Numeracy, Literacy, Emotional quotient, Reasoning, etc.";
												
												emailMessage +="In the trial version, you get a sneak peek into the course content. Explore the intro video here <Intro Video Link>, or have a glance at a month's curriculum here <Curriculum link>.";
												
												emailMessage +="Lakhs of parents loved our Learning Kit unboxing videos. Watch it here <Unboxing video link>. Once a child enrols with LearningPie@Home, a specially designed kit is delivered to your doorsteps.";
												
												emailMessage +="This kit is a complete Do-It-Yourself (DIY) box, and comes with over 100 play activities- which keeps the child engrossed for over 3 months. Children learn lessons in a playful manner- along with Milo- the digital monkey friend in our Live clases, who grows with your child all along. ";
												
												emailMessage +="What’s more- The child does it from the safety and comfort of their home, with the best teachers across the globe. ";
												
												emailMessage +="Get access to your parent 7 day trial dashboard here < Link for the 7 day trial dashboard>  to explore the creatively designed rhymes, learning activities and more. ";
												
												emailMessage +="User id - "+email+" or "+phone+""; 
												emailMessage +="Password "+password+"";
												
												emailMessage +="NOTE: We highly recommend that you change your password so that it is easy for you to remember. ";
												
												emailMessage +="After you log in, please click on 'My Profile tab' on the top right corner and verify/add the following details:";
												
												emailMessage +="A.	Child’s name";
												emailMessage +="B.	Date of Birth";
												emailMessage +="C.	Child’s age group";
												emailMessage +="D.	Parent’s Mobile number for progress detailsry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												
												emailMessage +="Please contact us @ < +91 80 10 55 44 00>> within 24 hours if any details are incorrect.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="You can also use our live chat on the dashboard with your Early Learning Counsellor between 9 am and 6 pm.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="We hope that the trial encourages you to sign up for the complete course. warmly welcome you again on this super exciting journey. Let us play-learn together.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="Warm Regards,ry to < + 91 78 49 83 55 51> for immediate assistance.";
												emailMessage +="Team LearningPiery to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="PS: Need help? Feel free to email us at <support@learningpie.com>. Alternatively, Call us on < +91 80 10 55 44 00> or Whatsapp your query to < + 91 78 49 83 55 51> for immediate assistance.";
											
												var mailOptions = {
													from: SITE_TITLE+' <info@learning-bix.com>', // sender address
													to: email, // list of receivers
													subject: 'LearningPie@Home Free, 7 day trial is active now', // Subject line
													html: emailMessage // html body
												};
												
												var tempId ='1707162064387383901';
												var msg ="Dear "+parents_name+""; 
												msg ="+Your Learningpie@Home account password is "+password+". Your Demo Dashboard has been unlocked for "+name+" for next 7 Days.";
												msg +="We are excited to be part of "+name+"s foundational learning journey. Happy Exploring! Call us on <8010554400>  for any queries.";
												var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+""
												console.log('message',message);
												var newMob='+91'+phone;
												request({
													url: message,
													method: 'GET',
												}, function(error, response, body){
													if(error) {
														console.log(error);
														var sid = hashids.encode(resultsphone[0].id);
			
														resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "cmd":"register"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
													} else {
														console.log('url',message);
														var sid = hashids.encode(resultsphone[0].id);
														resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "cmd":"register"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
														
													}
												});
												// var transporter = nodemailer.createTransport(smtpConfig);
												// connection.query('UPDATE users SET learning = "'+learning+'" WHERE id ="'+resultsphone[0].id+'"');
												// connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+resultsphone[0].id+'"');
												// // send mail with defined transport object
												// transporter.sendMail(mailOptions, function (error, info) {
												// 	console.log('error',error)
												
												// });
											}else{

												var emailMessage ="Your one time password to login to  App is "+secureCode+"\n";
												emailMessage +="(Powered by TeleHealth Technologies)";
												// setup e-mail data with unicode symbols
												var mailOptions = {
													from: SITE_TITLE+' <info@learning-bix.com>', // sender address
													to: email, // list of receivers
													subject:  'LearningPie@Home Free, 7 day trial is active now', // Subject line
													html: emailMessage // html body
												};
												// var mailOptions = {
												// 	from: SITE_TITLE+' <info@learning-bix.com>', // sender address
												// 	to: "darpanupadhyay11@gmail.com", // list of receivers
												// 	subject: 'LearningPie@Home Free, 7 day trial is active now', // Subject line
												// 	html: emailMessage // html body
												// };
													
												var transporter = nodemailer.createTransport(smtpConfig);
												connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+resultsphone[0].id+'"');
												// send mail with defined transport object
												//transporter.sendMail(mailOptions);
												//phone="7014410620";
												var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837476389193&sms=Dear%20"+parents_name+"%20Demo%20Class%20has%20been%20confirmed%20for%20"+name+"%20on%"+demo_class_date+"%20"+time_from+".%20We%20are%20excited%20to%20teach%20"+name+"%2021st%20Century%20Skills.%20"+name+"%27s%20Personalized%20Teacher%20will%20be%20joining%20the%20class%20on%20time.%20Call%20us%20on%2018008917478%20for%20any%20queries.%20Regards,%20LearningBIX"
											
												var newMob='+91'+phone;
												request({
													url: message,
													method: 'GET',
												}, function(error, response, body){
													if(error) {
														console.log(error);
														var sid = hashids.encode(resultsphone[0].id);
														resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "otp":"'+secureCode+'", "cmd":"register"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
													} else {
														console.log('url',message);
														var sid = hashids.encode(resultsphone[0].id);
														resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "otp":"'+secureCode+'", "cmd":"register"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
														
													}
												});
											}
											

										}else{
											resultJson = '{"replyCode":"success","replyMsg":"Class scheduled successfully."}\n';
											connection.release();
											callback(200, null, resultJson);
											return;

										}
										
																	
									}else{
										resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}	
								}else{
									var refferal_code = Math.floor(10000000 + Math.random() * 99999999);
									refferal_code = refferal_code.toString().substring(0,6);
									refferal_code =  parseInt(refferal_code);

									
									var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "'+name+'",password = "'+hash_password+'",password_text="'+password+'",phone = "'+phone+'",role_id="'+role_id+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",image="'+image+'",subscription_type="'+subscription_type+'",parents_name="'+parents_name+'",school_name="'+school_name+'",refferal_code="'+refferal_code+'",address="'+address+'",learning="'+learning+'",age_group_id="'+age_group_id+'",facebook_id="'+facebook_id+'",google_id="'+google_id+'",RelatedProspectId="'+RelatedProspectId+'",state="'+state+'",gst="'+gst+'",sponsor_code="'+sponsor_code+'",school_code="'+school_code+'",city="'+city+'",pincode="'+pincode+'",country="'+country+'",status="1",verified="1",created= NOW()';
									
									
									console.log(queryinsert);
									connection.query(queryinsert, function(errinsert, resultinsert){
										if(!errinsert){
											var user_id = resultinsert.insertId;
											connection.query('SELECT * FROM users WHERE id = "'+user_id+'"', function(errNew, resNew){
												if(errNew){
													resultJson = '{"replyCode":"error","replyMsg":"'+errNew.message+'.","cmd":"sign_up"}\n';
													connection.release();
													callback(200, null, resultJson);
													return;
												}else{
													var sid = hashids.encode(user_id);
													if(demo_class_date !=''){
														console.log('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",status="1",created= NOW()');
				
														connection.query('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",learning="'+learning+'",status="1",created= NOW()');
														if(learning=='1'){
															var emailMessage ="Dear "+parents_name+",";

															emailMessage +="Congratulations on taking the first step in exploring India’s most scientifically designed curriculum. LearningPie@home ensures that your child evolves beautifully, focusing on all the important skills for early learning- Numeracy, Literacy, Emotional quotient, Reasoning, etc.";
															
															emailMessage +="In the trial version, you get a sneak peek into the course content. Explore the intro video here <Intro Video Link>, or have a glance at a month's curriculum here <Curriculum link>.";
															
															emailMessage +="Lakhs of parents loved our Learning Kit unboxing videos. Watch it here <Unboxing video link>. Once a child enrols with LearningPie@Home, a specially designed kit is delivered to your doorsteps.";
															
															emailMessage +="This kit is a complete Do-It-Yourself (DIY) box, and comes with over 100 play activities- which keeps the child engrossed for over 3 months. Children learn lessons in a playful manner- along with Milo- the digital monkey friend in our Live clases, who grows with your child all along. ";
															
															emailMessage +="What’s more- The child does it from the safety and comfort of their home, with the best teachers across the globe. ";
															
															emailMessage +="Get access to your parent 7 day trial dashboard here < Link for the 7 day trial dashboard>  to explore the creatively designed rhymes, learning activities and more. ";
															
															emailMessage +="User id - "+email+" or "+phone+""; 
															emailMessage +="Password "+password+"";
															
															emailMessage +="NOTE: We highly recommend that you change your password so that it is easy for you to remember. ";
															
															emailMessage +="After you log in, please click on 'My Profile tab' on the top right corner and verify/add the following details:";
															
															emailMessage +="A.	Child’s name";
															emailMessage +="B.	Date of Birth";
															emailMessage +="C.	Child’s age group";
															emailMessage +="D.	Parent’s Mobile number for progress detailsry to < + 91 78 49 83 55 51> for immediate assistance.";
															
															
															emailMessage +="Please contact us @ < +91 80 10 55 44 00>> within 24 hours if any details are incorrect.ry to < + 91 78 49 83 55 51> for immediate assistance.";
															
															emailMessage +="You can also use our live chat on the dashboard with your Early Learning Counsellor between 9 am and 6 pm.ry to < + 91 78 49 83 55 51> for immediate assistance.";
															
															emailMessage +="We hope that the trial encourages you to sign up for the complete course. warmly welcome you again on this super exciting journey. Let us play-learn together.ry to < + 91 78 49 83 55 51> for immediate assistance.";
															
															emailMessage +="Warm Regards,ry to < + 91 78 49 83 55 51> for immediate assistance.";
															emailMessage +="Team LearningPiery to < + 91 78 49 83 55 51> for immediate assistance.";
															
															emailMessage +="PS: Need help? Feel free to email us at <support@learningpie.com>. Alternatively, Call us on < +91 80 10 55 44 00> or Whatsapp your query to < + 91 78 49 83 55 51> for immediate assistance.";
														
															var mailOptions = {
																from: SITE_TITLE+' <info@learning-bix.com>', // sender address
																to: email, // list of receivers
																subject: 'LearningPie@Home Free, 7 day trial is active now', // Subject line
																html: emailMessage // html body
															};
																
															var transporter = nodemailer.createTransport(smtpConfig);
															connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+user_id+'"');
															connection.query('UPDATE users SET learning = "'+learning+'" WHERE id ="'+resultsphone[0].id+'"');
															// send mail with defined transport object
															// transporter.sendMail(mailOptions, function (error, info) {
															// 	console.log('error',error)
															// 	//phone="7014410620";
																
															// });
															var tempId ='1707162064387383901';
																var msg ="Dear "+parents_name+""; 
																msg ="+Your Learningpie@Home account password is "+password+". Your Demo Dashboard has been unlocked for "+name+" for next 7 Days.";
																msg +="We are excited to be part of "+name+"s foundational learning journey. Happy Exploring! Call us on <8010554400>  for any queries.";
																var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+""
														
																var newMob='+91'+phone;
																request({
																	url: message,
																	method: 'GET',
																}, function(error, response, body){
																	if(error) {
																		console.log(error);
																		resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'", "cmd":"register","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+'}\n';
																		console.log('res-suceess');
																		connection.release();
																		callback(200, null, resultJson);
																		return;
																	} else {
																		console.log('url',message);
																		resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'", "cmd":"register","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+'}\n';
																		console.log('res-suceess');
																		connection.release();
																		callback(200, null, resultJson);
																		return;
																		
																	}
																});
														}else{
															var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837476389193&sms=Dear%20"+parents_name+"%20Demo%20Class%20has%20been%20confirmed%20for%20"+name+"%20on%"+demo_class_date+"%20"+time_from+".%20We%20are%20excited%20to%20teach%20"+name+"%2021st%20Century%20Skills.%20"+name+"%27s%20Personalized%20Teacher%20will%20be%20joining%20the%20class%20on%20time.%20Call%20us%20on%2018008917478%20for%20any%20queries.%20Regards,%20LearningBIX"
															var newMob='+91'+phone;
															request({
																url: message,
																method: 'GET',
															}, function(error, response, body){
																if(error) {
																	console.log(error);
																	resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+',"cmd":"register"}\n';
																	console.log('res-suceess');
																	connection.release();
																	callback(200, null, resultJson);
																	return;
																	
																} else {
																
																	resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+' ,"cmd":"register"}\n';
																	console.log('res-suceess');
																	connection.release();
																	callback(200, null, resultJson);
																	return;
																	
																}
															});
														}
														
													}else{
														connection.query('SELECT * FROM email_templates WHERE email_type = "registration_user"', function(err, resultTemplate){
															if(resultTemplate.length > 0){
																var nodemailer = require('nodemailer');
																var message = resultTemplate[0].message;
																
																message = message.replace("[username]", name);
																message = message.replace("[sitename]", SITE_TITLE);
							
																// setup e-mail data with unicode symbols
																var mailOptions = {
																	from: SITE_TITLE+' <info@learning-bix.com>', // sender address
																	to: email, // list of receivers
																	subject: resultTemplate[0].subject, // Subject line
																	html: message // html body
																};
																	//from: smtpMailUser,
																	
																// var transporter = nodemailer.createTransport(smtpConfig);
							
																// // send mail with defined transport object
																// transporter.sendMail(mailOptions, function (error, info) {
																// 	if (error) {
																// 		console.log('ERRPR-EAMIL',error);
																		
																// 	} else {
																		
																// 	}
																// });
																resultJson = '{"replyCode":"success","replyMsg":"registered successfully","otp":"'+secureCode+'", "cmd":"register"}\n';
																console.log('res-suceess');
																connection.release();
																callback(200, null, resultJson);
																return;
															}
														});	
													}
												}
											})	

											
										}else{
											
											resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"sign_up"}\n';
											console.log('res-suceess');
											connection.release();
											callback(400, null, resultJson);
											return;
										}
									});
								}
							}else{
								resultJson = '{"replyCode":"error","replyMsg":"' + errphone.message + '","cmd":"sign_up"}\n';
								connection.release();
								callback(400, null, resultJson);
								return;
							}
						})
					}else{
						resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}	
				}else{
					var checkPhone ='SELECT * from users where phone = "'+phone+'" AND phone != ""';
					console.log(checkPhone)
					connection.query(checkPhone, function (errphone, resultsphone) {
						if (!errphone){
							if (resultsphone.length > 0){
								
								if(resultsphone[0].status == '1'){

									var user_id = resultsphone[0].id;

									if(demo_class_date !=''){
										console.log('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",status="1",created= NOW()');

										connection.query('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",learning="'+learning+'",status="1",created= NOW()');
									
										if(learning=='1'){
											var emailMessage ="Dear "+parents_name+",";

												emailMessage +="Congratulations on taking the first step in exploring India’s most scientifically designed curriculum. LearningPie@home ensures that your child evolves beautifully, focusing on all the important skills for early learning- Numeracy, Literacy, Emotional quotient, Reasoning, etc.";
												
												emailMessage +="In the trial version, you get a sneak peek into the course content. Explore the intro video here <Intro Video Link>, or have a glance at a month's curriculum here <Curriculum link>.";
												
												emailMessage +="Lakhs of parents loved our Learning Kit unboxing videos. Watch it here <Unboxing video link>. Once a child enrols with LearningPie@Home, a specially designed kit is delivered to your doorsteps.";
												
												emailMessage +="This kit is a complete Do-It-Yourself (DIY) box, and comes with over 100 play activities- which keeps the child engrossed for over 3 months. Children learn lessons in a playful manner- along with Milo- the digital monkey friend in our Live clases, who grows with your child all along. ";
												
												emailMessage +="What’s more- The child does it from the safety and comfort of their home, with the best teachers across the globe. ";
												
												emailMessage +="Get access to your parent 7 day trial dashboard here < Link for the 7 day trial dashboard>  to explore the creatively designed rhymes, learning activities and more. ";
												
												emailMessage +="User id - "+email+" or "+phone+""; 
												emailMessage +="Password "+password+"";
												
												emailMessage +="NOTE: We highly recommend that you change your password so that it is easy for you to remember. ";
												
												emailMessage +="After you log in, please click on 'My Profile tab' on the top right corner and verify/add the following details:";
												
												emailMessage +="A.	Child’s name";
												emailMessage +="B.	Date of Birth";
												emailMessage +="C.	Child’s age group";
												emailMessage +="D.	Parent’s Mobile number for progress detailsry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												
												emailMessage +="Please contact us @ < +91 80 10 55 44 00>> within 24 hours if any details are incorrect.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="You can also use our live chat on the dashboard with your Early Learning Counsellor between 9 am and 6 pm.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="We hope that the trial encourages you to sign up for the complete course. warmly welcome you again on this super exciting journey. Let us play-learn together.ry to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="Warm Regards,ry to < + 91 78 49 83 55 51> for immediate assistance.";
												emailMessage +="Team LearningPiery to < + 91 78 49 83 55 51> for immediate assistance.";
												
												emailMessage +="PS: Need help? Feel free to email us at <support@learningpie.com>. Alternatively, Call us on < +91 80 10 55 44 00> or Whatsapp your query to < + 91 78 49 83 55 51> for immediate assistance.";
											
												var mailOptions = {
													from: SITE_TITLE+' <info@learning-bix.com>', // sender address
													to: email, // list of receivers
													subject: 'LearningPie@Home Free, 7 day trial is active now', // Subject line
													html: emailMessage // html body
												};
													
												var transporter = nodemailer.createTransport(smtpConfig);
												connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+resultsphone[0].id+'"');
												connection.query('UPDATE users SET learning = "'+learning+'" WHERE id ="'+resultsphone[0].id+'"');
												// send mail with defined transport object
												// transporter.sendMail(mailOptions, function (error, info) {
												// 	console.log('error',error)
												// 	//phone="7014410620";
													
												// });
												var tempId ='1707162064387383901';
													var msg ="Dear "+parents_name+""; 
													msg ="+Your Learningpie@Home account password is "+password+". Your Demo Dashboard has been unlocked for "+name+" for next 7 Days.";
													msg +="We are excited to be part of "+name+"s foundational learning journey. Happy Exploring! Call us on <8010554400>  for any queries.";
													var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+""
											
													var newMob='+91'+phone;
													request({
														url: message,
														method: 'GET',
													}, function(error, response, body){
														if(error) {
															console.log(error);
															var sid = hashids.encode(resultsphone[0].id);
															resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "cmd":"register"}\n';
															console.log('res-suceess');
															connection.release();
															callback(200, null, resultJson);
															return;
														} else {
															console.log('url',message);
															var sid = hashids.encode(resultsphone[0].id);
															resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "cmd":"register"}\n';
															console.log('res-suceess');
															connection.release();
															callback(200, null, resultJson);
															return;
															
														}
													});
										}else{
											var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837476389193&sms=Dear%20"+parents_name+"%20Demo%20Class%20has%20been%20confirmed%20for%20"+name+"%20on%"+demo_class_date+"%20"+time_from+".%20We%20are%20excited%20to%20teach%20"+name+"%2021st%20Century%20Skills.%20"+name+"%27s%20Personalized%20Teacher%20will%20be%20joining%20the%20class%20on%20time.%20Call%20us%20on%2018008917478%20for%20any%20queries.%20Regards,%20LearningBIX"
											var newMob='+91'+phone;
											request({
												url: message,
												method: 'GET',
											}, function(error, response, body){
												if(error) {
													console.log(error);
													resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"register"}\n';
													connection.release();
													callback(200, null, resultJson);
													return;
												} else {
													var sid = hashids.encode(resultsphone[0].id);
													resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resultsphone[0])+', "cmd":"register"}\n';
													console.log('res-suceess');
													connection.release();
													callback(200, null, resultJson);
													return;
													
												}
											});
										}
										

									}else{
										resultJson = '{"replyCode":"error","replyMsg":"Phone number already registered .","cmd":"sign_up"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}

									
																
								}else{
									resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}	
							}else{
								var refferal_code = Math.floor(10000000 + Math.random() * 99999999);
								refferal_code = refferal_code.toString().substring(0,6);
								refferal_code =  parseInt(refferal_code);
								var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "'+name+'",password = "'+hash_password+'",password_text="'+password+'",phone = "'+phone+'",role_id="'+role_id+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",image="'+image+'",subscription_type="'+subscription_type+'",parents_name="'+parents_name+'",school_name="'+school_name+'",refferal_code="'+refferal_code+'",address="'+address+'",learning="'+learning+'",age_group_id="'+age_group_id+'",facebook_id="'+facebook_id+'",google_id="'+google_id+'",RelatedProspectId="'+RelatedProspectId+'",state="'+state+'",gst="'+gst+'",sponsor_code="'+sponsor_code+'",school_code="'+school_code+'",city="'+city+'",pincode="'+pincode+'",country="'+country+'",status="1",verified="1",created= NOW()';
								
								
								console.log(queryinsert);
								connection.query(queryinsert, function(errinsert, resultinsert){
									if(!errinsert){
										var user_id = resultinsert.insertId;
										connection.query('SELECT * FROM users WHERE id = "'+user_id+'"', function(errNew, resNew){
											if(errNew){
												resultJson = '{"replyCode":"error","replyMsg":"'+errNew.message+'.","cmd":"sign_up"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;
											}else{
												var sid = hashids.encode(user_id);
												if(demo_class_date !=''){
													console.log('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",status="1",created= NOW()');
			
													connection.query('INSERT INTO demo_class_requests SET user_id="' + user_id + '",time_from = "'+time_from+'", time_to = "'+time_to+'",demo_class_date = "'+demo_class_date+'",learning="'+learning+'",status="1",created= NOW()');
													if(learning=='1'){
														var emailMessage ="Dear "+parents_name+",";
		
														emailMessage +="Congratulations on taking the first step in exploring India’s most scientifically designed curriculum. LearningPie@home ensures that your child evolves beautifully, focusing on all the important skills for early learning- Numeracy, Literacy, Emotional quotient, Reasoning, etc.";
														
														emailMessage +="In the trial version, you get a sneak peek into the course content. Explore the intro video here <Intro Video Link>, or have a glance at a month's curriculum here <Curriculum link>.";
														
														emailMessage +="Lakhs of parents loved our Learning Kit unboxing videos. Watch it here <Unboxing video link>. Once a child enrols with LearningPie@Home, a specially designed kit is delivered to your doorsteps.";
														
														emailMessage +="This kit is a complete Do-It-Yourself (DIY) box, and comes with over 100 play activities- which keeps the child engrossed for over 3 months. Children learn lessons in a playful manner- along with Milo- the digital monkey friend in our Live clases, who grows with your child all along. ";
														
														emailMessage +="What’s more- The child does it from the safety and comfort of their home, with the best teachers across the globe. ";
														
														emailMessage +="Get access to your parent 7 day trial dashboard here < Link for the 7 day trial dashboard>  to explore the creatively designed rhymes, learning activities and more. ";
														
														emailMessage +="User id - "+email+" or "+phone+""; 
														emailMessage +="Password "+password+"";
														
														emailMessage +="NOTE: We highly recommend that you change your password so that it is easy for you to remember. ";
														
														emailMessage +="After you log in, please click on 'My Profile tab' on the top right corner and verify/add the following details:";
														
														emailMessage +="A.	Child’s name";
														emailMessage +="B.	Date of Birth";
														emailMessage +="C.	Child’s age group";
														emailMessage +="D.	Parent’s Mobile number for progress detailsry to < + 91 78 49 83 55 51> for immediate assistance.";
														
														
														emailMessage +="Please contact us @ < +91 80 10 55 44 00>> within 24 hours if any details are incorrect.ry to < + 91 78 49 83 55 51> for immediate assistance.";
														
														emailMessage +="You can also use our live chat on the dashboard with your Early Learning Counsellor between 9 am and 6 pm.ry to < + 91 78 49 83 55 51> for immediate assistance.";
														
														emailMessage +="We hope that the trial encourages you to sign up for the complete course. warmly welcome you again on this super exciting journey. Let us play-learn together.ry to < + 91 78 49 83 55 51> for immediate assistance.";
														
														emailMessage +="Warm Regards,ry to < + 91 78 49 83 55 51> for immediate assistance.";
														emailMessage +="Team LearningPiery to < + 91 78 49 83 55 51> for immediate assistance.";
														
														emailMessage +="PS: Need help? Feel free to email us at <support@learningpie.com>. Alternatively, Call us on < +91 80 10 55 44 00> or Whatsapp your query to < + 91 78 49 83 55 51> for immediate assistance.";
													
														var mailOptions = {
															from: SITE_TITLE+' <info@learning-bix.com>', // sender address
															to: email, // list of receivers
															subject: 'LearningPie@Home Free, 7 day trial is active now', // Subject line
															html: emailMessage // html body
														};
															
														var transporter = nodemailer.createTransport(smtpConfig);
														connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+user_id+'"');
														connection.query('UPDATE users SET learning = "'+learning+'" WHERE id ="'+user_id+'"');
														// send mail with defined transport object
														// transporter.sendMail(mailOptions, function (error, info) {
														// 	console.log('error',error)
														// 	//phone="7014410620";
															
														// });
														var tempId ='1707162064387383901';
															var msg ="Dear "+parents_name+""; 
															msg ="+Your Learningpie@Home account password is "+password+". Your Demo Dashboard has been unlocked for "+name+" for next 7 Days.";
															msg +="We are excited to be part of "+name+"s foundational learning journey. Happy Exploring! Call us on <8010554400>  for any queries.";
															var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+""
													
															var newMob='+91'+phone;
															request({
																url: message,
																method: 'GET',
															}, function(error, response, body){
																if(error) {
																	console.log(error);
																	resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+', "cmd":"register"}\n';
																	console.log('res-suceess');
																	connection.release();
																	callback(200, null, resultJson);
																	return;
																} else {
																	console.log('url',message);
																	resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+', "cmd":"register"}\n';
																	console.log('res-suceess');
																	connection.release();
																	callback(200, null, resultJson);
																	return;
																	
																}
															});
													}else{
														var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837476389193&sms=Dear%20"+parents_name+"%20Demo%20Class%20has%20been%20confirmed%20for%20"+name+"%20on%"+demo_class_date+"%20"+time_from+".%20We%20are%20excited%20to%20teach%20"+name+"%2021st%20Century%20Skills.%20"+name+"%27s%20Personalized%20Teacher%20will%20be%20joining%20the%20class%20on%20time.%20Call%20us%20on%2018008917478%20for%20any%20queries.%20Regards,%20LearningBIX"
		
														var newMob='+91'+phone;
														request({
															url: message,
															method: 'GET',
														}, function(error, response, body){
															if(error) {
																console.log(error);
																
																resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+', "cmd":"register"}\n';
																console.log('res-suceess');
																connection.release();
																callback(200, null, resultJson);
																return;
															} else {
																//console.log(response)
																console.log('url',message);
																resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+',"cmd":"register"}\n';
																console.log('res-suceess');
																connection.release();
																callback(200, null, resultJson);
																return;
																
															}
														});
													}
													
		
												}else{
													connection.query('SELECT * FROM email_templates WHERE email_type = "registration_user"', function(err, resultTemplate){
														if(resultTemplate.length > 0){
															var nodemailer = require('nodemailer');
															var message = resultTemplate[0].message;
															
															message = message.replace("[username]", name);
															message = message.replace("[sitename]", SITE_TITLE);
						
															// setup e-mail data with unicode symbols
															var mailOptions = {
																from: SITE_TITLE+' <info@learning-bix.com>', // sender address
																to: email, // list of receivers
																subject: resultTemplate[0].subject, // Subject line
																html: message // html body
															};
																//from: smtpMailUser,
																
															// var transporter = nodemailer.createTransport(smtpConfig);
						
															// // send mail with defined transport object
															// transporter.sendMail(mailOptions, function (error, info) {
															// 	if (error) {
															// 		console.log('ERRPR-EAMIL',error);
															// 		resultJson = '{"replyCode":"success","replyMsg":"Registered successfully","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+'}\n';
															// 		connection.release();
															// 		callback(200, null, resultJson);
															// 		return;
															// 	} else {
																	
																
																
															// 	}
															// });
															resultJson = '{"replyCode":"success","replyMsg":"Registered successfully.","sid":"'+sid+'","data":'+ JSON.stringify(resNew[0])+'}\n';
															connection.release();
															callback(200, null, resultJson);
															return;
														}
													});	
												}
											}
										})		
										

									}else{
										
										resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"sign_up"}\n';
										console.log('res-suceess');
										connection.release();
										callback(400, null, resultJson);
										return;
									}
								});
							}
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"' + errphone.message + '","cmd":"sign_up"}\n';
							connection.release();
							callback(400, null, resultJson);
							return;
						}
					})
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + erremail.message + '","cmd":"sign_up"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		})
	});
}


function update_student_profile(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var id = '';
	var name = '';
	var gender= '1'; //	1-male,2-female,3-other
	var age= '0';
	var time_zone= '0';
	var dob= '0000-00-00';
	var parents_name= '';
	var school_name= '';
	var address='';
	var state='';
	var gst='';
	var city='';
	var pincode='';
	var country='';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}
	
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	
	if (typeof userdata.time_zone != 'undefined' && userdata.time_zone != '') {
		time_zone = userdata.time_zone;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	
	if (typeof userdata.parents_name != 'undefined' && userdata.parents_name != '') {
		parents_name = userdata.parents_name;
	}
	if (typeof userdata.school_name != 'undefined' && userdata.school_name != '') {
		school_name = userdata.school_name;
	}
	
	if (typeof userdata.address != 'undefined' && userdata.address != '') {
		address = userdata.address;
	}
	
	if (typeof userdata.state != 'undefined' && userdata.state != '') {
		state = userdata.state;
	}
	if (typeof userdata.gst != 'undefined' && userdata.gst != '') {
		gst = userdata.gst;
	}
	
	if (typeof userdata.city != 'undefined' && userdata.city != '') {
		city = userdata.city;
	}
	if (typeof userdata.pincode != 'undefined' && userdata.pincode != '') {
		pincode = userdata.pincode;
	}
	if (typeof userdata.country != 'undefined' && userdata.country != '') {
		country = userdata.country;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		
		var queryinsert = 'UPDATE users SET name = "'+name+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",parents_name="'+parents_name+'",school_name="'+school_name+'",address="'+address+'",state="'+state+'",gst="'+gst+'",city="'+city+'",pincode="'+pincode+'",country="'+country+'",profile_update="1" where id ="'+id+'"';
								
		console.log(queryinsert);
		connection.query(queryinsert, function(errinsert, resultinsert){
			if(!errinsert){
				resultJson = '{"replyCode":"success","replyMsg":"Profile updated successfully"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				
				resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"update_student_profile"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

//update profile image

function update_profile_image(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var id = '';
	var image =''; 
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id =userdata.id;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	pool.getConnection(function (err, connection) {
		
		squery ='UPDATE users SET image = "'+image+'" WHERE id = "'+id+'"';
		connection.query(squery, function(errselect, resultselect){
			if(!errselect){
				console.log(resultselect);
				resultJson = '{"replyCode":"success","replyMsg":"Profile image updated successfully","cmd":"update_profile_image"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"'+errselect.message+'","cmd":"update_profile_image"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});	
}

/* demo class time slots */
function demo_class_time_slots(userdata, pool, callback){
	var resultJson = '';
	
	pool.getConnection(function (err, connection) {
		
		var Catquery='SELECT demo_class_settings.* FROM demo_class_settings  WHERE  id="1" LIMIT 1';
		
		connection.query(Catquery, function(err, result){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"demo_class_time_slots"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;

			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Time slots list","data":'+JSON.stringify(result[0])+', "cmd":"demo_class_time_slots"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}
		});	
	});
}


// register Teacher


function register_teacher(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var name = '';
	var email = '';
	var qualification = '';
	var image = '';
	var password = '123456';	
	var role_id = '3';//1-admin,2-student,3-teacher,4-subadmin
	var phone = '';
	var gender= '1'; //	1-male,2-female,3-other
	var age= '0';
	var time_zone= '0';
	var dob= '0000-00-00';
	var work_experience= '1';
	var job_type= '1'; //	1-fulltime,2-parttime
	var resume='';
	var sponsor_code='';
	var school_code='';
	var state='';
	var gst='';
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.state != 'undefined' && userdata.state != '') {
		state = userdata.state;
	}
	
	if (typeof userdata.gst != 'undefined' && userdata.gst != '') {
		gst = userdata.gst;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}
	
	if (typeof userdata.phone_no != 'undefined' && userdata.phone_no != '') {
		phone = userdata.phone_no;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	
	if (typeof userdata.time_zone != 'undefined' && userdata.time_zone != '') {
		time_zone = userdata.time_zone;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.job_type != 'undefined' && userdata.job_type != '') {
		job_type = userdata.job_type;
	}
	if (typeof userdata.work_experience != 'undefined' && userdata.work_experience != '') {
		work_experience = userdata.work_experience;
	}
	if (typeof userdata.qualification != 'undefined' && userdata.qualification != '') {
		qualification = userdata.qualification;
	}
	if (typeof userdata.resume != 'undefined' && userdata.resume != '') {
		resume = userdata.resume;
	}
	if (typeof userdata.sponsor_code != 'undefined' && userdata.sponsor_code != '') {
		sponsor_code = userdata.sponsor_code;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		
		var hash_password = sha1(secretSalt + userdata.password);
		var checkEmail ='SELECT * from users where email = "'+email+'" AND email != "" AND role_id="3"';
		connection.query(checkEmail, function (erremail, resultsemail) {
			if (!erremail){
				var pagingCount1 = resultsemail.length;
				console.log(userdata);
				console.log(pagingCount1);
				if (pagingCount1 > 0){
					if(resultsemail[0].status == '1'){
						resultJson = '{"replyCode":"error","replyMsg":"Email already Registered, please try with different email address","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;								
					}else{
						resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}	
				}else{
					var checkPhone ='SELECT * from users where phone = "'+phone+'" AND phone != "" AND role_id="3"';
					console.log(checkPhone);
					connection.query(checkPhone, function (errphone, resultsphone) {
						if (!errphone){
							if (resultsphone.length > 0){
								if(resultsphone[0].status == '1'){
									resultJson = '{"replyCode":"error","replyMsg":"Phone already Registered, please try with different Phone number","cmd":"sign_up"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;								
								}else{
									resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}	
							}else{
								var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "'+name+'",password = "'+hash_password+'",password_text="'+password+'" ,phone = "'+phone+'",role_id="'+role_id+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",image="'+image+'",job_type="'+job_type+'",work_experience="'+work_experience+'",qualification="'+qualification+'",resume="'+resume+'",state="'+state+'",gst="'+gst+'",sponsor_code="'+sponsor_code+'",school_code="'+school_code+'",status="1",verified="0",created= NOW()';
								
								
								console.log(queryinsert);
								connection.query(queryinsert, function(errinsert, resultinsert){
									if(!errinsert){
										var user_id = resultinsert.insertId;
										
										var checkShecduleDate ='SELECT * from demo_class_settings where id = "2" ';
										console.log(checkShecduleDate);
										connection.query(checkShecduleDate, function (errSchedule, resultsSchedule) {
											if (errSchedule){
												resultJson = '{"replyCode":"error","replyMsg":"'+errSchedule.message+'","cmd":"sign_up"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;	
											}else{
												console.log('resultsSchedule',resultsSchedule[0]);
												console.log('Curdate',Curdate);
												var teacher_id=user_id;
												var NewSchDate='';
												for (var i = 0; i <=29; i++) {
													//repeating code here:
													var myDate = new Date();
													myDate.setDate(myDate.getDate() + i);
													NewSchDate =myDate.getFullYear()+"-"+ parseInt(myDate.getMonth()+1)+"-"+ myDate.getDate();
													
													var tday = weekday[myDate.getDay()];
													tday = tday.toLowerCase();
													tday = tday.toString();
													if(resultsSchedule[0][tday]=="1"){
														console.log('yes');
														var datequery ='INSERT INTO user_time_schedule SET teacher_id="' + teacher_id + '",schedule_date = "'+NewSchDate+'", available = "1",holiday = "0",status="1",created= NOW()';
													}else{
														console.log('no');
														var datequery ='INSERT INTO user_time_schedule SET teacher_id="' + teacher_id + '",schedule_date = "'+NewSchDate+'", available = "0",holiday = "1",status="1",created= NOW()';
													}
													connection.query(datequery, function(errinsertDAte, resultinsertDate){
														if(!errinsertDAte){
															var dateId = resultinsertDate.insertId;
															// console.log('--time_from---',resultsSchedule[0].time_from);
															// console.log('--time_to---',resultsSchedule[0].time_to);
															// console.log('--class_duration---',resultsSchedule[0].class_duration);
															var startTime = resultsSchedule[0].time_from;
															var endTime = resultsSchedule[0].time_to;
															var interval =resultsSchedule[0].class_duration;
															while(startTime <= endTime ){

																startTimeTo = startTime; 
																startTime = addMinutes(startTime , interval); 
																endTimeTo = addMinutes(startTimeTo , interval); 
																console.log('Time-slot-startTimeTo',startTimeTo)
																console.log('Time-slot-endTimeTo',endTimeTo)
																
																console.log('Tdate',NewSchDate)
																var TimeInsertquery ='INSERT INTO user_time_schedule_slots SET schedule_id="'+dateId+'",teacher_id="' + teacher_id + '",time_from="'+startTimeTo+'",time_to="'+endTimeTo+'",available = "0",holiday = "0",status="1",created= NOW()';
																connection.query(TimeInsertquery);
															}
														}else{
															resultJson = '{"replyCode":"error","replyMsg":"'+errinsertDAte.message+'","cmd":"sign_up"}\n';
															connection.release();
															callback(200, null, resultJson);
															return;	
														}
													})	
													
												}

											}
										})

										
									}else{
										
										resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"sign_up"}\n';
										console.log('res-suceess');
										connection.release();
										callback(400, null, resultJson);
										return;
									}
								});
							}
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"' + errphone.message + '","cmd":"sign_up"}\n';
							connection.release();
							callback(400, null, resultJson);
							return;
						}
					})
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + erremail.message + '","cmd":"sign_up"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		})
	});
}

function addMinutes(time, minsToAdd) {
	function D(J){ return (J<10? '0':'') + J;};
	var piece = time.split(':');
	var mins = piece[0]*60 + +piece[1] + +minsToAdd;
  
	return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
  }  //this is working

function update_teacher_profile(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var id='';
	var name = '';
	var qualification = '';
	var gender= '1'; //	1-male,2-female,3-other
	var age= '0';
	var time_zone= '0';
	var dob= '0000-00-00';
	var work_experience= '1';
	var job_type= '1'; //	1-fulltime,2-parttime

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}
	
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	
	if (typeof userdata.time_zone != 'undefined' && userdata.time_zone != '') {
		time_zone = userdata.time_zone;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	
	if (typeof userdata.job_type != 'undefined' && userdata.job_type != '') {
		job_type = userdata.job_type;
	}
	if (typeof userdata.work_experience != 'undefined' && userdata.work_experience != '') {
		work_experience = userdata.work_experience;
	}
	if (typeof userdata.qualification != 'undefined' && userdata.qualification != '') {
		qualification = userdata.qualification;
	}
	
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var queryinsert = 'UPDATE users SET name = "'+name+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",job_type="'+job_type+'",work_experience="'+work_experience+'",qualification="'+qualification+'" where id="'+id+'"';
								
		
		console.log(queryinsert);
		connection.query(queryinsert, function(errinsert, resultinsert){
			if(!errinsert){
				
				resultJson = '{"replyCode":"success","replyMsg":"Profile updated successfully."}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				
				resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"update_teacher_profile"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

// demo class details

function demo_class_details(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var res ='';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {
		var studentId = hashids.decode(sid);
		Cquery='SELECT demo_class_requests.*,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name,(SELECT demo_class_requests.demo_class_date from demo_class_requests WHERE demo_class_requests.demo_class_date >="'+Curdate+'" AND demo_class_requests.user_id="'+studentId+'" AND demo_class_requests.status="1" LIMIT 1) as pending FROM demo_class_requests as demo_class_requests  LEFT JOIN users as student ON student.id = demo_class_requests.user_id LEFT JOIN users as teacher ON teacher.id = demo_class_requests.teacher_id WHERE demo_class_requests.user_id = '+studentId+' ';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"demo_class_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					res =ordData[0];
				}						
				resultJson = '{"replyCode":"success","replyMsg":"Sub admin Details","data":'+JSON.stringify(res)+',"cmd":"demo_class_details"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}



/*Add bank details*/
function add_bank_details(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid ='';
	var account_holder_name = '';
	var bank_name = '';
	var account_number = '';
	var Uquery= '';
	var ifsc_code ='';
	var verified='1';
	var id='';
	
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.account_holder_name != 'undefined' && userdata.account_holder_name != '') {
		account_holder_name = userdata.account_holder_name;
	}
	if (typeof userdata.bank_name != 'undefined' && userdata.bank_name != '') {
		bank_name = userdata.bank_name;
	}
	
	if (typeof userdata.account_number != 'undefined' && userdata.account_number != '') {
		account_number = userdata.account_number;
	}
	
	if (typeof userdata.ifsc_code != 'undefined' && userdata.ifsc_code != '') {
		ifsc_code = userdata.ifsc_code;
	}
	
	if (typeof userdata.verified != 'undefined' && userdata.verified != '') {
		verified = userdata.verified;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		var user_id = hashids.decode(sid);
		if(id !=''){
			Uquery='UPDATE user_bank_details SET user_id="'+user_id+'",account_holder_name="' + account_holder_name + '",account_number = "'+account_number+'",bank_name="'+bank_name+'",ifsc_code = "'+ifsc_code+'" where id="'+id+'"';
		}else{
			Uquery='INSERT INTO user_bank_details SET user_id="'+user_id+'",account_holder_name="' + account_holder_name + '",account_number = "'+account_number+'",bank_name="'+bank_name+'",ifsc_code = "'+ifsc_code+'",verified="'+verified+'",created = NOW()';
		}
		
		console.log('qq--',Uquery)
		connection.query(Uquery, function(errinsert, resultinsert){
			if(!errinsert){
				resultJson = '{"replyCode":"success","replyMsg":"Bank Details Updated Successfully"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"add_bank_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}



/*User bank details*/
function user_bank_details(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid ='';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		var user_id = hashids.decode(sid);
		var Catquery='SELECT * FROM user_bank_details WHERE status="1" AND user_id="'+user_id+'" ORDER BY created ASC';
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resultinsert){
			if(!errinsert){
				if(resultinsert.length>0){
					var res = resultinsert;
				}else{
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"Bank Details Updated Successfully","data":'+JSON.stringify(res)+'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"add_bank_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}


//teacher demo class list

function teacher_demo_class_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid ='';//
	
	var Cquery = '';
	var res ='';
	var keyword='';	
	var Keyconditoin=' demo_class_requests.status != "2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	
	if(keyword !=''){
		Keyconditoin +=' AND student_name LIKE  "%'+keyword+'%"';
	}
	
	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {
		var teacher_id = hashids.decode(sid);
		Cquery='SELECT demo_class_requests.*,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name,(SELECT demo_class_requests.demo_class_date from demo_class_requests WHERE demo_class_requests.demo_class_date >="'+Curdate+'"  AND demo_class_requests.status="1" LIMIT 1) as pending FROM demo_class_requests as demo_class_requests  LEFT JOIN users as student ON student.id = demo_class_requests.user_id LEFT JOIN users as teacher ON teacher.id = demo_class_requests.teacher_id WHERE demo_class_requests.status != "2" AND demo_class_requests.teacher_id="'+teacher_id+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"admin_demo_class_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					res =ordData;
				}else{
					res	=[];
				}						
				resultJson = '{"replyCode":"success","replyMsg":"demo class list","data":'+JSON.stringify(res)+',"cmd":"admin_demo_class_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}


// teacher week days list

function teacher_schedule_days_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid ='';//
	
	var Cquery = '';
	var res ='';

	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}

	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {
		var teacher_id = hashids.decode(sid);
		
		Cquery='SELECT user_time_schedule.* from user_time_schedule WHERE user_time_schedule.status != "2" AND user_time_schedule.teacher_id="'+teacher_id+'" AND schedule_date >="'+Curdate+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, resPro){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"teacher_schedule_days_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{

				if(resPro.length >0){
					var i = 0;
					async.eachSeries(resPro,function(rec2, loop2){
						var schedule_id = rec2.id;
						console.log('schedule_id',schedule_id);
						Cquery='SELECT user_time_schedule_slots.* from user_time_schedule_slots WHERE user_time_schedule_slots.status != "2" AND user_time_schedule_slots.teacher_id="'+teacher_id+'" AND user_time_schedule_slots.schedule_id="'+schedule_id+'"';
						console.log('Cquery',Cquery);
						connection.query(Cquery, function(errSelpiMG,respROiMG){
							if(errSelpiMG){
								console.log('errSelpiMG',errSelpiMG);
								loop2();
							}else{
								resPro[i].slots=respROiMG;
								loop2();
							}
							i=i+1;
						});
					},function(errSelPro){
						if(errSelPro){
							console.log('errSelPro',errSelPro);
							resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"teacher_schedule_days_list"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"teacher_schedule_days_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"teacher_schedule_days_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		})
	});
}

function teacher_schedule_slots_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid ='';//
	var schedule_id='';
	var Cquery = '';
	var res ='';

	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}

	if (typeof userdata.schedule_id != 'undefined' && userdata.schedule_id != '') {
		schedule_id = userdata.schedule_id;
	}
	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {
		var teacher_id = hashids.decode(sid);
		
		Cquery='SELECT user_time_schedule_slots.* from user_time_schedule_slots WHERE user_time_schedule_slots.status != "2" AND user_time_schedule_slots.teacher_id="'+teacher_id+'" AND user_time_schedule_slots.schedule_id="'+schedule_id+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"teacher_schedule_slots_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					res =ordData;
				}else{
					res	=[];
				}						
				resultJson = '{"replyCode":"success","replyMsg":"slots list","data":'+JSON.stringify(res)+',"cmd":"teacher_schedule_slots_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}

//update schedule day
function update_schedule_day_status(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var id = '';
	var available =''; //0-no,1-yes
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id =userdata.id;
	}
	if (typeof userdata.available != 'undefined' && userdata.available != '') {
		available = userdata.available;
	}
	pool.getConnection(function (err, connection) {
		
		squery ='UPDATE user_time_schedule SET available = "'+available+'" WHERE id = "'+id+'"';
		connection.query(squery, function(errselect, resultselect){
			if(!errselect){
				console.log(resultselect);
				resultJson = '{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"user_time_schedule"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"'+errselect.message+'","cmd":"user_time_schedule"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});	
}

// update schedule slot
function update_schedule_slot_status(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	
	var Cquery = '';
	var id = '';
	var available =''; //0-no,1-yes
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id =userdata.id;
	}
	if (typeof userdata.available != 'undefined' && userdata.available != '') {
		available = userdata.available;
	}
	pool.getConnection(function (err, connection) {
		Cquery='SELECT user_time_schedule_slots.* from user_time_schedule_slots WHERE  user_time_schedule_slots.id="'+id+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"teacher_schedule_slots_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData[0].class_id !="" && ordData[0].class_id !=null){
					resultJson = '{"replyCode":"error","replyMsg":" you can not change status for this slot","cmd":"update_schedule_slot_status"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}else{
					squery ='UPDATE user_time_schedule_slots SET available = "'+available+'",mark_availability = "'+available+'" WHERE id = "'+id+'"';
					connection.query(squery, function(errselect, resultselect){
						if(!errselect){
							console.log(resultselect);
							resultJson = '{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_schedule_slot_status"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"'+errselect.message+'","cmd":"update_schedule_slot_status"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}
			}
		})
		
	});	
}

function student_teacher_schedule_days_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var teacher_id ='';//
	
	var Cquery = '';
	var res ='';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {

		Cquery='SELECT user_time_schedule.* from user_time_schedule WHERE user_time_schedule.status != "2" AND user_time_schedule.teacher_id="'+teacher_id+'" AND schedule_date >="'+Curdate+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, resPro){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"teacher_schedule_days_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{

				if(resPro.length >0){
					var i = 0;
					async.eachSeries(resPro,function(rec2, loop2){
						var schedule_id = rec2.id;
						console.log('schedule_id',schedule_id);
						Cquery='SELECT user_time_schedule_slots.* from user_time_schedule_slots WHERE user_time_schedule_slots.status != "2" AND user_time_schedule_slots.teacher_id="'+teacher_id+'" AND user_time_schedule_slots.schedule_id="'+schedule_id+'"';
						console.log('Cquery',Cquery);
						connection.query(Cquery, function(errSelpiMG,respROiMG){
							if(errSelpiMG){
								console.log('errSelpiMG',errSelpiMG);
								loop2();
							}else{
								resPro[i].slots=respROiMG;
								loop2();
							}
							i=i+1;
						});
					},function(errSelPro){
						if(errSelPro){
							console.log('errSelPro',errSelPro);
							resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"teacher_schedule_days_list"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"teacher_schedule_days_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"teacher_schedule_days_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});
	});
}

function student_teacher_schedule_slots_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var teacher_id ='';//
	var schedule_id='';
	var Cquery = '';
	var res ='';
	var schedule_slot_date='';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}

	if (typeof userdata.schedule_id != 'undefined' && userdata.schedule_id != '') {
		schedule_id = userdata.schedule_id;
	}

	var ToDate = new Date();
	ToDate.setHours(ToDate.getHours()+2)
	//var Curdate = ToDate.getFullYear()+ "-" +(ToDate.getMonth()+1) + "-" + ToDate.getDate() ;
	var Curdate = ToDate.getFullYear() + "-" + ("0"+(ToDate.getMonth()+1)).slice(-2) +"-"+("0" + ToDate.getDate()).slice(-2);
	var CurTime = ToDate.getHours()-2 +":" + ToDate.getMinutes() +":" + ToDate.getSeconds();
	console.log('-CurTime-');
	console.log(CurTime);
	console.log('Curdate',Curdate);
	console.log('schedule_slot_date',schedule_slot_date);
	console.log('=====',schedule_slot_date != Curdate);

	console.log('Curdate--',Curdate)
	pool.getConnection(function (err, connection) {

		if(schedule_slot_date !='' && schedule_slot_date !=Curdate){
			Keyconditoin +=" AND user_time_schedule_slots.schedule_slot_date ='"+schedule_slot_date+"'";
		}else{
			Keyconditoin +=" AND user_time_schedule_slots.schedule_slot_date ='"+schedule_slot_date+"' AND user_time_schedule_slots.time_from >'"+CurTime+"'";
		}

		Cquery='SELECT user_time_schedule_slots.* from user_time_schedule_slots WHERE user_time_schedule_slots.status != "2" AND user_time_schedule_slots.teacher_id="'+teacher_id+'" AND user_time_schedule_slots.schedule_id="'+schedule_id+'" OR "'+Keyconditoin+'"';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"teacher_schedule_slots_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					res =ordData;
				}else{
					res	=[];
				}						
				resultJson = '{"replyCode":"success","replyMsg":"slots list","data":'+JSON.stringify(res)+',"cmd":"teacher_schedule_slots_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}

function check_student_subscription(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var res ='';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}

	pool.getConnection(function (err, connection) {
		var studentId = hashids.decode(sid);
		Cquery='SELECT student_course_subscription.*,courses.learning,courses.course_type,courses.course_name,courses.terms,courses.sub_title,courses.age_group_id,teacher.name as teacher_name,teacher.image as teacher_image,teacher.phone as teacher_phone,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name FROM student_course_subscription as student_course_subscription  LEFT JOIN users as student ON student.id = student_course_subscription.student_id LEFT JOIN users as teacher ON teacher.id = student_course_subscription.teacher_id LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id WHERE student_course_subscription.student_id = '+studentId+' AND student_course_subscription.status="1" AND courses.course_type="1" ORDER BY student_course_subscription.id ASC';
		
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"check_student_subscription"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				var quey='SELECT COUNT(demo_class_requests.id) from demo_class_requests where demo_class_requests.user_id = '+studentId+'';
				console.log(quey);
				connection.query(quey, function(errD, ordD){
					if(errD){
						resultJson = '{"replyCode":"error","replyMsg":"'+errD.message+'","cmd":"check_student_subscription"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						if(ordData.length>0){
							res =ordData;
						}else{
							res	=[];
						}						
						resultJson = '{"replyCode":"success","replyMsg":"check_student_subscriptions","data":'+JSON.stringify(res)+',"demo":'+JSON.stringify(ordD)+',"cmd":"check_student_subscription"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
					}
				})	
				
			}
		})
	});
}

// student_lessons list
function student_lessons_list(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var squery='';
	var res ='';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var course_id='';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '' && userdata.course_id !='null') {
		course_id = userdata.course_id;
	}

	pool.getConnection(function (err, connection) {
		var studentId = hashids.decode(sid);
		if(course_id !=''){
			Cquery='SELECT course_chapters.*,(SELECT classes.class_summary_pdf from classes WHERE classes.id = (SELECT chapter_lessons.refrence_id FROM chapter_lessons where chapter_lessons.course_chapter_id=course_chapters.id AND chapter_lessons.type="1" LIMIT 1) ) as class_summary_pdf,courses.course_name,courses.image,(SELECT student_booked_classes.status from student_booked_classes where chapter_id=course_chapters.id AND student_id="'+studentId+'" ORDER BY id DESC LIMIT 1) as chapter_status,(SELECT student_booked_classes.id from student_booked_classes where chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as booked_class_id,(SELECT student_booked_classes.schedule_slot_date from student_booked_classes where student_id="'+studentId+'" AND chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as schedule_slot_date,(SELECT student_booked_classes.slot_id from student_booked_classes where student_id="'+studentId+'" AND chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as slot_id FROM course_chapters as course_chapters  LEFT JOIN courses as courses ON courses.id = course_chapters.course_id WHERE course_chapters.course_id = '+course_id+' AND course_chapters.status="1"';
		}else{
		
			Cquery='SELECT course_chapters.*,(SELECT classes.class_summary_pdf from classes WHERE classes.id = (SELECT chapter_lessons.refrence_id FROM chapter_lessons where chapter_lessons.course_chapter_id=course_chapters.id AND chapter_lessons.type="1" LIMIT 1) ) as class_summary_pdf,courses.course_name,courses.image,(SELECT student_booked_classes.status from student_booked_classes where chapter_id=course_chapters.id AND student_id="'+studentId+'" ORDER BY id DESC LIMIT 1) as chapter_status,(SELECT student_booked_classes.id from student_booked_classes where chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as booked_class_id,(SELECT student_booked_classes.schedule_slot_date from student_booked_classes where student_id="'+studentId+'" AND chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as schedule_slot_date,(SELECT student_booked_classes.slot_id from student_booked_classes where student_id="'+studentId+'" AND chapter_id=course_chapters.id ORDER BY id DESC LIMIT 1) as slot_id FROM course_chapters as course_chapters  LEFT JOIN courses as courses ON courses.id = course_chapters.course_id WHERE course_chapters.status="1" AND (SELECT student_booked_classes.status from student_booked_classes where chapter_id=course_chapters.id AND student_id="'+studentId+'" ORDER BY id DESC LIMIT 1)="1"';
		}
		
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"student_lessons_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					console.log('ordData',ordData);
					var i = 0;
					async.eachSeries(ordData,function(rec2, loop2){
						var ToDate = new Date();
						var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
						//var tday = weekday[ToDate.getDay()];
						var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
						var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() +":" + ToDate.getSeconds();

						console.log('-CurTime-',CurTime);
						console.log(Curdate+'-'+CurTime);

						var dt = new Date();

						dt.setMinutes( dt.getMinutes() - 15 );
						var ButtonShowTime = dt.getHours() + ":" + dt.getMinutes()+":" + ToDate.getSeconds();
						console.log('ButtonShowTime',ButtonShowTime);
						var slot_id = rec2.slot_id;
						console.log('slot_id',slot_id);
						console.log('ButtonShowTime',ButtonShowTime);
						squery='SELECT SUBTIME(user_time_schedule_slots.time_from, "00:15:00") as button_show,user_time_schedule_slots.time_from,user_time_schedule_slots.time_to,(SELECT COUNT(user_time_schedule_slots.id) FROM user_time_schedule_slots WHERE user_time_schedule_slots.id = '+slot_id+' AND (SELECT SUBTIME(user_time_schedule_slots.time_from, "00:15:00")) <="'+CurTime+'" AND user_time_schedule_slots.time_to >="'+CurTime+'") as show_button FROM user_time_schedule_slots WHERE user_time_schedule_slots.id = '+slot_id+'';
						console.log('squery-time-slot',squery);
						connection.query(squery, function(errContent,resContent){
							if(errContent){
								console.log('errSelpiMG',errContent);
								
								loop2();
							}else{
								if(resContent.length>0){
									ordData[i].time_slots=resContent[0];
								}else{
									ordData[i].time_slots=[];
								}
								loop2();
							}
							i=i+1;
						});
						
					},function(errinsertDet){
						if(errinsertDet){
							resultJson = '{"replyCode":"error","replyMsg":"'+errinsertDet.message+'","cmd":"mark_chapter_complete"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"student lessons list","data":'+JSON.stringify(ordData)+',"cmd":"student_lessons_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;	
							
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"student lessons list","data":[],"cmd":"student_lessons_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;	
				}
			}
		})
	});
}

// book slot
function book_slot_student(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var res ='';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var teacher_id = '';
	var slot_id = '';
	var chapter_id = '';
	var schedule_slot_date = '';
	var parents_name = 'Parent';
	var student_name = '';
	var schedule_slot_time = '';
	var phone = '';
	var class_topic = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.slot_id != 'undefined' && userdata.slot_id != '') {
		slot_id = userdata.slot_id;
	}
	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}
	if (typeof userdata.schedule_slot_date != 'undefined' && userdata.schedule_slot_date != '') {
		schedule_slot_date = userdata.schedule_slot_date;
	}
	if (typeof userdata.parents_name != 'undefined' && userdata.parents_name != '') {
		parents_name = userdata.parents_name;
	}
	if (typeof userdata.student_name != 'undefined' && userdata.student_name != '') {
		student_name = userdata.student_name;
	}
	if (typeof userdata.schedule_slot_time != 'undefined' && userdata.schedule_slot_time != '') {
		schedule_slot_time = userdata.schedule_slot_time;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.class_topic != 'undefined' && userdata.class_topic != '') {
		class_topic = userdata.class_topic;
	}

	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);

		Cquery='SELECT user_time_schedule_slots.* FROM user_time_schedule_slots WHERE user_time_schedule_slots.holiday = "0" AND user_time_schedule_slots.available="1" AND user_time_schedule_slots.teacher_id="'+teacher_id+'" AND user_time_schedule_slots.id="'+slot_id+'"';

		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){

				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"book_slot_student"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;

			}else{
				if(ordData.length > 0){
					squery ='INSERT INTO student_booked_classes SET teacher_id = "'+teacher_id+'",student_id="'+student_id+'",slot_id="'+slot_id+'",chapter_id="'+chapter_id+'",schedule_slot_date="'+schedule_slot_date+'",status="1",created=NOW()';
					connection.query(squery, function(errselect, resultselect){
						if(!errselect){
							console.log(resultselect);
							var booked_class_id = resultselect.insertId;
							Bookquery ='UPDATE user_time_schedule_slots SET available = "0",class_id="'+booked_class_id+'",type="1",status="1" WHERE id="'+slot_id+'"';
							connection.query(Bookquery);

							var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837528795333&sms=Dear%2"+parents_name+"%20"+student_name+"%27s%20class%20on%"+schedule_slot_date+"%20"+schedule_slot_time+"%20for%20"+class_topic+"%20has%20been%20booked.%20"+student_name+"%27s%20Personalized%20Teacher%20will%20be%20joining%20on%20time.";
							
							console.log('url',message)
							var newMob='+91'+phone;
							request({
								url: message,
								method: 'GET',
							}, function(error, response, body){
								if(error) {
									console.log(error);
									resultJson = '{"replyCode":"success","replyMsg":"Slot booked successfully","cmd":"book_slot_student"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								} else {
									//console.log(response)
									resultJson = '{"replyCode":"success","replyMsg":"Slot booked successfully","cmd":"book_slot_student"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}
							});
						
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"'+errselect.message+'","cmd":"book_slot_student"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Slot is not available , Please select other","cmd":"book_slot_student"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
				
			}
		})
	});
}

// chapter booking details

function slot_booking_details(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var resultJson = '';
	
	var booked_class_id='';	
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	
	if (typeof userdata.booked_class_id != 'undefined' && userdata.booked_class_id != '') {
		booked_class_id = userdata.booked_class_id;
	}
	
	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		
		detailsquery = 'SELECT student_booked_classes.*,user_time_schedule_slots.time_from,user_time_schedule_slots.time_to,course_chapters.chapter_title,course_chapters.chapter_description,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name from student_booked_classes as student_booked_classes LEFT JOIN users as student ON student.id = student_booked_classes.student_id LEFT JOIN users as teacher ON teacher.id = student_booked_classes.teacher_id  LEFT JOIN course_chapters as course_chapters ON course_chapters.id = student_booked_classes.chapter_id LEFT JOIN user_time_schedule_slots as user_time_schedule_slots ON user_time_schedule_slots.id = student_booked_classes.slot_id where student_booked_classes.id ="'+booked_class_id+'" ';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"courses_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// cancle slot booking

function cancle_slot_booking(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var Cquery = '';
	var booked_class_id = '';
	var slot_id = '';
	var teacher_id = '';
	var schedule_date = '';
	var time_from = '';
	var sid = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid =userdata.sid;
	}
	if (typeof userdata.booked_class_id != 'undefined' && userdata.booked_class_id != '') {
		booked_class_id =userdata.booked_class_id;
	}
	if (typeof userdata.slot_id != 'undefined' && userdata.slot_id != '') {
		slot_id =userdata.slot_id;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.schedule_date != 'undefined' && userdata.schedule_date != '') {
		schedule_date = userdata.schedule_date;
	}
	if (typeof userdata.time_from != 'undefined' && userdata.time_from != '') {
		time_from = userdata.time_from;
	}

	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		console.log('curdate',Curdate+' '+CurTime);
		console.log('curdate',schedule_date+' '+time_from);
		var cdate = Curdate+' '+CurTime;
		var sdate = schedule_date+' '+time_from;
		var date1 = new Date(cdate); 
		var date2 = new Date(sdate); 
		var timeDiff = Math.abs(date2.getTime() - date1.getTime()); 
		var HoursDiif = Math.ceil(timeDiff / (1000 * 3600)); 
		console.log('timeDiff',timeDiff);
		console.log('HoursDiif',HoursDiif);
		if(HoursDiif>=24){
			console.log('HoursDiif---',HoursDiif);
			squery ='UPDATE student_booked_classes SET status = "3",canceled_by="'+student_id+'" WHERE id = "'+booked_class_id+'"';
			connection.query(squery, function(errselect, resultselect){
				if(!errselect){
					sLotquery ='UPDATE user_time_schedule_slots SET available = "1",class_id = NULL WHERE id = "'+slot_id+'"';
					console.log(sLotquery);
					connection.query(sLotquery);
					resultJson = '{"replyCode":"success","replyMsg":"Class canceled successfully","cmd":"cancle_slot_booking"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;


				}else{
					resultJson = '{"replyCode":"error","replyMsg":"'+errselect.message+'","cmd":"cancle_slot_booking"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			});
		}else{
			resultJson = '{"replyCode":"error","replyMsg":"Sorry you can not cancle this class now.","cmd":"cancle_slot_booking"}\n';
			connection.release();
			callback(200, null, resultJson);
			return;
		}
	});	
}


// teacher classes list


function teacher_classes_list(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	
	var resultJson = '';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	
	pool.getConnection(function (err, connection) {
		var teacher_id=hashids.decode(sid);
		

		detailsquery = 'SELECT student_booked_classes.*,student_booked_classes.id as booked_class_id,user_time_schedule_slots.time_from,user_time_schedule_slots.type as class_type,(SELECT demo_class_payout from demo_class_settings where id="2") as demo_class_payout,(SELECT paid_class_payout from demo_class_settings where id="2") as paid_class_payout,user_time_schedule_slots.time_to,course_chapters.chapter_title,course_chapters.chapter_description,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name from student_booked_classes as student_booked_classes LEFT JOIN users as student ON student.id = student_booked_classes.student_id LEFT JOIN users as teacher ON teacher.id = student_booked_classes.teacher_id  LEFT JOIN course_chapters as course_chapters ON course_chapters.id = student_booked_classes.chapter_id LEFT JOIN user_time_schedule_slots as user_time_schedule_slots ON user_time_schedule_slots.id = student_booked_classes.slot_id where student_booked_classes.teacher_id ="'+teacher_id+'"';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				console.log('resSelDetails',resSelDetails);
				var i = 0;
				async.eachSeries(resSelDetails,function(rec2, loop2){
					var ToDate = new Date();
					var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
					//var tday = weekday[ToDate.getDay()];
					var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
					var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() +":" + ToDate.getSeconds();

					console.log('-CurTime-',CurTime);
					console.log(Curdate+'-'+CurTime);

					var dt = new Date();

					dt.setMinutes( dt.getMinutes() - 15 );
					var ButtonShowTime = dt.getHours() + ":" + dt.getMinutes()+":" + ToDate.getSeconds();
					console.log('ButtonShowTime',ButtonShowTime);
					var slot_id = rec2.slot_id;
					console.log('slot_id',slot_id);
					console.log('ButtonShowTime',ButtonShowTime);
					squery='SELECT SUBTIME(user_time_schedule_slots.time_from, "00:15:00") as button_show,user_time_schedule_slots.time_from,user_time_schedule_slots.time_to,(SELECT COUNT(user_time_schedule_slots.id) FROM user_time_schedule_slots WHERE user_time_schedule_slots.id = '+slot_id+' AND (SELECT SUBTIME(user_time_schedule_slots.time_from, "00:15:00")) <="'+CurTime+'" AND user_time_schedule_slots.time_to >="'+CurTime+'") as show_button FROM user_time_schedule_slots WHERE user_time_schedule_slots.id = '+slot_id+'';
					console.log('squery-time-slot',squery);
					connection.query(squery, function(errContent,resContent){
						if(errContent){
							console.log('errSelpiMG',errContent);
							
							loop2();
						}else{
							if(resContent.length>0){
								resSelDetails[i].time_slots=resContent[0];
							}else{
								resSelDetails[i].time_slots=[];
							}
							loop2();
						}
						i=i+1;
					});
					
				},function(errinsertDet){
					if(errinsertDet){
						resultJson = '{"replyCode":"error","replyMsg":"'+errinsertDet.message+'","cmd":"mark_chapter_complete"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						resultJson = '{"replyCode":"success","replyMsg":"student lessons list","data":'+JSON.stringify(resSelDetails)+',"cmd":"student_lessons_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
						
					}
				});
			}
		});
	});
}


// mark chapter complete
function mark_chapter_complete(userdata, pool, callback){
	var resultJson = '';
	var booked_class_id ='';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var course_chapter_id ='';
	var teacher_id ='';
	var student_id ='';
	var class_type ='';//1-paid,2-demo
	var amount ='';
	var parents_name ='Parent';
	var student_name ='Student';
	var phone ='';
	var class_topic ='';
	var class_id ='';
	var submitted_link ='NA';
	var course_id='';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.course_chapter_id != 'undefined' && userdata.course_chapter_id != '') {
		course_chapter_id = userdata.course_chapter_id;
	}
	
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.booked_class_id != 'undefined' && userdata.booked_class_id != '') {
		booked_class_id = userdata.booked_class_id;
	}
	if (typeof userdata.class_type != 'undefined' && userdata.class_type != '') {
		class_type = userdata.class_type;
	}
	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.parents_name != 'undefined' && userdata.parents_name != '') {
		parents_name = userdata.parents_name;
	}
	if (typeof userdata.student_name != 'undefined' && userdata.student_name != '') {
		student_name = userdata.student_name;
	}
	if (typeof userdata.class_topic != 'undefined' && userdata.class_topic != '') {
		class_topic = userdata.class_topic;
	}
	if (typeof userdata.submitted_link != 'undefined' && userdata.submitted_link != '') {
		submitted_link = userdata.submitted_link;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		teacher_id=hashids.decode(sid);
		Catquery ='UPDATE student_booked_classes SET status = "2" WHERE id = "'+booked_class_id+'"';
	
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				var Detquery='SELECT * FROM chapter_lessons WHERE course_chapter_id="'+course_chapter_id+'" AND type !="1"';
				console.log('qq',Detquery);
				connection.query(Detquery, function(errinsertDet, resProDet){
					if(!errinsertDet){
						console.log('resProDet',resProDet);
						var i = 0;
						async.eachSeries(resProDet,function(rec2, loop2){
							var refrence_id = rec2.refrence_id;
							var type = rec2.type; //1-class,2-project,3-quiz
							console.log('refrence_id',refrence_id);
							if(type=="3"){
								
								squery ='INSERT INTO student_quizzes SET teacher_id = "'+teacher_id+'",student_id="'+student_id+'",quiz_id="'+refrence_id+'",chapter_id="'+course_chapter_id+'",class_id="'+class_id+'",course_id="'+course_id+'",status="1",points_earned="0",in_review="0",created=NOW()';

							}else{
								var myDate = new Date();
								myDate.setDate(myDate.getDate() + 7);
								completion_date =myDate.getFullYear()+"-"+ parseInt(myDate.getMonth()+1)+"-"+ myDate.getDate();

								console.log('completion_date',completion_date);
								squery ='INSERT INTO student_projects SET teacher_id = "'+teacher_id+'",student_id="'+student_id+'",project_id="'+refrence_id+'",chapter_id="'+course_chapter_id+'",class_id="'+class_id+'",completion_date="'+completion_date+'",course_id="'+course_id+'",status="1",in_review="0",points_earned="0",created=NOW()';
							}
							console.log('squery',squery);
							connection.query(squery, function(errContent,resContent){
								if(errContent){
									console.log('errSelpiMG',errContent);
									
									loop2();
								}else{
									loop2();
								}
								i=i+1;
							});
							
						},function(errinsertDet){
							if(errinsertDet){
								resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"mark_chapter_complete"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							}else{
								connection.query('UPDATE demo_class_requests SET assigned = "2" WHERE teacher_id = "'+teacher_id+'" AND user_id="'+student_id+'"');

								connection.query('INSERT into teachers_payout SET teacher_id = "'+teacher_id+'",student_id="'+student_id+'",student_booked_class_id="'+booked_class_id+'",class_type="'+class_type+'",amount="'+amount+'",paid="0",created=NOW()');

								
								var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837502637377&sms=Dear%20"+parents_name+"%20It%20is%20our%20pleasure%20to%20inform%20you%20that%20"+student_name+"%20is%20among%20the%20top%20students%20who%20have%20completed%20the%20class%20on%20"+class_topic+".%20Checkout%20the%20project%20completed%20by%20"+student_name+"%20in%20the%20class%20"+submitted_link+".%20We%27d%20love%20to%20see%20"+student_name+"%20reaching%20milestones%20and%20%20keep%20unleashing%20the%20innovation,%20curiosity%20&%20enthusiasm.%20Call%20us%20on%2018008917478%20%20for%20any%20queries."
								console.log('url',message);
								var newMob='+91'+phone;
								request({
									url: message,
									method: 'GET',
								}, function(error, response, body){
									if(error) {
										console.log(error);
										resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"register"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										//console.log(response)
										resultJson = '{"replyCode":"success","replyMsg":"Lesson marked completed successfully","cmd":"mark_chapter_complete"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;	
									}
								});
							}
						});
					}else{
						resultJson = '{"replyCode":"error","replyMsg":"'+errinsertDet.message+'","cmd":"mark_chapter_complete"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				})
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_chapter_lessons_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}


// student project lists

function student_projects_list(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var resultJson = '';
	var course_id = '';
	var in_review='';	//1-in-review,2-review-complete,3-calnceled
	var Keyconditoin=' AND student_projects.status ="1"';

	if (typeof userdata.in_review != 'undefined' && userdata.in_review != '') {
		in_review = userdata.in_review;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}

	if(in_review !=''){
		Keyconditoin +=' AND student_projects.in_review ="'+in_review+'"';
	}
	
	if(course_id !=''){
		// Keyconditoin +=' AND student_projects.course_id ="'+course_id+'") ';
	}
	

	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		//refrence_id
		detailsquery = 'SELECT student_projects.*,student_projects.id as student_project_id,projects.project_title,projects.earn_points,projects.image,projects.description as project_description,course_chapters.chapter_title,course_chapters.chapter_description,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name from student_projects as student_projects LEFT JOIN users as student ON student.id = student_projects.student_id LEFT JOIN users as teacher ON teacher.id = student_projects.teacher_id  LEFT JOIN course_chapters as course_chapters ON course_chapters.id = student_projects.chapter_id LEFT JOIN projects as projects ON projects.id = student_projects.project_id where student_projects.student_id ="'+student_id+'" '+Keyconditoin+'';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"student_projects_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"student_projects_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// student quiz list

function student_quizzes_list(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var resultJson = '';
	var course_id = '';
	var in_review='0';	//1-in-review,2-review-complete,3-calnceled
	var Keyconditoin=' AND student_quizzes.status ="1"';

	if (typeof userdata.in_review != 'undefined' && userdata.in_review != '') {
		in_review = userdata.in_review;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if(in_review !=''){
		Keyconditoin +=' AND student_quizzes.in_review ="'+in_review+'"';
	}
	if(course_id !=''){
		Keyconditoin +=' AND student_quizzes.course_id ="'+course_id+'"';
	}
	
	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		
		detailsquery = 'SELECT student_quizzes.*,(SELECT SUM(quizzes_questions.points) from quizzes_questions where quizzes_questions.id = student_quizzes.quiz_id ) as total_points,quizzes.quiz_title,quizzes.quiz_description as project_description,course_chapters.chapter_title,course_chapters.chapter_description,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name from student_quizzes as student_quizzes LEFT JOIN users as student ON student.id = student_quizzes.student_id LEFT JOIN users as teacher ON teacher.id = student_quizzes.teacher_id  LEFT JOIN course_chapters as course_chapters ON course_chapters.id = student_quizzes.chapter_id LEFT JOIN quizzes as quizzes ON quizzes.id = student_quizzes.quiz_id where student_quizzes.student_id ="'+student_id+'" '+Keyconditoin+'';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"student_quizzes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"student_quizzes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



// student submit in project link

function student_submit_project_link(userdata, pool, callback){
	var resultJson = '';
	var student_document = '';
	var student_project_link = '';
	var booked_class_id = '';

	
	if (typeof userdata.booked_class_id != 'undefined' && userdata.booked_class_id != '') {
		booked_class_id = userdata.booked_class_id;
	}
	if (typeof userdata.student_document != 'undefined' && userdata.student_document != '') {
		student_document = userdata.student_document;
	}
	if (typeof userdata.student_project_link != 'undefined' && userdata.student_project_link != '') {
		student_project_link = userdata.student_project_link;
	}
	
	
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var queryinsert ='UPDATE student_booked_classes SET student_project_link="'+student_project_link+'",student_document="'+student_document+'" where student_booked_classes.id="'+booked_class_id+'"';
	
		console.log(queryinsert);
		connection.query(queryinsert, function(errinsert, resultinsert){
			if(!errinsert){
				resultJson = '{"replyCode":"success","replyMsg":"Project review submitted successfully","cmd":"teacher_project_review_submit"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"teacher_project_review_submit"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}


function view_quiz_info(userdata, pool, callback){
	var resultJson = '';
	var quiz_id ='';
	
	if (typeof userdata.quiz_id != 'undefined' && userdata.quiz_id != '') {
		quiz_id = userdata.quiz_id;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		var Catquery='SELECT * FROM quizzes WHERE id="'+quiz_id+'"';
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				if(resPro.length >0){
					proiMGquery = 'SELECT quizzes_questions.id,quizzes_questions.question_title,quizzes_questions.question_description,quizzes_questions.option1,quizzes_questions.option2,quizzes_questions.option3,quizzes_questions.option4,quizzes_questions.points,quizzes_questions.question_image,quizzes_questions.option1_image,quizzes_questions.option2_image,quizzes_questions.option3_image,quizzes_questions.option4_image from quizzes_questions where quizzes_questions.quizz_id="'+quiz_id+'"';
					console.log('proiMGquery',proiMGquery);
					connection.query(proiMGquery, function(errSelpiMG,respROiMG){
						if(errSelpiMG){
							resultJson = '{"replyCode":"error","replyMsg":"' + errSelpiMG.message + '","cmd":"view_quiz_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							if(respROiMG.length>0){
								resPro[0].questions=respROiMG;
								
							}else{
								resPro[0].questions=[];

							}
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"view_quiz_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
					
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_quiz_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_quiz_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}

// group post list

function group_post_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var keyword='';
	var Keyconditoin='';
	var orderBy=' ORDER BY group_posts.created DESC';
	var group_id='';
	var featured='';
	var most_liked='';
	var user_id='';
	var status='1'; //	0-inactive,1-active,2-blocked	

	var learning="0";
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
		
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	
	if (typeof userdata.group_id != 'undefined' && userdata.group_id != '') {
		group_id = userdata.group_id;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	if (typeof userdata.most_liked != 'undefined' && userdata.most_liked != '') {
		most_liked = userdata.most_liked;
	}
	
	
	pool.getConnection(function (err, connection) {
	
		if(keyword !=''){
			Keyconditoin +=' AND group_posts.post_title LIKE  "%'+keyword+'%"';
		}
		if(group_id !=''){
			Keyconditoin +=' AND group_posts.group_id ="'+group_id+'"';
		}
		if(featured !=''){
			Keyconditoin +=' AND group_posts.featured ="1"';
		}
		if(most_liked !=''){
			orderBy =' ORDER BY liked DESC';
		}
		
		if(learning !=''){
			Keyconditoin +=' AND group_posts.learning = "'+learning+'"';
		}

		var Catquery='SELECT group_posts.*,users.name,users.image,(SELECT count(*) from post_like WHERE post_like.user_id="'+user_id+'" AND post_like.post_id=group_posts.id) as liked,(SELECT count(*) from post_like WHERE post_like.post_id=group_posts.id) as total_likes  FROM group_posts as group_posts LEFT JOIN users as users ON users.id = group_posts.user_id WHERE group_posts.status="'+status+'" '+Keyconditoin+' '+orderBy+'';
		console.log('Catquery',Catquery);
		connection.query(Catquery, function(err, res){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"group_post_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{

				if(res.length >0){
					var i = 0;
					async.eachSeries(res,function(rec2, loop2){
						var post_id = rec2.id;
						console.log('post_id',post_id);
						
						userquery = 'SELECT post_comments.*,users.name,users.image from post_comments as post_comments LEFT JOIN users as users ON users.id = post_comments.user_id where post_comments.post_id="'+post_id+'"';
						console.log('userquery',userquery);
						connection.query(userquery, function(errSel,resSel){
							if(errSel){
								console.log('err',errSel);
								
								loop2();
							}else{
								console.log('resSel',resSel)
								
								res[i].comments=resSel;
								loop2();
							}
							i=i+1;
						});
						
					},function(errRec){
						if(errRec){
							resultJson = '{"replyCode":"success","replyMsg":"listing found successfully .","cmd":"group_post_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Post list found", "data":'+JSON.stringify(res)+',"cmd":"group_post_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;	
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.", "cmd":"group_post_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});	
	});
}


/* Like / unlik */
function like_post(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var post_id = "";
	var user_id = "";
	var type = "";//1-like , 0- unlike
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.post_id != 'undefined' && userdata.post_id != '') {
		post_id = userdata.post_id;
	}
	
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}

	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type.toString();
	}

	pool.getConnection(function (err, connection) {
		
		console.log(type);
		if(type=="1"){
			Query='INSERT INTO post_like SET post_id ="'+post_id+'",user_id = "'+user_id+'"';
		}else{
			Query='DELETE FROM post_like WHERE post_id="'+post_id+'" AND user_id = "'+user_id+'"';
		}
		console.log('Query',Query);
		connection.query(Query, function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"post_like"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Fav status updated", "cmd":"post_like"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function post_comment(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var post_id = "";
	var user_id = "";
	var comment = "";
	
	if (typeof userdata.post_id != 'undefined' && userdata.post_id != '') {
		post_id = userdata.post_id;
	}
	
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}

	if (typeof userdata.comment != 'undefined' && userdata.comment != '') {
		comment = userdata.comment;
	}

	pool.getConnection(function (err, connection) {
		
		Query='INSERT INTO post_comments SET post_id ="'+post_id+'",user_id="'+user_id+'",comment="'+comment+'",status="1",created=NOW()';
		
		console.log('Query',Query);
		connection.query(Query, function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"post_comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				userquery = 'SELECT post_comments.*,users.name,users.image from post_comments as post_comments LEFT JOIN users as users ON users.id = post_comments.user_id where post_comments.post_id="'+post_id+'"';
				console.log('userquery',userquery);
				connection.query(userquery, function(errSel,resSel){
					if(errSel){
						resultJson = '{"replyCode":"error","replyMsg":"'+errSel.message+'","cmd":"post_comment"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						resultJson = '{"replyCode":"success","replyMsg":"comment list found", "data":'+JSON.stringify(resSel)+',"cmd":"post_comment"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
					}
				})
			}
		});
	});
}


function delete_post(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var post_id = "";
	
	if (typeof userdata.post_id != 'undefined' && userdata.post_id != '') {
		post_id = userdata.post_id;
	}
	

	pool.getConnection(function (err, connection) {
		
		Query='DELETE FROM group_posts WHERE id="'+post_id+'"';
		console.log('Query',Query);
		connection.query(Query, function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"delete_post"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"deleted", "cmd":"delete_post"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function delete_post_comment(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var comment_id = "";
	var post_id = "";
	
	if (typeof userdata.comment_id != 'undefined' && userdata.comment_id != '') {
		comment_id = userdata.comment_id;
	}
	if (typeof userdata.post_id != 'undefined' && userdata.post_id != '') {
		post_id = userdata.post_id;
	}
	

	pool.getConnection(function (err, connection) {
		
		Query='DELETE FROM post_comments WHERE id="'+comment_id+'"';
		console.log('Query',Query);
		connection.query(Query, function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"delete_post_comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				userquery = 'SELECT post_comments.*,users.name,users.image from post_comments as post_comments LEFT JOIN users as users ON users.id = post_comments.user_id where post_comments.post_id="'+post_id+'"';
				console.log('userquery',userquery);
				connection.query(userquery, function(errSel,resSel){
					if(errSel){
						resultJson = '{"replyCode":"error","replyMsg":"'+errSel.message+'","cmd":"delete_post_comment"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						resultJson = '{"replyCode":"success","replyMsg":"comment list found", "data":'+JSON.stringify(resSel)+',"cmd":"delete_post_comment"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
					}
				})
			}
		});
	});
}

function report_post_abuse(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var post_id = "";
	var post_title = "";
	var user_id = "";
	var comment = "";
	
	if (typeof userdata.post_id != 'undefined' && userdata.post_id != '') {
		post_id = userdata.post_id;
	}
	
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}

	if (typeof userdata.post_title != 'undefined' && userdata.post_title != '') {
		post_title = userdata.post_title;
	}
	if (typeof userdata.comment != 'undefined' && userdata.comment != '') {
		comment = userdata.comment;
	}

	pool.getConnection(function (err, connection) {
		
		Query='INSERT INTO post_report_abuse SET post_id ="'+post_id+'",user_id = "'+user_id+'",comment="'+comment+'",created=NOW()';
		
		console.log('Query',Query);
		connection.query(Query, function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"report_post_abuse"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"report abuse successfully","cmd":"report_post_abuse"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		});
	});
}


function group_post_details(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var user_id='';
	var id=''; 
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	
	pool.getConnection(function (err, connection) {
	
		

		var Catquery='SELECT group_posts.*,users.name,users.image,(SELECT count(*) from post_like WHERE post_like.user_id="'+user_id+'" AND post_like.post_id=group_posts.id) as liked,(SELECT count(*) from post_like WHERE post_like.post_id=group_posts.id) as total_likes  FROM group_posts as group_posts LEFT JOIN users as users ON users.id = group_posts.user_id WHERE group_posts.id="'+id+'"';
		console.log('Catquery',Catquery);
		connection.query(Catquery, function(err, res){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"group_post_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{

				if(res.length >0){
					
					var i = 0;
					async.eachSeries(res,function(rec2, loop2){
						var post_id = rec2.id;
						var post_liked = rec2.liked;
						var new_views = parseInt(rec2.views)+1;
						console.log('post_id',post_id);

						if(post_liked<1){
							QueryUp='UPDATE group_posts SET views ="'+new_views+'" where id = "'+post_id+'"';
		
							console.log('QueryUp',QueryUp);
							connection.query(QueryUp);
						}
						
						
						userquery = 'SELECT post_comments.*,users.name,users.image from post_comments as post_comments LEFT JOIN users as users ON users.id = post_comments.user_id where post_comments.post_id="'+post_id+'"';
						console.log('userquery',userquery);
						connection.query(userquery, function(errSel,resSel){
							if(errSel){
								console.log('err',errSel);
								loop2();
							}else{
								console.log('resSel',resSel)
								res[i].comments=resSel;
								loop2();
							}
							i=i+1;
						});
						
					},function(errRec){
						if(errRec){
							resultJson = '{"replyCode":"success","replyMsg":"details found successfully .","cmd":"group_post_details"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Post details found", "data":'+JSON.stringify(res[0])+',"cmd":"group_post_details"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;	
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.", "cmd":"group_post_details"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});	
	});
}
// my orders

function my_orders(userdata, pool, callback){
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	var learning='';
	var type='';
	var course_type='';
	var resultJson = '';
	var Keyconditoin='';
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}
	
	if(learning !=''){
		Keyconditoin +=' AND courses.learning ="'+learning+'"';
	}
	if(type !=''){
		Keyconditoin +=' AND courses.robotics_type ="'+type+'"';
	}
	
	if(course_type !=''){
		if(course_type=='3'){
			// Keyconditoin +=' AND courses.course_type ="3" OR courses.course_type ="4"';
			Keyconditoin +=' AND courses.course_type ="3"';
		}else{
			Keyconditoin +=' AND courses.course_type ="'+course_type+'"';
		}
	}

	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		
		detailsquery = 'SELECT student_course_subscription.*,courses.course_name,courses.image,courses.description,courses.course_type,courses.learning from student_course_subscription as student_course_subscription LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id where student_course_subscription.student_id ="'+student_id+'" '+Keyconditoin+'';
		
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"my_orders"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"my_orders"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function self_page_courses_list(userdata, pool, callback){
	var resultJson = '';
	var res='';
	var keyword='';	
	var age_group_id='';	
	var Keyconditoin='';
	var featured ='0';
	var learning="0";
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
		
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	
	pool.getConnection(function (err, connection) {
		if(keyword !=''){
			Keyconditoin +=' AND courses.course_name LIKE  "%'+keyword+'%"';
		}
		if(age_group_id !=''){
			Keyconditoin +=' AND courses.age_group_id ="'+age_group_id+'"';
		}
		if(featured !=''){
			Keyconditoin +=' AND courses.featured ="1"';
		}
		
		if(learning !=''){
			Keyconditoin +=' AND courses.learning = "'+learning+'"';
		}
		Catquery = 'SELECT courses.*,rec_courses.course_name as rec_course_name,age_group.title as age_group_title from courses as courses LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id LEFT JOIN courses as rec_courses ON rec_courses.id = courses.recommended_course_id where courses.status ="1" AND courses.course_type="2" '+Keyconditoin+' ORDER BY courses.priority ASC'; 
		console.log('qq',Catquery);
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				if(resPro.length >0){
					var i = 0;
					async.eachSeries(resPro,function(rec2, loop2){
						var course_id = rec2.id;
						var rec_course_id = rec2.recommended_course_id;
						console.log('course_id',course_id);
						proiMGquery = 'SELECT course_chapters.* from course_chapters where course_chapters.course_id="'+course_id+'" AND course_chapters.status="1"';
						console.log('proiMGquery',proiMGquery);
						connection.query(proiMGquery, function(errSelpiMG,respROiMG){
							if(errSelpiMG){
								console.log('errSelpiMG',errSelpiMG);
								
								loop2();
							}else{
								userquery = 'SELECT course_info.* from course_info where course_info.course_id="'+course_id+'" AND course_info.status="1"';
								console.log('userquery',userquery);
								connection.query(userquery, function(errSel,resSel){
									if(errSel){
										resultJson = '{"replyCode":"error","replyMsg":"'+errSel.message+'","cmd":"self_page_courses_details"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									}else{

										faqQuery = 'SELECT course_faq.* from course_faq where course_faq.course_id="'+course_id+'" AND course_faq.status="1"';
										console.log('faqQuery',faqQuery);
										connection.query(faqQuery, function(errSelFaq,resSelFaq){
											if(errSelFaq){
												resultJson = '{"replyCode":"error","replyMsg":"'+errSelFaq.message+'","cmd":"self_page_courses_details"}\n';
												console.log('res-suceess');
												connection.release();
												callback(200, null, resultJson);
												return;
											}else{
												RecQuery = 'SELECT courses.* from courses where courses.id="'+rec_course_id+'" ';
												console.log('RecQuery',RecQuery);
												connection.query(RecQuery, function(errSelRec,resSelRec){
													if(errSelRec){
														resultJson = '{"replyCode":"error","replyMsg":"'+errSelRec.message+'","cmd":"self_page_courses_details"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
													}else{
														AchQuery = 'SELECT course_achievement.* from course_achievement where course_achievement.course_id="'+course_id+'" ';
														console.log('AchQuery',AchQuery);
														connection.query(AchQuery, function(errSelAch,resSelAch){
															if(errSelAch){
																resultJson = '{"replyCode":"error","replyMsg":"'+errSelAch.message+'","cmd":"self_page_courses_details"}\n';
																console.log('res-suceess');
																connection.release();
																callback(200, null, resultJson);
																return;
															}else{
																if(resSelFaq.length>0){
																	resPro[i].faq=resSelFaq;
																}else{
																	resPro[i].faq=[];
																}
																if(resSel.length>0){
																	resPro[i].info=resSel;
																}else{
																	resPro[i].info=[];
																}
																
																if(resSelAch.length>0){
																	resPro[i].achievement=resSelAch;
																}else{
																	resPro[i].achievement=[];
																}

																if(resSelRec.length>0){
																	resPro[i].recommended_course=resSelRec[0];
																}else{
																	resPro[i].recommended_course=[];
																}
																if(respROiMG.length>0){
																	resPro[i].chapters=respROiMG[0];
																}else{
																	resPro[i].chapters=[];
																}
																i=i+1;
																loop2();
															}
															
														});
													}
													
												});
											}
											
										});
									}
									
								});
							}
							
						});
						
					},function(errSelPro){
						if(errSelPro){
							console.log('errSelPro',errSelPro)
							resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"view_classes_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"view_classes_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}



function live_courses_list(userdata, pool, callback){
	var resultJson = '';
	var res='';
	var keyword='';	
	var age_group_id='1';	
	var Keyconditoin='';
	var featured ='0';
	var learning="0";
	
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	
	pool.getConnection(function (err, connection) {
		if(keyword !=''){
			Keyconditoin +=' AND courses.course_name LIKE  "%'+keyword+'%"';
		}
		if(age_group_id !=''){
			Keyconditoin +=' AND courses.age_group_id ="'+age_group_id+'"';
		}	
		if(featured !=''){
			Keyconditoin +=' AND courses.featured ="1"';
		}
			
		if(learning !=''){
			Keyconditoin +=' AND courses.learning = "'+learning+'"';
		}

		Catquery = 'SELECT courses.*,rec_courses.course_name as rec_course_name,age_group.title as age_group_title from courses as courses LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id LEFT JOIN courses as rec_courses ON rec_courses.id = courses.recommended_course_id where courses.status ="1" AND courses.course_type="1" '+Keyconditoin+' ORDER BY courses.priority ASC';
		
		console.log('qq',Catquery);
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				if(resPro.length >0){
					var i = 0;
					async.eachSeries(resPro,function(rec2, loop2){
						var course_id = rec2.id;
						var rec_course_id = rec2.recommended_course_id;
						console.log('course_id',course_id);
						proiMGquery = 'SELECT course_chapters.* from course_chapters where course_chapters.course_id="'+course_id+'" AND course_chapters.status="1"';
						console.log('proiMGquery',proiMGquery);
						connection.query(proiMGquery, function(errSelpiMG,respROiMG){
							if(errSelpiMG){
								console.log('errSelpiMG',errSelpiMG);
								
								loop2();
							}else{
								userquery = 'SELECT course_info.* from course_info where course_info.course_id="'+course_id+'" AND course_info.status="1"';
								console.log('userquery',userquery);
								connection.query(userquery, function(errSel,resSel){
									if(errSel){
										resultJson = '{"replyCode":"error","replyMsg":"'+errSel.message+'","cmd":"self_page_courses_details"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									}else{

										faqQuery = 'SELECT course_faq.* from course_faq where course_faq.course_id="'+course_id+'" AND course_faq.status="1"';
										console.log('faqQuery',faqQuery);
										connection.query(faqQuery, function(errSelFaq,resSelFaq){
											if(errSelFaq){
												resultJson = '{"replyCode":"error","replyMsg":"'+errSelFaq.message+'","cmd":"self_page_courses_details"}\n';
												console.log('res-suceess');
												connection.release();
												callback(200, null, resultJson);
												return;
											}else{
												RecQuery = 'SELECT courses.* from courses where courses.id="'+rec_course_id+'" ';
												console.log('RecQuery',RecQuery);
												connection.query(RecQuery, function(errSelRec,resSelRec){
													if(errSelRec){
														resultJson = '{"replyCode":"error","replyMsg":"'+errSelRec.message+'","cmd":"self_page_courses_details"}\n';
														console.log('res-suceess');
														connection.release();
														callback(200, null, resultJson);
														return;
													}else{
														AchQuery = 'SELECT course_achievement.* from course_achievement where course_achievement.course_id="'+course_id+'" ';
														console.log('AchQuery',AchQuery);
														connection.query(AchQuery, function(errSelAch,resSelAch){
															if(errSelAch){
																resultJson = '{"replyCode":"error","replyMsg":"'+errSelAch.message+'","cmd":"self_page_courses_details"}\n';
																console.log('res-suceess');
																connection.release();
																callback(200, null, resultJson);
																return;
															}else{
																if(resSelFaq.length>0){
																	resPro[i].faq=resSelFaq;
																}else{
																	resPro[i].faq=[];
																}
																if(resSel.length>0){
																	resPro[i].info=resSel;
																}else{
																	resPro[i].info=[];
																}
																
																if(resSelAch.length>0){
																	resPro[i].achievement=resSelAch;
																}else{
																	resPro[i].achievement=[];
																}

																if(resSelRec.length>0){
																	resPro[i].recommended_course=resSelRec[0];
																}else{
																	resPro[i].recommended_course=[];
																}
																if(respROiMG.length>0){
																	resPro[i].chapters=respROiMG[0];
																}else{
																	resPro[i].chapters=[];
																}
																i=i+1;
																loop2();
															}
															
														});
													}
													
												});
											}
											
										});
									}
									
								});
							}
							
						});
						
					},function(errSelPro){
						if(errSelPro){
							console.log('errSelPro',errSelPro)
							resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"view_classes_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"view_classes_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}


function update_course_status_pie(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var student_id = "";
	var lesson_id = "0";
	var chapter_id = "0";
	var ref_id = "";
	var type = "";
	var percentage = "0";
	var duration = "0";

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	
	if (typeof userdata.lesson_id != 'undefined' && userdata.lesson_id != '') {
		lesson_id = userdata.lesson_id;
	}
	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}
	if (typeof userdata.ref_id != 'undefined' && userdata.ref_id != '') {
		ref_id = userdata.ref_id;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	if (typeof userdata.percentage != 'undefined' && userdata.percentage != '') {
		percentage = userdata.percentage;
	}

	if (typeof userdata.duration != 'undefined' && userdata.duration != '') {
		duration = userdata.duration;
	}
	console.log('---');
	pool.getConnection(function (err, connection) {
		
		Query='SELECT id FROM student_lessons_status_pie WHERE student_id ="'+student_id+'" AND lesson_id="'+lesson_id+'" AND ref_id="'+ref_id+'"';
		
		console.log(Query);
		connection.query(Query, function(err, checkRate){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"lesson status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(checkRate.length && checkRate[0].id != '' && checkRate[0].id != 0){
					Query = 'UPDATE student_lessons_status_pie SET student_id="' + student_id + '",lesson_id="' + lesson_id + '",chapter_id="'+chapter_id+'",ref_id="'+ref_id+'",type="'+type+'",percentage="' + percentage + '", duration="'+duration+'",status="1",created=NOW() WHERE id = "'+checkRate[0].id+'" '
				}else{
					Query='INSERT INTO student_lessons_status_pie set student_id="' + student_id + '",lesson_id="' + lesson_id + '",chapter_id="'+chapter_id+'",ref_id="'+ref_id+'",type="'+type+'",percentage="' + percentage + '", duration="'+duration+'",status="1",created=NOW() ';
				}	
				console.log(Query);
				connection.query(Query, function(err, rate){
					if(err){
						resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"update_course_status"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						console.log('SELECT * from student_lessons_status_pie WHERE student_id ="'+student_id+'" AND lesson_id="'+lesson_id+'" AND ref_id="'+ref_id+'"');
						connection.query('SELECT * from student_lessons_status_pie WHERE student_id ="'+student_id+'" AND lesson_id="'+lesson_id+'" AND ref_id="'+ref_id+'"', function(err, rateData){
							if(err){
								resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"update_course_status"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							}else{
								resultJson = '{"replyCode":"success","replyMsg":"status succefull", "data":'+JSON.stringify(rateData[0])+',"cmd":"update_course_status"}\n';
								console.log('res-suceess');
								console.log(resultJson);
								connection.release();
								callback(200, null, resultJson);
								return;	
							}
						})
					}
				})		
			}
		});	
	});
}

// student subscription

function student_subscription(userdata, pool, callback){
	var resultJson = '';
	var course_id = '';
	var student_id = '';
	var transaction_id = '';
	var price = '0';
	var created_by = '';
	var parents_name = '';
	var student_name = '';
	var course_name = '';
	var phone = '';
	var course_start_date='0000-00-00';
	var learning='0';
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}
	if (typeof userdata.parents_name != 'undefined' && userdata.parents_name != '') {
		parents_name = userdata.parents_name;
	}
	if (typeof userdata.student_name != 'undefined' && userdata.student_name != '') {
		student_name = userdata.student_name;
	}
	if (typeof userdata.course_name != 'undefined' && userdata.course_name != '') {
		course_name = userdata.course_name;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.course_start_date != 'undefined' && userdata.course_start_date != '') {
		course_start_date = userdata.course_start_date;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {

		var queryinsert ='INSERT INTO student_course_subscription SET course_id="'+course_id+'",student_id="'+student_id+'",transaction_id="'+transaction_id+'",price="'+price+'",course_start_date="'+course_start_date+'",created_by="'+created_by+'",created= NOW()';
		console.log(queryinsert);
		connection.query(queryinsert, function(errinsert, resultinsert){
			if(!errinsert){
				
				if(learning=='1'){
					connection.query('SELECT users.*,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id WHERE users.id = "'+student_id+'"', function(err, user){
						if(err){
							resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"asd"}\n';
							connection.release();
							callback(400, null, resultJson);
							return;
						}else{
							var parents_name = user[0].parents_name;
							var student_name = user[0].name;
							var email1 = user[0].email;
							var email = user[0].email;
							var phone = user[0].phone;
							var phone1 = user[0].phone;
							var age_group_title = user[0].title;


							var emailMessage ="Dear "+parents_name+",";
							emailMessage +="Congratulations on taking a step further for your child’s fun-filled journey of development and learning. ";

							emailMessage +="We are as excited as you are and would like to share what we have in store for your child. Get access to your parent dashboard here< Link for the dashboard>  to explore the creatively designed rhymes, learning activities and to also customize your personal details. ";
							
							emailMessage +="User id - "+email1+" or "+phone1+" ";
							
							emailMessage +="NOTE: We highly recommend that you change your password so that it is easy for you to remember. ";
							
							emailMessage +="After you log in, please click on 'My Profile tab' on the top right corner and verify/add the following details:";
							
							emailMessage +="Child’s name";
							emailMessage +="Date of Birth";
							emailMessage +="Child’s age group";
							emailMessage +="Parent’s Mobile number for progress details";
							emailMessage +="Address for Kit Delivery";
							
							emailMessage +="Please contact us @ < +91 80 10 55 44 00>> within 24 hours if any details are incorrect.";
							
							emailMessage +="You can also use our live chat on the dashboard with your Early Learning Counsellor between 9 am and 6 pm.";
							
							emailMessage +="We warmly welcome you again on this super exciting journey. Let us play-learn together.";
							
							emailMessage +="Warm Regards,";
							emailMessage +="Team LearningPie";
							
							emailMessage +="PS: Need help? Feel free to email us at <support@learningpie.com>. Alternatively, Call us on < +91 80 10 55 44 00> or Whatsapp your query to < + 91 78 49 83 55 51> for immediate assistance. ";
							
							emailMessage +="PPS: We are sure you love our offerings. Share your custom referral code with friends and both of you earn (INR 2500 total) when s/he signs up with us. Get your unique referral code <here>";
							

							var mailOptions = {
								from: SITE_TITLE+' <info@learning-bix.com>', // sender address
								to: email, // list of receivers
								subject: 'LearningPie@Home Your admission is confirmed', // Subject line
								html: emailMessage // html body
							};
								
							var transporter = nodemailer.createTransport(smtpConfig);
							connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+user[0].id+'"');
							// send mail with defined transport object
							// transporter.sendMail(mailOptions, function (error, info) {
							// 	console.log('error',error)
								
							// });
							var secureCode = Math.floor(10000000 + Math.random() * 99999999);
							secureCode = secureCode.toString().substring(0,4);
							secureCode =  parseInt(secureCode);
							console.log(secureCode);
								var tempId ='1707162064296018474';
								var msg ="Dear "+parents_name+""; 
								msg +="Your child's admission in Learningpie@HOME for age group "+age_group_title+" years is confirmed. Welcome Aboard!";
								var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid="+tempId+"&sms="+msg+"";
								console.log('message',message);
								var newMob='+91'+phone;
								request({
									url: message,
									method: 'GET',
								}, function(error, response, body){
									if(error) {
										console.log(error);
										resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'", "cmd":"register"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										console.log('url',message);
										resultJson = '{"replyCode":"success","replyMsg":"Demo class scheduled successfully","otp":"'+secureCode+'", "cmd":"register"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
										
									}
								});
						}
					})	
					
				}else{
					
					var message ="http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles="+phone+"&tempid=1707161837536036430&sms=Dear%20"+parents_name+"%20Thank%20you%20for%20enrolling%20"+student_name+"%20in%20"+course_name+".%20We%20wish%20"+student_name+"%20will%20enjoy%20the%20Currated%20Curriculum%20specially%20designed%20for%20Kids.%20Please%20login%20into%20your%20account%20dashboard%20to%20start%20the%20journey.%20Call%20us%20on%2018008917478%20%20for%20any%20queries.";
					console.log('url',message)
					var newMob='+91'+phone;
					request({
						url: message,
						method: 'GET',
					}, function(error, response, body){
						if(error) {
							console.log(error);
							resultJson = '{"replyCode":"success","replyMsg":"courses updated successfully","cmd":"student_course_subscription"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							//console.log(response)
							resultJson = '{"replyCode":"success","replyMsg":"courses updated successfully","cmd":"student_course_subscription"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"student_course_subscription"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}


function web_student_testimonials_list(userdata, pool, callback){
	var resultJson = '';
	var learning='0';
	var keyword='';	
	var Keyconditoin=' student_testimonials.status ="1"';
	
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	pool.getConnection(function (err, connection) {
		if(learning !=''){
			Keyconditoin +=' AND student_testimonials.learning ="'+learning+'"';
		}
		detailsquery = 'SELECT student_testimonials.* from student_testimonials where '+Keyconditoin+'';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"student_testimonials_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"student_testimonials_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function send_feedback(userdata, pool, callback){
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var resultJson = '';
	var strJson = '';
	var title = 'Enquiry';
	var description = '';
	var first_name = '';
	var last_name = '';
	var email='';
	var contact='';
	var type='1';
	var learning='0';
	var Uquery= '';
	var page_url='';
	
	if (typeof userdata.page_url != 'undefined' && userdata.page_url != '') {
		page_url = userdata.page_url;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}
	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description;
	}
	if (typeof userdata.first_name != 'undefined' && userdata.first_name != '') {
		first_name = userdata.first_name;
	}
	
	if (typeof userdata.last_name != 'undefined' && userdata.last_name != '') {
		last_name = userdata.last_name;
	}
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.contact != 'undefined' && userdata.contact != '') {
		contact = userdata.contact;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	console.log('----------');
	console.log('userdata',userdata);
	
	pool.getConnection(function (err, connection){
		Uquery='INSERT INTO enquiries SET title="' + title + '",description="' + description + '",first_name="'+first_name+'",last_name="'+last_name+'",email="'+email+'",contact="'+contact+'",learning="'+learning+'",type="'+type+'",page_url="'+page_url+'",status="1",created=NOW()';
		console.log('Uquery',Uquery)
		connection.query(Uquery, function(errinsert, resultinsert){
			if(!errinsert){
				resultJson = '{"replyCode":"success","replyMsg":"Feedback sent Successfully","cmd":"create_support_request"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"create_support_request"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//student track status

function student_track_info(userdata, pool, callback){
	var resultJson = '';

	var student_id ='';
	var course_id ='';
	
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != ''){
		student_id = userdata.student_id;
	}
	
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != ''){
		course_id = userdata.course_id;
	}
	
	console.log('----------');
	console.log(userdata);
	pool.getConnection(function (err, connection){

		proiMGquery = 'SELECT course_chapters.id,(SELECT count(*) from chapter_lessons WHERE chapter_lessons.course_chapter_id=course_chapters.id) as total_lessons,(SELECT count(*) from student_booked_classes WHERE student_booked_classes.student_id="'+student_id+'" AND student_booked_classes.status="2") as complete_lessons,(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'") as total_projects,(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.in_review="2") as completed_projects,(SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.in_review="2") as completed_quizzes from course_chapters where course_chapters.course_id="'+course_id+'"';
		console.log('proiMGquery',proiMGquery);
		connection.query(proiMGquery, function(errSelpiMG,respROiMG){
			if(errSelpiMG){
				console.log('errSelpiMG',errSelpiMG)
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelpiMG.message+'","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(respROiMG)+',"cmd":"view_classes_info"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// student weekly status


function student_weekly_status(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var res ='';
	var student_id='';
	
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	var ToDate = new Date();
	var CurDAte = ToDate.getFullYear() + "-" + parseInt(ToDate.getMonth()+1) +"-" + ToDate.getDate();

	pool.getConnection(function (err, connection) {
		Cquery='SELECT student_booked_classes.* from student_booked_classes where student_id="'+student_id+'" AND student_booked_classes.status !="3" AND schedule_slot_date >="'+CurDAte+'" LIMIT 20';
			
		console.log(Cquery);
		connection.query(Cquery, function(err, ordData){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"student_weekly_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(ordData.length>0){
					res =ordData;
				}else{
					res	=[];
				}						
				resultJson = '{"replyCode":"success","replyMsg":"student lessons list","data":'+JSON.stringify(res)+',"cmd":"student_weekly_status"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}


function generate_invoice(userdata, pool, callback) {
	var html = fs.readFileSync('./certificates/invoice.html', 'utf8');
	var student_course_subscription_id='';
	if (typeof userdata.student_course_subscription_id != 'undefined' && userdata.student_course_subscription_id != '') {
		student_course_subscription_id = userdata.student_course_subscription_id;
	}
	pool.getConnection(function (err, connection) {
		
		studensListQ = 'SELECT student_course_subscription.*,courses.*,users.name,users.address,users.state,users.image,users.gst from student_course_subscription  LEFT JOIN users as users ON users.id = student_course_subscription.student_id LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id where student_course_subscription.id ="'+student_course_subscription_id+'"';
		console.log('studensListQ',studensListQ);
		connection.query(studensListQ, function(errSL,resSelSL){
		
			if(errSL){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSL.message+'","cmd":"day_live_classes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				var ToDate = new Date();
				var CurDAte = ToDate.getFullYear() + "-" + parseInt(ToDate.getMonth()+1) +"-" + ToDate.getDate();
				console.log(resSelSL);
				var student_id = resSelSL[0].student_id;
				var Pro_price =resSelSL[0].price;
				var Pro_amount =resSelSL[0].amount;
				var pro_dif_amount = resSelSL[0].amount - resSelSL[0].price;
				var dis_per = parseFloat((pro_dif_amount/Pro_amount)*100).toFixed(2);
				var p_dis_amount =  parseFloat((dis_per*resSelSL[0].product_cost)/100).toFixed(2);
				console.log('p_dis_amount',p_dis_amount);
				var P_AFTER_DISC_AMT = (parseFloat(resSelSL[0].product_cost) - parseFloat(p_dis_amount)).toFixed(2);
				console.log('P_AFTER_DISC_AMT',P_AFTER_DISC_AMT);

				var P_TAX_VALUE = parseFloat((resSelSL[0].product_gst*P_AFTER_DISC_AMT)/100).toFixed(2);
				var P_AFTER_TAX_VALUE =(parseFloat(P_AFTER_DISC_AMT) + parseFloat(P_TAX_VALUE)).toFixed(2);
				
				var S_dis_amount =  parseFloat((dis_per*resSelSL[0].service_cost)/100).toFixed(2);
				console.log('S_dis_amount',S_dis_amount);
				var S_AFTER_DISC_AMT = (parseFloat(resSelSL[0].service_cost).toFixed(2) - parseFloat(S_dis_amount)).toFixed(2);
				console.log('S_AFTER_DISC_AMT',S_AFTER_DISC_AMT);

				var S_TAX_VALUE = parseFloat((resSelSL[0].service_gst*S_AFTER_DISC_AMT)/100).toFixed(2);
				var S_AFTER_TAX_VALUE =(parseFloat(S_AFTER_DISC_AMT)+ parseFloat(S_TAX_VALUE)).toFixed(2);;

				var TOTAL_TAXABLE_AMT=(parseFloat(P_AFTER_DISC_AMT) + parseFloat(S_AFTER_DISC_AMT)).toFixed(2);
				var TOTAL_GST_AMT=(parseFloat(P_TAX_VALUE) + parseFloat(S_TAX_VALUE)).toFixed(2);
				var TOTAL_AMT=(parseFloat(P_AFTER_TAX_VALUE) + parseFloat(S_AFTER_TAX_VALUE)).toFixed(2);

				html = html.replaceAll("{STUDENT_NAME}",resSelSL[0].name);
				html = html.replaceAll("{ADDRESS}",resSelSL[0].address);
				html = html.replaceAll("{ADDRESS1}",resSelSL[0].address);
				html = html.replaceAll("{STATE}",resSelSL[0].state);
				html = html.replaceAll("{GST_NO}",resSelSL[0].gst);
				html = html.replaceAll("{INVOICE_ID}",resSelSL[0].id);
				html = html.replaceAll("{ORDER_ID}",resSelSL[0].id);
				html = html.replaceAll("{SHIPPING_NO}",resSelSL[0].shipping_no);
				html = html.replaceAll("{SUBSCRIPTION_DATE}",CurDAte);
				html = html.replaceAll("{TRANSACTION_ID}",resSelSL[0].transaction_id);
				
				html = html.replaceAll("{PRODUCT_NAME}",resSelSL[0].course_name);
				html = html.replaceAll("{PRODUCT_NAME1}",resSelSL[0].course_name);
				html = html.replaceAll("{P_COST}",resSelSL[0].product_cost);
				html = html.replaceAll("{P_COST1}",resSelSL[0].product_cost);
				html = html.replaceAll("{P_HSN}",resSelSL[0].product_hsn);
				html = html.replaceAll("{P_HSN1}",resSelSL[0].product_hsn);
				html = html.replaceAll("{P_GST}",resSelSL[0].product_gst);
				html = html.replaceAll("{P_GST1}",resSelSL[0].product_gst);
				html = html.replaceAll("{P_AFTER_DISC_AMT}",P_AFTER_DISC_AMT);
				html = html.replaceAll("{P_TAX_VALUE}",P_TAX_VALUE);
				html = html.replaceAll("{P_AFTER_TAX_VALUE}",P_AFTER_TAX_VALUE);

				html = html.replaceAll("{S_COST}",resSelSL[0].service_cost);
				html = html.replaceAll("{S_COST1}",resSelSL[0].service_cost);
				html = html.replaceAll("{S_HSN}",resSelSL[0].service_hsn);
				html = html.replaceAll("{S_HSN1}",resSelSL[0].service_hsn);
				html = html.replaceAll("{S_GST}",resSelSL[0].service_gst);
				html = html.replaceAll("{S_GST1}",resSelSL[0].service_gst);
				html = html.replaceAll("{DISCOUNT}",dis_per);
				html = html.replaceAll("{DISCOUNT1}",dis_per);
				html = html.replaceAll("{S_AFTER_DISC_AMT}",S_AFTER_DISC_AMT);
				html = html.replaceAll("{S_TAX_VALUE}",S_TAX_VALUE);
				html = html.replaceAll("{S_AFTER_TAX_VALUE}",S_AFTER_TAX_VALUE);
				
				html = html.replaceAll("{TOTAL_TAXABLE_AMT}",TOTAL_TAXABLE_AMT);
				html = html.replaceAll("{TOTAL_GST_AMT}",TOTAL_GST_AMT);
				html = html.replaceAll("{TOTAL_AMT}",TOTAL_AMT);

				var state = resSelSL[0].state;
				state = state.toLowerCase();
				if(state && state=='rajasthan'){
					var pgst =resSelSL[0].product_gst/2;
					var sgst =resSelSL[0].service_gst/2;
					var pgst_value =P_TAX_VALUE/2;
					var sgst_value =S_TAX_VALUE/2;
					html = html.replaceAll("{P_IGST}",'-');
					html = html.replaceAll("{S_IGST}",'-');
					html = html.replaceAll("{P_CGST}",pgst.toFixed(2)+'%');
					html = html.replaceAll("{S_CGST}",sgst.toFixed(2)+'%');
					html = html.replaceAll("{P_SGST}",pgst.toFixed(2)+'%');
					html = html.replaceAll("{S_SGST}",sgst.toFixed(2)+'%');
					
					html = html.replaceAll("{P_CGST_VALUE}",pgst_value.toFixed(2));
					html = html.replaceAll("{S_CGST_VALUE}",sgst_value.toFixed(2));
					html = html.replaceAll("{P_SGST_VALUE}",pgst_value.toFixed(2));
					html = html.replaceAll("{S_SGST_VALUE}",sgst_value.toFixed(2));
				}else{
					html = html.replaceAll("{P_IGST}",resSelSL[0].product_gst+'%');
					html = html.replaceAll("{S_IGST}",resSelSL[0].service_gst+'%');
					html = html.replaceAll("{P_CGST}",'-');
					html = html.replaceAll("{S_CGST}",'-');
					html = html.replaceAll("{P_SGST}",'-');
					html = html.replaceAll("{S_SGST}",'-');
					
					html = html.replaceAll("{P_CGST_VALUE}",'-');
					html = html.replaceAll("{S_CGST_VALUE}",'-');
					html = html.replaceAll("{P_SGST_VALUE}",'-');
					html = html.replaceAll("{S_SGST_VALUE}",'-');
					
				}	

				var amount_in_words = inWords(Math.round(TOTAL_AMT));
				var tax_amount_in_words = inWords(Math.round(TOTAL_GST_AMT));
				html = html.replaceAll("{AMT_IN_WORDS}",amount_in_words);
				html = html.replaceAll("{TAX_AMT_IN_WORDS}",tax_amount_in_words);
				var options = { format: 'A3',orientation:"landscape" };
				var pdf_name = resSelSL[0].name;
				pdf_name = pdf_name.replaceAll(/\s/g,'');
				var secureCode = Math.floor(100000 + Math.random() * 900000);
				secureCode = secureCode.toString().substring(0,4);
				pdf_name= pdf_name+'_'+secureCode+'.pdf';
				pdf.create(html, options).toFile('./certificates/'+pdf_name, function(err, res) {
				if (err) return console.log(err);
					console.log(res); // { filename: '/app/businesscard.pdf' }
					console.log(res.filename); // { filename: '/app/businesscard.pdf' }
					try {
						var params = {
							Bucket: 'learningbix.com',
							Key:pdf_name, 
							Body: fs.createReadStream(res.filename),
							ContentType: 'application/pdf',
							ACL: "public-read"
						};
						photoBucket.upload(params, function(err, data){
						if (err) 
							{ 
								console.log('Error uploading data: ', err); 
							}else{
								console.log('succesfully uploaded the image!', data.Location);
								var Que = 'UPDATE student_course_subscription SET invoice = "'+pdf_name+'" WHERE id ="'+student_course_subscription_id+'"';
								connection.query(Que);
								resultJson = '{"replyCode":"success","replyMsg":"Invoice generated successfully","cmd":"invoice"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							}
						});
					}catch (error) {
						console.log('err',error);
					}
				
				});	
			}
		})	
	})
	
}


function inWords (num) {
	var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}


// bonus classes listr

function bonus_classes_list(userdata, pool, callback){
	var resultJson = '';
	var age_group_id=''
	var course_id='';	
	var keyword='';	
	var featured='';	
	var Keyconditoin=' AND chapter_lessons.status ="1" AND chapter_lessons.type="1"';
	
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	
	
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	
	pool.getConnection(function (err, connection) {
		if(keyword !=''){
			Keyconditoin +=' AND (chapter_lessons.lesson_title LIKE  "%'+keyword+'%")';
		}
		if(featured !=''){
			Keyconditoin +=' AND chapter_lessons.featured ="'+featured+'"';
		}
		

		detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.class_topic,classes.class_summary_pdf,classes.image,classes.class_description,classes.class_requirement from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id  where classes.learning="1" AND classes.type="1" AND classes.status="1"  '+Keyconditoin+' AND chapter_lessons.course_chapter_id IN (Select course_chapters.id from course_chapters where course_chapters.course_id IN (Select id from courses where age_group_id='+age_group_id+')) order by chapter_lessons.s_no';
		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"bonus_classes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"bonus_classes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//category lessons list

function category_classes_list(userdata, pool, callback){
	var resultJson = '';
	
	var category_id='';	
	var keyword='';	
	var Keyconditoin='';
	var featured='';
	var age_group_id ='';
	
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	
	
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	
	pool.getConnection(function (err, connection) {
		if(keyword !=''){
			Keyconditoin +=' AND (chapter_lessons.lesson_title LIKE  "%'+keyword+'%")';
		}
		
		if(featured !=''){
			Keyconditoin +=' AND chapter_lessons.featured =  "'+featured+'"';
		}
		if(category_id !=''){
			Keyconditoin +=' AND chapter_lessons.category_id =  "'+category_id+'"';
		}
		

		// detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.image,classes.class_topic,classes.class_description from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id  where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND chapter_lessons.category_id="'+category_id+'"';
		 detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.image,classes.class_topic,classes.class_description from chapter_lessons LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id  where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND chapter_lessons.course_chapter_id IN (Select course_chapters.id from course_chapters where course_chapters.course_id IN (Select id from courses where age_group_id='+age_group_id+')) '+Keyconditoin+ ' order by chapter_lessons.s_no ';

		console.log('detailsquery',detailsquery);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
			if(errSelDetails){
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"bonus_classes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"cmd":"bonus_classes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// day wise live class

function day_live_classes_list(userdata, pool, callback){
	var resultJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	
	var course_id='';	
	var subscription_date='';
	var keyword='';	
	var Keyconditoin='';
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	if (typeof userdata.subscription_date != 'undefined' && userdata.subscription_date != '') {
		subscription_date = userdata.subscription_date;
	}
	
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	let ToDate1 = new Date();
	let Curdate1 =ToDate1.getFullYear()+"-"+ parseInt(ToDate1.getMonth()+1)+"-"+ ToDate1.getDate();
	let date_ob = new Date();
	console.log("date_ob",date_ob)
	const date1 = date_ob;
	// current hours
	let hours = date_ob.getHours();

	// current minutes
	let minutes = date_ob.getMinutes();

	// current seconds
	let seconds = date_ob.getSeconds();
	 
	let getCurrentTime= `${hours}:${minutes}:00`;
	getCurrentTime= getCurrentTime.toString();
	console.log('getCurrentTime',getCurrentTime);
	const date2 = new Date(subscription_date);
	console.log('date1',date1);
	console.log('date2',date2);
	let  diffTime = (date1 - date2);
 
	if(diffTime<0){
		diffTime=0;
	}

	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) +1;
	console.log(Curdate + " Curdate");
	const actualDays=Math.floor((date2-date1) / (1000 * 60 * 60 * 24))+diffDays;
	console.log(subscription_date + " subscription_date");
	console.log(diffDays + " days");
	console.log(actualDays + " actualdays");

	pool.getConnection(function (err, connection) {
		var student_id=hashids.decode(sid);
		if(keyword !=''){
			Keyconditoin +=' AND (chapter_lessons.lesson_title LIKE  "%'+keyword+'%")';
		}
		  //detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.class_topic,classes.class_description,classes.feedback_id,course_chapters.course_id from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = chapter_lessons.course_chapter_id where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND (chapter_lessons.day >'+diffDays+' OR (chapter_lessons.day ='+diffDays+' AND chapter_lessons.end_time > "'+getCurrentTime+'")) AND course_id="'+course_id+'" LIMIT 1';

		let cond="";
		if(actualDays==0)
		cond=" AND chapter_lessons.end_time > '"+getCurrentTime+"'";

		  detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.class_topic,classes.class_description,classes.feedback_id,course_chapters.course_id from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = chapter_lessons.course_chapter_id where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND  (chapter_lessons.day ='+diffDays+cond+') AND course_id="'+course_id+'" LIMIT 1';


		  detailsquery1 = 'SELECT chapter_lessons.*,classes.video_url,classes.class_topic,classes.class_description,classes.feedback_id,course_chapters.course_id from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = chapter_lessons.course_chapter_id where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND chapter_lessons.day >'+diffDays+' AND course_id="'+course_id+'" order by CAST(day as SIGNED) asc LIMIT 1';
		// detailsquery = 'SELECT chapter_lessons.*,classes.video_url,classes.class_topic,classes.class_description,course_chapters.course_id from chapter_lessons  LEFT JOIN classes as classes ON classes.id = chapter_lessons.refrence_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = chapter_lessons.course_chapter_id where classes.learning="1" AND classes.type="0" AND classes.status="1" AND chapter_lessons.status ="1" AND chapter_lessons.type="1" AND chapter_lessons.day >='+diffDays+'  AND course_id="'+course_id+'" LIMIT 1';

		console.log('detailsquery',detailsquery);
		console.log('detailsquery1',detailsquery1);
		connection.query(detailsquery, function(errSelDetails,resSelDetails){
				if(errSelDetails){
					resultJson = '{"replyCode":"error","replyMsg":"'+errSelDetails.message+'","cmd":"day_live_classes_list"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}else{
					if(resSelDetails.length==0){
						connection.query(detailsquery1, function(errSelDetails1,resSelDetails1){
								console.log('resSelDetails1',resSelDetails1)
								studensListQ = 'SELECT student_course_subscription.*,users.name,users.image from student_course_subscription  LEFT JOIN users as users ON users.id = student_course_subscription.student_id where  student_course_subscription.status="1" AND student_course_subscription.course_id="'+course_id+'" AND student_course_subscription.student_id !="'+student_id+'"';
								console.log('studensListQ',studensListQ);
								connection.query(studensListQ, function(errSL,resSelSL){
								
									if(errSL){
										resultJson = '{"replyCode":"error","replyMsg":"'+errSL.message+'","cmd":"day_live_classes_list"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}else{
										
										resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails1)+',"students":'+JSON.stringify(resSelSL)+',"cmd":"day_live_classes_list"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);

										return;
									}
								});
						})
					}
				 else{
					 studensListQ = 'SELECT student_course_subscription.*,users.name,users.image from student_course_subscription  LEFT JOIN users as users ON users.id = student_course_subscription.student_id where  student_course_subscription.status="1" AND student_course_subscription.course_id="'+course_id+'" AND student_course_subscription.student_id !="'+student_id+'"';
					console.log('studensListQ',studensListQ);
					connection.query(studensListQ, function(errSL,resSelSL){
					
						if(errSL){
							resultJson = '{"replyCode":"error","replyMsg":"'+errSL.message+'","cmd":"day_live_classes_list"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resSelDetails)+',"students":'+JSON.stringify(resSelSL)+',"cmd":"day_live_classes_list"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);

							return;
						}
					});
				}
			}
		});
	});
}


/* Apply coupon */
function apply_coupon(userdata, pool, callback){
	
	var resultJson = '';
	var strJson = '';
	var code = '';
	var uid = '';
	var course_id = '';
	var course_type = '';
	var learning = '';
	var age_group_id = '';
	var amount = '';
	// var self_pace='';
	// var live='';
	// var preschool='';
	// var multi_age_groups='';
	// var multi_users='';
	// var multi_courses='';

	var Keyconditoin ='';
	var Cquery = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);

	if (typeof userdata.uid != 'undefined' && userdata.uid != '') {
		uid = userdata.uid;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}
	
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	
	if (typeof userdata.code != 'undefined' && userdata.code != '') {
		code = userdata.code;
	}
	
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	
	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	
	var ToDate = new Date();
	var CurDAte = ToDate.getFullYear() + "-" + parseInt(ToDate.getMonth()+1) +"-" + ToDate.getDate();
	var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() +":" + ToDate.getSeconds();
	
	console.log(CurDAte);
	console.log(CurTime);
	
	var curDateTime =CurDAte+''+CurTime;


	pool.getConnection(function (err, connection) {
		
		//Cquery = 'SELECT coupons.*,(Select count(*) from student_course_subscription where coupon_code="'+code+'") AS total_used,(Select count(*) from student_course_subscription where coupon_code="'+code+'" and student_id="'+uid+'") AS user_used from coupons where (coupons.multi_courses=0 || coupons.id IN (Select coupon_courses.coupon_id from coupon_courses where course_id="'+course_id+'")) and (coupons.multi_age_groups=0 || coupons.id IN (Select coupon_age_groups.coupon_id from coupon_age_groups where age_group_id="'+age_group_id+'")) and (coupons.multi_users=0 || coupons.id IN (Select coupon_users.coupon_id from coupon_users where user_id="'+uid+'")) and start_date_time<=NOW() and end_date_time>=NOW() and (self_pace=1 or live=1 or preschool=1) AND coupons.code="'+code+'"';


		Cquery = 'SELECT coupons.*,(Select count(*) from student_course_subscription where coupon_code="'+code+'") AS total_used,(Select count(*) from student_course_subscription where coupon_code="'+code+'" AND student_id="'+uid+'") AS user_used from coupons where IF(coupons.multi_courses=1,coupons.id IN (Select coupon_courses.coupon_id from coupon_courses where course_id="'+course_id+'"),coupons.multi_courses=0) AND IF(coupons.multi_age_groups=1,coupons.id IN (Select coupon_age_groups.coupon_id from coupon_age_groups where age_group_id="'+age_group_id+'"),coupons.multi_age_groups=0) AND  IF(coupons.multi_users=1,coupons.id IN (Select coupon_users.coupon_id from coupon_users where user_id="'+uid+'"),coupons.multi_users=0) AND  start_date_time<=NOW() AND end_date_time>=NOW() AND (self_pace=1 or live=1 or preschool=1) AND coupons.code="'+code+'" AND coupons.status="1"';

		console.log(Cquery);
		connection.query(Cquery, function(err, res){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"offer_code"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(res.length >0){
					var validate = false;
					var invalidMsg='Coupon is not valid';
					if(res[0].live ==1 && course_type==1){
						validate=true;
					}else if(res[0].self_pace==1 && course_type==2){
						validate=true;
					}else if(course_type==3){
						validate=true;
					}else if(res[0].preschool==1 && learning==1){
						validate=true;
					}

					var min_purchase = res[0].min_purchase;
					var max_usage = res[0].max_usage;
					var max_usage_per_user = res[0].max_usage_per_user;
					var total_used = res[0].total_used;
					var user_used = res[0].user_used;
					console.log('min_purchase',min_purchase);
					console.log('max_usage',max_usage);
					console.log('max_usage_per_user',max_usage_per_user);
					console.log('total_used',total_used);
					console.log('user_used',user_used);
					if(validate == false){
						resultJson = '{"replyCode":"error","replyMsg":"'+invalidMsg+'","cmd":"offer_code"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else if(min_purchase >= amount){
						resultJson = '{"replyCode":"error","replyMsg":"Minimum purchase amount is not sufficient","cmd":"offer_code"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else if(max_usage <= total_used){
						resultJson = '{"replyCode":"error","replyMsg":"Coupon maximum use limit exceeded ","cmd":"offer_code"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else if(max_usage_per_user <=user_used){
						resultJson = '{"replyCode":"error","replyMsg":"You have exceeded coupon maximum use limit ","cmd":"offer_code"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var discount_type=res[0].type;
						var max_discount=res[0].max_discount;
						var discount=0;
						if(discount_type==0){ //amount
							discount = max_discount;
						}else{
							discount = (max_discount/100)*amount;
							discount = Math.floor(discount);
						}

						resultJson = '{"replyCode":"success","replyMsg":"Coupon code Applied successfully","discount":'+discount+',"cmd":"offer_code"}\n';
						console.log(resultJson);
						connection.release();
						callback(200, null, resultJson);
						return;
					}
					
				}else{

					resultJson = '{"replyCode":"error","replyMsg":"Invalid Coupon code","cmd":"offer_code"}\n';
					console.log(resultJson);
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});	
	});
}



// get tracking info

function get_tracking_info(userdata, pool, callback){
	var waybill='0';
	if (typeof userdata.waybill != 'undefined' && userdata.waybill != '') {
		waybill = userdata.waybill;
	}

	pool.getConnection(function (err, connection) {
		
		var TrackUrl ="https://track.delhivery.com/api/v1/packages/json/?waybill="+waybill+"&token=4654c7473ffcfa7d2151b60f491461500142e09e"
		console.log('TrackUrl',TrackUrl);

		request({
			url: TrackUrl,
			method: 'GET',
		}, function(error, response, body){
			if(error) {
				console.log(error);
				resultJson = '{"replyCode":"success","replyMsg":"Something went wrong","otp":"'+secureCode+'", "cmd":"get_tracking_info"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				
				resultJson = '{"replyCode":"success","replyMsg":"Data fetched successfully","data":'+body+', "cmd":"get_tracking_info"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
				
			}
		});
	})
}

function school_login_bypass(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var phone = '';

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	
	console.log('userdata',userdata)
	pool.getConnection(function (err, connection) {
		
		squery ='SELECT schools.* from schools WHERE contact_phone="' + phone + '" AND contact_phone !=""';
		console.log('ss',squery)
		connection.query(squery, function (err, results) {
			if (!err)
			{
				var dataResult = results[0];
				console.log('-------------------');
				console.log(dataResult);
				var sid = hashids.encode(results[0].id);
				resultJson = '{"replyCode":"success","sid":"'+sid+'","replyMsg": "success", "data":'+ JSON.stringify(results[0]) +',"cmd":"login"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;		
			}else{
				
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"login"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

// reset password 

function school_reset_password(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var id = '';
	var password = '';
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	console.log(userdata);
	pool.getConnection(function (err, connection) {
		var hash_newpassword = sha1(secretSalt + password);
		
		var uid = id;
		console.log('UPDATE schools SET password = "'+hash_newpassword+'" WHERE id = "'+uid+'"');
		connection.query('UPDATE schools SET password = "'+hash_newpassword+'",password_text="'+password+'" WHERE id = "'+uid+'"', function(errs, done){
			if(errs){
				resultJson = '{"replyCode":"error","replyMsg":"' + errs.message + '","cmd":"reset_password"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Password has been changed successfully","cmd":"reset_password"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function assesment_question_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var assessment_id = '';
	var quiz_id = '';
	var Keyconditoin = ' assessment_questions.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.quiz_id != 'undefined' && userdata.quiz_id != '') {
		quiz_id = userdata.quiz_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND assessment_questions.question_title LIKE  "%' + keyword + '%"';
		}
		
		if (assessment_id != '') {
			Keyconditoin += ' AND assessment_questions.assessment_id ="' + assessment_id + '"';
		}
		

		//detailsquery = 'SELECT assessment_questions.*,assessment_marks.user_option from assessment_questions JOIN assessment_marks as assessment_marks ON assessment_marks.question_id = assessment_questions.id where  ' + Keyconditoin + '';
		detailsquery = 'SELECT assessment_questions.*,(SELECT user_option FROM assessment_marks where assessment_marks.question_id=assessment_questions.id AND assessment_marks.quiz_id ="' + quiz_id + '" limit 1) as user_option from assessment_questions  where  ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"assessment_questions_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"assessment_questions_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
			}
		});
	});
}


//student submit assesment

function student_assesment_submit(userdata, pool, callback){
	var resultJson = '';
	var student_assessment_id ='';
	var questions ='';
	
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var sid = '';
	
	if (typeof userdata.student_assessment_id != 'undefined' && userdata.student_assessment_id != '') {
		student_assessment_id = userdata.student_assessment_id;
	}

	if (typeof userdata.questions != 'undefined' && userdata.questions != '') {
		questions = userdata.questions;
	}
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		var student_id=hashids.decode(sid);
		Catquery ='UPDATE student_assessments SET status = "1",updated=NOW() WHERE id = "'+student_assessment_id+'"';
	
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				var i = 0;
				async.eachSeries(questions,function(rec2, loop2){
					
					var section_id = rec2.section_id;
					var subsection_id=rec2.subsection_id;
					var assessment_id=rec2.assessment_id;
					var question_id=rec2.question_id;
					var marks=rec2.marks;
					var equivalent=rec2.equivalent;
					var month=rec2.month;
					var user_answer=rec2.user_answer;
					var user_option=rec2.user_option;
					squery ='INSERT INTO assessment_marks SET student_id = "'+student_id+'",section_id="'+section_id+'",subsection_id="'+subsection_id+'",assessment_id="'+assessment_id+'",question_id="'+question_id+'",marks="'+marks+'",equivalent="'+equivalent+'",month="'+month+'",user_answer="'+user_answer+'",user_option="'+user_option+'"';
					console.log('squery',squery);
					connection.query(squery, function(errContent,resContent){
						if(errContent){
							console.log('errSelpiMG',errContent);
							
							loop2();
						}else{
							
							loop2();
						}
						i=i+1;
					});
					
				},function(errinsertDet){
					if(errinsertDet){
						resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"student_assesment_submit"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						// var Pointsquery ='UPDATE student_quizzes SET points_earned = "'+total_points+'" WHERE id = "'+student_quiz_id+'"';
						// console.log(Pointsquery);
						// connection.query(Pointsquery);
						resultJson = '{"replyCode":"success","replyMsg":"Quiz submitted successfully","cmd":"student_assesment_submit"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
						
					}
				});
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_quiz_submit"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}


//upteacher comment
function update_assesment_teacher_comment(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var student_assessment_id = '';
	var teacher_remarks = ''; 
	var teacher_name = ''; 

	if (typeof userdata.student_assessment_id != 'undefined' && userdata.student_assessment_id != '') {
		student_assessment_id = userdata.student_assessment_id;
	}

	if (typeof userdata.teacher_remarks != 'undefined' && userdata.teacher_remarks != '') {
		teacher_remarks = userdata.teacher_remarks;
	}
	
	if (typeof userdata.teacher_name != 'undefined' && userdata.teacher_name != '') {
		teacher_name = userdata.teacher_name;
	}

	pool.getConnection(function (err, connection) {
		Catquery ='UPDATE student_assessments SET teacher_remarks = "'+teacher_remarks+'",teacher_name="'+teacher_name+'" WHERE id = "'+student_assessment_id+'"';
	
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson ='{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_assesment_teacher_comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson ='{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_assesment_teacher_comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function student_assesment_marks_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var assessment_id = '';
	var student_id = '';
	var Keyconditoin = ' assessment_marks.int !="0"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	pool.getConnection(function (err, connection) {
		// if (keyword != '') {
		// 	Keyconditoin += ' AND assessment_marks.question_title LIKE  "%' + keyword + '%"';
		// }
		
		if (assessment_id != '') {
			Keyconditoin += ' AND assessment_marks.assessment_id ="' + assessment_id + '"';
		}
		if (student_id != '') {
			Keyconditoin += ' AND assessment_marks.student_id ="' + student_id + '"';
		}

		detailsquery = 'SELECT assessment_marks.*,assessment_questions.question_description,assessment_questions.max_marks from assessment_marks LEFT JOIN assessment_questions as assessment_questions ON assessment_questions.id = assessment_marks.question_id where  ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"assessment_marks_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"assessment_marks_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
			}
		});
	});
}

//fetch terms courses

function fetch_terms_courses(userdata, pool, callback){
	var resultJson = '';
	var Cquery = '';
	var squery='';
	var res =[];
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var terms = '';
	var age_group_id = '';
	
	if (typeof userdata.terms != 'undefined' && userdata.terms != '') {
		terms = userdata.terms;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '' && userdata.age_group_id !='null') {
		age_group_id = userdata.age_group_id;
	}

	pool.getConnection(function (err, connection) {
		var i = 0;
		async.eachSeries(terms,function(rec2, loop2){
			console.log('terms-id',rec2);
			
			squery="SELECT courses.* FROM courses WHERE courses.terms IN ('"+rec2+"') AND courses.learning='1' AND courses.age_group_id='"+age_group_id+"'";
			console.log('query',squery);
			connection.query(squery, function(errContent,resContent){
				if(errContent){
					console.log('errSelpiMG',errContent);
					
					loop2();
				}else{
					if(resContent.length>0){
						res.push(resContent[0]);
					}
					loop2();
				}
				i=i+1;
			});
			
		},function(errinsertDet){
			if(errinsertDet){
				resultJson = '{"replyCode":"error","replyMsg":"'+errinsertDet.message+'","cmd":"fetch_terms_courses"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"courses list","data":'+JSON.stringify(res)+',"cmd":"fetch_terms_courses"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;	
				
			}
		});
	});
}



function web_user_refferal_list(userdata, pool, callback) {
	var resultJson = '';
	var refferal_code = '';
	var Keyconditoin = '';
	
	if (typeof userdata.refferal_code != 'undefined' && userdata.refferal_code != '') {
		refferal_code = userdata.refferal_code;
	}

	pool.getConnection(function (err, connection) {
		if (refferal_code != '') {
			Keyconditoin += ' AND u.sponsor_code ="' + refferal_code + '"';
		}
		
		
		detailsquery ='Select u.*,wallet.*,c.course_name from users u left join user_wallet wallet on u.id=wallet.user_id left join student_course_subscription scs on wallet.subscription_id =scs.id left join courses c on scs.course_id =c.id where u.status !="2" '+Keyconditoin+' ORDER BY u.created DESC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
				'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"web_user_refferal_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
				'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
				JSON.stringify(resSelDetails) +',"cmd":"web_user_refferal_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// invite link

function send_invite_link(userdata, pool, callback){
	var resultJson = '';
	var student_name ='';
	var emails ='';
	var link='';
	
	if (typeof userdata.student_name != 'undefined' && userdata.student_name != '') {
		student_name = userdata.student_name;
	}
	
	if (typeof userdata.link != 'undefined' && userdata.link != '') {
		link = userdata.link;
	}

	if (typeof userdata.emails != 'undefined' && userdata.emails != '') {
		emails = userdata.emails;
		var emailsArray = emails.split(',');
	}
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		console.log('SELECT * FROM email_templates WHERE email_type = "invite_link"');	
		connection.query('SELECT * FROM email_templates WHERE email_type = "invite_link"', function(err, resultTemplate){
			if(err){
				console.log(err);
			}else{
				console.log('resultTemplate',resultTemplate);
				var i = 0;
				async.eachSeries(emailsArray,function(rec2, loop2){
					var email = rec2;
					console.log('rec2',email);	
					var nodemailer = require('nodemailer');
					var message = '<p>Dear guest,</p><p><br />[STUDENT] has invited you to join learning-bix .</p><br /><p>please visit following link [LINK]</p><p>for any query contact at info@learning-bix.com</p><p>Best Regards</p><p>[site_title]</p>';
					var name =student_name;
					message = message.replace("[STUDENT]", name);
					message = message.replace("[EMAIL]", email);
					message = message.replace("[LINK]", link);
					message = message.replace("[site_title]", SITE_TITLE);

					// setup e-mail data with unicode symbols
					var mailOptions = {
						from: SITE_TITLE+' <info@learning-bix.com>', // sender address
						to: email, // list of receivers
						subject: "Learning-Bix Invitation", // Subject line
						html: message // html body
					};
						//from: smtpMailUser,
						
					var transporter = nodemailer.createTransport(smtpConfig);

					//send mail with defined transport object

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log('ERRPR-EAMIL',error);
							loop2();
						} else {
							console.log('Mail sent to-',name);
							loop2();
						
						}
					});
				},function(errinsertDet){
					if(errinsertDet){
						resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"invite"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						
						resultJson = '{"replyCode":"success","replyMsg":"Invite sent successfully","cmd":"invite"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
						
					}
				});
			}
		})
		
	});
}


function youtube_class_list(userdata, pool, callback){
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var resultJson = '';
	var age_group_id='';
	var sid='';
	var student_id='';
	var Cquery = '';
	var Keyconditoin = '';
	var type=''; //0- past,1-today,2-upcoming

	var ToDate = new Date();
	var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
	var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() +":" + ToDate.getSeconds();

	console.log('-CurTime-',CurTime);
	console.log(Curdate+'-'+CurTime);
	
	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
		student_id=hashids.decode(sid);
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	if (age_group_id != '') {
		Keyconditoin += ' AND youtube_classes.age_group_id ="' + age_group_id + '"';
	}
	
	if (type == '0') {
		Keyconditoin += ' AND youtube_classes.live_date <"' + Curdate + '"';
	}else if(type=='1'){
		Keyconditoin += ' AND youtube_classes.live_date ="' + Curdate + '"';
	}else if(type=='2'){
		Keyconditoin += ' AND youtube_classes.live_date >"' + Curdate + '"';
	}else{
		Keyconditoin += ' AND youtube_classes.id !=""';
	}
		

	pool.getConnection(function (err, connection) {
		var sQuery='SELECT * from student_course_subscription  where course_start_date < NOW() AND DATE_ADD(course_start_date, INTERVAL 30 DAY) >NOW() AND student_id="'+student_id+'" ORDER BY student_course_subscription.id DESC';
		console.log('sQuery',sQuery);
		connection.query(sQuery, function(errS, sbData){
			if(errS){
				resultJson = '{"replyCode":"error","replyMsg":"'+errS.message+'","cmd":"youtube_class_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				console.log('sbData',sbData);
				if(sbData !="" && sid!=""){
					Keyconditoin += ' AND youtube_classes.course_id ="'+sbData[0].course_id+'"';
				}

				Cquery='SELECT youtube_classes.* from youtube_classes WHERE youtube_classes.status != "2" '+Keyconditoin+' ORDER BY youtube_classes.live_date ASC';
					
				console.log(Cquery);
				connection.query(Cquery, function(err, ordData){
					if(err){
						resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"youtube_class_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						if(ordData.length>0){
							res =ordData;
						}else{
							res	=[];
						}						
						resultJson = '{"replyCode":"success","replyMsg":"youtube classes list","data":'+JSON.stringify(res)+',"cmd":"youtube_class_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
					}
				})
			}
		})	

	});
}



/* OTP generate*/
function school_otp_generate(userdata, pool, callback){
	var resultJson = '';
	var contact_phone = '';
	var Keyconditoin='';
	if (typeof userdata.contact_phone != 'undefined' && userdata.contact_phone != ''){
		contact_phone = userdata.contact_phone;
	}
	

	pool.getConnection(function (err, connection) {
		connection.query('SELECT schools.* FROM schools WHERE contact_phone="'+contact_phone+'"', function(err, schools){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_generate"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{	
				if(schools.length > 0){
					if(schools[0].status != 1){
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized, Please contact Society admin","cmd":"otp_generate"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var secureCode = Math.floor(100000 + Math.random() * 900000);
						secureCode = secureCode.toString().substring(0,4);
						var message = '';
						secureCode =  parseInt(secureCode);
						//secureCode =  1234;
						message += "Your Learning-Bix Verification code is  " + secureCode + "\n";
						var newMob='+91'+contact_phone;
						request({
							url: 'http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles='+contact_phone+'&tempid=1707161822699439765&sms=You%20are%20just%20one%20step%20away%20from%20accessing%20your%20dashboard%20account%20at%20LearningBix.%20Enter%20'+secureCode+'%20to%20continue.%20Valid%20for%20only%205%20mins.%20Do%20not%20share%20it%20with%20others',
							method: 'GET',
						}, function(error, response, body){
							if(error) {
								console.log(error);
								resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"otp_generate"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								//console.log(response)
								connection.query('UPDATE schools SET otp = "'+secureCode+'" WHERE id ="'+schools[0].id+'"');
								resultJson = '{"replyCode":"success","replyMsg":"OTP sent successfully on registered number","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
								console.log('res-suceess');
								connection.release();
								callback(200, null, resultJson);
								return;
								
							}
						});
					
						// resultJson = '{"replyCode":"success","replyMsg":"OTP generated","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
						// console.log('res-suceess');
						// connection.release();
						// callback(200, null, resultJson);
						// return;
					}
				}else{
					var secureCode = Math.floor(100000 + Math.random() * 900000);
					secureCode = secureCode.toString().substring(0,4);
					var message = '';
					secureCode =  parseInt(secureCode);
					//secureCode =  1234;
					message += "Your Learning-Bix Verification code is  " + secureCode + "\n";
					var newMob='+91'+contact_phone;
					request({
						url: 'http://sms.smsmenow.in/sendsms.jsp?user=lngbix&password=2b4e1f7bbcXX&senderid=LNGBIX&mobiles='+contact_phone+'&tempid=1707161822699439765&sms=You%20are%20just%20one%20step%20away%20from%20accessing%20your%20dashboard%20account%20at%20LearningBix.%20Enter%20'+secureCode+'%20to%20continue.%20Valid%20for%20only%205%20mins.%20Do%20not%20share%20it%20with%20others',
						method: 'GET',
					}, function(error, response, body){
						if(error) {
							console.log(error);
							resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'","cmd":"otp_generate"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							
							resultJson = '{"replyCode":"success","replyMsg":"OTP sent successfully on registered number","otp":"'+secureCode+'", "cmd":"otp_generate"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
							
						}
					});
				}	
			}
		});	
	 	
	}); 
}

/* OTP verify*/
function school_otp_verify(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var contact_phone = '';
	var otp = '';
	
	if (typeof userdata.contact_phone != 'undefined' && userdata.contact_phone != '') {
		contact_phone = userdata.contact_phone;
	}
	if (typeof userdata.otp != 'undefined' && userdata.otp != '') {
		otp = userdata.otp;
	}
	
	pool.getConnection(function (err, connection) {
		///contact_phone =contact_phone.replace(/^0+/, '');
		connection.query('SELECT schools.* FROM schools WHERE contact_phone="'+contact_phone+'" AND otp="'+otp+'"', function(err, schools){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_verify"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{		
				console.log(schools)
				if(schools.length > 0){
					var user_id = schools[0].id;
					var Que = 'UPDATE schools SET verified = "1" WHERE contact_phone ="'+contact_phone+'"';
					connection.query(Que, function(errUpdate, updated){
						if(errUpdate){
							resultJson = '{"replyCode":"error","replyMsg":"'+errUpdate.message+'","cmd":"otp_verify"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							var sid = hashids.encode(schools[0].id);
							resultJson = '{"replyCode":"success","replyMsg":"OTP verified","sid":"'+sid+'","data":'+ JSON.stringify(schools[0])+', "cmd":"otp_verify"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});			
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Credentials are not valid , Please check ","cmd":"otp_verify"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;	
				}
			}
		});	
	});
}


// create teacher

function create_teacher(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var name = '';
	var email = '';
	var qualification = '';
	var image = '';
	var password = '123456';	
	var role_id = '3';//1-admin,2-student,3-teacher,4-subadmin
	var phone = '';
	var gender= '1'; //	1-male,2-female,3-other
	var age= '0';
	var time_zone= '0';
	var dob= '0000-00-00';
	var work_experience= '1';
	var job_type= '1'; //	1-fulltime,2-parttime
	var resume='';
	var sponsor_code='';
	var school_code='';
	var grades='';
	var subjects='';

	var id='';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}
	
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	
	if (typeof userdata.time_zone != 'undefined' && userdata.time_zone != '') {
		time_zone = userdata.time_zone;
	}
	
	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}
	
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.job_type != 'undefined' && userdata.job_type != '') {
		job_type = userdata.job_type;
	}
	if (typeof userdata.work_experience != 'undefined' && userdata.work_experience != '') {
		work_experience = userdata.work_experience;
	}
	if (typeof userdata.qualification != 'undefined' && userdata.qualification != '') {
		qualification = userdata.qualification;
	}
	if (typeof userdata.resume != 'undefined' && userdata.resume != '') {
		resume = userdata.resume;
	}
	if (typeof userdata.sponsor_code != 'undefined' && userdata.sponsor_code != '') {
		sponsor_code = userdata.sponsor_code;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	
	if (typeof userdata.grades != 'undefined' && userdata.grades != '') {
		grades = userdata.grades;
	}
	if (typeof userdata.subjects != 'undefined' && userdata.subjects != '') {
		subjects = userdata.subjects;
	}
	
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		
		var hash_password = sha1(secretSalt + userdata.password);
		if(id !=''){
			var checkEmail ='SELECT * from users where email = "'+email+'" AND email != "" AND role_id="3" AND id !="'+id+'"';
		}else{
			var checkEmail ='SELECT * from users where email = "'+email+'" AND email != "" AND role_id="3"';
		}
		
		connection.query(checkEmail, function (erremail, resultsemail) {
			if (!erremail){
				var pagingCount1 = resultsemail.length;
				console.log(userdata);
				console.log(pagingCount1);
				if (pagingCount1 > 0){
					if(resultsemail[0].status == '1'){
						resultJson = '{"replyCode":"error","replyMsg":"Email already Registered, please try with different email address","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;								
					}else{
						resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}	
				}else{
					if(id !=''){
						var checkPhone ='SELECT * from users where phone = "'+phone+'" AND phone != "" AND role_id="3" AND id !="'+id+'"';
					}else{
						var checkPhone ='SELECT * from users where phone = "'+phone+'" AND phone != "" AND role_id="3"';
					}
					
					console.log(checkPhone);
					connection.query(checkPhone, function (errphone, resultsphone) {
						if (!errphone){
							if (resultsphone.length > 0){
								if(resultsphone[0].status == '1'){
									resultJson = '{"replyCode":"error","replyMsg":"Phone already Registered, please try with different Phone number","cmd":"sign_up"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;								
								}else{
									resultJson = '{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}	
							}else{
								if(id !=''){
									var queryinsert = 'UPDATE users SET email="' + email + '",name = "'+name+'",password = "'+hash_password+'",password_text="'+password+'" ,phone = "'+phone+'",role_id="'+role_id+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",image="'+image+'",job_type="'+job_type+'",work_experience="'+work_experience+'",qualification="'+qualification+'",resume="'+resume+'",school_code="'+school_code+'",subjects="'+subjects+'" where users.id="'+id+'"';
								}else{
									var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "'+name+'",password = "'+hash_password+'",password_text="'+password+'" ,phone = "'+phone+'",role_id="'+role_id+'",gender="'+gender+'",age="'+age+'",time_zone="'+time_zone+'",dob="'+dob+'",image="'+image+'",job_type="'+job_type+'",work_experience="'+work_experience+'",qualification="'+qualification+'",resume="'+resume+'",school_code="'+school_code+'",subjects="'+subjects+'",status="1",verified="0",created= NOW()';
								}
								console.log(queryinsert);
								connection.query(queryinsert, function(errinsert, resultinsert){
									if(!errinsert){
										//grades
										var teacher_id='';
										if(grades !=""){
											console.log('InsertRes',resultinsert)
											if(id !=''){
												 teacher_id = id;
											}else{
												 teacher_id = resultinsert.insertId;
											}
											DeleteQuery='DELETE FROM teachers_grades WHERE teacher_id="'+teacher_id+'"';
											console.log('DeleteQuery',DeleteQuery);
											connection.query(DeleteQuery);
						
											async.eachSeries(grades, function(rec2, loop2){
												console.log("in user result array");
												
												console.log('assesment-id',rec2);
												Uquery = 'INSERT INTO teachers_grades SET teacher_id="'+teacher_id+'",grade_id="'+rec2+'"';
												
												console.log('Uquery',Uquery);
												connection.query(Uquery, function(errPre, Predetails){
													if(errPre){
														console.log('errPre.message',errPre.message)
														loop2();
													}else{
														loop2();
													}
												})
												
											},function(errInsert){
												if(errInsert){
													resultJson = '{"replyCode":"error","replyMsg":"'+errInsert.message+'", "cmd":"send"}';
													console.log(resultJson);
													connection.release();
													callback(200, null, resultJson);
													return;
												}else{
													
													resultJson = '{"replyCode":"success","replyMsg":"Teacher registered successfully","cmd":"sign_up"}\n';
													connection.release();
													callback(200, null, resultJson);
													return;
												}
											})
											
										}else{
											resultJson = '{"replyCode":"success","replyMsg":"Teacher registered successfully","cmd":"sign_up"}\n';
											connection.release();
											callback(200, null, resultJson);
											return;
										}
										
									}else{
										resultJson = '{"replyCode":"error","replyMsg":"'+errinsert.message+'","cmd":"sign_up"}\n';
										console.log('res-suceess');
										connection.release();
										callback(400, null, resultJson);
										return;
									}
								});
							}
						}else{
							resultJson = '{"replyCode":"error","replyMsg":"' + errphone.message + '","cmd":"sign_up"}\n';
							connection.release();
							callback(400, null, resultJson);
							return;
						}
					})
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + erremail.message + '","cmd":"sign_up"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		})
	});
}

/* OTP generate*/
function otp_generate_email(userdata, pool, callback){
	var resultJson = '';
	var email = '';
	var role_id = '2';
	var Keyconditoin='';
	if (typeof userdata.email != 'undefined' && userdata.email != ''){
		email = userdata.email;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != ''){
		role_id = userdata.role_id;
	}

	if(role_id =='2'){
		Keyconditoin =' AND users.role_id ="2"';
	}

	pool.getConnection(function (err, connection) {
		connection.query('SELECT users.* FROM users WHERE email="'+email+'" '+Keyconditoin+'', function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_generate"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{	
				if(users.length > 0){
					if(users[0].status != 1){
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized, Please contact Support","cmd":"otp_generate"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						var secureCode = Math.floor(100000 + Math.random() * 900000);
						secureCode = secureCode.toString().substring(0,4);
						var message = '';
						secureCode =  parseInt(secureCode);
						
						message += "Your Learning-Bix OTP code is  " + secureCode + "\n\n";
						
						var nodemailer = require('nodemailer');
						
						// setup e-mail data with unicode symbols
						var mailOptions = {
							from: SITE_TITLE+' <info@learning-bix.com>', // sender address
							to: email, // list of receivers
							subject: "Learning-Bix login credentials", // Subject line
							html: message // html body
						};
							//from: smtpMailUser,
							
						var transporter = nodemailer.createTransport(smtpConfig);

						// send mail with defined transport object
						connection.query('UPDATE users SET otp = "'+secureCode+'" WHERE id ="'+users[0].id+'"');
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								console.log('ERRPR-EAMIL',error);
								
								resultJson = '{"replyCode":"success","replyMsg":"You will get OTP on your mail inbox, Please check."}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								console.log('email sent',info);
								resultJson = '{"replyCode":"success","replyMsg":"You will get OTP on your mail inbox, Please check."}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							
							}
						});
					}
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Email not registered","cmd":"otp_generate"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}	
			}
		});	
	 	
	}); 
}

/* OTP verify*/
function otp_verify_email(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	
	var email = '';
	var otp = '';
	
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.otp != 'undefined' && userdata.otp != '') {
		otp = userdata.otp;
	}
	
	pool.getConnection(function (err, connection) {
		///email =email.replace(/^0+/, '');
		connection.query('SELECT users.* FROM users WHERE email="'+email+'" AND otp="'+otp+'"', function(err, users){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"otp_verify"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{		
				console.log(users)
				if(users.length > 0){
					var user_id = users[0].id;
					var Que = 'UPDATE users SET verified = "1" WHERE email ="'+email+'"';
					connection.query(Que, function(errUpdate, updated){
						if(errUpdate){
							resultJson = '{"replyCode":"error","replyMsg":"'+errUpdate.message+'","cmd":"otp_verify"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							var sid = hashids.encode(users[0].id);
							resultJson = '{"replyCode":"success","replyMsg":"OTP verified","sid":"'+sid+'","data":'+ JSON.stringify(users[0])+', "cmd":"otp_verify"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});			
				}else{
					resultJson = '{"replyCode":"error","replyMsg":"Credentials are not valid , Please check ","cmd":"otp_verify"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;	
				}
			}
		});	
	});
}


/* subjects list */
function subjects_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND subjects.subject_name LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT subjects.* from subjects where subjects.status !="2"';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"subjects"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"subjects"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function teacher_assesment_submit(userdata, pool, callback){
	var resultJson = '';
	var student_assessment_id ='';
	var questions ='';
	
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var student_id = '';
	
	if (typeof userdata.student_assessment_id != 'undefined' && userdata.student_assessment_id != '') {
		student_assessment_id = userdata.student_assessment_id;
	}

	if (typeof userdata.questions != 'undefined' && userdata.questions != '') {
		questions = userdata.questions;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	
	console.log('----------');
	console.log(userdata);
	
	pool.getConnection(function (err, connection){
		Catquery ='UPDATE student_assessments SET status = "1",quiz_id="'+questions[0].quiz_id+'",updated=NOW() WHERE id = "'+student_assessment_id+'"';
	
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				var i = 0;
				async.eachSeries(questions,function(rec2, loop2){
					
					var section_id = rec2.section_id;
					var subsection_id=rec2.subsection_id;
					var assessment_id=rec2.assessment_id;
					var question_id=rec2.question_id;
					var marks=rec2.marks;
					var equivalent=rec2.equivalent;
					var month=rec2.month;
					var user_answer=rec2.user_answer;
					var user_option=rec2.user_option;
					var quiz_id=rec2.quiz_id;
					squery ='INSERT INTO assessment_marks SET student_id = "'+student_id+'",section_id="'+section_id+'",subsection_id="'+subsection_id+'",assessment_id="'+assessment_id+'",question_id="'+question_id+'",marks="'+marks+'",equivalent="'+equivalent+'",month="'+month+'",user_answer="'+user_answer+'",quiz_id="'+quiz_id+'",user_option="'+user_option+'"';
					console.log('squery',squery);
					connection.query(squery, function(errContent,resContent){
						if(errContent){
							console.log('errSelpiMG',errContent);
							
							loop2();
						}else{
							
							loop2();
						}
						i=i+1;
					});
					
				},function(errinsertDet){
					if(errinsertDet){
						resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"student_assesment_submit"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						// var Pointsquery ='UPDATE student_quizzes SET points_earned = "'+total_points+'" WHERE id = "'+student_quiz_id+'"';
						// console.log(Pointsquery);
						// connection.query(Pointsquery);
						resultJson = '{"replyCode":"success","replyMsg":"Quiz submitted successfully","cmd":"student_assesment_submit"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;	
						
					}
				});
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_quiz_submit"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}

/* user List */
function overall_details_student(userdata, pool, callback) {
	var resultJson = '';
	var student_id=' ';
	var Keyconditoin='';
	if (typeof userdata.student_id  != 'undefined' && userdata.student_id  != '') {
		student_id  = userdata.student_id ;
	}
	pool.getConnection(function (err, connection) {
		
		
		var Catquery='Select users.id,users.name,(Select SUM(total_points) from overall_leaderboard where id="'+student_id+'") all_points,(Select SUM(total_points) from overall_leaderboard_weekly where id="'+student_id+'") weekly_points from users where users.id ="' + student_id + '" ';

		console.log('Catquery',Catquery)
		connection.query(Catquery, function(errSelpiMG,respROiMG){
			if(errSelpiMG){
				
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelpiMG.message+'","cmd":"overall_details_student"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(respROiMG)+',"cmd":"overall_details_student"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// reviews

/*Create Review Rating*/
function create_review(userdata, pool, callback){
	var resultJson = '';
	var strJson = '';
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var Query='';
	var teacher_id='';
	var student_id='';
	var rating = '';
	var review = '';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.rating != 'undefined' && userdata.rating != '') {
		rating = userdata.rating;
	}

	if (typeof userdata.review != 'undefined' && userdata.review != '') {
		review = userdata.review;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	pool.getConnection(function (err, connection) {
		Query='SELECT id FROM reviews WHERE teacher_id ="'+teacher_id+'" AND student_id="'+student_id+'" AND status !="2"';
		
		console.log(Query);
		connection.query(Query, function(err, checkRate){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"rating"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				if(checkRate.length && checkRate[0].id != '' && checkRate[0].id != 0){
					Query = 'UPDATE reviews SET review="' + review + '",teacher_id="' + teacher_id + '",student_id="' + student_id + '",rating="' + rating + '",status="0",created=NOW() WHERE id = "'+checkRate[0].id+'" '
				}else{
					Query='INSERT INTO reviews SET review="' + review + '",teacher_id="' + teacher_id + '",student_id="' + student_id + '",rating="' + rating + '",status="0",created=NOW()';
				}	
				console.log(Query);
				connection.query(Query, function(err, rate){
					if(err){
						resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"rating"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}else{
						connection.query('SELECT ROUND(AVG (reviews.rating),1) as rating from reviews WHERE reviews.teacher_id="'+teacher_id+'" AND status !="2" ', function(err, rateData){
							if(err){
								resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"rating"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							}else{
								resultJson = '{"replyCode":"success","replyMsg":"rating succefull", "data":'+JSON.stringify(rateData[0])+',"cmd":"rating"}\n';
								console.log(resultJson);
								connection.release();
								callback(200, null, resultJson);
								return;	
							}
						})
					}
				})		
			}
		});	
	});
}

// Update status
function update_reviews_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-approve , 2- delete
	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE reviews SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"projectss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"projectss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


/*Create Doubt*/
function create_doubt(userdata, pool, callback){
	var resultJson = '';
	var Query='';
	var course_id='';
	var teacher_id='';
	var student_id='';
	var from_id='';
	var to_id='';
	var message='';
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.from_id != 'undefined' && userdata.from_id != '') {
		from_id = userdata.from_id;
	}
	if (typeof userdata.to_id != 'undefined' && userdata.to_id != '') {
		to_id = userdata.to_id;
	}
	if (typeof userdata.message != 'undefined' && userdata.message != '') {
		message = userdata.message;
	}
	
	pool.getConnection(function (err, connection) {
			
		Query='INSERT INTO user_doubts SET course_id="' + course_id + '",teacher_id="'+teacher_id+'",student_id="'+student_id+'",created_by="'+from_id+'",created=NOW()';
		console.log(Query);
		connection.query(Query, function(err, rate){
			if(err){
				resultJson = '{"replyCode":"error","replyMsg":"'+err.message+'","cmd":"chat group"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				var doubts_id=rate.insertId;
				Query1='INSERT INTO doubts_chat SET doubts_id="' + doubts_id + '",from_id="'+from_id+'",to_id="'+to_id+'",message="'+message+'",created=NOW()';
				connection.query(Query1);
				
				resultJson = '{"replyCode":"success","replyMsg":" Doubt created succefully","cmd":"doubts","doubts_id":'+doubts_id+'}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;	
			}
		})
	});
}




function student_dashboard_info(userdata, pool, callback){
	var resultJson = '';
	
	var student_id ='';
	

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != ''){
		student_id = userdata.student_id;
	}
	
	console.log('----------');
	console.log(userdata);
	pool.getConnection(function (err, connection){
		proiMGquery = 'SELECT users.*,(SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" AND student_lessons_status.percentage >"90") + (SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.in_review ="2") +(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.in_review ="1") as total_lessons,(SELECT COUNT(*) from student_projects where student_projects.student_id ="'+student_id+'" AND student_projects.in_review="2") as completed_project,(SELECT COUNT(*) from student_quizzes where student_quizzes.student_id ="'+student_id+'" AND student_quizzes.in_review="2" ) as completed_quiz,(SELECT COUNT(*) from student_quizzes where student_quizzes.student_id ="'+student_id+'") as total_quiz,(SELECT COUNT(*) from student_projects where student_projects.student_id ="'+student_id+'") as total_project,(SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" )  as class_enrolled,(SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" AND student_lessons_status.percentage >"90") + (SELECT COUNT(*) from student_booked_classes where status="2" AND student_id="'+student_id+'") as class_completed from users where users.id="'+student_id+'"';
		console.log('qq',proiMGquery)
		connection.query(proiMGquery, function(errinsert, resPro){
			if(!errinsert){
				if(resPro.length >0){
					resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}

// class badges

function class_badges_list(userdata, pool, callback) {
	var resultJson = '';
	var class_id = '';
	
	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}
	
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM class_badges WHERE class_id="' + class_id + '"';
		
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert;
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"class_badges details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class_badges"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function send_class_badges(userdata, pool, callback) {
	var resultJson = '';
	var class_id = '';
	var badge_type = '1'; //1,2,3
	var Uquery = '';

	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}

	if (typeof userdata.badge_type != 'undefined' && userdata.badge_type != '') {
		badge_type = userdata.badge_type;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'INSERT INTO class_badges SET badge_type="' + badge_type + '",class_id="'+class_id+'"';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"badge_type chenged Successfully","cmd":"class_badges"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class_badges"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function teacher_student_course_summary_track(userdata, pool, callback){
	var resultJson = '';
	var student_id ='';
	
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != ''){
		student_id = userdata.student_id;
	}
	
	console.log('----------');
	console.log(userdata);
	pool.getConnection(function (err, connection){
		var Catquery='SELECT student_course_subscription.course_id,student_course_subscription.course_start_date,student_course_subscription.certificate_name,courses.course_name,courses.description,courses.image,courses.course_ppt,(SELECT SUM(total_points) from student_course_summary_points where student_course_summary_points.student_id ="'+student_id+'") as total_points  from student_course_subscription LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id WHERE  student_course_subscription.student_id="'+student_id+'"';
		console.log('qq',Catquery)
		connection.query(Catquery, function(errinsert, resPro){
			if(!errinsert){
				if(resPro.length >0){
					var i = 0;
					async.eachSeries(resPro,function(rec2, loop2){
						var course_id = rec2.course_id;
						console.log('course_id',course_id);
						proiMGquery = 'SELECT course_chapters.*,(SELECT count(*) from chapter_lessons WHERE chapter_lessons.course_chapter_id=course_chapters.id AND chapter_lessons.status="1") as total_lessons,(SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" AND student_lessons_status.chapter_id=course_chapters.id AND student_lessons_status.percentage >"90") + (SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.chapter_id=course_chapters.id AND student_quizzes.in_review ="2") +(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") as complete_lessons,(SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.chapter_id=course_chapters.id AND student_quizzes.in_review ="2") as completed_quizzes,(SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.chapter_id=course_chapters.id ) as total_quizzes,(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") as completed_projects,(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") as total_projects, round((((SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" AND student_lessons_status.chapter_id=course_chapters.id AND student_lessons_status.percentage >"90") + (SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.chapter_id=course_chapters.id AND student_quizzes.in_review ="2") +(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") * 100) / (SELECT count(*) from chapter_lessons WHERE chapter_lessons.course_chapter_id=course_chapters.id AND chapter_lessons.status="1")), 0) AS percent,((((SELECT count(*) from student_lessons_status WHERE student_lessons_status.student_id="'+student_id+'" AND student_lessons_status.chapter_id=course_chapters.id AND student_lessons_status.percentage >"90") + (SELECT count(*) from student_quizzes WHERE student_quizzes.student_id="'+student_id+'" AND student_quizzes.chapter_id=course_chapters.id AND student_quizzes.in_review ="2") +(SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") * (select points_settings.class_points from points_settings)) + ((SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") * (select points_settings.project_points from points_settings points_settings))) + ((SELECT count(*) from student_projects WHERE student_projects.student_id="'+student_id+'" AND student_projects.chapter_id=course_chapters.id AND student_projects.in_review ="1") * (select points_settings.quiz_points from points_settings points_settings))) AS total_points from course_chapters where course_chapters.course_id="'+course_id+'" AND course_chapters.status="1" ORDER BY course_chapters.s_no ASC';
						console.log('proiMGquery',proiMGquery);
						connection.query(proiMGquery, function(errSelpiMG,respROiMG){
							if(errSelpiMG){
								console.log('errSelpiMG',errSelpiMG);
								
								loop2();
							}else{
								resPro[i].info=respROiMG;
								loop2();
							}
							i=i+1;
						});
						
					},function(errSelPro){
						if(errSelPro){
							console.log('errSelPro',errSelPro)
							resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"view_classes_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}else{
							resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(resPro)+',"cmd":"view_classes_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}else{
					resultJson = '{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}else{
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});	
	});
}


// Send Email from enquiry

function send_enquiry_email(userdata, pool, callback){
	var resultJson = '';
	var email = '';
	var subject = '';
	var body = '';
	
	var Keyconditoin='';
	if (typeof userdata.email != 'undefined' && userdata.email != ''){
		email = userdata.email;
	}
	if (typeof userdata.subject != 'undefined' && userdata.subject != ''){
		subject = userdata.subject;
	}
	if (typeof userdata.body != 'undefined' && userdata.body != ''){
		body = userdata.body;
	}

	var nodemailer = require('nodemailer');
		if(email){
			// setup e-mail data with unicode symbols
			body = body.replace("[sitename]", SITE_TITLE);
			body = body.replace("[site_title]", SITE_TITLE);
			var mailOptions = {
				from: SITE_TITLE+' <info@learning-bix.com>', // sender address
				to: email, // list of receivers
				subject: subject, // Subject line
				html: body // html body
			};
				//from: smtpMailUser,
				
			var transporter = nodemailer.createTransport(smtpConfig);

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					
					resultJson = '{"replyCode":"error","replyMsg":"'+error.message+'."}\n';
					
					callback(200, null, resultJson);
					return;
				} else {
					resultJson = '{"replyCode":"success","replyMsg":"Email send successfully."}\n';
					
					callback(200, null, resultJson);
					return;
				
				}
			});
	}					
	
}


/* user List */
function overall_details_teacher(userdata, pool, callback) {
	var resultJson = '';
	var teacher_id=' ';
	var Keyconditoin='';
	if (typeof userdata.teacher_id  != 'undefined' && userdata.teacher_id  != '') {
		teacher_id  = userdata.teacher_id ;
	}
	pool.getConnection(function (err, connection) {
		
		
		var Catquery='Select users.id,users.name,(Select SUM(total_points) from overall_leaderboard where school_code=users.school_code and class_name IN(Select grade_name from teachers_grades tg LEFT JOIN gradeName gn on tg.grade_id =gn.grade_id where teacher_id=users.id)) all_points from users where users.id ="' + teacher_id + '" ';

		console.log('Catquery',Catquery)
		connection.query(Catquery, function(errSelpiMG,respROiMG){
			if(errSelpiMG){
				
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelpiMG.message+'","cmd":"school_user_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":'+JSON.stringify(respROiMG)+',"cmd":"school_user_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


/* grades list */
function grades_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND grades.grade_name LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT grades.* from grades where grades.status !="2"';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"grades"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"grades"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


/* user List */
function school_user_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var role_id = '2';
	var class_name = '';
	var school_code='';
	var Keyconditoin = ' ';
	var resPro=[];
	var start = '0';
	var limit = '20';
	var subscribed ='';
	var learning ='';
	var filtered ="";
	var limitStr ='';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}

	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	
	if (typeof userdata.subscribed  != 'undefined' && userdata.subscribed  != '') {
		subscribed  = userdata.subscribed ;
	}
	if (typeof userdata.learning  != 'undefined' && userdata.learning  != '') {
		learning  = userdata.learning ;
	}

	if(limit !=''){
		limitStr='LIMIT '+start+', '+limit+'';
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND users.name LIKE  "%' + keyword + '%"';
		}

		if (role_id != '') {
			Keyconditoin += ' AND users.role_id ="' + role_id + '"';
		}

		if (learning != '') {
			Keyconditoin += ' AND users.learning ="' + learning + '"';
		}
		if (school_code != '') {
			Keyconditoin += ' AND users.school_code ="' + school_code + '"';
		}
		var countREs=0;
		var i = 0;
		console.log('class_name',class_name);
		async.eachSeries(class_name,function(rec2, loop2){
			var clss = rec2;
			//LEFT JOIN (Select student_id,SUM(total_points) from student_course_summary_points) ON school_user_list.student_id=student_course_summary_points.student_id
			//(SELECT SUM(total_points) from student_course_summary_points where student_course_summary_points.student_id =users.id ) as total_points 
			//var countquery = 'SELECT COUNT(users.id) as count from users LEFT JOIN student_lesson_count slc on users.id=slc.student_id  LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE users.class_name ="'+clss+'"  ' + Keyconditoin + ' ORDER BY users.id DESC';
			var countquery = 'SELECT COUNT(users.id) as count from users  WHERE users.status !="2"  ' + Keyconditoin + ' ORDER BY users.id DESC';
			console.log('countquery',countquery);
			connection.query(countquery, function (errC, responsecount) {
				if (errC) {
					resultJson = '{"replyCode":"error","replyMsg":"' + errC.message + '","cmd":"user_list"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				} else {
					//(SELECT SUM(total_points) from student_course_summary_points where student_course_summary_points.student_id =users.id ) as total_points
					countREs=countREs+responsecount[0].count;
					//var Catquery='Select users.*,"0" as total_points,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title,slc.lesson_count,slc.completed_lessons,(Select SUM(lesson_count) total_lessons from (Select scs.course_id,clc.lesson_count from student_course_subscription scs LEFT JOIN course_lesson_count clc on scs.course_id =clc.course_id where student_id=users.id) main_data) total_lessons from users LEFT JOIN student_lesson_count slc on users.id=slc.student_id  LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE users.class_name ="'+clss+'"  ' + Keyconditoin + ' ORDER BY users.id DESC LIMIT ' + start + ', ' + limit + '';
					
					//var Catquery='Select users.*,(SELECT leaderboard.total_points from leaderboard where leaderboard.id=users.id) as total_points,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title,"0" as lesson_count,"0" as completed_lessons,"0" as total_lessons from users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE users.class_name ="'+clss+'"  ' + Keyconditoin + ' ORDER BY users.id DESC ';
					
					var Catquery='Select users.*,age_group.title from users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE users.class_name ="'+clss+'"  ' + Keyconditoin + ' ORDER BY users.id DESC '+limitStr+' ';

					console.log('Catquery',Catquery);
					connection.query(Catquery, function(errSelpiMG,respROiMG){
						if(errSelpiMG){
							console.log('errSelpiMG',errSelpiMG);
							loop2();
						}else{
							console.log('respROiMG',respROiMG)
							resPro=resPro.concat(respROiMG);
							loop2();
						}
						i=i+1;
					});
				}
			})
		},function(errSelPro){
			if(errSelPro){
				console.log('errSelPro',errSelPro);
				resultJson = '{"replyCode":"error","replyMsg":"'+errSelPro.message+'","cmd":"school_user_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}else{
				console.log('resPro',resPro);
				var ids = resPro.map(o => o.id)
				filtered = resPro.filter(({id}, index) => !ids.includes(id, index + 1));
				
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully ","data":'+JSON.stringify(filtered)+',"totalCount":'+countREs+',"cmd":"school_user_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
				
			}
		});
		
	});
}


/* reviews list */
function reviews_list(userdata, pool, callback) {
	var resultJson = '';

	var Keyconditoin = ' reviews.status !="2"';
	var teacher_id = '';
	var student_id = '';
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	pool.getConnection(function (err, connection) {
		if (teacher_id != '') {
			Keyconditoin += ' AND reviews.teacher_id = "' + teacher_id + '"';
		}
		
		if (student_id != '') {
			Keyconditoin += ' AND reviews.student_id = "' + student_id + '"';
		}

		detailsquery = 'SELECT reviews.*,users.name as student_name,users.image as student_image,teacher.name as teacher_name,teacher.image as teacher_image from reviews LEFT JOIN users as users ON users.id = reviews.student_id LEFT JOIN users as teacher ON teacher.id = reviews.teacher_id where '+Keyconditoin+'';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"grades"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"grades"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

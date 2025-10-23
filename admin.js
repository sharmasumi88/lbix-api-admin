var request = require('request');
var config = require('./config');

var FUNCTIONS = require('./functions.js');

var moment = require('moment');
var multiparty = require('multiparty');
var randomstring = require('random-string');
const { ADMINDB } = require('./config');
var secretSalt = config.secretSalt;

var SITE_TITLE = config.SITE_TITLE;
var nodemailer = require('nodemailer');

//Admin
module.exports.admin_login = admin_login;
module.exports.admin_change_password = admin_change_password;
module.exports.update_admin_profile = update_admin_profile;

module.exports.checkValidateEmailEmpProfile = checkValidateEmailEmpProfile;
module.exports.checkValidateStudent= checkValidateStudent;

module.exports.role_access_list = role_access_list;
module.exports.add_role_access = add_role_access;
module.exports.update_role_access = update_role_access;
module.exports.update_role_access_status = update_role_access_status;
module.exports.role_details = role_details;

module.exports.sub_admin_list = sub_admin_list;
module.exports.add_subadmin = add_subadmin;
module.exports.update_subadmin = update_subadmin;
module.exports.update_subadmin_status = update_subadmin_status;
module.exports.subadmin_details = subadmin_details;

module.exports.banner_list = banner_list;
module.exports.add_banner_image = add_banner_image;
module.exports.banner_details = banner_details;
module.exports.update_banner_status = update_banner_status;

module.exports.coupon_list = coupon_list;
module.exports.add_coupon = add_coupon;
module.exports.update_coupon_status = update_coupon_status;

module.exports.cms_list = cms_list;
module.exports.add_cms = add_cms;
module.exports.update_cms_status = update_cms_status;
module.exports.cms_details = cms_details;

module.exports.certificates_list = certificates_list;
module.exports.add_certificate = add_certificate;
module.exports.certificate_details = certificate_details;
module.exports.update_certificate_status = update_certificate_status;
module.exports.update_user_comment = update_user_comment;
module.exports.user_dropdown_list = user_dropdown_list;

module.exports.faqs_list = faqs_list;
module.exports.add_faqs = add_faqs;
module.exports.faqs_details = faqs_details;
module.exports.update_faqs_status = update_faqs_status;
module.exports.courses_dropdown_list = courses_dropdown_list;
module.exports.robotics_courses_dropdown_list = robotics_courses_dropdown_list;
module.exports.add_courses = add_courses;
module.exports.courses_details = courses_details;
module.exports.update_courses_status = update_courses_status;
module.exports.view_course_info = view_course_info;

module.exports.classes_list = classes_list;
module.exports.classes_dropdown_list = classes_dropdown_list;
module.exports.add_classes = add_classes;
module.exports.classes_details = classes_details;
module.exports.update_classes_status = update_classes_status;

module.exports.age_group_list = age_group_list;
module.exports.age_group_list_dropdown = age_group_list_dropdown;
module.exports.add_age_group = add_age_group;
module.exports.age_group_details = age_group_details;
module.exports.update_age_group_status = update_age_group_status;

module.exports.send_notification = send_notification;
module.exports.notifications_list = notifications_list;
module.exports.notifications_delete = notifications_delete;
module.exports.supports_list = supports_list;

module.exports.quizzes_list = quizzes_list;
module.exports.quizzes_dropdown_list = quizzes_dropdown_list;
module.exports.add_quizzes = add_quizzes;
module.exports.quizzes_details = quizzes_details;
module.exports.update_quizzes_status = update_quizzes_status;

module.exports.quizzes_questions_list = quizzes_questions_list;
module.exports.add_quizzes_questions = add_quizzes_questions;
module.exports.quizzes_questions_details = quizzes_questions_details;
module.exports.update_quizzes_questions_status = update_quizzes_questions_status;

module.exports.projects_list = projects_list;
module.exports.projects_dropdown_list = projects_dropdown_list;
module.exports.add_project = add_project;
module.exports.update_projects_status = update_projects_status;

module.exports.course_chapters_list = course_chapters_list;
module.exports.course_chapters_dropdown_list = course_chapters_dropdown_list;
module.exports.add_course_chapter = add_course_chapter;
module.exports.course_chapter_details = course_chapter_details;
module.exports.update_course_chapters_status = update_course_chapters_status;
module.exports.view_chapter_lessons_info = view_chapter_lessons_info;

module.exports.chapter_lessons_list = chapter_lessons_list;
module.exports.add_chapter_lesson = add_chapter_lesson;
module.exports.chapter_lesson_details = chapter_lesson_details;
module.exports.update_chapter_lessons_status = update_chapter_lessons_status;

module.exports.view_quiz_info_admin = view_quiz_info_admin;

module.exports.admin_demo_class_list = admin_demo_class_list;
module.exports.admin_demo_class_details = admin_demo_class_details;

module.exports.teachers_dropdown_list = teachers_dropdown_list;
module.exports.assign_teacher_demo_class = assign_teacher_demo_class;

module.exports.info_demo_class_settings = info_demo_class_settings;
module.exports.update_demo_class_settings = update_demo_class_settings;

module.exports.age_group_list_dropdown = age_group_list_dropdown;
module.exports.course_subscription_list = course_subscription_list;

module.exports.activities_list = activities_list;
module.exports.add_activities = add_activities;
module.exports.activities_details = activities_details;
module.exports.update_activities_status = update_activities_status;

module.exports.category_list = category_list;
module.exports.category_dropdown_list = category_dropdown_list;
module.exports.add_category = add_category;
module.exports.category_details = category_details;
module.exports.update_category_status = update_category_status;

module.exports.info_points_settings = info_points_settings;
module.exports.update_points_settings = update_points_settings;

module.exports.course_info_list = course_info_list;
module.exports.add_course_info = add_course_info;
module.exports.course_info_details = course_info_details;
module.exports.update_course_info_status = update_course_info_status;

module.exports.course_faq_list = course_faq_list;
module.exports.add_course_faq = add_course_faq;
module.exports.course_faq_details = course_faq_details;
module.exports.update_course_faq_status = update_course_faq_status;

module.exports.student_testimonials_list = student_testimonials_list;
module.exports.add_student_testimonials = add_student_testimonials;
module.exports.student_testimonials_details = student_testimonials_details;
module.exports.update_student_testimonials_status = update_student_testimonials_status;

module.exports.enquiries_list = enquiries_list;


module.exports.course_achievement_list = course_achievement_list;
module.exports.add_course_achievement = add_course_achievement;
module.exports.course_achievement_details = course_achievement_details;
module.exports.update_course_achievement_status = update_course_achievement_status;

module.exports.pix_contents_list = pix_contents_list;
module.exports.add_pix_contents = add_pix_contents;
module.exports.pix_contents_details = pix_contents_details;
module.exports.update_pix_contents_status = update_pix_contents_status;
module.exports.teacher_payout_details = teacher_payout_details;
module.exports.create_adjustment = create_adjustment;
module.exports.update_course_start_date = update_course_start_date;
module.exports.update_subscrption_course = update_subscrption_course;

module.exports.admin_coupon_list = admin_coupon_list;
module.exports.admin_coupon_list_dropdown = admin_coupon_list_dropdown;
module.exports.admin_add_coupon = admin_add_coupon;
module.exports.admin_coupon_details = admin_coupon_details;
module.exports.admin_update_coupon_status = admin_update_coupon_status;

module.exports.admin_coupon_list_users = admin_coupon_list_users;
module.exports.admin_add_coupon_users = admin_add_coupon_users;
module.exports.admin_coupon_details_users = admin_coupon_details_users;
module.exports.admin_update_coupon_status_users = admin_update_coupon_status_users;
module.exports.admin_coupon_list_dropdown_users = admin_coupon_list_dropdown_users;

module.exports.admin_coupon_list_courses = admin_coupon_list_courses;
module.exports.admin_add_coupon_courses = admin_add_coupon_courses;
module.exports.admin_coupon_details_courses = admin_coupon_details_courses;
module.exports.admin_update_coupon_status_courses = admin_update_coupon_status_courses;
module.exports.admin_coupon_list_dropdown_courses = admin_coupon_list_dropdown_courses;

module.exports.admin_coupon_list_age_groups = admin_coupon_list_age_groups;
module.exports.admin_add_coupon_age_groups = admin_add_coupon_age_groups;
module.exports.admin_coupon_details_age_groups = admin_coupon_details_age_groups;
module.exports.admin_update_coupon_status_age_groups = admin_update_coupon_status_age_groups;
module.exports.admin_coupon_list_dropdown_age_groups = admin_coupon_list_dropdown_age_groups;
module.exports.all_age_group_list_dropdown = all_age_group_list_dropdown;

module.exports.duplicate_course = duplicate_course;
module.exports.subscribe_course = subscribe_course;
module.exports.register_user_fun = register_user_fun;
module.exports.update_course_shipping_no = update_course_shipping_no;


module.exports.country_list = country_list;
module.exports.state_list = state_list;
module.exports.city_list = city_list;

module.exports.admin_school_list = admin_school_list;
module.exports.admin_school_list_dropdown = admin_school_list_dropdown;
module.exports.admin_add_school = admin_add_school;
module.exports.admin_update_school_status = admin_update_school_status;

module.exports.admin_school_commission_list = admin_school_commission_list;
module.exports.admin_school_commission_list_dropdown = admin_school_commission_list_dropdown;
module.exports.admin_add_school_commission = admin_add_school_commission;
module.exports.admin_school_commission_details = admin_school_commission_details;
module.exports.admin_update_school_commission_status = admin_update_school_commission_status;


module.exports.add_assessments = add_assessments;
module.exports.assessments_list = assessments_list;
module.exports.assessments_details = assessments_details;
module.exports.update_assessments_status = update_assessments_status;

module.exports.add_assessment_questions = add_assessment_questions;
module.exports.assessment_questions_list = assessment_questions_list;
module.exports.assessment_questions_details = assessment_questions_details;
module.exports.assessments_dropdown_list = assessments_dropdown_list;
module.exports.update_assessment_questions_status = update_assessment_questions_status;

module.exports.add_student_assessments = add_student_assessments;
module.exports.student_assessments_list = student_assessments_list;
module.exports.student_assessments_details = student_assessments_details;
module.exports.update_student_assessments_status = update_student_assessments_status;

module.exports.assessment_marks_list = assessment_marks_list;
module.exports.sections_dropdown_list = sections_dropdown_list;
module.exports.student_assessment_summary_list = student_assessment_summary_list;
module.exports.admin_school_payout_list = admin_school_payout_list;
module.exports.generate_school_payout = generate_school_payout;
module.exports.admin_user_generated_payout_list = admin_user_generated_payout_list;
module.exports.admin_user_wallet_list = admin_user_wallet_list;
module.exports.generate_user_payout = generate_user_payout;
module.exports.fetchStudentAssessmentReport = fetchStudentAssessmentReport;
module.exports.fetch_assesment_report_student = fetch_assesment_report_student;
module.exports.student_assesment_list = student_assesment_list;
module.exports.fetchStudentAssessmentReportAll = fetchStudentAssessmentReportAll;
module.exports.update_student_assessments_info = update_student_assessments_info;

module.exports.class_duration_template_list = class_duration_template_list;
module.exports.add_class_duration_template = add_class_duration_template;
module.exports.class_duration_template_details = class_duration_template_details;
module.exports.update_class_duration_template_status = update_class_duration_template_status;

module.exports.student_assesment_cron = student_assesment_cron;

module.exports.admin_youtube_classes_list = admin_youtube_classes_list;
module.exports.add_youtube_classes = add_youtube_classes;
module.exports.youtube_classes_details = youtube_classes_details;
module.exports.update_youtube_classes_status = update_youtube_classes_status;

module.exports.awards_list = awards_list;
module.exports.web_awards_list = web_awards_list;
module.exports.add_awards = add_awards;
module.exports.update_awards_status = update_awards_status;
module.exports.awards_details = awards_details;

module.exports.class_languages_list = class_languages_list;
module.exports.add_class_languages = add_class_languages;
module.exports.class_languages_details = class_languages_details;
module.exports.update_class_languages_status = update_class_languages_status;

module.exports.register_user_fun_android = register_user_fun_android;

module.exports.badges_list = badges_list;
module.exports.add_badges = add_badges;
module.exports.badges_details = badges_details;
module.exports.update_badges_status = update_badges_status;
module.exports.update_student_badges_points = update_student_badges_points;
module.exports.school_enquiry = school_enquiry;
module.exports.school_enquiries_list = school_enquiries_list;
module.exports.update_school_enquiry_status = update_school_enquiry_status;

module.exports.add_courses_validation_code = add_courses_validation_code;
module.exports.courses_validation_code_list = courses_validation_code_list;

module.exports.teacher_grade_list = teacher_grade_list;

module.exports.assign_course_to_batch = assign_course_to_batch;

module.exports.concepts_list = concepts_list;
module.exports.add_concepts = add_concepts;
module.exports.update_concepts_status = update_concepts_status;
module.exports.concepts_details = concepts_details;

module.exports.add_chapter_concepts = add_chapter_concepts;
module.exports.chapter_concept_list = chapter_concept_list;
module.exports.fetch_user_concepts = fetch_user_concepts;

module.exports.add_school_grade = add_school_grade;

module.exports.generate_teacher_slots = generate_teacher_slots;
module.exports.fetchStudentAssessmentReportBix = fetchStudentAssessmentReportBix;

module.exports.teacher_admin_login = teacher_admin_login;
module.exports.super_teacher_admin_list = super_teacher_admin_list;
module.exports.email_templates_list = email_templates_list;
module.exports.add_email_templates = add_email_templates;
module.exports.update_email_templates_status = update_email_templates_status;
module.exports.email_templates_details = email_templates_details;


module.exports.redeem_course_code = redeem_course_code;

module.exports.link_setting_update = link_setting_update;
module.exports.link_setting_details = link_setting_details;

//Left
module.exports.user_list = user_list;
module.exports.courses_list = courses_list;
module.exports.school_grades_list = school_grades_list;

module.exports.admin_school_generated_payout_list = admin_school_generated_payout_list;
module.exports.assign_course_to_student_bulk = assign_course_to_student_bulk;
module.exports.assign_course_to_student = assign_course_to_student;


var ToDate = new Date();
var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
//var tday = weekday[ToDate.getDay()];
var Curdate = ToDate.getFullYear() + '-' + parseInt(ToDate.getMonth() + 1) + '-' + ToDate.getDate();
var CurTime = ToDate.getHours() + ':' + ToDate.getMinutes() + ':' + ToDate.getSeconds();
console.log('-CurTime-');
console.log(Curdate + '-' + CurTime);

var smtpConfig = {
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'hello@learningbix.com', // Your email id
		pass: 'Learningbix@123#$' // Your password 
	}
};

//Users

/*
 * function name :- changePassword
 * Description :- This will come in use when user want to change his password 
 * Created :- 17052017
*/

function admin_change_password(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var sid = '';
	var password = '';
	var current_password = '';

	if (typeof userdata.sid != 'undefined' && userdata.sid != '') {
		sid = userdata.sid;
	}

	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	if (typeof userdata.current_password != 'undefined' && userdata.current_password != '') {
		current_password = userdata.current_password;
	}
	console.log(userdata);
	pool.getConnection(function (err, connection) {
		var uid = hashids.decode(sid);
		var hash_newpassword = sha1(secretSalt + password);

		var hash_oldpassword = sha1(secretSalt + current_password);
		console.log('SELECT password FROM users WHERE id = "' + uid + '"');
		connection.query('SELECT password FROM users WHERE id = "' + uid + '"', function (err, user) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"changePassword"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			} else {
				if (user.length > 0) {
					if (user[0].password == hash_oldpassword) {
						connection.query(
							'UPDATE users SET password = "' + hash_newpassword + '" WHERE id = "' + uid + '"',
							function (errs, done) {
								if (errs) {
									resultJson = '{"replyCode":"error","replyMsg":"' +
										errs.message +
										'","cmd":"changePassword"}\n';
									connection.release();
									callback(400, null, resultJson);
									return;
								} else {
									resultJson =
										'{"replyCode":"success","replyMsg":"Password has been changed successfully","cmd":"changePassword"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}
							}
						);
					} else {
						resultJson =
							'{"replyCode":"error","replyMsg":"Old Password is not correct","cmd":"changePassword"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				} else {
					resultJson =
						'{"replyCode":"error","replyMsg":"Old Password is not correct","cmd":"changePassword"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});
	});
}


//Admin

function admin_login(userdata, pool, callback) {
	var resultJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var ResultArray = '';
	var email = '';

	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	} else {
		resultJson = '{"replyCode":"error","replyMsg":"Please insert registered email","cmd":"login"}\n';
		callback(200, null, resultJson);
		return;
	}

	console.log('userdata', userdata);
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + userdata.password);

		squery = 'SELECT users.* from users WHERE email="' + email + '" AND password="' + hash_password + '" AND status="1" AND role_id="1"';
		console.log('ss', squery);
		connection.query(squery, function (err, results) {
			if (!err) {
				if (results.length > 0) {
					if (results[0].status != 1) {
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						var id = hashids.encode(results[0].id);
						ResultArray = results[0];

						console.log('-------------------');
						resultJson =
							'{"replyCode":"success","replyMsg": "success", "data":' +
							JSON.stringify(ResultArray) +
							',"cmd":"login admin"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
						// var role_access_id = results[0].role_access_id;
						// Rolequery ='SELECT role_access.* from role_access WHERE id="' +role_access_id+ '"';
						// console.log('Rolequery',Rolequery)
						// connection.query(Rolequery, function (errRole, resultsRole) {
						// 	if (!errRole)
						// 	{
						// 		if(resultsRole.length>0){
						// 			ResultArray.role_access = resultsRole[0];
						// 		}else{
						// 			ResultArray.role_access = [];
						// 		}

						// 		console.log('-------------------');
						// 		resultJson = '{"replyCode":"success","replyMsg": "success", "data":'+ JSON.stringify(ResultArray) +',"cmd":"login admin"}\n';
						// 		connection.release();
						// 		callback(200, null, resultJson);
						// 		return;
						// 	}else{
						// 		resultJson = '{"replyCode":"error","replyMsg":"'+errRole.message+'","cmd":"login"}\n';
						// 		connection.release();
						// 		callback(200, null, resultJson);
						// 		return;
						// 	}
						// })
					}
				} else {
					resultJson =
						'{"replyCode":"error","replyMsg":"Please check your login credentials.","cmd":"login"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"login"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function checkValidateEmailEmpProfile(userdata, pool, callback) {
	var resultJson = '';
	var Hashids = require('hashids');

	var email = '';
	var id = '';
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	pool.getConnection(function (err, connection) {
		Query = 'SELECT * FROM users WHERE email="' + email + '" AND email !=" " AND id != "' + id + '" ';
		console.log('s', Query);
		connection.query(Query, function (err, usersEmail) {
			if (err) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"checkValidateEmailEmpProfile"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (usersEmail.length > 0) {
					callback(true);
				} else {
					callback(false);
				}
			}
		});
	});
}



function checkValidateStudent(userdata, pool, callback) {
	var resultJson = '';
	var Hashids = require('hashids');

	var email = '';
	var mobile = '';
	var id = '';
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}

	if (typeof userdata.mobile != 'undefined' && userdata.mobile != '') {
		mobile = userdata.mobile;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	pool.getConnection(function (err, connection) {
		if (email != '') {
			Query = 'SELECT * FROM users WHERE email="' + email + '"';

		} else {
			Query = 'SELECT * FROM users WHERE id="' + id + '"';

		}
		console.log('s', Query);
		connection.query(Query, function (err, usersEmail) {
			if (err) {
				console.log(err.message);
				connection.release();
				callback(false, usersEmail);
			} else {
				if (usersEmail.length > 0) {
					connection.release();
					callback(true, usersEmail);
				} else {
					connection.release();
					callback(false, usersEmail);
				}

			}
		});
	});
}

// certificates

function certificates_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND certificates.title LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT certificates.* from certificates where certificates.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"certificates_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"certificates_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_certificate(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var description = '';
	var image = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE certificates SET title="' +
				title +
				'",description="' +
				description +
				'",image="' +
				image +
				'" where certificates.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO certificates SET title="' +
				title +
				'",description="' +
				description +
				'",image="' +
				image +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Certificate updated successfully","cmd":"Certificate"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Certificate"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*Certificate details*/
function certificate_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM certificates WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"certificates details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"certificates"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_certificate_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE certificates SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"certificates"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"certificates"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* Role access List */
function role_access_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var result = [];
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND role_access.role_title LIKE  "%' + keyword + '%"';
		}
		var Catquery = 'SELECT * FROM role_access WHERE status !="2"  ' + Keyconditoin + ' ORDER BY role_title ASC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"role_access_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Role access list","data":' +
					JSON.stringify(result) +
					', "cmd":"role_access_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_role_access(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var role_title = '';

	if (typeof userdata.role_title != 'undefined' && userdata.role_title != '') {
		role_title = userdata.role_title;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var queryinsert = 'INSERT INTO role_access SET role_title="' + role_title + '",status="1",created= NOW()';

		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Role Access added successfully"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"add_role_access"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function update_role_access(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var role_title = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.role_title != 'undefined' && userdata.role_title != '') {
		role_title = userdata.role_title;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var queryinsert = 'UPDATE role_access SET role_title="' + role_title + '" WHERE id = "' + id + '"';
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Role Access updated successfully","cmd":"update_role_access"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_role_access"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

//update_role_access_status
function update_role_access_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE role_access SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_role_access_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_role_access_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function role_access_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var result = [];
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND role_access.role_title LIKE  "%' + keyword + '%"';
		}
		var Catquery = 'SELECT * FROM role_access WHERE status !="2"  ' + Keyconditoin + ' ORDER BY role_title ASC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"role_access_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Role access list","data":' +
					JSON.stringify(result) +
					', "cmd":"role_access_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* Role details */
function role_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT role_access.* FROM role_access WHERE role_access.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"role_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Role Details","data":' +
					JSON.stringify(ordData[0]) +
					',"cmd":"role_details"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// sub admin Module
// add subadmin
function add_subadmin(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);

	var name = '';
	var email = '';
	var password = '';
	var role_id = '4';
	var role_access_id = '';
	var phone = '';

	var ConQuery = '';

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
	if (typeof userdata.role_access_id != 'undefined' && userdata.role_access_id != '') {
		role_access_id = userdata.role_access_id;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + userdata.password);

		connection.query('SELECT * from users where email = "' + email + '" AND email != ""', function (
			erremail,
			resultsemail
		) {
			if (!erremail) {
				var pagingCount1 = resultsemail.length;
				console.log(userdata);
				console.log(pagingCount1);
				if (pagingCount1 > 0) {
					var user_id = resultsemail[0].id;
					if (resultsemail[0].status == '1') {
						resultJson =
							'{"replyCode":"error","replyMsg":"Email already Registered, please try with different email address","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"error","replyMsg":"Your account not Verified or Deativiated.","cmd":"sign_up"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				} else {
					var queryinsert =
						'INSERT INTO users SET email="' +
						email +
						'",name = "' +
						name +
						'", password = "' +
						hash_password +
						'",phone = "' +
						phone +
						'",role_id="4",role_access_id="' +
						role_access_id +
						'",status="1",verified="1",created= NOW()';

					console.log(queryinsert);
					connection.query(queryinsert, function (errinsert, resultinsert) {
						if (!errinsert) {
							resultJson = '{"replyCode":"success","replyMsg":"Registered successfully"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							resultJson =
								'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"sign_up"}\n';
							console.log('res-suceess');
							connection.release();
							callback(400, null, resultJson);
							return;
						}
					});
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sign_up"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function update_subadmin(userdata, pool, callback) {
	var sha1 = require('sha1');
	var resultJson = '';
	var strJson = '';
	var name = '';
	var email = '';
	var role_id = '4';
	var role_access_id = '';
	var phone = '';
	var password = '';
	var id = '';

	var ConQuery = '';

	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.role_access_id != 'undefined' && userdata.role_access_id != '') {
		role_access_id = userdata.role_access_id;
	}

	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	} else {
		resultJson = '{"replyCode":"error","replyMsg":"Your uid is not Correct","cmd":"update_subadmin"}\n';
		callback(200, null, resultJson);
		return;
	}

	var Uquery = '';

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		checkValidateEmailEmpProfile(userdata, pool, function (responseEmail) {
			console.log(responseEmail);
			if (responseEmail == false) {
				if (password != '') {
					var hash_password = sha1(secretSalt + password);
					Uquery =
						'UPDATE users SET email="' +
						email +
						'",name = "' +
						name +
						'",phone = "' +
						phone +
						'",role_access_id="' +
						role_access_id +
						'",password="' +
						hash_password +
						'" WHERE id = ' +
						id +
						'';
				} else {
					Uquery =
						'UPDATE users SET email="' +
						email +
						'",name = "' +
						name +
						'",phone = "' +
						phone +
						'",role_access_id="' +
						role_access_id +
						'" WHERE id = ' +
						id +
						'';
				}

				connection.query(Uquery, function (errinsert, resultinsert) {
					if (!errinsert) {
						resultJson = '{"replyCode":"success","replyMsg":"Profile Updated Successfully"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Update_profile"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"Email already Taken, please try with different email address ","cmd":"Update_profile"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
			}
		});
	});
}

//update_subadmin_status
function update_subadmin_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE users SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_subadmin_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_subadmin_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* Sub admin List */
function sub_admin_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var result = [];


	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND users.name LIKE  "%' + keyword + '%"';
		}
		var Catquery =
			'SELECT users.*,role_access.role_title FROM users as users LEFT JOIN role_access as role_access ON role_access.id = users.role_access_id WHERE users.status !="2" AND users.role_id="4" ' +
			Keyconditoin +
			' ORDER BY users.name ASC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sub_admin_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Sub admin list","data":' +
					JSON.stringify(result) +
					', "cmd":"sub_admin_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* Sub admin details */
function subadmin_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT users.* FROM users WHERE users.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"subadmin_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Sub admin Details","data":' +
					JSON.stringify(ordData[0]) +
					',"cmd":"subadmin_details"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_banner_image(userdata, pool, callback) {
	var resultJson = '';
	var type = '0'; //0-Home Page,1-Offer page Top,2-offer page Mid,3-Other
	var image = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE banners SET type="' + type + '",image="' + image + '" where banners.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO banners SET type="' + type + '",image="' + image + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Banner updated successfully","cmd":"Banner"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Banner"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/* Banner details */
function banner_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT banners.* FROM banners WHERE banners.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"banners"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Banner Details","data":' +
					JSON.stringify(ordData[0]) +
					',"cmd":"banners"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* banner list */
function banner_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var result = [];
	var is_admin = '1';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.is_admin != 'undefined' && userdata.is_admin != '') {
		is_admin = userdata.is_admin;
	}

	pool.getConnection(function (err, connection) {
		if (is_admin == '0') {
			var Catquery = 'SELECT banners.* FROM banners WHERE banners.status ="1" ORDER BY banners.id DESC';

		} else {
			var Catquery = 'SELECT banners.* FROM banners WHERE banners.status !="2" ORDER BY banners.id DESC';

		}

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sub_admin_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Banner list","data":' +
					JSON.stringify(result) +
					', "cmd":"sub_admin_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//update banner status
function update_banner_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE banners SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_banner_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_banner_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* Coupon list */
function coupon_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND coupons.title LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT coupons.* from coupons where coupons.status !="2"';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_coupon(userdata, pool, callback) {
	var resultJson = '';
	var coupon = '';
	var discount = '';
	var max_count = '';
	var valid_from = '';
	var valid_till = '';
	var min_cart_value = '';
	var max_discount_amount = '';
	var discount_type = ''; //0-per,1-amount
	var description = '';
	var id = '';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.coupon != 'undefined' && userdata.coupon != '') {
		coupon = userdata.coupon;
	}

	if (typeof userdata.discount != 'undefined' && userdata.discount != '') {
		discount = userdata.discount;
	}
	if (typeof userdata.max_count != 'undefined' && userdata.max_count != '') {
		max_count = userdata.max_count;
	}
	if (typeof userdata.valid_till != 'undefined' && userdata.valid_till != '') {
		valid_till = userdata.valid_till;
	}

	if (typeof userdata.valid_from != 'undefined' && userdata.valid_from != '') {
		valid_from = userdata.valid_from;
	}
	if (typeof userdata.min_cart_value != 'undefined' && userdata.min_cart_value != '') {
		min_cart_value = userdata.min_cart_value;
	}
	if (typeof userdata.max_discount_amount != 'undefined' && userdata.max_discount_amount != '') {
		max_discount_amount = userdata.max_discount_amount;
	}
	if (typeof userdata.discount_type != 'undefined' && userdata.discount_type != '') {
		discount_type = userdata.discount_type;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE coupons SET coupon="' +
				coupon +
				'",discount="' +
				discount +
				'" ,max_count="' +
				max_count +
				'",valid_till="' +
				valid_till +
				'",valid_from="' +
				valid_from +
				'",min_cart_value="' +
				min_cart_value +
				'",max_discount_amount="' +
				max_discount_amount +
				'",discount_type="' +
				discount_type +
				'",description="' +
				description +
				'" where coupons.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO coupons SET coupon="' +
				coupon +
				'",discount="' +
				discount +
				'",max_count="' +
				max_count +
				'",valid_till="' +
				valid_till +
				'",valid_from="' +
				valid_from +
				'",min_cart_value="' +
				min_cart_value +
				'",max_discount_amount="' +
				max_discount_amount +
				'",discount_type="' +
				discount_type +
				'",description="' +
				description +
				'",created=NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Coupon updated successfully","cmd":"add_coupon"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"add_coupon"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

//update Coupon status
function update_coupon_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE coupons SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_coupon_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_coupon_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// CMS

function cms_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND cms.title LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT cms.* from cms where cms.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"cms_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"cms_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_cms(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var slug = '';
	var description = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
		slug = userdata.slug.replace(/"/g, "'");
	}
	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE cms SET title="' +
				title +
				'",slug="' +
				slug +
				'",description="' +
				description +
				'" where cms.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO cms SET title="' +
				title +
				'",slug="' +
				slug +
				'",description="' +
				description +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"CMS updated successfully","cmd":"cms"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"cms"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*cms details*/
function cms_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var slug = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
		slug = userdata.slug;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		if (id != '') {
			var Catquery = 'SELECT * FROM cms WHERE id="' + id + '"';
		} else {
			var Catquery = 'SELECT * FROM cms WHERE slug="' + slug + '"';
		}
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"cms details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"cms"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_cms_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE cms SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"cms"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"cms"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function addMinutes(time, minsToAdd) {
	function D(J) { return (J < 10 ? '0' : '') + J; };
	var piece = time.split(':');
	var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

	return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}  //this is work


//user status
function update_user_comment(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var comment = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.comment != 'undefined' && userdata.comment != '') {
		comment = userdata.comment;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE users SET comment = "' + comment + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record comment updated successfully","cmd":"comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"comment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// FAQs

function faqs_list(userdata, pool, callback) {
	var resultJson = '';
	var type = '1'; //type 1-teacher,2-student,3-schoo;
	var keyword = '';
	var isAdmin = '1';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.isAdmin != 'undefined' && userdata.isAdmin != '') {
		isAdmin = userdata.isAdmin;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND faqs.question LIKE  "%' + keyword + '%"';
		}
		if (isAdmin == '0') {
			detailsquery = 'SELECT faqs.* from faqs where faqs.status ="1" AND type="' + type + '" ' + Keyconditoin + '';
		} else {
			detailsquery = 'SELECT faqs.* from faqs where faqs.status !="2" AND type="' + type + '" ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"faqs_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"faqs_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function add_faqs(userdata, pool, callback) {
	var resultJson = '';
	var question = '';
	var answer = '';
	var type = '1'; //1-teacher,2-student
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.question != 'undefined' && userdata.question != '') {
		question = userdata.question;
	}

	if (typeof userdata.answer != 'undefined' && userdata.answer != '') {
		answer = userdata.answer;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE faqs SET question="' +
				question +
				'",type="' +
				type +
				'",answer="' +
				answer +
				'" where faqs.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO faqs SET question="' +
				question +
				'",type="' +
				type +
				'",answer="' +
				answer +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"faqs updated successfully","cmd":"faqs"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"faqs"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*faqs details*/
function faqs_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM faqs WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"faqss details","data":' + JSON.stringify(resultinsert) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"faqss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_faqs_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE faqs SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"faqss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"faqss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//courses

function courses_list(userdata, pool, callback) {
	var resultJson = '';
	var learning = '';
	var keyword = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}


	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND courses.course_name LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin += ' AND courses.learning ="' + learning + '"';
		}

		if (limit != '') {
			detailsquery =
				'SELECT courses.*,rec_courses.course_name as rec_course_name,age_group.title as age_group_title from courses as courses LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id LEFT JOIN courses as rec_courses ON rec_courses.id = courses.recommended_course_id where courses.status !="2" ' +
				Keyconditoin +
				' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery =
				'SELECT courses.*,rec_courses.course_name as rec_course_name,age_group.title as age_group_title from courses as courses LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id LEFT JOIN courses as rec_courses ON rec_courses.id = courses.recommended_course_id where courses.status !="2" ' +
				Keyconditoin +
				'';
		}
		var countquery = 'SELECT count(*) as count from courses WHERE courses.status !="2" ' +
			Keyconditoin +
			'';


		console.log('detailsquery', detailsquery);

		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"courses_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"courses_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"courses_list","data":[], "cmd":"courses_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function courses_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var learning = '0';
	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND courses.course_name LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin = ' AND courses.learning = "' + learning + '"';
		}

		detailsquery = 'SELECT courses.* from courses where courses.status ="1" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"courses_list"}\n';
				//console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_courses(userdata, pool, callback) {
	var resultJson = '';
	var course_name = '';
	var description = '';
	var image = '';
	var course_type = ''; //1-live,2-self learn
	var allow_random_view = '0'; //0-no,1-yes
	var created_by = '';
	var recommended_course_id = '';
	var id = '';
	var age_group_id = '';

	var dummy_rating = '0';
	var sub_title = '';
	var course_hours = '0';
	var lectures = '0';
	var by_teacher_name = '';
	var learn_video = '';
	var video_url = '';

	var amount = '';
	var requirement_description = '';

	var curriculum = '';
	var hands_on_activities = '';
	var tag = '';
	var price_per_classes = '';
	var fake_price = '';
	var discount = '';
	var no_of_classes = '';
	var featured = '0';
	var priority = '0';
	var learning = '0';
	var course_term1 = '';
	var course_term2 = '';
	var course_term3 = '';
	var course_detail = '';

	var product_hsn = '';
	var product_cost = '';
	var product_gst = '';
	var service_hsn = '';
	var service_cost = '';
	var service_gst = '';
	var referrer = '';
	var referee = '';
	var bonus = '';
	var bonus_at = '';
	var value_type = '';
	var terms = '';
	var assessment = '';
	var robotics_type = '';
	var curriculum_doc = '';
	var course_ppt = '';

	if (typeof userdata.terms != 'undefined' && userdata.terms != '') {
		terms = userdata.terms;
	}
	if (typeof userdata.referrer != 'undefined' && userdata.referrer != '') {
		referrer = userdata.referrer;
	}
	if (typeof userdata.referee != 'undefined' && userdata.referee != '') {
		referee = userdata.referee;
	}
	if (typeof userdata.bonus != 'undefined' && userdata.bonus != '') {
		bonus = userdata.bonus;
	}
	if (typeof userdata.bonus_at != 'undefined' && userdata.bonus_at != '') {
		bonus_at = userdata.bonus_at;
	}
	if (typeof userdata.value_type != 'undefined' && userdata.value_type != '') {
		value_type = userdata.value_type;
	}
	if (typeof userdata.dummy_rating != 'undefined' && userdata.dummy_rating != '') {
		dummy_rating = userdata.dummy_rating;
	}
	if (typeof userdata.product_hsn != 'undefined' && userdata.product_hsn != '') {
		product_hsn = userdata.product_hsn;
	}
	if (typeof userdata.product_cost != 'undefined' && userdata.product_cost != '') {
		product_cost = userdata.product_cost;
	}
	if (typeof userdata.product_gst != 'undefined' && userdata.product_gst != '') {
		product_gst = userdata.product_gst;
	}
	if (typeof userdata.service_hsn != 'undefined' && userdata.service_hsn != '') {
		service_hsn = userdata.service_hsn;
	}
	if (typeof userdata.service_cost != 'undefined' && userdata.service_cost != '') {
		service_cost = userdata.service_cost;
	}
	if (typeof userdata.service_gst != 'undefined' && userdata.service_gst != '') {
		service_gst = userdata.service_gst;
	}


	if (typeof userdata.course_term1 != 'undefined' && userdata.course_term1 != '') {
		course_term1 = userdata.course_term1;
	}
	if (typeof userdata.course_term2 != 'undefined' && userdata.course_term2 != '') {
		course_term2 = userdata.course_term2;
	}
	if (typeof userdata.course_term3 != 'undefined' && userdata.course_term3 != '') {
		course_term3 = userdata.course_term3;
	}
	if (typeof userdata.sub_title != 'undefined' && userdata.sub_title != '') {
		sub_title = userdata.sub_title;
	}
	if (typeof userdata.course_hours != 'undefined' && userdata.course_hours != '') {
		course_hours = userdata.course_hours;
	}
	if (typeof userdata.lectures != 'undefined' && userdata.lectures != '') {
		lectures = userdata.lectures;
	}
	if (typeof userdata.by_teacher_name != 'undefined' && userdata.by_teacher_name != '') {
		by_teacher_name = userdata.by_teacher_name;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}

	if (typeof userdata.course_name != 'undefined' && userdata.course_name != '') {
		course_name = userdata.course_name;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}
	if (typeof userdata.course_detail != 'undefined' && userdata.course_detail != '') {
		course_detail = userdata.course_detail.replace(/"/g, "'");
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}
	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.allow_random_view != 'undefined' && userdata.allow_random_view != '') {
		allow_random_view = userdata.allow_random_view;
	}
	if (typeof userdata.recommended_course_id != 'undefined' && userdata.recommended_course_id != '') {
		recommended_course_id = userdata.recommended_course_id;
	}
	if (typeof userdata.learn_video != 'undefined' && userdata.learn_video != '') {
		learn_video = userdata.learn_video;
	}
	if (typeof userdata.video_url != 'undefined' && userdata.video_url != '') {
		video_url = userdata.video_url;
	}

	if (typeof userdata.requirement_description != 'undefined' && userdata.requirement_description != '') {
		requirement_description = userdata.requirement_description;
	}

	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.curriculum != 'undefined' && userdata.curriculum != '') {
		//curriculum = userdata.curriculum;
		curriculum = userdata.curriculum.replace(/"/g, "'");
	}
	if (typeof userdata.hands_on_activities != 'undefined' && userdata.hands_on_activities != '') {
		hands_on_activities = userdata.hands_on_activities;
	}
	if (typeof userdata.tag != 'undefined' && userdata.tag != '') {
		tag = userdata.tag;
	}
	if (typeof userdata.price_per_classes != 'undefined' && userdata.price_per_classes != '') {
		price_per_classes = userdata.price_per_classes;
	}
	if (typeof userdata.fake_price != 'undefined' && userdata.fake_price != '') {
		fake_price = userdata.fake_price;
	}
	if (typeof userdata.discount != 'undefined' && userdata.discount != '') {
		discount = userdata.discount;
	}

	if (typeof userdata.no_of_classes != 'undefined' && userdata.no_of_classes != '') {
		no_of_classes = userdata.no_of_classes;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	if (typeof userdata.priority != 'undefined' && userdata.priority != '') {
		priority = userdata.priority;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.assessment != 'undefined' && userdata.assessment != '') {
		assessment = userdata.assessment;
	}
	if (typeof userdata.robotics_type != 'undefined' && userdata.robotics_type != '') {
		robotics_type = userdata.robotics_type;
	}

	if (typeof userdata.curriculum_doc != 'undefined' && userdata.curriculum_doc != '') {
		curriculum_doc = userdata.curriculum_doc;
	}
	if (typeof userdata.course_ppt != 'undefined' && userdata.course_ppt != '') {
		course_ppt = userdata.course_ppt;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE courses SET course_name="' + course_name + '",description="' + description + '",image="",course_detail="' + course_detail + '",image="' + image + '",course_type="' + course_type + '",allow_random_view="' + allow_random_view + '",created_by="' + created_by + '",recommended_course_id="' + recommended_course_id + '",age_group_id="' + age_group_id + '",dummy_rating="' + dummy_rating + '",sub_title="' + sub_title + '",course_hours="' + course_hours + '",lectures="' + lectures + '",by_teacher_name="' + by_teacher_name + '",learn_video="' + learn_video + '",video_url="' + video_url + '",requirement_description="' + requirement_description + '",amount="' + amount + '",curriculum="' + curriculum + '",hands_on_activities="' + hands_on_activities + '",tag="' + tag + '",price_per_classes="' + price_per_classes + '",fake_price="' + fake_price + '",discount="' + discount + '",no_of_classes="' + no_of_classes + '",featured="' + featured + '",priority="' + priority + '",course_term1="' + course_term1 + '",course_term2="' + course_term2 + '",course_term3="' + course_term3 + '",learning="' + learning + '",product_hsn="' + product_hsn + '",service_hsn="' + service_hsn + '",product_cost="' + product_cost + '",service_cost="' + service_cost + '",product_gst="' + product_gst + '",service_gst="' + service_gst + '",referrer="' + referrer + '",referee="' + referee + '",bonus="' + bonus + '",bonus_at="' + bonus_at + '",value_type="' + value_type + '",terms="' + terms + '",robotics_type="' + robotics_type + '",curriculum_doc="' + curriculum_doc + '",course_ppt="' + course_ppt + '" where courses.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO courses SET course_name="' + course_name + '",description="' + description + '",course_detail="' + course_detail + '",image="' + image + '",course_type="' + course_type + '",allow_random_view="' + allow_random_view + '",created_by="' + created_by + '",recommended_course_id="' + recommended_course_id + '",age_group_id="' + age_group_id + '",dummy_rating="' + dummy_rating + '",sub_title="' + sub_title + '",course_hours="' + course_hours + '",lectures="' + lectures + '",by_teacher_name="' + by_teacher_name + '",learn_video="' + learn_video + '",video_url="' + video_url + '",requirement_description="' + requirement_description + '",amount="' + amount + '",curriculum="' + curriculum + '",hands_on_activities="' + hands_on_activities + '",tag="' + tag + '",price_per_classes="' + price_per_classes + '",fake_price="' + fake_price + '",discount="' + discount + '",no_of_classes="' + no_of_classes + '",featured="' + featured + '",priority="' + priority + '",course_term1="' + course_term1 + '",course_term2="' + course_term2 + '",course_term3="' + course_term3 + '",learning="' + learning + '",product_hsn="' + product_hsn + '",service_hsn="' + service_hsn + '",product_cost="' + product_cost + '",service_cost="' + service_cost + '",product_gst="' + product_gst + '",service_gst="' + service_gst + '",referrer="' + referrer + '",referee="' + referee + '",bonus="' + bonus + '",bonus_at="' + bonus_at + '",value_type="' + value_type + '",terms="' + terms + '",robotics_type="' + robotics_type + '",curriculum_doc="' + curriculum_doc + '",course_ppt="' + course_ppt + '",created= NOW()';
		}
		console.log('queryinsert:::::-----------------', queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			console.log('resultinsert::::', resultinsert);
			if (!errinsert) {
				if (assessment != "") {
					console.log('InsertRes', resultinsert)
					if (id != '') {
						var course_id = id;
					} else {
						var course_id = resultinsert.insertId;
					}
					DeleteQuery = 'DELETE FROM courses_assessment WHERE course_id="' + course_id + '"';
					console.log('DeleteQuery', DeleteQuery);
					connection.query(DeleteQuery);

					async.eachSeries(assessment, function (rec2, loop2) {
						console.log("in user result array");

						console.log('assesment-id', rec2);
						Uquery = 'INSERT INTO courses_assessment SET course_id="' + course_id + '",assessment_id="' + rec2 + '"';

						console.log('Uquery', Uquery)
						connection.query(Uquery, function (errPre, Predetails) {
							if (errPre) {
								console.log('errPre.message', errPre.message)
								loop2();
							} else {
								loop2();
							}
						})

					}, function (errInsert) {
						if (errInsert) {
							resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '", "cmd":"send"}';
							console.log(resultJson);
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {

							resultJson = '{"replyCode":"success","replyMsg":"courses updated successfully", "cmd":"send"}';
							console.log(resultJson);
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					})

				} else {
					resultJson = '{"replyCode":"success","replyMsg":"courses updated successfully","cmd":"courses"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;

				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"courses"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});

	});
}

/*courses details*/
function courses_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM courses WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				var AssQuery = 'SELECT * FROM courses_assessment WHERE course_id="' + id + '"';
				console.log('qq', AssQuery);
				connection.query(AssQuery, function (errAss, resultAss) {
					if (!errAss) {
						resultinsert[0].assessment = resultAss;
						resultJson =
							'{"replyCode":"success","replyMsg":"coursess details","data":' +
							JSON.stringify(resultinsert) +
							'}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coursess"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});

			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coursess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_courses_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}

	//console.log('----------');
	//console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE courses SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"coursess"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coursess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//classes

function classes_list(userdata, pool, callback) {
	var resultJson = '';

	var course_id = '';
	var keyword = '';
	var Keyconditoin = ' classes.status !="2"';
	var learning = '0';
	var start = '0';
	var categoryId = '';
	var limit = '';

	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	if (typeof userdata.categoryId != 'undefined' && userdata.categoryId != '') {
		categoryId = userdata.categoryId;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND (classes.class_number LIKE  "%' + keyword + '%" OR  classes.class_topic LIKE  "%' + keyword + '%")';
		}
		if (categoryId != '') {
			Keyconditoin += ' AND classes.category_id = "' + categoryId + '"';
		}
		if (learning != '') {
			Keyconditoin += ' AND classes.learning = "' + learning + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT classes.* from classes  where  ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT classes.* from classes  where  ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from classes WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"classes_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"classes_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"classes_list","data":[], "cmd":"classes_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function classes_dropdown_list(userdata, pool, callback) {
	var resultJson = '';

	var course_id = '';
	var keyword = '';
	var category_id = '';
	var Keyconditoin = ' classes.status ="1"';
	var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND (classes.class_number LIKE  "%' + keyword + '%" OR  classes.class_topic LIKE  "%' + keyword + '%")';
		}
		if (category_id != '') {
			Keyconditoin += ' AND classes.category_id ="' + category_id + '"';
		}

		if (learning != '') {
			Keyconditoin += ' AND classes.learning = "' + learning + '"';
		}

		detailsquery = 'SELECT classes.* from classes  where  ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"classes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"classes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_classes(userdata, pool, callback) {
	var resultJson = '';
	var class_number = '';
	var class_topic = '';
	var class_description = '';
	var class_requirement = '';
	var class_summary_pdf = '';
	var video = '';
	var image = '';
	var video_url = '';
	var points = '0';
	var teacher_document = '';
	var category_id = '';
	var id = '';
	var learning = '0';
	var type = '0';
	var feedback_id = '';
	var outcomes = '';
	var zoom_link = '';
	var robotics_type = '';
	var class_name = '';

	if (typeof userdata.zoom_link != 'undefined' && userdata.zoom_link != '') {
		zoom_link = userdata.zoom_link;
	}
	if (typeof userdata.robotics_type != 'undefined' && userdata.robotics_type != '') {
		robotics_type = userdata.robotics_type;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.class_number != 'undefined' && userdata.class_number != '') {
		class_number = userdata.class_number;
	}

	if (typeof userdata.class_topic != 'undefined' && userdata.class_topic != '') {
		class_topic = userdata.class_topic;
	}
	if (typeof userdata.feedback_id != 'undefined' && userdata.feedback_id != '') {
		feedback_id = userdata.feedback_id;
	}

	if (typeof userdata.class_description != 'undefined' && userdata.class_description != '') {
		class_description = userdata.class_description.replace(/"/g, "'");
	}
	if (typeof userdata.class_requirement != 'undefined' && userdata.class_requirement != '') {
		class_requirement = userdata.class_requirement.replace(/"/g, "'");
	}

	if (typeof userdata.class_summary_pdf != 'undefined' && userdata.class_summary_pdf != '') {
		class_summary_pdf = userdata.class_summary_pdf;
	}

	if (typeof userdata.points != 'undefined' && userdata.points != '') {
		points = userdata.points;
	}

	if (typeof userdata.teacher_document != 'undefined' && userdata.teacher_document != '') {
		teacher_document = userdata.teacher_document;
	}

	if (typeof userdata.video != 'undefined' && userdata.video != '') {
		video = userdata.video;
	}
	if (typeof userdata.video_url != 'undefined' && userdata.video_url != '') {
		video_url = userdata.video_url;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.outcomes != 'undefined' && userdata.outcomes != '') {
		outcomes = userdata.outcomes;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE classes SET class_number="' + class_number + '",class_description="' + class_description + '",class_requirement="' + class_requirement + '",class_topic="' + class_topic + '",feedback_id="' + feedback_id + '",class_summary_pdf="' + class_summary_pdf + '",points="' + points + '",teacher_document="' + teacher_document + '",video="' + video + '",video_url="' + video_url + '",image="' + image + '",category_id="' + category_id + '",learning="' + learning + '",type="' + type + '",outcomes="' + outcomes + '",class_name="' + class_name + '",zoom_link="' + zoom_link + '",robotics_type="' + robotics_type + '" where classes.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO classes SET class_number="' + class_number + '",class_description="' + class_description + '",class_requirement="' + class_requirement + '",class_topic="' + class_topic + '",feedback_id="' + feedback_id + '",class_summary_pdf="' + class_summary_pdf + '",points="' + points + '",teacher_document="' + teacher_document + '",video="' + video + '",video_url="' + video_url + '",image="' + image + '",category_id="' + category_id + '",learning="' + learning + '",type="' + type + '",outcomes="' + outcomes + '",class_name="' + class_name + '",zoom_link="' + zoom_link + '",robotics_type="' + robotics_type + '",created= NOW()';
		}

		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"classes updated successfully","cmd":"classes"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"classes"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*classes details*/
function classes_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM classes WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"classess details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"classess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/*classes details*/
function view_course_info(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM courses WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resPro) {
			if (!errinsert) {
				if (resPro.length > 0) {
					var i = 0;
					async.eachSeries(
						resPro,
						function (rec2, loop2) {
							var course_id = rec2.id;
							console.log('course_id', course_id);
							proiMGquery = 'SELECT course_chapters.* from course_chapters where course_chapters.course_id="' + course_id + '" AND course_chapters.status="1"';
							console.log('proiMGquery', proiMGquery);
							connection.query(proiMGquery, function (errSelpiMG, respROiMG) {
								if (errSelpiMG) {
									console.log('errSelpiMG', errSelpiMG);

									loop2();
								} else {
									resPro[i].chapters = respROiMG;
									loop2();
								}
								i = i + 1;
							});
						},
						function (errSelPro) {
							if (errSelPro) {
								console.log('errSelPro', errSelPro);
								resultJson =
									'{"replyCode":"error","replyMsg":"' +
									errSelPro.message +
									'","cmd":"view_classes_info"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								resultJson =
									'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
									JSON.stringify(resPro) +
									',"cmd":"view_classes_info"}\n';
								console.log('res-suceess');
								connection.release();
								callback(200, null, resultJson);
								return;
							}
						}
					);
				} else {
					resultJson =
						'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_classes_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_classes_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE classes SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"classess"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"classess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// age group
function age_group_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var learning = '0';
	var priority = '';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.priority != 'undefined' && userdata.priority != '') {
		priority = userdata.priority;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND age_group.title LIKE  "%' + keyword + '%"';
		}
		if (priority != '') {
			Keyconditoin = ' AND age_group.priority = "' + priority + '"';
		}

		if (learning != '') {
			Keyconditoin = ' AND age_group.learning LIKE  "' + learning + '"';
		}
		detailsquery = 'SELECT age_group.* from age_group where age_group.status !="2" ' + Keyconditoin + " ORDER BY age_group.priority ASC";
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"age_group_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"age_group_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// age group dropdown
function age_group_list_dropdown(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND age_group.title LIKE  "%' + keyword + '%"';
		}

		if (learning != '') {
			Keyconditoin = ' AND age_group.learning LIKE  "' + learning + '"';
		}
		detailsquery =
			'SELECT age_group.* from age_group where age_group.status ="1" ' +
			Keyconditoin +
			' ORDER BY age_group.priority ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"age_group_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"age_group_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_age_group(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var title = '';
	var age_from = '';
	var age_to = '';
	var priority = '';
	var id = '';
	var learning = '0';
	var orientation = '';
	var thumbnail1 = '';
	var thumbnail2 = '';
	var thumbnail3 = '';
	var pdf = '';
	var video_1 = '';
	var video_2 = '';

	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.age_from != 'undefined' && userdata.age_from != '') {
		age_from = userdata.age_from;
	}

	if (typeof userdata.age_to != 'undefined' && userdata.age_to != '') {
		age_to = userdata.age_to;
	}

	if (typeof userdata.priority != 'undefined' && userdata.priority != '') {
		priority = userdata.priority;
	}

	if (typeof userdata.orientation != 'undefined' && userdata.orientation != '') {
		orientation = userdata.orientation;
	}

	if (typeof userdata.thumbnail1 != 'undefined' && userdata.thumbnail1 != '') {
		thumbnail1 = userdata.thumbnail1;
	}
	if (typeof userdata.thumbnail2 != 'undefined' && userdata.thumbnail2 != '') {
		thumbnail2 = userdata.thumbnail2;
	}
	if (typeof userdata.thumbnail3 != 'undefined' && userdata.thumbnail3 != '') {
		thumbnail3 = userdata.thumbnail3;
	}
	if (typeof userdata.pdf != 'undefined' && userdata.pdf != '') {
		pdf = userdata.pdf;
	}
	if (typeof userdata.video_1 != 'undefined' && userdata.video_1 != '') {
		video_1 = userdata.video_1;
	}
	if (typeof userdata.video_2 != 'undefined' && userdata.video_2 != '') {
		video_2 = userdata.video_2;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE age_group SET title="' +
				title +
				'",age_from="' +
				age_from +
				'",age_to="' +
				age_to +
				'",priority="' +
				priority +
				'",orientation="' +
				orientation +
				'",learning="' +
				learning +
				'",thumbnail1="' +
				thumbnail1 +
				'",thumbnail2="' +
				thumbnail2 +
				'",thumbnail3="' +
				thumbnail3 +
				'",pdf="' +
				pdf +
				'",video_1="' +
				video_1 +
				'",video_2="' +
				video_2 +
				'" where age_group.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO age_group SET title="' +
				title +
				'",age_from="' +
				age_from +
				'",age_to="' +
				age_to +
				'",priority="' +
				priority +
				'",orientation="' +
				orientation +
				'",learning="' +
				learning +
				'",thumbnail1="' +
				thumbnail1 +
				'",thumbnail2="' +
				thumbnail2 +
				'",thumbnail3="' +
				thumbnail3 +
				'",pdf="' +
				pdf +
				'",video_1="' +
				video_1 +
				'",video_2="' +
				video_2 +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"age_group updated successfully","cmd":"age_group"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"age_group"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*age_group details*/
function age_group_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM age_group WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"age_groups details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"age_groups"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_age_group_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE age_group SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"age_groups"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"age_groups"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//Send Notification
function send_notification(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var message = '';
	var image = '';
	var role_id = '';
	var users = '';

	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}
	if (typeof userdata.message != 'undefined' && userdata.message != '') {
		message = userdata.message;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}

	if (typeof userdata.users != 'undefined' && userdata.users != '') {
		users = userdata.users;
	}

	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}

	console.log('----------');
	console.log('userdata', userdata);

	pool.getConnection(function (err, connection) {
		async.eachSeries(
			users,
			function (rec2, loop2) {
				console.log('in user result array');
				console.log('rec', rec2);
				var uid = rec2;
				var query = 'SELECT users.name,users.id,users.deviceToken from users where users.id="' + uid + '"';

				console.log('q', query);
				connection.query(query, function (err, details) {
					if (err) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sendNotifications"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						console.log('details[0].deviceToken', details[0].deviceToken);
						var deviceToken = details[0].deviceToken;
						if (deviceToken && typeof deviceToken != 'undefined' && deviceToken != '') {
							FUNCTIONS.sendNotificationsClient(
								deviceToken,
								uid,
								title,
								message,
								null,
								image,
								connection
							);
							loop2();
						} else {
							var Query =
								'INSERT INTO user_notifications set user_id="' +
								uid +
								'",title="' +
								title +
								'",notification="' +
								message +
								'",image="' +
								image +
								'",created=now(),modified=now()';
							console.log('Query', Query);
							connection.query(Query, function (err, save) {
								if (err) {
									resultJson =
										'{"replyCode":"error","replyMsg":"' +
										err.message +
										'","cmd":"sendNotifications"}\n';
									loop2();
								} else {
									loop2();
								}
							});
						}
					}
				});
			},
			function (errRec1) {
				if (errRec1) {
					resultJson = '{"replyCode":"error","replyMsg":"' + errRec1.message + '", "cmd":"send"}';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				} else {
					var QueryAdmin =
						'INSERT INTO notifications set role_id="' +
						role_id +
						'",title="' +
						title +
						'",notification="' +
						message +
						'",image="' +
						image +
						'",created=now()';
					console.log('QueryAdmin', QueryAdmin);
					connection.query(QueryAdmin, function (errQa, saveQa) {
						if (errQa) {
							resultJson =
								'{"replyCode":"error","replyMsg":"' + errQa.message + '","cmd":"sendNotifications"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							resultJson = '{"replyCode":"success","replyMsg":"Notifications sent.", "cmd":"send"}';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				}
			}
		);
	});
}

/* notifications List */
function notifications_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	pool.getConnection(function (err, connection) {
		var Catquery =
			'SELECT notifications.* FROM notifications WHERE notifications.status !="2" ORDER BY notifications.id DESC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"notifications_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"sales lead list","data":' +
					JSON.stringify(result) +
					', "cmd":"notifications_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//updaten payment status
function notifications_delete(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = '2';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE notifications SET status = "' + status + '" WHERE id = "' + id + '"';
		console.log('squery', squery);
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"notifications_delete"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"notifications_delete"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/* support List */
function supports_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}

	if (keyword != '') {
		Keyconditoin += 'WHERE supports.poc_name ="' + keyword + '"';
	}

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT supports.* FROM supports  ' + Keyconditoin + ' ORDER BY supports.created DESC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"supports"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"supports lead list","data":' +
					JSON.stringify(result) +
					', "cmd":"supports"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Quiz

function quizzes_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var start = '0';
	var limit = '';
	var learning = '';

	var Keyconditoin = ' quizzes.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND quizzes.quiz_title LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin += ' AND quizzes.learning = "' + learning + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT quizzes.* from quizzes where ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT quizzes.* from quizzes where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from quizzes WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"quizzes_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"quizzes_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"quizzes_list","data":[], "cmd":"quizzes_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function quizzes_dropdown_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var category_id = '';
	var Keyconditoin = ' quizzes.status ="1"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND quizzes.quiz_title LIKE  "%' + keyword + '%"';
		}
		if (category_id != '') {
			Keyconditoin += ' AND quizzes.category_id ="' + category_id + '"';
		}

		detailsquery = 'SELECT quizzes.* from quizzes where ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"quizzes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"quizzes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_quizzes(userdata, pool, callback) {
	var resultJson = '';
	var quiz_title = '';
	var quiz_description = '';
	var created_by = '';
	var learning = '';
	var id = '';
	var category_id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}

	if (typeof userdata.quiz_title != 'undefined' && userdata.quiz_title != '') {
		quiz_title = userdata.quiz_title;
	}

	if (typeof userdata.quiz_description != 'undefined' && userdata.quiz_description != '') {
		quiz_description = userdata.quiz_description.replace(/"/g, "'");
	}

	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE quizzes SET quiz_title="' + quiz_title + '",quiz_description="' + quiz_description + '",category_id="' + category_id + '",learning="' + learning + '",created_by="' + created_by + '" where quizzes.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO quizzes SET quiz_title="' + quiz_title + '",quiz_description="' + quiz_description + '",category_id="' + category_id + '",learning="' + learning + '",created_by="' + created_by + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"quiz updated successfully","cmd":"quizzes"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzes"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*quizzes details*/
function quizzes_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM quizzes WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"quiz details","data":' + JSON.stringify(resultinsert) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_quizzes_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE quizzes SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"quizzess"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzess"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// quiz questions

function quizzes_questions_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = ' quizzes_questions.status !="2"';
	var quizz_id = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	if (typeof userdata.quizz_id != 'undefined' && userdata.quizz_id != '') {
		quizz_id = userdata.quizz_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND quizzes_questions.question_title LIKE  "%' + keyword + '%"';
		}

		if (quizz_id != '') {
			Keyconditoin += ' AND quizzes_questions.quizz_id = "' + quizz_id + '"';
		}

		detailsquery = 'SELECT quizzes_questions.* from quizzes_questions where ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"quizzes_questions_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"quizzes_questions_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_quizzes_questions(userdata, pool, callback) {
	var resultJson = '';
	var quizz_id = '';
	var question_number = '';
	var question_title = '';
	var question_description = '';
	var option1 = '';
	var option2 = '';
	var option3 = '';
	var option4 = '';
	var answer = '';
	var created_by = '';

	var question_image = '';
	var points = '0';
	var answer_description = '';
	var option1_image = '';
	var option2_image = '';
	var option3_image = '';
	var option4_image = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.question_number != 'undefined' && userdata.question_number != '') {
		question_number = userdata.question_number;
	}

	if (typeof userdata.question_title != 'undefined' && userdata.question_title != '') {
		question_title = userdata.question_title.replace(/"/g, "'");
	}

	if (typeof userdata.question_description != 'undefined' && userdata.question_description != '') {
		question_description = userdata.question_description.replace(/"/g, "'");
	}
	if (typeof userdata.quizz_id != 'undefined' && userdata.quizz_id != '') {
		quizz_id = userdata.quizz_id;
	}
	if (typeof userdata.option1 != 'undefined' && userdata.option1 != '') {
		option1 = userdata.option1.replace(/"/g, "'");
	}
	if (typeof userdata.option2 != 'undefined' && userdata.option2 != '') {
		option2 = userdata.option2.replace(/"/g, "'");
	}
	if (typeof userdata.option3 != 'undefined' && userdata.option3 != '') {
		option3 = userdata.option3.replace(/"/g, "'");
	}
	if (typeof userdata.option4 != 'undefined' && userdata.option4 != '') {
		option4 = userdata.option4.replace(/"/g, "'");
	}
	if (typeof userdata.answer != 'undefined' && userdata.answer != '') {
		answer = userdata.answer.replace(/"/g, "'");
	}

	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}

	if (typeof userdata.question_image != 'undefined' && userdata.question_image != '') {
		question_image = userdata.question_image;
	}
	if (typeof userdata.points != 'undefined' && userdata.points != '') {
		points = userdata.points;
	}
	if (typeof userdata.answer_description != 'undefined' && userdata.answer_description != '') {
		answer_description = userdata.answer_description.replace(/"/g, "'");
	}
	if (typeof userdata.option1_image != 'undefined' && userdata.option1_image != '') {
		option1_image = userdata.option1_image;
	}
	if (typeof userdata.option2_image != 'undefined' && userdata.option2_image != '') {
		option2_image = userdata.option2_image;
	}
	if (typeof userdata.option3_image != 'undefined' && userdata.option3_image != '') {
		option3_image = userdata.option3_image;
	}
	if (typeof userdata.option4_image != 'undefined' && userdata.option4_image != '') {
		option4_image = userdata.option4_image;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE quizzes_questions SET question_number="' +
				question_number +
				'",question_title="' +
				question_title +
				'",question_description="' +
				question_description +
				'",option1="' +
				option1 +
				'",option2="' +
				option2 +
				'",option3="' +
				option3 +
				'",option4="' +
				option4 +
				'",answer="' +
				answer +
				'",created_by="' +
				created_by +
				'",quizz_id="' +
				quizz_id +
				'",question_image="' +
				question_image +
				'",points="' +
				points +
				'",answer_description="' +
				answer_description +
				'",option1_image="' +
				option1_image +
				'",option2_image="' +
				option2_image +
				'",option3_image="' +
				option3_image +
				'",option4_image="' +
				option4_image +
				'" where quizzes_questions.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO quizzes_questions SET question_number="' +
				question_number +
				'",question_title="' +
				question_title +
				'",question_description="' +
				question_description +
				'",option1="' +
				option1 +
				'",option2="' +
				option2 +
				'",option3="' +
				option3 +
				'",option4="' +
				option4 +
				'",answer="' +
				answer +
				'",created_by="' +
				created_by +
				'",quizz_id="' +
				quizz_id +
				'",question_image="' +
				question_image +
				'",points="' +
				points +
				'",answer_description="' +
				answer_description +
				'",option1_image="' +
				option1_image +
				'",option2_image="' +
				option2_image +
				'",option3_image="' +
				option3_image +
				'",option4_image="' +
				option4_image +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"quiz updated successfully","cmd":"quizzes_questions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzes_questions"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*quizzes_questions details*/
function quizzes_questions_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM quizzes_questions WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"quiz details","data":' + JSON.stringify(resultinsert) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzes_questionss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_quizzes_questions_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE quizzes_questions SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"quizzes_questionss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"quizzes_questionss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Projects

function projects_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var start = '0';
	var limit = '';

	var Keyconditoin = ' projects.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND projects.project_title LIKE  "%' + keyword + '%"';
		}
		if (limit != '') {
			detailsquery = 'SELECT projects.* from projects where ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT projects.* from projects where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from projects WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"projects_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"projects_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"projects_list","data":[], "cmd":"projects_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function projects_dropdown_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var category_id = '';
	var Keyconditoin = ' projects.status ="1"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND projects.project_title LIKE  "%' + keyword + '%"';
		}

		if (category_id != '') {
			Keyconditoin += ' AND projects.category_id = "' + category_id + '"';
		}

		detailsquery = 'SELECT projects.* from projects where ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"projects_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"projects_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_project(userdata, pool, callback) {
	var resultJson = '';
	var project_title = '';
	var description = '';
	var link_url = '';
	var video = '';
	var earn_points = '0';
	var created_by = '';
	var id = '';
	var category_id = '';
	var image = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.project_title != 'undefined' && userdata.project_title != '') {
		project_title = userdata.project_title;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}
	if (typeof userdata.link_url != 'undefined' && userdata.link_url != '') {
		link_url = userdata.link_url;
	}
	if (typeof userdata.earn_points != 'undefined' && userdata.earn_points != '') {
		earn_points = userdata.earn_points;
	}
	if (typeof userdata.video != 'undefined' && userdata.video != '') {
		video = userdata.video;
	}

	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE projects SET project_title="' +
				project_title +
				'",description="' +
				description +
				'",link_url="' +
				link_url +
				'",earn_points="' +
				earn_points +
				'",created_by="' +
				created_by +
				'",video="' +
				video +
				'",category_id="' +
				category_id +
				'",image="' +
				image +
				'" where projects.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO projects SET project_title="' +
				project_title +
				'",description="' +
				description +
				'",link_url="' +
				link_url +
				'",earn_points="' +
				earn_points +
				'",created_by="' +
				created_by +
				'",video="' +
				video +
				'",category_id="' +
				category_id +
				'",image="' +
				image +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Project updated successfully","cmd":"projects"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"projects"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_projects_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE projects SET status="' + status + '" WHERE id = ' + id + '';
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

// Chapters

function course_chapters_list(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var keyword = '';
	var start = '0';
	var limit = '';
	var Keyconditoin = ' course_chapters.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND course_chapters.chapter_title LIKE  "%' + keyword + '%"';
		}
		if (course_id != '') {
			Keyconditoin += ' AND course_chapters.course_id="' + course_id + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT course_chapters.* from course_chapters where ' + Keyconditoin + '  LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT course_chapters.* from course_chapters where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from course_chapters WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"course_chapter"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"course_chapter"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_chapter","data":[], "cmd":"course_chapter"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function course_chapters_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var keyword = '';
	var Keyconditoin = ' course_chapters.status ="1"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND course_chapters.chapter_title LIKE  "%' + keyword + '%"';
		}
		if (course_id != '') {
			Keyconditoin += ' AND course_chapters.course_id="' + course_id + '"';
		}

		detailsquery = 'SELECT course_chapters.* from course_chapters where ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"course_chapter"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"course_chapter"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_course_chapter(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var chapter_title = '';
	var chapter_description = '';
	var s_no = '';
	var allow_random = '0';
	var created_by = '';
	var course_type = '2';
	var concept1 = '';
	var concept2 = '';
	var concept3 = '';
	var image = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.chapter_title != 'undefined' && userdata.chapter_title != '') {
		chapter_title = userdata.chapter_title;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.chapter_description != 'undefined' && userdata.chapter_description != '') {
		chapter_description = userdata.chapter_description.replace(/"/g, "'");
	}
	if (typeof userdata.s_no != 'undefined' && userdata.s_no != '') {
		s_no = userdata.s_no;
	}
	if (typeof userdata.allow_random != 'undefined' && userdata.allow_random != '') {
		allow_random = userdata.allow_random;
	}

	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.concept1 != 'undefined' && userdata.concept1 != '') {
		concept1 = userdata.concept1;
	}
	if (typeof userdata.concept2 != 'undefined' && userdata.concept2 != '') {
		concept2 = userdata.concept2;
	}
	if (typeof userdata.concept3 != 'undefined' && userdata.concept3 != '') {
		concept3 = userdata.concept3;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE course_chapters SET course_id="' + course_id + '",chapter_title="' + chapter_title + '",chapter_description="' + chapter_description + '",s_no="' + s_no + '",allow_random="' + allow_random + '",created_by="' + created_by + '",course_type="' + course_type + '",image="' + image + '",concept1="' + concept1 + '",concept2="' + concept2 + '",concept3="' + concept3 + '" where course_chapters.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO course_chapters SET course_id="' + course_id + '",chapter_title="' + chapter_title + '",chapter_description="' + chapter_description + '",s_no="' + s_no + '",allow_random="' + allow_random + '",created_by="' + created_by + '",course_type="' + course_type + '",image="' + image + '",concept1="' + concept1 + '",concept2="' + concept2 + '",concept3="' + concept3 + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Chapter updated successfully","cmd":"course_chapters"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_chapters"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*course_chapters details*/
function course_chapter_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM course_chapters WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Project details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_chapterss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_course_chapters_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE course_chapters SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"course_chapterss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_chapterss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// lessons

function chapter_lessons_list(userdata, pool, callback) {
	var resultJson = '';
	var course_chapter_id = '';
	var keyword = '';
	var start = '0';
	var limit = '';
	var Keyconditoin = ' chapter_lessons.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_chapter_id != 'undefined' && userdata.course_chapter_id != '') {
		course_chapter_id = userdata.course_chapter_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND chapter_lessons.lesson_title LIKE  "%' + keyword + '%"';
		}
		if (course_chapter_id != '') {
			Keyconditoin += ' AND chapter_lessons.course_chapter_id="' + course_chapter_id + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT chapter_lessons.* from chapter_lessons where ' + Keyconditoin + '  LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT chapter_lessons.* from chapter_lessons where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from chapter_lessons WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"course_chapter"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"course_chapter"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_chapter","data":[], "cmd":"course_chapter"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_chapter_lesson(userdata, pool, callback) {
	var resultJson = '';
	var course_chapter_id = '';
	var lesson_title = '';
	var lesson_description = '';
	var type = ''; //1-class,2-project,3-quiz
	var refrence_id = '';
	var category_id = '';
	var created_by = '';
	var s_no = '';

	var start_time = '';
	var end_time = '';
	var day = '';
	var featured = '';
	var requirements = '';

	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.lesson_title != 'undefined' && userdata.lesson_title != '') {
		lesson_title = userdata.lesson_title.replace(/"/g, "'");
	}
	if (typeof userdata.course_chapter_id != 'undefined' && userdata.course_chapter_id != '') {
		course_chapter_id = userdata.course_chapter_id;
	}

	if (typeof userdata.lesson_description != 'undefined' && userdata.lesson_description != '') {
		lesson_description = userdata.lesson_description.replace(/"/g, "'");
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.refrence_id != 'undefined' && userdata.refrence_id != '') {
		refrence_id = userdata.refrence_id;
	}

	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.category_id != 'undefined' && userdata.category_id != '') {
		category_id = userdata.category_id;
	}

	if (typeof userdata.s_no != 'undefined' && userdata.s_no != '') {
		s_no = userdata.s_no;
	}

	if (typeof userdata.start_time != 'undefined' && userdata.start_time != '') {
		start_time = userdata.start_time;
	}

	if (typeof userdata.end_time != 'undefined' && userdata.end_time != '') {
		end_time = userdata.end_time;
	}

	if (typeof userdata.day != 'undefined' && userdata.day != '') {
		day = userdata.day;
	}

	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}

	if (typeof userdata.requirements != 'undefined' && userdata.requirements != '') {
		requirements = userdata.requirements.replace(/"/g, "'");;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE chapter_lessons SET course_chapter_id="' +
				course_chapter_id +
				'",lesson_title="' +
				lesson_title +
				'",lesson_description="' +
				lesson_description +
				'",type="' +
				type +
				'",refrence_id="' +
				refrence_id +
				'",created_by="' +
				created_by +
				'",s_no="' +
				s_no +
				'",category_id="' +
				category_id +
				'",start_time="' +
				start_time +
				'",end_time="' +
				end_time +
				'",day="' +
				day +
				'",featured="' +
				featured +
				'",requirements="' +
				requirements +
				'" where chapter_lessons.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO chapter_lessons SET course_chapter_id="' +
				course_chapter_id +
				'",lesson_title="' +
				lesson_title +
				'",lesson_description="' +
				lesson_description +
				'",type="' +
				type +
				'",refrence_id="' +
				refrence_id +
				'",created_by="' +
				created_by +
				'",s_no="' +
				s_no +
				'",category_id="' +
				category_id +
				'",start_time="' +
				start_time +
				'",end_time="' +
				end_time +
				'",day="' +
				day +
				'",featured="' +
				featured +
				'",requirements="' +
				requirements +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Lesson updated successfully","cmd":"chapter_lessons"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"chapter_lessons"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*chapter_lessons details*/
function chapter_lesson_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT chapter_lessons.*,course_chapters.course_id FROM chapter_lessons  LEFT JOIN course_chapters as course_chapters ON course_chapters.id = chapter_lessons.course_chapter_id WHERE chapter_lessons.id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Project details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"chapter_lessonss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/*course_chapters details*/
function view_chapter_lessons_info(userdata, pool, callback) {
	var resultJson = '';
	var course_chapter_id = '';

	if (typeof userdata.course_chapter_id != 'undefined' && userdata.course_chapter_id != '') {
		course_chapter_id = userdata.course_chapter_id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM course_chapters WHERE id="' + course_chapter_id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resPro) {
			if (!errinsert) {
				if (resPro.length > 0) {
					var Detquery =
						'SELECT * FROM chapter_lessons WHERE course_chapter_id="' +
						course_chapter_id +
						'" AND status="1"';
					console.log('qq', Detquery);
					connection.query(Detquery, function (errinsertDet, resProDet) {
						if (!errinsertDet) {
							resPro.lessons = resProDet;
							var i = 0;
							async.eachSeries(
								resProDet,
								function (rec2, loop2) {
									var refrence_id = rec2.refrence_id;
									var type = rec2.type; //1-class,2-project,3-quiz
									console.log('refrence_id', refrence_id);
									if (type == '3') {
										lessonConQuery =
											'SELECT quizzes.* from quizzes where quizzes.id="' + refrence_id + '"';
									} else if (type == '2') {
										lessonConQuery =
											'SELECT projects.* from projects where projects.id="' + refrence_id + '"';
									} else {
										lessonConQuery =
											'SELECT classes.* from classes where classes.id="' + refrence_id + '"';
									}

									console.log('lessonConQuery', lessonConQuery);
									connection.query(lessonConQuery, function (errContent, resContent) {
										if (errContent) {
											console.log('errSelpiMG', errContent);

											loop2();
										} else {
											resProDet[i].content = resContent;
											loop2();
										}
										i = i + 1;
									});
								},
								function (errSelPro) {
									if (errSelPro) {
										console.log('errSelPro', errSelPro);
										resultJson =
											'{"replyCode":"error","replyMsg":"' +
											errSelPro.message +
											'","cmd":"view_chapter_lessons_info"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										resultJson =
											'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
											JSON.stringify(resPro) +
											',"lessons":' +
											JSON.stringify(resProDet) +
											',"cmd":"view_chapter_lessons_info"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							);
						} else {
							resultJson =
								'{"replyCode":"error","replyMsg":"' +
								errinsertDet.message +
								'","cmd":"view_chapter_lessons_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				} else {
					resultJson =
						'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_chapter_lessons_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_chapter_lessons_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_chapter_lessons_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE chapter_lessons SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"chapter_lessonss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"chapter_lessonss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// quiz info

function view_quiz_info_admin(userdata, pool, callback) {
	var resultJson = '';
	var quiz_id = '';

	if (typeof userdata.quiz_id != 'undefined' && userdata.quiz_id != '') {
		quiz_id = userdata.quiz_id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM quizzes WHERE id="' + quiz_id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resPro) {
			if (!errinsert) {
				if (resPro.length > 0) {
					proiMGquery =
						'SELECT quizzes_questions.id,quizzes_questions.question_title,quizzes_questions.question_description,quizzes_questions.answer,quizzes_questions.option1,quizzes_questions.option2,quizzes_questions.option3,quizzes_questions.option4,quizzes_questions.points,quizzes_questions.question_image,quizzes_questions.option1_image,quizzes_questions.option2_image,quizzes_questions.option3_image,quizzes_questions.option4_image from quizzes_questions where quizzes_questions.quizz_id="' +
						quiz_id +
						'"';
					console.log('proiMGquery', proiMGquery);
					connection.query(proiMGquery, function (errSelpiMG, respROiMG) {
						if (errSelpiMG) {
							resultJson =
								'{"replyCode":"error","replyMsg":"' +
								errSelpiMG.message +
								'","cmd":"view_quiz_info"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							if (respROiMG.length > 0) {
								resPro[0].questions = respROiMG;
							} else {
								resPro[0].questions = [];
							}
							resultJson =
								'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
								JSON.stringify(resPro) +
								',"cmd":"view_quiz_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					});
				} else {
					resultJson =
						'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_quiz_info"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"view_quiz_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_demo_class_list(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var res = '';
	var keyword = '';
	var learning = '';
	var start = '0';
	var limit = '';

	var Keyconditoin = ' demo_class_requests.status != "2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (keyword != '') {
		Keyconditoin += ' AND student_name LIKE  "%' + keyword + '%"';
	}

	if (learning != '') {
		Keyconditoin += ' AND demo_class_requests.learning ="' + learning + '"';
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	console.log('Curdate--', Curdate);
	pool.getConnection(function (err, connection) {

		if (limit != '') {
			Cquery =
				'SELECT demo_class_requests.*,teacher.name as teacher_name,courses.course_name,course_chapters.chapter_title,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name,student.age,student.email,(SELECT age_group.title from age_group WHERE age_group.id=student.age) as age_group,(SELECT demo_class_requests.demo_class_date from demo_class_requests WHERE demo_class_requests.demo_class_date >="' +
				Curdate +
				'"  AND demo_class_requests.status="1" LIMIT 1) as pending , (SELECT COUNT(student_course_subscription.id) FROM student_course_subscription LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id WHERE student_course_subscription.student_id = demo_class_requests.user_id AND courses.learning="' +
				learning +
				'" ORDER BY student_course_subscription.id DESC LIMIT 1) as converted FROM demo_class_requests as demo_class_requests  LEFT JOIN users as student ON student.id = demo_class_requests.user_id LEFT JOIN users as teacher ON teacher.id = demo_class_requests.teacher_id LEFT JOIN courses as courses ON courses.id = demo_class_requests.course_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = demo_class_requests.chapter_id WHERE ' +
				Keyconditoin +
				' ORDER BY demo_class_requests.id DESC LIMIT ' + start + ', ' + limit + '';
		} else {
			Cquery =
				'SELECT demo_class_requests.*,teacher.name as teacher_name,courses.course_name,course_chapters.chapter_title,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name,student.age,student.email,(SELECT age_group.title from age_group WHERE age_group.id=student.age) as age_group,(SELECT demo_class_requests.demo_class_date from demo_class_requests WHERE demo_class_requests.demo_class_date >="' +
				Curdate +
				'"  AND demo_class_requests.status="1" LIMIT 1) as pending , (SELECT COUNT(student_course_subscription.id) FROM student_course_subscription LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id WHERE student_course_subscription.student_id = demo_class_requests.user_id AND courses.learning="' +
				learning +
				'" ORDER BY student_course_subscription.id DESC LIMIT 1) as converted FROM demo_class_requests as demo_class_requests  LEFT JOIN users as student ON student.id = demo_class_requests.user_id LEFT JOIN users as teacher ON teacher.id = demo_class_requests.teacher_id LEFT JOIN courses as courses ON courses.id = demo_class_requests.course_id LEFT JOIN course_chapters as course_chapters ON course_chapters.id = demo_class_requests.chapter_id WHERE ' +
				Keyconditoin +
				' ORDER BY demo_class_requests.id DESC';
		}
		console.log(Cquery);

		var countquery = 'SELECT count(*) as count from demo_class_requests WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(Cquery, function (err, ordData) {
					if (err) {
						resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"admin_demo_class_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						if (ordData.length > 0) {
							res = ordData;
						} else {
							res = [];
						}
						resultJson =
							'{"replyCode":"success","replyMsg":"demo class list","data":' +
							JSON.stringify(res) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"admin_demo_class_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"admin_demo_class_list","data":[], "cmd":"admin_demo_class_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function admin_demo_class_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var res = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('Curdate--', Curdate);
	pool.getConnection(function (err, connection) {
		Cquery =
			'SELECT demo_class_requests.*,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name,(SELECT demo_class_requests.demo_class_date from demo_class_requests WHERE demo_class_requests.demo_class_date >="' +
			Curdate +
			'"  AND demo_class_requests.status="1" LIMIT 1) as pending FROM demo_class_requests as demo_class_requests  LEFT JOIN users as student ON student.id = demo_class_requests.user_id LEFT JOIN users as teacher ON teacher.id = demo_class_requests.teacher_id WHERE demo_class_requests.id = ' +
			id +
			'';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"demo_class_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (ordData.length > 0) {
					res = ordData[0];
				} else {
					res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"Sub admin Details","data":' +
					JSON.stringify(res) +
					',"cmd":"demo_class_details"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//teachers drop down list

function teachers_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = ' users.status ="1" AND users.verified ="1" AND role_id="3" ';
	var result = [];

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND users.name LIKE  "%' + keyword + '%"';
		}

		var Catquery = 'SELECT users.* FROM users  WHERE  ' + Keyconditoin + ' ORDER BY users.name ASC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"teachers_dropdown_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"teachers list","data":' +
					JSON.stringify(result) +
					', "cmd":"teachers_dropdown_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Assign teacher to demo class

function assign_teacher_demo_class(userdata, pool, callback) {
	var resultJson = '';
	var demo_class_id = '';
	var teacher_id = '';
	var course_id = '';
	var chapter_id = '';
	var demo_class_date = '';
	var time_from = '';
	var time_to = '';
	var student_id = '13';
	var Uquery = '';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}

	if (typeof userdata.demo_class_id != 'undefined' && userdata.demo_class_id != '') {
		demo_class_id = userdata.demo_class_id;
	}

	if (typeof userdata.demo_class_date != 'undefined' && userdata.demo_class_date != '') {
		demo_class_date = userdata.demo_class_date;
	}

	if (typeof userdata.time_from != 'undefined' && userdata.time_from != '') {
		time_from = userdata.time_from;
	}

	if (typeof userdata.time_to != 'undefined' && userdata.time_to != '') {
		time_to = userdata.time_to;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Cquery =
			'SELECT user_time_schedule.* FROM user_time_schedule WHERE user_time_schedule.teacher_id = "' +
			teacher_id +
			'" AND schedule_date="' +
			demo_class_date +
			'"';
		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"assign_teacher_demo_class"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (ordData.length > 0) {
					var schedule_day_id = ordData[0].id;
					if (ordData[0].holiday == '1') {
						resultJson =
							'{"replyCode":"error","replyMsg":"Given date is a Holiday, Please reschedule","cmd":"assign_teacher_demo_class"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else if (ordData[0].available == '0') {
						resultJson =
							'{"replyCode":"error","replyMsg":"Selected Teacher is not available on given date , Please reschedule or change teacher","cmd":"assign_teacher_demo_class"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						Timeslotquery =
							'SELECT user_time_schedule_slots.* FROM user_time_schedule_slots WHERE user_time_schedule_slots.teacher_id = "' +
							teacher_id +
							'" AND schedule_id="' +
							schedule_day_id +
							'" AND (time_from <="' +
							time_from +
							'" AND time_to >="' +
							time_to +
							'")';
						console.log(Timeslotquery);
						connection.query(Timeslotquery, function (errtimeSlot, timeSlotData) {
							if (errtimeSlot) {
								resultJson =
									'{"replyCode":"error","replyMsg":"' +
									errtimeSlot.message +
									'","cmd":"assign_teacher_demo_class"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								if (timeSlotData.length > 0) {
									var time_slot_id = timeSlotData[0].id;
									if (timeSlotData[0].holiday == '1') {
										resultJson =
											'{"replyCode":"error","replyMsg":"Given slot is a Holiday, Please reschedule","cmd":"assign_teacher_demo_class"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else if (timeSlotData[0].available == '0') {
										resultJson =
											'{"replyCode":"error","replyMsg":"Selected Teacher is not available on given slot , Please reschedule or change teacher","cmd":"assign_teacher_demo_class"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										console.log('timeSlotData', timeSlotData);
										Uquery =
											'UPDATE demo_class_requests SET teacher_id="' +
											teacher_id +
											'",assigned="1",chapter_id="' +
											chapter_id +
											'",course_id="' +
											course_id +
											'" WHERE id = ' +
											demo_class_id +
											'';
										console.log(Uquery);
										connection.query(Uquery, function (errinsert) {
											if (!errinsert) {
												console.log(
													'UPDATE user_time_schedule_slots SET available="0",type="2",class_id="' +
													demo_class_id +
													'" WHERE id = ' +
													time_slot_id +
													''
												);
												connection.query(
													'UPDATE user_time_schedule_slots SET available="0",type="2",class_id="' +
													demo_class_id +
													'" WHERE id = ' +
													time_slot_id +
													''
												);

												console.log(
													'INSERT INTO student_booked_classes SET student_id="' +
													student_id +
													'",teacher_id="' +
													teacher_id +
													'",slot_id="' +
													time_slot_id +
													'",schedule_slot_date="' +
													demo_class_date +
													'",chapter_id="' +
													chapter_id +
													'",status="1",created=NOW()'
												);
												connection.query(
													'INSERT INTO student_booked_classes SET student_id="' +
													student_id +
													'",teacher_id="' +
													teacher_id +
													'",slot_id="' +
													time_slot_id +
													'",schedule_slot_date="' +
													demo_class_date +
													'",chapter_id="' +
													chapter_id +
													'",status="1",created=NOW()',
													function (errBC, BCData) {
														if (errBC) {
															resultJson =
																'{"replyCode":"error","replyMsg":"' +
																errBC.message +
																'","cmd":"assign_teacher_demo_class"}\n';
															connection.release();
															callback(200, null, resultJson);
															return;
														} else {
															var booked_class_id = BCData.insertId;
															connection.query(
																'UPDATE demo_class_requests SET booked_class_id="' +
																booked_class_id +
																'" WHERE id = ' +
																demo_class_id +
																''
															);

															resultJson =
																'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"assign_teacher_demo_class"}';
															connection.release();
															callback(200, null, resultJson);
															return;
														}
													}
												);
											} else {
												resultJson =
													'{"replyCode":"error","replyMsg":"' +
													errinsert.message +
													'","cmd":"assign_teacher_demo_class"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;
											}
										});
									}
								} else {
									resultJson =
										'{"replyCode":"error","replyMsg":"Teacher has  not scheduled his slots yet","cmd":"assign_teacher_demo_class"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								}
							}
						});
					}
				} else {
					resultJson =
						'{"replyCode":"error","replyMsg":"Teacher dates not available","cmd":"assign_teacher_demo_class"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});
	});
}

// demo class settings

function info_demo_class_settings(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var res = '';
	var id = '1'; //1-demo class,2-techer class

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('Curdate--', Curdate);
	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT demo_class_settings.* FROM demo_class_settings WHERE demo_class_settings.id = "' + id + '"';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"demo_class_settings"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (ordData.length > 0) {
					res = ordData[0];
				} else {
					res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"demo_class_settings","data":' +
					JSON.stringify(res) +
					',"cmd":"demo_class_settings"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}
//update demo class shedule

function update_demo_class_settings(userdata, pool, callback) {
	var resultJson = '';
	var id = '1'; //1-demo class,2-techer class

	var time_from = '00:00:00';
	var time_to = '00:00:00';
	var monday = '1';
	var tuesday = '1';
	var wednesday = '1';
	var thursday = '1';
	var friday = '1';
	var saturday = '1';
	var sunday = '1';
	var class_duration = '30';
	var slots_per_week = '1';
	var demo_class_payout = '0.00';
	var paid_class_payout = '0.00';
	var class_penelaty = '0.00';
	var minimum_amount = '0.00';
	var min_slots_per_month = '1';
	var conversion_amount = '0.00';
	var project_feedback = '0.00';
	var teacher_feedback = '0.00';
	var shipping_days = '0';
	var teacher_demo_url = '';

	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.time_from != 'undefined' && userdata.time_from != '') {
		time_from = userdata.time_from;
	}
	if (typeof userdata.time_to != 'undefined' && userdata.time_to != '') {
		time_to = userdata.time_to;
	}
	if (typeof userdata.monday != 'undefined' && userdata.monday != '') {
		monday = userdata.monday;
	}

	if (typeof userdata.tuesday != 'undefined' && userdata.tuesday != '') {
		tuesday = userdata.tuesday;
	}

	if (typeof userdata.wednesday != 'undefined' && userdata.wednesday != '') {
		wednesday = userdata.wednesday;
	}

	if (typeof userdata.thursday != 'undefined' && userdata.thursday != '') {
		thursday = userdata.thursday;
	}

	if (typeof userdata.friday != 'undefined' && userdata.friday != '') {
		friday = userdata.friday;
	}

	if (typeof userdata.saturday != 'undefined' && userdata.saturday != '') {
		saturday = userdata.saturday;
	}
	if (typeof userdata.sunday != 'undefined' && userdata.sunday != '') {
		sunday = userdata.sunday;
	}
	if (typeof userdata.class_duration != 'undefined' && userdata.class_duration != '') {
		class_duration = userdata.class_duration;
	}
	if (typeof userdata.slots_per_week != 'undefined' && userdata.slots_per_week != '') {
		slots_per_week = userdata.slots_per_week;
	}
	if (typeof userdata.demo_class_payout != 'undefined' && userdata.demo_class_payout != '') {
		demo_class_payout = userdata.demo_class_payout;
	}
	if (typeof userdata.paid_class_payout != 'undefined' && userdata.paid_class_payout != '') {
		paid_class_payout = userdata.paid_class_payout;
	}
	if (typeof userdata.class_penelaty != 'undefined' && userdata.class_penelaty != '') {
		class_penelaty = userdata.class_penelaty;
	}
	if (typeof userdata.minimum_amount != 'undefined' && userdata.minimum_amount != '') {
		minimum_amount = userdata.minimum_amount;
	}
	if (typeof userdata.min_slots_per_month != 'undefined' && userdata.min_slots_per_month != '') {
		min_slots_per_month = userdata.min_slots_per_month;
	}
	if (typeof userdata.conversion_amount != 'undefined' && userdata.conversion_amount != '') {
		conversion_amount = userdata.conversion_amount;
	}
	if (typeof userdata.project_feedback != 'undefined' && userdata.project_feedback != '') {
		project_feedback = userdata.project_feedback;
	}
	if (typeof userdata.teacher_feedback != 'undefined' && userdata.teacher_feedback != '') {
		teacher_feedback = userdata.teacher_feedback;
	}
	if (typeof userdata.shipping_days != 'undefined' && userdata.shipping_days != '') {
		shipping_days = userdata.shipping_days;
	}
	if (typeof userdata.teacher_demo_url != 'undefined' && userdata.teacher_demo_url != '') {
		teacher_demo_url = userdata.teacher_demo_url;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery =
			'UPDATE demo_class_settings SET time_from="' +
			time_from +
			'",time_to="' +
			time_to +
			'",monday="' +
			monday +
			'",tuesday="' +
			tuesday +
			'",wednesday="' +
			wednesday +
			'",thursday="' +
			thursday +
			'",friday="' +
			friday +
			'",saturday="' +
			saturday +
			'",sunday="' +
			sunday +
			'",class_duration="' +
			class_duration +
			'",slots_per_week="' +
			slots_per_week +
			'",demo_class_payout="' +
			demo_class_payout +
			'",paid_class_payout="' +
			paid_class_payout +
			'",class_penelaty="' +
			class_penelaty +
			'",minimum_amount="' +
			minimum_amount +
			'",min_slots_per_month="' +
			min_slots_per_month +
			'",conversion_amount="' +
			conversion_amount +
			'",project_feedback="' +
			project_feedback +
			'",teacher_feedback="' +
			teacher_feedback +
			'",shipping_days="' +
			shipping_days +
			'",teacher_demo_url="' +
			teacher_demo_url +
			'" WHERE id = ' +
			id +
			'';
		console.log('Uquery', Uquery),
			connection.query(Uquery, function (errinsert) {
				if (!errinsert) {
					resultJson =
						'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"demo_class_settings"}';
					connection.release();
					callback(200, null, resultJson);
					return;
				} else {
					resultJson =
						'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"demo_class_settings"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			});
	});
}

function update_admin_profile(userdata, pool, callback) {
	var sha1 = require('sha1');
	var resultJson = '';
	var strJson = '';
	var name = '';
	var email = '';
	var phone = '';
	var id = '';

	var ConQuery = '';

	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	} else {
		resultJson = '{"replyCode":"error","replyMsg":"Your uid is not Correct","cmd":"update_subadmin"}\n';
		callback(200, null, resultJson);
		return;
	}

	var Uquery = '';

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery =
			'UPDATE users SET email="' +
			email +
			'",name = "' +
			name +
			'",phone = "' +
			phone +
			'" WHERE id = ' +
			id +
			'';

		connection.query(Uquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Profile Updated Successfully"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Update_profile"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// student drop down list
function user_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var role_id = '3';
	var learning = '0';
	var Keyconditoin = ' users.status ="1" AND (school_code ="" OR school_code IS NULL) AND users.name !=""';
	var result = [];

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
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

		if (learning == '0' && role_id == '2') {
			//Keyconditoin += ' AND (SELECT COUNT(id) from demo_class_requests WHERE demo_class_requests.user_id=users.id AND demo_class_requests.assigned !="2") <= 0 ';
			var Catquery = 'SELECT users.*,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id WHERE  ' + Keyconditoin + ' ORDER BY users.name ASC';
		} else {
			var Catquery = 'SELECT users.* ,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE  ' + Keyconditoin + ' ORDER BY users.name ASC';
		}

		console.log('11', Catquery);
		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"user_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"users list","data":' +
					JSON.stringify(result) +
					', "cmd":"user_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// subscribe_course

function subscribe_course(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var student_id = '';
	var teacher_id = '';
	var price = '0';
	var created_by = '1';
	var start_date = '';
	var transaction_id = '0';
	var school_code = '';
	var id = '';
	var ToDate = new Date();
	//var tday = weekday[ToDate.getDay()];
	var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}

	if (typeof userdata.start_date != 'undefined' && userdata.start_date != '') {
		start_date = userdata.start_date;
	}else{
		
		start_date =Curdate;
	}
	if (typeof userdata.transaction_id != 'undefined' && userdata.transaction_id != '') {
		transaction_id = userdata.transaction_id;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}

	console.log('userdata-subscribe', userdata);
	console.log('userdata-subscribe----123');
	pool.getConnection(function (err, connection) {
		var querySelect = 'SELECT student_course_subscription.* from student_course_subscription WHERE course_id="' + course_id + '" AND student_id="' + student_id + '" AND status="1"';
		console.log('querySelect--1', querySelect);
		connection.query(querySelect, function (errSel, resSel) {
			console.log('querySelect--1::::resSel', resSel);
			if (errSel) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
				connection.release();
				callback(false, resultJson);
				return;
			} else {
				if (resSel.length > 0) {
					resultJson = '{"replyCode":"error","replyMsg":"Already subscribed","cmd":"subscribe_course"}\n';
					connection.release();
					callback(false, resultJson);
					return;
				} else {
					var queryinsert = 'INSERT INTO student_course_subscription SET course_id="' + course_id + '",student_id="' + student_id + '",teacher_id="' + teacher_id + '",price="' + price + '",created_by="' + created_by + '",course_start_date="' + start_date + '",transaction_id="' + transaction_id + '",created="' + Curdate + '"';
					console.log('queryinsert--1', queryinsert);
					connection.query(queryinsert, function (err, resultIns) {
						if (err) {
							resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"subscribe_course"}\n';
							connection.release();
							callback(false, resultJson);
							return;
						} else {
							console.log('resultIns', resultIns);
							connection.release();
							callback(true, resultIns);
						}
					});
				}

			}
		})

	});
}

// Course subscription list

function course_subscription_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var learning = '0';
	var Keyconditoin = ' student_course_subscription.status !="2" ';
	var result = [];
	var start = '0';
	var limit = '';



	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND (teacher.name LIKE  "%' + keyword + '%" OR student.name LIKE  "%' + keyword + '%")';
		}
		if (learning != '') {
			Keyconditoin += ' AND courses.learning ="' + learning + '"';
		}
		if (limit != '') {
			var Catquery =
				'SELECT student_course_subscription.*,age_group.title as age_group_title,courses.learning,courses.course_name,teacher.name as teacher_name,courses.age_group_id ,teacher.id as teacher_id,student.name as student_name,student.email as student_email,student.phone as student_phone,student.RelatedProspectId as RelatedProspectId,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name FROM student_course_subscription as student_course_subscription LEFT JOIN users as student ON student.id = student_course_subscription.student_id LEFT JOIN users as teacher ON teacher.id = student_course_subscription.teacher_id  LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id WHERE  ' + Keyconditoin + ' ORDER BY student_course_subscription.student_id ASC,student_course_subscription.id ASC LIMIT ' + start + ', ' + limit + '';
		} else {
			var Catquery =
				'SELECT student_course_subscription.*,courses.learning,courses.course_name,teacher.name as teacher_name,teacher.id as teacher_id,student.name as student_name,student.email as student_email,student.phone as student_phone,student.RelatedProspectId as RelatedProspectId,student.id as student_id,student.phone as student_phone,student.parents_name,student.parents_name as school_name FROM student_course_subscription as student_course_subscription LEFT JOIN users as student ON student.id = student_course_subscription.student_id LEFT JOIN users as teacher ON teacher.id = student_course_subscription.teacher_id LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id WHERE  ' + Keyconditoin +
				' ORDER BY student_course_subscription.student_id ASC,student_course_subscription.id ASC ';
		}

		var countquery = 'SELECT count(student_course_subscription.id) as count FROM student_course_subscription as student_course_subscription LEFT JOIN users as student ON student.id = student_course_subscription.student_id LEFT JOIN users as teacher ON teacher.id = student_course_subscription.teacher_id  LEFT JOIN courses as courses ON courses.id = student_course_subscription.course_id LEFT JOIN age_group as age_group ON age_group.id = courses.age_group_id WHERE  ' + Keyconditoin + '';
		console.log('countquery', countquery);
		connection.query(countquery, function (err, responsecount) {
			if (responsecount.length > 0) {
				console.log('Catquery::::::::', Catquery);
				connection.query(Catquery, function (err, result) {
					if (err) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"course_subscription_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"subscription list","data":' +
							JSON.stringify(result) +
							',"totalCount":' + responsecount[0].count + ', "cmd":"course_subscription_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_subscription_list","data":[], "cmd":"course_subscription_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});

	});
}

// activities

function activities_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var type = '';
	var course_chapter_id = '';
	var start = '0';
	var limit = '';

	var Keyconditoin = ' activities.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.course_chapter_id != 'undefined' && userdata.course_chapter_id != '') {
		course_chapter_id = userdata.course_chapter_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND activities.activity_title LIKE  "%' + keyword + '%"';
		}
		if (type != '') {
			Keyconditoin += ' AND activities.type ="' + type + '"';
		}

		if (course_chapter_id != '') {
			Keyconditoin += ' AND activities.chapter_id ="' + course_chapter_id + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT activities.* from activities where  ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT activities.* from activities where  ' + Keyconditoin + '';
		}
		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from activities WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"activities_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"activities_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"activities_list","data":[], "cmd":"activities_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});



	});
}

function add_activities(userdata, pool, callback) {
	var resultJson = '';
	var activity_title = '';
	var activity_description = '';
	var chapter_id = '';
	var type = '1'; //'1'-student,2-teacher,3-parent,4-project
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.activity_title != 'undefined' && userdata.activity_title != '') {
		activity_title = userdata.activity_title;
	}

	if (typeof userdata.activity_description != 'undefined' && userdata.activity_description != '') {
		activity_description = userdata.activity_description.replace(/"/g, "'");
	}

	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE activities SET activity_title="' +
				activity_title +
				'",activity_description="' +
				activity_description +
				'",chapter_id="' +
				chapter_id +
				'",type="' +
				type +
				'" where activities.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO activities SET activity_title="' +
				activity_title +
				'",activity_description="' +
				activity_description +
				'",chapter_id="' +
				chapter_id +
				'",type="' +
				type +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"activities updated successfully","cmd":"activities"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"activities"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*activities details*/
function activities_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM activities WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"activities details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"activities"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_activities_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE activities SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"activities"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"activities"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//category

/* Category List */
function category_list(userdata, pool, callback) {
	var resultJson = '';
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var keyword = '';
	var Keyconditoin = '';
	var learning = '0';
	var start = '0';
	var limit = '';


	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (learning != '') {
		Keyconditoin = ' AND categories.learning = "' + learning + '"';
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND categories.name LIKE  "%' + keyword + '%"';
		}
		if (limit != '') {
			var Catquery =
				'SELECT categories.*  FROM categories WHERE categories.status !="2" ' + Keyconditoin + ' ORDER BY name ASC LIMIT ' + start + ', ' + limit + '';
		} else {
			var Catquery =
				'SELECT categories.*  FROM categories WHERE categories.status !="2" ' + Keyconditoin + ' ORDER BY name ASC';
		}


		console.log('Catquery', Catquery);

		var countquery = 'SELECT count(*) as count from categories WHERE categories.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(Catquery, function (err, res) {
					if (err) {
						resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"category_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Category list", "data":' +
							JSON.stringify(res) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"category_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"category_list","data":[], "cmd":"category_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function category_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var keyword = '';
	var Keyconditoin = '';
	var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (learning != '') {
		Keyconditoin = ' AND categories.learning = "' + learning + '"';
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND categories.name LIKE  "%' + keyword + '%"';
		}
		var Catquery =
			'SELECT categories.*  FROM categories WHERE categories.status ="1" ' + Keyconditoin + ' ORDER BY name ASC';
		console.log('Catquery', Catquery);
		connection.query(Catquery, function (err, res) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"category_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Category list", "data":' +
					JSON.stringify(res) +
					',"cmd":"category_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_category(userdata, pool, callback) {
	var resultJson = '';
	var name = '';
	var id = '';
	var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		alias = name.toLowerCase();
		if (id != '') {
			var queryinsert = 'UPDATE categories SET name="' + name + '",learning="' + learning + '" where categories.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO categories SET name="' + name + '",learning="' + learning + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Category updated successfully","cmd":"Category"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"Category"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_category_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE categories SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"update_status_client"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_status_client"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

/*category details*/
function category_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM categories WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"category details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"category_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// points settings

function info_points_settings(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var res = '';
	var id = '1';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('Curdate--', Curdate);
	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT points_settings.* FROM points_settings WHERE points_settings.id = "' + id + '"';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"points_settings"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (ordData.length > 0) {
					res = ordData[0];
				} else {
					res = [];
				}
				resultJson =
					'{"replyCode":"success","replyMsg":"demo_clpoints_settingsass_settings","data":' +
					JSON.stringify(res) +
					',"cmd":"points_settings"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function update_points_settings(userdata, pool, callback) {
	var resultJson = '';
	var id = '1'; //1-points settin

	var quiz_points = '5';
	var class_points = '10';
	var project_points = '20';

	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.quiz_points != 'undefined' && userdata.quiz_points != '') {
		quiz_points = userdata.quiz_points;
	}
	if (typeof userdata.class_points != 'undefined' && userdata.class_points != '') {
		class_points = userdata.class_points;
	}
	if (typeof userdata.project_points != 'undefined' && userdata.project_points != '') {
		project_points = userdata.project_points;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery =
			'UPDATE points_settings SET quiz_points="' +
			quiz_points +
			'",class_points="' +
			class_points +
			'",project_points="' +
			project_points +
			'" WHERE id = ' +
			id +
			'';
		console.log('Uquery', Uquery);
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Setting chenged Successfully","cmd":"points_settings"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"points_settings"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// course other information

function course_info_list(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var keyword = '';
	var start = '0';
	var limit = '';

	var Keyconditoin = ' course_info.status !="2"';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND course_info.title LIKE  "%' + keyword + '%"';
		}
		if (course_id != '') {
			Keyconditoin += ' AND course_info.course_id="' + course_id + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT course_info.* from course_info where ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT course_info.* from course_info where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from course_info WHERE ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"course_info"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"course_info"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_info","data":[], "cmd":"course_info"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_course_info(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var title = '';
	var description = '';
	var image = '';
	var type = '1'; //'1'-learn,'2'-benefits,3-kids learn
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE course_info SET course_id="' +
				course_id +
				'",title="' +
				title +
				'",description="' +
				description +
				'",image="' +
				image +
				'",type="' +
				type +
				'" where course_info.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO course_info SET course_id="' +
				course_id +
				'",title="' +
				title +
				'",description="' +
				description +
				'",image="' +
				image +
				'",type="' +
				type +
				'",status="1",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"info updated successfully","cmd":"course_info"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_info"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*course_info details*/
function course_info_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM course_info WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"info details","data":' + JSON.stringify(resultinsert) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_infos"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_course_info_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE course_info SET status="' + status + '" WHERE id = ' + id + '';
		console.log('Uquery', Uquery);
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"course_infos"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_infos"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// course faq

function course_faq_list(userdata, pool, callback) {
	var resultJson = '';
	var keyword = '';
	var course_id = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';


	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND course_faq.question LIKE  "%' + keyword + '%"';
		}
		if (limit != '') {
			detailsquery =
				'SELECT course_faq.* from course_faq where course_faq.status !="2" AND course_faq.course_id="' +
				course_id +
				'" ' +
				Keyconditoin +
				' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery =
				'SELECT course_faq.* from course_faq where course_faq.status !="2" AND course_faq.course_id="' +
				course_id +
				'" ' +
				Keyconditoin +
				'';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from course_faq WHERE course_faq.status !="2" AND course_faq.course_id="' +
			course_id +
			'" ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"course_faq_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"course_faq_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_faq_list","data":[], "cmd":"course_faq_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_course_faq(userdata, pool, callback) {
	var resultJson = '';
	var question = '';
	var answer = '';
	var type = '1'; //1-teacher,2-student
	var course_id = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.question != 'undefined' && userdata.question != '') {
		question = userdata.question;
	}

	if (typeof userdata.answer != 'undefined' && userdata.answer != '') {
		answer = userdata.answer;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE course_faq SET question="' +
				question +
				'",type="' +
				type +
				'",answer="' +
				answer +
				'",course_id="' +
				course_id +
				'" where course_faq.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO course_faq SET question="' +
				question +
				'",type="' +
				type +
				'",answer="' +
				answer +
				'",course_id="' +
				course_id +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"course_faq updated successfully","cmd":"course_faq"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_faq"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*course_faq details*/
function course_faq_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM course_faq WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"course_faqs details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_faqs"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_course_faq_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE course_faq SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"course_faqs"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_faqs"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//student testimonials

function student_testimonials_list(userdata, pool, callback) {
	var resultJson = '';
	var keyword = '';
	var Keyconditoin = ' student_testimonials.status !="2" ';
	var learning = '';
	var start = '0';
	var limit = '';


	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND student_testimonials.student_name LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin += ' AND student_testimonials.learning ="' + learning + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT student_testimonials.* from student_testimonials where ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT student_testimonials.* from student_testimonials where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from student_testimonials WHERE ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' +
							errSelDetails.message +
							'","cmd":"student_testimonials_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"student_testimonials_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"student_testimonials_list","data":[], "cmd":"student_testimonials_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_student_testimonials(userdata, pool, callback) {
	var resultJson = '';
	var student_name = '';
	var image = '';
	var message = '';
	var age = '';
	var student_class = '';
	var parent_name = '';
	var parent_designation = '';
	var learning = '0';
	var id = '';

	if (typeof userdata.parent_name != 'undefined' && userdata.parent_name != '') {
		parent_name = userdata.parent_name;
	}
	if (typeof userdata.parent_designation != 'undefined' && userdata.parent_designation != '') {
		parent_designation = userdata.parent_designation;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.student_name != 'undefined' && userdata.student_name != '') {
		student_name = userdata.student_name;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.message != 'undefined' && userdata.message != '') {
		message = userdata.message;
	}
	if (typeof userdata.age != 'undefined' && userdata.age != '') {
		age = userdata.age;
	}
	if (typeof userdata.student_class != 'undefined' && userdata.student_class != '') {
		student_class = userdata.student_class;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE student_testimonials SET student_name="' + student_name + '",image="' + image + '",message="' + message + '",age="' + age + '",student_class="' + student_class + '",learning="' + learning + '",parent_name="' + parent_name + '",parent_designation="' + parent_designation + '" where student_testimonials.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO student_testimonials SET student_name="' + student_name + '",image="' + image + '",message="' + message + '",age="' + age + '",student_class="' + student_class + '",learning="' + learning + '",parent_name="' + parent_name + '",parent_designation="' + parent_designation + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"student_testimonials updated successfully","cmd":"student_testimonials"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_testimonials"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*student_testimonials details*/
function student_testimonials_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM student_testimonials WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"student_testimonialss details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_testimonialss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_student_testimonials_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE student_testimonials SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"student_testimonialss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_testimonialss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function enquiries_list(userdata, pool, callback) {
	var resultJson = '';
	var keyword = '';
	var learning = '0';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND enquiries.first_name LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin += ' AND enquiries.learning = "' + learning + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT enquiries.* from enquiries where enquiries.status !="2" ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT enquiries.* from enquiries where enquiries.status !="2" ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from enquiries WHERE enquiries.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"enquiries"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"enquiries"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"enquiries","data":[], "cmd":"enquiries"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

// course achievement

function course_achievement_list(userdata, pool, callback) {
	var resultJson = '';
	var keyword = '';
	var course_id = '';
	var Keyconditoin = '';
	var start = '0';
	var type = ''; //0-achivement,1-activities,2-skills,3-certificates
	var limit = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND course_achievement.title LIKE  "%' + keyword + '%"';
		}

		if (type != '') {
			Keyconditoin = ' AND course_achievement.type ="' + type + '"';
		}

		if (limit != '') {
			detailsquery =
				'SELECT course_achievement.* from course_achievement where course_achievement.status !="2" AND course_achievement.course_id="' +
				course_id +
				'" ' +
				Keyconditoin +
				' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery =
				'SELECT course_achievement.* from course_achievement where course_achievement.status !="2" AND course_achievement.course_id="' +
				course_id +
				'" ' +
				Keyconditoin +
				'';
		}

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from course_achievement where course_achievement.status !="2" AND course_achievement.course_id="' +
			course_id +
			'" ' + Keyconditoin + '';


		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' +
							errSelDetails.message +
							'","cmd":"course_achievement_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"course_achievement_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course_achievement_list","data":[], "cmd":"course_achievement_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_course_achievement(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var image = '';
	var course_id = '';
	var type = '0'; //0-achivement,1-activities,2-skills,3-certificates
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE course_achievement SET title="' +
				title +
				'",image="' +
				image +
				'",course_id="' +
				course_id +
				'",type="' + type + '" where course_achievement.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO course_achievement SET title="' +
				title +
				'",image="' +
				image +
				'",course_id="' +
				course_id +
				'",type="' + type + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"course_achievement updated successfully","cmd":"course_achievement"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_achievement"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*course_achievement details*/
function course_achievement_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM course_achievement WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"course_achievements details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_achievements"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_course_achievement_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE course_achievement SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"course_achievements"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"course_achievements"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Pix content

function pix_contents_list(userdata, pool, callback) {
	var resultJson = '';
	var keyword = '';
	var age_group_id = '';
	var Keyconditoin = ' pix_contents.status !="2"';
	var start = '0';
	var limit = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND pix_contents.title LIKE  "%' + keyword + '%"';
		}
		if (age_group_id != '') {
			Keyconditoin += ' AND pix_contents.age_group_id ="' + age_group_id + '"';
		}
		if (limit != '') {
			detailsquery = 'SELECT pix_contents.* from pix_contents where ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT pix_contents.* from pix_contents where ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from pix_contents WHERE  ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"pix_contents_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"pix_contents_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"pix_contents_list","data":[], "cmd":"pix_contents_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function add_pix_contents(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var description = '';
	var video = '';
	var type = '0'; //0-Story,1-Rhyme,2-DIY-Home
	var image = '';
	var featured = '';
	var id = '';
	var age_group_id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description;
	}
	if (typeof userdata.video != 'undefined' && userdata.video != '') {
		video = userdata.video;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.featured != 'undefined' && userdata.featured != '') {
		featured = userdata.featured;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE pix_contents SET title="' +
				title +
				'",description="' +
				description +
				'",video="' +
				video +
				'",image="' +
				image +
				'",featured="' +
				featured +
				'",type="' +
				type +
				'",age_group_id="' +
				age_group_id +
				'" where pix_contents.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO pix_contents SET title="' +
				title +
				'",description="' +
				description +
				'",video="' +
				video +
				'",image="' +
				image +
				'",featured="' +
				featured +
				'",type="' +
				type +
				'",age_group_id="' +
				age_group_id +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"pix_contents updated successfully","cmd":"pix_contents"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"pix_contents"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*pix_contents details*/
function pix_contents_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM pix_contents WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"pix_contentss details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"pix_contentss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update status
function update_pix_contents_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE pix_contents SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"pix_contentss"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"pix_contentss"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// teacher payout

function teacher_payout_details(userdata, pool, callback) {
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var resultJson = '';
	var teacher_id = '';
	var month = '';
	var year = '';
	var Keyconditoin_teacher = ' role_id="3" AND status="1"';
	var Keyconditoin_payout = ' paid !="4"';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}

	if (typeof userdata.month != 'undefined' && userdata.month != '') {
		month = userdata.month;
	}
	if (typeof userdata.year != 'undefined' && userdata.year != '') {
		year = userdata.year;
	}

	pool.getConnection(function (err, connection) {
		if (teacher_id != '') {
			Keyconditoin_teacher += ' AND users.id = "' + teacher_id + '"';
		}

		teacherssquery =
			'SELECT users.*,(SELECT SUM(amount) from teachers_payout where class_type="1" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as paid_class_total,(SELECT COUNT(id) from teachers_payout where class_type="1" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as paid_class_count,(SELECT SUM(amount) from teachers_payout where class_type="2" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as demo_class_total,(SELECT COUNT(id) from teachers_payout where class_type="2" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as demo_class_count,(SELECT SUM(amount) from teachers_payout where class_type="3" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as penalty_total,(SELECT COUNT(id) from teachers_payout where class_type="3" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as penalty_count,(SELECT SUM(amount) from teachers_payout where class_type="4" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as adjustment,(SELECT SUM(amount) from teachers_payout where class_type="5" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as conversion_total,(SELECT COUNT(id) from teachers_payout where class_type="5" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as conversion_count,(SELECT SUM(amount) from teachers_payout where class_type="6" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as project_feedback_total,(SELECT COUNT(id) from teachers_payout where class_type="6" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as project_feedback_count,(SELECT SUM(amount) from teachers_payout where class_type="7" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as teacher_feedback_total,(SELECT COUNT(id) from teachers_payout where class_type="7" AND teachers_payout.teacher_id = users.id AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as project_feedback_count,(SELECT demo_class_settings.minimum_amount from demo_class_settings where demo_class_settings.id="2") as minimum_amount,(SELECT demo_class_settings.min_slots_per_month from demo_class_settings where demo_class_settings.id="2") as min_slots_per_month,(SELECT COUNT(id) from user_time_schedule_slots where user_time_schedule_slots.teacher_id=users.id AND user_time_schedule_slots.mark_availability="1" AND MONTH(created) = "' +
			month +
			'" AND YEAR(created) = "' +
			year +
			'") as teachers_slots_per_month from users where ' +
			Keyconditoin_teacher +
			'';
		console.log('teacherssquery', teacherssquery);

		connection.query(teacherssquery, function (errTeacher, resTeacher) {
			if (errTeacher) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errTeacher.message + '","cmd":"teacher_payout_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				if (resTeacher.length > 0) {
					var i = 0;
					async.eachSeries(
						resTeacher,
						function (rec2, loop2) {
							var tea_id = rec2.id;
							console.log('tea_id', tea_id);
							Keyconditoin_payout += ' AND teachers_payout.teacher_id = "' + tea_id + '"';
							if (month != '') {
								Keyconditoin_payout +=
									' AND MONTH(created) = "' + month + '" AND YEAR(created) = "' + year + '"';
							}
							proiMGquery =
								'SELECT teachers_payout.* from teachers_payout where ' + Keyconditoin_payout + '';
							console.log('proiMGquery', proiMGquery);
							connection.query(proiMGquery, function (errSelpiMG, respROiMG) {
								if (errSelpiMG) {
									console.log('errSelpiMG', errSelpiMG);

									loop2();
								} else {
									resTeacher[i].payout = respROiMG;
									loop2();
								}
								i = i + 1;
							});
						},
						function (errSelPro) {
							if (errSelPro) {
								console.log('errSelPro', errSelPro);
								resultJson =
									'{"replyCode":"error","replyMsg":"' +
									errSelPro.message +
									'","cmd":"teacher_payout_details"}\n';
								connection.release();
								callback(200, null, resultJson);
								return;
							} else {
								resultJson =
									'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
									JSON.stringify(resTeacher) +
									',"cmd":"teacher_payout_details"}\n';
								console.log('res-suceess');
								connection.release();
								callback(200, null, resultJson);
								return;
							}
						}
					);
				} else {
					resultJson =
						'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"teacher_payout_details"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			}
		});
	});
}

// create adjustment

function create_adjustment(userdata, pool, callback) {
	var resultJson = '';
	var teacher_id = '';
	var amount = '0';
	var created = '0';
	var Uquery = '';

	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}

	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.created != 'undefined' && userdata.created != '') {
		created = userdata.created;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'INSERT into teachers_payout SET amount="' + amount + '",class_type="4",teacher_id="' + teacher_id + '",created="' + created + '"';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"create_adjustment"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"create_adjustment"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//update course_start_Date

function update_course_start_date(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var course_start_date = '0000-00-00';

	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.course_start_date != 'undefined' && userdata.course_start_date != '') {
		course_start_date = userdata.course_start_date;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE student_course_subscription SET course_start_date="' + course_start_date + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Date chenged Successfully","cmd":"update_course_start_date"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_course_start_date"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}
//update course_price

function update_subscrption_course(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var course_id = '';

	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE student_course_subscription SET course_id="' + course_id + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Date chenged Successfully","cmd":"update_subscrption_course"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_subscrption_course"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Coupon

function admin_coupon_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';


	// var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND coupons.code LIKE  "%' + keyword + '%"';
		}
		if (limit != '') {
			detailsquery =
				'SELECT coupons.* from coupons where coupons.status !="2" ' +
				Keyconditoin +
				' ORDER BY coupons.created ASC LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery =
				'SELECT coupons.* from coupons where coupons.status !="2" ' +
				Keyconditoin +
				' ORDER BY coupons.created ASC';
		}
		// if (learning != '') {
		// 	Keyconditoin = ' AND coupons.learning LIKE  "' + learning + '"';
		// }

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from coupons WHERE coupons.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"coupon_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"coupon_list","data":[], "cmd":"coupon_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function admin_coupon_list_dropdown(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	// var learning = '0';
	// if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
	// 	learning = userdata.learning;
	// }
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND coupons.code LIKE  "%' + keyword + '%"';
		}

		// if (learning != '') {
		// 	Keyconditoin = ' AND coupons.learning LIKE  "' + learning + '"';
		// }
		detailsquery =
			'SELECT coupons.* from coupons where coupons.status ="1" ' +
			Keyconditoin +
			' ORDER BY coupons.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_coupon(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var code = '';
	var description = '';
	var image = '';
	var max_usage_per_user = '';
	var id = '';
	var start_date_time = '';
	var end_date_time = '';
	var max_usage = '';
	var min_purchase = '';
	var type = '';
	var max_discount = '';
	var self_pace = '';
	var live = '';
	var preschool = '';
	var multi_age_groups = '';
	var multi_users = '';
	var multi_courses = '';

	if (typeof userdata.start_date_time != 'undefined' && userdata.start_date_time != '') {
		start_date_time = userdata.start_date_time;
	}
	if (typeof userdata.preschool != 'undefined' && userdata.preschool != '') {
		preschool = userdata.preschool;
	}
	if (typeof userdata.multi_age_groups != 'undefined' && userdata.multi_age_groups != '') {
		multi_age_groups = userdata.multi_age_groups;
	}
	if (typeof userdata.multi_courses != 'undefined' && userdata.multi_courses != '') {
		multi_courses = userdata.multi_courses;
	}
	if (typeof userdata.multi_users != 'undefined' && userdata.multi_users != '') {
		multi_users = userdata.multi_users;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.code != 'undefined' && userdata.code != '') {
		code = userdata.code;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}

	if (typeof userdata.max_usage_per_user != 'undefined' && userdata.max_usage_per_user != '') {
		max_usage_per_user = userdata.max_usage_per_user;
	}

	if (typeof userdata.end_date_time != 'undefined' && userdata.end_date_time != '') {
		end_date_time = userdata.end_date_time;
	}

	if (typeof userdata.max_usage != 'undefined' && userdata.max_usage != '') {
		max_usage = userdata.max_usage;
	}
	if (typeof userdata.min_purchase != 'undefined' && userdata.min_purchase != '') {
		min_purchase = userdata.min_purchase;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.max_discount != 'undefined' && userdata.max_discount != '') {
		max_discount = userdata.max_discount;
	}
	if (typeof userdata.self_pace != 'undefined' && userdata.self_pace != '') {
		self_pace = userdata.self_pace;
	}
	if (typeof userdata.live != 'undefined' && userdata.live != '') {
		live = userdata.live;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE coupons SET code="' + code + '",description="' + description + '",image="' + image + '",max_usage_per_user="' + max_usage_per_user + '",end_date_time="' + end_date_time + '",start_date_time="' + start_date_time + '",max_usage="' + max_usage + '",min_purchase="' + min_purchase + '",type="' + type + '",max_discount="' + max_discount + '",self_pace="' + self_pace + '",live="' + live + '",preschool="' + preschool + '",multi_users="' + multi_users + '",multi_courses="' + multi_courses + '",multi_age_groups="' + multi_age_groups + '" where coupons.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO coupons SET code="' + code + '",description="' + description + '",image="' + image + '",max_usage_per_user="' + max_usage_per_user + '",end_date_time="' + end_date_time + '",start_date_time="' + start_date_time + '",max_usage="' + max_usage + '",min_purchase="' + min_purchase + '",type="' + type + '",max_discount="' + max_discount + '",self_pace="' + self_pace + '",live="' + live + '",preschool="' + preschool + '",multi_users="' + multi_users + '",multi_courses="' + multi_courses + '",multi_age_groups="' + multi_age_groups + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"coupon updated successfully","cmd":"coupon"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM coupons WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"coupons details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupons"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_update_coupon_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE coupons SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"coupons"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupons"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Coupon_Users
function admin_coupon_list_users(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var coupon_id = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND coupon_users.code LIKE  "%' + keyword + '%"';
		}
		if (coupon_id != '') {
			Keyconditoin = ' AND coupon_users.coupon_id =' + coupon_id + '';
		}

		detailsquery = 'SELECT coupon_users.*,( SELECT coupons.code from coupons where coupons.id=coupon_users.coupon_id) as ccode,( SELECT users.name from users where users.id=coupon_users.user_id) as username  FROM coupon_users WHERE coupon_users.status !="2"' +
			Keyconditoin +
			' ORDER BY created ASC';

		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_users_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_users_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_list_dropdown_users(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND coupon_users.code LIKE  "%' + keyword + '%"';
		}
		detailsquery =
			'SELECT coupon_users.* from coupon_users where coupon_users.status ="1" ' +
			Keyconditoin +
			' ORDER BY coupon_users.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_users_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_users_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_coupon_users(userdata, pool, callback) {
	var resultJson = '';
	var coupon_id = '';
	var user_id = '';
	var email = '';
	var id = '';

	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE coupon_users SET coupon_id="' +
				coupon_id +
				'",user_id="' +
				user_id +
				'",email="' +
				email +
				'" where coupon_users.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO coupon_users SET coupon_id="' +
				coupon_id +
				'",user_id="' +
				user_id +
				'",email="' +
				email +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"user coupon updated successfully","cmd":"coupon"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"user coupon"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_details_users(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM coupon_users WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"coupon_users details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_users"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_update_coupon_status_users(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE coupon_users SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"coupon_users"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_users"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Coupon_Courses
function admin_coupon_list_courses(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var coupon_id = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND coupon_courses.code LIKE  "%' + keyword + '%"';
		}
		if (coupon_id != '') {
			Keyconditoin = ' AND coupon_courses.coupon_id =' + coupon_id + '';
		}
		detailsquery = 'SELECT coupon_courses.*,( SELECT coupons.code from coupons where coupons.id=coupon_courses.coupon_id) as ccode,( SELECT courses.course_name from courses where courses.id=coupon_courses.course_id) as course_name  FROM coupon_courses WHERE coupon_courses.status !="2"' +
			Keyconditoin +
			' ORDER BY created ASC';

		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_courses_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_list_dropdown_courses(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND coupon_courses.code LIKE  "%' + keyword + '%"';
		}
		detailsquery =
			'SELECT coupon_courses.* from coupon_courses where coupon_courses.status ="1" ' +
			Keyconditoin +
			' ORDER BY coupon_courses.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_courses_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_coupon_courses(userdata, pool, callback) {
	var resultJson = '';
	var coupon_id = '';
	var course_id = '';
	var id = '';

	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE coupon_courses SET coupon_id="' +
				coupon_id +
				'",course_id="' +
				course_id +
				'" where coupon_courses.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO coupon_courses SET coupon_id="' +
				coupon_id +
				'",course_id="' +
				course_id +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"user coupon updated successfully","cmd":"coupon"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"user coupon"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_details_courses(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM coupon_courses WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"coupon_courses details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_courses"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_update_coupon_status_courses(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE coupon_courses SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"coupon_courses"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_courses"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// Coupon_age_groups

// age group dropdown
function all_age_group_list_dropdown(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND age_group.title LIKE  "%' + keyword + '%"';
		}
		detailsquery =
			'SELECT age_group.* from age_group where age_group.status ="1" ' +
			Keyconditoin +
			' ORDER BY age_group.priority ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"age_group_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"age_group_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_list_age_groups(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var coupon_id = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND coupon_age_groups.code LIKE  "%' + keyword + '%"';
		}
		if (coupon_id != '') {
			Keyconditoin = ' AND coupon_age_groups.coupon_id =' + coupon_id + '';
		}
		detailsquery = 'SELECT coupon_age_groups.*,( SELECT coupons.code from coupons where coupons.id=coupon_age_groups.coupon_id) as ccode,( SELECT age_group.title from age_group where age_group.id=coupon_age_groups.age_group_id) as agegroupname  FROM coupon_age_groups WHERE coupon_age_groups.status !="2"' +
			Keyconditoin +
			' ORDER BY created ASC';

		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_age_groups_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_age_groups_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_list_dropdown_age_groups(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND coupon_age_groups.code LIKE  "%' + keyword + '%"';
		}
		detailsquery =
			'SELECT coupon_age_groups.* from coupon_age_groups where coupon_age_groups.status ="1" ' +
			Keyconditoin +
			' ORDER BY coupon_age_groups.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"coupon_age_groups_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"coupon_age_groups_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_coupon_age_groups(userdata, pool, callback) {
	var resultJson = '';
	var coupon_id = '';
	var age_group_id = '';
	var email = '';
	var id = '';

	if (typeof userdata.coupon_id != 'undefined' && userdata.coupon_id != '') {
		coupon_id = userdata.coupon_id;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE coupon_age_groups SET coupon_id="' +
				coupon_id +
				'",age_group_id="' +
				age_group_id +
				'" where coupon_age_groups.id="' +
				id +
				'"';
		} else {
			var queryinsert =
				'INSERT INTO coupon_age_groups SET coupon_id="' +
				coupon_id +
				'",age_group_id="' +
				age_group_id +
				'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"user coupon updated successfully","cmd":"coupon"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"user coupon"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function admin_coupon_details_age_groups(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM coupon_age_groups WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"coupon_age_groups details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_age_groups"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_update_coupon_status_age_groups(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE coupon_age_groups SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"coupon_age_groups"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"coupon_age_groups"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function duplicate_course(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';

	var Uquery = '';

	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'CALL duplicate_course(' + course_id + ')';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Course created Successfully","cmd":"duplicate_course"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"duplicate_course"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}





function register_user_fun(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);

	var name = '';
	var email = '';
	var phone = '';
	var dob = '0000-00-00';
	var parents_name = '';
	var mother_name = '';
	var school_name = '';
	var father_name = '';
	var school_code = '';
	var class_name = '';
	var age_group_id = '';
	var gender = '';


	var password = '123456';
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}

	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.mobile != 'undefined' && userdata.mobile != '') {
		phone = userdata.mobile;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}

	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}

	if (typeof userdata.parent != 'undefined' && userdata.parent != '') {
		parents_name = userdata.parent;
	}
	if (typeof userdata.school != 'undefined' && userdata.school != '') {
		school_name = userdata.school;
	}
	if (typeof userdata.father_name != 'undefined' && userdata.father_name != '') {
		father_name = userdata.father_name;
	}
	if (typeof userdata.mother_name != 'undefined' && userdata.mother_name != '') {
		mother_name = userdata.mother_name;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + password);
		if (validateEmail(email)) {
			console.log(email + " is valid :)");
			checkValidateStudent(userdata, pool, function (responseEmail,dataU) {
				console.log('dataU',dataU);
				if (responseEmail == true) {
					resultJson = '{"replyCode":"error","replyMsg":"user already reg","cmd":"sign_up"}\n';
					console.log('res-suceess',dataU);
					connection.release();
					callback(true, dataU[0].id);
					return;
				} else {
					var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "' + name + '", password = "' + hash_password + '",phone = "' + phone + '",role_id="2",dob="' + dob + '",parents_name="' + parents_name + '",school_name="' + school_name + '",father_name="' + father_name + '",mother_name="' + mother_name + '",class_name="' + class_name + '",age_group_id="' + age_group_id + '",gender="' + gender + '",school_code="' + school_code + '",status="1",verified="1",created= NOW()';

					console.log(queryinsert);
					connection.query(queryinsert, function (errinsert, resultinsert) {
						if (!errinsert) {
							var user_id = resultinsert.insertId;
							connection.release();
							callback(true, user_id);
							return;
						} else {
							resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"sign_up"}\n';
							console.log('res-suceess');
							connection.release();
							callback(false, resultJson);
							return;
						}
					})

				}
			})

		} else {
			console.log(email + " is not valid :(");

			resultJson = '{"replyCode":"error","replyMsg":"Email is not valid","cmd":"sign_up"}\n';
			console.log('res-suceess');
			connection.release();
			callback(false, resultJson);
			return;
		}

	});
}



function register_user_fun_android(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);

	var name = '';
	var email = '';
	var phone = '';
	var dob = '0000-00-00';
	var parents_name = '';
	var mother_name = '';
	var school_name = '';
	var father_name = '';
	var school_code = '';
	var class_name = '';
	var age_group_id = '';
	var gender = '';
	var start_date = '';
	var price = '0';


	var password = '123456';
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}

	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}

	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}

	if (typeof userdata.parent != 'undefined' && userdata.parent != '') {
		parents_name = userdata.parent;
	}
	if (typeof userdata.school != 'undefined' && userdata.school != '') {
		school_name = userdata.school;
	}
	if (typeof userdata.father_name != 'undefined' && userdata.father_name != '') {
		father_name = userdata.father_name;
	}
	if (typeof userdata.mother_name != 'undefined' && userdata.mother_name != '') {
		mother_name = userdata.mother_name;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	if (typeof userdata.start_date != 'undefined' && userdata.start_date != '') {
		start_date = userdata.start_date;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + password);
		if (validateEmail(email)) {
			console.log(email + " is valid :)");
			checkValidateStudent(userdata, pool, function (responseEmail) {
				console.log(responseEmail);
				if (responseEmail == false) {
					var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "' + name + '", password = "' + hash_password + '",phone = "' + phone + '",role_id="2",dob="' + dob + '",parents_name="' + parents_name + '",school_name="' + school_name + '",father_name="' + father_name + '",mother_name="' + mother_name + '",class_name="' + class_name + '",age_group_id="' + age_group_id + '",gender="' + gender + '",school_code="' + school_code + '",status="1",verified="1",created= "' + Curdate + '"';

					console.log(queryinsert);
					connection.query(queryinsert, function (errinsert, resultinsert) {
						if (!errinsert) {
							var user_id = resultinsert.insertId;

							var querySelectCourse = 'SELECT class_duration_template.* from class_duration_template WHERE class_name="' + class_name + '" AND status="1"';
							console.log('querySelectCourse--1', querySelectCourse);
							connection.query(querySelectCourse, function (errSel, resSel) {
								console.log('querySelectCourse--1::::resSel', resSel);
								if (errSel) {
									resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								} else {
									console.log(resSel);
									if (resSel.length > 0) {
										var i = 0;
										var myDate = new Date(start_date);
										console.log('myDate', myDate);
										var courseDays = "0";
										async.eachSeries(resSel, function (rec3, loop3) {
											var course_id = rec3.course_id;
											if (courseDays != "0") {
												myDate.setDate(myDate.getDate() + courseDays);
											}

											NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
											console.log('NewSchDate---', NewSchDate);
											var dataSUb = { "course_id": course_id, "student_id": user_id, "teacher_id": "0", "price": price, "start_date": NewSchDate, "transaction_id": "0" };
											subscribe_course(dataSUb, pool, function (resNew, responseNew) {
												if (resNew == false) {
													courseDays = rec3.days;
													resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"subscribe_course-register_user_fun"}\n';
													console.log('res-suceess');
													loop3();
												} else {
													courseDays = rec3.days;
													resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course-register_user_fun"}\n';
													loop3();
												}
											})
										}, function (errSelPro) {
											if (errSelPro) {
												console.log('errSelPro', errSelPro);
												resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"teacher_schedule_days_list"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;
											} else {
												resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","cmd":"teacher_schedule_days_list"}\n';
												console.log('res-suceess');
												connection.release();
												callback(200, null, resultJson);
												return;
											}
										})
									} else {

										resultJson = '{"replyCode":"error","replyMsg":"No class found","cmd":"teacher_schedule_days_list"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							})


						} else {
							resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"sign_up"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					})
				} else {
					resultJson = '{"replyCode":"error","replyMsg":"Email already registered","cmd":"subscribe_course"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			})

		} else {
			console.log(email + " is not valid :(");

			resultJson = '{"replyCode":"error","replyMsg":"Email is not valid","cmd":"sign_up"}\n';
			console.log('res-suceess');
			connection.release();
			callback(200, null, resultJson);
			// callback(false, resultJson);
			return;
		}

	});
}


function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function update_course_shipping_no(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var shipping_no; //0-inactive , 1-active , 2- delete
	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.shipping_no != 'undefined' && userdata.shipping_no != '') {
		shipping_no = userdata.shipping_no;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE student_course_subscription SET shipping_no="' + shipping_no + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Shipping No. chenged Successfully","cmd":"student_course_subscription"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"update_course_shipping_no"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function country_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND countries.name LIKE  "%' + keyword + '%"';
		}

		detailsquery = 'SELECT countries.* from countries where countries.id !="0" ' + Keyconditoin + " ORDER BY countries.name ASC";
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"countries"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"countries"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function state_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var country_id = '';
	var Keyconditoin = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.country_id != 'undefined' && userdata.country_id != '') {
		country_id = userdata.country_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND states.name LIKE  "%' + keyword + '%"';
		}
		if (country_id != '') {
			Keyconditoin = ' AND states.country_id ="' + country_id + '"';
		}

		detailsquery = 'SELECT states.* from states where states.id !="0" ' + Keyconditoin + " ORDER BY states.name ASC";
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"state_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"state_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function city_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var state_id = '';
	var Keyconditoin = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.state_id != 'undefined' && userdata.state_id != '') {
		state_id = userdata.state_id;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND cities.name LIKE  "%' + keyword + '%"';
		}
		if (state_id != '') {
			Keyconditoin = ' AND cities.state_id ="' + state_id + '"';
		}

		detailsquery = 'SELECT cities.* from cities where cities.id !="0" ' + Keyconditoin + " ORDER BY cities.name ASC";
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"city_list"}\n', connection.release(), callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":' + JSON.stringify(resSelDetails) + ',"cmd":"city_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



// Schools

function admin_school_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';
	var type = '0';

	// var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND schools.code LIKE  "%' + keyword + '%"';
		}
		
		if (type != '') {
			Keyconditoin = ' AND schools.type = "' + type + '"';
		}

		if (limit != '') {
			detailsquery = 'SELECT schools.* from schools where schools.status !="2" ' + Keyconditoin + " ORDER BY schools.created ASC LIMIT " + start + ", " + limit;
		} else {
			detailsquery = 'SELECT schools.* from schools where schools.status !="2" ' + Keyconditoin + " ORDER BY schools.created ASC";
		}
		// if (learning != '') {
		// 	Keyconditoin = ' AND schools.learning LIKE  "' + learning + '"';
		// }

		console.log('detailsquery', detailsquery);

		var countquery = 'SELECT count(*) as count from schools WHERE schools.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"school_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"school_list","data":[], "cmd":"school_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function admin_school_list_dropdown(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var type = '0';
	var Keyconditoin = '';
	// var learning = '0';
	// if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
	// 	learning = userdata.learning;
	// }
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND schools.code LIKE  "%' + keyword + '%"';
		}
		if (type != '') {
			Keyconditoin = ' AND schools.type = "' + type + '"';
		}
		// if (learning != '') {
		// 	Keyconditoin = ' AND schools.learning LIKE  "' + learning + '"';
		// }
		detailsquery ='SELECT schools.* from schools where schools.status ="1" ' +Keyconditoin +' ORDER BY schools.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"school_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_school(userdata, pool, callback) {
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);

	var resultJson = '';
	var course_id = '';

	var type ='0';
	var id = '';
	var code = '';
	var description = '';
	var name = '';
	var address = '';
	var district = '';
	var city = '';
	var state = '';
	var contact_person = '';
	var contact_phone = '';
	var contact_alternate_number = '';
	var contact_email = '';
	var image = '';
	var bank_name = '';
	var bank_account_no = '';
	var bank_account_name = '';
	var bank_ifsc = '';
	var gstin = '';
	var pan = '';
	var is_gst = '';
	var is_specified_person = '';
	var password = '';
	var payout = '0';
	var robotics = '0';
	var coding = '0';
	var robotics_aiot = '0';
	var robotics_atl = '0';
	var robotics_curriculam = '0';

	var student_limit = '0';


	if (typeof userdata.robotics_aiot != 'undefined' && userdata.robotics_aiot != '') {
		robotics_aiot = userdata.robotics_aiot;
	}
	if (typeof userdata.robotics_atl != 'undefined' && userdata.robotics_atl != '') {
		robotics_atl = userdata.robotics_atl;
	}
	if (typeof userdata.robotics_curriculam != 'undefined' && userdata.robotics_curriculam != '') {
		robotics_curriculam = userdata.robotics_curriculam;
	}
	if (typeof userdata.robotics != 'undefined' && userdata.robotics != '') {
		robotics = userdata.robotics;
	}
	if (typeof userdata.coding != 'undefined' && userdata.coding != '') {
		coding = userdata.coding;
	}
	if (typeof userdata.gstin != 'undefined' && userdata.gstin != '') {
		gstin = userdata.gstin;
	}
	if (typeof userdata.pan != 'undefined' && userdata.pan != '') {
		pan = userdata.pan;
	}
	if (typeof userdata.is_gst != 'undefined' && userdata.is_gst != '') {
		is_gst = userdata.is_gst;
	}
	if (typeof userdata.is_specified_person != 'undefined' && userdata.is_specified_person != '') {
		is_specified_person = userdata.is_specified_person;
	}
	if (typeof userdata.address != 'undefined' && userdata.address != '') {
		address = userdata.address;
	}
	if (typeof userdata.district != 'undefined' && userdata.district != '') {
		district = userdata.district;
	}
	if (typeof userdata.city != 'undefined' && userdata.city != '') {
		city = userdata.city;
	}
	if (typeof userdata.state != 'undefined' && userdata.state != '') {
		state = userdata.state;
	}
	if (typeof userdata.contact_person != 'undefined' && userdata.contact_person != '') {
		contact_person = userdata.contact_person;
	}
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.code != 'undefined' && userdata.code != '') {
		code = userdata.code;
	}

	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description;
	}

	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.contact_phone != 'undefined' && userdata.contact_phone != '') {
		contact_phone = userdata.contact_phone;
	}

	if (typeof userdata.contact_alternate_number != 'undefined' && userdata.contact_alternate_number != '') {
		contact_alternate_number = userdata.contact_alternate_number;
	}

	if (typeof userdata.contact_email != 'undefined' && userdata.contact_email != '') {
		contact_email = userdata.contact_email;
	}
	if (typeof userdata.bank_name != 'undefined' && userdata.bank_name != '') {
		bank_name = userdata.bank_name;
	}
	if (typeof userdata.bank_account_no != 'undefined' && userdata.bank_account_no != '') {
		bank_account_no = userdata.bank_account_no;
	}
	if (typeof userdata.bank_account_name != 'undefined' && userdata.bank_account_name != '') {
		bank_account_name = userdata.bank_account_name;
	}
	if (typeof userdata.bank_ifsc != 'undefined' && userdata.bank_ifsc != '') {
		bank_ifsc = userdata.bank_ifsc;
	}

	if (typeof userdata.password != 'undefined' && userdata.password != '') {
		password = userdata.password;
	}
	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}

	if (typeof userdata.payout != 'undefined' && userdata.payout != '') {
		payout = userdata.payout;
	}
	if (typeof userdata.student_limit != 'undefined' && userdata.student_limit != '') {
		student_limit = userdata.student_limit;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}


	var hash_password = sha1(secretSalt + password);
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE schools SET code="' + code + '",description="' + description + '",name="' + name + '",address="' + address + '",district="' + district + '",city="' + city + '",state="' + state + '",contact_person="' + contact_person + '",contact_phone="' + contact_phone + '",contact_alternate_number="' + contact_alternate_number + '",contact_email="' + contact_email + '",bank_name="' + bank_name + '",bank_account_no="' + bank_account_no + '",bank_account_name="' + bank_account_name + '",bank_ifsc="' + bank_ifsc + '",gstin="' + gstin + '",pan="' + pan + '",is_gst="' + is_gst + '",is_specified_person="' + is_specified_person + '",image="' + image + '",payout="' + payout + '",coding="' + coding + '",robotics="' + robotics + '",robotics_curriculam="' + robotics_curriculam + '",robotics_atl="' + robotics_atl + '",robotics_aiot="' + robotics_aiot + '",student_limit="' + student_limit + '",type="'+type+'" where schools.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO schools SET code="' + code + '",description="' + description + '",name="' + name + '",address="' + address + '",district="' + district + '",city="' + city + '",state="' + state + '",contact_person="' + contact_person + '",contact_phone="' + contact_phone + '",contact_alternate_number="' + contact_alternate_number + '",contact_email="' + contact_email + '",bank_name="' + bank_name + '",bank_account_no="' + bank_account_no + '",bank_account_name="' + bank_account_name + '",bank_ifsc="' + bank_ifsc + '",gstin="' + gstin + '",pan="' + pan + '",is_gst="' + is_gst + '",is_specified_person="' + is_specified_person + '",image="' + image + '",password="' + hash_password + '",payout="' + payout + '",coding="' + coding + '",robotics="' + robotics + '",robotics_curriculam="' + robotics_curriculam + '",robotics_atl="' + robotics_atl + '",robotics_aiot="' + robotics_aiot + '",student_limit="' + student_limit + '",type="'+type+'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"school updated successfully","cmd":"school"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"school"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}


function admin_update_school_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE schools SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"schools"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"schools"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Schools Commission

function admin_school_commission_list(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var keyword = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}

	pool.getConnection(function (err, connection) {
		if (school_id != '') {
			Keyconditoin = ' AND school_commissions.school_id ="' + school_id + '"';
		}

		// if (learning != '') {
		// 	Keyconditoin = ' AND school_commissions.learning LIKE  "' + learning + '"';
		// }
		detailsquery =
			'SELECT school_commissions.* from school_commissions where school_commissions.status !="2" ' +
			Keyconditoin +
			' ORDER BY school_commissions.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_commissions_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"school_commissions_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_school_commission_list_dropdown(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	// var learning = '0';
	// if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
	// 	learning = userdata.learning;
	// }
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND school_commissions.code LIKE  "%' + keyword + '%"';
		}

		// if (learning != '') {
		// 	Keyconditoin = ' AND school_commissions.learning LIKE  "' + learning + '"';
		// }
		detailsquery =
			'SELECT school_commissions.* from school_commissions where school_commissions.status ="1" ' +
			Keyconditoin +
			' ORDER BY school_commissions.created ASC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_commissions_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"school_commissions_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_add_school_commission(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var robotics = '';
	var coding = '';
	var preschool = '';
	var selfpace = '';
	var id = '';

	if (typeof userdata.selfpace != 'undefined' && userdata.selfpace != '') {
		selfpace = userdata.selfpace;
	}

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	if (typeof userdata.robotics != 'undefined' && userdata.robotics != '') {
		robotics = userdata.robotics;
	}

	if (typeof userdata.coding != 'undefined' && userdata.coding != '') {
		coding = userdata.coding;
	}

	if (typeof userdata.preschool != 'undefined' && userdata.preschool != '') {
		preschool = userdata.preschool;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE school_commissions SET robotics="' + robotics + '",school_id="' + school_id + '",coding="' + coding + '",preschool="' + preschool + '",selfpace="' + selfpace + '" where school_commissions.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO school_commissions SET robotics="' + robotics + '",school_id="' + school_id + '",coding="' + coding + '",preschool="' + preschool + '",selfpace="' + selfpace + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"school_commissions updated successfully","cmd":"school_commissions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"school_commissions"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function admin_school_commission_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM school_commissions WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson =
					'{"replyCode":"success","replyMsg":"school_commissions details","data":' +
					JSON.stringify(resultinsert) +
					'}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"school_commissions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function admin_update_school_commission_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE school_commissions SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"school_commissions"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"school_commissions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_assessments(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var learning = '';
	var description = '';
	var month = '';
	var max_marks = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.description != 'undefined' && userdata.description != '') {
		description = userdata.description.replace(/"/g, "'");
	}
	if (typeof userdata.month != 'undefined' && userdata.month != '') {
		month = userdata.month;
	}
	if (typeof userdata.max_marks != 'undefined' && userdata.max_marks != '') {
		max_marks = userdata.max_marks;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE assessments SET title="' + title + '",learning="' + learning + '",description="' + description + '",month="' + month + '" where id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO assessments SET title="' + title + '",learning="' + learning + '",description="' + description + '",month="' + month + '",status="1",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Assessments updated successfully","cmd":"assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessments"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function assessments_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var learning = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND assessments.title LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin += ' AND assessments.learning =  "' + learning + '"';
		}

		if (limit != '') {
			detailsquery = 'SELECT assessments.* from assessments where assessments.status !="2" ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT assessments.* from assessments where assessments.status !="2" ' + Keyconditoin + '';
		}

		var countquery = 'SELECT count(*) as count from assessments WHERE assessments.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"assessments_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"assessments_list"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"assessments_list","data":[], "cmd":"assessments_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}

function assessments_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var learning = '0';
	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	pool.getConnection(function (err, connection) {
		// if (keyword != '') {
		// 	Keyconditoin = ' AND assessments.course_name LIKE  "%' + keyword + '%"';
		// }
		// if (learning != '') {
		// 	Keyconditoin = ' AND assessments.learning = "' + learning + '"';
		// }

		detailsquery = 'SELECT assessments.* from assessments where assessments.status ="1" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"assessments_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"assessments_list"}\n';
				//console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function assessments_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var slug = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
		slug = userdata.slug;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM assessments WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"assessments details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function update_assessments_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE assessments SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"assessments"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// student_assessments Start
function add_student_assessments(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var student_id = '';
	var month = '';
	var assessment_id = '';
	var class_id = '';
	var learning = '';
	var status = '1';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.month != 'undefined' && userdata.month != '') {
		month = userdata.month;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE student_assessments SET student_id="' + student_id + '",month="' + month + '",assessment_id="' + assessment_id + '",class_id="' + class_id + '",learning="' + learning + '" where id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO student_assessments SET student_id="' + student_id + '",month="' + month + '",assessment_id="' + assessment_id + '",class_id="' + class_id + '",learning="' + learning + '",status="' + status + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"student_assessments updated successfully","cmd":"student_assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_assessments"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function student_assessments_list(userdata, pool, callback) {
	var resultJson = '';
	var student_id = '';
	var assessment_id = '';
	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}

	pool.getConnection(function (err, connection) {
		if (student_id != '') {
			Keyconditoin += ' AND student_assessments.student_id ="' + student_id + '"';
		}
		if (assessment_id != '') {
			Keyconditoin += ' AND student_assessments.assessment_id ="' + assessment_id + '"';
		}

		detailsquery = 'SELECT student_assessments.*,users.name from student_assessments LEFT JOIN users as users ON users.id = student_assessments.student_id where student_assessments.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"student_assessments_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"student_assessments_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function student_assessments_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var slug = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
		slug = userdata.slug;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM student_assessments WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"student_assessments details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function update_student_assessments_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE student_assessments SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"student_assessments"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}
// student_student_assessments End

function assessment_marks_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		// if (keyword != '') {
		// 	Keyconditoin = ' AND assessment_marks.title LIKE  "%' + keyword + '%"';
		// }
		detailsquery = 'SELECT assessment_marks.* from assessment_marks where assessment_marks.status !="2" ' + Keyconditoin + '';
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

function student_assessment_summary_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		// if (keyword != '') {
		// 	Keyconditoin = ' AND student_assessment_summary.title LIKE  "%' + keyword + '%"';
		// }
		detailsquery = 'SELECT student_assessment_summary.* from student_assessment_summary where student_assessment_summary.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"student_assessment_summary_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"student_assessment_summary_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function sections_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var learning = '0';
	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	pool.getConnection(function (err, connection) {
		// if (keyword != '') {
		// 	Keyconditoin = ' AND sections.course_name LIKE  "%' + keyword + '%"';
		// }
		// if (learning != '') {
		// 	Keyconditoin = ' AND sections.learning = "' + learning + '"';
		// }

		detailsquery = 'SELECT sections.* from sections';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"sections_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"sections_list"}\n';
				//console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_assessment_questions(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var assessment_id = '';
	var question_title = '';
	var question_number = '';
	var question_description = '';
	var option1 = '';
	var option1_marks = '';
	var option2 = '';
	var option2_marks = '';
	var option3 = '';
	var option3_marks = '';
	var option4 = '';
	var option4_marks = '';
	var option5 = '';
	var option5_marks = '';
	var option1_image = '';
	var option2_image = '';
	var option3_image = '';
	var option4_image = '';
	var option5_image = '';
	var section_id = '';
	var subsection_id = '';
	var weightage = '0';
	var max_marks = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.question_title != 'undefined' && userdata.question_title != '') {
		question_title = userdata.question_title;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.question_number != 'undefined' && userdata.question_number != '') {
		question_number = userdata.question_number;
	}
	if (typeof userdata.question_description != 'undefined' && userdata.question_description != '') {
		//question_description = userdata.question_description;
		question_description = userdata.question_description.replace(/"/g, "'");
	}
	if (typeof userdata.option1 != 'undefined' && userdata.option1 != '') {
		option1 = userdata.option1;
	}
	if (typeof userdata.option1_marks != 'undefined' && userdata.option1_marks != '') {
		option1_marks = userdata.option1_marks;
	}
	if (typeof userdata.option2 != 'undefined' && userdata.option2 != '') {
		option2 = userdata.option2;
	}
	if (typeof userdata.option2_marks != 'undefined' && userdata.option2_marks != '') {
		option2_marks = userdata.option2_marks;
	}
	if (typeof userdata.option3 != 'undefined' && userdata.option3 != '') {
		option3 = userdata.option3;
	}
	if (typeof userdata.option3_marks != 'undefined' && userdata.option3_marks != '') {
		option3_marks = userdata.option3_marks;
	}
	if (typeof userdata.option4 != 'undefined' && userdata.option4 != '') {
		option4 = userdata.option4;
	}
	if (typeof userdata.option4_marks != 'undefined' && userdata.option4_marks != '') {
		option4_marks = userdata.option4_marks;
	}
	if (typeof userdata.option5 != 'undefined' && userdata.option5 != '') {
		option5 = userdata.option5;
	}
	if (typeof userdata.option5_marks != 'undefined' && userdata.option5_marks != '') {
		option5_marks = userdata.option5_marks;
	}
	if (typeof userdata.option1_image != 'undefined' && userdata.option1_image != '') {
		option1_image = userdata.option1_image;
	}
	if (typeof userdata.option2_image != 'undefined' && userdata.option2_image != '') {
		option2_image = userdata.option2_image;
	}
	if (typeof userdata.option3_image != 'undefined' && userdata.option3_image != '') {
		option3_image = userdata.option3_image;
	}
	if (typeof userdata.option4_image != 'undefined' && userdata.option4_image != '') {
		option4_image = userdata.option4_image;
	}
	if (typeof userdata.option5_image != 'undefined' && userdata.option5_image != '') {
		option5_image = userdata.option5_image;
	}
	if (typeof userdata.section_id != 'undefined' && userdata.section_id != '') {
		section_id = userdata.section_id;
	}
	if (typeof userdata.subsection_id != 'undefined' && userdata.subsection_id != '') {
		subsection_id = userdata.subsection_id;
	}
	if (typeof userdata.weightage != 'undefined' && userdata.weightage != '') {
		weightage = userdata.weightage;
	}
	if (typeof userdata.max_marks != 'undefined' && userdata.max_marks != '') {
		max_marks = userdata.max_marks;
	}
	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE assessment_questions SET assessment_id="' + assessment_id + '",question_title="' + question_title + '",question_number="' + question_number + '",question_description="' + question_description + '",option1="' + option1 + '",option1_marks="' + option1_marks + '",option2="' + option2 + '",option2_marks="' + option2_marks + '",option3="' + option3 + '",option3_marks="' + option3_marks + '",option4="' + option4 + '",option4_marks="' + option4_marks + '",option5="' + option5 + '",option5_marks="' + option5_marks + '",option1_image="' + option1_image + '",option2_image="' + option2_image + '",option3_image="' + option3_image + '",option4_image="' + option4_image + '",option5_image="' + option5_image + '",section_id="' + section_id + '",subsection_id="' + subsection_id + '",weightage="' + weightage + '",max_marks="' + max_marks + '" where id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO assessment_questions SET assessment_id="' + assessment_id + '",question_title="' + question_title + '",question_number="' + question_number + '",question_description="' + question_description + '",option1="' + option1 + '",option1_marks="' + option1_marks + '",option2="' + option2 + '",option2_marks="' + option2_marks + '",option3="' + option3 + '",option3_marks="' + option3_marks + '",option4="' + option4 + '",option4_marks="' + option4_marks + '",option5="' + option5 + '",option5_marks="' + option5_marks + '",option1_image="' + option1_image + '",option2_image="' + option2_image + '",option3_image="' + option3_image + '",option4_image="' + option4_image + '",option5_image="' + option5_image + '",section_id="' + section_id + '",subsection_id="' + subsection_id + '",weightage="' + weightage + '",status="1",max_marks="' + max_marks + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"assessment_questions updated successfully","cmd":"assessment_questions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessment_questions"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

function assessment_questions_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	var start = '0';
	var limit = '';
	var assessment_id = '';
	var quiz_id = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.quiz_id != 'undefined' && userdata.quiz_id != '') {
		quiz_id = userdata.quiz_id;
	}
	pool.getConnection(function (err, connection) {
		if (assessment_id != '') {
			Keyconditoin += ' AND assessment_questions.assessment_id =' + assessment_id + '';
		}

		if (quiz_id != '') {
			Keyconditoin += ' AND assessment_questions.quiz_id =' + quiz_id + '';
		}

		if (limit != '') {
			detailsquery = 'SELECT assessment_questions.* from assessment_questions where assessment_questions.status !="2" ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT assessment_questions.* from assessment_questions where assessment_questions.status !="2" ' + Keyconditoin + '';
		}

		var countquery = 'SELECT count(*) as count from assessment_questions WHERE assessment_questions.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson =
							'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"assessment_questions"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"assessment_questions","data":[], "cmd":"assessment_questions"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function assessment_questions_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var slug = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.slug != 'undefined' && userdata.slug != '') {
		slug = userdata.slug;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM assessment_questions WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"assessment_questions details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessment_questions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function update_assessment_questions_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE assessment_questions SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"assessment_questions"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"assessment_questions"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//
function admin_school_payout_list(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var student_id = '';
	var from_date = '';
	var to_date = '';
	var paid = '';
	var Keyconditoin = '';
	var keyword = '';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	if (typeof userdata.from_date != 'undefined' && userdata.from_date != '') {
		from_date = userdata.from_date;
	}

	if (typeof userdata.to_date != 'undefined' && userdata.to_date != '') {
		to_date = userdata.to_date;
	}

	if (typeof userdata.paid != 'undefined' && userdata.paid != '') {
		paid = userdata.paid;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (school_id != '') {
			Keyconditoin += ' AND school_payouts.school_id ="' + school_id + '"';
		}

		if (student_id != '') {
			Keyconditoin += ' AND school_payouts.student_id ="' + student_id + '"';
		}

		if (from_date != '') {
			Keyconditoin += ' AND school_payouts.created >="' + from_date + '" ';
		}
		if (to_date != '') {
			Keyconditoin += ' AND school_payouts.created <="' + to_date + '" ';
		}
		if (paid != '') {
			Keyconditoin += ' AND school_payouts.paid ="' + paid + '" ';
		}
		if (keyword != '') {
			Keyconditoin += ' AND (student.name LIKE  "%' + keyword + '%" OR courses.course_name LIKE  "%' + keyword + '%" OR student.phone LIKE  "%' + keyword + '%")';
		}
		detailsquery =
			'SELECT school_payouts.*,student.name,student.email,student.phone,student.parents_name,courses.course_name,schools.name as school_name from school_payouts LEFT JOIN users as student ON student.id = school_payouts.student_id LEFT JOIN courses as courses ON courses.id = school_payouts.course_id LEFT JOIN schools as schools ON schools.id = school_payouts.school_id  where school_payouts.status !="2" ' + Keyconditoin + ' ORDER BY school_payouts.created DESC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_payouts_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"school_payouts_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function generate_school_payout(userdata, pool, callback) {
	var resultJson = '';
	var remarks = '';
	var mdde_of_payment = '';
	var neft_details = '';
	var cheque_no = '';
	var payment_date = '';
	var course_id = '';
	var school_id = '';
	var school_payout_id = '';
	var amount = '';

	if (typeof userdata.remarks != 'undefined' && userdata.remarks != '') {
		remarks = userdata.remarks;
	}

	if (typeof userdata.mdde_of_payment != 'undefined' && userdata.mdde_of_payment != '') {
		mdde_of_payment = userdata.mdde_of_payment;
	}

	if (typeof userdata.neft_details != 'undefined' && userdata.neft_details != '') {
		neft_details = userdata.neft_details;
	}
	if (typeof userdata.cheque_no != 'undefined' && userdata.cheque_no != '') {
		cheque_no = userdata.cheque_no;
	}
	if (typeof userdata.payment_date != 'undefined' && userdata.payment_date != '') {
		payment_date = userdata.payment_date;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	if (typeof userdata.school_payout_id != 'undefined' && userdata.school_payout_id != '') {
		school_payout_id = userdata.school_payout_id;
	}

	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}


	var ToDate = new Date();

	var Curdate = ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate();
	var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() + ":" + ToDate.getSeconds();
	console.log('-CurTime-');
	console.log(Curdate + '-' + CurTime);

	pool.getConnection(function (err, connection) {

		console.log(queryinsert);
		var queryinsert = 'INSERT INTO school_generated_payouts SET remarks="' + remarks + '",mdde_of_payment="' + mdde_of_payment + '",neft_details="' + neft_details + '",cheque_no="' + cheque_no + '",payment_date="' + payment_date + '",course_id="' + course_id + '",school_id="' + school_id + '",amount="' + amount + '",created= NOW()';
		console.log('----------');
		console.log('queryinsert', queryinsert);
		connection.query(queryinsert, function (errInsert, InsertRes) {
			if (errInsert) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '","cmd":"appointment_note_add"}\n';
				console.log(resultJson);
				connection.release();
				callback(400, null, resultJson);
				return;
			} else {
				console.log('InsertRes', InsertRes)
				var generated_payout_id = InsertRes.insertId;
				async.eachSeries(school_payout_id, function (rec2, loop2) {
					console.log("in user result array");

					console.log('Payout-id', rec2);
					Uquery = 'UPDATE school_payouts SET paid="1",generated_payout_id="' + generated_payout_id + '" WHERE id = ' + rec2 + '';

					console.log('Uquery', Uquery)
					connection.query(Uquery, function (errPre, Predetails) {
						if (errPre) {
							console.log('errPre.message', errPre.message)
							loop2();
						} else {
							loop2();
						}
					})

				}, function (errInsert) {
					if (errInsert) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '", "cmd":"send"}';
						console.log(resultJson);
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {

						resultJson = '{"replyCode":"success","replyMsg":"Payout generated successfully", "cmd":"send"}';
						console.log(resultJson);
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				})
			}
		})

	});
}



function admin_user_generated_payout_list(userdata, pool, callback) {
	var resultJson = '';
	var user_id = '';
	var from_date = '';
	var to_date = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.from_date != 'undefined' && userdata.from_date != '') {
		from_date = userdata.from_date;
	}

	if (typeof userdata.to_date != 'undefined' && userdata.to_date != '') {
		to_date = userdata.to_date;
	}
	pool.getConnection(function (err, connection) {
		if (user_id != '') {
			Keyconditoin += ' AND user_generated_payouts.user_id ="' + user_id + '"';
		}
		if (from_date != '') {
			Keyconditoin += ' AND user_generated_payouts.created >="' + from_date + '" ';
		}
		if (to_date != '') {
			Keyconditoin += ' AND user_generated_payouts.created <="' + to_date + '" ';
		}
		// if (learning != '') {
		// 	Keyconditoin = ' AND user_generated_payouts.learning LIKE  "' + learning + '"';
		// }
		detailsquery = 'SELECT user_generated_payouts.*,users.name,users.address,users.state,users.email,users.phone,courses.course_name from user_generated_payouts LEFT JOIN users as users ON users.id = user_generated_payouts.user_id LEFT JOIN courses as courses ON courses.id = user_generated_payouts.course_id  where user_generated_payouts.status !="2" ' + Keyconditoin + ' ORDER BY user_generated_payouts.created DESC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"user_generated_payouts_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"user_generated_payouts_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function admin_user_wallet_list(userdata, pool, callback) {
	var resultJson = '';
	var user_id = '';
	var paid = '';
	var from_date = '';
	var to_date = '';
	var sponsor_id = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.sponsor_id != 'undefined' && userdata.sponsor_id != '') {
		sponsor_id = userdata.sponsor_id;
	}

	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.from_date != 'undefined' && userdata.from_date != '') {
		from_date = userdata.from_date;
	}

	if (typeof userdata.to_date != 'undefined' && userdata.to_date != '') {
		to_date = userdata.to_date;
	}
	if (typeof userdata.paid != 'undefined' && userdata.paid != '') {
		paid = userdata.paid;
	}
	pool.getConnection(function (err, connection) {
		if (user_id != '') {
			Keyconditoin += ' AND user_wallet.user_id ="' + user_id + '"';
		}

		if (sponsor_id != '') {
			Keyconditoin += ' AND user_wallet.sponsor_id ="' + sponsor_id + '"';
		}

		if (paid != '') {
			Keyconditoin += ' AND user_wallet.paid ="' + paid + '"';
		}

		if (from_date != '') {
			Keyconditoin += ' AND user_wallet.created >="' + from_date + '" ';
		}
		if (to_date != '') {
			Keyconditoin += ' AND user_wallet.created <="' + to_date + '" ';
		}

		detailsquery = 'SELECT user_wallet.*,users.name,users.address,users.state,users.email,users.phone,sponser.name,sponser.address,sponser.state,sponser.email,sponser.phone from user_wallet LEFT JOIN users as users ON users.id = user_wallet.user_id LEFT JOIN users as sponser ON sponser.id = user_wallet.sponsor_id  where user_wallet.status !="2" ' + Keyconditoin + ' ORDER BY user_wallet.created DESC LIMIT 120';
		console.log('detailsquery------', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					console.log('111')
				'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"user_wallet_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				console.log('222')
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"user-walletlist"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function generate_user_payout(userdata, pool, callback) {
	var resultJson = '';
	var remarks = '';
	var mdde_of_payment = '';
	var neft_details = '';
	var cheque_no = '';
	var payment_date = '';
	var course_id = '';
	var user_id = '';
	var user_payout_id = '';
	var amount = '';
	var coupon_code = '';

	if (typeof userdata.remarks != 'undefined' && userdata.remarks != '') {
		remarks = userdata.remarks;
	}

	if (typeof userdata.mdde_of_payment != 'undefined' && userdata.mdde_of_payment != '') {
		mdde_of_payment = userdata.mdde_of_payment;
	}

	if (typeof userdata.neft_details != 'undefined' && userdata.neft_details != '') {
		neft_details = userdata.neft_details;
	}
	if (typeof userdata.cheque_no != 'undefined' && userdata.cheque_no != '') {
		cheque_no = userdata.cheque_no;
	}
	if (typeof userdata.payment_date != 'undefined' && userdata.payment_date != '') {
		payment_date = userdata.payment_date;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.user_payout_id != 'undefined' && userdata.user_payout_id != '') {
		user_payout_id = userdata.user_payout_id;
	}

	if (typeof userdata.amount != 'undefined' && userdata.amount != '') {
		amount = userdata.amount;
	}
	if (typeof userdata.coupon_code != 'undefined' && userdata.coupon_code != '') {
		coupon_code = userdata.coupon_code;
	}


	var ToDate = new Date();

	var Curdate = ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate();
	var CurTime = ToDate.getHours() + ":" + ToDate.getMinutes() + ":" + ToDate.getSeconds();
	console.log('-CurTime-');
	console.log(Curdate + '-' + CurTime);

	pool.getConnection(function (err, connection) {

		console.log(queryinsert);
		var queryinsert = 'INSERT INTO user_generated_payouts SET remarks="' + remarks + '",mdde_of_payment="' + mdde_of_payment + '",neft_details="' + neft_details + '",cheque_no="' + cheque_no + '",payment_date="' + payment_date + '",course_id="' + course_id + '",amount="' + amount + '",coupon_code="' + coupon_code + '",user_id="' + user_id + '",created= NOW()';
		console.log('----------');
		console.log('queryinsert', queryinsert);
		connection.query(queryinsert, function (errInsert, InsertRes) {
			if (errInsert) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '","cmd":"generate_user_payout"}\n';
				console.log(resultJson);
				connection.release();
				callback(400, null, resultJson);
				return;
			} else {
				console.log('InsertRes', InsertRes)
				var generated_payout_id = InsertRes.insertId;
				async.eachSeries(user_payout_id, function (rec2, loop2) {
					console.log("in user result array");

					console.log('Payout-id', rec2);
					Uquery = 'UPDATE user_wallet SET paid="1",generated_payout_id="' + generated_payout_id + '" WHERE id = ' + rec2 + '';

					console.log('Uquery', Uquery)
					connection.query(Uquery, function (errPre, Predetails) {
						if (errPre) {
							console.log('errPre.message', errPre.message)
							loop2();
						} else {
							loop2();
						}
					})

				}, function (errInsert) {
					if (errInsert) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '", "cmd":"send"}';
						console.log(resultJson);
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {

						resultJson = '{"replyCode":"success","replyMsg":"Payout generated successfully", "cmd":"send"}';
						console.log(resultJson);
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				})
			}
		})

	});
}



function fetch_assesment_report_student(userdata, pool, callback) {
	var resultJson = '';
	var student_id = '';
	// data = {
	// 	"live_class":{"count":"4","coins":"12"},
	// 	"recorded_class":{"count":"4","coins":"12"},
	// 	"robotics":{"count":"4","coins":"12"},
	// 	"rhymes":{"count":"4","coins":"12"},
	// 	"stories":{"count":"4","coins":"12"},
	// 	"bonus":{"count":"4","coins":"12"},
	// }
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	pool.getConnection(function (err, connection) {
		detailsquery = 'Select student_lessons_status_pie.id,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="story") as stories ,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="rhyme") as rhymes,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="bonus") as bonus,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="recorded") as recorded_class,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="live") as live_class,(Select count(student_id) from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" and student_lessons_status_pie.type="diy") as robotics from student_lessons_status_pie where student_lessons_status_pie.student_id="' + student_id + '" LIMIT 1';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"fetch_assesment_report_student"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails[0]) + ',"cmd":"fetch_assesment_report_student"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});

	});
}


function fetchStudentAssessmentReport(userdata, pool, callback) {
	var resultJson = '';
	var assessment_id = '';
	var student_id = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	pool.getConnection(function (err, connection) {

		detailsquery = 'Select result.*,(scores_under/total_students)*100 percentile from (Select summary.*,ROUND((summary.equivalent/summary.max_marks)*100,0) as percent, toppers.equivalent highest_equivalent,(Select count(DISTINCT(student_id)) from section_summary where section_id=summary.section_id and section_summary.assessment_id="' + assessment_id + '") total_students,(Select sections.title from sections where sections.id=summary.section_id) as section_title,(Select count(DISTINCT(student_id)) from section_summary where section_summary.equivalent<summary.equivalent and section_id=summary.section_id and section_summary.assessment_id="' + assessment_id + '" and section_summary.student_id!=summary.student_id) scores_under from section_summary summary join toppers on summary.section_id=toppers.section_id where toppers.assessment_id="' + assessment_id + '" and summary.assessment_id="' + assessment_id + '") as result where student_id="' + student_id + '";';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"user_wallet_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"user_wallet_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function fetchStudentAssessmentReportBix(userdata, pool, callback) {
	var resultJson = '';
	var assessment_id = '';
	var student_id = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}

	pool.getConnection(function (err, connection) {

		detailsquery = 'Select result.*,(scores_under/total_students)*100 percentile from (Select summary.*,ROUND((summary.equivalent/summary.max_marks)*100,0) as percent, toppers.equivalent highest_equivalent,(Select count(DISTINCT(student_id)) from section_summary where section_id=summary.section_id and section_summary.assessment_id="' + assessment_id + '") total_students,(Select sections.title from sections where sections.id=summary.section_id) as section_title,(Select count(DISTINCT(student_id)) from section_summary where section_summary.equivalent<summary.equivalent and section_id=summary.section_id and section_summary.assessment_id="' + assessment_id + '" and section_summary.student_id!=summary.student_id) scores_under from section_summary summary join toppers on summary.section_id=toppers.section_id where toppers.assessment_id="' + assessment_id + '" and summary.assessment_id="' + assessment_id + '") as result where student_id="' + student_id + '";';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"user_wallet_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"user_wallet_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//Student assesment list

function student_assesment_list(userdata, pool, callback) {
	var resultJson = '';
	var student_id = "";
	var assessment_id = "";
	var month = "";
	var status = "";
	var learning = "";
	var Keyconditoin = "";
	if (typeof userdata.month != 'undefined' && userdata.month != '') {
		month = userdata.month;
	}
	if (typeof userdata.assessment_id != 'undefined' && userdata.assessment_id != '') {
		assessment_id = userdata.assessment_id;
	}
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	pool.getConnection(function (err, connection) {
		if (assessment_id != '') {
			Keyconditoin += ' AND student_assessments.assessment_id ="' + assessment_id + '"';
		}

		if (month != '') {
			Keyconditoin += ' AND student_assessments.month ="' + month + '"';
		}
		if (status != '') {
			Keyconditoin += ' AND student_assessments.status ="' + status + '"';
		}
		if (learning != '') {
			Keyconditoin += ' AND student_assessments.learning ="' + learning + '"';
		}



		detailsquery = 'SELECT student_assessments.*,(SELECT quiz_id from assessment_marks where assessment_id=student_assessments.assessment_id AND assessment_marks.student_id ="' + student_id + '" order by assessment_marks.int DESC limit 1 ) as quizzz_id,classes.class_number,users.name,assessments.title as assement_title from student_assessments LEFT JOIN assessments as assessments ON assessments.id = student_assessments.assessment_id LEFT JOIN users as users ON users.id = student_assessments.student_id LEFT JOIN classes as classes ON classes.id = student_assessments.class_id  where student_assessments.student_id ="' + student_id + '" AND student_assessments.status !="2" ' + Keyconditoin + ' ORDER BY student_assessments.created DESC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"student_assesment_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"student_assesment_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//ass

function fetchStudentAssessmentReportAll(userdata, pool, callback) {
	var resultJson = '';
	var student_id = '';
	var learning = '';
	var Keyconditoin = '';
	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (learning != '') {
		Keyconditoin += ' AND assessments.learning ="' + learning + '"';
	}
	pool.getConnection(function (err, connection) {
		// var ToDate = new Date();
		// ToDate.setHours(ToDate.getHours()-5.30)
		// var Curdate =ToDate.getFullYear()+"-"+ parseInt(ToDate.getMonth()+1)+"-"+ ToDate.getDate();
		// var CurTime = ToDate.getHours() +":" + ToDate.getMinutes() +":" + ToDate.getSeconds();
		// var constentTime = Curdate+' '+CurTime;
		// console.log('-constentTime-');
		// console.log(constentTime);
		detailsquery = 'SELECT student_assessments.assessment_id,classes.class_number,assessments.title,student_assessments.updated,assessments.learning,SUM(equivalent) as equivalent FROM learning_bix.section_summary join assessments on section_summary.assessment_id=assessments.id join student_assessments on student_assessments.assessment_id=assessments.id LEFT JOIN classes as classes ON classes.id = student_assessments.class_id  where student_assessments.student_id="' + student_id + '" AND DATEDIFF(student_assessments.updated,NOW())<2 ' + Keyconditoin + '  and learning_bix.section_summary.student_id ="' + student_id + '" group by student_assessments.assessment_id;';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"fetchStudentAssessmentReportAll"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"fetchStudentAssessmentReportAll"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function update_student_assessments_info(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var teacher_name = '';
	var teacher_remarks = '';
	var teacher_percent = '';
	var teacher_weightage = '';
	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.teacher_percent != 'undefined' && userdata.teacher_percent != '') {
		teacher_percent = userdata.teacher_percent;
	}
	if (typeof userdata.teacher_remarks != 'undefined' && userdata.teacher_remarks != '') {
		teacher_remarks = userdata.teacher_remarks;
	}
	if (typeof userdata.teacher_name != 'undefined' && userdata.teacher_name != '') {
		teacher_name = userdata.teacher_name;
	}
	if (typeof userdata.teacher_weightage != 'undefined' && userdata.teacher_weightage != '') {
		teacher_weightage = userdata.teacher_weightage;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE student_assessments SET teacher_name="' + teacher_name + '",teacher_remarks="' + teacher_remarks + '",teacher_percent="' + teacher_percent + '",teacher_weightage="' + teacher_weightage + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Info chenged Successfully","cmd":"student_assessments"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_assessments"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// cron studnet assesment create

function student_assesment_cron(userdata, pool, callback) {
	var resultJson = '';
	pool.getConnection(function (err, connection) {
		Catquery = 'Select * from (Select scs.student_id,course_id,(Select a.id from courses_assessment ca join assessments a on ca.assessment_id =a.id where ca.course_id=scs.course_id and a.`month`=1) assessment_id ,(Select a.month from courses_assessment ca join assessments a on ca.assessment_id =a.id where ca.course_id=scs.course_id and a.`month`=1) month ,(Select a.learning from courses_assessment ca join assessments a on ca.assessment_id =a.id where ca.course_id=scs.course_id and a.`month`=1 AND a.learning="1") learning,DATEDIFF(NOW(),course_start_date) difference from student_course_subscription scs left join student_assessments sa on sa.student_id =scs.student_id where DATEDIFF(NOW(),course_start_date) BETWEEN 30 AND 300 AND sa.`month` IS NULL) result_row where assessment_id IS NOT NULL';

		console.log('cron-qq', Catquery)
		connection.query(Catquery, function (errinsert, resPro) {
			if (!errinsert) {
				var i = 0;
				async.eachSeries(resPro, function (rec2, loop2) {

					var student_id = rec2.student_id;
					var assessment_id = rec2.assessment_id;
					var month = rec2.month;
					var learning = rec2.learning;

					SelQuery = 'SELECT * from student_assessments where student_id = "' + student_id + '" AND assessment_id="' + assessment_id + '" AND month="' + month + '" AND learning="' + learning + '"';
					console.log('SelQuery', SelQuery);
					connection.query(SelQuery, function (errContent, resContent) {
						if (errContent) {
							console.log('errSelpiMG', errContent);

							loop2();
						} else {
							if (resContent.length > 0) {
								console.log('Already exist assesment', assessment_id);
								console.log('student_id', student_id);
								loop2();
							} else {
								inserQuery = 'INSERT INTO student_assessments SET student_id = "' + student_id + '",assessment_id="' + assessment_id + '",month="' + month + '",learning="' + learning + '",status="0",created=NOW()';
								connection.query(inserQuery, function (errInsert, resInsert) {
									if (errInsert) {
										console.log('errInsert', errInsert);

										loop2();
									} else {
										console.log('Assesment created', resInsert.insertId);
										loop2();
									}
								})

							}

						}
						i = i + 1;
					});

				}, function (errinsertDet) {
					if (errinsertDet) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"student_assesment_cron"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						// var Pointsquery ='UPDATE student_quizzes SET points_earned = "'+total_points+'" WHERE id = "'+student_quiz_id+'"';
						// console.log(Pointsquery);
						// connection.query(Pointsquery);
						resultJson = '{"replyCode":"success","replyMsg":"Assesment created successfully","cmd":"student_assesment_cron"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;

					}
				});
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_assesment_cron"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



/* banner list */
function class_duration_template_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var course_type = '';
	var result = [];
	var is_admin = '1';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.is_admin != 'undefined' && userdata.is_admin != '') {
		is_admin = userdata.is_admin;
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}

	if (course_type == '3') {
		Keyconditoin += ' AND courses.course_type ="3"';
	}else if (course_type == '4') {
		Keyconditoin += ' AND courses.course_type ="4"';
	} else {
		Keyconditoin += ' AND courses.course_type !="3"';
	}

	pool.getConnection(function (err, connection) {
		if (is_admin == '0') {

			var Catquery = 'SELECT class_duration_template.*,courses.course_name,courses.course_type FROM class_duration_template  LEFT JOIN courses as courses ON courses.id = class_duration_template.course_id WHERE class_duration_template.status ="1" ' + Keyconditoin + ' ORDER BY class_duration_template.id DESC';
		} else {
			var Catquery = 'SELECT class_duration_template.*,courses.course_name,courses.course_type FROM class_duration_template  LEFT JOIN courses as courses ON courses.id = class_duration_template.course_id WHERE class_duration_template.status !="2" ' + Keyconditoin + ' ORDER BY class_duration_template.id DESC';
		}

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sub_admin_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"Banner list","data":' + JSON.stringify(result) + ', "cmd":"sub_admin_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_class_duration_template(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var class_name = '';
	var ctype = '1';
	var days = '';
	var sno = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}
	if (typeof userdata.days != 'undefined' && userdata.days != '') {
		days = userdata.days;
	}
	if (typeof userdata.sno != 'undefined' && userdata.sno != '') {
		sno = userdata.sno;
	}
	if (typeof userdata.ctype != 'undefined' && userdata.ctype != '') {
		ctype = userdata.ctype;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE class_duration_template SET course_id="' + course_id + '",class_name="' + class_name + '",days="' + days + '",ctype="' + ctype + '",sno="' + sno + '" where class_duration_template.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO class_duration_template SET course_id="' + course_id + '",class_name="' + class_name + '",days="' + days + '",sno="' + sno + '",ctype="' + ctype + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"class duration template updated successfully","cmd":"class duration template"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class duration template"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/* class duration template details */
function class_duration_template_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT class_duration_template.* FROM class_duration_template WHERE class_duration_template.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"class_duration_template"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"class duration template Details","data":' +
					JSON.stringify(ordData[0]) +
					',"cmd":"class_duration_template"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//update class_duration_template status
function update_class_duration_template_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE class_duration_template SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_class_duration_template_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_class_duration_template_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//Youtube classes

function admin_youtube_classes_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var Keyconditoin = '';
	var result = [];
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}


	pool.getConnection(function (err, connection) {

		var Catquery = 'SELECT youtube_classes.*,age_group.title FROM youtube_classes LEFT JOIN age_group as age_group ON age_group.id = youtube_classes.age_group_id WHERE youtube_classes.status !="2" ORDER BY youtube_classes.id DESC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"admin_youtube_classes_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"Banner list","data":' + JSON.stringify(result) + ', "cmd":"admin_youtube_classes_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_youtube_classes(userdata, pool, callback) {
	var resultJson = '';
	var class_title = '';
	var class_description = '';
	var youtube_link = '';
	var age_group_id = '';
	var live_date = '';
	var live_time = '';
	var zoom_link = '';
	var robotics_type = '';
	var class_name = '';
	var course_id = '';
	var id = '';
	var youtube_class_id = '';
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.class_description != 'undefined' && userdata.class_description != '') {
		class_description = userdata.class_description;
	}
	if (typeof userdata.class_title != 'undefined' && userdata.class_title != '') {
		class_title = userdata.class_title;
	}
	if (typeof userdata.youtube_link != 'undefined' && userdata.youtube_link != '') {
		youtube_link = userdata.youtube_link;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.live_date != 'undefined' && userdata.live_date != '') {
		live_date = userdata.live_date;
	}
	if (typeof userdata.live_time != 'undefined' && userdata.live_time != '') {
		live_time = userdata.live_time;
	}

	if (typeof userdata.zoom_link != 'undefined' && userdata.zoom_link != '') {
		zoom_link = userdata.zoom_link;
	}
	if (typeof userdata.robotics_type != 'undefined' && userdata.robotics_type != '') {
		robotics_type = userdata.robotics_type;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}

	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE youtube_classes SET class_title="' + class_title + '",class_description="' + class_description + '",youtube_link="' + youtube_link + '",age_group_id="' + age_group_id + '",live_date="' + live_date + '",live_time="' + live_time + '",class_name="0",zoom_link="' + zoom_link + '",robotics_type="' + robotics_type + '",course_id="' + course_id + '" where youtube_classes.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO youtube_classes SET class_title="' + class_title + '",class_description="' + class_description + '",youtube_link="' + youtube_link + '",age_group_id="' + age_group_id + '",live_date="' + live_date + '",live_time="' + live_time + '",class_name="0",zoom_link="' + zoom_link + '",robotics_type="' + robotics_type + '",course_id="' + course_id + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (id != '') {
					youtube_class_id = id;
				} else {
					youtube_class_id = resultinsert.insertId;
				}
				DeleteQuery = 'DELETE FROM youtube_class_classes WHERE youtube_class_id="' + youtube_class_id + '"';
				console.log('DeleteQuery', DeleteQuery);
				connection.query(DeleteQuery);
				if (class_name != "") {



					async.eachSeries(class_name, function (rec2, loop2) {
						console.log("in user result array");

						console.log('assesment-id', rec2);
						Uquery = 'INSERT INTO youtube_class_classes SET youtube_class_id="' + youtube_class_id + '",class_name="' + rec2 + '"';

						console.log('Uquery', Uquery);
						connection.query(Uquery, function (errPre, Predetails) {
							if (errPre) {
								console.log('errPre.message', errPre.message)
								loop2();
							} else {
								loop2();
							}
						})

					}, function (errInsert) {
						if (errInsert) {
							resultJson = '{"replyCode":"error","replyMsg":"' + errInsert.message + '", "cmd":"send"}';
							console.log(resultJson);
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {


							resultJson = '{"replyCode":"success","replyMsg":"class duration template updated successfully","cmd":"class duration template"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					})

				} else {

					resultJson = '{"replyCode":"success","replyMsg":"class duration template updated successfully","cmd":"class duration template"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class duration template"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/* class duration template details */
function youtube_classes_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT youtube_classes.* FROM youtube_classes WHERE youtube_classes.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"youtube_classes"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				variantPro = 'SELECT youtube_class_classes.* from youtube_class_classes where youtube_class_classes.youtube_class_id="' + id + '"';
				console.log('variantPro', variantPro);
				connection.query(variantPro, function (errVar, resSelProVar) {
					if (errVar) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errVar.message + '","cmd":"product_details"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						console.log('resSelProVar', resSelProVar);
						if (resSelProVar.length > 0) {
							ordData[0].classes = resSelProVar;
						} else {
							ordData[0].classes = [];
						}
						resultJson = '{"replyCode":"success","replyMsg":"youtube classes Details","data":' + JSON.stringify(ordData[0]) + ',"cmd":"youtube_classes"}\n';
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


//update youtube_classes status
function update_youtube_classes_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE youtube_classes SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_youtube_classes_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_youtube_classes_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//Awards


function awards_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var type = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND awards.title LIKE  "%' + keyword + '%"';
		}

		if (type != '') {
			Keyconditoin = ' AND awards.type ="' + type + '"';
		}

		detailsquery = 'SELECT awards.*,winner1.name as winner1_name,winner1.image as winner1_image,winner1.school_name as winner1_schoolname,winner2.name as winner2_name,winner2.image as winner2_image,winner2.school_name as winner2_schoolname,winner3.name as winner3_name,winner3.image as winner3_image,winner3.school_name as winner3_schoolname  from awards LEFT JOIN users as winner1 ON winner1.id = awards.winner1 LEFT JOIN users as winner2 ON winner2.id = awards.winner2 LEFT JOIN users as winner3 ON winner3.id = awards.winner3   where awards.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"awards_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"awards_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function web_awards_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var type = '';
	var month = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND awards.title LIKE  "%' + keyword + '%"';
		}

		if (type != '') {
			Keyconditoin = ' AND awards.type ="' + type + '"';
		}
		if (month != '') {
			Keyconditoin = ' AND awards.month ="' + month + '"';
		}

		detailsquery = 'SELECT awards.*,winner1.name as winner1_name,winner1.image as winner1_image,winner1.school_name as winner1_schoolname,winner2.name as winner2_name,winner2.image as winner2_image,winner2.school_name as winner2_schoolname,winner3.name as winner3_name,winner3.image as winner3_image,winner3.school_name as winner3_schoolname  from awards LEFT JOIN users as winner1 ON winner1.id = awards.winner1 LEFT JOIN users as winner2 ON winner2.id = awards.winner2 LEFT JOIN users as winner3 ON winner3.id = awards.winner3   where awards.status ="1" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"awards_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"awards_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function add_awards(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var month = '';
	var type = '';
	var winner1 = '';
	var winner1_points = '';
	var winner2 = '';
	var winner2_points = '';
	var winner3 = '';
	var winner3_points = '';
	var remarks = '';
	var value1 = '';
	var value2 = '';
	var value3 = '';

	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.month != 'undefined' && userdata.month != '') {
		month = userdata.month;
	}
	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	if (typeof userdata.winner1 != 'undefined' && userdata.winner1 != '') {
		winner1 = userdata.winner1;
	}
	if (typeof userdata.winner1_points != 'undefined' && userdata.winner1_points != '') {
		winner1_points = userdata.winner1_points;
	}
	if (typeof userdata.winner2 != 'undefined' && userdata.winner2 != '') {
		winner2 = userdata.winner2;
	}
	if (typeof userdata.winner2_points != 'undefined' && userdata.winner2_points != '') {
		winner2_points = userdata.winner2_points;
	}
	if (typeof userdata.winner3 != 'undefined' && userdata.winner3 != '') {
		winner3 = userdata.winner3;
	}
	if (typeof userdata.winner3_points != 'undefined' && userdata.winner3_points != '') {
		winner3_points = userdata.winner3_points;
	}
	if (typeof userdata.value1 != 'undefined' && userdata.value1 != '') {
		value1 = userdata.value1;
	}
	if (typeof userdata.value2 != 'undefined' && userdata.value2 != '') {
		value2 = userdata.value2;
	}
	if (typeof userdata.value3 != 'undefined' && userdata.value3 != '') {
		value3 = userdata.value3;
	}
	if (typeof userdata.remarks != 'undefined' && userdata.remarks != '') {
		remarks = userdata.remarks;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE awards SET title="' + title + '",month="' + month + '",type="' + type + '",winner1="' + winner1 + '",winner1_points="' + winner1_points + '",winner2="' + winner2 + '",winner2_points="' + winner2_points + '",winner3="' + winner3 + '",winner3_points="' + winner3_points + '",value1="' + value1 + '",value2="' + value2 + '",value3="' + value3 + '",remarks="' + remarks + '",modified=NOW() where awards.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO awards SET title="' + title + '",month="' + month + '",type="' + type + '",winner1="' + winner1 + '",winner1_points="' + winner1_points + '",winner2="' + winner2 + '",winner2_points="' + winner2_points + '",winner3="' + winner3 + '",winner3_points="' + winner3_points + '",value1="' + value1 + '",value2="' + value2 + '",value3="' + value3 + '",remarks="' + remarks + '",modified=NOW(),created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"awards updated successfully","cmd":"awards"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"awards"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*awards details*/
function awards_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM awards WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"awards details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"awards"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_awards_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE awards SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"awards"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"awards"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//Class languages


function class_languages_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var class_id = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}


	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND class_languages.language_code LIKE  "%' + keyword + '%"';
		}
		if (class_id != '') {
			Keyconditoin = ' AND class_languages.class_id = "' + class_id + '"';
		}

		detailsquery = 'SELECT class_languages.* from class_languages where class_languages.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"class_languages_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"class_languages_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_class_languages(userdata, pool, callback) {
	var resultJson = '';
	var language_code = '';
	var video_url = '';
	var class_id = '';

	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.language_code != 'undefined' && userdata.language_code != '') {
		language_code = userdata.language_code;
	}

	if (typeof userdata.video_url != 'undefined' && userdata.video_url != '') {
		video_url = userdata.video_url;
	}
	if (typeof userdata.class_id != 'undefined' && userdata.class_id != '') {
		class_id = userdata.class_id;
	}


	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE class_languages SET language_code="' + language_code + '",video_url="' + video_url + '",class_id="' + class_id + '" where class_languages.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO class_languages SET language_code="' + language_code + '",video_url="' + video_url + '",class_id="' + class_id + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"class_languages updated successfully","cmd":"class_languages"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class_languages"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*class_languages details*/
function class_languages_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM class_languages WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"class_languages details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class_languages"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_class_languages_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE class_languages SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"class_languages"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"class_languages"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//badges

function add_badges(userdata, pool, callback) {
	var resultJson = '';
	var type = '0';
	var badges_title = '';
	var points = '';
	var image = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.image != 'undefined' && userdata.image != '') {
		image = userdata.image;
	}
	if (typeof userdata.points != 'undefined' && userdata.points != '') {
		points = userdata.points;
	}

	if (typeof userdata.badges_title != 'undefined' && userdata.badges_title != '') {
		badges_title = userdata.badges_title;
	}

	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert =
				'UPDATE badges SET badges_title="' + badges_title + '",points="' + points + '",type="' + type + '",image="' + image + '" where badges.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO badges SET badges_title="' + badges_title + '",points="' + points + '",type="' + type + '",image="' + image + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"badge updated successfully","cmd":"badge"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"badge"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/* badge details */
function badges_details(userdata, pool, callback) {
	var resultJson = '';
	var Cquery = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	pool.getConnection(function (err, connection) {
		Cquery = 'SELECT badges.* FROM badges WHERE badges.id = ' + id + '';

		console.log(Cquery);
		connection.query(Cquery, function (err, ordData) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"badges"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"badge Details","data":' +
					JSON.stringify(ordData[0]) +
					',"cmd":"badges"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//update badge status
function update_badges_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE badges SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_badge_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_badge_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//update student badge point
function update_student_badges_points(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var user_id = '';
	var points = '0';
	var type = '0';//0-Profile update ,1-class attend , 2- Project submit ,3 -quiz questions,4-post create


	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.points != 'undefined' && userdata.points != '') {
		points = userdata.points;
	}

	if (typeof userdata.type != 'undefined' && userdata.type != '') {
		type = userdata.type;
	}
	pool.getConnection(function (err, connection) {
		squery = 'INSERT into user_points SET user_id = "' + user_id + '",points = "' + points + '",type = "' + type + '" , created=NOW();';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_student_badges_points"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_student_badges_points"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function school_enquiry(userdata, pool, callback) {
	var Hashids = require("hashids"), hashids = new Hashids(secretSalt);
	var resultJson = '';
	var contact_person = '';
	var school_name = '';
	var address = '';
	var city = '';
	var state = '';
	var email = '';
	var phone = '';
	var zip_code = '';
	var Uquery = '';
	var page_url = '';

	if (typeof userdata.page_url != 'undefined' && userdata.page_url != '') {
		page_url = userdata.page_url;
	}

	if (typeof userdata.school_name != 'undefined' && userdata.school_name != '') {
		school_name = userdata.school_name;
	}
	if (typeof userdata.contact_person != 'undefined' && userdata.contact_person != '') {
		contact_person = userdata.contact_person;
	}
	if (typeof userdata.address != 'undefined' && userdata.address != '') {
		address = userdata.address;
	}
	if (typeof userdata.city != 'undefined' && userdata.city != '') {
		city = userdata.city;
	}

	if (typeof userdata.state != 'undefined' && userdata.state != '') {
		state = userdata.state;
	}
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}
	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}
	if (typeof userdata.zip_code != 'undefined' && userdata.zip_code != '') {
		zip_code = userdata.zip_code;
	}


	console.log('----------');
	console.log('userdata', userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'INSERT INTO school_enquiry SET school_name="' + school_name + '",contact_person="' + contact_person + '",address="' + address + '",city="' + city + '",state="' + state + '",email="' + email + '",phone="' + phone + '",zip_code="' + zip_code + '",page_url="' + page_url + '",status="1",created=NOW()';
		console.log('Uquery', Uquery)
		connection.query(Uquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Feedback sent Successfully","cmd":"create_support_request"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"create_support_request"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function school_enquiries_list(userdata, pool, callback) {
	var resultJson = '';
	var Keyconditoin = '';
	var keyword = '';
	var start = '0';
	var limit = '';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	if (typeof userdata.start != 'undefined' && userdata.start != '') {
		start = userdata.start;
	}
	if (typeof userdata.limit != 'undefined' && userdata.limit != '') {
		limit = userdata.limit;
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin += ' AND school_enquiry.school_name LIKE  "%' + keyword + '%"';
		}

		if (limit != '') {
			detailsquery = 'SELECT school_enquiry.* from school_enquiry where school_enquiry.status !="2" ' + Keyconditoin + ' LIMIT ' + start + ', ' + limit + '';
		} else {
			detailsquery = 'SELECT school_enquiry.* from school_enquiry where school_enquiry.status !="2" ' + Keyconditoin + '';
		}

		console.log('detailsquery', detailsquery);
		var countquery = 'SELECT count(*) as count from school_enquiry WHERE school_enquiry.status !="2" ' + Keyconditoin + '';
		connection.query(countquery, function (err, responsecount) {
			if (responsecount[0].count > 0) {
				connection.query(detailsquery, function (errSelDetails, resSelDetails) {
					if (errSelDetails) {
						resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"enquiries"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						resultJson =
							'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
							JSON.stringify(resSelDetails) +
							',"totalCount":' + responsecount[0].count + ',"cmd":"enquiries"}\n';
						console.log('res-suceess');
						connection.release();
						callback(200, null, resultJson);
						return;
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"enquiries","data":[], "cmd":"enquiries"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});


	});
}


function update_school_enquiry_status(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';

	var Cquery = '';
	var id = '';
	var status = ''; //0-inactive,1-active,2-delete

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.status != 'undefined' && userdata.status != '') {
		status = userdata.status;
	}
	pool.getConnection(function (err, connection) {
		squery = 'UPDATE school_enquiry SET status = "' + status + '" WHERE id = "' + id + '"';
		connection.query(squery, function (errselect, resultselect) {
			if (!errselect) {
				console.log(resultselect);
				resultJson =
					'{"replyCode":"success","replyMsg":"Record status updated successfully","cmd":"update_school_enquiry_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errselect.message + '","cmd":"update_school_enquiry_status"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// insert courses validation codes

function add_courses_validation_code(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var codes = '';

	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.codes != 'undefined' && userdata.codes != '') {
		codes = userdata.codes;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		async.eachSeries(codes, function (rec2, loop2) {

			var validation_code = rec2.validation_code;

			squery = 'INSERT INTO courses_validate_codes SET course_id = "' + course_id + '",validation_code="' + validation_code + '"';
			console.log('squery', squery);
			connection.query(squery, function (errContent, resContent) {
				if (errContent) {
					console.log('errSelpiMG', errContent);

					loop2();
				} else {

					loop2();
				}

			});

		}, function (errinsertDet) {
			if (errinsertDet) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"add_courses_validation_code"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"Code  submitted successfully","cmd":"add_courses_validation_code"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}
		});
	});
}

//courses validation code list

function courses_validation_code_list(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';


	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	pool.getConnection(function (err, connection) {
		var Catquery =
			'SELECT courses_validate_codes.*,users.name FROM courses_validate_codes as courses_validate_codes LEFT JOIN users as users ON users.id = courses_validate_codes.user_id WHERE  courses_validate_codes.course_id="' + course_id + '" ORDER BY courses_validate_codes.id DESC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"courses_validation_code_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"course validation list","data":' +
					JSON.stringify(result) +
					', "cmd":"courses_validation_code_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function teacher_grade_list(userdata, pool, callback) {
	var resultJson = '';
	var teacher_id = '';


	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}

	pool.getConnection(function (err, connection) {
		proiMGquery = 'SELECT teachers_grades.*,grades.grade_name FROM teachers_grades LEFT JOIN grades as grades ON grades.id = teachers_grades.grade_id WHERE teachers_grades.teacher_id = ' + teacher_id + '';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"teacher_grade_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course validation list","data":' + JSON.stringify(result) + ', "cmd":"teacher_grade_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


function assign_course_to_batch(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var batch_id = '';
	var school_code = '';
	var batch_name = '';
	var students = '';
	var start_date = '';

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	if (typeof userdata.batch_id != 'undefined' && userdata.batch_id != '') {
		batch_id = userdata.batch_id;
	}
	if (typeof userdata.batch_name != 'undefined' && userdata.batch_name != '') {
		batch_name = userdata.batch_name;
	}
	if (typeof userdata.students != 'undefined' && userdata.students != '') {
		students = userdata.students;
	}
	if (typeof userdata.start_date != 'undefined' && userdata.start_date != '') {
		start_date = userdata.start_date;
	}

	console.log('userData', userdata);

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var i = 0;

		async.eachSeries(students, function (rec2, loop2) {
			console.log('student--', rec2);
			var querySelectCourse = 'SELECT class_duration_template.* from class_duration_template WHERE class_name="' + batch_name + '" AND status="1"';
			console.log('querySelectCourse--1', querySelectCourse);
			connection.query(querySelectCourse, function (errSel, resSel) {
				console.log('querySelectCourse--1::::resSel', resSel);
				if (errSel) {
					resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
					connection.release();
					callback(false, resultJson);
					return;
				} else {
					console.log(resSel);
					if (resSel.length > 0) {
						var i = 0;
						var myDate = new Date(start_date);
						console.log('myDate', myDate);
						var courseDays = "0";
						async.eachSeries(resSel, function (rec3, loop3) {
							var course_id = rec3.course_id;
							if (courseDays != "0") {
								myDate.setDate(myDate.getDate() + courseDays);
							}

							NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
							console.log('NewSchDate---', NewSchDate);
							var dataSUb = { "course_id": course_id, "student_id": rec2, "teacher_id": "0", "price": "0", "start_date": NewSchDate, "transaction_id": "0", "school_code": school_code };
							subscribe_course(dataSUb, pool, function (resNew, responseNew) {
								if (resNew == false) {
									courseDays = rec3.days;
									resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"assign_course_to_batch"}\n';
									console.log('res-suceess');
									loop3();
								} else {
									courseDays = rec3.days;
									resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"assign_course_to_batch"}\n';
									loop3();
								}
							})
						}, function (errSelPro) {
							if (errSelPro) {
								console.log('errSelPro', errSelPro);
								resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"assign_course_to_batch"}\n';
								loop2();
							} else {
								resultJson = '{"replyCode":"success","replyMsg":"Course Assigned successfully .","cmd":"assign_course_to_batch"}\n';
								console.log('res-suceess');
								loop2();
							}
						});
					} else {

						console.log('res-err',);
						loop2();
					}
				}
			})

		}, function (errSelPro) {
			if (errSelPro) {
				console.log('errSelPro', errSelPro);
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"assign_course_to_batch"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"course assigned to batch successfully .","cmd":"assign_course_to_batch"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});

	});
}



// Concepts

function concepts_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND concepts.title LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT concepts.* from concepts where concepts.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"concepts_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"concepts_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_concepts(userdata, pool, callback) {
	var resultJson = '';
	var concept = '';
	var concept_description = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.concept != 'undefined' && userdata.concept != '') {
		concept = userdata.concept;
	}

	if (typeof userdata.concept_description != 'undefined' && userdata.concept_description != '') {
		concept_description = userdata.concept_description.replace(/"/g, "'");
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE concepts SET concept="' + concept + '",concept_description="' + concept_description + '" where concepts.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO concepts SET concept="' + concept + '",concept_description="' + concept_description + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"concepts updated successfully","cmd":"concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"concepts"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*concepts details*/
function concepts_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM concepts WHERE id="' + id + '"';

		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"concepts details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_concepts_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE concepts SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"concepts"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function add_chapter_concepts(userdata, pool, callback) {
	var resultJson = '';
	var chapter_id = '';
	var concepts = '';

	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}

	if (typeof userdata.concepts != 'undefined' && userdata.concepts != '') {
		concepts = userdata.concepts;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		DeleteQuery = 'DELETE FROM chapter_concepts WHERE chapter_id="' + chapter_id + '"';
		console.log('DeleteQuery', DeleteQuery);
		connection.query(DeleteQuery);
		async.eachSeries(concepts, function (rec2, loop2) {

			var concept_id = rec2.concept_id;
			var concept_name = rec2.concept_name;


			squery = 'INSERT INTO chapter_concepts SET chapter_id = "' + chapter_id + '",concept_id="' + concept_id + '",concept_name="' + concept_name + '"';
			console.log('squery', squery);
			connection.query(squery, function (errContent, resContent) {
				if (errContent) {
					console.log('errSelpiMG', errContent);

					loop2();
				} else {

					loop2();
				}

			});

		}, function (errinsertDet) {
			if (errinsertDet) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"add_chapter_concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"Code  submitted successfully","cmd":"add_chapter_concepts"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}
		});
	});
}

//add_chapter_concepts list

function chapter_concept_list(userdata, pool, callback) {
	var resultJson = '';
	var chapter_id = '';


	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}

	pool.getConnection(function (err, connection) {
		var Catquery =
			'SELECT chapter_concepts.* FROM chapter_concepts WHERE  chapter_concepts.chapter_id="' + chapter_id + '" ORDER BY chapter_concepts.id DESC';

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"chapter_concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"chapter_concepts list","data":' +
					JSON.stringify(result) +
					', "cmd":"chapter_concepts"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

//fetch user concepts
function fetch_user_concepts(userdata, pool, callback) {
	var resultJson = '';
	var user_id = '';
	var chapter_id = '';

	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}
	if (typeof userdata.chapter_id != 'undefined' && userdata.chapter_id != '') {
		chapter_id = userdata.chapter_id;
	}
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery =
			'SELECT user_concepts.*,(SELECT COUNT(id) from user_concepts WHERE  user_concepts.chapter_id="' + chapter_id + '" AND user_concepts.user_id="' + user_id + '") as total_count FROM user_concepts WHERE  user_concepts.chapter_id="' + chapter_id + '" AND user_concepts.user_id="' + user_id + '"  group by user_concepts.concept_id';
		console.log('Catquery', Catquery);
		connection.query(Catquery, function (errContent, resContent) {
			if (errContent) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errContent.message + '","cmd":"fetch_user_concepts"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"user concepts fetched successfully","cmd":"fetch_user_concepts","data":' + JSON.stringify(resContent) + '}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}

		});
	});
}


function add_school_grade(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var grades = '';

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}

	if (typeof userdata.grades != 'undefined' && userdata.grades != '') {
		grades = userdata.grades;
	}


	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var i = 0;
		DeleteQuery = 'DELETE FROM school_grades WHERE school_id = "' + school_id + '"';
		console.log('DeleteQuery', DeleteQuery);
		connection.query(DeleteQuery);

		async.eachSeries(grades, function (rec2, loop2) {

			var grade_id = rec2.grade_id;
			var grade_name = rec2.grade_name;
			var enabled = rec2.enabled;
			squery = 'INSERT INTO school_grades SET school_id = "' + school_id + '",grade_id="' + grade_id + '",grade_name="' + grade_name + '",enabled="' + enabled + '"';
			console.log('squery', squery);
			connection.query(squery, function (errContent, resContent) {
				if (errContent) {
					console.log('errSelpiMG', errContent);

					loop2();
				} else {

					loop2();
				}
				i = i + 1;
			});

		}, function (errinsertDet) {
			if (errinsertDet) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"add_achool_grade"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"school grade submitted successfully","cmd":"add_achool_grade"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}
		});
	});
}


function robotics_courses_dropdown_list(userdata, pool, callback) {
	var resultJson = '';
	var learning = '0';
	var keyword = '';
	var Keyconditoin = '';
	var Keycourseconditoin = '';
	var type = '3';
	var course_type = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}
	if (typeof userdata.course_type != 'undefined' && userdata.course_type != '') {
		course_type = userdata.course_type;
	}
	if (course_type == '3') {
		Keycourseconditoin += ' AND courses.course_type ="3"';
	}else if (course_type == '4') {
		Keycourseconditoin += ' AND courses.course_type ="4"';
	} else {
		Keycourseconditoin += ' AND courses.course_type ="3"';
	}
	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND courses.course_name LIKE  "%' + keyword + '%"';
		}
		if (learning != '') {
			Keyconditoin = ' AND courses.learning = "' + learning + '"';
		}

		detailsquery = 'SELECT courses.* from courses where courses.status ="1" '+Keycourseconditoin+'' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"courses_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"courses_list"}\n';
				//console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// generate slots
function generate_teacher_slots(userdata, pool, callback) {
	var resultJson = '';
	var user_id = '';

	var Uquery = '';
	if (typeof userdata.user_id != 'undefined' && userdata.user_id != '') {
		user_id = userdata.user_id;
	}

	pool.getConnection(function (err, connection) {
		var checkShecduleDate = 'SELECT * from demo_class_settings where id = "2" ';
		console.log(checkShecduleDate);
		connection.query(checkShecduleDate, function (errSchedule, resultsSchedule) {
			if (errSchedule) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSchedule.message + '","cmd":"generate_teacher_slots"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				console.log('resultsSchedule', resultsSchedule[0]);
				console.log('Curdate', Curdate);
				var teacher_id = user_id;
				var NewSchDate = '';
				for (var i = 0; i <= 29; i++) {
					//repeating code here:
					var myDate = new Date();
					myDate.setDate(myDate.getDate() + i);
					NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();

					var tday = weekday[myDate.getDay()];
					tday = tday.toLowerCase();
					tday = tday.toString(); //console.log(tday);
					console.log(NewSchDate);
					var checkalreadyexist = 'SELECT * from user_time_schedule where teacher_id="' + teacher_id + '" AND schedule_date = "' + NewSchDate + '" ';
					console.log(checkalreadyexist);
					connection.query(checkalreadyexist, function (aleradyerr, alreadyRes) {
						if (aleradyerr) {
							resultJson = '{"replyCode":"error","replyMsg":"' + aleradyerr.message + '","cmd":"generate_teacher_slots"}\n';
							connection.release();
							callback(200, null, resultJson);
							return;
						} else {
							if (alreadyRes.length > 0) {
								console.log('ALREADY SLOTS FOR --', NewSchDate)
							} else {
								if (resultsSchedule[0][tday] == '1') {
									console.log('yes');
									var datequery = 'INSERT INTO user_time_schedule SET teacher_id="' + teacher_id + '",schedule_date = "' + NewSchDate + '", available = "1",holiday = "0",status="1",created= NOW()';
								} else {
									console.log('no');
									var datequery = 'INSERT INTO user_time_schedule SET teacher_id="' + teacher_id + '",schedule_date = "' + NewSchDate + '", available = "0",holiday = "1",status="1",created= NOW()';
								}
								connection.query(datequery, function (errinsertDAte, resultinsertDate) {
									if (!errinsertDAte) {
										var dateId = resultinsertDate.insertId;
										// console.log('--time_from---',resultsSchedule[0].time_from);
										// console.log('--time_to---',resultsSchedule[0].time_to);
										// console.log('--class_duration---',resultsSchedule[0].class_duration);
										var startTime = resultsSchedule[0].time_from;
										var endTime = resultsSchedule[0].time_to;
										var interval = resultsSchedule[0].class_duration;
										while (startTime <= endTime) {
											startTimeTo = startTime;
											startTime = addMinutes(startTime, interval);
											endTimeTo = addMinutes(startTimeTo, interval);
											console.log('Time-slot-startTimeTo', startTimeTo);
											console.log('Time-slot-endTimeTo', endTimeTo);
											console.log('Tdate', NewSchDate);
											var TimeInsertquery = 'INSERT INTO user_time_schedule_slots SET schedule_id="' + dateId + '",teacher_id="' + teacher_id + '",time_from="' + startTimeTo + '",time_to="' + endTimeTo + '",available = "0",holiday = "0",status="1",created= NOW()';
											connection.query(TimeInsertquery);
										}
									} else {
										resultJson =
											'{"replyCode":"error","replyMsg":"' +
											errinsertDAte.message +
											'","cmd":"sign_up"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								});
							}

						}
					})

				}
				resultJson = '{"replyCode":"success","replyMsg":"Registered successfully"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		})
	});
}

function teacher_admin_login(userdata, pool, callback) {
	var resultJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);
	var ResultArray = '';
	var email = '';

	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	} else {
		resultJson = '{"replyCode":"error","replyMsg":"Please insert registered email","cmd":"login"}\n';
		callback(200, null, resultJson);
		return;
	}

	console.log('userdata', userdata);
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + userdata.password);

		squery = 'SELECT users.* from users WHERE email="' + email + '" AND password="' + hash_password + '" AND status="1" AND role_id="5"';
		console.log('ss', squery);
		connection.query(squery, function (err, results) {
			if (!err) {
				if (results.length > 0) {
					if (results[0].status != 1) {
						resultJson = '{"replyCode":"error","replyMsg":"You are not Authorized","cmd":"login"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {
						var sid = hashids.encode(results[0].id);
						ResultArray = results[0];

						console.log('-------------------');
						resultJson =
							'{"replyCode":"success","replyMsg": "success", "data":' +
							JSON.stringify(ResultArray) +
							',"cmd":"login admin"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;

					}
				} else {
					resultJson =
						'{"replyCode":"error","replyMsg":"Please check your login credentials.","cmd":"login"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"login"}\n';
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}


/* user List */
function super_teacher_admin_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var role_id = '3';
	var learning = '';
	var school_code = '';
	var Keyconditoin = ' users.status !="2" AND users.verified="0"';
	var result = [];
	var start = '0';
	var limit = '';
	var subscribed = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
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

	if (typeof userdata.subscribed != 'undefined' && userdata.subscribed != '') {
		subscribed = userdata.subscribed;
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
		if (subscribed != '') {
			if (subscribed == '0') {
				Keyconditoin += ' AND (SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") =0';
			} else {
				Keyconditoin += ' AND (SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") >=1';

			}
		}

		if (limit != '') {
			var Catquery = 'SELECT users.*,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE  ' + Keyconditoin + ' ORDER BY users.id DESC LIMIT ' + start + ', ' + limit + '';
		} else {
			var Catquery = 'SELECT users.*,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE  ' + Keyconditoin + ' ORDER BY users.id DESC';
		}

		console.log('Catquery', Catquery);

		var countquery = 'SELECT count(*) as count from users WHERE ' + Keyconditoin + '';
		// console.log('countquery::::::::::::::::----------',countquery)
		connection.query(countquery, function (err, responsecount) {
			// console.log('responsecount::::::::::::::::----------',responsecount)
			if (responsecount && responsecount[0].count > 0) {
				connection.query(Catquery, function (err, result) {
					if (err) {
						resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"super_teacher_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {

						if (result.length > 0) {
							var i = 0;
							async.eachSeries(
								result,
								function (rec2, loop2) {
									var teacher_id = rec2.id;
									console.log('teacher_id', teacher_id);
									proiMGquery = 'SELECT teachers_grades.*,grades.grade_name FROM teachers_grades LEFT JOIN grades as grades ON grades.id = teachers_grades.grade_id WHERE teachers_grades.teacher_id = ' + teacher_id + '';
									console.log('proiMGquery', proiMGquery);
									connection.query(proiMGquery, function (errSelpiMG, respROiMG) {
										if (errSelpiMG) {
											console.log('errSelpiMG', errSelpiMG);

											loop2();
										} else {
											if (respROiMG.length > 0) {
												result[i].grades = respROiMG;
											} else {
												result[i].grades = [];
											}
											loop2();
										}
										i = i + 1;
									});
								},
								function (errSelpiMG) {
									if (errSelpiMG) {
										console.log('errSelpiMG', errSelpiMG);
										resultJson = '{"replyCode":"error","replyMsg":"' + errSelpiMG.message + '","cmd":"view_classes_info"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										resultJson = '{"replyCode":"success","replyMsg":"User list","data":' + JSON.stringify(result) + ',"totalCount":' + responsecount[0].count + ', "cmd":"super_teacher_list"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							);
						} else {
							resultJson =
								'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"super_teacher_list","data":[], "cmd":"super_teacher_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


//Email templates
function email_templates_list(userdata, pool, callback) {
	var resultJson = '';

	var keyword = '';
	var Keyconditoin = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}

	pool.getConnection(function (err, connection) {
		if (keyword != '') {
			Keyconditoin = ' AND email_templates.title LIKE  "%' + keyword + '%"';
		}
		detailsquery = 'SELECT email_templates.* from email_templates where email_templates.status !="2" ' + Keyconditoin + '';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"email_templates_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) +
					',"cmd":"email_templates_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function add_email_templates(userdata, pool, callback) {
	var resultJson = '';
	var title = '';
	var email_type = '';
	var message = '';
	var sender_name = '';
	var sender_email = '';
	var subject = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.title != 'undefined' && userdata.title != '') {
		title = userdata.title;
	}

	if (typeof userdata.email_type != 'undefined' && userdata.email_type != '') {
		email_type = userdata.email_type;
	}
	if (typeof userdata.sender_name != 'undefined' && userdata.sender_name != '') {
		sender_name = userdata.sender_name;
	}
	if (typeof userdata.sender_email != 'undefined' && userdata.sender_email != '') {
		sender_email = userdata.sender_email;
	}
	if (typeof userdata.subject != 'undefined' && userdata.subject != '') {
		subject = userdata.subject;
	}
	if (typeof userdata.message != 'undefined' && userdata.message != '') {
		message = userdata.message.replace(/"/g, "'");
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE email_templates SET title="' +title +'",email_type="' +email_type +'",sender_name="'+sender_name+'",sender_email="'+sender_email+'",subject="'+subject+'",message="' +message +'" where email_templates.id="' +id +'"';
		} else {
			var queryinsert ='INSERT INTO email_templates SET title="' +title +'",email_type="' +email_type +'",sender_name="'+sender_name+'",sender_email="'+sender_email+'",subject="'+subject+'",message="' +message +'",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"email_templates updated successfully","cmd":"email_templates"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"email_templates"}\n';
				console.log('res-suceess');
				connection.release();
				callback(400, null, resultJson);
				return;
			}
		});
	});
}

/*email_templates details*/
function email_templates_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM email_templates WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"email_templates details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"email_templates"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

// Update stsutus
function update_email_templates_status(userdata, pool, callback) {
	var resultJson = '';
	var id = '';
	var status = '0'; //0-inactive , 1-active , 2- delete
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
		Uquery = 'UPDATE email_templates SET status="' + status + '" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"email_templates"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"email_templates"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


////////////



function redeem_course_code(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var sha1 = require('sha1');
	var Hashids = require('hashids'),
		hashids = new Hashids(secretSalt);

	var name = '';
	var email = '';
	var phone = '';
	var code = '0';
	var dob = '0000-00-00';
	var parents_name = '';
	var mother_name = '';
	var school_name = '';
	var father_name = '';
	var school_code = '';
	var class_name = '';
	var age_group_id = '';
	var gender = '';
	var start_date = '';
	var price = '0';


	var password = '123456';
	if (typeof userdata.code != 'undefined' && userdata.code != '') {
		code = userdata.code;
	}
	if (typeof userdata.email != 'undefined' && userdata.email != '') {
		email = userdata.email;
	}

	if (typeof userdata.name != 'undefined' && userdata.name != '') {
		name = userdata.name;
	}

	if (typeof userdata.phone != 'undefined' && userdata.phone != '') {
		phone = userdata.phone;
	}

	if (typeof userdata.dob != 'undefined' && userdata.dob != '') {
		dob = userdata.dob;
	}

	if (typeof userdata.parent != 'undefined' && userdata.parent != '') {
		parents_name = userdata.parent;
	}
	if (typeof userdata.school != 'undefined' && userdata.school != '') {
		school_name = userdata.school;
	}
	if (typeof userdata.father_name != 'undefined' && userdata.father_name != '') {
		father_name = userdata.father_name;
	}
	if (typeof userdata.mother_name != 'undefined' && userdata.mother_name != '') {
		mother_name = userdata.mother_name;
	}
	if (typeof userdata.class_name != 'undefined' && userdata.class_name != '') {
		class_name = userdata.class_name;
	}
	if (typeof userdata.age_group_id != 'undefined' && userdata.age_group_id != '') {
		age_group_id = userdata.age_group_id;
	}
	if (typeof userdata.gender != 'undefined' && userdata.gender != '') {
		gender = userdata.gender;
	}
	if (typeof userdata.school_code != 'undefined' && userdata.school_code != '') {
		school_code = userdata.school_code;
	}
	if (typeof userdata.start_date != 'undefined' && userdata.start_date != '') {
		start_date = userdata.start_date;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		var hash_password = sha1(secretSalt + password);
		if (validateEmail(email)) {
			console.log(email + " is valid :)");
			checkValidateStudent(userdata, pool, function (responseEmail) {
				console.log(responseEmail);
				if (responseEmail == false) {
					var queryinsert = 'INSERT INTO users SET email="' + email + '",name = "' + name + '", password = "' + hash_password + '",phone = "' + phone + '",role_id="2",dob="' + dob + '",parents_name="' + parents_name + '",school_name="' + school_name + '",father_name="' + father_name + '",mother_name="' + mother_name + '",class_name="' + class_name + '",age_group_id="' + age_group_id + '",gender="' + gender + '",school_code="' + school_code + '",status="1",verified="1",created= "' + Curdate + '"';

					console.log(queryinsert);
					connection.query(queryinsert, function (errinsert, resultinsert) {
						if (!errinsert) {
							var user_id = resultinsert.insertId;

							Cquery = 'SELECT courses_validate_codes.* FROM courses_validate_codes WHERE courses_validate_codes.validation_code =  "' + code + '" AND is_used="0"';
							console.log('Cquery--1', Cquery);
							connection.query(Cquery, function (errSel, resSel) {
								console.log('Cquery--1::::resSel', resSel);
								if (errSel) {
									resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								} else {
									console.log(resSel);
									if (resSel.length > 0) {
										var i = 0;
										var myDate = new Date();
										console.log('myDate', myDate);
										var courseDays = "0";
										NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
										console.log('NewSchDate---', NewSchDate);
										var course_id=resSel[0].course_id;
										var code_id=resSel[0].id;
										var dataSUb = { "course_id": course_id, "student_id": user_id, "teacher_id": "0", "price": price, "start_date": NewSchDate, "transaction_id": "0" };
										subscribe_course(dataSUb, pool, function (resNew, responseNew) {
											if (resNew == false) {
												
												resultJson = '{"replyCode":"error","replyMsg":"Course already subscribed ","cmd":"subscribe_course-register_user_fun"}\n';
												console.log('res-suceess');
												connection.release();
												callback(200, null, resultJson);
												return;
											} else {
												Uquery = 'UPDATE courses_validate_codes SET is_used="1",user_id="'+user_id+'" WHERE id = ' + code_id + '';
												connection.query(Uquery);
												console.log('Uquery--1', Uquery);
												resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course-register_user_fun"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;
											}
										})
									} else {

										resultJson = '{"replyCode":"error","replyMsg":"coupon expired","cmd":"teacher_schedule_days_list"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							})


						} else {
							resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"sign_up"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					})
				} else {
					var queryinsert = 'SELECT * from users where  email="' + email + '" AND status="1" and verified="1"';

					console.log(queryinsert);
					connection.query(queryinsert, function (errinsert, resultinsert) {
						if (!errinsert) {
							var user_id = resultinsert[0].id;

							Cquery = 'SELECT courses_validate_codes.* FROM courses_validate_codes WHERE courses_validate_codes.validation_code =  "' + code + '"  AND is_used="0"';
							console.log('Cquery--1', Cquery);
							connection.query(Cquery, function (errSel, resSel) {
								console.log('Cquery--1::::resSel', resSel);
								if (errSel) {
									resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
									connection.release();
									callback(200, null, resultJson);
									return;
								} else {
									console.log(resSel);
									if (resSel.length > 0) {
										var i = 0;
										var myDate = new Date();
										console.log('myDate', myDate);
										var courseDays = "0";
										NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
										console.log('NewSchDate---', NewSchDate);
										var course_id=resSel[0].course_id;
										var code_id=resSel[0].id;
										var dataSUb = { "course_id": course_id, "student_id": user_id, "teacher_id": "0", "price": price, "start_date": NewSchDate, "transaction_id": "0" };
										subscribe_course(dataSUb, pool, function (resNew, responseNew) {
											if (resNew == false) {
												
												resultJson = '{"replyCode":"error","replyMsg":"Course already subscribed ","cmd":"subscribe_course-register_user_fun"}\n';
												console.log('res-suceess');
												connection.release();
												callback(200, null, resultJson);
												return;
											} else {
												Uquery = 'UPDATE courses_validate_codes SET is_used="1",user_id="'+user_id+'" WHERE id = ' + code_id + '';
												connection.query(Uquery);
												console.log('Uquery--1', Uquery);
												resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course-register_user_fun"}\n';
												connection.release();
												callback(200, null, resultJson);
												return;
											}
										})
									} else {

										resultJson = '{"replyCode":"error","replyMsg":"Coupon expired","cmd":"teacher_schedule_days_list"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							})


						} else {
							resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"sign_up"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					})
				}
			})

		} else {
			console.log(email + " is not valid :(");

			resultJson = '{"replyCode":"error","replyMsg":"Email is not valid","cmd":"sign_up"}\n';
			console.log('res-suceess');
			connection.release();
			callback(200, null, resultJson);
			// callback(false, resultJson);
			return;
		}

	});
}



// Update stsutus
function link_setting_update(userdata, pool, callback) {
	var resultJson = '';
	var id = '1';
	var stem_lab_link = ''; 
	var robotics_lab_link = ''; 
	var coding_lab_link = ''; 
	var robotics_curr_lab_link = '';

	var Uquery = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}

	if (typeof userdata.stem_lab_link != 'undefined' && userdata.stem_lab_link != '') {
		stem_lab_link = userdata.stem_lab_link;
	}
	if (typeof userdata.robotics_lab_link != 'undefined' && userdata.robotics_lab_link != '') {
		robotics_lab_link = userdata.robotics_lab_link;
	}
	if (typeof userdata.coding_lab_link != 'undefined' && userdata.coding_lab_link != '') {
		coding_lab_link = userdata.coding_lab_link;
	}
	if (typeof userdata.robotics_curr_lab_link != 'undefined' && userdata.robotics_curr_lab_link != '') {
		robotics_curr_lab_link = userdata.robotics_curr_lab_link;
	}

	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		Uquery = 'UPDATE link_setting_update SET stem_lab_link="' + stem_lab_link + '",robotics_lab_link="'+robotics_lab_link+'",coding_lab_link="'+coding_lab_link+'",robotics_curr_lab_link="'+robotics_curr_lab_link+'" WHERE id = ' + id + '';
		connection.query(Uquery, function (errinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"Status chenged Successfully","cmd":"link_setting_update"}';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"link_setting_update"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}

function link_setting_details(userdata, pool, callback) {
	var resultJson = '';
	var id = '1';
	
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT * FROM link_setting_update WHERE id="' + id + '"';
		console.log('qq', Catquery);
		connection.query(Catquery, function (errinsert, resultinsert) {
			if (!errinsert) {
				if (resultinsert.length > 0) {
					var res = resultinsert[0];
				} else {
					var res = [];
				}
				resultJson = '{"replyCode":"success","replyMsg":"link_setting_details details","data":' + JSON.stringify(res) + '}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"link_setting_details"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


/* user List */
function user_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var role_id = '3';
	var learning = '';
	var school_code = '';
	var Keyconditoin = ' users.status !="2" ';
	var result = [];
	var start = '0';
	var limit = '';
	var subscribed = '';
	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.role_id != 'undefined' && userdata.role_id != '') {
		role_id = userdata.role_id;
	}
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
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

	if (typeof userdata.subscribed != 'undefined' && userdata.subscribed != '') {
		subscribed = userdata.subscribed;
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
		if (subscribed != '') {
			if (subscribed == '0') {
				Keyconditoin += ' AND (SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") =0';
			} else {
				Keyconditoin += ' AND (SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") >=1';

			}
		}

		if (limit != '') {
			var Catquery = 'SELECT users.*,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE  ' + Keyconditoin + ' ORDER BY users.id DESC LIMIT ' + start + ', ' + limit + '';
		} else {
			var Catquery = 'SELECT users.*,(SELECT COUNT(id) from student_course_subscription where student_course_subscription.student_id=users.id AND student_course_subscription.status="1") as subscribed,age_group.title FROM users LEFT JOIN age_group as age_group ON age_group.id = users.age_group_id  WHERE  ' + Keyconditoin + ' ORDER BY users.id DESC';
		}

		console.log('Catquery', Catquery);

		var countquery = 'SELECT count(*) as count from users WHERE ' + Keyconditoin + '';
		// console.log('countquery::::::::::::::::----------',countquery)
		connection.query(countquery, function (err, responsecount) {
			// console.log('responsecount::::::::::::::::----------',responsecount)
			if (responsecount && responsecount[0].count > 0) {
				connection.query(Catquery, function (err, result) {
					if (err) {
						resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"user_list"}\n';
						connection.release();
						callback(200, null, resultJson);
						return;
					} else {

						if (result.length > 0) {
							var i = 0;
							async.eachSeries(
								result,
								function (rec2, loop2) {
									var teacher_id = rec2.id;
									console.log('teacher_id', teacher_id);
									proiMGquery = 'SELECT teachers_grades.*,grades.grade_name FROM teachers_grades LEFT JOIN grades as grades ON grades.id = teachers_grades.grade_id WHERE teachers_grades.teacher_id = ' + teacher_id + '';
									console.log('proiMGquery', proiMGquery);
									connection.query(proiMGquery, function (errSelpiMG, respROiMG) {
										if (errSelpiMG) {
											console.log('errSelpiMG', errSelpiMG);

											loop2();
										} else {
											if (respROiMG.length > 0) {
												result[i].grades = respROiMG;
											} else {
												result[i].grades = [];
											}
											loop2();
										}
										i = i + 1;
									});
								},
								function (errSelpiMG) {
									if (errSelpiMG) {
										console.log('errSelpiMG', errSelpiMG);
										resultJson = '{"replyCode":"error","replyMsg":"' + errSelpiMG.message + '","cmd":"view_classes_info"}\n';
										connection.release();
										callback(200, null, resultJson);
										return;
									} else {
										resultJson = '{"replyCode":"success","replyMsg":"User list","data":' + JSON.stringify(result) + ',"totalCount":' + responsecount[0].count + ', "cmd":"user_list"}\n';
										console.log('res-suceess');
										connection.release();
										callback(200, null, resultJson);
										return;
									}
								}
							);
						} else {
							resultJson =
								'{"replyCode":"success","replyMsg":"No Record found.","data":[], "cmd":"view_classes_info"}\n';
							console.log('res-suceess');
							connection.release();
							callback(200, null, resultJson);
							return;
						}
					}
				});
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"user_list","data":[], "cmd":"user_list"}\n';
				console.log(resultJson);
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}



function assign_course_to_student_bulk(userdata, pool, callback) {
	var resultJson = '';
	var student_id = '';
	var teacher_id = '0';
	var created_by = '';
	var course_id = '';
	var price = '0';
	var students = '';
	var new_account = '0';
	var start_date = '';
	var errArray = [];
	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}
	if (typeof userdata.students != 'undefined' && userdata.students != '') {
		students = userdata.students;
	}

	if (typeof userdata.new_account != 'undefined' && userdata.new_account != '') {
		new_account = userdata.new_account;
	}

	if (typeof userdata.start_date != 'undefined' && userdata.start_date != '') {
		start_date = userdata.start_date;
	}

	console.log('userData', userdata);

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (student_id != '') {

			subscribe_course(userdata, pool, function (ResSub, responseSubscribe) {
				if (ResSub == false) {
					resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"subscribe_course"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
				} else {
					resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
				}
			})
		} else {
			var i = 0;
			async.eachSeries(students, function (rec2, loop2) {
				console.log('Student--', rec2);
				checkValidateStudent(rec2, pool, function (ResStatus, responseResult) {
					console.log(typeof responseResult);
					console.log(ResStatus);
					console.log(responseResult);

					if (ResStatus == false) {
						if (new_account == '1') {
							console.log('123467');
							register_user_fun(rec2, pool, function (resSub, responseSubscribe) {
								if (resSub == false) {
									resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"register_user_fun"}\n';
									console.log('res-suceess');
									loop2();
								} else {
									console.log('responseSubscribe', responseSubscribe);
									var querySelectCourse = 'SELECT class_duration_template.* from class_duration_template WHERE class_name="' + rec2.class_name + '" AND status="1"';
									console.log('querySelectCourse--1', querySelectCourse);
									connection.query(querySelectCourse, function (errSel, resSel) {
										console.log('querySelectCourse--1::::resSel', resSel);
										if (errSel) {
											resultJson = '{"replyCode":"error","replyMsg":"' + errSel.message + '","cmd":"subscribe_course"}\n';
											connection.release();
											callback(false, resultJson);
											return;
										} else {
											console.log(resSel);
											if (resSel.length > 0) {
												var i = 0;
												var myDate = new Date(start_date);
												console.log('myDate', myDate);
												var courseDays = "0";
												async.eachSeries(resSel, function (rec3, loop3) {
													var course_id = rec3.course_id;
													if (courseDays != "0") {
														myDate.setDate(myDate.getDate() + courseDays);
													}

													NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
													console.log('NewSchDate---', NewSchDate);
													var dataSUb = { "course_id": course_id, "student_id": responseSubscribe, "teacher_id": "0", "price": price, "start_date": NewSchDate, "transaction_id": "0" };
													subscribe_course(dataSUb, pool, function (resNew, responseNew) {
														if (resNew == false) {
															courseDays = rec3.days;
															resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"subscribe_course-register_user_fun"}\n';
															console.log('res-suceess');
															loop3();
														} else {
															courseDays = rec3.days;
															resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course-register_user_fun"}\n';
															loop3();
														}
													})
												}, function (errSelPro) {
													if (errSelPro) {
														console.log('errSelPro', errSelPro);
														resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"teacher_schedule_days_list"}\n';
														loop2();
													} else {
														resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","cmd":"teacher_schedule_days_list"}\n';
														console.log('res-suceess');
														loop2();
													}
												});
											} else {

												console.log('res-err',);
												loop2();
											}
										}
									})

								}
							})
						} else {
							if (new_account == '0') {
								if (responseResult.length > 0) {
									var student = responseResult[0].id;
									var myDate = new Date(start_date);
									NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
									console.log('NewSchDate---', NewSchDate);
									var dataSUb = { "course_id": course_id, "student_id": student, "teacher_id": "0", "price": price, "transaction_id": "0", "start_date": NewSchDate };
									// assign new course
									subscribe_course(dataSUb, pool, function (resN, responseSubscribe) {
										if (resN == false) {
											resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"subscribe_course"}\n';
											console.log('res-suceess');
											errArray.push(i + 1);

											loop2();
										} else {
											resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course"}\n';
											console.log('res-suceess');
											loop2();
										}
									})

								} else {
									errArray.push(i + 1);
									loop2();
								}
							} else {
								errArray.push(i + 1);
								loop2();
							}

						}
					} else {

						console.log('fas gaya', responseResult.length);
						if (responseResult.length > 0 && new_account == '0') {
							var myDate = new Date(start_date);
							NewSchDate = myDate.getFullYear() + "-" + parseInt(myDate.getMonth() + 1) + "-" + myDate.getDate();
							console.log('NewSchDate---', NewSchDate);
							var dataSUb = { "course_id": course_id, "student_id": responseResult[0].id, "teacher_id": "0", "price": price, "transaction_id": "0", "start_date": NewSchDate };
							// assign new course
							subscribe_course(dataSUb, pool, function (resN, responseSubscribe) {
								if (resN == false) {
									resultJson = '{"replyCode":"error","replyMsg":"Something went wrong ","cmd":"subscribe_course"}\n';
									console.log('res-suceess');
									errArray.push(i + 1);
									loop2();
								} else {
									resultJson = '{"replyCode":"success","replyMsg":"Course subscribed successfully","cmd":"subscribe_course"}\n';
									console.log('res-suceess');
									loop2();
								}
							})
						} else {
							errArray.push(i + 1);
							console.log('fas gaya');
							loop2();
						}
					}
					i = i + 1;
				});
			}, function (errSelPro) {
				if (errSelPro) {
					console.log('errSelPro', errSelPro);
					resultJson = '{"replyCode":"error","replyMsg":"' + errSelPro.message + '","cmd":"teacher_schedule_days_list"}\n';
					connection.release();
					callback(200, null, resultJson);
					return;
				} else {
					resultJson = '{"replyCode":"success","replyMsg":"Details found successfully .","data":"' + errArray + '","cmd":"teacher_schedule_days_list"}\n';
					console.log('res-suceess');
					connection.release();
					callback(200, null, resultJson);
					return;
				}
			});
		}

	});
}


function school_grades_list(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	console.log('----------');
	console.log(userdata);

	pool.getConnection(function (err, connection) {
		var Catquery = 'SELECT school_grades.* from school_grades WHERE school_grades.school_id="' + school_id + '" ';
		console.log('Catquery', Catquery);
		connection.query(Catquery, function (errContent, resContent) {
			if (errContent) {
				resultJson = '{"replyCode":"error","replyMsg":"' + errContent.message + '","cmd":"school_grades_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"success","replyMsg":"school grades fetched successfully","cmd":"school_grades_list","data":' + JSON.stringify(resContent) + '}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;

			}

		});
	});
}


function admin_school_generated_payout_list(userdata, pool, callback) {
	var resultJson = '';
	var school_id = '';
	var from_date = '';
	var to_date = '';
	var Keyconditoin = '';
	// var learning = '0';
	if (typeof userdata.learning != 'undefined' && userdata.learning != '') {
		learning = userdata.learning;
	}

	if (typeof userdata.school_id != 'undefined' && userdata.school_id != '') {
		school_id = userdata.school_id;
	}
	if (typeof userdata.from_date != 'undefined' && userdata.from_date != '') {
		from_date = userdata.from_date;
	}

	if (typeof userdata.to_date != 'undefined' && userdata.to_date != '') {
		to_date = userdata.to_date;
	}
	pool.getConnection(function (err, connection) {
		if (school_id != '') {
			Keyconditoin += ' AND school_generated_payouts.school_id ="' + school_id + '"';
		}
		if (from_date != '') {
			Keyconditoin += ' AND school_generated_payouts.created >="' + from_date + '" ';
		}
		if (to_date != '') {
			Keyconditoin += ' AND school_generated_payouts.created <="' + to_date + '" ';
		}
		// if (learning != '') {
		// 	Keyconditoin = ' AND school_generated_payouts.learning LIKE  "' + learning + '"';
		// }
		detailsquery = 'SELECT school_generated_payouts.*,schools.name,schools.code,schools.city,schools.state,schools.contact_person,schools.contact_phone,schools.contact_email from school_generated_payouts LEFT JOIN schools as schools ON schools.id = school_generated_payouts.school_id  where school_generated_payouts.status !="2" ' + Keyconditoin + ' ORDER BY school_generated_payouts.created DESC';
		console.log('detailsquery', detailsquery);
		connection.query(detailsquery, function (errSelDetails, resSelDetails) {
			if (errSelDetails) {
				resultJson =
					'{"replyCode":"error","replyMsg":"' + errSelDetails.message + '","cmd":"school_generated_payouts_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"Details found successfully .","data":' +
					JSON.stringify(resSelDetails) + ',"cmd":"school_generated_payouts_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


/* badge list */
function badges_list(userdata, pool, callback) {
	var resultJson = '';
	var strJson = '';
	var keyword = '';
	var is_admin = '1';

	if (typeof userdata.keyword != 'undefined' && userdata.keyword != '') {
		keyword = userdata.keyword;
	}
	if (typeof userdata.is_admin != 'undefined' && userdata.is_admin != '') {
		is_admin = userdata.is_admin;
	}

	pool.getConnection(function (err, connection) {
		if (is_admin == '0') {
			var Catquery = 'SELECT badges.* FROM badges WHERE badges.status ="1" ORDER BY badges.id DESC';

		} else {
			var Catquery = 'SELECT badges.* FROM badges WHERE badges.status !="2" ORDER BY badges.id DESC';

		}

		connection.query(Catquery, function (err, result) {
			if (err) {
				resultJson = '{"replyCode":"error","replyMsg":"' + err.message + '","cmd":"sub_admin_list"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson =
					'{"replyCode":"success","replyMsg":"badge list","data":' + JSON.stringify(result) +
					', "cmd":"sub_admin_list"}\n';
				console.log('res-suceess');
				connection.release();
				callback(200, null, resultJson);
				return;
			}
		});
	});
}


// assign course to atudent

function assign_course_to_student(userdata, pool, callback) {
	var resultJson = '';
	var course_id = '';
	var student_id = '';
	var teacher_id = '1';
	var price = '0';
	var created_by = '';
	var id = '';

	if (typeof userdata.id != 'undefined' && userdata.id != '') {
		id = userdata.id;
	}
	if (typeof userdata.course_id != 'undefined' && userdata.course_id != '') {
		course_id = userdata.course_id;
	}

	if (typeof userdata.student_id != 'undefined' && userdata.student_id != '') {
		student_id = userdata.student_id;
	}
	if (typeof userdata.teacher_id != 'undefined' && userdata.teacher_id != '') {
		teacher_id = userdata.teacher_id;
	}
	if (typeof userdata.created_by != 'undefined' && userdata.created_by != '') {
		created_by = userdata.created_by;
	}
	if (typeof userdata.price != 'undefined' && userdata.price != '') {
		price = userdata.price;
	}

	/* ESTABLISH CONNECTION TO DATABASE */
	pool.getConnection(function (err, connection) {
		if (id != '') {
			var queryinsert = 'UPDATE student_course_subscription SET course_id="' + course_id + '",student_id="' + student_id + '",teacher_id="' + teacher_id + '",price="' + price + '",created_by="' + created_by + '" where student_course_subscription.id="' + id + '"';
		} else {
			var queryinsert = 'INSERT INTO student_course_subscription SET course_id="' + course_id + '",student_id="' + student_id + '",teacher_id="' + teacher_id + '",price="' + price + '",created_by="' + created_by + '",created= NOW()';
		}
		console.log(queryinsert);
		connection.query(queryinsert, function (errinsert, resultinsert) {
			if (!errinsert) {
				resultJson = '{"replyCode":"success","replyMsg":"courses updated successfully","cmd":"student_course_subscription"}\n';
				connection.release();
				callback(200, null, resultJson);
				return;
			} else {
				resultJson = '{"replyCode":"error","replyMsg":"' + errinsert.message + '","cmd":"student_course_subscription"}\n';
				console.log('res-suceess');
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
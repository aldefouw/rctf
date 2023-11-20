window.tableMappings = {
    'a' :'table',
    'logging' : 'table.form_border',
    'browse users' : 'table#sponsorUsers-table',
    'file repository' : 'table#file-repository-table',
    'administrators' : 'table#admin-rights-table',
    'reports' : 'table#table-report_list',
    'report data' : ['div.dataTables_scrollHeadInner table', 'table#report_table'],
    'define events' : 'table#event_table',
    'data access groups' : 'table#table-dags_table',
    'DAGs Switcher' : 'div#dag-switcher-config-container-parent table',
    'record status dashboard': 'table#record_status_table',
    'data collection instruments': 'table#table-forms_surveys',
    'codebook' : 'table#codebook-table'
}

window.dateFormats = {
    'mm-dd-yyyy': /\d{2}-\d{2}-\d{4}/,
    'yyyy-mm-dd': /\d{4}-\d{2}-\d{2}/,
    'mm-dd-yyyy hh:mm': /\d{2}-\d{2}-\d{4} \d{1,2}:\d{2}(?:am|pm)/,
    'yyyy-mm-dd hh:mm': /\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}(?:am|pm)/,
    'mm-dd-yyyy hh:mm:ss': /\d{2}-\d{2}-\d{4} \d{1,2}:\d{2}:\d{2}(?:am|pm)/,
    'yyyy-mm-dd hh:mm:ss': /\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}(?:am|pm)/,
    'mm/dd/yyyy': /\d{2}\/\d{2}\/\d{4}/,
    'yyyy/mm/dd': /\d{4}\/\d{2}\/\d{2}/,
    'mm/dd/yyyy hh:mm': /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}(?:am|pm)/,
    'yyyy/mm/dd hh:mm': /\d{4}\/\d{2}\/\d{2} \d{1,2}:\d{2}(?:am|pm)/,
    'mm/dd/yyyy hh:mm:ss': /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}:\d{2}(?:am|pm)/,
    'yyyy/mm/dd hh:mm:ss': /\d{4}\/\d{2}\/\d{2} \d{1,2}:\d{2}:\d{2}(?:am|pm)/,
    'hh:mm': /\d{1,2}:\d{2}(?:am|pm)/,
    'hh:mm:ss': /\d{1,2}:\d{2}:\d{2}(?:am|pm)/,
    'hh:mm:ss.ms': /\d{1,2}:\d{2}:\d{2}\.\d{3}(?:am|pm)/,
}

window.exportMappings = {
    'CSV / Microsoft Excel (raw data)'  :    'csv',
    'CSV / Microsoft Excel (labels)'    :    'csv',
    'SPSS Statistical Software'         :    'sps',
    'SAS Statistical Software'          :    'sas',
    'R Statistical Software'            :    'r',
    'Stata Statistical Software'        :    'do',
    'CDISC ODM (XML)'                   :    'odm'
}

window.validationTypes = {
    'Code Postal 5 caracteres (France)'             : 'postalcode_french',
    'Date (D-M-Y)'                                  : 'date_dmy',
    'Date (M-D-Y)'                                  : 'date_mdy',
    'Date (Y-M-D)'                                  : 'date_ymd',
    'Datetime (D-M-Y H:M)'                          : 'datetime_dmy',
    'Datetime (M-D-Y H:M)'                          : 'datetime_mdy',
    'Datetime (Y-M-D H:M)'                          : 'datetime_ymd',
    'Datetime w/ seconds (D-M-Y H:M:S)'             : 'datetime_seconds_dmy',
    'Datetime w/ seconds (M-D-Y H:M:S)'             : 'datetime_seconds_mdy',
    'Datetime w/ seconds (Y-M-D H:M:S)'             : 'datetime_seconds_ymd',
    'Email'                                         : 'email',
    'Integer'                                       : 'integer',
    'Letters only'                                  : 'alpha_only',
    'MRN (10 digits)'                               : 'mrn_10d',
    'MRN (generic)'                                 : 'mrn_generic',
    'Number'                                        : 'number',
    'Number (1 decimal place - comma as decimal)'   : 'number_1dp_comma_decimal',
    'Number (1 decimal place)'                      : 'number_1dp',
    'Number (2 decimal places - comma as decimal)'  : 'number_2dp_comma_decimal',
    'Number (2 decimal places)'                     : 'number_2dp',
    'Number (3 decimal places - comma as decimal)'  : 'number_3dp_comma_decimal',
    'Number (3 decimal places)'                     : 'number_3dp',
    'Number (4 decimal places - comma as decimal)'  : 'number_4dp_comma_decimal',
    'Number (4 decimal places)'                     : 'number_4dp',
    'Number (comma as decimal)'                     : 'number_comma_decimal',
    'Phone (Australia)'                             : 'phone_australia',
    'Phone (North America)'                         : 'phone',
    'Phone (UK)'                                    : 'phone_uk',
    'Postal Code (Australia)'                       : 'postalcode_australia',
    'Postal Code (Canada)'                          : 'postalcode_canada',
    'Postal Code (Germany)'                         : 'postalcode_germany',
    'Social Security Number (U.S.)'                 : 'ssn',
    'Time (HH:MM:SS)'                               : 'time_hh_mm_ss',
    'Time (HH:MM)'                                  : 'time',
    'Time (MM:SS)'                                  : 'time_mm_ss',
    'Vanderbilt MRN'                                : 'vmrn',
    'Zipcode (U.S.)'                                : 'zipcode',
}

window.projectModules = {
    'Main project settings': [
                              'Use surveys in this project?',
                              'Use longitudinal data collection with defined events?',
                              'Use the MyCap participant-facing mobile app?'
                             ],

    'Enable optional modules and customizations' : [
                                                     'Repeating instruments and events',
                                                     'Auto-numbering for records',
                                                     'Scheduling module (longitudinal only)',
                                                     'Randomization module',
                                                     'Designate an email field for communications (including survey invitations and alerts)',
                                                     'Twilio SMS and Voice Call services for surveys and alerts',
                                                     'SendGrid Template email services for Alerts & Notifications'
                                                    ]
}

//Make sure to keep the blank choice - we want to default to first option
window.elementChoices = {
    '' : 'html',
    ' on the tooltip' : 'div[class*=tooltip]:visible',
    ' in the tooltip' : 'div[class*=tooltip]:visible',
    ' on the role selector dropdown' : 'div[id=assignUserDropdownDiv]:visible',
    ' in the role selector dropdown' : 'div[id=assignUserDropdownDiv]:visible',
    ' on the dialog box' : 'div[role=dialog]:visible',
    ' in the dialog box' : 'div[role=dialog]:visible',
    ' within the data collection instrument list' : 'table#table-forms_surveys',
    ' on the action popup' : '[id=formActionDropdown]',
    ' in the action popup' : '[id=formActionDropdown]'
}

//IMPORTANT: Programmatically add the projectModules as element choices
for (const category in window.projectModules) {
    if (window.projectModules.hasOwnProperty(category)) {
        window.elementChoices[` in the "${category}" section`] = `div:contains("${category}"):visible`

        window.projectModules[category].forEach((element) => {
            window.elementChoices[` in the "${element}" row in the "${category}" section`] = `div:contains("${element}"):visible`
        })
    }
}

window.icons = {
    'disabled icon'      : `img[src*=delete]:visible`,
    'checkmark icon'     : `img[src*=tick]:visible`,
    'x icon'             : `img[src*=cross]:visible`
}

//IMPORTANT: Programmatically add the validationTypes as element choices
for (const validation_desc in window.validationTypes) {
    window.elementChoices[` in the validation row labeled "${validation_desc}"`] = `tr[id=${window.validationTypes[validation_desc]}]`
}

window.ordinalChoices = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    fifth: 4,
    sixth: 5,
    seventh: 6,
    eighth: 7,
    ninth: 8,
    last: -1
}
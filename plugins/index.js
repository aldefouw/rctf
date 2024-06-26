// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const cucumber = require('cypress-cucumber-preprocessor').default
const shell = require('shelljs')
const sed_lite = require('sed-lite').sed
const fs = require('fs')
const csv = require('async-csv')
const path = require('path')

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    on('file:preprocessor', cucumber())

    on('task', {

        currentSnapshotInfo({url, user, pass}){
            let snapshot_url_path = shell.pwd() + '/test_db/latest_snapshot.info'
            shell.ShellString(`${url}\n${user}\n${pass}`).to(snapshot_url_path);
            return fs.existsSync(snapshot_url_path)
        },

        snapshotExists(){
            //SNAPSHOT PATH
            var snapshot_file = shell.pwd() + '/test_db/latest_snapshot.sql';

            // SEE IF SNAPSHOT EXISTS
            return fs.existsSync(snapshot_file)
        },

        populateStructureAndData({redcap_version, advanced_user_info, source_location}) {

            // DEFINE OTHER LOCATIONS
            var test_seeds_location = shell.pwd() + '/node_modules/rctf/test_db';
            var seeds_location = test_seeds_location + '/seeds';

            var db_prefix_sql = test_seeds_location + '/structure_prefix.sql';
            var sql_path = source_location + '/redcap_v' + redcap_version + '/Resources/sql';
            var install_sql = sql_path + '/install.sql';
            var data_sql = sql_path + '/install_data.sql';

            var user_sql = seeds_location + '/user_info/standard.sql'
            if(advanced_user_info) { user_sql = seeds_location + '/user_info/advanced.sql'; }

            var auth_sql = seeds_location + '/auth.sql';
            //var rights_sql = seeds_location + '/rights.sql';
            var config_sql = seeds_location + '/config.sql';

            //CREATE STRUCTURE FILE
            var structure_and_data_file = test_seeds_location + '/structure_and_data.sql';

            //REMOVE EXISTING STRUCTURE AND DATA FILE
            shell.rm(structure_and_data_file);

            //CREATE NEW STRUCTURE AND DATA FILE FROM REDCAP SOURCE
            shell.cat(db_prefix_sql).to(structure_and_data_file);
            shell.cat(install_sql).toEnd(structure_and_data_file);
            shell.cat(data_sql).toEnd(structure_and_data_file);

            shell.cat(user_sql).toEnd(structure_and_data_file);
            shell.cat(auth_sql).toEnd(structure_and_data_file);

            //DEMO PROJECT SEEDS
            for(i = 1; i<=12; i++){
                let demo_sql=`${sql_path}/create_demo_db${i}.sql`
                shell.cat(demo_sql).toEnd(structure_and_data_file)
            }

            //shell.cat(rights_sql).toEnd(structure_and_data_file);

            shell.cat(config_sql).sed('REDCAP_VERSION_MAGIC_STRING', redcap_version).toEnd(structure_and_data_file);

            shell.ShellString('\nCOMMIT;').toEnd(structure_and_data_file);

            if (fs.existsSync(structure_and_data_file)) {
                return true
            }

            return false
        },

        generateMySQLCommand({mysql_name, host, port, db_name, db_user, db_pass, type, replace, include_db_name, framework}) {
            var db_cmd = include_db_name ?
                `${mysql_name} -h${host} --port=${port} ${db_name} -u${db_user} -p${db_pass}` :
                `${mysql_name} -h${host} --port=${port} -u${db_user} -p${db_pass}`

            var rctf_sql = `${shell.pwd()}/node_modules/rctf/test_db/${type}.sql`
            var sql = framework ? rctf_sql : `${shell.pwd()}/test_db/${type}.sql`
            var tmp = `${rctf_sql}.tmp`;

            //REPLACE ALL INSTANCES OF THE REDCAP_DB_NAME MAGIC CONSTANT
            var replace_db_name = sed_lite(`s/REDCAP_DB_NAME/${db_name}/g`);
            var new_file = replace_db_name(shell.cat(sql));

            //REPLACE ALL INSTANCES OF THE REPLACEMENT CALLED FOR IN THE COMMAND
            if(replace === ''){

            } else {
                var replace_string = sed_lite(`s/${replace}/g`);
                new_file = replace_string(new_file);
            }

            var final_file = new shell.ShellString(new_file);

            //OUTPUT TO TEMPORARY FILE
            final_file.to(tmp)

            //FORMULATE DB CMD
            if (fs.existsSync(tmp)) {
                return { cmd: `${db_cmd} < ${tmp}`, tmp: tmp };
            }
        },

        deleteFile({path}){
            if (fs.existsSync(path)) {
                shell.rm(path)

                if (!fs.existsSync(path)) {
                    return true
                }

                return false
            }
        },

        parseCsv({csv_string}) {
            return csv.parse(csv_string, { relax_column_count: true })
        },

        createInitialDbSeedLock(){
            const file = shell.ShellString("").to(shell.pwd() + '/node_modules/rctf/test_db/initial_db_seed.lock')
            return fs.existsSync(file)
        },

        removeInitialDbSeedLock(){
            const path = shell.pwd() + '/node_modules/rctf/test_db/initial_db_seed.lock'

            if (fs.existsSync(path)) {
                shell.rm(path)

                if (!fs.existsSync(path)) {
                    return true
                }

                return false
            }
        },

        dbSeedLockExists(){
            const file = shell.pwd() + '/node_modules/rctf/test_db/initial_db_seed.lock'
            return fs.existsSync(file)
        },

        phpTimeZone(php_path){
            return `${php_path} -r "echo date_default_timezone_get();"`
        },

        fetchLatestDownload({fileExtension}){
            const downloadsDir = shell.pwd() + '/cypress/downloads/'

            // Read the files in the downloads directory
            const files = fs.readdirSync(downloadsDir)

            // Filter files by extension
            const filteredFiles = files.filter(file => path.extname(file) === `.${fileExtension}`);

            // Sort files by modification time to get the latest one
            const latestFile = filteredFiles
                .map(file => ({ file, mtime: fs.statSync(path.join(downloadsDir, file)).mtime }))
                .sort((a, b) => b.mtime - a.mtime)[0].file

            return `${downloadsDir}${latestFile}`
        },

        fileExists(filePath) {
            return fs.existsSync(filePath)
        }

    })
}

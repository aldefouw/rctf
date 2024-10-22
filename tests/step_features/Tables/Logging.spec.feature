Feature: Logging Table

  As a REDCap tester
  I want to see that I can verify a REDCap logging table

  Scenario: Go to REDCap Logging Table page
    Given I click on the link labeled "REDCap Logging Table"
    Then I should see "REDCap Logging Table"

  Scenario: Verify the logging table values
    Given I see "Time / Date"
    And I see "Username"
    And I see "Action"
    And I see "List of Data Changes"
    Then I should see a table header and rows containing the following values in the logging table:
      | Time / Date      | Username   | Action                                   | List of Data Changes OR Fields Exported |
      | mm/dd/yyyy hh:mm | test_admin | Add user test_admin                      | user = 'test_admin'                     |
      | mm/dd/yyyy hh:mm | test_admin | Update record 4 (Event 1 (Arm 1: Arm 1)) | [instance = 3], record_id = '4'         |
      | mm/dd/yyyy hh:mm | test_admin | Update record 4 (Event 1 (Arm 1: Arm 1)) | [instance = 2], record_id = '4'         |
      | mm/dd/yyyy hh:mm | test_admin | Update record 3 (Event 1 (Arm 1: Arm 1)) | [instance = 2], record_id = '3'         |
      | mm/dd/yyyy hh:mm | test_admin | Update record 2 (Event 1 (Arm 1: Arm 1)) | [instance = 2], record_id = '2'         |
      | mm/dd/yyyy hh:mm | test_user  | Update record 1 (Event 2 (Arm 1: Arm 1)) | [instance = 2], record_id = '1'         |
      | mm/dd/yyyy hh:mm | test_admin | Manage/Design                            | Create project using REDCap XML file    |
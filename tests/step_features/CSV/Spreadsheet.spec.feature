Feature: Spreadsheet tests

  As a REDCap tester
  I want to see that I can use the basic steps to analyze CSV files

  Scenario: Go to Spreadsheet HTML page
    Given I click on the link labeled "CSV Downloads Test"
    Then I should see "Spreadsheet"

  Scenario: Go to Spreadsheet HTML page
    Given I click on the link labeled "Test CSV Download"
    Then the downloaded CSV with filename "test.csv" should have has 4 rows
    And the downloaded CSV with filename "test.csv" should have has a value "The Beatles were an English rock band formed in Liverpool in 1960." for column "notesbox"
    And the downloaded CSV with filename "test.csv" should have the header and rows below
      | record_id | name   | email              | text_validation_complete | ptname | bdate      | role    | notesbox                                                           | multiple_dropdown_auto | multiple_dropdown_manual | multiple_radio_auto | radio_button_manual | checkbox___1 | checkbox___2 | checkbox___3 | required | identifier_ssn | identifier_phone | slider | data_types_complete | data_dictionary_form_complete | phone | demo_branching_complete |
      | 100       | Rob    | rob@noreply.edu    | 1                        |        |            |         |                                                                    |                        |                          |                     |                     |              |              |              |          |                |                  |        |                     |                               |       |                         |
      | 200       | Brenda | brenda@noreply.edu | 2                        | George | 02/25/1943 |         |                                                                    |                        |                          |                     |                     |              |              |              |          |                |                  |        |                     |                               |       |                         |
      | 300       | Paul   | paul@noreply.edu   | 2                        | Ringo  | 07/07/1940 | drummer | The Beatles were an English rock band formed in Liverpool in 1960. | 1                      | 7                        | 3                   | 100                 | 1            | 1            | 1            | 8675309  | 123-45-6789    | 555-555-5555     | 5      | 2                   | 0                             |       |                         |

Feature: Well Formed HTML selection

  As a REDCap test
  I want to see that I can interact with well formed HTML properly

  Scenario: Go to Well Formed HTML page
    Given I click on the link labeled "No Label HTML"
    Then I should see "No Label HTML"

  Scenario: Click on a button
    And I see a button labeled "Click Me"
    Then I click on the button labeled "Click Me"

  Scenario: Click on a link
    Given I see a link labeled "Go to example"
    Then I click on the link labeled "Go to example"

  Scenario: Click on a tab
    #Implementation missing: Given I see a tab labeled "Go to example"
    Then I click on the tab labeled "Tab 2"

  Scenario: Type text in an input box
    #Implementation missing: Given I should see the input field labeled "Instrument:"
    Then I enter "New text" into the input field labeled "Instrument:"

  Scenario: Select a checkbox from single checkbox
    #Bad implementation: Given I should see a checkbox labeled "I agree to the terms"
    Then I click on the checkbox labeled "I agree to the terms"

  Scenario: Select a radio option from several radio options
    #Bad implementation: Given I should see a checkbox labeled "I agree to the terms"
    Then I select the radio option "Option 2" for the field labeled "Radio Buttons:"

  Scenario: Select an option from the dropdown
    Given I select "Option 2" in the dropdown field labeled "Dropdown:"
    Then I should see the dropdown field labeled "Dropdown:" with the option "Option 2" selected

  Scenario: Select options from the multiselect
    Given I select "Option 1" in the multiselect field labeled "Multiselect:"
    And I select "Option 2" in the multiselect field labeled "Multiselect:"
    Then I should see the multiselect field labeled "Multiselect:" with the option "Option 1" selected
    And I should see the multiselect field labeled "Multiselect:" with the option "Option 2" selected

  Scenario: Select a checkbox without field context
    Given I check the checkbox labeled "Checkbox 2"
    Then I should see a checkbox labeled "Checkbox 2" that is checked

  Scenario: Adjust a slider
    #Given I move the slider field labeled "Slider:" to the position of 3
    #I select the checkbox option "Checkbox 1" for the field labeled "Checkboxes:"

  Scenario: Type in a textarea
    Given I enter "Some Text" into the textarea field labeled "Textarea:"

  Scenario: Type in an input field
    Given I enter "Some Input Text" into the input field labeled "Input Field:"

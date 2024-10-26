Feature: Iframe No Labels Body selection

  As a REDCap tester
  I want to see that I can interact with legacy HTML properly

  Scenario: Go to Well Formed HTML page
    Given I click on the link labeled "Iframe No Label Body"
    Then I should see "Iframe No Label Body"

  Scenario: Click on a button
    And I see a button labeled "Click Me" in the iframe
    Then I click on the button labeled "Click Me" in the iframe

  Scenario: Click on a link
    Given I see a link labeled "Go to example" in the iframe
#    Then I click on the link labeled "Go to example" in the iframe

  Scenario: Click on a tab
    #Implementation missing: Given I see a tab labeled "Go to example"
#    Then I click on the tab labeled "Tab 2" in the iframe

  Scenario: Type text in an input box
    #Implementation missing: Given I should see the input field labeled "Instrument:"
    Then I enter "New text" into the input field labeled "Instrument:" in the iframe

  Scenario: Select a checkbox from single checkbox
    #Bad implementation: Given I should see a checkbox labeled "I agree to the terms"
    Then I click on the checkbox labeled "I agree to the terms" in the iframe

  Scenario: Select a radio option from several radio options
    #Bad implementation: Given I should see a checkbox labeled "I agree to the terms"
#    Then I select the radio option "Option 2" for the field labeled "Radio Buttons:" in the iframe

  Scenario: Select an option from the dropdown
#    Given I select "Option 2" in the dropdown field labeled "Dropdown:" in the iframe
#    Then I should see the dropdown field labeled "Dropdown:" with the option "Option 2" selected in the iframe

  Scenario: Select options from the multiselect
#    Given I select "Option 1" in the multiselect field labeled "Multiselect:" in the iframe
#    And I select "Option 2" in the multiselect field labeled "Multiselect:" in the iframe
#    Then I should see the multiselect field labeled "Multiselect:" with the option "Option 1" selected in the iframe
#    And I should see the multiselect field labeled "Multiselect:" with the option "Option 2" selected in the iframe

  Scenario: Select a checkbox without field context
    # Does not error but it does not check the correct stuff either ... needs similar strategy to radio options in https://github.com/aldefouw/rctf/commit/9858530
    Given I check the checkbox labeled "Checkbox 2" in the iframe
    And I check the checkbox labeled "Checkbox 1" in the iframe
#    Then I should see a checkbox labeled "Checkbox 1" that is checked
#    And I should see a checkbox labeled "Checkbox 2" that is checked

  Scenario: Uncheck a checkbox without field context
#    Given I see a checkbox labeled "Checkbox 1" that is checked
#    And I uncheck the checkbox labeled "Checkbox 1"
#    Then I should see a checkbox labeled "Checkbox 1" that is unchecked

#    Given I see a checkbox labeled "Checkbox 2" that is checked
#    And I uncheck the checkbox labeled "Checkbox 2"
#    Then I should see a checkbox labeled "Checkbox 2" that is unchecked

  Scenario: Adjust a slider
    #Given I move the slider field labeled "Slider:" to the position of 3
    #I select the checkbox option "Checkbox 1" for the field labeled "Checkboxes:"

  Scenario: Type in a textarea
#    Given I enter "Some Text" into the textarea field labeled "Textarea:"

  Scenario: Type in an input field
    Given I enter "Some Input Text" into the input field labeled "Input Field:" in the iframe

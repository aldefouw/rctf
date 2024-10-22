Feature: Should NOT see

  As a REDCap tester
  I want to ensure that some things are not visible

  Scenario: Go to Visibility page
    Given I click on the link labeled "Text Visibility"
    Then I should see "Text Visibility Page"

  Scenario: HTML: Verify text that is visible AND invisible
    Given I see "Text I should see"
    And I see "Dialog Text I should see"
    And I see "Tooltip Text I should see"
    Then I should NOT see "Text I should NOT see"
    And I should NOT see "Dialog Text I should NOT see"
    And I should NOT see "Tooltip Text I should NOT see"

  Scenario: Dialog Box: Verify text that is visible AND invisible
    Given I see "Dialog Text I should see" in the dialog box
    Then I should NOT see "Dialog Text I should NOT see" in the dialog box

  Scenario: Tooltip: Verify text that is visible AND invisible
    Given I see "Tooltip Text I should see" in the tooltip
    Then I should NOT see "Tooltip Text I should NOT see" in the tooltip
@practice @severity:minor
Feature: Practice site actions

  Scenario: Tick and untick checkboxes
    Given I open the checkboxes practice page
    When I tick checkbox 1
    And I untick checkbox 2
    Then checkbox 1 should be ticked
    And checkbox 2 should not be ticked

  Scenario: Select an option in a dropdown
    Given I open the dropdown practice page
    When I select the "Option 2" option
    Then "Option 2" should be selected

  @frames
  Scenario: Read text in nested frames
    Given I open the nested frames practice page
    Then the "frame-left" frame should show "LEFT"
    And the "frame-middle" frame should show "MIDDLE"
    And the "frame-right" frame should show "RIGHT"
    And the "frame-bottom" frame should show "BOTTOM"

  @dragdrop
  Scenario: Drag box A onto box B
    Given I open the drag and drop practice page
    When I drag box A onto box B
    Then box A should now show the letter "B"

  @windows
  Scenario: Switch to a new window
    Given I open the windows practice page
    When I click the link that opens a new window
    Then the new window should show the heading "New Window"

  @alerts
  Scenario: Accept a JavaScript alert
    Given I open the alerts practice page
    When I accept the JavaScript alert
    Then the result should say "You successfully clicked an alert"

  @mouse
  Scenario: Right-click shows the context menu alert
    Given I open the context menu practice page
    When I right-click the box
    Then the alert message should be "You selected a context menu"

    
  @hover
  Scenario: Hover over an avatar shows its caption
    Given I open the hover practice page
    When I hover over avatar 1
    Then the caption "name: user1" should be visible

  @hover
  Scenario: Hover and select View profile
    Given I open the hover practice page
    When I hover over avatar 1
    And I click View profile for avatar 1
    Then I should be on the page for user 1

  @keyboard
  Scenario: Key press is detected
    Given I open the key press practice page
    When I press the key "A"
    Then the result should say "You entered: A"

  @slider
  Scenario: Move the slider with the arrow keys
    Given I open the slider practice page
    When I press the right arrow 5 times on the slider
    Then the slider value should be "2.5"

  @scroll
  Scenario: Scrolling loads more content
    Given I open the infinite scroll practice page
    When I scroll down
    Then more content should be loaded
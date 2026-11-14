@smoke
Feature: Amazon home page

  @TC_HOME_001 @severity:critical
  Scenario: Home page loads with search box
    Given I am on the Amazon home page
    Then the page title should contain "Amazon"
    And the search box should be visible

  @TC_SRCH_002 @severity:critical
  Scenario: Search by pressing Enter
    Given I am on the Amazon home page
    When I search for "laptop" using the Enter key
    Then the URL should contain "k=laptop"
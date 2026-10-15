@regression @search
Feature: Search

  Background:
    Given I am on the Amazon home page

  @smoke @TC_SRCH_001
  Scenario: Search by clicking the search icon
    When I search for "iphone" using the search icon
    Then I should see search results

  Scenario Outline: Search with different valid keywords
    When I search for "<keyword>" using the Enter key
    Then the URL should contain "k=<keyword>"
    And I should see search results

    Examples:
      | keyword    |
      | laptop     |
      | iphone     |
      | headphones |

  @negative @TC_SRCH_004
  Scenario: Click the search icon with an empty search box
    When I click the search icon with an empty box
    Then the search box should be visible

  @negative @TC_SRCH_005
  Scenario: Search with special characters
    When I search for the special characters from test data
    Then the search box should be visible

  @negative @TC_SRCH_006
  Scenario: Search with gibberish text
    When I search for the gibberish text from test data
    Then a no results message should be shown